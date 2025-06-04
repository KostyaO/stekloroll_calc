const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    const { telegram_id, username, result, otherFields } = data;

    const TELEGRAM_BOT_TOKEN = '7768998668:AAEaULAlKPgmDRhKn5mjUqB8fyXs2NutXdo';
    const CHAT_ID = '322326419';

    const message = `
Новый расчёт от пользователя:
Telegram ID: ${telegram_id}
Username: @${username || 'неизвестен'}
Результат: ${result}
Дополнительные данные: ${JSON.stringify(otherFields, null, 2)}
    `;

    const url = https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage;

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Данные отправлены' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Ошибка при обработке данных', error: error.message }),
    };
  }
};