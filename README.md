# @handy-common-utils/fs-utils

File system operations related utilities based on fs-extra

## How to use

First add it as a dependency:

```sh
npm install @handy-common-utils/fs-utils
```

Then you can use it in the code:

```javascript
import { FsUtils } from '../fs-utils';

const [,, filePath, matchPattern, beforeString, afterString] = process.argv;
FsUtils.addSurrounding(filePath, new RegExp(matchPattern), beforeString, afterString);
```

You can either import and use the [class](#classes) as shown above,
or you can import individual [functions](#variables) directly.

# API

<!-- API -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [handy-common-utils](#handy-common-utils)
  - [Index](#index)
  - [Type aliases](#type-aliases)
  - [Variables](#variables)
- [Classes](#classes)
  - [Class: AwsUtils](#class-awsutils)
  - [Class: OclifUtils](#class-oclifutils)
  - [Class: SingleCommandHelp](#class-singlecommandhelp)
  - [Class: Utils](#class-utils)
- [Interfaces](#interfaces)
  - [Interface: OclifHelpContent](#interface-oclifhelpcontent)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


<a name="readmemd"></a>

## handy-common-utils

### Index

#### Classes

* [AwsUtils](#classesawsutilsmd)
* [OclifUtils](#classesoclifutilsmd)
* [SingleCommandHelp](#classessinglecommandhelpmd)
* [Utils](#classesutilsmd)

#### Interfaces

* [OclifHelpContent](#interfacesoclifhelpcontentmd)

#### Type aliases

* [InParrellelResult](#inparrellelresult)

#### Variables

* [delayedReject](#delayedreject)
* [delayedResolve](#delayedresolve)
* [inParallel](#inparallel)
* [parseArn](#parsearn)
* [repeat](#repeat)
* [repeatFetchingItemsByMarker](#repeatfetchingitemsbymarker)
* [repeatFetchingItemsByNextToken](#repeatfetchingitemsbynexttoken)
* [repeatFetchingItemsByPosition](#repeatfetchingitemsbyposition)
* [timeoutReject](#timeoutreject)
* [timeoutResolve](#timeoutresolve)

### Type aliases

#### InParrellelResult

Ƭ  **InParrellelResult**\<T>: T *extends* void ? void : Array\<T>

##### Type parameters:

Name |
------ |
`T` |

### Variables

#### delayedReject

• `Const` **delayedReject**: [delayedReject](#delayedreject) = Utils.delayedReject

___

#### delayedResolve

• `Const` **delayedResolve**: [delayedResolve](#delayedresolve) = Utils.delayedResolve

___

#### inParallel

• `Const` **inParallel**: [inParallel](#inparallel) = Utils.inParallel

___

#### parseArn

• `Const` **parseArn**: [parseArn](#parsearn) = AwsUtils.parseArn

___

#### repeat

• `Const` **repeat**: [repeat](#repeat) = Utils.repeat

___

#### repeatFetchingItemsByMarker

• `Const` **repeatFetchingItemsByMarker**: [repeatFetchingItemsByMarker](#repeatfetchingitemsbymarker) = AwsUtils.repeatFetchingItemsByMarker

___

#### repeatFetchingItemsByNextToken

• `Const` **repeatFetchingItemsByNextToken**: [repeatFetchingItemsByNextToken](#repeatfetchingitemsbynexttoken) = AwsUtils.repeatFetchingItemsByNextToken

___

#### repeatFetchingItemsByPosition

• `Const` **repeatFetchingItemsByPosition**: [repeatFetchingItemsByPosition](#repeatfetchingitemsbyposition) = AwsUtils.repeatFetchingItemsByPosition

___

#### timeoutReject

• `Const` **timeoutReject**: [timeoutReject](#timeoutreject) = Utils.timeoutReject

___

#### timeoutResolve

• `Const` **timeoutResolve**: [timeoutResolve](#timeoutresolve) = Utils.timeoutResolve

## Classes


<a name="classesawsutilsmd"></a>

### Class: AwsUtils

#### Hierarchy

* **AwsUtils**

#### Index

##### Methods

* [parseArn](#parsearn)
* [repeatFetchingItemsByMarker](#repeatfetchingitemsbymarker)
* [repeatFetchingItemsByNextToken](#repeatfetchingitemsbynexttoken)
* [repeatFetchingItemsByPosition](#repeatfetchingitemsbyposition)

#### Methods

##### parseArn

▸ `Static`**parseArn**(`arn`: string \| null \| undefined): ReturnType\<*typeof* simpleParseArn> & { arn: string  } \| null \| undefined

Parse ARN

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`arn` | string \| null \| undefined | the ARN string that could be null or undefined |

**Returns:** ReturnType\<*typeof* simpleParseArn> & { arn: string  } \| null \| undefined

null or undeinfed if the input is null or undefined, or parsed ARN including the original ARN string

___

##### repeatFetchingItemsByMarker

▸ `Static`**repeatFetchingItemsByMarker**\<T>(`itemsFieldName`: string, `fetchItemsByMarker`: (parameter: { Marker?: undefined \| string  }) => Promise\<{ NextMarker?: undefined \| string  }>): Promise\<T[]>

Fetch items by Marker repeatedly.
This function is useful for client side pagination when the response from AWS API contains NextMarker fields.

**`example`** 
const topics = await AwsUtils.repeatFetchingItemsByNextToken<SNS.Topic>('Topics',
  pagingParam => sns.listTopics({...pagingParam}).promise(),
);

###### Type parameters:

Name | Description |
------ | ------ |
`T` | type of the items returned by AWS API  |

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`itemsFieldName` | string | name of the field containing returned items in AWS API response |
`fetchItemsByMarker` | (parameter: { Marker?: undefined \| string  }) => Promise\<{ NextMarker?: undefined \| string  }> | the function for fetching items by Marker |

**Returns:** Promise\<T[]>

all items fetched

___

##### repeatFetchingItemsByNextToken

▸ `Static`**repeatFetchingItemsByNextToken**\<T>(`itemsFieldName`: string, `fetchItemsByNextToken`: (parameter: { NextToken?: undefined \| string  }) => Promise\<{ NextToken?: undefined \| string  }>): Promise\<T[]>

Fetch items by NextToken repeatedly.
This function is useful for client side pagination when the response from AWS API contains NextToken fields.

**`example`** 
const topics = await AwsUtils.repeatFetchingItemsByNextToken<SNS.Topic>('Topics',
  pagingParam => sns.listTopics({...pagingParam}).promise(),
);

###### Type parameters:

Name | Description |
------ | ------ |
`T` | type of the items returned by AWS API  |

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`itemsFieldName` | string | name of the field containing returned items in AWS API response |
`fetchItemsByNextToken` | (parameter: { NextToken?: undefined \| string  }) => Promise\<{ NextToken?: undefined \| string  }> | the function for fetching items by NextToken |

**Returns:** Promise\<T[]>

all items fetched

___

##### repeatFetchingItemsByPosition

▸ `Static`**repeatFetchingItemsByPosition**\<T>(`fetchItemsByPosition`: (parameter: { position?: undefined \| string  }) => Promise\<{ items?: Array\<T> ; position?: undefined \| string  }>): Promise\<T[]>

Fetch items by position repeatedly.
This function is useful for client side pagination when the response from AWS API contains position and items fields.

**`example`** 
const domainNameObjects = await AwsUtils.repeatFetchingItemsByPosition(
  pagingParam => apig.getDomainNames({limit: 500, ...pagingParam}).promise(),
);

###### Type parameters:

Name | Description |
------ | ------ |
`T` | type of the items returned by AWS API  |

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`fetchItemsByPosition` | (parameter: { position?: undefined \| string  }) => Promise\<{ items?: Array\<T> ; position?: undefined \| string  }> | the function for fetching items by position |

**Returns:** Promise\<T[]>

all items fetched


<a name="classesoclifutilsmd"></a>

### Class: OclifUtils

#### Hierarchy

* **OclifUtils**

#### Index

##### Methods

* [generateHelpText](#generatehelptext)
* [getCommandConfig](#getcommandconfig)
* [injectHelpTextIntoReadmeMd](#injecthelptextintoreadmemd)
* [prependCliToExamples](#prependclitoexamples)

#### Methods

##### generateHelpText

▸ `Static`**generateHelpText**(`commandInstance`: Command, `opts?`: Partial\<HelpOptions>): string

Generate formatted text content of help to a command

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`commandInstance` | Command | instance of the Command |
`opts?` | Partial\<HelpOptions> | format options  |

**Returns:** string

___

##### getCommandConfig

▸ `Static`**getCommandConfig**(`commandInstance`: Command): Command

###### Parameters:

Name | Type |
------ | ------ |
`commandInstance` | Command |

**Returns:** Command

___

##### injectHelpTextIntoReadmeMd

▸ `Static`**injectHelpTextIntoReadmeMd**(`commandInstance`: Command, `opts?`: Partial\<HelpOptions>): Promise\<void>

###### Parameters:

Name | Type |
------ | ------ |
`commandInstance` | Command |
`opts?` | Partial\<HelpOptions> |

**Returns:** Promise\<void>

___

##### prependCliToExamples

▸ `Static`**prependCliToExamples**(`commandInstance`: Command): void

Use this function to prepend command line to examples.
This function needs to be called from `init()` function of the Command.

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`commandInstance` | Command | instance of the Command  |

**Returns:** void


<a name="classessinglecommandhelpmd"></a>

### Class: SingleCommandHelp

#### Hierarchy

* Help

  ↳ **SingleCommandHelp**

#### Index

##### Constructors

* [constructor](#constructor)

##### Properties

* [commandInstance](#commandinstance)
* [config](#config)
* [opts](#opts)
* [render](#render)

##### Accessors

* [sortedCommands](#sortedcommands)
* [sortedTopics](#sortedtopics)

##### Methods

* [command](#command)
* [formatCommand](#formatcommand)
* [formatCommands](#formatcommands)
* [formatRoot](#formatroot)
* [formatTopic](#formattopic)
* [formatTopics](#formattopics)
* [generateHelpText](#generatehelptext)
* [showCommandHelp](#showcommandhelp)
* [showHelp](#showhelp)
* [showRootHelp](#showroothelp)
* [showTopicHelp](#showtopichelp)

#### Constructors

##### constructor

\+ **new SingleCommandHelp**(`commandInstance`: Command, `opts?`: Partial\<HelpOptions>): [SingleCommandHelp](#classessinglecommandhelpmd)

*Overrides void*

###### Parameters:

Name | Type |
------ | ------ |
`commandInstance` | Command |
`opts?` | Partial\<HelpOptions> |

**Returns:** [SingleCommandHelp](#classessinglecommandhelpmd)

#### Properties

##### commandInstance

• `Protected` **commandInstance**: Command

___

##### config

• `Protected` **config**: IConfig

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[config](#config)*

___

##### opts

• `Protected` **opts**: HelpOptions

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[opts](#opts)*

___

##### render

•  **render**: (input: string) => string

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[render](#render)*

#### Accessors

##### sortedCommands

• `Protected`get **sortedCommands**(): Plugin[]

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[sortedCommands](#sortedcommands)*

**Returns:** Plugin[]

___

##### sortedTopics

• `Protected`get **sortedTopics**(): Topic[]

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[sortedTopics](#sortedtopics)*

**Returns:** Topic[]

#### Methods

##### command

▸ `Protected`**command**(`command`: Command): string

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[command](#command)*

**`deprecated`** used for readme generation

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`command` | Command | The command to generate readme help for |

**Returns:** string

the readme help string for the given command

___

##### formatCommand

▸ `Protected`**formatCommand**(`command`: Command): string

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[formatCommand](#formatcommand)*

###### Parameters:

Name | Type |
------ | ------ |
`command` | Command |

**Returns:** string

___

##### formatCommands

▸ `Protected`**formatCommands**(`commands`: Command[]): string

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[formatCommands](#formatcommands)*

###### Parameters:

Name | Type |
------ | ------ |
`commands` | Command[] |

**Returns:** string

___

##### formatRoot

▸ `Protected`**formatRoot**(): string

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[formatRoot](#formatroot)*

**Returns:** string

___

##### formatTopic

▸ `Protected`**formatTopic**(`topic`: Topic): string

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[formatTopic](#formattopic)*

###### Parameters:

Name | Type |
------ | ------ |
`topic` | Topic |

**Returns:** string

___

##### formatTopics

▸ `Protected`**formatTopics**(`topics`: Topic[]): string

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[formatTopics](#formattopics)*

###### Parameters:

Name | Type |
------ | ------ |
`topics` | Topic[] |

**Returns:** string

___

##### generateHelpText

▸ **generateHelpText**(): string

**Returns:** string

___

##### showCommandHelp

▸ **showCommandHelp**(`command`: Command): void

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[showCommandHelp](#showcommandhelp)*

*Overrides void*

###### Parameters:

Name | Type |
------ | ------ |
`command` | Command |

**Returns:** void

___

##### showHelp

▸ **showHelp**(`argv`: string[]): void

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[showHelp](#showhelp)*

*Overrides void*

###### Parameters:

Name | Type |
------ | ------ |
`argv` | string[] |

**Returns:** void

___

##### showRootHelp

▸ `Protected`**showRootHelp**(): void

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[showRootHelp](#showroothelp)*

**Returns:** void

___

##### showTopicHelp

▸ `Protected`**showTopicHelp**(`topic`: Topic): void

*Inherited from [SingleCommandHelp](#classessinglecommandhelpmd).[showTopicHelp](#showtopichelp)*

###### Parameters:

Name | Type |
------ | ------ |
`topic` | Topic |

**Returns:** void


<a name="classesutilsmd"></a>

### Class: Utils

#### Hierarchy

* **Utils**

#### Index

##### Methods

* [delayedReject](#delayedreject)
* [delayedResolve](#delayedresolve)
* [inParallel](#inparallel)
* [repeat](#repeat)
* [timeoutReject](#timeoutreject)
* [timeoutResolve](#timeoutresolve)

#### Methods

##### delayedReject

▸ `Static`**delayedReject**\<T>(`ms`: number, `reason`: any): Promise\<T>

Create a Promise that rejects after number of milliseconds specified

###### Type parameters:

Name | Default |
------ | ------ |
`T` | never |

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ms` | number | number of milliseconds after which the created Promise would reject |
`reason` | any | the reason of the rejection for the Promise |

**Returns:** Promise\<T>

the new Promise created

___

##### delayedResolve

▸ `Static`**delayedResolve**\<T>(`ms`: number, `result?`: T \| PromiseLike\<T> \| undefined): Promise\<T>

Create a Promise that resolves after number of milliseconds specified

###### Type parameters:

Name |
------ |
`T` |

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ms` | number | number of milliseconds after which the created Promise would resolve |
`result?` | T \| PromiseLike\<T> \| undefined | the result to be resolved for the Promise |

**Returns:** Promise\<T>

the new Promise created

___

##### inParallel

▸ `Static`**inParallel**\<Data, Result>(`parallelism`: number, `jobs`: Iterable\<Data>, `operation`: (job: Data, index: number) => Promise\<Result>): Promise\<[InParrellelResult](#inparrellelresult)\<Result>>

Run multiple jobs/operations in parallel.

**`example`** 
const topicArns = topics.map(topic => topic.TopicArn!);
await Utils.inParallel(5, topicArns, async topicArn => {
  const topicAttributes = (await sns.getTopicAttributes({ TopicArn: topicArn }).promise()).Attributes!;
  const topicDetails = { ...topicAttributes, subscriptions: [] } as any;
  if (this.shouldInclude(topicArn)) {
    inventory.snsTopicsByArn.set(topicArn, topicDetails);
  }
});

###### Type parameters:

Name | Description |
------ | ------ |
`Data` | Type of the job data, usually it would be an Array |
`Result` | Type of the return value of the operation function  |

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`parallelism` | number | how many jobs/operations can be running at the same time |
`jobs` | Iterable\<Data> | job data which will be the input to operation function.                    This function is safe when there are infinite unknown number of elements in the job data. |
`operation` | (job: Data, index: number) => Promise\<Result> | the function that turns job data into result asynchronously |

**Returns:** Promise\<[InParrellelResult](#inparrellelresult)\<Result>>

Promise of void if the operation function does not return a value,
         or promise of an arry containing results returned from the operation function.

___

##### repeat

▸ `Static`**repeat**\<Result, Param, Collection>(`operation`: (parameter: Partial\<Param>) => Promise\<Result>, `nextParameter`: (response: Result) => Partial\<Param> \| null, `collect`: (collection: Collection, result: Result) => Collection, `initialCollection`: Collection, `initialParameter?`: Partial\<Param>): Promise\<Collection>

Do an operation repeatedly and collect all the results.
This function is useful for client side pagination.

**`example`** 
const domainNameObjects = await Utils.repeat(
  pagingParam => apig.getDomainNames({limit: 500, ...pagingParam}).promise(),
  esponse => response.position? {position: response.position} : null,
  (collection, response) => collection.concat(response.items!),
  [] as APIGateway.DomainName[],
);

###### Type parameters:

Name | Description |
------ | ------ |
`Result` | type of the operation result |
`Param` | type of the input to the operation, normally the input is a paging parameter |
`Collection` | type of the returned value of this function  |

###### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`operation` | (parameter: Partial\<Param>) => Promise\<Result> | - | a function that takes paging parameter as input and outputs a result, normally the operation supports paging |
`nextParameter` | (response: Result) => Partial\<Param> \| null | - | The function for calculating next parameter from the operation result.                      Normally the parameter controls paging,                      This function should return null when next invocation of the operation function is not desired. |
`collect` | (collection: Collection, result: Result) => Collection | - | the function for merging operation result into the collection |
`initialCollection` | Collection | - | initial collection which would be the first argument passed into the first invocation of the collect function |
`initialParameter` | Partial\<Param> | {} | the parameter for the first operation |

**Returns:** Promise\<Collection>

Promise of collection of all the results returned by the operation function

___

##### timeoutReject

▸ `Static`**timeoutReject**\<T>(`operation`: Promise\<T>, `ms`: number, `rejectReason`: any): Promise\<T>

Apply timeout to an operation, in case timeout happens, reject with the reason specified.
If timeout does not happen, the resolved result or rejection reason of the original operation would be returned.

###### Type parameters:

Name |
------ |
`T` |

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`operation` | Promise\<T> | the original operation that timeout would be applied |
`ms` | number | number of milliseconds for the timeout |
`rejectReason` | any | the reason of the rejection in case timeout happens |

**Returns:** Promise\<T>

___

##### timeoutResolve

▸ `Static`**timeoutResolve**\<T>(`operation`: Promise\<T>, `ms`: number, `result?`: T \| PromiseLike\<T> \| undefined): Promise\<T>

Apply timeout to an operation, in case timeout happens, resolve to the result specified.
If timeout does not happen, the resolved result or rejection reason of the original operation would be returned.

###### Type parameters:

Name |
------ |
`T` |

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`operation` | Promise\<T> | the original operation that timeout would be applied |
`ms` | number | number of milliseconds for the timeout |
`result?` | T \| PromiseLike\<T> \| undefined | the result to be resolved in case timeout happens |

**Returns:** Promise\<T>

## Interfaces


<a name="interfacesoclifhelpcontentmd"></a>

### Interface: OclifHelpContent

#### Hierarchy

* **OclifHelpContent**

#### Index

##### Properties

* [aliases](#aliases)
* [args](#args)
* [description](#description)
* [examples](#examples)
* [flags](#flags)
* [usage](#usage)

#### Properties

##### aliases

• `Optional` **aliases**: undefined \| string

___

##### args

• `Optional` **args**: undefined \| string

___

##### description

• `Optional` **description**: undefined \| string

___

##### examples

• `Optional` **examples**: undefined \| string

___

##### flags

• `Optional` **flags**: undefined \| string

___

##### usage

• `Optional` **usage**: undefined \| string
