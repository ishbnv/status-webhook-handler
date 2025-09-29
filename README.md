# Status Webhook Handler

Webhook-обработчик для автоматической синхронизации статусов конверсий из CPA-сети с чат-ботами в Telegram и VK через API Targethunter и Senler.

## Содержание

- [Архитектура](#архитектура)
- [Требования](#требования)
- [Установка](#установка)
- [Конфигурация](#конфигурация)
- [Запуск](#запуск)
- [API Endpoints](#api-endpoints)
- [Тестирование](#тестирование)
- [Deployment](#deployment)
- [Мониторинг](#мониторинг)

## Логика работы

1. **Прием webhook** → Сервер получает POST запрос на `/webhook`
2. **Парсинг данных** → Извлекаются user_id, status, sub1, sub2, offerName
3. **Определение ботов** → По паттернам определяются подходящие боты
   - Для TG: проверяется `sub2` по паттерну
   - Для VK: проверяется `sub1` по паттерну
4. **Синхронизация** → Параллельно для всех найденных ботов:
   - Отправка пользователя на нужный шаг
   - Установка переменной с названием оффера
   - Установка переменной со стадией (при необходимости)
5. **Ответ** → Возвращается результат с количеством синхронизированных ботов

## Архитектура

```
.
├── src/
│   ├── app.ts                    # Точка входа, Express сервер
│   ├── webhook.handler.ts        # Обработчик webhook
│   ├── types.ts                  # TypeScript типы
│   ├── config/
│   │   └── bots.ts               # Конфигурация ботов
│   └── utils/
│       ├── http.ts               # HTTP клиент для API запросов
│       └── logger.ts             # Утилита логирования
├── ecosystem.config.js           # Конфигурация PM2
├── package.json
├── tsconfig.json
└── README.md
```

## Требования

- Node.js >= 20.0.0
- npm >= 10.0.0
- TypeScript >= 5.4.0

## Установка

```bash
# Клонирование репозитория
git clone https://github.com/ishbnv/status-webhook-handler.git
cd status-webhook-handler

# Установка зависимостей
npm install

# Копирование конфигурации
cp .env.example .env

# Редактирование конфигурации
nano .env
```

## Конфигурация

### Основные переменные окружения

```env
# Общие настройки
PORT=3000
NODE_ENV=production
API_KEY=your_targethunter_api_key
```

### Конфигурация ботов

Для каждого бота необходимо указать:

```env
# Telegram Bot
TG_BOT_TOKEN=targethunter_group_id
TG_TRUE_BOT_TOKEN=targethunter_bot_id
TG_MSG_IN_PROGRESS=message_id_for_in_progress
TG_MSG_APPROVED=message_id_for_approved
TG_MSG_DECLINED=message_id_for_declined
TG_VAR_OFFERNAME=variable_id_for_offer_name

# VK Bot
VK_NALIKOV_BOT_TOKEN=targethunter_group_id
VK_NALIKOV_TRUE_BOT_TOKEN=targethunter_bot_id
VK_NALIKOV_MSG_IN_PROGRESS=message_id
VK_NALIKOV_MSG_APPROVED=message_id
VK_NALIKOV_MSG_DECLINED=message_id
VK_NALIKOV_VAR_OFFERNAME=variable_id
```

### Добавление нового бота

Отредактируйте файл `src/config/bots.ts`:

```typescript
{
  pattern: /your-pattern/i,           // Регулярное выражение sub1 для определения бота
  handler: 'targethunter',            // 'targethunter' или 'senler'
  channel: 'VK',                      // 'VK' или 'TG'
  tokens: {
    groupId: process.env.YOUR_BOT_TOKEN!,
    botId: process.env.YOUR_TRUE_BOT_TOKEN!,
  },
  messages: {
    in_progress: process.env.YOUR_MSG_IN_PROGRESS,
    approved: process.env.YOUR_MSG_APPROVED,
    declined: process.env.YOUR_MSG_DECLINED,
    click: process.env.YOUR_MSG_CLICK,
  },
  variables: {
    offerName: process.env.YOUR_VAR_OFFERNAME,
  },
}
```

## Запуск

### Режим разработки

```bash
npm run dev
```

### Production сборка

```bash
# Собрать проект
npm run build

# Запустить
npm start
```

### PM2

```bash
# Установить PM2 глобально
npm install -g pm2

# Запустить приложение
pm2 start ecosystem.config.js

# Проверить статус
pm2 status

# Просмотр логов
pm2 logs status-webhook-handler

# Остановить
pm2 stop status-webhook-handler

# Перезапустить
pm2 restart status-webhook-handler
```

## API Endpoints

### POST /webhook

Принимает данные о конверсии из CPA-сети.

**Request:**

```json
{
  "sub1": "nalikov",                    // Идентификатор оффера/потока
  "sub2": "tg",                         // Канал (для Telegram)
  "sub6": "123456789",                  // User ID (обязательно)
  "status": "1",                        // Статус: 0-в работе, 1-одобрен, 2-отклонен, 3-клик
  "offerName": "Наличка - быстрый займ" // Название оффера
}
```

**Response:**

```json
{
  "success": true,
  "synced": 2  // Количество синхронизированных ботов
}
```

**Коды ответа:**

- `200` - Успешная обработка
- `400` - Отсутствует обязательный параметр user_id (sub6)
- `500` - Внутренняя ошибка сервера

### GET /health

Healthcheck endpoint для проверки состояния сервиса.

**Response:**

```json
{
  "status": "ok"
}
```

## Тестирование

```bash
npm test
```

### Пример теста

```typescript
describe('Webhook API', () => {
  it('should process valid webhook', async () => {
    const response = await request(app)
      .post('/webhook')
      .send({
        sub6: '123456',
        status: '1',
        offerName: 'Test Offer'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

## Deployment

### Nginx Configuration

```nginx
upstream webhook_handler {
    server localhost:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name webhook.example.com;

    location / {
        proxy_pass http://webhook_handler;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /health {
        proxy_pass http://webhook_handler/health;
        access_log off;
    }
}
```

## Мониторинг

Логи сохраняются в директории:
- `request.txt` - Краткие данные всех входящих webhook
- `debug_payload.log` - Полный payload с timestamp
- `/var/log/pm2/status-webhook-handler*.log` - Логи PM2

## Troubleshooting

### Сервис не запускается

Проверьте:
- Установлены ли все зависимости: `npm install`
- Корректно ли заполнен `.env` файл
- Доступен ли порт 3000

### Webhook не обрабатывается

Проверьте:
- Наличие обязательного параметра `sub6` (user_id)
- Корректность паттернов в `src/config/bots.ts`
- Логи в файлах `request.txt` и `debug_payload.log`

### Ошибки API

Проверьте:
- Корректность API ключей в `.env`
- Доступность внешних API (Targethunter, Senler)
- Логи в консоли или PM2

## Лицензия

ISC

## Автор

Иван Шабанов