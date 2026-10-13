# Графика и звук: список ассетов и промпты

Здесь всё, что нужно сгенерировать нейросетью или найти в библиотеках, чтобы заменить заглушки. Ключи совпадают с `assets/manifest.json`. Пояснения на русском, промпты на английском: генераторы лучше понимают английский.

## Как подключить готовый файл

1. Назовите файл ключом из манифеста (любой формат: PNG, JPG, WEBP), например `obj_workbench_0.png`.
2. Положите оригинал в `assets/source/images/`. Размер не важен: крупнее нужного — даже лучше.
3. Запустите `npm run images`: скрипт уменьшит картинку до нужного размера (2× от экрана), сохранит в `assets/files/images/` (без прозрачности — JPEG, с прозрачностью — PNG) и сам пропишет файл в `assets/manifest.json`. Ровный белый фон у спрайтов (объекты, завал, предметы, ресурсы, логотип) скрипт убирает сам, светло-серые тени превращает в полупрозрачные; фоны комнат, сцен и карточки обрезает по центру под пропорции рамки. Присланные файлы как есть храните в `assets/source/raw/`.
4. Запишите источник и лицензию в `assets/LICENSES.md`.

Иконку и обложку для каталога кладите в `assets/store/` — в игру они не попадают.

Можно просто прислать мне файлы, названные по ключам, — подключу сам. Подписи-названия на объектах исчезают сами, как только у ключа появляется картинка. Картинка вписывается в свой прямоугольник с сохранением пропорций; размеры прямоугольников подгоняются под арт в редакторе раскладки (`npm run layout`).

---

# Часть 1. Графика

## Как добиться единого стиля

1. **Сначала якорь стиля.** Первым сгенерируйте фон комнаты `room_bg` и одну-две картинки объектов. Выберите удачные и используйте их как референс стиля для всех остальных: в Midjourney это `--sref <ссылка>`, в Stable Diffusion — IP-Adapter, в других сервисах — «загрузить изображение-референс».
2. **Один общий префикс.** Каждый промпт ниже — это общий префикс стиля плюс описание конкретного ассета. Префикс не меняйте от картинки к картинке.
3. **Состояния объекта — из одной картинки.** Сначала сгенерируйте **восстановленное** состояние (последнее). Остальные делайте **правкой этой картинки в Leonardo** (см. «Состояния объектов: правка готовой картинки» ниже): форма, ракурс и размер сохраняются, и объект узнаётся во всех состояниях — игрок видит, как чинит *этот же* верстак.
4. **Прозрачный фон.** Объекты, предметы и завал нужны в PNG с прозрачностью. Генерируйте на ровном белом фоне (так и написано в суффиксе спрайта) — белый фон и светлые тени `npm run images` уберёт сам. Вручную убирать фон не нужно.
5. **Размер.** Генерируйте крупно и уменьшайте. Финальный файл — не меньше указанного в таблицах «размера файла» (это 2× от размера на экране: для чётких телефонных экранов). Больше не нужно: лишний вес замедлит загрузку.
6. **Без текста.** Никаких букв, цифр, надписей и логотипов на картинках: игра на двух языках, а платформа просит медиаматериалы без текста. Где по сюжету есть надпись (записка, подписи на коробке, гравировка) — она «неразборчивая».
7. **Лицензия.** Проверьте, что условия генератора разрешают коммерческое использование (в игре есть реклама). Запишите сервис и тариф в `LICENSES.md`.

## Готовые промпты

Готовый промпт для каждой картинки отдельно, с размером и наборами отрицательных промптов, — в `assets/PROMPTS.md`. Выбранный стиль: тёплый живописный (вариант №1 из первых проб), перспектива «кукольный домик в разрезе»: задняя стена прямо на зрителя, камера чуть сверху (~30°). Ниже — исходные части, из которых эти промпты собраны.

## Общий префикс стиля (для всех картинок)

```
cozy hand-painted 2D game illustration, soft painterly brushwork, warm golden afternoon light coming from the upper left, nostalgic calm mood, muted earthy palette of warm wood brown, cream, faded sage green, copper accents, dark metal and dust grey, clean readable shapes, gentle soft shadows
```

Для комнат, объектов и куч к нему добавляется ракурс: `frontal view from slightly above (about 30 degrees), like looking into a dollhouse cutaway`. Для фонов комнат — особая композиция, см. 1.1.

