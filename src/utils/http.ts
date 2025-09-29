import axios from 'axios';

/**
 * Отправляет POST запрос к внешнему API
 * 
 * Конвертирует данные в формат application/x-www-form-urlencoded и отправляет их на указанный URL. Логирует ответ и ошибки в консоль.
 * 
 * @param {string} url - URL для отправки запроса
 * @param {Record<string, any>} data - Объект с данными для отправки
 * @returns {Promise<any>} Данные из ответа API
 * @throws {Error} Если запрос завершился с ошибкой
 * 
 * @example
 * const result = await sendRequest('https://api.example.com/endpoint', {
 *   user_id: 123,
 *   status: 'active'
 * });
 */
export async function sendRequest(url: string, data: Record<string, any>) {
  try {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [(data) => {
        return new URLSearchParams(data).toString();
      }],
    });
    
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}