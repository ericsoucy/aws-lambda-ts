import CustomDynamoClient from '../utils/dynamodb';
import * as config from '../env.json';

export const putItemHandler = async (body: string | null) => {
  const client = new CustomDynamoClient(
    config.getAllItemsFunction.SAMPLE_TABLE
  );
  let response: ApiResponse;

  if (body === null) {
    response = {
      statusCode: 400,
      body: JSON.stringify({ Error: 'Bad Request' }),
    };
    return response;
  }
  const reqBody = JSON.parse(body);
  const airlineCarrier: AirlineCarriers = {
    airlineCode: reqBody.airlinecode,
    airlineDisplayName: reqBody.airlinedisplayname,
  };

  try {
    const data = await client.write(airlineCarrier);
    response = {
      statusCode: 201,
      body: JSON.stringify(reqBody),
    };
  } catch (err) {
    response = {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
  return response;
};
