import CustomSqsClient from '../utils/sqs';
import * as config from '../env.json';

export const putItemAsyncHandler = async (body: string | null) => {
  let response: ApiResponse = {
    statusCode: 500,
    body: JSON.stringify({ Error: 'empty response' }),
  };

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

  const client = new CustomSqsClient(config.putItemAsyncFunction.ITEM_QUEUE);
  //const result = await client.send(airlineCarrier);

  client
    .send(airlineCarrier)
    .then((res) => {
      response = {
        statusCode: 201,
        body: JSON.stringify({ Message: res }),
      };
      return response;
    })
    .catch((error) => {
      response = {
        statusCode: 500,
        body: JSON.stringify({ Error: error.message }),
      };
      return response;
    });

  return response;
};

/*function putItemAsyncHandler(body: string | null): ApiResponse | PromiseLike<ApiResponse> {
  throw new Error('Function not implemented.');
}*/
