import PahinaCaseStep1 from './PahinaCase/step1-categories';
import PahinaCaseStep2 from './PahinaCase/step2-months';
import PahinaCaseStep3 from './PahinaCase/step3-extract-meta';
import PahinaCaseStep4 from './PahinaCase/step4-clean-text';
import PahinaCaseStep5 from './PahinaCase/step5-batch';
import PahinaCaseStep6 from './PahinaCase/step6-upload';

import PahinaNoteStep1 from './PahinaNote/step1-faker';
import PahinaNoteStep2 from './PahinaNote/step2-batch';
import PahinaNoteStep3 from './PahinaNote/step3-upload';

const all = async () => {
  // TODO:
  // 1. PahinaCaseStep 3 - force past 1or2 years dates to be queries again
  // 2. Convert to CLI to use individually, yargs
  const PahinaCase = async () => {
    //   await PahinaCaseStep1();
    //   await PahinaCaseStep2();
    //   await PahinaCaseStep3();
    //   await PahinaCaseStep4();
    // await PahinaCaseStep5();
    // await PahinaCaseStep6();
  };
  await PahinaCase();

  const PahinaNote = async () => {
    await PahinaNoteStep1();
    await PahinaNoteStep2();
    await PahinaNoteStep3();
  };
  await PahinaNote();
};

all();
