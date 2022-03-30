# Type script lamdba

<https://levelup.gitconnected.com/how-to-use-typescript-for-aws-lambda-in-3-steps-1996243547eb>

```json
{
    "compilerOptions": {
      "module": "CommonJS",
      "target": "ES2017",
      "noImplicitAny": true,
      "preserveConstEnums": true,
      "outDir": "./built",
      "sourceMap": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "**/*.spec.ts"]
  }
```

<https://evilmartians.com/chronicles/serverless-typescript-a-complete-setup-for-aws-sam-lambda>

## Running localstack

```bash
// run localstack
podman run --rm -it -p 4566:4566 -p 4571:4571 localstack/localstack

// to use network host
podman run --rm -it -p 4566:4566 -p 4571:4571 --network host localstack/localstack

// to make this run lambda that calls dynamodb
podman run --rm -it -p 4566:4566 -p 4571:4571 localstack/localstack -e DEFAULT_REGION=ca-central-1 -e AWS_DEFAULT_REGION=ca-central-1 -e AWS_SECRET_ACCESS_KEY = "test" -e AWS_ACCESS_KEY_ID = "test"

//check
curl http://localhost:4566/health | jq
```

## packaging

<https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html>

zip -r function.zip .

or

```bash
npm install
npm run build
cp -r dist "$(ARTIFACTS_DIR)/"
```

## Terraform with local stack

<https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/custom-service-endpoints#localstack>

<https://docs.localstack.cloud/integrations/terraform/>

<https://dev.to/mrwormhole/localstack-with-terraform-and-docker-for-running-aws-locally-3a6d>

```bash
cd infra-as-code
terraform init
terraform validate
terraform plan
terraform apply -auto-approve
