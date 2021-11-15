import { expect } from 'chai';
import * as fs from 'fs-extra';
import * as tmp from 'tmp';
import { FsUtils } from '../src/fs-utils';

const originalFileContent = `This is the fist line.
And this is the second line.

<replace me 1>

<replace me>
<replace me>

<replace me 2>

<start>
this is the content to be replaced
<end>

<start>
this is another content to be replaced
<end>

`;

const contentFileContent = `This is
the content in
a small file.`;

async function initializeOriginalFile(): Promise<tmp.FileResult> {
  const originalFile = tmp.fileSync();
  await fs.writeFile(originalFile.name, originalFileContent);
  return originalFile;
}

async function initializeContentFile(): Promise<tmp.FileResult> {
  const contentFile = tmp.fileSync();
  await fs.writeFile(contentFile.name, contentFileContent);
  return contentFile;
}

describe('fs-utils', () => {
  it('should replaceWithFileContent(...) keep file unchanged when there is no match', async () => {
    const originalFile = await initializeOriginalFile();
    const contentFile = await initializeContentFile();

    await FsUtils.replaceInFileWithFileContent(originalFile.name, /non-existing/g, contentFile.name);
    expect(fs.readFileSync(originalFile.name).toString()).to.eq(originalFileContent);
  });
  it('should replaceWithFileContent(...) does the job when there are matches', async () => {
    const originalFile = await initializeOriginalFile();
    const contentFile = await initializeContentFile();

    await FsUtils.replaceInFileWithFileContent(originalFile.name, /<replace me>/g, contentFile.name);
    expect(fs.readFileSync(originalFile.name).toString()).to.eq(originalFileContent.replace('<replace me>', contentFileContent).replace('<replace me>', contentFileContent));
  });
  it('should addSurrounding(...) does the job when there are matches', async () => {
    const originalFile = await initializeOriginalFile();

    await FsUtils.addSurroundingInFile(originalFile.name, /<start>([\S\s]*?)<end>/gm, '<start><body>', '</body><end>');
    expect(fs.readFileSync(originalFile.name).toString()).to.eq(originalFileContent.replace(/<start>/g, '<start><body>').replace(/<end>/g, '</body><end>'));
  });
});
