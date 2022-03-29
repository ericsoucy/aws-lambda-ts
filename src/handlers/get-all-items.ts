import CustomDynamoClient from '../utils/dynamodb';
import * as config from '../env.json';

export const getAllItemsHandler = async () => {
  const client = new CustomDynamoClient(
    config.getAllItemsFunction.SAMPLE_TABLE
  );
  const items = await client.readAll();

  const response: ApiResponse = {
    statusCode: 200,
    body: JSON.stringify(items),
  };
  return response;
};
