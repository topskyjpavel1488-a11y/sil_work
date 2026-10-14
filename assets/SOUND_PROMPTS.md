# Промпты для генерации звуков

Каждый звук здесь описан отдельно, промпт можно копировать целиком. Промпты написаны под генераторы звуковых эффектов по тексту (ElevenLabs Sound Effects и аналоги) и под музыкальные генераторы (Suno, Udio и аналоги). Генераторы лучше понимают английский, поэтому промпты на английском, а пояснения на русском.

ТЗ для звукорежиссёра-человека лежит отдельно, в `SOUND_BRIEF.md`.

## Как работать

1. **Делайте 3–4 варианта на каждый звук** и выбирайте лучший. Слушайте в наушниках и через динамик телефона: в игру в основном играют на телефоне.
2. **Длительность ставьте вручную**, если генератор это позволяет. Нужная длительность указана у каждого звука. При автоматической длительности генератор часто добавляет хвост и тишину.
3. **Не давайте генератору фантазировать.** Если есть настройка «насколько точно следовать промпту» (prompt influence), ставьте её высокой, около 0,6–0,8.
4. **Отрицательного промпта у большинства генераторов нет.** Поэтому то, чего быть не должно, уже вписано в конец каждого промпта (`no ...`). Если генератор поддерживает отрицательный промпт, перенесите туда общий набор N-SFX из конца файла.
5. **После генерации** каждый файл нужно обработать:
   - обрезать тишину в начале: звук должен начинаться сразу;
   - сделать короткое затухание в конце (10–30 мс), без щелчка;
   - выровнять громкость всех эффектов между собой, пик не выше −3 дБ;
   - сохранить в MP3, 44,1 кГц, моно, 128–192 кбит/с.

   Делать это вручную не нужно: команда `npm run sounds:process` берёт файлы из `assets/source/sounds/` и всё делает сама (обрезка тишины, затухание, выравнивание громкости, бесшовная петля для музыки).
6. **Лицензия.** Проверьте, что ваш тариф разрешает коммерческое использование: в игре есть реклама. На бесплатных тарифах генераторов звука и музыки это часто запрещено или требует указать автора. Запишите сервис и тариф в `LICENSES.md`.
7. **Как подключить.** Назовите файл ключом, например `sfx_tap.mp3`, и пришлите мне или положите в `assets/files/sounds/`. Я впишу его в `assets/manifest.json`. Пока файла нет, игра играет короткий синтезированный тон, так что подключать можно по одному.

**Уже готово:** пять звуков интерфейса (`sfx_tap`, `sfx_open`, `sfx_soft`, `sfx_merge`, `sfx_repair`) синтезированы кодом и подключены (`npm run sounds`, файлы в `assets/files/sounds/`). Генерировать их не обязательно; промпты оставлены на случай, если захочется заменить. 

**14.10.2026 подключены:** звуки завала, мелодия радио, музыка `music_main` (мастерская) и `music_paint` (малярная) — ElevenLabs, бесплатный тариф. Не хватает только отдельного звука ведра: присланный файл совпал со звуком ящика.

## Единый характер звуков

Все звуки — **мягкие, тёплые, деревянные и негромкие**, как в тихой мастерской вечером. Без резких высоких частот, электронных «бипов», агрессивных ударов и мультяшных «боингов». Эффекты звучат часто, иногда десятки раз за минуту, поэтому не должны утомлять.

Общая приставка, которая уже вписана в каждый промпт эффекта:

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail
```

---

## 1. Интерфейс

### `sfx_tap` — нажатие кнопки

- **Когда звучит:** любая кнопка; выбор предмета на столе; перенос предмета без объединения.
- **Длительность:** 0,05–0,15 с (генерируйте 0,5 с и обрежьте).
- **Важно:** самый частый звук в игре. Он должен быть почти незаметным и приятным, даже если звучит сотни раз.

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, a single gentle click of a small wooden button, soft muted wooden tick, very short, no beep, no electronic tone, no metal, no echo
```

### `sfx_open` — открылось окно ремонта

