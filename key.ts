import forge from 'node-forge'

export function generateKeyPair() {
  let { publicKey, privateKey } = forge.pki.ed25519.generateKeyPair()
  let pem = forge.pem.encode({
    type: 'ed25519 privateKey',
    body: privateKey.toString('binary'),
  })
  return { publicKey, privateKey, pem }
}
