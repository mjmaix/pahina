import AWS from 'aws-sdk';
import { ProcessingError } from '../utils/ProcessingError';
import { pretty } from '../utils/simpleUtils';

class AwsSSM {
  ssm: AWS.SSM;
  env: string;
  params: { [k: string]: any };

  constructor() {
    if (!process.env.ENV) {
      throw new ProcessingError('ENV param not provided');
    }
    this.env = process.env.ENV;

    this.ssm = new AWS.SSM();
    this.params = {};
  }

  getParams = async (path: string) => {
    if (!this.params[path]) {
      await this.fetch(path);
    }
    return this.params[path] as { Parameters: AWS.SSM.ParameterList };
  };

  fetch = async (path: string) => {
    const config = {
      Path: path,
      WithDecryption: true,
    };
    this.params = await this.ssm.getParametersByPath(config).promise();
    console.log(
      `[SUCCESS] retrieving params for ${path}`,
      this.env !== 'prod' ? pretty(this.params) : '',
    );
  };
}

const instance = new AwsSSM();

export default instance;
