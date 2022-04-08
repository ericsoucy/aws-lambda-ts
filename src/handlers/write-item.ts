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
    console.info('recordbody:', record.body);
    const body = JSON.parse(record.body);
    console.info('parsed body:', body);
    const item = {
      airlineCode: body.airlineCode,
      airlineDisplayName: body.airlineDisplayName,
    };
    const client = new CustomDynamoClient(
      config.getAllItemsFunction.SAMPLE_TABLE
    );
    console.info('item ', item);
    try {
      await client.write(item);
    } catch (err) {
      console.error(err);
    }

    console.info('Written to DynamoDB:', item);
  }
};
