// Layout editor page: drag to move, drag corners to resize, 8 px grid snap, save to layout.json.
import ru from '../../src/i18n/ru.json';

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
type Layout = Record<string, Record<string, Rect>>;

const W = 720;
const H = 1280;
const GRID = 8;
const MIN_TAP = 96;
const strings: Record<string, string> = ru;

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const stage = $<HTMLDivElement>('stage');
const wrap = $<HTMLDivElement>('wrap');
const sizer = $<HTMLDivElement>('sizer');
const sectionSelect = $<HTMLSelectElement>('section');
const fields = { x: $<HTMLInputElement>('fx'), y: $<HTMLInputElement>('fy'), w: $<HTMLInputElement>('fw'), h: $<HTMLInputElement>('fh') };
const status = $<HTMLDivElement>('status');

let layout: Layout = {};
let section = '';
let selected: string | null = null;
let scale = 1;
let dirty = false;

const snap = (v: number) => Math.round(v / GRID) * GRID;
const kind = (name: string) => (name === 'room' ? 'room' : name.split('.')[0] ?? 'ui');
const isHotspot = (name: string) => name.startsWith('object.') || name.startsWith('zone.');
const label = (name: string) => strings[name] ?? name;

function setDirty(value: boolean, message = ''): void {
  dirty = value;
  status.textContent = message || (dirty ? 'Есть несохранённые изменения' : '');
  status.className = dirty ? 'dirty' : '';
}

function fit(): void {
  scale = Math.min(Math.max(wrap.clientWidth - 8, 120) / W, (window.innerHeight - 24) / H);
  stage.style.transform = `scale(${scale})`;
  sizer.style.width = `${W * scale}px`;
  sizer.style.height = `${H * scale}px`;
}

function clamp(r: Rect): Rect {
  const w = Math.max(GRID, Math.min(W, r.w));
  const h = Math.max(GRID, Math.min(H, r.h));
  return { w, h, x: Math.max(0, Math.min(W - w, r.x)), y: Math.max(0, Math.min(H - h, r.y)) };
}

function render(): void {
  stage.innerHTML = '';
  const rects = layout[section] ?? {};
  // The room goes first so everything else sits on top of it.
  const names = Object.keys(rects).sort((a, b) => Number(b === 'room') - Number(a === 'room'));
  for (const name of names) {
    const r = rects[name] as Rect;
    const el = document.createElement('div');
    el.className = `el ${kind(name)}`;
    if (isHotspot(name) && (r.w < MIN_TAP || r.h < MIN_TAP)) el.classList.add('small');
    if (name === selected) el.classList.add('selected');
    Object.assign(el.style, { left: `${r.x}px`, top: `${r.y}px`, width: `${r.w}px`, height: `${r.h}px` });
    el.textContent = label(name);
    for (const corner of ['nw', 'ne', 'sw', 'se']) {
      const handle = document.createElement('div');
      handle.className = `handle ${corner}`;
      handle.addEventListener('pointerdown', (e) => startDrag(e, name, corner));
      el.appendChild(handle);
    }
    el.addEventListener('pointerdown', (e) => startDrag(e, name, null));
    stage.appendChild(el);
  }
  updatePanel();
}

function updatePanel(): void {
  const r = selected ? layout[section]?.[selected] : undefined;
  $('selected').textContent = r && selected ? `${label(selected)} (${selected})` : 'Ничего не выбрано';
  for (const key of ['x', 'y', 'w', 'h'] as const) {
    fields[key].value = r ? String(r[key]) : '';
    fields[key].disabled = !r;
  }
  const small = Object.entries(layout[section] ?? {}).filter(([n, r]) => isHotspot(n) && (r.w < MIN_TAP || r.h < MIN_TAP));
  $('warn').textContent = small.length ? `Меньше ${MIN_TAP}×${MIN_TAP}: ${small.map(([n]) => label(n)).join(', ')}` : '';
}

function setRect(name: string, r: Rect): void {
  const rects = layout[section];
  if (!rects) return;
  rects[name] = clamp(r);
  setDirty(true);
}

function startDrag(e: PointerEvent, name: string, corner: string | null): void {
  e.stopPropagation();
  e.preventDefault();
  selected = name;
  render();
  const start = { ...(layout[section]?.[name] as Rect) };
  const sx = e.clientX;
  const sy = e.clientY;
  const move = (ev: PointerEvent) => {
    const dx = (ev.clientX - sx) / scale;
    const dy = (ev.clientY - sy) / scale;
    let { x, y, w, h } = start;
    if (!corner) {
      x = snap(start.x + dx);
      y = snap(start.y + dy);
    } else {
      if (corner.includes('w')) {
        x = snap(start.x + dx);
        w = start.x + start.w - x;
      }
      if (corner.includes('e')) w = snap(start.x + start.w + dx) - start.x;
      if (corner.includes('n')) {
        y = snap(start.y + dy);
        h = start.y + start.h - y;
      }
      if (corner.includes('s')) h = snap(start.y + start.h + dy) - start.y;
    }
    setRect(name, { x, y, w, h });
    render();
  };
  const up = () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
  };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
}

async function load(): Promise<void> {
  layout = (await (await fetch('/api/layout')).json()) as Layout;
  const sections = Object.keys(layout);
  if (!sections.includes(section)) section = sections[0] ?? '';
  sectionSelect.innerHTML = sections.map((s) => `<option value="${s}">${s}</option>`).join('');
  sectionSelect.value = section;
  selected = null;
  setDirty(false);
  render();
}

async function save(): Promise<void> {
  const res = await fetch('/api/layout', { method: 'POST', body: JSON.stringify(layout) });
  if (res.ok) setDirty(false, 'Сохранено в src/data/layout.json');
  else status.textContent = `Ошибка сохранения: ${await res.text()}`;
}

for (const key of ['x', 'y', 'w', 'h'] as const) {
  fields[key].addEventListener('change', () => {
    const r = selected ? layout[section]?.[selected] : undefined;
    if (!r || !selected) return;
    setRect(selected, { ...r, [key]: snap(Number(fields[key].value)) });
    render();
  });
}

window.addEventListener('keydown', (e) => {
  const r = selected ? layout[section]?.[selected] : undefined;
  if (!r || !selected || e.target instanceof HTMLInputElement) return;
  const d: Record<string, [number, number]> = { ArrowLeft: [-GRID, 0], ArrowRight: [GRID, 0], ArrowUp: [0, -GRID], ArrowDown: [0, GRID] };
  const step = d[e.key];
  if (!step) return;
  e.preventDefault();
  setRect(selected, { ...r, x: r.x + step[0], y: r.y + step[1] });
  render();
});

window.addEventListener('beforeunload', (e) => {
  if (dirty) e.preventDefault();
});

stage.addEventListener('pointerdown', () => {
  selected = null;
  render();
});
sectionSelect.addEventListener('change', () => {
  section = sectionSelect.value;
  selected = null;
  render();
});
$('save').addEventListener('click', () => void save());
$('revert').addEventListener('click', () => void load());
window.addEventListener('resize', fit);

fit();
void load();
