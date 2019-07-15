import _ from 'lodash';
import util from 'util';
import fs from 'fs-extra';
import faker from 'faker';
import rimraf from 'rimraf';
import { exec } from 'child_process';
import { FILES_DIR, NOTE_COUNT } from './config';

const asyncExec = util.promisify(exec);
const asyncRimraf = util.promisify(rimraf);

async function Step1() {
  const pahinaNoteCaseId = 'showdocs/1/61557';
  const username = 'b964512a-2d73-43b0-ba4d-7da8f9bf9f12';
  const outFile = `${FILES_DIR}/step1.json`;

  const updatedAt = faker.date.past().toISOString();
  const createdAt = faker.date.past(2, updatedAt).toISOString();
  const __typename = 'PahinaNote';
  const data = [];

  try {
    await asyncRimraf(FILES_DIR);
    await asyncExec(`mkdir -p ${FILES_DIR}`);
  } catch (err) {
    console.log(err);
  } finally {
  }

  _.times(NOTE_COUNT, () => {
    const randomLength = faker.random.number({ min: 1, max: 3 });
    const entry = {
      id: faker.random.uuid(),
      promotional: faker.lorem.sentences(randomLength),
      value: faker.lorem.paragraphs(randomLength),
      pahinaNoteAuthorId: username,
      author: username,
      pahinaNoteCaseId,
      updatedAt,
      createddAt: createdAt,
      status: 'DRAFT',
      priceLevel: 'L_0',
      __typename,
    };
    data.push(entry);
  });

  fs.writeJSONSync(outFile, data);
}

export default Step1;
