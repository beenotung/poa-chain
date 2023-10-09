import debug from 'debug'
import forge from 'node-forge'

let log = debug('core.ts')
log.enabled = true

export function start(key: {
  privateKey: forge.pki.ed25519.NativeBuffer
  publicKey: forge.pki.ed25519.NativeBuffer
}) {
  log('start')
  log('TODO')
}
