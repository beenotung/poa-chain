import { join } from 'path'
import { readJSONSync } from './fs'
import { generateKeyPair, readKeySync } from './key'
import { writeFileSync } from 'fs'
import { start } from './core'

async function main() {
  let i = 2
  function getFile() {
    i++
    let file = process.argv[i]
    if (!file) {
      console.error('Error: Missing filename in argument')
      process.exit(1)
    }
    return file
  }
  for (; i < process.argv.length; i++) {
    let arg = process.argv[i]
    if (arg == 'keygen') {
      let file = getFile()
      generateKey(file)
      return
    }
    if (arg == 'start') {
      let file = getFile()
      let key = readKeySync(file)
      start(key)
      return
    }
    if (arg == 'help') {
      help()
      return
    }

    console.error('Error: Invalid argument: ' + JSON.stringify(arg))
    process.exit(1)
  }
  console.error('Error: missing action in argument.')
  help()
}

function help() {
  let pkg = readJSONSync(join(__dirname, 'package.json'))
  let { name, version } = pkg
  console.log(`
${name} v${version}

Usage: action [options]

Actions:
  keygen [keyFile] - generate private key
  start [keyFile] - start the node with the specified key as identity
  help - display help message
`)
}

function generateKey(file: string) {
  let { str } = generateKeyPair()
  writeFileSync(file, str)
}

main().catch(e => console.error(e))
