# House-Board-App
>This app is intended to help people live together 

# Overview
This document covers frontend and backend infastructure and technologies used and provides a guide for setting up a local development.

# Frontend
The frontend is built using the [Expo](https://docs.expo.dev/) framework, which is a framework for building [React Native](https://reactnative.dev/docs/getting-started) apps that provides tools and services for simplifying developments and testing. It is written in Typescript, which is a superset of JavaScript that adds tons of stability by making use of *Typing*

# Backend
Our core functionality runs on AWS Lambda and is written in [Typescript](https://www.typescriptlang.org/docs/) which gets compiled to vanilla JavaScript. Our resource orchestration tool of choice is [AWS Amplify](https://docs.amplify.aws/start/q/integration/react/) - this allows us to easily define and integrate cloud services on AWS

# Getting Started

## Prerequisites
> Some installation commands can be found below this list
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [NodeJS v14+](https://nodejs.org/en/download/)
- [AWS Amplify CLI](https://github.com/aws-amplify/amplify-cli)
- [Expo](https://docs.expo.dev/get-started/installation/)

#### Installing Expo

`$ npm install --global expo-cli`

#### Installing AWS Amplify CLI

`$ npm install -g @aws-amplify/cli`

### 1. - Cloning Repository

`$ git clone https://github.com/davies3matt/house-board-app.git`

### 2. - Setting Up Amplify

> Using your AWS access key & secret access key

`$ amplify init`
- Select `eu-west-1` Region
- Select the `dev` Environment

### 3. - Downloading Dependencies

`$ yarn`

### 4. - Generating GraphQL Files, Types & Functions

`$ amplify codegen`
> This will generate a graphql model, queries, mutations & subscriptions based on our backend schema

`$ yarn generate`
> This will run a script that creates functions, types and components based on our graphql files

### 5. - Starting Local Deployment 

`$ yarn start`


