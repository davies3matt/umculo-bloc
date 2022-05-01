/* Amplify Params - DO NOT EDIT
	API_HOUSEBOARD_GRAPHQLAPIENDPOINTOUTPUT
	API_HOUSEBOARD_GRAPHQLAPIIDOUTPUT
	API_HOUSEBOARD_GRAPHQLAPIKEYOUTPUT
	API_HOUSEBOARD_GROUPTABLE_ARN
	API_HOUSEBOARD_GROUPTABLE_NAME
	API_HOUSEBOARD_ITEMTABLE_ARN
	API_HOUSEBOARD_ITEMTABLE_NAME
	API_HOUSEBOARD_USERTABLE_ARN
	API_HOUSEBOARD_USERTABLE_NAME
	AUTH_HOUSEBOARD52FF8A69_USERPOOLID
	ENV
	FUNCTION_COGNITOPOSTCONFIRMATION_NAME
	REGION
Amplify Params - DO NOT EDIT */

import { DynamoDB } from "aws-sdk"
const ddb = new DynamoDB({
  apiVersion: "2012-10-08",
  httpOptions: {
    timeout: 65000,
  },
})
const docClient = new DynamoDB.DocumentClient()

const { unmarshall } = DynamoDB.Converter

const tableSuffix = `${process.env.API_HOUSEBOARD_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`

const buildUpdateExpression = (object) => {
  let UpdateExpression = "set"
  let ExpressionAttributeNames = {}
  let ExpressionAttributeValues = {}
  Object.keys(object).forEach((key) => {
    UpdateExpression += ` #${key} = :${key},`
    ExpressionAttributeNames[`#${key}`] = key
    ExpressionAttributeValues[`:${key}`] = object[key]
  })
  // trim off trailing comma
  UpdateExpression = UpdateExpression.replace(/,\s*$/, "")
  return {
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  }
}

const buildFilterExpression = (filter) => {
  let FilterExpression = ""
  let ExpressionAttributeNames = {}
  let ExpressionAttributeValues = {}
  for (const [key, value] of Object.entries(filter)) {
    FilterExpression += ` #${key} = :${key} and`
    ExpressionAttributeNames[`#${key}`] = key
    if (typeof value === "boolean") {
      ExpressionAttributeValues[`:${key}`] = { BOOL: filter[key] }
    } else {
      ExpressionAttributeValues[`:${key}`] = { S: filter[key] }
    }
  }
  // trim off trailing 'and'
  FilterExpression = FilterExpression.replace(/ and\s*$/, "")
  return {
    FilterExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  }
}

export const get = async (table: string, id: string) => {
  const params = {
    TableName: `${table}-${tableSuffix}`,
    Key: {
      id: {
        S: id,
      },
    },
  }
  return ddb
    .getItem(params)
    .promise()
    .then((rec) => unmarshall(rec.Item))
}

export const update = async (table, id, updates) => {
  const {
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  } = buildUpdateExpression(updates)
  const params = {
    TableName: `${table}-${tableSuffix}`,
    Key: {
      id,
    },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: "UPDATED_NEW",
  }
  return docClient
    .update(params)
    .promise()
    .then((rec) => unmarshall(rec.Attributes))
}

export const list = async (table, filter?) => {
  let params = {
    TableName: `${table}-${tableSuffix}`,
  }

  if (filter) {
    const {
      FilterExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    } = buildFilterExpression(filter)
    params = {
      ...params,
      // @ts-ignore
      FilterExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    }
  }
  return ddb
    .scan(params)
    .promise()
    .then((recs) => recs.Items.map((rec) => unmarshall(rec)))
}

export const listUsers = async () => {
  const params = {
    TableName: `User-${tableSuffix}`,
  }
  return ddb
    .scan(params)
    .promise()
    .then((recs) => recs.Items.map((rec) => unmarshall(rec)))
}

export const create = async (table, record) => {
  const params = {
    TableName: `${table}-${tableSuffix}`,
    Item: record,
  }
  return docClient
    .put(params)
    .promise()
    .then((rec) => unmarshall(rec.Attributes))
}

export const remove = async (table, id) => {
  const params = {
    TableName: `${table}-${tableSuffix}`,
    Key: {
      id: id,
    },
  }
  return docClient
    .delete(params)
    .promise()
    .then((res) => res.$response)
}