## Суффикс для спрайтов (объекты, завал, предметы, ресурсы)

```
one single object only, centered, the whole object visible with a small empty margin around it, plain flat white background, no floor, no shadow on the ground
```

## Отрицательный промпт (если генератор его поддерживает)

Общий набор N-COMMON — ко всем картинкам; дополнительные наборы (N-SPRITE, N-ROOM, N-CARD и другие) — в конце `PROMPTS.md`, у каждой картинки указано, какой нужен.

```
text, letters, numbers, words, writing, signs, watermark, signature, logo, brand names, user interface, frame, border, rounded corners, photorealistic, photograph, 3d render, CGI, plastic look, glossy, neon colors, oversaturated, harsh black shadows, noise, blurry, low resolution, jpeg artifacts, deformed, distorted perspective, fisheye, tilted horizon
```

## Состояния объектов: правка готовой картинки

Так получились часы (13.10.2026), и так делаются все объекты с несколькими состояниями:

1. Сгенерируйте **восстановленное** состояние (последний номер) по промпту из `PROMPTS.md` и выберите лучший вариант.
2. Откройте карточку этой картинки в Leonardo. Под ней, рядом с названием модели, можно попросить модель **исправить текущую картинку** — вставьте туда текст правки.
3. Для каждого из остальных состояний текст правки уже готов в `PROMPTS.md` / `ART_TODO.md` у своего ключа. Отрицательный промпт не нужен.

Шаблон, если понадобится написать правку самому:

«Частично починено»:
```
Edit this exact <object>, preserving its silhouette, proportions, <key parts> and camera angle.

Clearly partially repaired: <what is fixed — fresh lighter wood, new parts, polished metal>; <what is still damaged — dark, scratched, rusty, cracked>.

The <object> must visibly look mid-repair, with strong contrast between fixed and damaged areas. Same cozy hand-painted 2D style, original colors, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

«Заброшено»:
```
Edit this exact <object>, preserving its silhouette, proportions, <key parts> and camera angle.

Clearly abandoned for many years: <weathered wood, deep scratches, chipped edges, rust, cracks, heavy dust and grime — по частям объекта>. It looks neglected, broken and long forgotten, with obvious damage across the entire object.

