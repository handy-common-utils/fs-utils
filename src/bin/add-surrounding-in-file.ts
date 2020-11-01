#!/usr/bin/env node

import { FsUtils } from '../fs-utils';

const [,, filePath, matchPattern, beforeString, afterString] = process.argv;

FsUtils.addSurroundingInFile(filePath, new RegExp(matchPattern), beforeString, afterString);