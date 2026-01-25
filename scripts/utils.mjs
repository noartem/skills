import { fileURLToPath } from 'url';
import { dirname, resolve } from "path";
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ROOT = resolve(__dirname, "..");

export function isMain(importUrl) {
    const modulePath = fileURLToPath(importUrl);
    return process.argv[1] === modulePath;
}
