[![Serverless Fullstack Application Express React DynamoDB AWS Lambda AWS HTTP API](https://s3.amazonaws.com/assets.github.serverless/components/readme-serverless-framework-fullstack-application.png
)](https://www.serverless-fullstack-app.com)

A complete, serverless, full-stack application built on AWS Lambda, AWS HTTP API, Express.js, React and DynamoDB.

#### Live Demo: [https://www.serverless-fullstack-app.com](https://www.serverless-fullstack-app.com)

## Quick Start

Install the latest version of the Serverless Framework:


```
npm i -g serverless
```

Then, initialize the `fullstack-app` template:

```
serverless init fullstack-app
cd fullstack-app
```

Then, add your AWS credentials in the `.env` file in the root directory, like this:

```text
AWS_ACCESS_KEY_ID=JAFJ89109JASFKLJASF
AWS_SECRET_ACCESS_KEY=AJ91J9A0SFA0S9FSKAFLASJFLJ

# This signs you JWT tokens used for auth.  Enter a random string in here that's ~40 characters in length.
tokenSecret=yourSecretKey

# Only add this if you want a custom domain.  Purchase it on AWS Route53 in your target AWS account first.
domain=serverless-fullstack-app.com
```

In the root folder of the project, run `serverless deploy`

Lastly, you will need to add your API domain manually to your React application in `./site/src/config.js`, so that you interact with your serverless Express.js back-end.  You can find the your API url by going into `./api` and running `serverless info` and copying the `url:` value.  It should look something like this `https://9jfalnal19.execute-api.us-east-1.amazonaws.com` or it will look like the custom domain you have set.

**Note:**  Upon the first deployment of your website, it will take a 2-3 minutes for the Cloudfront (CDN) URL to work.  Until then, you can access it via the `bucketUrl`.

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

## Guides

### How To Debug CORS Errors

If you are running into CORS errors, see our guide on debugging them [within the Express Component's repo](https://github.com/serverless-components/express/blob/master/README.md#how-to-debug-cors-errors)
