#!/usr/bin/env node

/**
 * @module
 * @ignore
 */

import { FsUtils } from '../fs-utils';
import { parseArgs } from './parse-args';

const { flags, args } = parseArgs(process.argv);
const [matchPattern, replacement, ...filePaths] = args;

FsUtils.replaceInFiles(new RegExp(matchPattern, flags), replacement, ...filePaths);
