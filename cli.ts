import { join } from 'path'
import { readJSONSync } from './fs'

async function main() {
  for (let i = 2; i < process.argv.length; i++) {
    let arg = process.argv[i]
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

main().catch(e => console.error(e))
