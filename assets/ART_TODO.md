# Графика: что переделать и что осталось

Состояние на 13.10.2026: подключено 54 из 90 нужных картинок. Ниже два блока: **что переделать** (уже подключено, но с недостатками) и **что ещё не сгенерировано**. У каждой картинки — размер, промпт и отрицательный промпт; наборы N-… расписаны в конце файла, к каждому добавляйте N-COMMON.

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

## 1.3. Финальная карточка мастерской — `final_card` (по желанию)

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

## 1.5. Окно — `obj_window_0`, `_1`, `_2` (по желанию)

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

## 1.6. Верстак — `obj_workbench_0`…`_3` — переделать полностью (обязательно)

**Что не так:** на новом фоне видно, что нынешний верстак не подходит: двое высоких тисков по краям и загромождённая столешница, а лампа и ящик с крепежом должны стоять прямо на ней. Нужна новая серия: широкий низкий верстак, ровная столешница хорошо видна, тиски одни — слева, **середина столешницы свободна**.

**Порядок:** сначала `_3` (восстановлено) по промпту генерации, затем `_2`, `_1`, `_0` — правками этой картинки в Leonardo.

### `obj_workbench_3` — Верстак, шаг 3 из 3 (восстановлено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `second vise, vise at both ends, cluttered tabletop, lamp, boxes on the tabletop`
- **Важно:** верстак переделывается полностью (13.10.2026). Генерируйте это состояние первым. Середина столешницы должна остаться **свободной**: на неё игра ставит лампу и ящик с крепежом — отдельными картинками. Столешница должна хорошо читаться как ровная поверхность, тиски — одни, слева.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long sturdy old wooden carpenter's workbench seen from the front, very wide and low, the thick wooden tabletop clearly visible from slightly above as a flat surface across the whole length, one small metal vise at the left end, two drawers under the tabletop and a lower shelf between the legs, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, a couple of small hand tools neatly laid at the right end of the tabletop, the middle of the tabletop left empty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_workbench_2` — Верстак, шаг 2 из 3 (частично починено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact workbench, preserving its silhouette, proportions, tabletop, vise, drawers, legs and camera angle.

Clearly almost repaired: the new light tabletop is in place and the frame is firmly fixed — fresh screws and small new metal brackets are visible at the joints, the cross brace is whole. The vise is cleaned of rust but still bare metal. The drawers remain worn and scratched, one drawer front still has a crack. No tools on the tabletop.

