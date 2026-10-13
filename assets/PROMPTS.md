# Промпты для генерации графики

Каждая картинка — отдельный готовый промпт: копируйте целиком. Размер файла — финальный (2× от размера на экране); генерируйте в ближайшем доступном соотношении и уменьшайте/обрезайте до указанного. Отрицательные промпты вынесены в конец: у каждой картинки указан набор, к нему **всегда добавляйте общий набор N-COMMON** (кроме случаев, где сказано иначе).

Стиль: вариант №1 (тёплый, живописный), перспектива «кукольный домик в разрезе»: задняя стена прямо на зрителя, камера чуть сверху (~30°). Порядок работы: `room_bg` → верстак (сначала `obj_workbench_3`, затем остальные состояния из него) → остальные объекты → кучи и фоны зон → завал → предметы и ресурсы → находки → логотип, иконка, обложка. Готовые удачные картинки используйте как референс стиля для следующих (Midjourney `--sref`, IP-Adapter в Stable Diffusion, «изображение-референс» в других сервисах).

С версии 0.7 в игре две комнаты. Картинки второй комнаты (малярной) помечены «Малярная:» и идут в каждом разделе после мастерской. Делайте их тем же порядком (`room_paint_bg` → объекты → кучи и фоны → завал → краски → находки), а готовую мастерскую берите как референс стиля, чтобы комнаты выглядели одним домом.

Спрайты (объекты, кучи, завал, предметы, ресурсы, логотип) нужны в PNG с прозрачным фоном: генерируйте на белом, затем уберите фон.

Как подключать готовые файлы — в `ART_BRIEF.md`; можно просто прислать мне файлы, названные по ключам.

## 1. Фоны комнат

### `room_bg` — Фон мастерской (пустая комната)

> **Устарело (13.10.2026):** композиция не совпадает с раскладкой игры. Актуальный промпт и картинка-подсказка — в `ART_TODO.md`, раздел 1.4.

- **Размер файла:** 1440×1696 px
- **Соотношение:** вертикальный 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1696)
- **Отрицательный промпт:** N-ROOM + N-COMMON
- **Важно:** Окно, полку, часы, верстак и шкаф на фоне не рисовать: это отдельные объекты, которые чинятся. Дверь можно — она декоративная и обозначает «Кучу у двери».

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, interior of a small old family workshop, the back wall faces the viewer straight on and fills the upper 40 percent of the picture: vertical wooden plank wall with faded sage green trim and posts, plenty of empty wall space; below it a worn wooden plank floor in gentle perspective fills the lower part, mostly empty; side walls visible only as thin slivers at the edges; a simple old wooden door on the far left of the back wall; warm sunlight patches on the floor; the room is completely empty with no furniture, vertical composition, full background
```

### `room_paint_bg` — Малярная: фон малярной (пустая комната)

> **Устарело (13.10.2026):** композиция не совпадает с раскладкой игры. Актуальный промпт и картинка-подсказка — в `ART_TODO.md`, раздел 1.4.

- **Размер файла:** 1440×1696 px
- **Соотношение:** вертикальный 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1696)
- **Отрицательный промпт:** N-ROOM + N-COMMON
- **Важно:** Тот же ракурс и свет, что у `room_bg`: используйте его как референс. Стеллаж, окно, мольберт, стремянку и столы на фоне не рисовать — это объекты, которые чинятся.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, interior of a small old family paint shop next to the workshop, the back wall faces the viewer straight on and fills the upper 40 percent of the picture: whitewashed plaster wall with old faint paint splashes and a sage green wooden skirting, plenty of empty wall space; below it a worn wooden plank floor with old dried paint drips in gentle perspective fills the lower part, mostly empty; side walls visible only as thin slivers at the edges; warm sunlight patches on the floor; the room is completely empty with no furniture, vertical composition, full background
```

## 2. Объекты восстановления

