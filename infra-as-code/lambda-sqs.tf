variable "ZIP_PATH2" {
  type    = string
  default = "../dist/function.zip"
}

resource "aws_lambda_function" "sqslambdafunction" {
  filename      = var.ZIP_PATH2
  function_name = "sqs-lambda-function"
  role          = aws_iam_role.lambda-execution-role.arn
  handler       = "handlers/write-item.writeItemHandler"
  runtime       = "nodejs14.x"
  timeout       = 25
  source_code_hash = filebase64sha256(var.ZIP_PATH)
  #memory_size = 1024

}

