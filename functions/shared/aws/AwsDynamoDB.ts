import AWS, { DynamoDB } from 'aws-sdk';
import { pretty } from '../utils/simpleUtils';

AWS.config.update({ region: process.env.REGION });

class AwsDynamoDB {
  ddb: AWS.DynamoDB;
  constructor() {
    this.ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
  }

  putItem = (obj: DynamoDB.Types.PutItemInput) => {
    console.log('[PutItem]', pretty(obj));
    return this.ddb.putItem(obj).promise();
  };

  updateItem = (obj: DynamoDB.Types.UpdateItemInput) => {
    console.log('[UpdateItem]', pretty(obj));
    return this.ddb.updateItem(obj).promise();
  };

  getItem = (obj: DynamoDB.Types.GetItemInput) => {
    console.log('[GetItem]', pretty(obj));
    return this.ddb.getItem(obj).promise();
  };

  query = (obj: DynamoDB.Types.QueryInput) => {
    console.log('[Query]', pretty(obj));
    return this.ddb.query(obj).promise();
  };

  batchGetItem = (obj: DynamoDB.Types.BatchGetItemInput) => {
    console.log('[batchGetItem]', obj);
    return this.ddb.batchGetItem(obj).promise();
  };
}

const instance = new AwsDynamoDB();

export default instance;
