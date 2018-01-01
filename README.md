entire-life-questions
=====================

App for editing the questions available on Entire.Life.

Created with [create-react-app](https://github.com/facebookincubator/create-react-app).


Running it Locally
==================

Install `node`, `npm` and `yarn`. Then run `yarn install` in this project directory. Then `yarn start` to run the app.


Deploying
=========

Run `yarn deploy`. You will need a file at `~/.aws/credentials` that looks
something like this:

    [questions-deployer]
    aws_access_key_id=secrets
    aws_secret_access_key=moar-secrets
    region=us-east-1

And you will have to have the keys mentioned there. Contact me and
I'll set some up for you and find a secure way to get them to you.
