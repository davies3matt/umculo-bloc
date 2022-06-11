const AWS = require("aws-sdk")
const moment = require("moment")
const uuid = require("uuid")

const ddb = new AWS.DynamoDB({
  apiVersion: "2012-10-08",
  httpOptions: {
    timeout: 65000,
  },
  region: "eu-west-1",
})
const docClient = new AWS.DynamoDB.DocumentClient({
  region: "eu-west-1",
})

const { unmarshall } = AWS.DynamoDB.Converter

const tableName = "User-iitctdooqjcvzhq3fjrpzhpm2y-prod"

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

const create = async (table, record) => {
  const params = {
    TableName: `${table}`,
    Item: record,
  }
  return docClient
    .put(params)
    .promise()
    .then((rec) => unmarshall(rec.Attributes))
}

let records = []

const buildUpdateExpression = (object) => {
  let UpdateExpression = "set"
  let ExpressionAttributeNames = {}
  let ExpressionAttributeValues = {}
  Object.keys(object).map((key) => {
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

const recursiveList = async (filter) => {
  const allItems = []
  let params = {
    TableName: `${tableName}`,
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
  const runScan = async (ExclusiveStartKey) => {
    if (ExclusiveStartKey) {
      params = {
        ...params,
        ExclusiveStartKey,
      }
    }
    return ddb
      .scan(params)
      .promise()
      .then((data) => {
        console.log(data)
        allItems.push(...data.Items)
        if (data.LastEvaluatedKey === undefined) {
          return allItems.map((rec) => unmarshall(rec))
        }
        return runScan(data.LastEvaluatedKey)
      })
      .catch((error) => {
        console.log("error", error)
        throw new Error("Error recursively fetching records")
      })
  }

  return runScan()
}

const update = async (id, updates) => {
  const {
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  } = buildUpdateExpression(updates)
  const params = {
    TableName: `${tableName}`,
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

create("Artist-o6e5pw7lxzdxvk47mfvfq33soa-dev", {
  id: uuid.v4(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name: "The Oh Sees",
  image:
    "https://media.pitchfork.com/photos/5c92bae8f3672356b4df6e72/4:3/w_524,h_393,c_limit/Oh%20Sees-GettyImages-688811658.jpg",
})
  .then((res) => console.log(res))
  .catch((err) => console.log("ERROR ------", err))
