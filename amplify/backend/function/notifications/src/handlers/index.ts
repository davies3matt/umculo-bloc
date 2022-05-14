import { create, get } from "../services/ddb"
import { v4 as uuidv4 } from "uuid"
import { LogType } from "../utils/constants"

export const itemAdded = async (record) => {
  console.log("ITEM ADDED HANDLER")
  const logId = uuidv4()
  const addedByUser = await get("User", record.addedById)
  console.log("Added By User", addedByUser)
  return await create("Log", {
    id: logId,
    description: `${record.name} Added by ${addedByUser.email}`,
    type: LogType.ITEM_ADDED,
    groupId: record.groupId,
    itemId: record.id,
    userId: addedByUser.id,
  })
}
