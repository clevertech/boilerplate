variable "appname" {
  default = "boilerplate"
}
variable "region" {
  default = "us-east-1"
}
variable "profile" {
  default = ""
}
variable "prefix" {}

provider "aws" {
  profile    = "${var.profile}"
  region     = "${var.region}"
}

terraform {
  backend "s3" {
  }
}
