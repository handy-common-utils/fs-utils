#!/usr/bin/env node

import { FsUtils } from '../fs-utils';

const [,, filePath, matchPattern, replacement] = process.argv;

FsUtils.replaceInFile(filePath, new RegExp(matchPattern), replacement);
