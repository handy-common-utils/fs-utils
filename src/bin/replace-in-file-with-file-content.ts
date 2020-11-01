#!/usr/bin/env node

import { FsUtils } from '../fs-utils';

const [,, filePath, matchPattern, contentFilePath] = process.argv;

FsUtils.replaceInFileWithFileContent(filePath, new RegExp(matchPattern), contentFilePath);