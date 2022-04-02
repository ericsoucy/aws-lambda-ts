// Create a DocumentClient that represents the query to add an item
import DynamoDB from 'aws-sdk/clients/dynamodb';
import AWS from 'aws-sdk/';

// Declare some custom client just to illustrate how TS will include only used files into lambda distribution
export default class CustomDynamoClient {
  table: string;
  client: DynamoDB.DocumentClient;
  dynamodbservice!: AWS.DynamoDB;

  //constructor(table = process.env.SAMPLE_TABLE) {
  constructor(table: string) {
    this.dynamodbservice = new AWS.DynamoDB({
      region: 'ca-central-1',
      endpoint: 'http://localhost:4566',
    });

    this.client = this.client = new DynamoDB.DocumentClient(
      this.dynamodbservice
    );
    this.table = table;
  }

  async readAll() {
    const data = await this.client.scan({ TableName: this.table }).promise();
    return data.Items;
  }

  async read(value: any) {
    var params = {
      TableName: this.table, //Key: { airlineCode: 'yyz' }, works
      Key: { airlineCode: value },
    };
    const data = await this.client.get(params).promise();
    return data.Item;
  }

  async write(Item: object) {
    const params = {
      TableName: this.table,
      Item,
    };

    return await this.client.put(params).promise();
  }
}
