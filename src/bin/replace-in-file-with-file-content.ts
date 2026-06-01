#!/usr/bin/env node

/**
 * @module
 * @ignore
 */

import { FsUtils } from '../fs-utils';
import { parseArgs } from './parse-args';

const { flags, args } = parseArgs(process.argv);
const [filePath, matchPattern, contentFilePath] = args;

FsUtils.replaceInFileWithFileContent(filePath, new RegExp(matchPattern, flags), contentFilePath);