- **Когда звучит:** нажали на объект, открылось окно со списком того, что нужно для ремонта.
- **Длительность:** 0,1–0,25 с.

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, a light paper rustle with a soft wooden knock, like opening a small notebook on a workbench, short and gentle, no whoosh, no electronic tone
```

### `sfx_soft` — мягкий отказ

- **Когда звучит:** игрок нажал на завал, но на столе и в коробе нет места («Освободи место на столе»); ремонт не выполнился, потому что остатку некуда лечь.
- **Длительность:** 0,15–0,3 с.
- **Важно:** не «ошибка» и не наказание. Скорее дружеское «не сейчас».

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, a gentle low muted thud of a soft wooden block placed on felt, friendly and calm, not harsh, no buzzer, no error beep, no descending tones
```

## 2. Игровые действия

### `sfx_merge` — объединение

- **Когда звучит:** две одинаковые детали на столе слились в одну уровнем выше. Касается и крепежа, и красок.
- **Длительность:** 0,15–0,3 с.
- **Важно:** маленькая приятная награда. Должна звучать немного «вверх», ярче нажатия, но не громче.

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, a small satisfying clink of two little metal pieces snapping together followed by a tiny soft bright chime, pleasant and rewarding, short, no coins sound, no slot machine, no sparkle whoosh
```

### `sfx_repair` — ремонт выполнен

- **Когда звучит:** игрок нажал «Починить» и шаг ремонта выполнен. Звучит 37 раз за игру.
- **Длительность:** 0,4–0,8 с.
- **Важно:** главный звук награды в игре. Тёплый и уверенный, но короткий.

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, a satisfying short repair sound: two light wooden hammer taps followed by a pleasant warm soft chime, cozy and rewarding, no fanfare, no trumpet, no applause, no voice
```

## 3. Разбор завалов

Звук играет, когда игрок нажимает на предмет завала и тот исчезает. За игру таких нажатий около 190, поэтому звуки короткие и негромкие. Все семь звуков должны быть **одной громкости** и звучать как одна семья: предметы берут в руки в одной и той же комнате.

### `sfx_debris_box` — коробка

- **Длительность:** 0,2–0,4 с.

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, an old cardboard box being lifted and slid aside on a wooden floor, soft cardboard scrape and light thump, short, no crash
```

### `sfx_debris_sack` — мешок

- **Длительность:** 0,2–0,4 с.

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, an old burlap sack being lifted, soft rough fabric rustle with a light muffled shift of contents, short
```

### `sfx_debris_plank` — доски

- **Длительность:** 0,2–0,4 с.

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, a couple of old wooden planks picked up, a light hollow wooden knock and clack, short, no crash, no breaking wood
```

### `sfx_debris_jar` — банка

- **Длительность:** 0,2–0,4 с.

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, a glass jar with small screws inside picked up, a quick soft rattle of small metal parts inside glass, short, no breaking glass, no shatter
```

### `sfx_debris_rag` — тряпка

- **Длительность:** 0,2–0,4 с.

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, a soft old cloth rag picked up and flicked once, gentle fabric swish, short
```

### `sfx_debris_crate` — ящик

- **Длительность:** 0,2–0,4 с.

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, a small wooden crate with metal corners lifted from a wooden floor, a muffled wooden thump with a tiny metallic tick, short
```

### `sfx_debris_bucket` — ведро (малярная)

- **Длительность:** 0,2–0,4 с.

```
cozy casual mobile game sound effect, soft and warm, close-miked, dry, no reverb tail, an old empty metal paint bucket lifted by its wire handle, a soft hollow tin clank and a light handle rattle, short, no loud bang, no ringing
```

## 4. Находка

### `sfx_radio_melody` — вечерняя мелодия из радио

- **Когда звучит:** открывается карточка находки «Вечерняя мелодия» после ремонта радиоприёмника, и ещё раз, если открыть эту карточку в журнале.
- **Длительность:** 5–8 с.
- **Важно:** мелодия должна быть **оригинальной**. Нельзя просить «как в такой-то песне» или называть известные композиции: нужна свободная от чужих прав музыка. Лучше генерировать музыкальным генератором как короткий трек, а потом наложить лёгкий «радийный» фильтр (обрезать низы и верха, добавить тихий треск) в Audacity.

