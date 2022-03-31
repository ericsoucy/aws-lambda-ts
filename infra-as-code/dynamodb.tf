resource "aws_dynamodb_table" "ddbtable" {
  name             = "AirlineCarriers"
  hash_key         = "airlineCode"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  attribute {
    name = "airlineCode"
    type = "S"
  }
}