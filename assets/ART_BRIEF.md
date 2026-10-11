# Графика и звук: список ассетов и промпты

Здесь всё, что нужно сгенерировать нейросетью или найти в библиотеках, чтобы заменить заглушки. Ключи совпадают с `assets/manifest.json`. Пояснения на русском, промпты на английском: генераторы лучше понимают английский.

## Как подключить готовый файл

1. Имя файла — латиницей, без пробелов, лучше прямо по ключу: `images/obj_workbench_0.png`, `sounds/sfx_tap.mp3`.
2. Положите файл в `assets/files/` (например, `assets/files/images/obj_workbench_0.png`).
3. В `assets/manifest.json` у ключа замените `"file": null` на путь внутри `assets/files/`: `"file": "images/obj_workbench_0.png"`.
4. Запишите источник и лицензию в `assets/LICENSES.md`.

Можно просто прислать мне папку с файлами, названными по ключам, и я подключу всё сам. Подписи-названия на объектах исчезают сами, как только у ключа появляется картинка. Картинка вписывается в свой прямоугольник с сохранением пропорций. Размеры прямоугольников потом можно подогнать под арт в редакторе раскладки (`npm run layout`).

---

# Часть 1. Графика

## Как добиться единого стиля

1. **Сначала якорь стиля.** Первым сгенерируйте фон комнаты `room_bg` и одну-две картинки объектов. Выберите удачные и используйте их как референс стиля для всех остальных: в Midjourney это `--sref <ссылка>`, в Stable Diffusion — IP-Adapter, в других сервисах — «загрузить изображение-референс».
2. **Один общий префикс.** Каждый промпт ниже — это общий префикс стиля плюс описание конкретного ассета. Префикс не меняйте от картинки к картинке.
3. **Состояния объекта — из одной картинки.** Сначала сгенерируйте **восстановленное** состояние (последнее). Остальные состояния делайте из него через img2img или inpainting с небольшой силой изменений (0,3–0,5), чтобы форма, ракурс и размер не менялись. Объект должен узнаваться во всех состояниях: игрок видит, как чинит *этот же* верстак.
4. **Прозрачный фон.** Объекты, предметы и завал нужны в PNG с прозрачностью. Большинство генераторов прозрачность не выдают: генерируйте на ровном белом фоне (так и написано в суффиксе спрайта), потом уберите фон (remove.bg, Photoshop, Krita, встроенные инструменты генератора).
5. **Размер.** Генерируйте крупно и уменьшайте. Финальный файл — не меньше указанного в таблицах «размера файла» (это 2× от размера на экране: для чётких телефонных экранов). Больше не нужно: лишний вес замедлит загрузку.
6. **Без текста.** Никаких букв, цифр, надписей и логотипов на картинках: игра на двух языках, а платформа просит медиаматериалы без текста. Где по сюжету есть надпись (записка, подписи на коробке, гравировка) — она «неразборчивая».
7. **Лицензия.** Проверьте, что условия генератора разрешают коммерческое использование (в игре есть реклама). Запишите сервис и тариф в `LICENSES.md`.

## Общий префикс стиля (для всех картинок)

```
cozy hand-painted 2D game art, warm nostalgic mood, soft painterly brush texture with clean readable silhouettes, gentle warm light from the upper left, muted earthy palette of warm wood brown (#8B5E3C), cream (#F3E9D2), faded sage green (#7D9A78), copper (#B87333), dark metal (#3A3F44) and dust grey (#C9C2B5), slight three-quarter front view, mobile casual game asset, family friendly
```

## Суффикс для спрайтов (объекты, завал, предметы, ресурсы)

```
single object, centered, fully visible with a small margin, isolated on a plain flat white background, no floor, no cast shadow
```

## Отрицательный промпт (если генератор его поддерживает)

```
text, letters, numbers, words, writing, watermark, signature, logo, brand name, frame, border, rounded corners, photorealistic, photo, 3d render, plastic look, neon colors, harsh shadows, blurry, cropped, multiple objects, people, hands
```

