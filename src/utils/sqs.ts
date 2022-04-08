import SQS from 'aws-sdk/clients/sqs';

// Declare some custom client just to illustrate how TS will include only used files into lambda distribution
export default class CustomSqsClient {
  queue: string;
  sqs: SQS;

  //constructor(queue = process.env.ITEM_QUEUE) {
  constructor(queue: string) {
    this.sqs = new SQS({
      region: 'ca-central-1',
      endpoint: 'http://localhost:4566',
    });
    this.queue = queue;
  }

  async send(body: object) {
    console.log('send body', body);
    const params = {
      MessageBody: JSON.stringify(body),
      QueueUrl: this.queue,
      DelaySeconds: 0,
    };
    console.log('params', params);
    try {
      return await this.sqs.sendMessage(params).promise();
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }
}
