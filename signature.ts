import { Key } from './key'
import forge from 'node-forge'

type Obj = Record<string, any>

export type Signature = forge.pki.ed25519.NativeBuffer

export function encodeObject(object: Obj): string {
  return JSON.stringify(
    Object.fromEntries(
      Object.keys(object)
        .sort()
        .map(key => [key, object[key]]),
    ),
  )
}

export function signObject(input: { object: Obj; privateKey: Key }): Signature {
  let { object, privateKey } = input
  let message = encodeObject(object)
  let md = forge.sha512.create()
  md.update(message, 'utf8')
  let signature = forge.pki.ed25519.sign({ privateKey, md })
  return signature
}

export function verifyObjectSignature(input: {
  object: Obj
  publicKey: Key
  signature: Signature
}): boolean {
  let { object, publicKey, signature } = input
  let message = encodeObject(object)
  let md = forge.sha512.create()
  md.update(message, 'utf8')
  return forge.pki.ed25519.verify({ publicKey, md, signature })
}
