import { snakeCase, uniq } from "lodash"
import { readFileSync, writeFile } from "fs"
import { join } from "path"
import ts from 'typescript'
import { promisify } from "util"

export const add = async (type: string) => {
  const typeName = snakeCase(type).toUpperCase()
  const fileName = join(__dirname, '../../src/types.ts')
  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  )
  // @ts-ignore
  const types: string[] = sourceFile.externalModuleIndicator.members
    .map((member: any) => member.name.escapedText)
  types.push(typeName)
  types.sort()
  const nextSource = `export enum ReduxActionType {
  ${ uniq(types).map(type => `${ type } = '${ type }',`).join('\n  ') }
}
`
  await promisify(writeFile)(
    fileName,
    nextSource
  )
}
