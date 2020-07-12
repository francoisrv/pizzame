import { lowerFirst, camelCase, startCase, snakeCase, kebabCase, last } from "lodash"
import { join } from "path"
import { promisify } from "util"
import { writeFile, stat, readdir } from "fs"
import { ReduxActionType } from "../types"

export const add = async (action: string, type: string, description: string) => {
  if (!action) {
    throw new Error('Missing argument #0: Action name')
  }
  if (!type) {
    throw new Error('Missing argument #1: Action type')
  }
  const typeName = snakeCase(type).toUpperCase()
  const actionDescription = description || startCase(action)
  const actionNameCase = lowerFirst(camelCase(action))
  const actionName = /Action$/.test(actionNameCase) ? actionNameCase : `${ actionNameCase }Action`
  
  // @ts-ignore
  if (!ReduxActionType[typeName]) {
    throw new Error(`No such action type: ${ typeName }`)
  }
  
  const tpl = `import { ReduxActionType } from "../types";

/**
 * ${ actionDescription }
 */
export default function ${ actionName }() {
  return {
    type: ReduxActionType.${ typeName } as ReduxActionType.${ typeName },
    payload: {}
  }
}
`
  const fileName = join(
    __dirname,
    '../../src/actions',
    `${ kebabCase(actionNameCase.replace(/Action$/, '')) }.action.ts`
  )
  let fileExists = false
  try {
    await promisify(stat)(fileName)
    fileExists = true
    throw new Error(`Action file already exists: ${ fileName }`)
  } catch (error) {
    if (fileExists) {
      throw error
    }
  }
  await promisify(writeFile)(
    fileName,
    tpl
  )
  const actionsFile = join(__dirname, '../../src/actions.ts')
  const actionFiles = await promisify(readdir)(join(__dirname, '../../src/actions'))
  const actions = actionFiles.map(action => action.replace(/\.action\.ts$/, ''))
  const actionsTpl = `import { AnyAction } from 'redux'
${ actions.map(action => `import ${ camelCase(`${ action } action`) } from './actions/${ action }.action'`).join('\n') }

export type ReduxActions =
& AnyAction
${
  actions.map(
    action => `& ReturnType<typeof ${ camelCase(`${ action } action`) }>`
  ).join('\n')
}
`
  await promisify(writeFile)(
    actionsFile,
    actionsTpl
  )
}
