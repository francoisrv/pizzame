import { snakeCase, camelCase, split, kebabCase } from "lodash"
import { join } from "path"
import { promisify } from "util"
import { readFile, writeFile, readdir } from "fs"

export const add = async (reducer: string, type: string) => {
  if (!reducer) {
    throw new Error('Missing argument #0: Reducer name')
  }
  if (!type) {
    throw new Error('Missing argument #1: Reducer type')
  }
  const reducerName = camelCase(reducer)
  const stateFile = join(__dirname, '../../src/state.ts')
  const stateSource = (
    await promisify(readFile)(stateFile)
  ).toString()
  const reducers: string[] = []
  const stateLines = stateSource.split(/\n/)
  for (const line of stateLines) {
    if (line === 'interface ReduxState {') {
      continue
    }
    if (line === '}') {
      break
    }
    reducers.push(line.trim())
  }
  const names = reducers.map(reducer => reducer.split(': ')[0])
  if (names.indexOf(reducerName) !== -1) {
    throw new Error(`Reducer ${ reducerName } already exists`)
  }
  reducers.push(`${ reducerName }: ${ type }`)
  reducers.sort()
  const nextState = `interface ReduxState {
  ${ reducers.join('\n  ') }
}

export default ReduxState
`
  await promisify(writeFile)(
    stateFile,
    nextState
  )
  const tpl = `import ReduxState from '../state'

type State = ReduxState['${ reducerName }']

// type Actions =
// | ReturnType<typeof action-name>

const initialState: State = null

export default function counterReducer(state: State = initialState/*, action: Actions*/): State {
  // if (action.type === ReduxActionType.NAME) {
  //  return action.payload
  // }
  return state
}
`
  const reducerFileName = `${ kebabCase(reducerName) }.reducer.ts`
  await promisify(writeFile)(
    join(__dirname, '../../src/reducers', reducerFileName),
    tpl
  )
  const reducerFiles = await promisify(readdir)(
    join(__dirname, '../../src/reducers')
  )
  await promisify(writeFile)(
    join(__dirname, '../../src/reducers.ts'),
    reducerFiles
      .map(file => {
        const name = file.replace(/\.reducer\.ts$/, '')
        return `export { default as ${ name } } from './reducers/${ name }.reducer'`
      })
      .join('\n')
  )
}
