# Тихая мастерская на itch.io

Ветка `itch` — версия для itch.io: без SDK Яндекса и рекламы, без входа через Яндекс, язык берётся из браузера (русский для русскоязычных, английский для остальных; принудительно — `?lang=en` или `?lang=ru`). Прогресс хранится в браузере игрока. Всё остальное — как в версии для Яндекса.

Цель — живые тестеры и отзывы до выхода на Яндекс Играх.

---

## 1. Что загружать

| Что | Файл | Как получить |
| --- | --- | --- |
| Игра | `tikhaya-masterskaya-itch.zip` (в корне проекта) | `npm run build:itch` |
| Обложка 630×500 | `assets/store/itch/cover.png` | `npm run itch:cover` |
| Скриншоты | `assets/store/screenshots_en/` (портретные 1080×1920) | уже готовы |
| Видео (по желанию) | ссылка на YouTube; файл — `assets/store/video_horizontal_en.mp4` | загрузите на YouTube сами |

Изменения из `main` переносятся в эту ветку так: `git checkout itch`, `git merge main`, затем `npm run build:itch`.

---

## 2. Создание страницы (Dashboard → Create new project)

| Поле | Что указать |
| --- | --- |
| Title | `Quiet Workshop` |
| Project URL | `quiet-workshop` |
| Short description or tagline | `Restore your grandfather's dusty workshop, one cozy repair at a time.` |
| Classification | Games |
| Kind of project | **HTML** |
| Release status | **In development** (честно: тестовая версия, отзывы приветствуются) |
| Pricing | **No payments** (или «$0 or donate» — по желанию) |
| Uploads | `tikhaya-masterskaya-itch.zip` → отметить **This file will be played in the browser** |

**Embed options** (появятся после загрузки архива):

| Настройка | Значение |
| --- | --- |
| Embed in page → Viewport dimensions | **540 × 960** (портрет; на ноутбуках с маленьким экраном можно 450 × 800) |
| Mobile friendly | ✅ включить, Orientation: **Portrait** |
| Fullscreen button | ✅ включить |
| Automatically start on page load | можно не включать (звук в браузерах всё равно стартует после первого нажатия) |
| Enable scrollbars | ❌ выключить |

| Поле | Что указать |
| --- | --- |
| Genre | Simulation (или Puzzle) |
| Tags | `cozy`, `relaxing`, `merge`, `restoration`, `casual`, `2d`, `singleplayer`, `short`, `mobile`, `cute` |
| AI generation disclosure | **Yes** — графика и звуки сделаны с помощью нейросетей (itch требует это указывать) |
| Languages | English, Russian |
| Inputs | Mouse, Touchscreen |
| Accessibility | Configurable text size (есть «Крупный текст»), Interactive tutorial |
| Cover image | `assets/store/itch/cover.png` |
| Screenshots | 3–5 штук из `assets/store/screenshots_en/` |
| Visibility & access | **Draft** → проверить → **Restricted** (только по секретной ссылке) или **Public** |

**Закрытый вариант.** «Restricted» + «Secret URL» (`Visibility & access`): страница доступна только тем, кому вы дали ссылку. Удобно для первого круга тестеров из знакомых. Потом переключить на «Public».

---

## 3. Тексты страницы (Description)

### English

```
Tired of the city rush, you find the key to the workshop your grandfather left you. Time to go!

Inside: dust, boxes and broken things. Clear the clutter, collect wood, metal and parts, merge matching items on the table and repair everything step by step: the workbench, the lamp, the old radio, the clock and much more.

• Two rooms — the workshop and the paint room, 16 things to restore.
• Every object changes before your eyes, from dusty and broken to warm and alive.
• Keepsakes — photos, notes, drawings — tell the family's story.
• No timers, no energy, no rush: play at your own pace.
• About 15–20 minutes to restore both rooms. Progress is saved in your browser.
• English and Russian.

THIS IS A TEST VERSION
The game is coming to Yandex Games, and I'd love your feedback before the release:
– Was anything unclear? Where did you get stuck?
– Did the resources feel too generous, too scarce or just right?
– How long did it take you to restore both rooms?
– Any bugs? Please mention your device and browser.

Leave a comment below — every reply helps!

Sounds: ElevenLabs (elevenlabs.io)
```

### Русский (если захотите второй блок на странице или для русскоязычных площадок)

```
Городская суета надоела, а в ящике стола нашёлся ключ от мастерской, которую оставил дед. Пора ехать!

Внутри пыль, коробки и сломанные вещи. Разбирайте завалы, собирайте древесину, металл и детали, объединяйте одинаковые предметы на столе и чините всё по шагам: верстак, лампу, радиоприёмник, часы и многое другое.

• Две комнаты — мастерская и малярная, 16 предметов для восстановления.
• Каждый предмет меняется на глазах: от пыльного и сломанного до тёплого и живого.
• Памятные находки — фотографии, записки, рисунки — складываются в историю семьи.
• Никаких таймеров, энергии и спешки: играйте в своём темпе.
• Около 15–20 минут на обе комнаты. Прогресс сохраняется в браузере.

ЭТО ТЕСТОВАЯ ВЕРСИЯ
Игра готовится к выходу на Яндекс Играх, и мне очень нужен ваш отзыв:
– Что было непонятно, где застряли?
– Ресурсов было слишком много, мало или в самый раз?
– Сколько времени ушло на обе комнаты?
– Нашли ошибку? Напишите устройство и браузер.

Пишите в комментариях — каждый отзыв помогает!

Звуки: ElevenLabs (elevenlabs.io)
```

---

## 4. Где искать тестеров

Без продвижения на новую страницу itch приходят единицы. Куда написать (ссылка на страницу + 2–3 скриншота или гифка + прямая просьба об отзыве):

**На английском**
- Форум itch.io: раздел **Release Announcements** (один пост на игру) и **Feedback & Playtesting** (Community → Forums).
- Reddit: **r/playmygame**, **r/WebGames**, **r/IndieGaming** (по субботам — Screenshot Saturday), **r/CozyGamers** (сначала прочитайте правила: самопиар разрешён не везде).
- Discord-серверы инди-разработчиков с каналами для плейтестов.

**На русском**
- **DTF** — подсайт «Инди» или «Геймдев»: короткий пост «сделал уютную игру, нужен фидбек».
- **Пикабу** — сообщества «Инди игры» и «Gamedev».
- Telegram и VK: геймдев-чаты и сообщества по Яндекс Играм.
- Знакомые и родственники — самый быстрый первый круг (лучше по секретной ссылке).

**Что спрашивать.** Чем конкретнее вопрос, тем полезнее ответ. Главное для нас сейчас:
1. Время прохождения обеих комнат (Яндексу нужно больше 10 минут).
2. Баланс ресурсов: много / мало / нормально.
3. Где было непонятно, что делать дальше.
4. Ошибки — с устройством и браузером.

---

## 5. Перед публикацией — проверить

- [ ] Игра запускается на странице itch в окне 540×960 и в полноэкранном режиме.
- [ ] С телефона страница открывается, игра на весь экран, нет прокрутки.
- [ ] Язык: с английским браузером — английский, с русским — русский.
- [ ] Прогресс сохраняется после закрытия и повторного открытия страницы.
- [ ] Отметка AI generation disclosure стоит.
