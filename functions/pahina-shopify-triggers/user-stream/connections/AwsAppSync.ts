import AWS from 'aws-sdk';
import axios from 'axios';
import URL from 'url';

AWS.config.update({
  region: process.env.REGION,
});

const GRAPHQL_ENDPOINT =
  'https://o22pt5q7irgezd3mrmkynlg4ai.appsync-api.ap-southeast-1.amazonaws.com/graphql';

const listPahinaCases = `query ListPahinaCases(
    $filter: ModelPahinaCaseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPahinaCases(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        code
        date
        link
        createdAt
        updatedAt
        notes {
          nextToken
        }
      }
      nextToken
    }
  }
  `;

const uri = URL.parse(GRAPHQL_ENDPOINT);

const invokeAppSync = async () => {
  // @ts-ignore
  let req = new AWS.HttpRequest(uri.href || '', process.env.REGION || '');
  req.method = 'POST';
  req.headers.host = uri.host;
  req.headers['Content-Type'] = 'application/json';
  req.method = 'POST';

  req.body = JSON.stringify({
    query: listPahinaCases,
    variables: {
      input: {},
    },
  });

  // @ts-ignore
  let signer = new AWS.Signers.V4(req, 'appsync', true);
  // @ts-ignore
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
  const result = await axios({
    method: 'post',
    url: GRAPHQL_ENDPOINT,
    data: req.body,
    headers: req.headers,
  });
  return result;
};

class AwsAppSync {
  test = async () => {
    const result = await invokeAppSync();
    console.log('APPSYNC result', result);
  };
}

const instance = new AwsAppSync();

export default instance;