Исключение: в `find_f_photo` и `final_card` человек допустим (уберите `people` из отрицательного промпта только для `find_f_photo`).

## Словарь состояний объектов

Добавляйте к описанию объекта фразу состояния:

| Состояние | Фраза |
| --- | --- |
| заброшено (шаг 0) | `abandoned and neglected, covered in thick dust and cobwebs, broken and missing parts, faded desaturated grey-brown colors` |
| частично починено | `partly repaired: cleaned of dust, some parts fixed or replaced, a few signs of wear remain, colors warmer` |
| восстановлено (последний шаг) | `fully restored and cared for, clean polished surfaces, warm rich saturated colors, cozy and lived-in` |

---

## 1.1. Фон комнаты

| Ключ | Что | На экране | Размер файла | Соотношение |
| --- | --- | --- | --- | --- |
| `room_bg` | Пустой интерьер мастерской, на который сверху ставятся все объекты и завалы | 720×848 | 1440×1696 | ≈ 5:6 (генерируйте 4:5 и обрежьте) |

```
[префикс], interior of a small old family workshop seen from the front, empty room without furniture: wooden plank back wall, worn wooden floorboards, a little warm daylight, plenty of empty wall and floor space where furniture will be placed later, calm and cozy, full background, no objects in the middle
```

Важно: окно, шкаф, верстак и всё остальное — отдельные спрайты поверх фона. На фоне их рисовать не нужно, иначе при ремонте будет видно «два верстака».

## 1.2. Объекты восстановления

У каждого объекта несколько картинок: индекс в ключе — это сколько шагов ремонта сделано. Размеры — текущие из раскладки; если арт получится другой формы, прямоугольник можно поменять в редакторе.

| Ключи | Объект | На экране | Размер файла | Соотношение |
| --- | --- | --- | --- | --- |
| `obj_workbench_0..3` | Верстак | 456×168 | 912×336 | ≈ 3:1 (генерируйте 16:9 или 3:1) |
| `obj_fastener_box_0..1` | Ящик с крепежом | 224×128 | 448×256 | ≈ 16:9 |
| `obj_lamp_0..2` | Настольная лампа | 224×128 | 448×256 | 16:9 (лампа высокая — потом можно сделать прямоугольник выше) |
| `obj_window_0..2` | Окно | 224×152 | 448×304 | 3:2 |
| `obj_cabinet_0..3` | Шкаф для инструментов | 224×304 | 448×608 | 3:4 |
| `obj_shelf_0..2` | Полка с банками | 224×152 | 448×304 | 3:2 |
| `obj_radio_0..2` | Радиоприёмник | 224×112 | 448×224 | 2:1 |
| `obj_wall_clock_0..2` | Настенные часы | 224×152 | 448×304 | 3:2 (часы почти круглые — впишутся с полями) |

Промпт: `[префикс], [объект], [фраза состояния], [суффикс спрайта]`. Описания объектов и что меняется по шагам:

**Верстак** — `a sturdy old wooden carpenter's workbench with a vise on one side`
- `_0` заброшено: доски столешницы треснули, тиски ржавые;
- `_1` новые доски столешницы (шаг 1 — древесина);
- `_2` закреплён крепежом, тиски почищены (шаг 2 — древесина и крепёж);
- `_3` восстановлено: на нём аккуратно лежат инструменты.

**Ящик с крепежом** — `a small wooden drawer cabinet for screws and nails with many little drawers`
- `_0` заброшено, ящички перекошены; `_1` восстановлено, ящички ровные с медными ручками.

**Настольная лампа** — `a vintage articulated desk lamp with a metal shade`
- `_0` заброшено, плафон погнут; `_1` починена, но выключена; `_2` **включена**, тёплый мягкий свет (`glowing warm light, the lamp is switched on`).

**Окно** — `an old small-paned wooden window`
- `_0` грязные треснутые стёкла, облезлая рама; `_1` рама починена, стёкла ещё мутные; `_2` чистые стёкла, сквозь них тёплый свет.

