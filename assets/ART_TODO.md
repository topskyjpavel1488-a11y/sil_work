# Графика: что переделать и что осталось

Состояние на 13.10.2026: подключено 86 из 90 нужных картинок. Ниже два блока: **что переделать** (уже подключено, но с недостатками) и **что ещё не сгенерировано**. У каждой картинки — размер, промпт и отрицательный промпт; наборы N-… расписаны в конце файла, к каждому добавляйте N-COMMON.

Общие правила те же, что в `PROMPTS.md`:
- генерируйте приватно (тариф Essential), на ровном белом фоне для спрайтов — фон я уберу сам при подключении;
- никакого текста, букв, цифр и подписей на картинках, в том числе цифр на циферблатах и подписи художника в углу;
- **состояния объекта — правками одной картинки** (так получились часы): сначала генерируйте восстановленное состояние по промпту и выберите лучший вариант; затем откройте его карточку в Leonardo и попросите модель отредактировать эту картинку — тексты правок для «частично починено» и «заброшено» даны у каждого ключа. Отрицательный промпт для правок не нужен;
- уже подключённые картинки используйте как референс стиля.

Называйте файлы ключами (например `obj_wall_clock_2.png`) и присылайте архивом, как в прошлый раз.

---

# Часть 1. Переделать

## 1.1. Эскиз вывески — `find_f_sign` — ✅ готово 13.10.2026

Новая вывеска без надписи подключена. Раздел оставлен для справки.

**Что не так:** на картинке крупно и читаемо написано «SHOP», в углу подпись «LADRE». Текста на картинках быть не должно (игра на двух языках, требование к медиаматериалам). Вместо букв — пустая табличка или орнамент.

### `find_f_sign` — Находка: эскиз вывески

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON, дополнительно: `SHOP, letters, words, lettering, signature, initials`
- **Как добиться:** если буквы всё равно появляются, сгенерируйте и закрасьте центр таблички через inpainting (Canvas → Inpaint) с промптом `empty blank sign panel, faint pencil guide lines`.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, an old yellowed paper sheet on a wooden table with a pencil sketch of an ornate decorative shop sign: a curly wooden frame with flourishes and scrolls, the central panel of the sign is completely blank and empty, only faint pencil guide lines where letters will go, a few touches of paint on the scrolls, a pencil and a small brush lying next to the paper, horizontal 4:3 composition, full illustration with background, no text, no letters
```

## 1.2. Настенные часы — `obj_wall_clock_0`, `_1`, `_2` — ✅ готово 13.10.2026

Серия из трёх состояний без цифр подключена, контуры совпадают до пикселя. Раздел оставлен для справки: **так стоит делать и остальные объекты.** Восстановленное состояние сгенерировано по промпту ниже, а два других — правками этой картинки в Leonardo; тексты правок, которые сработали, — у ключей `_1` и `_0`.

### `obj_wall_clock_2` — Настенные часы, шаг 2 из 2 (восстановлено)

> Обновлено 13.10.2026 (см. `ART_TODO.md`).

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2 (часы почти круглые — оставьте поля по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `numerals, roman numerals, numbers, digits, brand name`

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a round vintage wall clock in a wooden case with a pendulum below, seen straight on, a plain cream clock face with simple small dot markers instead of numerals, no numbers, no roman numerals, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, running, the pendulum mid-swing, the clock face clean and bright, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
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

## 1.3. Финальная карточка мастерской — `final_card` — ✅ готово 13.10.2026 (новая карточка: на часах только риски)

**Что не так:** на стене двое часов с цифрами на циферблатах. Мелко, но по правилу «без цифр» лучше переделать. Можно не генерировать заново, а закрасить циферблаты через inpainting промптом `plain cream clock face with small dot markers, no numerals`.

### `final_card` — Финальная карточка: мастерская ожила

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON, дополнительно: `numerals, roman numerals, numbers, digits`

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, a fully restored cozy workshop in the warm evening: the desk lamp glowing, the radio dial lit, a round wall clock with a plain cream face and simple dot markers instead of numerals on the wall, tools neatly in their places, everything warm and alive, horizontal 4:3 composition, full illustration with background
```

## 1.4. Фоны комнат — `room_bg` и `room_paint_bg` — ✅ готово 13.10.2026

Новые фоны подключены. Плинтус у них был на 60–61% высоты: я срезал сверху полосу потолка и немного боковых стен, чтобы он встал ровно посередине (оригиналы — в `assets/source/raw/`). Если будете перегенерировать — делайте сразу по подсказке композиции.

**Что не так:** игра расставляет объекты по сетке: всё настенное (полки, окна, часы, антресоль, радио, стеллаж) стоит в **верхней половине** комнаты, всё напольное (верстак, шкаф, столы, кучи завала) — в **нижней**. Нынешние фоны нарисованы с глубокой перспективой: двускатная крыша, большие боковые стены, пол начинается ниже середины. Поэтому напольные вещи «залезают» на стены.

