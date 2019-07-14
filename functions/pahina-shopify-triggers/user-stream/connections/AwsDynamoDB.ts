import AWS, { DynamoDB } from 'aws-sdk';

AWS.config.update({ region: process.env.R });

class AwsDynamoDB {
  ddb: AWS.DynamoDB;
  constructor() {
    this.ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
  }

  putItem = (obj: DynamoDB.Types.PutItemInput) => {
    console.log('[PutItem]', obj);
    return this.ddb.putItem(obj).promise();
  };
}

const instance = new AwsDynamoDB();

export default instance;
