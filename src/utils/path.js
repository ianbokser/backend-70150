import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

export const __dirname = resolve(dirname(fileURLToPath(import.meta.url)), '..')