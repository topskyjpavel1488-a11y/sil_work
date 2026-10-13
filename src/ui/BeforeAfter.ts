// "Before and after" for a restored room (spec 4.7, v0.8): the room as it was found and as it is now,
// split by a handle the player drags across. Built only from art the room already has.
import Phaser from 'phaser';
import { addAsset } from '../assets';
import { DEPTH, DESIGN_HEIGHT, DESIGN_WIDTH, PALETTE } from '../config';
import { objectsIn, zonesIn, type Content, type RoomDef } from '../core/content';
import { t } from '../i18n';
import { rect } from '../layout';
import { Button } from './Button';
import { COLORS, textStyle } from './style';
import { drawShelf, drawZonePile, wallShelfRects } from './ZoneArt';

function drawRoom(scene: Phaser.Scene, content: Content, room: RoomDef, before: boolean): Phaser.GameObjects.Container {
  const layer = scene.add.container(0, 0);
  const r = rect(room.layout, 'room');
  layer.add(addAsset(scene, room.image, r));
  for (const spot of wallShelfRects(content, room)) layer.add(drawShelf(scene, spot));
  if (before) {
    for (const zone of zonesIn(content, room.id)) {
      const z = rect(room.layout, `zone.${zone.id}`);
      const box = scene.add.container(z.x + z.w / 2, z.y + z.h / 2).setSize(z.w, z.h);
      drawZonePile(scene, box, content, zone, []);
      layer.add(box);
    }
  }
  for (const object of objectsIn(content, room.id)) {
    const key = before ? object.stateImages[0] : object.stateImages[object.stateImages.length - 1];
    layer.add(addAsset(scene, key ?? '', rect(room.layout, `object.${object.id}`)));
  }
  // Before: a dusty, dimmer veil over everything.
  if (before) layer.add(scene.add.rectangle(r.x, r.y, r.w, r.h, 0x5a4a3a, 0.3).setOrigin(0));
  return layer;
}

export function showBeforeAfter(scene: Phaser.Scene, content: Content, room: RoomDef, onClose: () => void): void {
  const root = scene.add.container(0, 0).setDepth(DEPTH.modal + 10);
  const shade = scene.add.rectangle(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT, PALETTE.cream).setOrigin(0).setInteractive();
  root.add(shade);
  root.add(scene.add.text(DESIGN_WIDTH / 2, 120, t('ui.final.compare'), textStyle(44, COLORS.text, { fontStyle: 'bold' })).setOrigin(0.5));
  root.add(scene.add.text(DESIGN_WIDTH / 2, 196, t('ui.compare.hint'), textStyle(32, '#7D7468')).setOrigin(0.5));

  const r = rect(room.layout, 'room');
  const after = drawRoom(scene, content, room, false);
  const before = drawRoom(scene, content, room, true);
  root.add([after, before]);

  // The "before" layer shows only left of the handle.
  const maskShape = scene.make.graphics({}, false);
  before.setMask(maskShape.createGeometryMask());
  const handle = scene.add.container(0, 0);
  const line = scene.add.rectangle(0, r.y, 6, r.h, 0xffffff).setOrigin(0.5, 0);
  const knob = scene.add.graphics();
  knob.fillStyle(PALETTE.copper, 1).fillCircle(0, r.y + r.h / 2, 40).lineStyle(4, 0xffffff, 1).strokeCircle(0, r.y + r.h / 2, 40);
  const arrows = scene.add.text(0, r.y + r.h / 2, '‹ ›', textStyle(40, '#FFFFFF', { fontStyle: 'bold' })).setOrigin(0.5);
  handle.add([line, knob, arrows]);
  const label = (text: string, x: number, originX: number) => {
    const t2 = scene.add.text(x, r.y + 20, text, textStyle(32, '#FFFFFF', { fontStyle: 'bold', backgroundColor: '#3A3F44CC' })).setOrigin(originX, 0);
    t2.setPadding(14, 6, 14, 6);
    return t2;
  };
  root.add([handle, label(t('ui.compare.before'), r.x + 16, 0), label(t('ui.compare.after'), r.x + r.w - 16, 1)]);

  const state = { x: r.x + r.w * 0.9 };
  const draw = () => {
    maskShape.clear().fillStyle(0xffffff).fillRect(r.x, r.y, state.x - r.x, r.h);
    handle.x = state.x;
  };
  draw();
  // A short slide on open shows that the picture can be dragged.
  const intro = scene.tweens.add({ targets: state, x: r.x + r.w * 0.5, duration: 1400, ease: 'Sine.easeInOut', onUpdate: draw });

  const drag = scene.add.zone(r.x, r.y, r.w, r.h).setOrigin(0).setInteractive({ useHandCursor: true });
  const follow = (p: Phaser.Input.Pointer) => {
    intro.stop();
    state.x = Phaser.Math.Clamp(p.x, r.x, r.x + r.w);
    draw();
  };
  drag.on('pointerdown', follow);
  drag.on('pointermove', (p: Phaser.Input.Pointer) => p.isDown && follow(p));
  root.add(drag);

  root.add(
    new Button(scene, {
      x: 40,
      y: DESIGN_HEIGHT - 136,
      w: DESIGN_WIDTH - 80,
      h: 112,
      label: t('ui.back'),
      fill: PALETTE.wood,
      onTap: () => {
        intro.stop();
        before.clearMask(true);
        maskShape.destroy();
        root.destroy();
        onClose();
      },
    }),
  );
}
