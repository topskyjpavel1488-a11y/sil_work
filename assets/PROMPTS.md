# Промпты для генерации графики

Каждая картинка — отдельный готовый промпт: копируйте целиком. Размер файла — финальный (2× от размера на экране); генерируйте в ближайшем доступном соотношении и уменьшайте/обрезайте до указанного. Отрицательные промпты вынесены в конец: у каждой картинки указан набор, к нему **всегда добавляйте общий набор N-COMMON** (кроме случаев, где сказано иначе).

Стиль: вариант №1 (тёплый, живописный), перспектива «кукольный домик в разрезе»: задняя стена прямо на зрителя, камера чуть сверху (~30°). Порядок работы: `room_bg` → верстак (сначала `obj_workbench_3`, затем остальные состояния из него) → остальные объекты → завал → предметы и ресурсы → находки и вступление → логотип, иконка, обложка. Кучи и фоны сцен разбора (разделы 3–4) с версии 0.8 не обязательны: игра собирает их из других картинок. Готовые удачные картинки используйте как референс стиля для следующих (Midjourney `--sref`, IP-Adapter в Stable Diffusion, «изображение-референс» в других сервисах).

С версии 0.7 в игре две комнаты. Картинки второй комнаты (малярной) помечены «Малярная:» и идут в каждом разделе после мастерской. Делайте их тем же порядком (`room_paint_bg` → объекты → завал → краски → находки), а готовую мастерскую берите как референс стиля, чтобы комнаты выглядели одним домом.

Спрайты (объекты, кучи, завал, предметы, ресурсы, логотип) генерируйте на ровном белом фоне — фон и светлые тени уберёт `npm run images`, вручную ничего делать не нужно. Фоны комнат делаются по картинке-подсказке композиции, см. раздел 1.

Как подключать готовые файлы — в `ART_BRIEF.md`; можно просто прислать мне файлы, названные по ключам.

**Состояния объектов (с 13.10.2026):** восстановленное состояние генерируется по промпту; остальные — **правками этой картинки в Leonardo** (карточка картинки → поле под ней с названием модели). Для таких ключей вместо промпта генерации дан текст правки по шаблону «Edit this exact …, preserving its silhouette…», отрицательный промпт не нужен. Так получились часы — состояния совпадают по форме до пикселя.

**Что делать сейчас — в `ART_TODO.md`:** там список того, что ещё не нарисовано и что нужно переделать. Этот файл — полный справочник промптов на все картинки игры.

## 1. Фоны комнат

### `room_bg` — Фон мастерской (пустая комната)

> Обновлено 13.10.2026 (см. `ART_TODO.md`).

- **Размер файла:** не меньше 1440×1696 px
- **Соотношение:** вертикальный 5:6 (генерируйте 4:5 и обрежьте по высоте до 1696)
- **Отрицательный промпт:** N-ROOM + N-COMMON, дополнительно: `side walls, ceiling, roof, rafters, gable, beams across the top, room corners, deep perspective, vanishing point, door, window, signature, artist name, watermark`
- **Подсказка композиции:** `assets/source/guides/room_bg_guide.png`, схема расстановки — `room_bg_layout.jpg`.
- **Важно:** никаких предметов — окно, полка, часы, верстак и шкаф будут отдельными спрайтами поверх фона.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background
```

### `room_paint_bg` — Малярная: фон малярной (пустая комната)

> Обновлено 13.10.2026 (см. `ART_TODO.md`).

- **Размер файла:** не меньше 1440×1696 px
- **Соотношение:** вертикальный 5:6 (генерируйте 4:5 и обрежьте по высоте до 1696)
- **Отрицательный промпт:** N-ROOM + N-COMMON, дополнительно: `side walls, ceiling, roof, rafters, gable, beams across the top, room corners, deep perspective, vanishing point, door, window, signature, artist name, watermark`
- **Подсказка композиции:** `assets/source/guides/room_paint_bg_guide.png`, схема расстановки — `room_paint_bg_layout.jpg`.
- **Важно:** тот же ракурс и линия пола, что у мастерской: комнаты должны выглядеть соседними в одном доме. Стеллаж, окно, мольберт, стремянку и столы не рисовать.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family paint shop: the back wall is whitewashed plaster with old faint splashes of honey, sage green and warm red paint and a sage green wooden wainscot panel along its lower part above the baseboard, the floor is worn light wooden planks with old dried paint drips, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background
```

## 2. Объекты восстановления

### `obj_workbench_0` — Верстак, шаг 0 из 3 (заброшено)

- **Размер файла:** 1024×576 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact workbench, preserving its silhouette, proportions, tabletop, vise, drawers, legs and camera angle.

Clearly abandoned for many years: the tabletop boards are cracked, warped and stained, edges chipped, heavy dust and grime on every surface. The vise is rusty and dull. The drawers are scratched with peeling finish, one drawer front is cracked. A cross brace between the legs is split. No tools on the tabletop. The workbench looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_workbench_1` — Верстак, шаг 1 из 3 (частично починено)

- **Размер файла:** 1024×576 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact workbench, preserving its silhouette, proportions, tabletop, vise, drawers, legs and camera angle.

Clearly partially repaired, first stage: the tabletop is made of fresh, light new boards, clean and bright. Everything below the tabletop is still old: dark, scratched, dusty legs and drawers, a split cross brace, a rusty vise. No tools on the tabletop.

The workbench must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_workbench_2` — Верстак, шаг 2 из 3 (частично починено)