Промпт для музыкального генератора:

```
short instrumental nostalgic melody, gentle waltz on a soft clarinet and warm upright piano, 1950s style, slow and tender, evening mood, as if played from an old tube radio, lo-fi, light vinyl crackle, no vocals, no drums, 8 seconds
```

Промпт для генератора эффектов (если нужен именно «радийный» звук целиком):

```
a short gentle nostalgic instrumental melody playing from an old vintage tube radio in a quiet room, warm muffled band-limited sound, soft crackle and faint static at the start, calm evening mood, no voice, no speech, no news broadcast
```

## 5. Музыка (по желанию)

### `music_main` — фоновая музыка

- **Когда звучит:** всё время, тихо, в фоне. В настройках её можно выключить отдельно от эффектов. Сейчас музыки в игре нет; когда появится файл, я её подключу.
- **Длительность:** 1–2 минуты, бесшовная петля (конец переходит в начало без паузы и щелчка).
- **Формат:** MP3, стерео, 128 кбит/с, до 2–3 МБ.
- **Важно:** музыка не должна спорить с эффектами: без ярких соло, резких ударных и вокала. Громкость ровная, без нарастаний и кульминаций.

```
calm cozy instrumental background music for a relaxing restoration game, warm fingerpicked acoustic guitar and soft felt piano, light gentle accordion pads, nostalgic and homely, slow tempo around 75-80 bpm, steady and even, no vocals, no drums or only very light brushes, no build-ups, no climax, seamless loop
```

Вариант для малярной (по желанию, если захочется отдельной музыки во второй комнате — ключ `music_paint`, подключение потребует небольшой доработки кода):

```
calm cozy instrumental background music, same warm acoustic guitar and soft felt piano, slightly brighter and lighter, a gentle pizzicato strings melody, cheerful but quiet, slow tempo around 80 bpm, no vocals, no drums, no build-ups, seamless loop
```

**Как сделать петлю:** сгенерируйте трек на 2–3 минуты, в Audacity найдите два похожих места (обычно начало фразы) и вырежьте кусок между ними. Сделайте кроссфейд 50–100 мс на стыке и проверьте, включив повтор.

---

## Отрицательный набор для эффектов

### N-SFX

Если генератор поддерживает отрицательный промпт, вставьте туда:

```
music, melody, voice, speech, singing, laughter, crowd, reverb, echo, long tail, silence at the start, electronic beep, synth, sci-fi, laser, whoosh, explosion, crash, breaking, shatter, alarm, buzzer, cartoon boing, slot machine, coins, harsh high frequencies, distortion, background noise, hum
```

Для `sfx_radio_melody` уберите из набора слова `music` и `melody`.

## Сводка

| Ключ | Что | Длительность |
| --- | --- | --- |
| `sfx_tap` | Нажатие | 0,05–0,15 с |
| `sfx_open` | Открыть окно ремонта | 0,1–0,25 с |
| `sfx_soft` | Мягкий отказ | 0,15–0,3 с |
| `sfx_merge` | Объединение | 0,15–0,3 с |
| `sfx_repair` | Ремонт выполнен | 0,4–0,8 с |
| `sfx_debris_box` | Коробка | 0,2–0,4 с |
| `sfx_debris_sack` | Мешок | 0,2–0,4 с |
| `sfx_debris_plank` | Доски | 0,2–0,4 с |
| `sfx_debris_jar` | Банка | 0,2–0,4 с |
| `sfx_debris_rag` | Тряпка | 0,2–0,4 с |
| `sfx_debris_crate` | Ящик | 0,2–0,4 с |
| `sfx_debris_bucket` | Ведро | 0,2–0,4 с |
| `sfx_radio_melody` | Мелодия из радио | 5–8 с |
| `music_main` | Фоновая музыка (по желанию) | 1–2 мин, петля |

Порядок работы: сначала `sfx_tap`, `sfx_merge` и `sfx_repair`. Эти три задают характер, остальные подгоняйте к ним по громкости и тембру. Потом звуки завала, потом мелодия радио, музыка — в конце.
