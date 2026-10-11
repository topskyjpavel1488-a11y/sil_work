import { describe, expect, it } from 'vitest';
import { content } from '../src/data/index';
import { migrate, parseSave, pickNewest, serializeSave } from '../src/core/save';
import { createInitialState } from '../src/core/state';

const sample = () => {
  const s = createInitialState(content);
  s.resources.wood = 7;
  s.board[3] = { chain: 'fasteners', level: 2 };
  s.objects.workbench = { step: 1 };
  s.zones.door = { taken: ['door_1'] };
  s.finds = ['f_photo'];
  return s;
};

describe('save', () => {
  it('round-trips the state and stamps savedAt', () => {
    const parsed = parseSave(serializeSave(sample(), 1000));
    expect(parsed).toEqual({ kind: 'ok', save: { ...sample(), savedAt: 1000 } });
  });

  it('treats missing data as empty', () => {
    expect(parseSave(null)).toEqual({ kind: 'empty' });
    expect(parseSave('')).toEqual({ kind: 'empty' });
  });

  it('flags broken JSON and wrong shapes as corrupted', () => {
    expect(parseSave('{"version":1,')).toEqual({ kind: 'corrupted' });
    expect(parseSave('[]')).toEqual({ kind: 'corrupted' });
    const wrongBoard = { ...sample(), board: [] };
    expect(parseSave(JSON.stringify(wrongBoard))).toEqual({ kind: 'corrupted' });
    const negative = { ...sample(), resources: { wood: -1, metal: 0, parts: 0 } };
    expect(parseSave(JSON.stringify(negative))).toEqual({ kind: 'corrupted' });
    expect(parseSave(JSON.stringify({ ...sample(), version: 99 }))).toEqual({ kind: 'corrupted' });
  });

  it('picks the newer of local and cloud', () => {
    const local = { ...sample(), savedAt: 200 };
    const cloud = { ...sample(), savedAt: 100 };
    expect(pickNewest(local, cloud)).toBe(local);
    expect(pickNewest({ ...local, savedAt: 50 }, cloud)).toBe(cloud);
    expect(pickNewest(null, cloud)).toBe(cloud);
    expect(pickNewest(local, null)).toBe(local);
    expect(pickNewest(null, null)).toBeNull();
  });

  it('migrate passes version 1 through unchanged', () => {
    const s = sample();
    expect(migrate(s)).toBe(s);
    expect(migrate({ version: 0 })).toBeNull();
  });
});
