import { create, get } from "../services/ddb"
import { v4 as uuidv4 } from "uuid"
import { LogType } from "../utils/constants"

export const itemAdded = async (record, context) => {
  console.log("ITEM ADDED HANDLER")
  try {
    const addedByUser = await get("User", record.addedById)
    console.log("Added By User", addedByUser)
    const logId = uuidv4()
    return await create("Log", {
      id: logId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: `${record.name} Added by ${
        addedByUser.name ? addedByUser.name : addedByUser.email
      }`,
      type: LogType.ITEM_ADDED,
      groupId: record.groupId,
      itemId: record.id,
      userId: addedByUser.id,
    })
  } catch (err) {
    console.log("ERROR IN ITEM ADDED HANDLER", err)
    context.done(err, null)
  }
}
