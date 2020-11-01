#!/usr/bin/env node

import { FsUtils } from '../fs-utils';

const [,, filePath, matchPattern, beforeString, afterString] = process.argv;

FsUtils.addSurrounding(filePath, new RegExp(matchPattern), beforeString, afterString);