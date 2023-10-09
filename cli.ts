import { join } from 'path'
import { readJSONSync } from './fs'
import { generateKeyPair } from './key'
import { writeFileSync } from 'fs'

async function main() {
  for (let i = 2; i < process.argv.length; i++) {
    let arg = process.argv[i]
    if (arg == 'keygen') {
      i++
      let file = process.argv[i]
      if (!file) {
        console.error('Error: Missing filename in argument')
        process.exit(1)
      }
      generateKey(file)
      process.exit(0)
    }
    if (arg == 'help') {
      help()
      process.exit(0)
    }
    console.log({ i, arg })
  }
  console.error('Error: missing action in argument.')
  help()
  process.exit(0)
}

function help() {
  let pkg = readJSONSync(join(__dirname, 'package.json'))
  let { name, version } = pkg
  console.log(`
${name} v${version}

Usage: action [options]

Actions:
  keygen [file] - generate private key
  help - display help message
`)
}

function generateKey(file: string) {
  let { pem } = generateKeyPair()
  writeFileSync(file, pem)
}

main().catch(e => console.error(e))