### `obj_workbench_0` — Верстак, шаг 0 из 3 (заброшено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a sturdy old wooden carpenter's workbench with a metal vise on the left end, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, cracked and warped tabletop boards, a rusty vise, a broken leg brace, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_workbench_1` — Верстак, шаг 1 из 3 (частично починено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a sturdy old wooden carpenter's workbench with a metal vise on the left end, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, brand-new light wooden boards on the tabletop, the vise still rusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_workbench_2` — Верстак, шаг 2 из 3 (частично починено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a sturdy old wooden carpenter's workbench with a metal vise on the left end, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, new tabletop, the frame firmly fastened with fresh screws and brackets, the vise cleaned, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_workbench_3` — Верстак, шаг 3 из 3 (восстановлено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a sturdy old wooden carpenter's workbench with a metal vise on the left end, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, a few hand tools neatly laid on the tabletop, the vise polished, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_fastener_box_0` — Ящик с крепежом, шаг 0 из 1 (заброшено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small wooden cabinet of many little drawers for screws and nails, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, drawers crooked and stuck, some missing, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_fastener_box_1` — Ящик с крепежом, шаг 1 из 1 (восстановлено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small wooden cabinet of many little drawers for screws and nails, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, all drawers straight, small copper handles shining, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_lamp_0` — Настольная лампа, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (лампа может стоять в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a vintage articulated desk lamp with a round metal shade on a heavy base, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, the shade dented, the arm bent, the cord frayed, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_lamp_1` — Настольная лампа, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (лампа может стоять в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a vintage articulated desk lamp with a round metal shade on a heavy base, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, repaired and straight, switched off, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_lamp_2` — Настольная лампа, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (лампа может стоять в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a vintage articulated desk lamp with a round metal shade on a heavy base, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, switched on, glowing with soft warm yellow light, a gentle glow halo around the shade, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_window_0` — Окно, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window seen straight on, as a separate object, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, dirty cracked panes, peeling paint on the frame, cobwebs in the corners, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_window_1` — Окно, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window seen straight on, as a separate object, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the frame repaired and repainted sage green, the glass still cloudy, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_window_2` — Окно, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window seen straight on, as a separate object, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, clean clear panes with warm daylight shining through, a green leafy view outside, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_cabinet_0` — Шкаф для инструментов, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×608 px
- **Соотношение:** вертикальный 3:4
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden tool cabinet with two doors, seen straight on, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, one door hanging on a single hinge, scratched and dusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_cabinet_1` — Шкаф для инструментов, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×608 px
- **Соотношение:** вертикальный 3:4
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden tool cabinet with two doors, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, both doors back on their hinges, still worn, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_cabinet_2` — Шкаф для инструментов, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×608 px
- **Соотношение:** вертикальный 3:4
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden tool cabinet with two doors, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, new hinges and handles, shelves fixed, the doors slightly open showing empty shelves, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_cabinet_3` — Шкаф для инструментов, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×608 px
- **Соотношение:** вертикальный 3:4
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden tool cabinet with two doors, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, the doors open, hand tools neatly hung inside on pegs, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_shelf_0` — Полка с банками, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wooden wall shelf with glass jars of screws and small parts, seen straight on, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, the shelf sagging on one side, jars dusty and tipped over, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_shelf_1` — Полка с банками, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wooden wall shelf with glass jars of screws and small parts, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the shelf straight and level, jars still dusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_shelf_2` — Полка с банками, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wooden wall shelf with glass jars of screws and small parts, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, jars clean and neatly lined up, catching the light, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_radio_0` — Радиоприёмник, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×224 px
- **Соотношение:** горизонтальный 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a vintage tube radio in a rounded wooden case with a round tuning dial and fabric speaker grille, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, the back panel missing, dusty, the dial glass cracked, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_radio_1` — Радиоприёмник, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×224 px
- **Соотношение:** горизонтальный 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a vintage tube radio in a rounded wooden case with a round tuning dial and fabric speaker grille, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, reassembled and clean, the dial dark, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_radio_2` — Радиоприёмник, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×224 px
- **Соотношение:** горизонтальный 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a vintage tube radio in a rounded wooden case with a round tuning dial and fabric speaker grille, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, working: the tuning dial glows warm amber, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_wall_clock_0` — Настенные часы, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2 (часы почти круглые — оставьте поля по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a round vintage wall clock in a wooden case with a pendulum below, seen straight on, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, the glass cracked, the hands missing, the pendulum hanging crooked, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_wall_clock_1` — Настенные часы, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2 (часы почти круглые — оставьте поля по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a round vintage wall clock in a wooden case with a pendulum below, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, new hands in place, the pendulum straight but still, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_wall_clock_2` — Настенные часы, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2 (часы почти круглые — оставьте поля по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a round vintage wall clock in a wooden case with a pendulum below, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, running, the pendulum mid-swing, the clock face clean and bright, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_table_0` — Малярная: Покрасочный стол, шаг 0 из 3 (заброшено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long old wooden painting table covered with layers of colorful dried paint, a few brushes in a jar on it, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, one leg broken, the top warped and stained, dried paint cans knocked over, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_table_1` — Малярная: Покрасочный стол, шаг 1 из 3 (частично починено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long old wooden painting table covered with layers of colorful dried paint, a few brushes in a jar on it, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the leg fixed and the top sanded, still stained, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_table_2` — Малярная: Покрасочный стол, шаг 2 из 3 (частично починено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long old wooden painting table covered with layers of colorful dried paint, a few brushes in a jar on it, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, a fresh drop cloth spread on the top, a few clean paint cans, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_table_3` — Малярная: Покрасочный стол, шаг 3 из 3 (восстановлено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long old wooden painting table covered with layers of colorful dried paint, a few brushes in a jar on it, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, neat paint cans, brushes in a jar and a half-painted wooden stool on the top, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_drying_rack_0` — Малярная: Сушилка для деталей, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden drying rack with several slatted shelves for freshly painted parts, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, several slats broken, the frame leaning, cobwebs between shelves, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_drying_rack_1` — Малярная: Сушилка для деталей, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden drying rack with several slatted shelves for freshly painted parts, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, new slats, the frame straight, the shelves empty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_drying_rack_2` — Малярная: Сушилка для деталей, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden drying rack with several slatted shelves for freshly painted parts, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, small freshly painted wooden parts drying on the shelves in soft sage, honey and red colors, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_rack_0` — Малярная: Стеллаж с красками, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wide wooden wall rack with rows of paint cans, seen straight on, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, the rack sagging, cans rusty, dented and tipped over, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_rack_1` — Малярная: Стеллаж с красками, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wide wooden wall rack with rows of paint cans, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the rack straight and fixed, only a few old cans, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_rack_2` — Малярная: Стеллаж с красками, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wide wooden wall rack with rows of paint cans, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, cans sorted in rows, labels plain without text, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_rack_3` — Малярная: Стеллаж с красками, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wide wooden wall rack with rows of paint cans, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, full rows of clean cans with colorful drips of honey, sage green and warm red, catching the light, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_vent_window_0` — Малярная: Окно с вытяжкой, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window with a small round metal ventilation fan built into one pane, seen straight on, as a separate object, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, paint-splattered cloudy panes, the fan blades bent and dusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_vent_window_1` — Малярная: Окно с вытяжкой, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window with a small round metal ventilation fan built into one pane, seen straight on, as a separate object, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the frame repaired and repainted, the fan fixed but still, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_vent_window_2` — Малярная: Окно с вытяжкой, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window with a small round metal ventilation fan built into one pane, seen straight on, as a separate object, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, clean panes with warm daylight, the fan spinning gently, fresh air feeling, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_easel_0` — Малярная: Мольберт, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden studio easel standing on the floor, seen straight on, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, one leg missing, the easel lying crooked, splattered with dried paint, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_easel_1` — Малярная: Мольберт, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden studio easel standing on the floor, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, standing straight on new legs, empty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_easel_2` — Малярная: Мольберт, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden studio easel standing on the floor, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, holding a small canvas with a simple painting of a cozy house and a tree, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_ladder_0` — Малярная: Стремянка, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden step ladder covered in paint drips, standing open, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, two steps broken, one leg cracked, the hinge rusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_ladder_1` — Малярная: Стремянка, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden step ladder covered in paint drips, standing open, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, new steps, the hinge oiled, still dusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_ladder_2` — Малярная: Стремянка, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden step ladder covered in paint drips, standing open, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, sturdy and clean, a small paint can and a brush on its top step, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_solvent_cabinet_0` — Малярная: Шкафчик для растворителей, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small low metal cabinet with two doors for paint solvents, seen straight on, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, rusty, one door dented and hanging open, empty dusty bottles inside, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_solvent_cabinet_1` — Малярная: Шкафчик для растворителей, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small low metal cabinet with two doors for paint solvents, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the rust cleaned, the door straightened, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_solvent_cabinet_2` — Малярная: Шкафчик для растворителей, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small low metal cabinet with two doors for paint solvents, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, freshly repainted sage green, new handles, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_solvent_cabinet_3` — Малярная: Шкафчик для растворителей, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small low metal cabinet with two doors for paint solvents, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, the doors closed neatly, plain glass bottles without labels standing on top in a row, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_sanding_bench_0` — Малярная: Шлифовальный верстак, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wooden sanding bench with a hand sanding block and sheets of sandpaper, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, the top cracked, covered in thick dust and wood shavings, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_sanding_bench_1` — Малярная: Шлифовальный верстак, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wooden sanding bench with a hand sanding block and sheets of sandpaper, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, a new top, still dusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_sanding_bench_2` — Малярная: Шлифовальный верстак, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wooden sanding bench with a hand sanding block and sheets of sandpaper, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, clean, sandpaper sheets neatly stacked, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_sanding_bench_3` — Малярная: Шлифовальный верстак, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wooden sanding bench with a hand sanding block and sheets of sandpaper, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, a freshly sanded wooden chair leg resting on it, a soft brush beside, warm and tidy, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

## 3. Кучи завала в комнате

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

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a fully restored cozy workshop in the warm evening: the desk lamp glowing, the radio dial lit, the wall clock on the wall, tools neatly in their places, everything warm and alive, horizontal 4:3 composition, full illustration with background
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

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, an old paper sketch of a decorative shop sign with ornate curls and flourishes, the lettering faded and unreadable, pencil and a little paint, horizontal 4:3 composition, full illustration with background
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
