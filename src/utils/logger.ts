import fs from 'fs';
import path from 'path';

/**
 * Записывает данные в лог-файл с временной меткой (Legacy)
 * 
 * Создает запись в JSON с отступами.
 * Если файл не существует, он будет создан. Новые записи добавляются в конец файла (append mode).
 * 
 * @param {string} filename - Имя файла для записи логов (относительно корня проекта)
 * @param {any} data - Данные для логирования (будут преобразованы в JSON)
 * @returns {void}
 * 
 * @example
 * log('request.txt', { userId: 123, action: 'click' });
 * // Запишет в файл:
 * // 2025-09-29T10:30:00.000Z
 * // {
 * //   "userId": 123,
 * //   "action": "click"
 * // }
 */
export function log(filename: string, data: any) {
  const timestamp = new Date().toISOString();
  const content = `${timestamp}\n${JSON.stringify(data, null, 2)}\n\n`;
  
  fs.appendFileSync(
    path.join(process.cwd(), filename),
    content
  );
}