import 'source-map-support/register';
import { SQSEvent } from 'aws-lambda';
import * as config from '../env.json';

// Create clients and set shared const values outside of the handler.
import CustomDynamoClient from '../utils/dynamodb';

/**
 * A simple example includes a SQS queue listener to untie HTTP POST API from “heavy” write to DB.
 */
export const writeItemHandler = async (event: SQSEvent) => {
  console.info('Received from SQS:', event);

  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    const item = {
      airlinecode: body.airlinecode,
      airlinedisplayname: body.airlinedisplayname,
    };
    const client = new CustomDynamoClient(
      config.getAllItemsFunction.SAMPLE_TABLE
    );

    await client.write(item);

    console.info('Written to DynamoDB:', item);
  }
};
