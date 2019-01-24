import glob from 'glob';
import { writeFile, copyFile, makeDir } from './lib/fs';

function mapFilesByLng(files) {
  const concat = {};
  files.forEach(file => {
    const regex = /([a-zA-Z0-9]+)\/locales\/([a-zA-Z_-]+).json/gm;
    const [, ns, lng] = regex.exec(file);
    const tmpChild = {
      file,
      lng,
      ns,
    };
    if (Array.isArray(concat[lng])) {
      concat[lng].push(tmpChild);
    } else {
      concat[lng] = [tmpChild];
    }
  });
  return concat;
}

function run() {
  return new Promise((resolve, reject) => {
    glob('./src/**/locales/*.json', async (err, files) => {
      const concat = mapFilesByLng(files);
      Object.keys(concat).forEach(async key => {
        try {
          await makeDir(`./build/public/locales/${key.replace('_', '-')}`);
          await writeFile(
            `./build/public/locales/${key.replace('_', '-')}/translation.json`,
            '{}',
          );
          concat[key].map(({ ns, file, lng }) =>
            copyFile(
              file,
              `./build/public/locales/${lng.replace('_', '-')}/${ns}.json`,
            ),
          );
        } catch (error) {
          reject(error);
        }
        resolve(concat);
      });
    });
  });
}

export default run;
