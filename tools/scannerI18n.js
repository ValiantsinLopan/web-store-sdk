import glob from 'glob';
import fs from 'fs';
import { Parser } from 'i18next-scanner';
import path from 'path';

import { writeFile, makeDir } from './lib/fs';

function readFilePromise(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function parseFile(file) {
  try {
    const content = await readFilePromise(file);
    if (!content) return null;
    const parser = new Parser({
      keySeparator: '.|.',
    });
    parser.parseFuncFromString(content, { list: ['t'] });
    const obj = parser.get('');
    return obj;
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error);
  }
  return {};
}

async function mergeOldAndNewLocales(obj, file, lngs) {
  let mergedObj = Object.assign({}, obj);
  if (Object.keys(mergedObj).length !== 0) {
    const pathFile = `${path.dirname(file)}/locales/`;
    await Promise.all(
      lngs.map(async lng => {
        const fileName = `${pathFile}/${lng}.json`;
        if (fs.existsSync(fileName)) {
          const data = await readFilePromise(fileName);
          const jsonContent = JSON.parse(data);
          mergedObj = Object.assign(mergedObj, jsonContent);
        } else {
          makeDir(pathFile);
        }
        await writeFile(fileName, JSON.stringify(mergedObj));
        return fileName;
      }),
    );
  }
  return mergedObj;
}
function run() {
  const lngs = ['en_US', 'pl_PL'];
  return new Promise(resolve =>
    glob('./src/**/*.js', async (err, files) => {
      await Promise.all(
        files.map(
          file =>
            new Promise(async (resolveFile, rejectFile) => {
              try {
                const contentObj = await parseFile(file);
                await mergeOldAndNewLocales(contentObj, file, lngs);
                resolveFile(contentObj);
              } catch (error) {
                rejectFile(error);
              }
            }),
        ),
      );
      resolve(true);
    }),
  );
}

export default run;