**Шкаф для инструментов** — `a tall wooden tool cabinet with two doors`
- `_0` дверца висит на одной петле; `_1` дверцы на месте; `_2` починены полки и петли; `_3` восстановлено: дверцы приоткрыты, внутри аккуратно развешаны инструменты.

**Полка с банками** — `a wall shelf with glass jars of screws and small parts`
- `_0` полка покосилась, банки пыльные; `_1` полка ровная; `_2` банки чистые и расставлены.

**Радиоприёмник** — `a vintage tube radio receiver in a wooden case with a round tuning dial`
- `_0` пыльный, задняя стенка снята; `_1` собран; `_2` работает: шкала светится тёплым светом.

**Настенные часы** — `a round vintage wall clock in a wooden case with a pendulum`
- `_0` стекло треснуло, стрелок нет; `_1` стрелки на месте, маятник стоит; `_2` идут, маятник качается.

## 1.3. Зоны завала

У каждой зоны две картинки: маленькая куча в комнате (на главном экране) и фон сцены разбора.

| Куча в комнате | Фон сцены | Зона | Куча: на экране / файл | Фон: на экране / файл |
| --- | --- | --- | --- | --- |
| `zone_door` | `scene_door` | Куча у двери | 224×120 / 448×240 | 720×872 / 1440×1744 |
| `zone_under_workbench` | `scene_under_workbench` | Коробки под верстаком | 456×104 / 912×208 | то же |
| `zone_window_shelves` | `scene_window_shelves` | Полки у окна | 224×112 / 448×224 | то же |
| `zone_corner_crates` | `scene_corner_crates` | Ящики в углу | 224×120 / 448×240 | то же |
| `zone_behind_cabinet` | `scene_behind_cabinet` | Завал за шкафом | 224×232 / 448×464 | то же |
| `zone_attic` | `scene_attic` | Антресоль | 224×112 / 448×224 | то же |

Куча (спрайт): `[префикс], a small messy pile of dusty old junk: cardboard boxes, sacks, planks and jars, [место], [суффикс спрайта]`

Фон сцены (полный кадр, соотношение ≈ 5:6, генерируйте 4:5): `[префикс], close-up view of [место] in an old workshop, the area is mostly empty with free floor and shelf space, soft warm light, full background` — сами предметы завала *не* рисуйте: это отдельные спрайты, их кладут поверх.

| Зона | [место] |
| --- | --- |
| door | `next to an old wooden door` |
| under_workbench | `the space under a wooden workbench` |
| window_shelves | `low shelves under a window` |
| corner_crates | `a dim corner of the room` |
| behind_cabinet | `the narrow gap behind a tall cabinet, cobwebs` |
| attic | `a high loft shelf under the ceiling` |

## 1.4. Предметы завала

Один спрайт на вид; в сценах они стоят в прямоугольниках около 192×176 и 160×152.

| Ключ | Что | Размер файла | Промпт (после префикса, с суффиксом спрайта) |
| --- | --- | --- | --- |
| `debris_box` | Коробка | 384×352 | `a dusty old cardboard box with flaps half open` |
| `debris_sack` | Мешок | 384×352 | `an old burlap sack tied with string, slightly lumpy` |
| `debris_plank` | Доска | 384×352 | `a few old wooden planks leaning together` |
| `debris_jar` | Банка | 384×352 | `a dusty glass jar with a metal lid, small parts inside` |
| `debris_rag` | Тряпка | 384×352 | `a crumpled old cloth rag` |
| `debris_crate` | Ящик | 384×352 | `a small wooden crate with metal corners` |

## 1.5. Предметы цепочки и ресурсы

Предметы — на клетках стола 144×144; ресурсы — иконки 64–72 px. Цифра уровня рисуется игрой поверх, на картинке её не нужно. Все уровни цепочки — **одна серия**: генерируйте их подряд с одним референсом, чтобы рост «от шайбы к инструменту» читался.

