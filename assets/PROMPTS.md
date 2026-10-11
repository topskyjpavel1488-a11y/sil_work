# Промпты для генерации графики

Каждая картинка — отдельный готовый промпт: копируйте целиком. Размер файла — финальный (2× от размера на экране); генерируйте в ближайшем доступном соотношении и уменьшайте/обрезайте до указанного. Отрицательные промпты вынесены в конец: у каждой картинки указан набор, к нему **всегда добавляйте общий набор N-COMMON** (кроме случаев, где сказано иначе).

Стиль: вариант №1 (тёплый, живописный), перспектива «кукольный домик в разрезе»: задняя стена прямо на зрителя, камера чуть сверху (~30°). Порядок работы: `room_bg` → верстак (сначала `obj_workbench_3`, затем остальные состояния из него) → остальные объекты → кучи и фоны зон → завал → предметы и ресурсы → находки → логотип, иконка, обложка. Готовые удачные картинки используйте как референс стиля для следующих (Midjourney `--sref`, IP-Adapter в Stable Diffusion, «изображение-референс» в других сервисах).

Спрайты (объекты, кучи, завал, предметы, ресурсы, логотип) нужны в PNG с прозрачным фоном: генерируйте на белом, затем уберите фон.

Как подключать готовые файлы — в `ART_BRIEF.md`; можно просто прислать мне файлы, названные по ключам.

## 1. Фон комнаты

### `room_bg` — Фон мастерской (пустая комната)

- **Размер файла:** 1440×1696 px
- **Соотношение:** вертикальный 5:6 (генерируйте 4:5, например 1440×1800, и обрежьте по высоте до 1696)
- **Отрицательный промпт:** N-ROOM + N-COMMON
- **Важно:** Окно, полку, часы, верстак и шкаф на фоне не рисовать: это отдельные объекты, которые чинятся. Дверь можно — она декоративная и обозначает «Кучу у двери».

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, interior of a small old family workshop, the back wall faces the viewer straight on and fills the upper 40 percent of the picture: vertical wooden plank wall with faded sage green trim and posts, plenty of empty wall space; below it a worn wooden plank floor in gentle perspective fills the lower part, mostly empty; side walls visible only as thin slivers at the edges; a simple old wooden door on the far left of the back wall; warm sunlight patches on the floor; the room is completely empty with no furniture, vertical composition, full background
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

