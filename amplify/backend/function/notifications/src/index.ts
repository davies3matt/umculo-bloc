/* Amplify Params - DO NOT EDIT
	API_HOUSEBOARD_GRAPHQLAPIENDPOINTOUTPUT
	API_HOUSEBOARD_GRAPHQLAPIIDOUTPUT
	API_HOUSEBOARD_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
import { DynamoDB } from "aws-sdk"
import { itemAdded } from "./handlers"
const { unmarshall } = DynamoDB.Converter
exports.handler = (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  event.Records.forEach((record) => {
    const unmarshalledRecord = unmarshall(record)
    console.log("DynamoDB Record: %j", unmarshalledRecord)
    const eventType = `${record.eventName} - ${unmarshalledRecord.__typename}`
    switch (eventType) {
      case "INSERT - ITEM": {
        itemAdded(unmarshalledRecord)
        break
      }
      default: {
        console.log(`No handler for ${eventType}`)
        break
      }
    }
  })
  return Promise.resolve("Successfully processed DynamoDB record")
}
