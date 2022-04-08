import CustomSqsClient from '../utils/sqs';
import * as config from '../env.json';

export const putItemAsyncHandler = async (body: string | null) => {
  if (body === null) {
    const response: ApiResponse = {
      statusCode: 400,
      body: JSON.stringify({ Error: 'Bad Request' }),
    };
    return response;
  }
  const reqBody = JSON.parse(body);

  const airlineCarrier: AirlineCarriers = {
    airlineCode: reqBody.airlineCode,
    airlineDisplayName: reqBody.airlineDisplayName,
  };
  console.log('airlineCarrier', airlineCarrier);

  const client = new CustomSqsClient(config.putItemAsyncFunction.ITEM_QUEUE);

  return client
    .send(airlineCarrier)
    .then((res) => {
      const response: ApiResponse = {
        statusCode: 201,
        body: JSON.stringify({ Message: res }),
      };
      return response;
    })
    .catch((error) => {
      console.log(error);
      const response: ApiResponse = {
        statusCode: 500,
        body: JSON.stringify({
          mega: 'test',
          type: error.type,
          code: error.code,
          message: error.message,
          detail: error.detail,
        }),
      };
      return response;
    });
};
