import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as config from '../env.json';

// Create clients and set shared const values outside of the handler.
import CustomDynamoClient from '../utils/dynamodb';

export const LambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  var response: ApiResponse;
  // All log statements are written to CloudWatch
  console.info('received:', event);
  switch (event.httpMethod) {
    case 'GET':

    default:
      response = {
        statusCode: 405,
        body: JSON.stringify({ error: 'method not allowed' }),
      };
  }

  /*
  const client = new CustomDynamoClient(
    config.getAllItemsFunction.SAMPLE_TABLE
  );
  const items = await client.readAll();

  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
  };
*/
  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
