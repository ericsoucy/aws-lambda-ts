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
  // airlineCarrier.airlineCode = event['code'];
  //airlineCarrier.airlineDisplayName = event['name'];

  //await mapper.put(airlineCarrier);
  //await client.write(airlineCarrier);

  try {
    const data = await client.write(airlineCarrier);
    response = {
      statusCode: 201,
      body: JSON.stringify(data),
    };
  } catch (err) {
    response = {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
  return response;
  //   client
  //     .write(airlineCarrier)
  //     .then(function (data) {
  //       const response: ApiResponse = {
  //         statusCode: 201,
  //         body: JSON.stringify(data),
  //       };
  //       return response;
  //     })
  //     .catch(function (err) {
  //       const response: ApiResponse = {
  //         statusCode: 500,
  //         body: JSON.stringify(err),
  //       };
  //       return response;
  //     });
};