The workbench must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_workbench_1` — Верстак, шаг 1 из 3 (частично починено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact workbench, preserving its silhouette, proportions, tabletop, vise, drawers, legs and camera angle.

Clearly partially repaired, first stage: the tabletop is made of fresh, light new boards, clean and bright. Everything below the tabletop is still old: dark, scratched, dusty legs and drawers, a split cross brace, a rusty vise. No tools on the tabletop.

The workbench must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_workbench_0` — Верстак, шаг 0 из 3 (заброшено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact workbench, preserving its silhouette, proportions, tabletop, vise, drawers, legs and camera angle.

Clearly abandoned for many years: the tabletop boards are cracked, warped and stained, edges chipped, heavy dust and grime on every surface. The vise is rusty and dull. The drawers are scratched with peeling finish, one drawer front is cracked. A cross brace between the legs is split. No tools on the tabletop. The workbench looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

---

# Часть 2. Ещё не сгенерировано

Кучи завала (`zone_*`) и фоны сцен разбора (`scene_*`) рисовать **не нужно**: игра собирает кучу из спрайтов завала, а фон сцены — из увеличенного фона комнаты (минус 26 картинок). Если когда-нибудь захочется отдельный рисунок для зоны, его промпт остался в `PROMPTS.md`, и он сам заменит собранный вариант.

Всего 39 картинок: 34 ниже плюс 5 из первой части (вывеска и два состояния часов). Промпты те же, что в `PROMPTS.md`.

| Группа | Картинок |
| --- | --- |
| Вступление (новое, 13.10.2026) | 4 |
| Мастерская: лампа | 2 |
| Малярная: объекты | 28 |
| **Итого** | **34** |

## 2.0. Вступление (новое, 13.10.2026)

Четыре карточки истории перед обучением: город, ключ, решение, приезд. Тот же формат, что у находок; надписей нет, бирка на ключе пустая.

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

## 2.1. Мастерская: лампа

Восстановленная лампа (`obj_lamp_2`) уже есть. Откройте её карточку в Leonardo и сделайте два других состояния правками этой картинки — тексты ниже. Верстак — в разделе 1.6.

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

## 2.2. Малярная: объекты

Для каждого объекта: сначала восстановленное состояние (последний номер) — обычной генерацией по промпту; затем остальные — правками этой картинки в Leonardo, тексты правок даны у каждого ключа. Фон малярной (`room_paint_bg`) уже есть — берите его как референс стиля.

### `obj_paint_table_0` — Покрасочный стол, шаг 0 из 3 (заброшено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact painting table, preserving its silhouette, proportions, tabletop, legs and camera angle.

Clearly abandoned for many years: the tabletop is warped, stained and caked with old cracked layers of dried paint, one leg is cracked and the table leans slightly, a few old paint cans are knocked over and dented, heavy dust and grime. No fresh cloth, no tidy cans, no stool. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_table_1` — Покрасочный стол, шаг 1 из 3 (частично починено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact painting table, preserving its silhouette, proportions, tabletop, legs and camera angle.

Clearly partially repaired, first stage: the cracked leg is replaced with fresh light wood and the table stands straight; the tabletop is sanded in a few patches but still mostly stained with old paint. Old dented cans still lie around. No cloth, no stool.

The painting table must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_table_2` — Покрасочный стол, шаг 2 из 3 (частично починено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact painting table, preserving its silhouette, proportions, tabletop, legs and camera angle.

Clearly almost repaired: the legs are fixed and the tabletop is covered with a fresh clean drop cloth; two or three clean paint cans stand neatly on it. The table edges still show old paint drips and scratches. No stool yet.

The painting table must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_table_3` — Покрасочный стол, шаг 3 из 3 (восстановлено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long old wooden painting table covered with layers of colorful dried paint, a few brushes in a jar on it, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, neat paint cans, brushes in a jar and a half-painted wooden stool on the top, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_drying_rack_0` — Сушилка для деталей, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact drying rack, preserving its silhouette, proportions, frame, slatted shelves and camera angle.

Clearly abandoned for many years: several slats are cracked and sagging, the frame is weathered, grey and leaning slightly, cobwebs between the shelves, heavy dust. The shelves are empty. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_drying_rack_1` — Сушилка для деталей, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact drying rack, preserving its silhouette, proportions, frame, slatted shelves and camera angle.

Clearly partially repaired: the upper shelves have fresh light new slats and the frame stands straight; the lower shelves still have old dark, cracked slats with cobwebs. The shelves are empty — no painted parts drying yet.

The drying rack must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_drying_rack_2` — Сушилка для деталей, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden drying rack with several slatted shelves for freshly painted parts, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, small freshly painted wooden parts drying on the shelves in soft sage, honey and red colors, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_rack_0` — Стеллаж с красками, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact paint rack, preserving its silhouette, proportions, shelves, uprights and camera angle.

Clearly abandoned for many years: the shelves sag, the wood is weathered and grey, the paint cans are rusty, dented, tipped over and crusted with dried drips, heavy dust and cobwebs. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_rack_1` — Стеллаж с красками, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact paint rack, preserving its silhouette, proportions, shelves, uprights and camera angle.

Clearly partially repaired, first stage: the rack is fixed and level with a few fresh light wooden boards; only a few old dented cans stand on it, the rest of the shelves are empty and dusty.

The paint rack must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_rack_2` — Стеллаж с красками, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact paint rack, preserving its silhouette, proportions, shelves, uprights and camera angle.

Clearly almost repaired: the rack is clean and sturdy, cans are sorted in rows, but about half of them are still old, dull and rusty, without the fresh colorful drips. Plain cans without labels.

The paint rack must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_paint_rack_3` — Стеллаж с красками, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wide wooden wall rack with rows of paint cans, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, full rows of clean cans with colorful drips of honey, sage green and warm red, catching the light, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_vent_window_0` — Окно с вытяжкой, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact window with a ventilation fan, preserving its silhouette, proportions, frame, panes, round fan and camera angle.

Clearly abandoned for many years: the panes are cloudy and splattered with old paint, the frame is weathered with peeling paint, the fan blades are bent, rusty and clogged with dust, cobwebs in the corners. Nothing around the frame. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_vent_window_1` — Окно с вытяжкой, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact window with a ventilation fan, preserving its silhouette, proportions, frame, panes, round fan and camera angle.

Clearly partially repaired: the frame is repaired and freshly repainted, the fan blades are straightened and cleaned but the fan is still; the glass panes are still cloudy and paint-splattered. Nothing around the frame.

The window with a ventilation fan must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_vent_window_2` — Окно с вытяжкой, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window with a small round metal ventilation fan built into one pane, seen straight on, as a separate object, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, clean panes with warm daylight, the fan spinning gently, fresh air feeling, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_easel_0` — Мольберт, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact easel, preserving its silhouette, proportions, legs, canvas ledge, top clamp and camera angle.

Clearly abandoned for many years: the wood is weathered, grey and splattered with old dried paint, one leg is cracked and the easel leans crooked, the clamp is rusty, heavy dust and cobwebs. No canvas on it. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_easel_1` — Мольберт, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact easel, preserving its silhouette, proportions, legs, canvas ledge, top clamp and camera angle.

Clearly partially repaired: the cracked leg is replaced with fresh light wood and the easel stands straight; the rest of the wood is still old, splattered with dried paint, the clamp still rusty. No canvas on it.

The easel must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_easel_2` — Мольберт, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden studio easel standing on the floor, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, holding a small canvas with a simple painting of a cozy house and a tree, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_ladder_0` — Стремянка, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact step ladder, preserving its silhouette, proportions, rails, steps, hinge and camera angle.

Clearly abandoned for many years: two steps are cracked, one rail is split, the hinge is rusty, the wood is weathered and covered in old paint drips, dust and cobwebs. Nothing on the top step. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_ladder_1` — Стремянка, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_2`). Откройте в Leonardo карточку выбранного варианта `_2` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact step ladder, preserving its silhouette, proportions, rails, steps, hinge and camera angle.

Clearly partially repaired: the cracked steps are replaced with fresh light new wood and the hinge is oiled; the rails are still old, dusty and covered in paint drips. Nothing on the top step.

The step ladder must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_ladder_2` — Стремянка, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden step ladder covered in paint drips, standing open, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, sturdy and clean, a small paint can and a brush on its top step, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_solvent_cabinet_0` — Шкафчик для растворителей, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact metal cabinet, preserving its silhouette, proportions, doors, handles, body and camera angle.

Clearly abandoned for many years: the metal is covered in rust and flaking old paint, one door is dented and hangs slightly open, the handles are corroded, heavy dust and grime. No bottles on top. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_solvent_cabinet_1` — Шкафчик для растворителей, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact metal cabinet, preserving its silhouette, proportions, doors, handles, body and camera angle.

Clearly partially repaired, first stage: the rust is scraped off to bare grey metal on the left half; the right half is still rusty with flaking paint. The dented door is straightened but still shows the dent marks. No bottles on top.

The metal cabinet must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_solvent_cabinet_2` — Шкафчик для растворителей, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact metal cabinet, preserving its silhouette, proportions, doors, handles, body and camera angle.

Clearly almost repaired: the body is freshly painted sage green and the doors close properly, the handles are new; small scuffs and a few bare spots of grey primer remain on the corners. No bottles on top yet.

The metal cabinet must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_solvent_cabinet_3` — Шкафчик для растворителей, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small low metal cabinet with two doors for paint solvents, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, the doors closed neatly, plain glass bottles without labels standing on top in a row, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_sanding_bench_0` — Шлифовальный верстак, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact sanding bench, preserving its silhouette, proportions, top, legs, sanding block and camera angle.

Clearly abandoned for many years: the top is cracked and gouged, covered in thick dust and old wood shavings, the legs are weathered and grey, the sanding block is worn and grimy. Nothing else on it. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_sanding_bench_1` — Шлифовальный верстак, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact sanding bench, preserving its silhouette, proportions, top, legs, sanding block and camera angle.

Clearly partially repaired, first stage: the top is replaced with a fresh light board, but it is still dusty with shavings; the legs are old, weathered and grey. Nothing else on it.

The sanding bench must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_sanding_bench_2` — Шлифовальный верстак, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** не нужен — это правка готовой картинки, всё нужное сказано в тексте
- **Как делать:** это не новая генерация, а **правка готового восстановленного состояния** (`_3`). Откройте в Leonardo карточку выбранного варианта `_3` и попросите модель отредактировать его текстом ниже (поле под картинкой с названием модели). Если форма или ракурс поплыли — повторите правку; удачный результат сохраните под этим ключом.

```
Edit this exact sanding bench, preserving its silhouette, proportions, top, legs, sanding block and camera angle.

Clearly almost repaired: the top and legs are clean and sturdy, sandpaper sheets are neatly stacked; a little dust remains in the corners and the legs still need a fresh coat of finish. No chair leg yet.

The sanding bench must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

### `obj_sanding_bench_3` — Шлифовальный верстак, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** генерируйте это состояние первым и выберите лучший вариант. Остальные состояния — правками этой картинки в Leonardo (тексты у соседних ключей).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wooden sanding bench with a hand sanding block and sheets of sandpaper, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, a freshly sanded wooden chair leg resting on it, a soft brush beside, warm and tidy, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

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