| Ключ | Что | Размер файла | Промпт |
| --- | --- | --- | --- |
| `item_fasteners_1` | Ржавая шайба | 288×288 | `a single small rusty metal washer` |
| `item_fasteners_2` | Набор крепежа | 288×288 | `a small handful of screws, nuts and washers in a little tin` |
| `item_fasteners_3` | Ремонтный комплект | 288×288 | `a small open repair kit case with neatly arranged screws and a screwdriver` |
| `item_fasteners_4` | Рабочий инструмент | 288×288 | `a beautiful vintage hand drill (brace) with a polished wooden handle` |
| `res_wood` | Древесина | 160×160 | `a small neat stack of wooden boards, simple icon` |
| `res_metal` | Металл | 160×160 | `a few steel rods and a metal plate, simple icon` |
| `res_parts` | Мелкие детали | 160×160 | `a small pile of springs, gears and bolts, simple icon` |

Все в квадрате 1:1, с суффиксом спрайта. Для иконок ресурсов добавьте `bold simple shape readable at small size`.

## 1.6. Находки и финальная карточка

Картинки карточек: 560×420 на экране, файл **1120×840**, 4:3, полный кадр (без прозрачности, без суффикса спрайта).

| Ключ | Сюжет (после префикса) |
| --- | --- |
| `find_f_photo` | `an old sepia family photograph lying on a workbench: an elderly craftsman in a work apron standing at this same workbench, laughing warmly, nostalgic, soft vignette` |
| `find_f_screws` | `an open wooden box with many compartments of neatly sorted screws, each compartment with a small paper label with illegible handwriting, top-down view` |
| `find_f_note` | `a folded old paper note tucked between wooden shelves, illegible handwriting, warm light falling on it` |
| `find_f_radio` | `a vintage tube radio glowing in a cozy evening workshop, a cup of tea next to it, soft musical atmosphere` |
| `find_f_clock` | `the back of an old wooden wall clock with a small engraved brass plate, the engraving is decorative and unreadable` |
| `final_card` | `a fully restored cozy workshop in the warm evening: desk lamp glowing, radio dial lit, wall clock on the wall, tools neatly in place, a sense of life and warmth` |

Для `find_f_photo` уберите `people` из отрицательного промпта. Лицо — вымышленный пожилой мастер; без военной формы, орденов и любых узнаваемых персон.

## 1.7. Логотип в игре

| Ключ | Что | Размер файла |
| --- | --- | --- |
| `logo` | Эмблема на экране загрузки (без текста) | 256×256, 1:1, прозрачный фон |

```
[префикс], simple emblem of a crossed wooden mallet and a wrench over a small warm-lit house window, round badge shape, [суффикс спрайта]
```

## 1.8. Материалы для страницы игры (не в игре)

Требования консоли Яндекс Игр (страница «Заполнение черновика»): иконка 512×512 PNG; обложка 800×470 PNG; скриншоты JPEG или 24-битный PNG, длинная сторона 1280–2560 px, минимум 2 на каждую платформу, реальный геймплей — не меньше 70% кадра; горизонтальное видео геймплея 16:9 обязательно (до 28 с). Медиаматериалы лучше без текста.

**Иконка** (512×512, без текста, без рамки):
```
[префикс], app icon: a glowing vintage desk lamp on an old wooden workbench with a few tools, centered composition, strong simple silhouette, warm background, no text
```

**Обложка** (800×470, генерируйте 16:9 и обрежьте):
```
[префикс], wide view of a cozy old workshop being restored: one half still dusty and cluttered, the other half clean and warmly lit by a desk lamp, workbench in the center, inviting, no text
```

Скриншоты и видео — только из самой игры (это требование платформы).

---

# Часть 2. Звук

## Общие требования

- Формат **MP3** (работает во всех браузерах, включая Safari), 44,1 кГц, моно для эффектов, стерео для музыки.
- Эффекты короткие и мягкие: игра спокойная. Пик не громче −3 дБ, без резких высоких частот; все эффекты примерно одной громкости.
- Без пауз в начале файла: звук должен начинаться сразу, иначе нажатие ощущается «вялым».
- Источники: ИИ-генераторы звуков (например, ElevenLabs Sound Effects и аналоги — проверьте право на коммерческое использование), библиотеки: freesound.org (берите **CC0**; CC-BY можно с указанием автора в `LICENSES.md`; **NC не подходит** — в игре реклама), Pixabay Sound Effects, Sonniss GDC bundle.

