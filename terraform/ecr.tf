# ECR Docker repository is common to all enviroments (prefixes)
# Creating it only on development

resource "aws_ecr_repository" "api" {
  count = "${var.prefix == "development" ? 1 : 0}"
  name = "boilerplate-api"
}

resource "aws_ecr_repository" "frontend" {
  count = "${var.prefix == "development" ? 1 : 0}"
  name = "boilerplate-frontend"
}

