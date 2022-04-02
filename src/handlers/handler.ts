import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Create clients and set shared const values outside of the handler.
import { getAllItemsHandler } from './get-all-items';
import { putItemHandler } from './put-item';
import { putItemAsyncHandler } from './put-async-item';
import { getItemHandler } from './get-by-ids';

export const LambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  var response: ApiResponse;

  console.info('received:', event);
  switch (event.httpMethod) {
    case 'GET':
      // Get id from pathParameters from APIGateway because of `/{id}`
      if (event.pathParameters?.proxy != null) {
        response = await getItemHandler(event.pathParameters.proxy);
        break;
      } else {
        response = await getAllItemsHandler();
        break;
      }
    case 'POST':
      if (event.queryStringParameters != null) {
        if (event.queryStringParameters['asyncpost'] === '1') {
          response = await putItemAsyncHandler(event.body);
          break;
        }
      } else {
        response = await putItemHandler(event.body);
        break;
      }

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
