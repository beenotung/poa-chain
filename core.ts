import debug from 'debug'
import { Key } from './key'

let log = debug('core.ts')
log.enabled = true

export function start(key: { privateKey: Key; publicKey: Key }) {
  log('start')
  log('TODO')
}
