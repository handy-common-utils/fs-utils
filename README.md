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

<!-- API start-->
<!-- API end-->