Same cozy hand-painted 2D style, original design, lighting, white background and framing. No redesign, no new or missing parts, no text or numbers.
```

Если у объекта два промежуточных состояния (`_1` и `_2`), первое — «начало ремонта» (починена одна главная часть), второе — «почти готово» (осталась пара следов износа).

---

## 1.1. Фон комнаты

| Ключ | Что | На экране | Размер файла | Соотношение |
| --- | --- | --- | --- | --- |
| `room_bg` | Пустой интерьер мастерской, на который сверху ставятся все объекты и завалы | 720×848 | 1440×1696 | ≈ 5:6 (генерируйте 4:5 и обрежьте) |

**Композиция (важно, с версии 0.8):** задняя стена смотрит прямо на зрителя и занимает **верхние две трети** кадра, плинтус — горизонтальная линия **на 65% высоты**, ниже — пол с мягкой перспективой. Мебель (верстак, шкаф, столы, стеллажи) стоит у стены: её **задние ножки упираются в плинтус**; без боковых стен, потолка и балок. Готовый промпт, картинка-подсказка композиции (`assets/source/guides/room_bg_guide.png`) и схема расстановки (`room_bg_layout.jpg`) — в `ART_TODO.md`, раздел 1.4.

Важно: окно, шкаф, верстак и всё остальное — отдельные спрайты поверх фона. На фоне их рисовать не нужно, иначе при ремонте будет видно «два верстака».

## 1.2. Объекты восстановления

У каждого объекта несколько картинок: индекс в ключе — это сколько шагов ремонта сделано. Размеры — текущие из раскладки; если арт получится другой формы, прямоугольник можно поменять в редакторе.

| Ключи | Объект | На экране | Размер файла | Соотношение |
| --- | --- | --- | --- | --- |
| `obj_workbench_0..3` | Верстак | 512×288 | 1024×576 | 16:9 |
| `obj_fastener_box_0..1` | Ящик с крепежом (стоит на верстаке) | 184×104 | 368×208 | ≈ 16:9 |
| `obj_lamp_0..2` | Настольная лампа | 224×128 | 448×256 | 16:9 (лампа высокая — потом можно сделать прямоугольник выше) |
| `obj_window_0..2` | Окно | 224×152 | 448×304 | 3:2 |
| `obj_cabinet_0..3` | Шкаф для инструментов | 224×304 | 448×608 | 3:4 |
| `obj_shelf_0..2` | Полка с банками | 224×152 | 448×304 | 3:2 |
| `obj_radio_0..2` | Радиоприёмник | 224×112 | 448×224 | 2:1 |
| `obj_wall_clock_0..2` | Настенные часы | 224×152 | 448×304 | 3:2 (часы почти круглые — впишутся с полями) |

Промпт: `[префикс], [объект], [фраза состояния], [суффикс спрайта]`. Описания объектов и что меняется по шагам:

**Верстак** (переделывается полностью, 13.10.2026) — широкий низкий столярный верстак, столешница хорошо видна сверху как ровная поверхность, **одни тиски слева**, ящики под столешницей и нижняя полка; **середина столешницы свободна** — на неё игра ставит лампу и ящик с крепежом.
- `_3` восстановлено: пара инструментов аккуратно лежит у правого края;
- `_2` почти готово: новая столешница и укреплённая рама (свежие шурупы, металлические уголки), тиски почищены, ящики ещё потёртые;
- `_1` начало ремонта: новые светлые доски столешницы, всё ниже — старое;
- `_0` заброшено: доски треснули и покоробились, тиски ржавые, распорка расколота.

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

> **Не обязательно с версии 0.8.** Кучу на главном экране игра собирает из спрайтов завала этой зоны (и она уменьшается по мере разбора), а фон сцены разбора — из увеличенного и смягчённого фона комнаты вокруг кучи. Отдельный рисунок нужен, только если захочется особенного вида; если он появится в манифесте, игра покажет его вместо собранного.

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

## 1.9. Вторая комната: малярная (с версии 0.7)

Малярная открывается после мастерской. Стиль, ракурс, свет и правила те же; готовую мастерскую используйте как референс, чтобы обе комнаты выглядели частью одного дома. Готовые промпты на каждую картинку — в `PROMPTS.md` (помечены «Малярная:»).

**Фон:** `room_paint_bg` — пустая малярная, 1440×1696 (как `room_bg`): побелённая стена со старыми брызгами краски, шалфейный плинтус, дощатый пол с засохшими каплями.

**Объекты** (индекс — сколько шагов ремонта сделано):

| Ключи | Объект | На экране | Размер файла |
| --- | --- | --- | --- |
| `obj_paint_table_0..3` | Покрасочный стол | 496×280 | 992×560 |
| `obj_drying_rack_0..2` | Сушилка для деталей | 224×248 | 448×496 |
| `obj_paint_rack_0..3` | Стеллаж с красками | 224×152 | 448×304 |
| `obj_vent_window_0..2` | Окно с вытяжкой | 224×152 | 448×304 |
| `obj_easel_0..2` | Мольберт | 224×248 | 448×496 |
| `obj_ladder_0..2` | Стремянка | 192×160 | 384×320 |
| `obj_solvent_cabinet_0..3` | Шкафчик для растворителей | 232×200 | 464×400 |
| `obj_sanding_bench_0..3` | Шлифовальный верстак | 248×144 | 496×288 |

**Зоны** (куча в комнате + фон сцены 1440×1744) — не обязательны с версии 0.8, см. 1.3:

| Куча | Фон сцены | Зона | Куча: файл |
| --- | --- | --- | --- |
| `zone_cans_entrance` | `scene_cans_entrance` | Банки у входа | 320×240 |
| `zone_under_paint_table` | `scene_under_paint_table` | Под покрасочным столом | 912×208 |
| `zone_drying_corner` | `scene_drying_corner` | Угол у сушилки | 320×240 |
| `zone_buckets` | `scene_buckets` | Вёдра у стены | 320×240 |
| `zone_window_sill` | `scene_window_sill` | Подоконник | 448×224 |
| `zone_behind_easel` | `scene_behind_easel` | За мольбертом | 368×240 |
| `zone_high_shelf` | `scene_high_shelf` | Полка под потолком | 448×304 |

**Новый вид завала:** `debris_bucket` — старое ведро с потёками краски, 384×352.

**Цепочка красок** (288×288, одна серия; по цвету должна отличаться от крепежа — тёплые медовые и зелёные тона против серого металла):

| Ключ | Что |
| --- | --- |
| `item_paints_1` | Засохший тюбик краски |
| `item_paints_2` | Банка краски (также картинка вводной карточки малярной) |
| `item_paints_3` | Кисти и валики |
| `item_paints_4` | Краскопульт |

**Находки и финал** (1120×840, 4:3): `find_f_drawing` — детский рисунок, `find_f_palette` — палитра, `find_f_sign` — эскиз вывески (надпись неразборчива), `find_f_apron` — фартук в краске, `find_f_brush` — старая кисть в изоленте, `final_card_paint` — обе комнаты ожили, финал игры.

## 1.10. Вступление (с версии 0.8)

Четыре карточки истории перед обучением, формат как у находок: 1120×840, 4:3, полный кадр, без надписей и без людей.

| Ключ | Сюжет |
| --- | --- |
| `story_city` | Усталый вечерний город за окном квартиры, дождь, холодная палитра |
| `story_key` | Старый латунный ключ с **пустой** картонной биркой в ящике стола |
| `story_road` | Сельская автобусная остановка на рассвете, сумка на скамейке, дорога к посёлку |
| `story_arrival` | Приоткрытая дверь пыльной мастерской, коробки у порога, лучи света |

Готовые промпты — в `PROMPTS.md`, раздел 10, и в `ART_TODO.md`, раздел 2.0.

---

# Часть 2. Звук

Подробнее: готовые промпты на каждый звук — в `SOUND_PROMPTS.md`, ТЗ для звукорежиссёра — в `SOUND_BRIEF.md`. Ниже — краткая сводка.

## Общие требования

- Формат **MP3** (работает во всех браузерах, включая Safari), 44,1 кГц, моно для эффектов, стерео для музыки.
- Эффекты короткие и мягкие: игра спокойная. Пик не громче −3 дБ, без резких высоких частот; все эффекты примерно одной громкости.
- Без пауз в начале файла: звук должен начинаться сразу, иначе нажатие ощущается «вялым».
- Источники: ИИ-генераторы звуков (например, ElevenLabs Sound Effects и аналоги — проверьте право на коммерческое использование), библиотеки: freesound.org (берите **CC0**; CC-BY можно с указанием автора в `LICENSES.md`; **NC не подходит** — в игре реклама), Pixabay Sound Effects, Sonniss GDC bundle.

## 2.1. Эффекты

Пять звуков интерфейса (`sfx_tap`, `sfx_open`, `sfx_soft`, `sfx_merge`, `sfx_repair`) уже синтезированы кодом и подключены (`npm run sounds`); заменять их не обязательно. Нужны звуки завала, мелодия радио и, по желанию, музыка.

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
| `sfx_debris_bucket` | Убрали ведро (малярная) | 0,2–0,4 с | `old metal paint bucket lifted, the wire handle rattles, a hollow tin clank` | `metal bucket handle rattle` |
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

| Группа | Мастерская | Малярная | Всего |
| --- | --- | --- | --- |
| Фон комнаты | 1 | 1 | 2 |
| Объекты (все состояния) | 25 | 28 | 53 |
| Кучи завала в комнате (не обязательно, 0.8) | (6) | (7) | (13) |
| Фоны сцен разбора (не обязательно, 0.8) | (6) | (7) | (13) |
| Вступление (4 карточки) | 4 | — | 4 |
| Предметы завала | 6 | 1 | 7 |
| Предметы цепочки | 4 | 4 | 8 |
| Ресурсы | 3 | — | 3 |
| Находки и финальная карточка | 6 | 6 | 12 |
| Логотип | 1 | — | 1 |
| **Всего нужных картинок** | **50** | **40** | **90** |
| Иконка и обложка для страницы | | | 2 |
| Звуковые эффекты | 12 | 1 | 13 |
| Музыка (по желанию) | | | 1 |

Порядок работы: фон комнаты → верстак (4 состояния) как якорь стиля → остальные объекты → завал → предметы и ресурсы → находки → логотип, иконка, обложка. После первых 5–10 картинок пришлите их мне: подключу и покажу, как они выглядят в игре, пока стиль ещё легко поправить.
