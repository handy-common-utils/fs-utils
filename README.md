# @handy-common-utils/fs-utils

File system operations related utilities based on fs-extra

## How to use

First add it as a dependency:

```sh
npm install @handy-common-utils/fs-utils
```

Then you can use it in the code:

```javascript
import { FsUtils } from 'fs-utils';

const [,, filePath, matchPattern, beforeString, afterString] = process.argv;
await FsUtils.addSurroundingInFile(filePath, new RegExp(matchPattern), beforeString, afterString);
```

You can either import and use the [class](#classes) as shown above,
or you can import individual [functions](#variables) directly like below:

```javascript
import { addSurroundingInFile } from 'fs-utils';

await addSurroundingInFile(README_MD_FILE, /\*\*`example`\*\*(.*?)###/gms, '**`example`**
```javascript
\n```javascript\n', '```\n```
###');
```

# API

<!-- API start -->
<a name="readmemd"></a>

**[@handy-common-utils/fs-utils](#readmemd)**

> Globals

## @handy-common-utils/fs-utils

### Index

#### Classes

* [FsUtils](#classesfsutilsmd)

#### Variables

* [addSurroundingInFile](#addsurroundinginfile)
* [afterString](#afterstring)
* [beforeString](#beforestring)
* [changeFileContent](#changefilecontent)
* [contentFilePath](#contentfilepath)
* [escapeRegExpReplacement](#escaperegexpreplacement)
* [filePath](#filepath)
* [matchPattern](#matchpattern)
* [replaceInFile](#replaceinfile)
* [replaceInFileWithFileContent](#replaceinfilewithfilecontent)

### Variables

#### addSurroundingInFile

• `Const` **addSurroundingInFile**: [addSurroundingInFile](#addsurroundinginfile) = FsUtils.addSurroundingInFile

___

#### afterString

•  **afterString**: string

___

#### beforeString

•  **beforeString**: string

___

#### changeFileContent

• `Const` **changeFileContent**: [changeFileContent](#changefilecontent) = FsUtils.changeFileContent

___

#### contentFilePath

•  **contentFilePath**: string

___

#### escapeRegExpReplacement

• `Const` **escapeRegExpReplacement**: [escapeRegExpReplacement](#escaperegexpreplacement) = FsUtils.escapeRegExpReplacement

___

#### filePath

•  **filePath**: string

___

#### matchPattern

•  **matchPattern**: string

___

#### replaceInFile

• `Const` **replaceInFile**: [replaceInFile](#replaceinfile) = FsUtils.replaceInFile

___

#### replaceInFileWithFileContent

• `Const` **replaceInFileWithFileContent**: [replaceInFileWithFileContent](#replaceinfilewithfilecontent) = FsUtils.replaceInFileWithFileContent

## Classes


<a name="classesfsutilsmd"></a>

**[@handy-common-utils/fs-utils](#readmemd)**

> [Globals](#readmemd) / FsUtils

### Class: FsUtils

#### Hierarchy

* **FsUtils**

#### Index

##### Methods

* [addSurroundingInFile](#addsurroundinginfile)
* [changeFileContent](#changefilecontent)
* [escapeRegExpReplacement](#escaperegexpreplacement)
* [replaceInFile](#replaceinfile)
* [replaceInFileWithFileContent](#replaceinfilewithfilecontent)

#### Methods

##### addSurroundingInFile

▸ `Static` **addSurroundingInFile**(`filePath`: string, `matchPattern`: RegExp, `addBefore`: string, `addAfter`: string, `fileEncoding?`: Parameters\<Buffer[\"toString\"]>[\"0\"]): Promise\<void>

Add surrounding content to the matching sections in the text file.

###### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`filePath` | string | - | path to the file |
`matchPattern` | RegExp | - | RegExp for deciding which section of the file would be processed.                    You must have a capturing group in the pattern.                    You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?` |
`addBefore` | string | - | the string to be added before the capturing group, no need to escape anything |
`addAfter` | string | - | the string to be added before the capturing group, no need to escape anything |
`fileEncoding` | Parameters\<Buffer[\"toString\"]>[\"0\"] | "utf-8" | encoding of the file  |

**Returns:** Promise\<void>

___

##### changeFileContent

▸ `Static` **changeFileContent**(`filePath`: string, `transformContent`: (originalContent: string, filePath: string) => string \| PromiseLike\<string>, `fileEncoding?`: Parameters\<Buffer[\"toString\"]>[\"0\"]): Promise\<void>

Change the text file content.
This function loads the full content of the file into memory as string, so that it is not suitable for huge (for example, > 500MB) files.
If the new content and original content are the same, the file won't be touched.

###### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`filePath` | string | - | path to the file |
`transformContent` | (originalContent: string, filePath: string) => string \| PromiseLike\<string> | - | function for getting the new file content |
`fileEncoding` | Parameters\<Buffer[\"toString\"]>[\"0\"] | "utf-8" | encoding of the file  |

**Returns:** Promise\<void>

___

##### escapeRegExpReplacement

▸ `Static` **escapeRegExpReplacement**(`input`: string): string

Escape the '
 sign in the string for using the string as the second argument to String.replace(...)

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`input` | string | the original string |

**Returns:** string

a new string with all '
 in the original string being replaced by '$'

___

##### replaceInFile

▸ `Static` **replaceInFile**(`filePath`: string, `matchPattern`: RegExp, `replacementOrBuilder`: string \| (matchPattern: RegExp, filePath: string) => string \| PromiseLike\<string>, `fileEncoding?`: Parameters\<Buffer[\"toString\"]>[\"0\"]): Promise\<void>

Replace the matching sections in the text file.

###### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`filePath` | string | - | path to the file |
`matchPattern` | RegExp | - | RegExp for deciding which section of the file would be replaced. You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?` |
`replacementOrBuilder` | string \| (matchPattern: RegExp, filePath: string) => string \| PromiseLike\<string> | - | The replacement string or a function for building the replacement string.                              Please note that you can use special replacement patterns but also you need to take care of the escaping.                              For details of special replacement patterns see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace |
`fileEncoding` | Parameters\<Buffer[\"toString\"]>[\"0\"] | "utf-8" | encoding of the file  |

**Returns:** Promise\<void>

___

##### replaceInFileWithFileContent

▸ `Static` **replaceInFileWithFileContent**(`filePath`: string, `matchPattern`: RegExp, `contentFilePath`: string, `fileEncoding?`: Parameters\<Buffer[\"toString\"]>[\"0\"]): Promise\<void>

Replace the matching sections in the text file with content from another file.

###### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`filePath` | string | - | path of the file |
`matchPattern` | RegExp | - | RegExp for deciding which section of the file would be replaced.                    You must have a capturing group in the pattern.                    You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?` |
`contentFilePath` | string | - | path of the file for getting the replacement content |
`fileEncoding` | Parameters\<Buffer[\"toString\"]>[\"0\"] | "utf-8" | encoding of the files  |

**Returns:** Promise\<void>
<!-- API end -->
