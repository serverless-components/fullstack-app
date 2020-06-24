[![Serverless Fullstack Application Express React DynamoDB AWS Lambda AWS HTTP API](https://s3.amazonaws.com/assets.github.serverless/components/readme-serverless-framework-fullstack-application.png
)](https://www.serverless-fullstack-app.com)

A complete, serverless, full-stack application built on AWS Lambda, AWS HTTP API, Express.js, React and DynamoDB.

#### Live Demo: [https://www.serverless-fullstack-app.com](https://www.serverless-fullstack-app.com)

## Quick Start

Clone this repo.

Run `npm i` in all subdirectories that contain `package.json`

Add your AWS credentials in `.env` file in the root directory, like this:

```text
AWS_ACCESS_KEY_ID=JAFJ89109JASFKLJASF
AWS_SECRET_ACCESS_KEY=AJ91J9A0SFA0S9FSKAFLASJFLJ

tokenSecret=yourSecretKey

# Only add this if you want a custom domain.  Purchase it on AWS Route53 in your target AWS account first.
domain=serverless-fullstack-app.com
```

In the root folder of the project, run `serverless deploy --all`

Lastly, you will need to update the URL in the `site` so that you interact with the correct API endpoint.  Take the `/api` `url` and put it in the site React app [here](./site/src/index.js).

Note:  Upon the first deployment of your website, it will take a 2-3 minutes for the Cloudfront (CDN) URL to work.  Until then, you can access it via the `bucketUrl`.




After initial deployment, we recommend deploying only the parts you are changing, not the entire thing together (why risk deploying your database with a code change?).  To do this, `cd` into a part of the application and run `serverless deploy`.

When working on the `./api` we highly recommend using `serverless dev`.  This command watches your code, auto-deploys it, and streams `console.log()` statements and errors directly to your CLI in real-time!

If you want to add custom domains to your landing pages and API, either hardcode them in your `serverless.yml` or reference them as environment variables in `serverless.yml`, like this:

```yaml
inputs:
  domain: ${env:domain}
```

```text
domain=serverless-fullstack-app.com
```

Support for stages is built in. 

You can deploy everything or individual components to different stages via the `--stage` flag, like this:
 
`serverless deploy --stage prod`
`serverless deploy --all --stage prod`

Or, you can hardcode the stage in `serverless.yml` (not recommended):

```yaml
app: fullstack
component: express@0.0.20
name: fullstack-api
stage: prod # Put the stage in here
```

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

inputs:
  domain: api.${env:domain}
```

And deploy!

`serverless deploy --stage prod`

Enjoy!  This is a work in progress and we will continue to add funcitonality to this.

## Other Resources

For more details on each part of this fullstack application, check out these resources:

* [Serverless Components](https://github.com/serverless/components)
* [Serverless Express](https://github.com/serverless-components/express)
* [Serverless Website](https://github.com/serverless-components/website)
* [Serverless AWS DynamoDB](https://github.com/serverless-components/aws-dynamodb)
* [Serverless AWS IAM Role](https://github.com/serverless-components/aws-iam-role)
