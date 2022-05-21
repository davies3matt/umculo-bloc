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
import { itemAdded } from "./handlers/itemAdded"
import { itemUpdated } from "./handlers/itemUpdated"
const { unmarshall } = DynamoDB.Converter
exports.handler = (event, context, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  try {
    event.Records.forEach(async (record) => {
      let oldRecord
      if (record.eventName !== "INSERT") {
        oldRecord = unmarshall(record.dynamodb.OldImage)
      }
      const newRecord = unmarshall(record.dynamodb.NewImage)
      console.log("Old Record", oldRecord)
      console.log("New Record", newRecord)
      const eventType = `${record.eventName} - ${newRecord.__typename}`
      switch (eventType) {
        case "INSERT - Item": {
          await itemAdded(newRecord, context)
          break
        }
        case "MODIFY - Item": {
          await itemUpdated(newRecord, oldRecord, context)
          break
        }
        default: {
          console.log(`No handler for ${eventType}`)
          break
        }
      }
    })
    callback(null, "Ok")
  } catch (err) {
    console.log("ERROR", err)
  }
  return Promise.resolve("Successfully processed DynamoDB record")
}
