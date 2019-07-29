const AWS = require('aws-sdk');

const pretty = obj => JSON.stringify(obj, undefined, 2);

/**
 * NOTE: Stripped TS of AwsSSM.ts
 */
class AwsSSM {
  constructor(path) {
    if (!process.env.ENV) {
      throw new Error('ENV param not provided');
    }
    this.env = process.env.ENV;

    this.ssm = new AWS.SSM();
    this.params = {};
    this.path = path;

    this.getParams.bind(this);
    this.getParam.bind(this);
    this.fetchPath.bind(this);
    this.fetch.bind(this);
  }

  async getParams(path) {
    if (!this.params[path]) {
      await this.fetchPath(path);
    }

    return this.params[path];
  }

  async getParam(path) {
    if (!this.params[path]) {
      await this.fetch(path);
    }

    return this.params[path];
  }

  async fetchPath(path) {
    const config = {
      Path: path,
      WithDecryption: true,
    };
    const newParams = await this.ssm.getParametersByPath(config).promise();

    if (!newParams || !newParams.Parameters) {
      throw new Error(`${path} was not provided`);
    }

    this.params = {
      ...this.params,
      ...newParams.Parameters.reduce((acc, val) => {
        if (!val.Name) {
          return acc;
        }
        if (!val.Value) {
          throw new Error(`Value for ${path} missing`);
        }
        const Name = val.Name;
        const Val = val.Value;
        const pathVal = {
          [Name]: Val,
        };
        return { ...acc, ...pathVal };
      }, {}),
    };

    console.log(
      `[SUCCESS] retrieving params for ${path}`,
      this.env !== 'prod' ? pretty(this.params) : '',
    );
  }

  async fetch(path) {
    const config = {
      Name: path,
      WithDecryption: true,
    };
    const resp = await this.ssm.getParameter(config).promise();

    if (!resp || !resp.Parameter) {
      throw new Error(`${path} was not provided`);
    }
    const newParam = resp.Parameter;
    if (!newParam.Name || !newParam.Value) {
      throw new Error(`${path} was not provided`);
    }

    this.params = { ...this.params, [newParam.Name]: newParam.Value };
    console.log(
      `[SUCCESS] retrieving param for ${path}`,
      this.env !== 'prod' ? pretty(this.params) : '',
    );
  }
}

const instance = new AwsSSM();

exports.default = instance;