- **Размер файла:** 1024×576 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact workbench, preserving its silhouette, proportions, tabletop, vise, drawers, legs and camera angle.

Clearly almost repaired: the new light tabletop is in place and the frame is firmly fixed — fresh screws and small new metal brackets are visible at the joints, the cross brace is whole. The vise is cleaned of rust but still bare metal. The drawers remain worn and scratched, one drawer front still has a crack. No tools on the tabletop.

The workbench must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_workbench_3` — Верстак, шаг 3 из 3 (восстановлено)

- **Размер файла:** 1024×576 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `second vise, vise at both ends, cluttered tabletop, lamp, boxes on the tabletop`
- **Важно:** верстак переделывается полностью (13.10.2026). Генерируйте это состояние первым. Середина столешницы должна остаться **свободной**: на неё игра ставит лампу и ящик с крепежом — отдельными картинками. Столешница должна хорошо читаться как ровная поверхность, тиски — одни, слева.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long sturdy old wooden carpenter's workbench seen from the front, very wide and low, the thick wooden tabletop clearly visible from slightly above as a flat surface across the whole length, one small metal vise at the left end, two drawers under the tabletop and a lower shelf between the legs, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, a couple of small hand tools neatly laid at the right end of the tabletop, the middle of the tabletop left empty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_fastener_box_0` — Ящик с крепежом, шаг 0 из 1 (заброшено)

- **Размер файла:** 368×208 px
- **Соотношение:** горизонтальный 16:9
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** делайте правкой восстановленного состояния в Leonardo (шаблон — в `ART_BRIEF.md`, «Состояния объектов»).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small wooden cabinet of many little drawers for screws and nails, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, drawers crooked and stuck, some missing, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_fastener_box_1` — Ящик с крепежом, шаг 1 из 1 (восстановлено)

- **Размер файла:** 368×208 px
- **Соотношение:** горизонтальный 16:9
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым; остальные — правками этой картинки в Leonardo.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small wooden cabinet of many little drawers for screws and nails, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, all drawers straight, small copper handles shining, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_lamp_0` — Настольная лампа, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (лампа может стоять в кадре с полями по бокам)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact desk lamp, preserving its silhouette, proportions, shade, arm joints, base and camera angle.

