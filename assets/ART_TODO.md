# Графика: что переделать и что осталось

Состояние на 13.10.2026: подключено 54 из 90 нужных картинок. Ниже два блока: **что переделать** (уже подключено, но с недостатками) и **что ещё не сгенерировано**. У каждой картинки — размер, промпт и отрицательный промпт; наборы N-… расписаны в конце файла, к каждому добавляйте N-COMMON.

Общие правила те же, что в `PROMPTS.md`:
- генерируйте приватно (тариф Essential), на ровном белом фоне для спрайтов — фон я уберу сам при подключении;
- никакого текста, букв, цифр и подписей на картинках, в том числе цифр на циферблатах и подписи художника в углу;
- состояния одного объекта делайте из последнего (восстановленного) через img2img с силой 0,3–0,5, чтобы форма и ракурс не менялись;
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
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background, an old yellowed paper sheet on a wooden table with a pencil sketch of an ornate decorative shop sign: a curly wooden frame with flourishes and scrolls, the central panel of the sign is completely blank and empty, only faint pencil guide lines where letters will go, a few touches of paint on the scrolls, a pencil and a small brush lying next to the paper, horizontal 4:3 composition, full illustration with background, no text, no letters
```

## 1.2. Настенные часы — `obj_wall_clock_0`, `_1`, `_2` — ✅ готово 13.10.2026

Серия из трёх состояний без цифр подключена, контуры совпадают до пикселя. Раздел оставлен для справки: так стоит делать и остальные объекты.

**Что не так:** на `obj_wall_clock_0` читаемые римские цифры; два присланных варианта для `_1` и `_2` (файлы `lucid-origin_…`) — с арабскими цифрами и это **другие часы**: при ремонте часы меняли бы форму. Нужна одна серия из трёх состояний одних и тех же часов, циферблат без цифр — с простыми метками-точками или чёрточками.

**Порядок:** сначала `_2` (восстановлено), из него через img2img — `_1`, затем `_0`.

### `obj_wall_clock_2` — Настенные часы, шаг 2 из 2 (восстановлено) — генерировать первым

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2 (часы почти круглые — оставьте поля по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `numerals, roman numerals, numbers, digits, brand name`

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a round vintage wall clock in a wooden case with a pendulum below, seen straight on, a plain cream clock face with simple small dot markers instead of numerals, no numbers, no roman numerals, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, running, the pendulum mid-swing, the clock face clean and bright, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_wall_clock_1` — Настенные часы, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `numerals, roman numerals, numbers, digits`
- **Из `obj_wall_clock_2` через img2img, сила 0,3–0,5.**

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a round vintage wall clock in a wooden case with a pendulum below, seen straight on, a plain cream clock face with simple small dot markers instead of numerals, no numbers, no roman numerals, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, new hands in place, the pendulum straight but still, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_wall_clock_0` — Настенные часы, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `numerals, roman numerals, numbers, digits`
- **Из `obj_wall_clock_2` через img2img, сила 0,4–0,5.**

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a round vintage wall clock in a wooden case with a pendulum below, seen straight on, a plain cream clock face with simple small dot markers instead of numerals, no numbers, no roman numerals, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, the glass cracked, the hands missing, the pendulum hanging crooked, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

## 1.3. Финальная карточка мастерской — `final_card` (по желанию)

**Что не так:** на стене двое часов с цифрами на циферблатах. Мелко, но по правилу «без цифр» лучше переделать. Можно не генерировать заново, а закрасить циферблаты через inpainting промптом `plain cream clock face with small dot markers, no numerals`.

### `final_card` — Финальная карточка: мастерская ожила

- **Размер файла:** 1120×840 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-CARD + N-COMMON, дополнительно: `numerals, roman numerals, numbers, digits`

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background, a fully restored cozy workshop in the warm evening: the desk lamp glowing, the radio dial lit, a round wall clock with a plain cream face and simple dot markers instead of numerals on the wall, tools neatly in their places, everything warm and alive, horizontal 4:3 composition, full illustration with background
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
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background
```

### `room_paint_bg` — Фон малярной (пустая комната)

