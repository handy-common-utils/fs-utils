# @handy-common-utils/fs-utils

File system operations related utilities based on fs-extra

## How to use

First add it as a dependency:

```sh
npm install @handy-common-utils/fs-utils
```

Then you can use it in the code:

```javascript
import { FsUtils } from '@handy-common-utils/fs-utils';

const [,, filePath, matchPattern, beforeString, afterString] = process.argv;
await FsUtils.addSurroundingInFile(filePath, new RegExp(matchPattern), beforeString, afterString);
```

You can either import and use the [class](#classes) as shown above,
or you can import individual [functions](#variables) directly like below:

```javascript
import { addSurroundingInFile } from 'fs-utils';

await addSurroundingInFile(README_MD_FILE, /<example>(.*?)<\/example>/gms, '<example><b>', '</b></example>');
```

# API

<!-- API start -->
<a name="readmemd"></a>

@handy-common-utils/fs-utils

## @handy-common-utils/fs-utils

### Table of contents

#### Modules

- [fs-utils](#modulesfs_utilsmd)

## Classes


<a name="classesfs_utilsfsutilsmd"></a>

[@handy-common-utils/fs-utils](#readmemd) / [fs-utils](#modulesfs_utilsmd) / FsUtils

### Class: FsUtils

[fs-utils](#modulesfs_utilsmd).FsUtils

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Methods

- [addSurroundingInFile](#addsurroundinginfile)
- [changeFileContent](#changefilecontent)
- [escapeRegExpReplacement](#escaperegexpreplacement)
- [replaceInFile](#replaceinfile)
- [replaceInFileWithFileContent](#replaceinfilewithfilecontent)

#### Constructors

##### constructor

• **new FsUtils**()

#### Methods

##### addSurroundingInFile

▸ `Static` **addSurroundingInFile**(`filePath`, `matchPattern`, `addBefore`, `addAfter`, `fileEncoding?`): `Promise`<`void`\>

Add surrounding content to the matching sections in the text file.

###### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `filePath` | `string` | `undefined` | path to the file |
| `matchPattern` | `RegExp` | `undefined` | RegExp for deciding which section of the file would be processed.                    You must have a capturing group in the pattern.                    You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?` |
| `addBefore` | `string` | `undefined` | the string to be added before the capturing group, no need to escape anything |
| `addAfter` | `string` | `undefined` | the string to be added before the capturing group, no need to escape anything |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` | encoding of the file |

###### Returns

`Promise`<`void`\>

Promise of void

___

##### changeFileContent

▸ `Static` **changeFileContent**(`filePath`, `transformContent`, `fileEncoding?`): `Promise`<`void`\>

Change the text file content.
This function loads the full content of the file into memory as string, so that it is not suitable for huge (for example, > 500MB) files.
If the new content and original content are the same, the file won't be touched.

###### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `filePath` | `string` | `undefined` | path to the file |
| `transformContent` | (`originalContent`: `string`, `filePath`: `string`) => `string` \| `PromiseLike`<`string`\> | `undefined` | function for getting the new file content |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` | encoding of the file |

###### Returns

`Promise`<`void`\>

Promise of void

___

##### escapeRegExpReplacement

▸ `Static` **escapeRegExpReplacement**(`input`): `string`

Escape the '
 sign in the string for using the string as the second argument to String.replace(...)

###### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | the original string |

###### Returns

`string`

a new string with all '
 in the original string being replaced by '$'

___

##### replaceInFile

▸ `Static` **replaceInFile**(`filePath`, `matchPattern`, `replacementOrBuilder`, `fileEncoding?`): `Promise`<`void`\>

Replace the matching sections in the text file.

###### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `filePath` | `string` | `undefined` | path to the file |
| `matchPattern` | `RegExp` | `undefined` | RegExp for deciding which section of the file would be replaced. You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?` |
| `replacementOrBuilder` | `string` \| (`matchPattern`: `RegExp`, `filePath`: `string`) => `string` \| `PromiseLike`<`string`\> | `undefined` | The replacement string or a function for building the replacement string.                              Please note that you can use special replacement patterns but also you need to take care of the escaping.                              For details of special replacement patterns see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` | encoding of the file |

###### Returns

`Promise`<`void`\>

Promise of void

___

##### replaceInFileWithFileContent

▸ `Static` **replaceInFileWithFileContent**(`filePath`, `matchPattern`, `contentFilePath`, `fileEncoding?`): `Promise`<`void`\>

Replace the matching sections in the text file with content from another file.

###### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `filePath` | `string` | `undefined` | path of the file |
| `matchPattern` | `RegExp` | `undefined` | RegExp for deciding which section of the file would be replaced.                    You must have a capturing group in the pattern.                    You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?` |
| `contentFilePath` | `string` | `undefined` | path of the file for getting the replacement content |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` | encoding of the files |

###### Returns

`Promise`<`void`\>

Promise of void

## Modules


<a name="modulesfs_utilsmd"></a>

[@handy-common-utils/fs-utils](#readmemd) / fs-utils

### Module: fs-utils

#### Table of contents

##### Classes

- [FsUtils](#classesfs_utilsfsutilsmd)

##### Functions

- [addSurroundingInFile](#addsurroundinginfile)
- [changeFileContent](#changefilecontent)
- [escapeRegExpReplacement](#escaperegexpreplacement)
- [replaceInFile](#replaceinfile)
- [replaceInFileWithFileContent](#replaceinfilewithfilecontent)

#### Functions

##### addSurroundingInFile

▸ `Const` **addSurroundingInFile**(`filePath`, `matchPattern`, `addBefore`, `addAfter`, `fileEncoding?`): `Promise`<`void`\>

###### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `filePath` | `string` | `undefined` |
| `matchPattern` | `RegExp` | `undefined` |
| `addBefore` | `string` | `undefined` |
| `addAfter` | `string` | `undefined` |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` |

###### Returns

`Promise`<`void`\>

___

##### changeFileContent

▸ `Const` **changeFileContent**(`filePath`, `transformContent`, `fileEncoding?`): `Promise`<`void`\>

###### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `filePath` | `string` | `undefined` |
| `transformContent` | (`originalContent`: `string`, `filePath`: `string`) => `string` \| `PromiseLike`<`string`\> | `undefined` |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` |

###### Returns

`Promise`<`void`\>

___

##### escapeRegExpReplacement

▸ `Const` **escapeRegExpReplacement**(`input`): `string`

###### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

###### Returns

`string`

___

##### replaceInFile

▸ `Const` **replaceInFile**(`filePath`, `matchPattern`, `replacementOrBuilder`, `fileEncoding?`): `Promise`<`void`\>

###### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `filePath` | `string` | `undefined` |
| `matchPattern` | `RegExp` | `undefined` |
| `replacementOrBuilder` | `string` \| (`matchPattern`: `RegExp`, `filePath`: `string`) => `string` \| `PromiseLike`<`string`\> | `undefined` |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` |

###### Returns

`Promise`<`void`\>

___

##### replaceInFileWithFileContent

▸ `Const` **replaceInFileWithFileContent**(`filePath`, `matchPattern`, `contentFilePath`, `fileEncoding?`): `Promise`<`void`\>

###### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `filePath` | `string` | `undefined` |
| `matchPattern` | `RegExp` | `undefined` |
| `contentFilePath` | `string` | `undefined` |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` |

###### Returns

`Promise`<`void`\>
<!-- API end -->
