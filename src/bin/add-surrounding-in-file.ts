#!/usr/bin/env node

/**
 * @module
 * @ignore
 */

import { FsUtils } from '../fs-utils';
import { parseArgs } from './parse-args';

const { flags, args } = parseArgs(process.argv);
const [filePath, matchPattern, beforeString, afterString] = args;

FsUtils.addSurroundingInFile(filePath, new RegExp(matchPattern, flags), beforeString, afterString);
