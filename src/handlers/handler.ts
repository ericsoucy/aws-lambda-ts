import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Create clients and set shared const values outside of the handler.
import { getAllItemsHandler } from './get-all-items';
import { putItemHandler } from './put-item';

export const LambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  var response: ApiResponse;

  console.info('received:', event);
  switch (event.httpMethod) {
    case 'GET':
      response = await getAllItemsHandler();
      break;
    case 'POST':
      response = await putItemHandler(event.body);
      break;
    default:
      response = {
        statusCode: 405,
        body: JSON.stringify({ error: 'method not allowed' }),
      };
      break;
  }

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
