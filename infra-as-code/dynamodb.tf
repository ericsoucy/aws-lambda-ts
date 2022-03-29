resource "aws_dynamodb_table" "ddbtable" {
  name             = "test-ts-lambda-table"
  hash_key         = "id"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  attribute {
    name = "id"
    type = "S"
  }
}