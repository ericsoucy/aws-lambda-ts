import CustomSqsClient from '../utils/sqs';
import * as config from '../env.json';

export const putItemAsyncHandler = async (body: string | null) => {
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

  const client = new CustomSqsClient(config.putItemAsyncFunction.ITEM_QUEUE);
  const result = await client.send(airlineCarrier);

  response = {
    statusCode: 201,
    body: JSON.stringify({ MessageId: result.MessageId }),
  };
  return response;
};

/*function putItemAsyncHandler(body: string | null): ApiResponse | PromiseLike<ApiResponse> {
  throw new Error('Function not implemented.');
}*/