Clearly abandoned for many years: the metal shade is dented and tarnished, the paint on the arm is chipped and peeling, the joints are rusty, the base is scratched and covered in dust and grime, the cord is frayed. The lamp is switched off, no light at all. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_lamp_1` — Настольная лампа, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (лампа может стоять в кадре с полями по бокам)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact desk lamp, preserving its silhouette, proportions, shade, arm joints, base and camera angle.

Clearly partially repaired: the arm and joints are straightened, cleaned and freshly oiled; the base is polished. The shade is still dented and partly tarnished, the cord is wrapped with fresh tape at one spot. The lamp is switched off, no light at all.

The desk lamp must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_lamp_2` — Настольная лампа, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (лампа может стоять в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a vintage articulated desk lamp with a round metal shade on a heavy base, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, switched on, glowing with soft warm yellow light, a gentle glow halo around the shade, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_window_0` — Окно, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact window, preserving its silhouette, proportions, frame, panes, glazing bars and camera angle.

Clearly abandoned for many years: the wooden frame is weathered and grey with peeling paint, the glass panes are dirty, cloudy and cracked, cobwebs in the corners, heavy dust on the sill. The view outside is barely visible. Nothing around the frame: no wall, no plaster, no paint strokes. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_window_1` — Окно, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact window, preserving its silhouette, proportions, frame, panes, glazing bars and camera angle.

Clearly partially repaired: the frame is repaired and freshly repainted sage green, clean and bright. The glass panes are still cloudy and dusty, one pane still has a crack. Nothing around the frame: no wall, no plaster, no paint strokes.

The window must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_window_2` — Окно, шаг 2 из 2 (восстановлено)

> Обновлено 13.10.2026 (см. `ART_TODO.md`).

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `plaster, wall patch, brush strokes around the object, splashes, vines outside the frame`

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window seen straight on, as a separate object, crisp clean edges around the frame, nothing around the frame, no wall, no plaster, no paint strokes around it, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, clean clear panes with warm daylight shining through, a green leafy view outside, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_cabinet_0` — Шкаф для инструментов, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×608 px
- **Соотношение:** вертикальный 3:4
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden tool cabinet with two doors, seen straight on, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, one door hanging on a single hinge, scratched and dusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_cabinet_1` — Шкаф для инструментов, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×608 px
- **Соотношение:** вертикальный 3:4
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** делайте правкой восстановленного состояния в Leonardo (шаблон — в `ART_BRIEF.md`, «Состояния объектов»).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden tool cabinet with two doors, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, both doors back on their hinges, still worn, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_cabinet_2` — Шкаф для инструментов, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×608 px
- **Соотношение:** вертикальный 3:4
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** делайте правкой восстановленного состояния в Leonardo (шаблон — в `ART_BRIEF.md`, «Состояния объектов»).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden tool cabinet with two doors, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, new hinges and handles, shelves fixed, the doors slightly open showing empty shelves, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_cabinet_3` — Шкаф для инструментов, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×608 px
- **Соотношение:** вертикальный 3:4
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым; остальные — правками этой картинки в Leonardo.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden tool cabinet with two doors, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, the doors open, hand tools neatly hung inside on pegs, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_shelf_0` — Полка с банками, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** делайте правкой восстановленного состояния в Leonardo (шаблон — в `ART_BRIEF.md`, «Состояния объектов»).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wooden wall shelf with glass jars of screws and small parts, seen straight on, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, the shelf sagging on one side, jars dusty and tipped over, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_shelf_1` — Полка с банками, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** делайте правкой восстановленного состояния в Leonardo (шаблон — в `ART_BRIEF.md`, «Состояния объектов»).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wooden wall shelf with glass jars of screws and small parts, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the shelf straight and level, jars still dusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_shelf_2` — Полка с банками, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым; остальные — правками этой картинки в Leonardo.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wooden wall shelf with glass jars of screws and small parts, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, jars clean and neatly lined up, catching the light, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_radio_0` — Радиоприёмник, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×224 px
- **Соотношение:** горизонтальный 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** делайте правкой восстановленного состояния в Leonardo (шаблон — в `ART_BRIEF.md`, «Состояния объектов»).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a vintage tube radio in a rounded wooden case with a round tuning dial and fabric speaker grille, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, the back panel missing, dusty, the dial glass cracked, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_radio_1` — Радиоприёмник, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×224 px
- **Соотношение:** горизонтальный 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** делайте правкой восстановленного состояния в Leonardo (шаблон — в `ART_BRIEF.md`, «Состояния объектов»).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a vintage tube radio in a rounded wooden case with a round tuning dial and fabric speaker grille, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, reassembled and clean, the dial dark, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_radio_2` — Радиоприёмник, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×224 px
- **Соотношение:** горизонтальный 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым; остальные — правками этой картинки в Leonardo.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a vintage tube radio in a rounded wooden case with a round tuning dial and fabric speaker grille, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, working: the tuning dial glows warm amber, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_wall_clock_0` — Настенные часы, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки
- **Как делать:** правка готового восстановленного состояния (`_2`) в Leonardo — этим текстом сделаны часы в игре (13.10.2026).

```
Edit this exact clock, preserving its silhouette, proportions, face, hands, pendulum and camera angle.

Clearly abandoned for many years: dark weathered wood, deep scratches, chipped edges, peeling finish, cracked housing, heavy dust and grime. The metal rim is heavily tarnished and rusty. The cream face is yellowed, stained and dusty. The pendulum is dull and tarnished. The clock looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_wall_clock_1` — Настенные часы, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки
- **Как делать:** правка готового восстановленного состояния (`_2`) в Leonardo — этим текстом сделаны часы в игре (13.10.2026).

```
Edit this exact clock, preserving its silhouette, proportions, face, hands, pendulum and camera angle.

Clearly partially repaired: the left half of the wooden frame has fresh lighter wood patches; the right half remains dark, scratched, chipped and worn. The lower housing has one unfinished repair with exposed raw wood and visible cracks. The metal rim is partly polished, partly rusty. The face is mostly clean but retains stains.

The clock must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_wall_clock_2` — Настенные часы, шаг 2 из 2 (восстановлено)

> Обновлено 13.10.2026 (см. `ART_TODO.md`).

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2 (часы почти круглые — оставьте поля по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `numerals, roman numerals, numbers, digits, brand name`

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a round vintage wall clock in a wooden case with a pendulum below, seen straight on, a plain cream clock face with simple small dot markers instead of numerals, no numbers, no roman numerals, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, running, the pendulum mid-swing, the clock face clean and bright, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_table_0` — Малярная: Покрасочный стол, шаг 0 из 3 (заброшено)

- **Размер файла:** 992×560 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact painting table, preserving its silhouette, proportions, tabletop, legs and camera angle.

Clearly abandoned for many years: the tabletop is warped, stained and caked with old cracked layers of dried paint, one leg is cracked and the table leans slightly, a few old paint cans are knocked over and dented, heavy dust and grime. No fresh cloth, no tidy cans, no stool. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_table_1` — Малярная: Покрасочный стол, шаг 1 из 3 (частично починено)

- **Размер файла:** 992×560 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact painting table, preserving its silhouette, proportions, tabletop, legs and camera angle.

Clearly partially repaired, first stage: the cracked leg is replaced with fresh light wood and the table stands straight; the tabletop is sanded in a few patches but still mostly stained with old paint. Old dented cans still lie around. No cloth, no stool.

The painting table must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_table_2` — Малярная: Покрасочный стол, шаг 2 из 3 (частично починено)

- **Размер файла:** 992×560 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact painting table, preserving its silhouette, proportions, tabletop, legs and camera angle.

Clearly almost repaired: the legs are fixed and the tabletop is covered with a fresh clean drop cloth; two or three clean paint cans stand neatly on it. The table edges still show old paint drips and scratches. No stool yet.

The painting table must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_table_3` — Малярная: Покрасочный стол, шаг 3 из 3 (восстановлено)

- **Размер файла:** 992×560 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long old wooden painting table covered with layers of colorful dried paint, a few brushes in a jar on it, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, neat paint cans, brushes in a jar and a half-painted wooden stool on the top, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_drying_rack_0` — Малярная: Сушилка для деталей, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact drying rack, preserving its silhouette, proportions, frame, slatted shelves and camera angle.

Clearly abandoned for many years: several slats are cracked and sagging, the frame is weathered, grey and leaning slightly, cobwebs between the shelves, heavy dust. The shelves are empty. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_drying_rack_1` — Малярная: Сушилка для деталей, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact drying rack, preserving its silhouette, proportions, frame, slatted shelves and camera angle.

Clearly partially repaired: the upper shelves have fresh light new slats and the frame stands straight; the lower shelves still have old dark, cracked slats with cobwebs. The shelves are empty — no painted parts drying yet.

The drying rack must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_drying_rack_2` — Малярная: Сушилка для деталей, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden drying rack with several slatted shelves for freshly painted parts, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, small freshly painted wooden parts drying on the shelves in soft sage, honey and red colors, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_rack_0` — Малярная: Стеллаж с красками, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact paint rack, preserving its silhouette, proportions, shelves, uprights and camera angle.

Clearly abandoned for many years: the shelves sag, the wood is weathered and grey, the paint cans are rusty, dented, tipped over and crusted with dried drips, heavy dust and cobwebs. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_rack_1` — Малярная: Стеллаж с красками, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact paint rack, preserving its silhouette, proportions, shelves, uprights and camera angle.

Clearly partially repaired, first stage: the rack is fixed and level with a few fresh light wooden boards; only a few old dented cans stand on it, the rest of the shelves are empty and dusty.

The paint rack must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_rack_2` — Малярная: Стеллаж с красками, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact paint rack, preserving its silhouette, proportions, shelves, uprights and camera angle.

Clearly almost repaired: the rack is clean and sturdy, cans are sorted in rows, but about half of them are still old, dull and rusty, without the fresh colorful drips. Plain cans without labels.

The paint rack must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_rack_3` — Малярная: Стеллаж с красками, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wide wooden wall rack with rows of paint cans, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, full rows of clean cans with colorful drips of honey, sage green and warm red, catching the light, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_vent_window_0` — Малярная: Окно с вытяжкой, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact window with a ventilation fan, preserving its silhouette, proportions, frame, panes, round fan and camera angle.

Clearly abandoned for many years: the panes are cloudy and splattered with old paint, the frame is weathered with peeling paint, the fan blades are bent, rusty and clogged with dust, cobwebs in the corners. Nothing around the frame. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_vent_window_1` — Малярная: Окно с вытяжкой, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact window with a ventilation fan, preserving its silhouette, proportions, frame, panes, round fan and camera angle.

Clearly partially repaired: the frame is repaired and freshly repainted, the fan blades are straightened and cleaned but the fan is still; the glass panes are still cloudy and paint-splattered. Nothing around the frame.

The window with a ventilation fan must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_vent_window_2` — Малярная: Окно с вытяжкой, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window with a small round metal ventilation fan built into one pane, seen straight on, as a separate object, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, clean panes with warm daylight, the fan spinning gently, fresh air feeling, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_easel_0` — Малярная: Мольберт, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact easel, preserving its silhouette, proportions, legs, canvas ledge, top clamp and camera angle.

Clearly abandoned for many years: the wood is weathered, grey and splattered with old dried paint, one leg is cracked and the easel leans crooked, the clamp is rusty, heavy dust and cobwebs. No canvas on it. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_easel_1` — Малярная: Мольберт, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact easel, preserving its silhouette, proportions, legs, canvas ledge, top clamp and camera angle.

Clearly partially repaired: the cracked leg is replaced with fresh light wood and the easel stands straight; the rest of the wood is still old, splattered with dried paint, the clamp still rusty. No canvas on it.

The easel must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_easel_2` — Малярная: Мольберт, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden studio easel standing on the floor, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, holding a small canvas with a simple painting of a cozy house and a tree, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_ladder_0` — Малярная: Стремянка, шаг 0 из 2 (заброшено)

- **Размер файла:** 384×320 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact step ladder, preserving its silhouette, proportions, rails, steps, hinge and camera angle.

Clearly abandoned for many years: two steps are cracked, one rail is split, the hinge is rusty, the wood is weathered and covered in old paint drips, dust and cobwebs. Nothing on the top step. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_ladder_1` — Малярная: Стремянка, шаг 1 из 2 (частично починено)

- **Размер файла:** 384×320 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact step ladder, preserving its silhouette, proportions, rails, steps, hinge and camera angle.

Clearly partially repaired: the cracked steps are replaced with fresh light new wood and the hinge is oiled; the rails are still old, dusty and covered in paint drips. Nothing on the top step.

The step ladder must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_ladder_2` — Малярная: Стремянка, шаг 2 из 2 (восстановлено)

- **Размер файла:** 384×320 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden step ladder covered in paint drips, standing open, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, sturdy and clean, a small paint can and a brush on its top step, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_solvent_cabinet_0` — Малярная: Шкафчик для растворителей, шаг 0 из 3 (заброшено)

- **Размер файла:** 464×400 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact metal cabinet, preserving its silhouette, proportions, doors, handles, body and camera angle.

Clearly abandoned for many years: the metal is covered in rust and flaking old paint, one door is dented and hangs slightly open, the handles are corroded, heavy dust and grime. No bottles on top. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_solvent_cabinet_1` — Малярная: Шкафчик для растворителей, шаг 1 из 3 (частично починено)

- **Размер файла:** 464×400 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact metal cabinet, preserving its silhouette, proportions, doors, handles, body and camera angle.

Clearly partially repaired, first stage: the rust is scraped off to bare grey metal on the left half; the right half is still rusty with flaking paint. The dented door is straightened but still shows the dent marks. No bottles on top.

The metal cabinet must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_solvent_cabinet_2` — Малярная: Шкафчик для растворителей, шаг 2 из 3 (частично починено)

- **Размер файла:** 464×400 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact metal cabinet, preserving its silhouette, proportions, doors, handles, body and camera angle.

Clearly almost repaired: the body is freshly painted sage green and the doors close properly, the handles are new; small scuffs and a few bare spots of grey primer remain on the corners. No bottles on top yet.

The metal cabinet must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_solvent_cabinet_3` — Малярная: Шкафчик для растворителей, шаг 3 из 3 (восстановлено)

- **Размер файла:** 464×400 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small low metal cabinet with two doors for paint solvents, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, the doors closed neatly, plain glass bottles without labels standing on top in a row, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_sanding_bench_0` — Малярная: Шлифовальный верстак, шаг 0 из 3 (заброшено)

- **Размер файла:** 496×288 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact sanding bench, preserving its silhouette, proportions, top, legs, sanding block and camera angle.

Clearly abandoned for many years: the top is cracked and gouged, covered in thick dust and old wood shavings, the legs are weathered and grey, the sanding block is worn and grimy. Nothing else on it. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_sanding_bench_1` — Малярная: Шлифовальный верстак, шаг 1 из 3 (частично починено)

- **Размер файла:** 496×288 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact sanding bench, preserving its silhouette, proportions, top, legs, sanding block and camera angle.

Clearly partially repaired, first stage: the top is replaced with a fresh light board, but it is still dusty with shavings; the legs are old, weathered and grey. Nothing else on it.

The sanding bench must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_sanding_bench_2` — Малярная: Шлифовальный верстак, шаг 2 из 3 (частично починено)

- **Размер файла:** 496×288 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact sanding bench, preserving its silhouette, proportions, top, legs, sanding block and camera angle.

Clearly almost repaired: the top and legs are clean and sturdy, sandpaper sheets are neatly stacked; a little dust remains in the corners and the legs still need a fresh coat of finish. No chair leg yet.

The sanding bench must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_sanding_bench_3` — Малярная: Шлифовальный верстак, шаг 3 из 3 (восстановлено)

- **Размер файла:** 496×288 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wooden sanding bench with a hand sanding block and sheets of sandpaper, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, a freshly sanded wooden chair leg resting on it, a soft brush beside, warm and tidy, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

## 3. Кучи завала в комнате

> **Не обязательно с версии 0.8.** Кучу на главном экране игра собирает из спрайтов завала этой зоны (и она уменьшается по мере разбора), а фон сцены разбора — из увеличенного и смягчённого фона комнаты вокруг кучи. Отдельный рисунок нужен, только если захочется особенного вида; если он появится в манифесте, игра покажет его вместо собранного.

### `zone_door` — Куча у двери — куча на главном экране

- **Размер файла:** 448×240 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small messy pile of dusty old junk next to a door: cardboard boxes, a sack and a few planks, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_under_workbench` — Коробки под верстаком — куча на главном экране

- **Размер файла:** 912×208 px
- **Соотношение:** горизонтальный ≈ 4:1 (генерируйте 21:9 и обрежьте)
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wide row of dusty cardboard boxes, crates and rags lying on the floor, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_window_shelves` — Полки у окна — куча на главном экране

- **Размер файла:** 448×224 px
- **Соотношение:** горизонтальный 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wooden shelf crammed with dusty jars, rags and small boxes, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_corner_crates` — Ящики в углу — куча на главном экране

- **Размер файла:** 448×240 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a stack of old wooden crates and a burlap sack, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_behind_cabinet` — Завал за шкафом — куча на главном экране

- **Размер файла:** 448×464 px
- **Соотношение:** квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall jumble of dusty boxes, planks and cobwebs squeezed into a narrow gap, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_attic` — Антресоль — куча на главном экране

- **Размер файла:** 448×224 px
- **Соотношение:** горизонтальный 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a few dusty boxes and jars on a high loft shelf seen from below, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_cans_entrance` — Малярная: Банки у входа — куча на главном экране

- **Размер файла:** 320×240 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small messy pile of old dented paint cans, a rolled drop cloth and a bucket, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_under_paint_table` — Малярная: Под покрасочным столом — куча на главном экране

- **Размер файла:** 912×208 px
- **Соотношение:** горизонтальный ≈ 4:1 (генерируйте 21:9 и обрежьте)
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wide row of old paint cans, crumpled drop cloths and a wooden crate lying on the floor, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_drying_corner` — Малярная: Угол у сушилки — куча на главном экране

- **Размер файла:** 320×240 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a heap of broken wooden slats, rags and a dusty bucket, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_buckets` — Малярная: Вёдра у стены — куча на главном экране

- **Размер файла:** 320×240 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a stack of old metal paint buckets with dried paint drips, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_window_sill` — Малярная: Подоконник — куча на главном экране

- **Размер файла:** 448×224 px
- **Соотношение:** горизонтальный 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a few dusty paint jars, brushes stuck in a can and a rag on a wide window sill, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_behind_easel` — Малярная: За мольбертом — куча на главном экране

- **Размер файла:** 368×240 px
- **Соотношение:** горизонтальный ≈ 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a few old canvas frames leaning together, a sack and a rag, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `zone_high_shelf` — Малярная: Полка под потолком — куча на главном экране

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, dusty paint cans, a box and rolled papers on a high shelf seen from below, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

## 4. Фоны сцен разбора

> **Не обязательно с версии 0.8.** Кучу на главном экране игра собирает из спрайтов завала этой зоны (и она уменьшается по мере разбора), а фон сцены разбора — из увеличенного и смягчённого фона комнаты вокруг кучи. Отдельный рисунок нужен, только если захочется особенного вида; если он появится в манифесте, игра покажет его вместо собранного.

### `scene_door` — Куча у двери — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (коробки, мешки, банки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of next to an old wooden door, the door partly visible at the side in an old family workshop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_under_workbench` — Коробки под верстаком — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (коробки, мешки, банки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of the dim space under a wooden workbench, the bench legs and the underside of the tabletop visible in an old family workshop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_window_shelves` — Полки у окна — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (коробки, мешки, банки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of low wooden shelves under a window, soft daylight from above in an old family workshop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_corner_crates` — Ящики в углу — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (коробки, мешки, банки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of a dim corner of the room where two plank walls meet in an old family workshop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_behind_cabinet` — Завал за шкафом — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (коробки, мешки, банки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of the narrow dusty gap behind a tall wooden cabinet, cobwebs on the wall in an old family workshop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_attic` — Антресоль — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (коробки, мешки, банки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of a high wooden loft shelf under a sloped ceiling, seen from below in an old family workshop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_cans_entrance` — Малярная: Банки у входа — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (вёдра, банки, тряпки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of the entrance of the paint shop with an old door partly visible at the side in an old family paint shop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_under_paint_table` — Малярная: Под покрасочным столом — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (вёдра, банки, тряпки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of the dim space under a long paint-stained table, the table legs visible in an old family paint shop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_drying_corner` — Малярная: Угол у сушилки — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (вёдра, банки, тряпки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of a corner next to a wooden drying rack in an old family paint shop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_buckets` — Малярная: Вёдра у стены — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (вёдра, банки, тряпки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of a plaster wall with paint splashes and a plank floor in an old family paint shop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_window_sill` — Малярная: Подоконник — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (вёдра, банки, тряпки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of a wide wooden window sill under a paint-splattered window, soft daylight in an old family paint shop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_behind_easel` — Малярная: За мольбертом — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (вёдра, банки, тряпки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of the space behind a wooden easel near the wall in an old family paint shop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

### `scene_high_shelf` — Малярная: Полка под потолком — фон сцены разбора

- **Размер файла:** 1440×1744 px
- **Соотношение:** вертикальный ≈ 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1744)
- **Отрицательный промпт:** N-SCENE + N-COMMON
- **Важно:** Сами предметы завала (вёдра, банки, тряпки) на фоне не рисовать — это отдельные спрайты поверх.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, close-up of a high wooden shelf near the ceiling, seen from below in an old family paint shop, the area is mostly empty with free floor and shelf space in the middle for objects to be placed later, soft warm light, vertical composition, full background
```

## 5. Предметы завала

### `debris_box` — Коробка

- **Размер файла:** 384×352 px
- **Соотношение:** почти квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a dusty old cardboard box with its flaps half open, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `debris_sack` — Мешок

- **Размер файла:** 384×352 px
- **Соотношение:** почти квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old burlap sack tied with string, slightly lumpy, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `debris_plank` — Доска

- **Размер файла:** 384×352 px
- **Соотношение:** почти квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, three old wooden planks leaning against each other, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `debris_jar` — Банка

- **Размер файла:** 384×352 px
- **Соотношение:** почти квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a dusty glass jar with a metal lid and small metal parts inside, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `debris_rag` — Тряпка

- **Размер файла:** 384×352 px
- **Соотношение:** почти квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a crumpled old cloth rag, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `debris_crate` — Ящик

- **Размер файла:** 384×352 px
- **Соотношение:** почти квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small wooden crate with metal corners, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `debris_bucket` — Малярная: Ведро

- **Размер файла:** 384×352 px
- **Соотношение:** почти квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old dented metal paint bucket with a wire handle and dried paint drips down the side, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

## 6. Предметы цепочки

### `item_fasteners_1` — Ржавая шайба (уровень 1)

- **Размер файла:** 288×288 px
- **Соотношение:** квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Все 4 уровня генерируйте подряд с одним референсом: игрок должен видеть рост от шайбы до инструмента.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a single small rusty metal washer, game item icon, bold simple silhouette readable at small size, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `item_fasteners_2` — Набор крепежа (уровень 2)

- **Размер файла:** 288×288 px
- **Соотношение:** квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a small round tin with a handful of screws, nuts and washers, game item icon, bold simple silhouette readable at small size, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `item_fasteners_3` — Ремонтный комплект (уровень 3)

- **Размер файла:** 288×288 px
- **Соотношение:** квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a small open repair kit case with neatly arranged screws and a little screwdriver, game item icon, bold simple silhouette readable at small size, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `item_fasteners_4` — Рабочий инструмент (уровень 4)

- **Размер файла:** 288×288 px
- **Соотношение:** квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a beautiful vintage hand brace drill with a polished wooden handle and brass details, game item icon, bold simple silhouette readable at small size, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `item_paints_1` — Малярная: Засохший тюбик краски (уровень 1)

- **Размер файла:** 288×288 px
- **Соотношение:** квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Все 4 уровня генерируйте подряд с одним референсом. Цвет цепочки красок должен отличаться от крепежа (тёплые медовые и зелёные тона против серого металла), чтобы на столе их не путали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a single small squeezed and dried-up metal tube of paint, game item icon, bold simple silhouette readable at small size, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `item_paints_2` — Малярная: Банка краски (уровень 2)

- **Размер файла:** 288×288 px
- **Соотношение:** квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Эта же картинка используется на вводной карточке малярной.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a small closed tin can of paint with a sage green drip on the side, game item icon, bold simple silhouette readable at small size, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `item_paints_3` — Малярная: Кисти и валики (уровень 3)

- **Размер файла:** 288×288 px
- **Соотношение:** квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, two paintbrushes and a small paint roller tied together with string, game item icon, bold simple silhouette readable at small size, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `item_paints_4` — Малярная: Краскопульт (уровень 4)

- **Размер файла:** 288×288 px
- **Соотношение:** квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a beautiful vintage paint spray gun with a glass jar and polished brass details, game item icon, bold simple silhouette readable at small size, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

## 7. Ресурсы

### `res_wood` — Древесина

- **Размер файла:** 160×160 px
- **Соотношение:** квадрат 1:1 (генерируйте 1024×1024 и уменьшите)
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a small neat stack of light wooden boards, simple game resource icon, bold simple silhouette readable at 64 pixels, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `res_metal` — Металл

- **Размер файла:** 160×160 px
- **Соотношение:** квадрат 1:1 (генерируйте 1024×1024 и уменьшите)
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a few steel rods and a small metal plate, simple game resource icon, bold simple silhouette readable at 64 pixels, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `res_parts` — Мелкие детали

- **Размер файла:** 160×160 px
- **Соотношение:** квадрат 1:1 (генерируйте 1024×1024 и уменьшите)
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a small pile of springs, little gears and bolts, simple game resource icon, bold simple silhouette readable at 64 pixels, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

## 8. Находки и финальная карточка

### `find_f_photo` — Находка: фотография у верстака

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-PHOTO + N-COMMON
- **Важно:** Здесь из N-COMMON уберите слово photograph: на картинке нарисованная старая фотография. Человек вымышленный.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, an old sepia family photograph lying on a wooden workbench; in the photo an elderly craftsman in a canvas work apron stands at this same workbench and laughs warmly, slightly blurred old-photo look, soft vignette, warm nostalgic, horizontal 4:3 composition, full illustration with background
```

### `find_f_screws` — Находка: коробка с винтами

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, an open wooden box with many small compartments of neatly sorted screws, each compartment with a little paper label covered in illegible scribbles, seen from above, horizontal 4:3 composition, full illustration with background
```

### `find_f_note` — Находка: записка в шкафу

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a folded old paper note tucked between wooden shelves, a few illegible handwritten scribbles, a beam of warm light falling on it, horizontal 4:3 composition, full illustration with background
```

### `find_f_radio` — Находка: вечерняя мелодия

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a vintage tube radio with a glowing amber dial on a workbench in a cozy evening workshop, a cup of tea beside it, a soft musical atmosphere, horizontal 4:3 composition, full illustration with background
```

### `find_f_clock` — Находка: гравировка на часах

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, the back of an old wooden wall clock with a small engraved brass plate; the engraving is decorative curls, nothing readable, horizontal 4:3 composition, full illustration with background
```

### `final_card` — Финальная карточка: мастерская ожила

> Обновлено 13.10.2026 (см. `ART_TODO.md`).

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON, дополнительно: `numerals, roman numerals, numbers, digits`

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a fully restored cozy workshop in the warm evening: the desk lamp glowing, the radio dial lit, a round wall clock with a plain cream face and simple dot markers instead of numerals on the wall, tools neatly in their places, everything warm and alive, horizontal 4:3 composition, full illustration with background
```

### `find_f_drawing` — Малярная: Находка: детский рисунок

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a child's colored pencil drawing lying on a wooden table under a sheet of tracing paper: a house, a sun and a smiling old man with a huge paintbrush, naive childlike style inside the painting, horizontal 4:3 composition, full illustration with background
```

### `find_f_palette` — Малярная: Находка: палитра

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, an old wooden painter's palette with dried blobs of honey yellow, sage green and warm red paint, a brush resting on it, horizontal 4:3 composition, full illustration with background
```

### `find_f_sign` — Малярная: Находка: эскиз вывески

> Обновлено 13.10.2026 (см. `ART_TODO.md`).

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON, дополнительно: `SHOP, letters, words, lettering, signature, initials`
- **Как добиться:** если буквы всё равно появляются, сгенерируйте и закрасьте центр таблички через inpainting (Canvas → Inpaint) с промптом `empty blank sign panel, faint pencil guide lines`.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, an old yellowed paper sheet on a wooden table with a pencil sketch of an ornate decorative shop sign: a curly wooden frame with flourishes and scrolls, the central panel of the sign is completely blank and empty, only faint pencil guide lines where letters will go, a few touches of paint on the scrolls, a pencil and a small brush lying next to the paper, horizontal 4:3 composition, full illustration with background, no text, no letters
```

### `find_f_apron` — Малярная: Находка: фартук в краске

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a canvas work apron covered in splashes of many paint colors hanging on a nail on a plaster wall, horizontal 4:3 composition, full illustration with background
```

### `find_f_brush` — Малярная: Находка: старая кисть

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, an old wide paintbrush with its wooden handle wrapped in electrical tape, lying on a clean wooden board next to a fresh smooth stroke of paint, horizontal 4:3 composition, full illustration with background
```

### `final_card_paint` — Малярная: Финальная карточка: обе комнаты ожили

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a cozy restored paint shop in the warm evening seen through an open doorway from the restored workshop: neat paint cans on a rack, an easel with a small painting, a desk lamp glowing in the workshop in the foreground, everything warm and alive, horizontal 4:3 composition, full illustration with background
```

## 9. Логотип и материалы страницы

### `logo` — Эмблема на экране загрузки

- **Размер файла:** 256×256 px
- **Соотношение:** квадрат 1:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a round badge emblem: a crossed wooden mallet and a wrench in front of a small warmly lit window, simple bold shapes, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `store_icon` — Иконка игры для каталога (не в игре)

- **Размер файла:** 512×512 px
- **Соотношение:** квадрат 1:1, PNG
- **Отрицательный промпт:** N-STORE + N-COMMON
- **Важно:** Не скриншот игры и без надписей — требование платформы.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, app icon: a glowing vintage desk lamp on an old wooden workbench with a few hand tools, centered, strong simple silhouette, warm cream and copper background, fills the whole square
```

### `store_cover` — Обложка для каталога (не в игре)

- **Размер файла:** 800×470 px
- **Соотношение:** горизонтальный ≈ 16:9 (генерируйте 16:9 и обрежьте до 800×470)
- **Отрицательный промпт:** N-STORE + N-COMMON
- **Важно:** Не скриншот игры и без надписей — требование платформы.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wide view of a cozy old workshop half restored: the left half still dusty and cluttered with boxes, the right half clean and warmly lit by a glowing desk lamp, a wooden workbench in the center, inviting, horizontal composition
```

## 10. Вступление (история перед обучением)

Четыре иллюстрации к карточкам вступления, тот же формат, что у находок. Генерируйте их одной серией с одним референсом стиля; в первой карточке палитра холоднее (город), дальше всё теплее.

### `story_city` — Вступление: город

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a tired city evening seen through a small apartment window: grey rain on the glass, blurred lights of a busy street and a metro station far below, a cold cup of coffee and a laptop on the windowsill, muted cool blue-grey palette with a single warm lamp inside, a feeling of routine and fatigue, no people, horizontal 4:3 composition, full illustration with background
```

### `story_key` — Вступление: ключ

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, an old heavy brass key with a blank cardboard tag tied with string, lying in an open wooden desk drawer among papers and pencils, warm lamp light falling on it, a quiet moment of memory, the tag is blank with no writing, horizontal 4:3 composition, full illustration with background
```

### `story_road` — Вступление: решение

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a small rural bus stop at dawn by a country road through fields, a packed travel bag on the bench, soft pink and golden morning light, mist over the fields, a winding road leading to a distant village with small wooden houses, hopeful and calm, no people, no signs, horizontal 4:3 composition, full illustration with background
```

### `story_arrival` — Вступление: приезд

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, the half-open old wooden door of a small family workshop seen from the threshold, dusty dim interior with cardboard boxes, sacks and old planks piled by the door, warm sunbeams with floating dust coming through a small window, a sense of a new beginning, no people, horizontal 4:3 composition, full illustration with background
```

## Отрицательные промпты

К каждому набору добавляйте N-COMMON. Если генератор не поддерживает отрицательный промпт, допишите в конец основного: `avoid: ...` с теми же словами.

### N-COMMON

```
text, letters, numbers, words, writing, signs, watermark, signature, logo, brand names, user interface, frame, border, rounded corners, photorealistic, photograph, 3d render, CGI, plastic look, glossy, neon colors, oversaturated, harsh black shadows, noise, blurry, low resolution, jpeg artifacts, deformed, distorted perspective, fisheye, tilted horizon
```

### N-ROOM

```
furniture, workbench, table, cabinet, wardrobe, shelves with objects, window, clock, lamp, radio, boxes, clutter, objects in the middle of the room, people, animals, top-down view, bird's-eye view, extreme high angle, isometric, deep one-point perspective, long corridor
```

### N-SCENE

```
people, animals, boxes, sacks, jars, clutter piles, big furniture in the middle, top-down view, extreme high angle, deep corridor perspective
```

### N-SPRITE

```
background scenery, room, wall, floor, ground, table under the object, multiple objects, duplicate objects, cropped, cut off edges, cast shadow, people, hands
```

### N-CARD

```
people, hands, faces, modern objects, smartphone, computer, readable text
```

### N-PHOTO

```
military uniform, medals, orders, flags, weapons, religious symbols, famous person, celebrity, young person, modern clothing, sad or crying face, readable text
```

### N-STORE

```
screenshot, game interface, buttons, menus, platform logo, Yandex logo, text, title, letters, frame, border, rounded corners, people
```
