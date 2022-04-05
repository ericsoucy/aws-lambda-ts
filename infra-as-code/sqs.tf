resource "aws_sqs_queue" "example_queue" {
    name = "test-ts-sqs"
}

resource "aws_lambda_event_source_mapping" "example" {
  event_source_arn = aws_sqs_queue.example_queue.arn
  function_name    = aws_lambda_function.sqslambdafunction.arn
  batch_size = 1
}