const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context, callback) => {
  console.error(event['body-json'])
  let exercise = event['body-json']

  var params = {
    TableName : 'exercises',
    Key: {
      id: exercise.id
    }
  };
  
  // documentClient.delete(params, function(err, data) {
  //   if (err) console.log(err);
  //   else console.log(data);
  // });

  try {
    data = await docClient.delete(params).promise()
    console.log('status: 200')
  } catch (error) {
    console.log('Status code : 400, Error code : ', error.stack)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(exercise),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  }
}
