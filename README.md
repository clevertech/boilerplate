# Create Boilerplate app script

This script clones the default branch of the repo, asks the user a few questions and then modifies the files among other things, to accomodate the code to the user preferences. The questions include:

* Project name
* Database engine
* Git remote URL where the new project will live

The script also initializes a new git repository and creates random passwords and secrets for the database and secure cookie seed.

## Usage

End users use this script like this:

`npx github:clevertech/boilerplate#create-boilerplate-app my-new-app`

Where `my-new-app` is the name of the directory where your new project will be stored.

## Modifying the script

* Clone the repo and checkout the `create-boilerplate-app` branch.
* Run `yarn` to install its dependencies.
* To run the script use `node index.js test-dir`

From now on you can improve the script by changing its source code.
