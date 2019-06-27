import awsmobile from './aws-exports';
import Amplify, { Logger } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';

Logger.LOG_LEVEL = 'DEBUG';
Analytics.disable(); // FIXME: https://github.com/mjmaix/pahina/issues/1

Amplify.configure(awsmobile);
