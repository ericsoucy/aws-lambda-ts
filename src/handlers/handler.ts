import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as config from '../env.json';

// Create clients and set shared const values outside of the handler.
import CustomDynamoClient from '../utils/dynamodb';
import { getAllItemsHandler } from './get-all-items';

export const LambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  var response: ApiResponse;

  console.info('received:', event);
  switch (event.httpMethod) {
    case 'GET':
      response = await getAllItemsHandler();
    default:
      response = {
        statusCode: 405,
        body: JSON.stringify({ error: 'method not allowed' }),
      };
  }

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
