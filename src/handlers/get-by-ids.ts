import CustomDynamoClient from '../utils/dynamodb';
import * as config from '../env.json';

export const getItemHandler = async (id: string) => {
  const client = new CustomDynamoClient(
    config.getAllItemsFunction.SAMPLE_TABLE
  );
  let response: ApiResponse;
  if (id.length < 1) {
    response = {
      statusCode: 400,
      body: JSON.stringify({ Error: 'Bad Request' }),
    };
    return response;
  }

  const item = await client.read(id);

  if (item === null || item === undefined) {
    response = {
      statusCode: 404,
      body: JSON.stringify({ Error: `'${id} Not found'` }),
    };
    return response;
  }

  response = {
    statusCode: 200,
    body: JSON.stringify(item),
  };
  return response;
};
