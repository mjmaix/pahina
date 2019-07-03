import Step1 from './step1-categories';
import Step2 from './step2-months';
import Step3 from './step3-extract-meta';
import Step4 from './step4-clean-text';

// TODO:
// 1. Step 3 - force past 1or2 years dates to be queries again
const start = async () => {
  await Step1();
  await Step2();
  await Step3();
  await Step4();
};
start();
