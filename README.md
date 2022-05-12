# House-Board-App

> This app is intended to help people live together

# Overview

This document covers frontend and backend infastructure and technologies used and provides a guide for setting up a local development.

# Frontend

The frontend is built using the [Expo](https://docs.expo.dev/) framework, which is a framework for building [React Native](https://reactnative.dev/docs/getting-started) apps that provides tools and services for simplifying developments and testing. It is written in Typescript, which is a superset of JavaScript that adds tons of stability by making use of _Typing_

# Backend

Our core functionality runs on AWS Lambda and is written in [Typescript](https://www.typescriptlang.org/docs/) which gets compiled to vanilla JavaScript. Our resource orchestration tool of choice is [AWS Amplify](https://docs.amplify.aws/start/q/integration/react/) - this allows us to easily define and integrate cloud services on AWS

## Services

### Cognito

> Cognito handles the user authorization for our application and APIs.

A new Cognito Identity is created when a user signs up and is stored in a User Pool, which is environment specific. These User Pools are stored seprately from the database. We make use of the user identity to create a relation between the User Pool & Database.

Cognito also allows us to provide users with temporary credentials for accessing our APIs.

### DynamoDB

> Amplify kind of ignores everything that is cool about DynamoDB. But it's still super fast and reliable

A table is created for each Data Model in each environment. These tables have relational fields that allow us to draw them together in modular GraphQL functions by making use of our AppSync API

### Lambda

> Lambdas are serverless, event driven, functions hosted on AWS that excecute
> code

These functions, primarily, are written in TypeSript and are compiled into vanilla JavaScript before being deployed.

You can use the following custom script to compile all TypeScript files found within the `customFunction` Lambda function

```
$ yarn amplify:tsc
```

We have a total of 2 Lambda functions

#### `cognitoPostConfirmation`

Creates a User record in DynamoDB when a user succesfully verifies their account

#### `customFunction`

This lambda contains resolver, helper functions, for the custom Queries & Mutations defined in the Schema

### AppSync

> AppSync allows us to create robust, scalable GraphQL interfaces to combine data from DynamoDB, Lambda and HTTP APIs

# Getting Started

## Prerequisites

> Some installation commands can be found below this list

- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [NodeJS v14+](https://nodejs.org/en/download/)
- [AWS Amplify CLI](https://github.com/aws-amplify/amplify-cli)
- [Expo](https://docs.expo.dev/get-started/installation/)

#### Installing Expo

```
$ npm install --global expo-cli
```

#### Installing AWS Amplify CLI

```
$ npm install -g @aws-amplify/cli
```

### 1. - Cloning Repository

```
$ git clone https://github.com/davies3matt/house-board-app.git
```

### 2. - Setting Up Amplify

> Using your AWS access key & secret access key

```
$ amplify init
```

- Select `eu-west-1` Region
- Select the `dev` Environment

### 3. - Downloading Dependencies

```
$ yarn
```

### 4. - Generating GraphQL Files, Types & Functions

Generate a graphql model, queries, mutations & subscriptions based on our backend schema

```
$ amplify codegen
```

Run a script that creates functions, types and components based on our graphql files

```
$ yarn generate
```

### 5. - Starting Local Deployment

```
$ yarn start
```

> let's gooo 🇵🇰
