import Step1 from './step1-categories';
import Step2 from './step2-months';
import Step3 from './step3-extract-meta';
import Step4 from './step4-clean-text';
import Step5 from './step5-create-upload';
import Step6 from './step6-aws-dynamodb-upload';

// TODO:
// 1. Step 3 - force past 1or2 years dates to be queries again
const start = async () => {
  await Step1();
  await Step2();
  await Step3();
  await Step4();
  await Step5();
  await Step6();
};
start();
