// =====================================================
//   НАСТРОЙКИ DEVIN.AI AUTOREG — РЕДАКТИРУЙТЕ ТОЛЬКО ЭТОТ ФАЙЛ
// =====================================================
//
//   Всё, что можно настроить, находится здесь.
//   Не нужно редактировать autoreger.js — просто меняйте значения ниже.
//
// =====================================================

module.exports = {

    // ---- КАРТА / BIN ----
    // Можно указать один BIN (строка) или список BIN-ов (массив).
    // Скрипт будет брать BIN по очереди для каждого аккаунта.
    // BIN — это первые цифры карты (6-12 цифр) или полный номер (16 цифр).
    // Если указан BIN (6-12 цифр), алгоритм Луна дополнит до 16 цифр.
    // Если указан полный номер (16 цифр), будет использован как есть.
    //
    // Примеры:
    //   BINS: '5154620022'              — один BIN
    //   BINS: []  — несколько BIN ( ротация)
    //   BINS: '6252410673872951'        — полный номер карты
    //
    BINS: ["6258142571007620"],

    // ---- ПЕРЕБОР BIN-ОВ ----
    // Сколько максимум BIN-ов перебрать при declined карте.
    // Если карта отклонена, скрипт пробует следующий BIN из списка.
    // Рабочие BIN-ы сохраняются в known_bins.json и приоритизируются.
    BIN_MAX_RETRIES: 3,

    // ---- СТАТИСТИКА BIN-ОВ ----
    // Файл для сохранения статистики рабочих/нерабочих BIN-ов
    KNOWN_BINS_FILE: 'logs/known_bins.json',

    // Cooldown для BIN-ов (миллисекунды). После 3+ неудач подряд BIN отправляется на cooldown.
    // 600000 = 10 минут, 0 = отключено
    BIN_COOLDOWN_MS: 600000,

    // Длина номера карты (13-19, обычно 16)
    // 'auto' = автоматически по BIN (VISA=16, MC=16, AMEX=15)
    CARD_LENGTH: 'auto',

    // Срок действия (ММ/ГГ).
    // 'auto' = генерируется автоматически (текущий месяц + 1-3 года)
    // Рекомендуется 'auto' — дата всегда будет валидной
    EXP_DATE: '07/26',

    // CVC-код (3-4 цифры).
    // 'auto' = генерируется автоматически по бренду BIN (3 для VISA/MC, 4 для AMEX)
    // Рекомендуется 'auto' — CVC будет правильной длины
    CVC_CODE: '754',

    // ---- ПРОКСИ ----
    // Оставьте null чтобы запускать без прокси.
    // Формат: 'http://ip:port' или 'http://user:pass@ip:port'
    //
    // Примеры:
    //   PROXY: null                        — без прокси
    //   PROXY: null  — без авторизации
    //   PROXY: null  — с авторизацией
    //
    PROXY: null,

    // Файл со списком прокси (одна на строку, # = комментарий)
    PROXY_LIST: null,

    // Ротация прокси: каждый аккаунт — следующий прокси из списка
    PROXY_ROTATION: false,

    // ---- ДАННЫЕ БИЛЛИНГА STRIPE ----
    // Адрес для формы Stripe. Можно указать любой US-адрес.
    BILLING_NAME: 'Micael Doe',
    
    // Профили биллинга (ротация по кругу)
    // country: ISO-код (US, GB, DE, FI, FR, ES, IT, NL, SE, CA, AU, JP...)
    BILLING_PROFILES: [{"country":"DE","address":"Unter den Linden 1","city":"Berlin","zip":"10117"}],

    // ---- ПАРОЛЬ АККАУНТА ----
    // Пароль, который будет установлен для всех регистрируемых аккаунтов Devin AI.
    ACCOUNT_PASSWORD: 'StrongPassword_2026!!!',

    // ---- БРАУЗЕР ----
    HEADLESS: false,    // true = без GUI (быстрее), false = видно браузер (для наблюдения)
                      // ПРИМЕЧАНИЕ: Если MANUAL_MODE=true, браузер всегда будет виден (headless=false)
                      // Это необходимо для возможности ручного ввода при ошибке оплаты

    // Часовой пояс и локаль (при BILLING_ROTATION=true — автоматически по стране)
    TIMEZONE: 'Europe/Berlin',
    LOCALE: 'de-DE',

    // Viewport и Screen
    VIEWPORT: { width: 1920, height: 1080 },
    SCREEN: { width: 1920, height: 1080 },

    // ---- STEALTH (МАСКИРОВКА) ----
    STEALTH_ENABLED: true,

    // Уровень: 'none', 'basic', 'advanced'
    STEALTH_LEVEL: 'advanced',

    // WebGL (подбирается под fingerprint)
    WEBGL_VENDOR: 'Google Inc. (NVIDIA)',
    WEBGL_RENDERER: 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1060, OpenGL 4.5)',

    // Ротация fingerprint: на каждый аккаунт — новый GPU + viewport
    // true = автоматически меняет WebGL vendor/renderer и viewport
    // из базы 15 профилей (NVIDIA/AMD/Intel, разные GPU и разрешения)
    // false = использует фиксированные WEBGL_VENDOR/WEBGL_RENDERER/VIEWPORT
    FINGERPRINT_ROTATION: true,

    // Ротация биллинга: timezone + locale подстраиваются под страну биллинга
    // true = timezone/locale автоматически выбираются по billing.country
    // false = используются фиксированные TIMEZONE/LOCALE из конфига
    BILLING_ROTATION: true,

    // ---- ТАЙМИНГИ (в миллисекундах) ----
    // Минимальное и максимальное значение. Скрипт выбирает случайно между ними.
    DELAY_BEFORE_TRIAL_CLICK: [5500, 8500],       // Пауза перед нажатием "Start free trial"
    DELAY_AFTER_CODE_INPUT: 7500,                 // Пауза после ввода OTP-кода
    DELAY_PAYMENT_WAIT: 90000,                    // Макс. время ожидания подтверждения оплаты (мс)
    DELAY_OTP_WAIT: 75000,                        // Макс. время ожидания OTP-кода (мс)
    DELAY_OTP_POLL: 3000,                        // Интервал проверки почты
    PAUSE_BETWEEN_ACCOUNTS: [2000, 5000],        // Пауза между аккаунтами
    DELAY_TYPING: [40, 100],                     // Задержка между нажатиями клавиш
    DELAY_BETWEEN_ACTIONS: [200, 500],            // Пауза между действиями

    // Авто-подбор таймингов:
    // true = скрипт анализирует прошлые запуски и подстраивает задержки
    // Профиль хранится в logs/timing_profile.json
    AUTO_TIMING: true,

    // Файл профиля авто-таймингов
    TIMING_PROFILE_FILE: 'logs/timing_profile.json',

    // ---- ВАЛИДАЦИЯ BIN-ОВ ----
    // Проверять BIN перед запуском (проверка типа карты через публичный API)
    // true = проверять все BIN-ы, false = пропустить проверку
    VALIDATE_BINS: true,

    // Использовать онлайн-проверку (binlist.net) для BIN, которых нет в локальной базе
    // false = только локальная база (быстрее, но меньше данных)
    VALIDATE_BINS_ONLINE: true,

    // ---- ПОЧТА MAIL.TM ----
    // Настройки временной почты. Обычно не нужно менять.
    MAIL_API_DOMAINS: 'https://api.mail.tm/domains',
    MAIL_API_ACCOUNTS: 'https://api.mail.tm/accounts',
    MAIL_API_TOKEN: 'https://api.mail.tm/token',
    MAIL_API_MESSAGES: 'https://api.mail.tm/messages',

    // Общие настройки почты
    MAIL_RETRY_COUNT: 3,
    MAIL_RETRY_DELAY: 3000,
    MAIL_TIMEOUT: 30000,

    // ---- АВТО-ПЕРЕКЛЮЧЕНИЕ ПОЧТОВОГО ПРОВАЙДЕРА (FALLBACK) ----
    // Если основной провайдер падает N раз подряд — переключаемся на запасной.
    MAIL_FALLBACK: true,
    MAIL_FALLBACK_THRESHOLD: 3,
    MAIL_FALLBACK_COOLDOWN_MS: 300000,

    // ---- КАПЧА ----
    HCAPTCHA_ENABLED: true,
    HCAPTCHA_MAX_ATTEMPTS: 15,
    HCAPTCHA_CHECK_INTERVAL: 2000,

    // ---- ВЫВОД И ЛОГИРОВАНИЕ ----
    ACCOUNTS_FILE: 'logs/accounts.txt',   // Файл с логами всех аккаунтов
    READY_DIR: 'ready_to_sell',      // Папка для успешных аккаунтов
    ERROR_DIR: 'errors',             // Папка для неудачных аккаунтов (для дебага)

    // Лог-файл (null = только консоль)
    LOG_FILE: 'logs/autoreger.log',

    // Уровень логирования: 'quiet' (только ошибки), 'normal', 'debug' (всё)
    LOG_LEVEL: 'normal',

    // Скриншот при ошибке
    SCREENSHOT_ON_ERROR: true,

    // Сохранять HTML-дамп страницы при ошибке
    SAVE_HTML_ON_ERROR: true,

    // Писать пароль в accounts.txt?
    SAVE_PASSWORDS_IN_LOG: true,

    // Авто-очистка старых аккаунтов (дни). 0 = не удалять
    MAX_ACCOUNTS_AGE_DAYS: 0,

    // ---- ВЕБХУК ----
    WEBHOOK_URL: null,
    WEBHOOK_TIMEOUT: 10000,

    // ---- КОЛИЧЕСТВО АККАУНТОВ ----
    // Сколько аккаунтов зарегистрировать за один запуск.
    // 1 = один аккаунт, 5 = пять подряд, 0 = бесконечно (остановите Ctrl+C)
    ACCOUNTS_COUNT: 5,

    // Параллельные аккаунты: сколько браузеров запускать одновременно
    // 1 = последовательно (по умолчанию), 3-5 = параллельно (быстрее)
    CONCURRENT_ACCOUNTS: 1,

    // Повторять при краше (только для retryable-ошибок: browser, timeout, mail)
    RETRY_ON_CRASH: false,
    RETRY_ON_CRASH_MAX: 1,

    // ---- STEALTH ----
    // Включить/выключить маскировку автоматизации (webdriver, plugins, WebRTC)
    STEALTH_ENABLED: true,

    // ---- РУЧНОЙ РЕЖИМ (ВАША СХЕМА) ----
    // Если true, при ошибке оплаты скрипт НЕ закрывает браузер и ждёт ручного ввода
    // Вы можете вручную ввести данные карты, нажать кнопку, и скрипт продолжит работу
    MANUAL_MODE: true,

    // ---- НЕ ЗАКРЫВАТЬ БРАУЗЕР ПОСЛЕ УСПЕХА ----
    // Если true, после успешной регистрации браузер останется открытым
    KEEP_BROWSER_OPEN: false,

    // ---- АВТОМАТИЧЕСКИ ДОБАВЛЯТЬ В МЕНЕДЖЕР СЕССИЙ ----
    // Если true, успешные сессии автоматически добавляются в manual_sessions
    AUTO_ADD_TO_SESSION_MANAGER: true,

    // ---- ПРИНУДИТЕЛЬНЫЙ HEADLESS С MANUAL_MODE ----
    FORCE_HEADLESS_WITH_MANUAL: false,

    // ---- УВЕДОМЛЕНИЯ О КАПЧЕ ----
    CAPTCHA_NOTIFICATIONS: true,

    // ---- ЗВУКОВЫЕ УВЕДОМЛЕНИЯ ----
    SOUND_NOTIFICATIONS: true,

    // ---- КАКИЕ СОБЫТИЯ ЗВУЧАТЬ ----
    // Если SOUND_NOTIFICATIONS=true, звуки будут на:
    // - Капча найдена/решена
    // - Оплата подтверждена
    // - Ошибка карты
    // - Ручной режим активирован
};