Нужен фон как сцена театра или кукольный домик без передней стены:
- задняя стена смотрит прямо на зрителя и занимает **ровно верхнюю половину** картинки;
- плинтус — прямая горизонтальная линия **ровно посередине высоты**;
- нижняя половина — пол с очень мягкой перспективой;
- без боковых стен, потолка, балок и углов.

**Как добиться в Leonardo:**
1. Загрузите картинку-подсказку композиции из `assets/source/guides/` (`room_bg_guide.png` для мастерской, `room_paint_bg_guide.png` для малярной) как **Image Guidance → Image to Image** с силой 0,6–0,75 или как **Depth / Edge to Image**, если доступно. Она задаёт главное: где стена, где плинтус, где пол.
2. Текущий фон добавьте вторым референсом (**Style Reference**), чтобы сохранить цвет и свет.
3. Промпт ниже. Размер — не меньше 1440×1696 (генерируйте 4:5, например 1440×1800; лишнее я обрежу).
4. Проверка: положите результат рядом со схемой `room_bg_layout.jpg` или `room_paint_bg_layout.jpg` — там подписано, какой объект где стоит. Плинтус должен совпасть с пунктирной линией.

### `room_bg` — Фон мастерской (пустая комната)

- **Размер файла:** не меньше 1440×1696 px
- **Соотношение:** вертикальный 5:6 (генерируйте 4:5 и обрежьте по высоте до 1696)
- **Отрицательный промпт:** N-ROOM + N-COMMON, дополнительно: `side walls, ceiling, roof, rafters, gable, beams across the top, room corners, deep perspective, vanishing point, door, window, signature, artist name, watermark`
- **Подсказка композиции:** `assets/source/guides/room_bg_guide.png`, схема расстановки — `room_bg_layout.jpg`.
- **Важно:** никаких предметов — окно, полка, часы, верстак и шкаф будут отдельными спрайтами поверх фона.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background
```

### `room_paint_bg` — Фон малярной (пустая комната)

- **Размер файла:** не меньше 1440×1696 px
- **Соотношение:** вертикальный 5:6 (генерируйте 4:5 и обрежьте по высоте до 1696)
- **Отрицательный промпт:** N-ROOM + N-COMMON, дополнительно: `side walls, ceiling, roof, rafters, gable, beams across the top, room corners, deep perspective, vanishing point, door, window, signature, artist name, watermark`
- **Подсказка композиции:** `assets/source/guides/room_paint_bg_guide.png`, схема расстановки — `room_paint_bg_layout.jpg`.
- **Важно:** тот же ракурс и линия пола, что у мастерской: комнаты должны выглядеть соседними в одном доме. Стеллаж, окно, мольберт, стремянку и столы не рисовать.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family paint shop: the back wall is whitewashed plaster with old faint splashes of honey, sage green and warm red paint and a sage green wooden wainscot panel along its lower part above the baseboard, the floor is worn light wooden planks with old dried paint drips, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background
```

## 1.5. Окно — `obj_window_0`, `_1`, `_2` — ✅ готово 13.10.2026 (новая серия без мазков)

**Что не так:** вокруг рамы, особенно у `obj_window_2`, остались кремовые живописные мазки (как кусок штукатурки). Это часть рисунка, автоматически их не убрать. На фоне комнаты выглядит как светлое пятно вокруг окна. Если хотите аккуратнее — сгенерируйте серию заново с чистыми краями: сначала `_2`, из него `_1` и `_0`.

### `obj_window_2` — Окно, шаг 2 из 2 (восстановлено)

> Обновлено 13.10.2026 (см. `ART_TODO.md`).

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `plaster, wall patch, brush strokes around the object, splashes, vines outside the frame`

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window seen straight on, as a separate object, crisp clean edges around the frame, nothing around the frame, no wall, no plaster, no paint strokes around it, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, clean clear panes with warm daylight shining through, a green leafy view outside, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
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

## 1.6. Верстак — `obj_workbench_0`…`_3` — ✅ готово 13.10.2026: новая серия, одни тиски, свободная столешница; лампа и ящик пересажены на неё

**Что не так:** на новом фоне видно, что нынешний верстак не подходит: двое высоких тисков по краям и загромождённая столешница, а лампа и ящик с крепежом должны стоять прямо на ней. Нужна новая серия: широкий низкий верстак, ровная столешница хорошо видна, тиски одни — слева, **середина столешницы свободна**.

**Порядок:** сначала `_3` (восстановлено) по промпту генерации, затем `_2`, `_1`, `_0` — правками этой картинки в Leonardo.

### `obj_workbench_3` — Верстак, шаг 3 из 3 (восстановлено)

- **Размер файла:** 1024×576 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `second vise, vise at both ends, cluttered tabletop, lamp, boxes on the tabletop`
- **Важно:** верстак переделывается полностью (13.10.2026). Генерируйте это состояние первым. Середина столешницы должна остаться **свободной**: на неё игра ставит лампу и ящик с крепежом — отдельными картинками. Столешница должна хорошо читаться как ровная поверхность, тиски — одни, слева.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long sturdy old wooden carpenter's workbench seen from the front, very wide and low, the thick wooden tabletop clearly visible from slightly above as a flat surface across the whole length, one small metal vise at the left end, two drawers under the tabletop and a lower shelf between the legs, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, a couple of small hand tools neatly laid at the right end of the tabletop, the middle of the tabletop left empty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
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

