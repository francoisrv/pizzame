import { add as addType } from "./scripts/types"
import { add as addAction } from "./scripts/actions"
import { add as addReducer } from "./scripts/reducers"

async function bin(cmd: string, ...args: string[]) {
  switch (cmd) {
    case 'types:add': {
      const [type] = args
      await addType(type)
    } break

    case 'actions:add': {
      const [action, type, description] = args
      await addAction(action, type, description)
    } break

    case 'reducers:add': {
      const [reducer, type] = args
      await addReducer(reducer, type)
    } break
  }
}

const [,, cmd, ...args] = process.argv

bin(cmd, ...args)
