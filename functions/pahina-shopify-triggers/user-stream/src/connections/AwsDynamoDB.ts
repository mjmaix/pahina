import AWS, { DynamoDB } from 'aws-sdk';

AWS.config.update({ region: 'REGION' });

class AwsDynamoDB {
  ddb: AWS.DynamoDB;
  constructor() {
    this.ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
  }

  putItem = (obj: DynamoDB.Types.PutItemInput) => {
    return new Promise((resolve, reject) => {
      this.ddb.putItem(obj, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}

const instance = new AwsDynamoDB();

export default instance;
