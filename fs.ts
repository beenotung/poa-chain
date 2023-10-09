import { readFileSync } from 'fs'

export function readJSONSync(file: string) {
  return JSON.parse(readFileSync(file).toString())
}
