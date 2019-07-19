import AWS from 'aws-sdk';
import { ProcessingError } from '../utils/ProcessingError';
import { pretty } from '../utils/simpleUtils';

interface Params {
  [k: string]: string | number | Date;
}

class AwsSSM {
  ssm: AWS.SSM;
  env: string;
  params: Params;
  path: String | undefined;

  constructor(path?: String) {
    if (!process.env.ENV) {
      throw new ProcessingError('ENV param not provided');
    }
    this.env = process.env.ENV;

    this.ssm = new AWS.SSM();
    this.params = {};
    this.path = path;
  }

  getParams = async (path: string) => {
    if (!this.params[path]) {
      await this.fetchPath(path);
    }

    return this.params[path];
  };

  getParam = async (path: string) => {
    if (!this.params[path]) {
      await this.fetch(path);
    }

    return this.params[path];
  };

  fetchPath = async (path: string) => {
    const config = {
      Path: path,
      WithDecryption: true,
    };
    const newParams: AWS.SSM.GetParametersByPathResult = await this.ssm
      .getParametersByPath(config)
      .promise();

    if (!newParams || !newParams.Parameters) {
      throw new ProcessingError(`${path} was not provided`);
    }

    this.params = {
      ...this.params,
      ...newParams.Parameters.reduce((acc, val) => {
        if (!val.Name) {
          return acc;
        }
        if (!val.Value) {
          throw new ProcessingError(`Value for ${path} missing`);
        }
        const Name: string = val.Name;
        const Val = val.Value;
        const pathVal = {
          [Name]: Val,
        };
        return { ...acc, ...pathVal };
      }, {}),
    } as Params;

    console.log(
      `[SUCCESS] retrieving params for ${path}`,
      this.env !== 'prod' ? pretty(this.params) : '',
    );
  };

  fetch = async (path: string) => {
    const config = {
      Name: path,
      WithDecryption: true,
    };
    const resp = await this.ssm.getParameter(config).promise();

    if (!resp || !resp.Parameter) {
      throw new ProcessingError(`${path} was not provided`);
    }
    const newParam = resp.Parameter;
    if (!newParam.Name || !newParam.Value) {
      throw new ProcessingError(`${path} was not provided`);
    }

    this.params = { ...this.params, [newParam.Name]: newParam.Value };
    console.log(
      `[SUCCESS] retrieving param for ${path}`,
      this.env !== 'prod' ? pretty(this.params) : '',
    );
  };
}

const instance = new AwsSSM();

export default instance;
