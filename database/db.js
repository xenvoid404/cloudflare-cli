import { JSONFilePreset } from 'lowdb/node';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const file = join(__dirname, 'db.json');

export const db = await JSONFilePreset(file, { configurations: [] });
await db.write();
