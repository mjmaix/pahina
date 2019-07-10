exports.handler = (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  console.log(
    'Custom post confirmation event',
    JSON.stringify(event, undefined, 2),
  );
  console.log(
    'Custom post confirmation context',
    JSON.stringify(context, undefined, 2),
  );
  callback(null, event);
};
