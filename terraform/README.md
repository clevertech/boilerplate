This directory provides basic Terraform configuration for the Boilerplate. The Terraform script must be executed prior to the deploy on Kubernetes. Most of the files are commented: they are meant to provide examples for common configurations.

Terraform state for each environment/prefix is stored in the S3 bucket using [Terraform S3 data source](https://www.terraform.io/docs/state/remote/s3.html). Remote state currently does not lock regions of your infrastructure to allow parallel modification using Terraform. Therefore, you must still collaborate with teammates to safely run Terraform. Keep in mind that Terraform state contains sensitive information.

To start working in a given environment you need to prepare the config file and to init the S3 backend (state storage).

## Prepare the configuration file

Configuration is done using a `terraform.tfvars` file. _Do not commit_ it to the repository.

### Development

```
prefix = "development"
```

## Sync to the state on S3

State storage is configured on files `terraform.backend.[development|staging|production]`.

The following commands expect that you have configure an AWS cli profile named as specfied in the backend configuration with admin access to the target AWS account.

* For DEV: execute `rm .terraform/*; terraform init -backend-config=terraform.backend.development`
* For STAG: execute `rm .terraform/*; terraform init -backend-config=terraform.backend.staging`
* For PROD, execute `rm .terraform/*; terraform init -backend-config=terraform.backend.production`

## Use Terraform

* Dry-run with `terraform plan`
* (Danger) Apply with `terraform apply`

## Setup a new project

* Change the "key" value in the `terraform.backend.*` files to match the new project name.
* If the state for a new project or environment is stored on a different bucket, you need to change bucket, region and profile too.
* Create a proper `terraform.tfvars`
* Init the state
