// Settings: music and sounds separately, Yandex sign-in for guests, reset with confirmation (spec 6.2).
import type Phaser from 'phaser';
import { audio } from '../audio';
import { config, PALETTE } from '../config';
import { t } from '../i18n';
import type { PlatformAdapter } from '../platform/adapter';
import type { Store } from '../store';
import { Button } from './Button';
import { Modal } from './Modal';
import { playStory } from './Story';
import { COLORS, setTextScale, textStyle } from './style';

export function showSettings(scene: Phaser.Scene, store: Store, platform: PlatformAdapter, onClose: () => void): void {
  const w = 640;
  const h = 1208;
  const modal = new Modal(scene, w, h, () => modal.close(onClose));
  const { px, py } = modal;
  modal.add(scene.add.text(px + 40, py + 40, t('ui.settings.title'), textStyle(44, COLORS.text, { fontStyle: 'bold' })));
  modal.add(new Button(scene, { x: px + w - 112, y: py + 16, w: 96, h: 96, label: '✕', fill: PALETTE.dust, textColor: COLORS.text, onTap: () => modal.close(onClose) }));

  const toggle = (y: number, labelKey: string, key: 'music' | 'sfx' | 'largeText') => {
    modal.add(scene.add.text(px + 40, y + 52, t(labelKey), textStyle(36, COLORS.text)).setOrigin(0, 0.5));
    const button = new Button(scene, {
      x: px + w - 240,
      y,
      w: 200,
      h: 104,
      label: '',
      fill: PALETTE.green,
      onTap: () => {
        const on = !store.state.settings[key];
        store.setSettings({ [key]: on });
        if (key === 'sfx') audio.setSfx(on);
        if (key === 'music') audio.setMusic(on);
        if (key === 'largeText') {
          // Every text is redrawn: the screen restarts with the new size.
          setTextScale(on ? config.largeTextScale : 1);
          modal.close(() => scene.scene.restart());
          return;
        }
        paint();
      },
    });
    const paint = () => button.setLabel(t(store.state.settings[key] ? 'ui.settings.on' : 'ui.settings.off')).setAlpha(store.state.settings[key] ? 1 : 0.6);
    paint();
    modal.add(button);
  };
  toggle(py + 136, 'ui.settings.music', 'music');
  toggle(py + 256, 'ui.settings.sfx', 'sfx');
  toggle(py + 376, 'ui.settings.largeText', 'largeText');

  // Sign-in only on this button, with the benefit explained next to it (spec 2.1, rule 1.2).
  const authText = scene.add.text(px + 40, py + 492, '', textStyle(32, COLORS.text, { wordWrap: { width: w - 80 } }));
  modal.add(authText);
  const login = new Button(scene, {
    x: px + 40,
    y: py + 632,
    w: w - 80,
    h: 104,
    label: t('ui.settings.login'),
    fill: PALETTE.copper,
    onTap: () => {
      void platform
        .requestAuth()
        .then((ok) => (ok ? store.syncAfterSignIn() : undefined))
        // A cloud save from another device restarts the screen and closes this dialog.
        .then(() => modal.scene && paintAuth());
    },
  });
  modal.add(login);
  const paintAuth = () => {
    const authorized = platform.isAuthorized();
    authText.setText(t(authorized ? 'ui.settings.loggedIn' : 'ui.settings.loginHint'));
    login.setVisible(!authorized);
  };
  paintAuth();

  // Replays the opening story without touching progress, then comes back to the settings.
  modal.add(
    new Button(scene, {
      x: px + 40,
      y: py + 752,
      w: w - 80,
      h: 104,
      label: t('ui.settings.story'),
      fill: PALETTE.wood,
      onTap: () =>
        modal.close(() => playStory(scene, store.content, 'ui.close', () => showSettings(scene, store, platform, onClose))),
    }),
  );

  const shortcut = new Button(scene, {
    x: px + 40,
    y: py + 872,
    w: w - 80,
    h: 104,
    label: t('ui.settings.shortcut'),
    fill: PALETTE.green,
    onTap: () => void platform.showShortcut().then((added) => added && modal.scene && shortcut.setVisible(false)),
  }).setVisible(false);
  modal.add(shortcut);
  void platform.canShowShortcut().then((can) => modal.scene && shortcut.setVisible(can));

  modal.add(
    new Button(scene, {
      x: px + 40,
      y: py + h - 200,
      w: w - 80,
      h: 112,
      label: t('ui.settings.reset'),
      fill: PALETTE.metal,
      onTap: () => confirmReset(scene, store, () => modal.close(onClose)),
    }),
  );
}

function confirmReset(scene: Phaser.Scene, store: Store, done: () => void): void {
  const w = 600;
  const h = 480;
  const modal = new Modal(scene, w, h, () => modal.close());
  modal.setDepth(850);
  const { px, py } = modal;
  modal.add(scene.add.text(px + 40, py + 48, t('ui.settings.resetConfirm'), textStyle(36, COLORS.text, { wordWrap: { width: w - 80 } })));
  modal.add(
    new Button(scene, {
      x: px + 40,
      y: py + h - 280,
      w: w - 80,
      h: 112,
      label: t('ui.settings.resetYes'),
      fill: PALETTE.copper,
      onTap: () =>
        modal.close(() => {
          store.resetProgress();
          done();
        }),
    }),
  );
  modal.add(new Button(scene, { x: px + 40, y: py + h - 144, w: w - 80, h: 112, label: t('ui.settings.resetNo'), fill: PALETTE.metal, onTap: () => modal.close() }));
}
