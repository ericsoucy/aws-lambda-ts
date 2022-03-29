variable "ZIP_PATH" {
  type    = string
  default = "../dist/main.zip"
}

resource "aws_iam_role" "lambda-execution-role" {
  name = "lambda-execution-role"

  assume_role_policy = file("assume_role_policy.json")
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_policy"
  role = aws_iam_role.lambda-execution-role.id

  policy = file("policy.json")
}

resource "aws_lambda_function" "golambdafunction" {
  filename      = var.ZIP_PATH
  function_name = "go-serverless-api"
  role          = aws_iam_role.lambda-execution-role.arn
  handler       = "main"
  runtime       = "go1.x"
  #timeout       = 30
  #source_code_hash = filebase64sha256(var.JAR_PATH)
  #memory_size = 1024

}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.golambdafunction.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.go_serverless_api.execution_arn}/*/*"
}

