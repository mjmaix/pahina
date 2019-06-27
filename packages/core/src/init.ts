import awsmobile from './aws-exports';
import Amplify, { Logger } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';

Logger.LOG_LEVEL = 'INFO';

Amplify.configure(awsmobile);

Analytics.enable();