## 1.7. Малярная: поправить после партии 13.10.2026

**Что не так:**
- **Стеллаж с красками** (`obj_paint_rack_0…3`) нарисован на стене с плинтусом и полом, а не на белом фоне — вырезать его автоматически чисто нельзя, поэтому в игре пока заглушка. Нужно убрать фон правкой каждой из четырёх картинок (текст один и тот же).
- **Шкафчик для растворителей `_3`** — деревянный бежевый, а `_0`–`_2` — зелёный металлический: при последнем ремонте шкафчик «превратится» в другой.
- **Шлифовальный верстак `_3`** — другой формы, чем `_0`–`_2`.

Для двух последних проще всего сделать `_3` **правкой картинки `_2`** («почти готово» → «восстановлено»), тогда форма совпадёт.

### `obj_paint_rack_0` — Стеллаж с красками, шаг 0 из 3 — убрать стену

- **Как делать:** правка уже готовой картинки `obj_paint_rack_0` (откройте её карточку в Leonardo).
- **Отрицательный промпт:** не нужен — это правка готовой картинки

```
Edit this exact image: keep the paint rack with its cans exactly as it is — same shape, colors, details and camera angle. Remove the wall, the baseboard and the floor around and under it, and the shadow on the wall: replace everything around the paint rack with its cans with a plain flat pure white background. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_rack_1` — Стеллаж с красками, шаг 1 из 3 — убрать стену

- **Как делать:** правка уже готовой картинки `obj_paint_rack_1` (откройте её карточку в Leonardo).
- **Отрицательный промпт:** не нужен — это правка готовой картинки

```
Edit this exact image: keep the paint rack with its cans exactly as it is — same shape, colors, details and camera angle. Remove the wall, the baseboard and the floor around and under it, and the shadow on the wall: replace everything around the paint rack with its cans with a plain flat pure white background. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_rack_2` — Стеллаж с красками, шаг 2 из 3 — убрать стену

- **Как делать:** правка уже готовой картинки `obj_paint_rack_2` (откройте её карточку в Leonardo).
- **Отрицательный промпт:** не нужен — это правка готовой картинки

```
Edit this exact image: keep the paint rack with its cans exactly as it is — same shape, colors, details and camera angle. Remove the wall, the baseboard and the floor around and under it, and the shadow on the wall: replace everything around the paint rack with its cans with a plain flat pure white background. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_rack_3` — Стеллаж с красками, шаг 3 из 3 — убрать стену

- **Как делать:** правка уже готовой картинки `obj_paint_rack_3` (откройте её карточку в Leonardo).
- **Отрицательный промпт:** не нужен — это правка готовой картинки

```
Edit this exact image: keep the paint rack with its cans exactly as it is — same shape, colors, details and camera angle. Remove the wall, the baseboard and the floor around and under it, and the shadow on the wall: replace everything around the paint rack with its cans with a plain flat pure white background. No redesign, no new or missing parts, no text or numbers.
```

### `obj_solvent_cabinet_3` — Шкафчик для растворителей, шаг 3 из 3 (восстановлено) — сделать из _2

- **Как делать:** правка картинки `obj_solvent_cabinet_2`: откройте её карточку и вставьте текст.
- **Отрицательный промпт:** не нужен — это правка готовой картинки

```
Edit this exact metal cabinet, preserving its silhouette, proportions, doors, handles, body and camera angle.

Fully restored and cared for: the whole body is freshly and evenly painted sage green with no bare spots or scuffs, the doors are closed neatly, the handles are polished brass, and three plain glass bottles without labels stand in a row on top.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no text or numbers.
```

### `obj_sanding_bench_3` — Шлифовальный верстак, шаг 3 из 3 (восстановлено) — сделать из _2

- **Как делать:** правка картинки `obj_sanding_bench_2`: откройте её карточку и вставьте текст.
- **Отрицательный промпт:** не нужен — это правка готовой картинки

```
Edit this exact sanding bench, preserving its silhouette, proportions, top, legs, sanding block and camera angle.

Fully restored and cared for: clean, warm, freshly finished wood on the top and the legs, no dust, no cracks; sandpaper sheets neatly stacked, and a freshly sanded wooden chair leg with a soft brush resting on the top.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no text or numbers.
```

---

# Часть 2. Ещё не сгенерировано

Кучи завала (`zone_*`) и фоны сцен разбора (`scene_*`) рисовать **не нужно**: игра собирает кучу из спрайтов завала, а фон сцены — из увеличенного фона комнаты (минус 26 картинок). Если когда-нибудь захочется отдельный рисунок для зоны, его промпт остался в `PROMPTS.md`, и он сам заменит собранный вариант.

✅ **Всё нужное сгенерировано** (13.10.2026). Осталось поправить только то, что перечислено в разделе 1.7.

---

# Отрицательные промпты

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
