# Umluco Bloc

> Empowering the African Music Scene

## Getting Started

After cloning the repo, to setup your own amplify environment for development, in your terminal of choice do the following:

### Install Amplify Client

```
npm install -g @aws-amplify/cli
```

### Enter Project Directory

```
cd packages/next-app
```

### Initialise Amplify

Using:

- Your AWS Credentials

```
amplify init

# Do you want to use an existing env? /yes
# dev

# Select your editor
# Probs VS code

# Select the auth method you want to use
# You probs want to use AWS Access Keys

# Enter in your keys 🐕

# Region
# `eu-west-1`
```

### Generate The Good Stuff

```
amplify codegen
```

### Starting Local Frontend Development

```
yarn dev
```
