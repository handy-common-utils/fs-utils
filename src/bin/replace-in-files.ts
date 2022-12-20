#!/usr/bin/env node

import { FsUtils } from '../fs-utils';

const [,, matchPattern, replacement, ...filePaths] = process.argv;

FsUtils.replaceInFiles(new RegExp(matchPattern), replacement, ...filePaths);