- **Размер файла:** не меньше 1440×1696 px
- **Соотношение:** вертикальный 5:6 (генерируйте 4:5 и обрежьте по высоте до 1696)
- **Отрицательный промпт:** N-ROOM + N-COMMON, дополнительно: `side walls, ceiling, roof, rafters, gable, beams across the top, room corners, deep perspective, vanishing point, door, window, signature, artist name, watermark`
- **Подсказка композиции:** `assets/source/guides/room_paint_bg_guide.png`, схема расстановки — `room_paint_bg_layout.jpg`.
- **Важно:** тот же ракурс и линия пола, что у мастерской: комнаты должны выглядеть соседними в одном доме. Стеллаж, окно, мольберт, стремянку и столы не рисовать.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family paint shop: the back wall is whitewashed plaster with old faint splashes of honey, sage green and warm red paint and a sage green wooden wainscot panel along its lower part above the baseboard, the floor is worn light wooden planks with old dried paint drips, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background
```

## 1.5. Окно — `obj_window_0`, `_1`, `_2` (по желанию)

**Что не так:** вокруг рамы, особенно у `obj_window_2`, остались кремовые живописные мазки (как кусок штукатурки). Это часть рисунка, автоматически их не убрать. На фоне комнаты выглядит как светлое пятно вокруг окна. Если хотите аккуратнее — сгенерируйте серию заново с чистыми краями: сначала `_2`, из него `_1` и `_0`.

### `obj_window_2` — Окно, шаг 2 из 2 (восстановлено) — генерировать первым

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `plaster, wall patch, brush strokes around the object, splashes, vines outside the frame`

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window seen straight on, as a separate object, crisp clean edges around the frame, nothing around the frame, no wall, no plaster, no paint strokes around it, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, clean clear panes with warm daylight shining through, a green leafy view outside, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_window_1` — Окно, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `plaster, wall patch, brush strokes around the object`
- **Из `obj_window_2` через img2img, сила 0,3–0,5.**

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window seen straight on, as a separate object, crisp clean edges around the frame, nothing around the frame, no wall, no plaster, no paint strokes around it, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the frame repaired and repainted sage green, the glass still cloudy, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_window_0` — Окно, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON, дополнительно: `plaster, wall patch, brush strokes around the object`
- **Из `obj_window_2` через img2img, сила 0,4–0,5.**

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, flat frontal view straight at the back wall of a small room, like a theatre stage or a dollhouse with the front wall removed, the back wall faces the viewer squarely and fills exactly the upper half of the picture, a straight horizontal wooden baseboard runs across the whole width exactly at the middle height of the picture, the lower half of the picture is a wooden plank floor seen from slightly above with very gentle perspective, the planks run towards the wall, no side walls, no ceiling, no roof beams, no corners, symmetrical composition, the interior of an old family workshop: the back wall is made of vertical cream-painted wooden planks with a faded sage green wainscot panel along its lower part above the baseboard, the floor is worn warm brown wooden planks with a few scuffs, warm golden sunlight patches on the floor and the wall, the room is completely empty with no furniture and no objects, plenty of empty wall space, vertical composition, full background, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window seen straight on, as a separate object, crisp clean edges around the frame, nothing around the frame, no wall, no plaster, no paint strokes around it, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, dirty cracked panes, peeling paint on the frame, cobwebs in the corners, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

---

# Часть 2. Ещё не сгенерировано

Кучи завала (`zone_*`) и фоны сцен разбора (`scene_*`) рисовать **не нужно**: игра собирает кучу из спрайтов завала, а фон сцены — из увеличенного фона комнаты (минус 26 картинок). Если когда-нибудь захочется отдельный рисунок для зоны, его промпт остался в `PROMPTS.md`, и он сам заменит собранный вариант.

Всего 39 картинок: 36 ниже плюс 3 из первой части (вывеска и два состояния часов). Промпты те же, что в `PROMPTS.md`.

| Группа | Картинок |
| --- | --- |
| Вступление (новое, 13.10.2026) | 4 |
| Мастерская: недостающие состояния объектов | 4 |
| Малярная: объекты | 28 |
| **Итого** | **36** |

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

## 2.1. Мастерская: недостающие состояния объектов

Верстак и лампа: восстановленные состояния уже есть (`obj_workbench_3`, `obj_lamp_2`, а у верстака ещё `_2`). Делайте недостающие **из них через img2img**, сила 0,3–0,5, чтобы форма совпала.

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

## 2.2. Малярная: объекты

Для каждого объекта сначала последнее (восстановленное) состояние, остальные — из него через img2img. Фон малярной (`room_paint_bg`) уже есть — берите его как референс.

### `obj_paint_table_0` — Покрасочный стол, шаг 0 из 3 (заброшено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long old wooden painting table covered with layers of colorful dried paint, a few brushes in a jar on it, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, one leg broken, the top warped and stained, dried paint cans knocked over, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_table_1` — Покрасочный стол, шаг 1 из 3 (частично починено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long old wooden painting table covered with layers of colorful dried paint, a few brushes in a jar on it, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the leg fixed and the top sanded, still stained, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_table_2` — Покрасочный стол, шаг 2 из 3 (частично починено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long old wooden painting table covered with layers of colorful dried paint, a few brushes in a jar on it, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, a fresh drop cloth spread on the top, a few clean paint cans, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_table_3` — Покрасочный стол, шаг 3 из 3 (восстановлено)

- **Размер файла:** 912×336 px
- **Соотношение:** горизонтальный ≈ 3:1 (генерируйте 16:9 и обрежьте пустые края)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a long old wooden painting table covered with layers of colorful dried paint, a few brushes in a jar on it, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, neat paint cans, brushes in a jar and a half-painted wooden stool on the top, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_drying_rack_0` — Сушилка для деталей, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden drying rack with several slatted shelves for freshly painted parts, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, several slats broken, the frame leaning, cobwebs between shelves, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_drying_rack_1` — Сушилка для деталей, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden drying rack with several slatted shelves for freshly painted parts, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, new slats, the frame straight, the shelves empty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_drying_rack_2` — Сушилка для деталей, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a tall wooden drying rack with several slatted shelves for freshly painted parts, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, small freshly painted wooden parts drying on the shelves in soft sage, honey and red colors, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_rack_0` — Стеллаж с красками, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wide wooden wall rack with rows of paint cans, seen straight on, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, the rack sagging, cans rusty, dented and tipped over, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_rack_1` — Стеллаж с красками, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wide wooden wall rack with rows of paint cans, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the rack straight and fixed, only a few old cans, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_rack_2` — Стеллаж с красками, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wide wooden wall rack with rows of paint cans, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, cans sorted in rows, labels plain without text, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_paint_rack_3` — Стеллаж с красками, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a wide wooden wall rack with rows of paint cans, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, full rows of clean cans with colorful drips of honey, sage green and warm red, catching the light, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_vent_window_0` — Окно с вытяжкой, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window with a small round metal ventilation fan built into one pane, seen straight on, as a separate object, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, paint-splattered cloudy panes, the fan blades bent and dusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_vent_window_1` — Окно с вытяжкой, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window with a small round metal ventilation fan built into one pane, seen straight on, as a separate object, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the frame repaired and repainted, the fan fixed but still, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_vent_window_2` — Окно с вытяжкой, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×304 px
- **Соотношение:** горизонтальный 3:2
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old small-paned wooden window with a small round metal ventilation fan built into one pane, seen straight on, as a separate object, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, clean panes with warm daylight, the fan spinning gently, fresh air feeling, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_easel_0` — Мольберт, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden studio easel standing on the floor, seen straight on, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, one leg missing, the easel lying crooked, splattered with dried paint, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_easel_1` — Мольберт, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden studio easel standing on the floor, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, standing straight on new legs, empty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_easel_2` — Мольберт, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×496 px
- **Соотношение:** почти квадрат 1:1 (чуть выше, чем шире)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden studio easel standing on the floor, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, holding a small canvas with a simple painting of a cozy house and a tree, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_ladder_0` — Стремянка, шаг 0 из 2 (заброшено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden step ladder covered in paint drips, standing open, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, two steps broken, one leg cracked, the hinge rusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_ladder_1` — Стремянка, шаг 1 из 2 (частично починено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden step ladder covered in paint drips, standing open, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, new steps, the hinge oiled, still dusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_ladder_2` — Стремянка, шаг 2 из 2 (восстановлено)

- **Размер файла:** 448×256 px
- **Соотношение:** горизонтальный 16:9 (стремянка в кадре с полями по бокам)
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, an old wooden step ladder covered in paint drips, standing open, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, sturdy and clean, a small paint can and a brush on its top step, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_solvent_cabinet_0` — Шкафчик для растворителей, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small low metal cabinet with two doors for paint solvents, seen straight on, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, rusty, one door dented and hanging open, empty dusty bottles inside, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_solvent_cabinet_1` — Шкафчик для растворителей, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small low metal cabinet with two doors for paint solvents, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, the rust cleaned, the door straightened, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_solvent_cabinet_2` — Шкафчик для растворителей, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small low metal cabinet with two doors for paint solvents, seen straight on, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, freshly repainted sage green, new handles, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_solvent_cabinet_3` — Шкафчик для растворителей, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×336 px
- **Соотношение:** горизонтальный 4:3
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a small low metal cabinet with two doors for paint solvents, seen straight on, fully restored and cared for, clean polished surfaces, warm rich colors, cozy and lived-in, the doors closed neatly, plain glass bottles without labels standing on top in a row, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_sanding_bench_0` — Шлифовальный верстак, шаг 0 из 3 (заброшено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wooden sanding bench with a hand sanding block and sheets of sandpaper, abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors, the top cracked, covered in thick dust and wood shavings, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_sanding_bench_1` — Шлифовальный верстак, шаг 1 из 3 (частично починено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wooden sanding bench with a hand sanding block and sheets of sandpaper, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, a new top, still dusty, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_sanding_bench_2` — Шлифовальный верстак, шаг 2 из 3 (частично починено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Делайте из восстановленного состояния через img2img (сила 0,3–0,5), чтобы форма и ракурс совпали.

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows, frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway, a low wooden sanding bench with a hand sanding block and sheets of sandpaper, partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, warmer colors, clean, sandpaper sheets neatly stacked, one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

### `obj_sanding_bench_3` — Шлифовальный верстак, шаг 3 из 3 (восстановлено)

- **Размер файла:** 448×208 px
- **Соотношение:** горизонтальный ≈ 2:1
- **Отрицательный промпт:** N-SPRITE + N-COMMON
- **Важно:** Генерируйте это состояние первым, остальные — из него через img2img (сила 0,3–0,5).

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
