import { readFileSync } from 'fs'
import forge from 'node-forge'

export function generateKeyPair() {
  for (;;) {
    let { publicKey, privateKey } = forge.pki.ed25519.generateKeyPair()
    let base64 = encodeKey(privateKey)
    if (base64.includes('+') || base64.includes('/')) continue
    let match = base64.match(/^(\w+)$/)
    if (match) {
      let str = match[1]
      return { publicKey, privateKey, str }
    }
  }
}

export function encodeKey(key: forge.pki.ed25519.NativeBuffer) {
  let base64 = forge.util.binary.base64.encode(key)
  let match = base64.match(/^(.+)==$/)
  if (!match) throw new Error('Invalid base64: ' + base64)
  let str = match[1]
  return str
}

export function decodeKey(str: string) {
  let base64 = str + '=='
  let key = forge.util.binary.base64.decode(base64)
  return key
}

export function readKeySync(file: string) {
  let str = readFileSync(file).toString()
  let privateKey = decodeKey(str)
  let publicKey = forge.pki.ed25519.publicKeyFromPrivateKey({ privateKey })
  return { publicKey, privateKey }
}
