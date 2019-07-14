import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.Logger.LOG_LEVEL = 'INFO';
Amplify.configure(awsmobile);
