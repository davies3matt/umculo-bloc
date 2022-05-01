/* Amplify Params - DO NOT EDIT
	API_HOUSEBOARD_GRAPHQLAPIENDPOINTOUTPUT
	API_HOUSEBOARD_GRAPHQLAPIIDOUTPUT
	API_HOUSEBOARD_GRAPHQLAPIKEYOUTPUT
	AUTH_HOUSEBOARD52FF8A69_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const aws = require("aws-sdk")
const docClient = new aws.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" })
const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
})
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  if (
    event.triggerSource === "PostConfirmation_ConfirmForgotPassword" ||
    event.triggerSource === "CustomMessage_AdminCreateUser"
  ) {
    // this is just a password reset or user nomination
    callback(null, event)
    return
  }
  const environment = process.env.ENV
  const GraphQLAPIIdOutput = process.env.API_HOUSEBOARD_GRAPHQLAPIIDOUTPUT
  try {
    // attatch cognito group to cognito user
    const addUserParams = {
      GroupName: "User",
      UserPoolId: event.userPoolId,
      Username: event.userName,
    }
    await cognitoidentityserviceprovider
      .adminAddUserToGroup(addUserParams)
      .promise()
    // create user object and put record in DynamoDB
    const userParams = {
      TableName: `User-${GraphQLAPIIdOutput}-${environment}`,
      Item: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        typename: "USER",
        id: event.request.userAttributes.sub,
        email: event.request.userAttributes.email,
        phoneNumber: event.request.userAttributes.phone_number,
      },
    }
    await docClient.put(userParams).promise()
    console.log("Successfully added User DynamoDB record")
    callback(null, event)
  } catch (err) {
    console.log("ERROR", err)
  }
}
