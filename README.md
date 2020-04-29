# Serverless Fullstack App

A complete, serverless, full-stack application built on AWS Lambda, AWS HTTP API, Express.js, React and DynamoDB.

## Quick Start

Run `npm i` in all subdirectories that contain `package.json`

Add your AWS credentials in `.env` file in the root directory, like this:

```text
AWS_ACCESS_KEY_ID=JAFJ89109JASFKLJASF
AWS_SECRET_ACCESS_KEY=AJ91J9A0SFA0S9FSKAFLASJFLJ
```

In the root folder, run `serverless deploy --all`

After initial deployment, we recommend deploying only the parts you are changing, not the entire thing together (why risk deploying your database with a code change?).  To do this, `cd` into a part of the application and run `serverless deploy`.

When working on the `./api` we highly recommend using `serverless dev`

If you want to add custom domains to your landing pages and API, either hardcode them in your `serverless.yml` or reference environment variables in `serverless.yml`, like this:

```yaml
inputs:
  domain: ${env:domain_api}
```

```text
domain_api=marketing-api.com
domain_site_knative=landing-page.com
```

Support for stages is built in.  Simply switch the stage in `serverless.yml` like this:

```yaml
app: fullstack
component: express@0.0.20
name: fullstack-api
stage: prod # Put the stage in here
```

You can also use `serverless deploy --stage`

Lastly, you can add separate environment variables for each stage using `.env` files with the stage name in them:

```bash
.env # Any stage
.env.dev # "dev" stage only
.env.prod # "prod" stage only
```

Then simply reference those environment variables using Serverless Variables in your YAML:

```yaml
app: fullstack
component: express@0.0.20
name: fullstack-api
stage: prod # Put the stage in here

inputs:
  domain: ${env:domain_api}
```



Enjoy!