## 2.1. Эффекты

| Ключ | Когда звучит | Длительность | Промпт для генератора | Поиск в библиотеке |
| --- | --- | --- | --- | --- |
| `sfx_tap` | Любое нажатие кнопки | 0,05–0,15 с | `soft wooden UI click, gentle, short, warm` | `ui click wood soft` |
| `sfx_open` | Открытие окна ремонта | 0,1–0,25 с | `soft paper rustle and light wooden knock, short UI open sound` | `ui open soft paper` |
| `sfx_repair` | Ремонт выполнен | 0,4–0,8 с | `satisfying short repair sound: a hammer tap and a pleasant soft chime, cozy` | `repair success chime hammer` |
| `sfx_merge` | Объединение деталей | 0,15–0,3 с | `small metallic clink of screws snapping together, bright but soft` | `metal clink small coins screws` |
| `sfx_soft` | «Освободи место на столе» | 0,15–0,3 с | `gentle low soft thud, friendly negative feedback, not harsh` | `soft thud ui error gentle` |
| `sfx_debris_box` | Убрали коробку | 0,2–0,4 с | `cardboard box being lifted and slid aside` | `cardboard box move` |
| `sfx_debris_sack` | Убрали мешок | 0,2–0,4 с | `burlap sack lifted, soft fabric rustle` | `sack cloth rustle` |
| `sfx_debris_plank` | Убрали доску | 0,2–0,4 с | `wooden plank picked up, light wood knock` | `wood plank knock` |
| `sfx_debris_jar` | Убрали банку | 0,2–0,4 с | `glass jar picked up, small parts rattling inside` | `glass jar rattle` |
| `sfx_debris_rag` | Убрали тряпку | 0,2–0,4 с | `soft cloth swish` | `cloth swish` |
| `sfx_debris_crate` | Убрали ящик | 0,2–0,4 с | `small wooden crate lifted, muffled wooden thump` | `wooden crate thump` |
| `sfx_radio_melody` | Находка «Вечерняя мелодия» | 5–8 с | `short nostalgic warm melody playing from an old vintage tube radio, light crackle, gentle, evening mood` | `old radio music crackle vintage` (проверьте, что мелодия свободна от авторских прав) |

## 2.2. Музыка (по желанию)

Музыки сейчас в игре нет, но канал и переключатель в настройках есть. Когда появится файл, я подключу его ключом `music_main`.

| Ключ | Что | Длительность | Размер |
| --- | --- | --- | --- |
| `music_main` | Фоновая мелодия, бесшовная петля | 1–2 мин | MP3 128 кбит/с, до 2–3 МБ |

Промпт для музыкального генератора:
```
calm cozy instrumental background music for a casual restoration game, warm acoustic guitar and soft piano, gentle and nostalgic, slow tempo around 80 bpm, no vocals, no drums or very light brushes, seamless loop
```

Если музыка из библиотеки — нужна лицензия на коммерческое использование без отчислений, запишите её в `LICENSES.md`.

---

# Итог: сколько файлов

| Группа | Файлов |
| --- | --- |
| Фон комнаты | 1 |
| Объекты (все состояния) | 25 |
| Кучи завала в комнате | 6 |
| Фоны сцен разбора | 6 |
| Предметы завала | 6 |
| Предметы цепочки | 4 |
| Ресурсы | 3 |
| Находки и финальная карточка | 6 |
| Логотип | 1 |
| **Всего картинок в игре** | **58** |
| Иконка и обложка для страницы | 2 |
| Звуковые эффекты | 12 |
| Музыка (по желанию) | 1 |

Порядок работы: фон комнаты → верстак (4 состояния) как якорь стиля → остальные объекты → кучи и фоны зон → завал → предметы и ресурсы → находки → логотип, иконка, обложка. После первых 5–10 картинок пришлите их мне: подключу и покажу, как они выглядят в игре, пока стиль ещё легко поправить.
