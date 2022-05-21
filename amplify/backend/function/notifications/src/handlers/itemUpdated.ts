import { create, get } from "../services/ddb"
import { ItemStatus, LogType } from "../utils/constants"
import { v4 as uuidv4 } from "uuid"

/**
 * TODO - remove test logs once succesfully tested
 */
export const itemUpdated = async (record, oldRecord, context) => {
  console.log("ITEM UPDATED HANDLER")
  try {
    /** -----------------------------------------------------------------------------------
     *                                ITEM COMPLETED                                      |
     ------------------------------------------------------------------------------------*/
    if (
      oldRecord.status === ItemStatus.PENDING &&
      record.status === ItemStatus.DONE
    ) {
      // get completed by user
      const completedBy = await get("User", record.completedById)
      console.log("completed by", completedBy)
      const logId = uuidv4()
      return await create("Log", {
        id: logId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: `${record.name} Completed by ${
          completedBy.name ? completedBy.name : completedBy.email
        }`,
        type: LogType.ITEM_COMPLETED,
        groupId: record.groupId,
        itemId: record.id,
        userId: completedBy.id,
      })
    } else if (
      /** -----------------------------------------------------------------------------------
     *                                ITEM INCOMPLETED                                     |
     --------------------------------------------------------------------------------------*/
      oldRecord.status === ItemStatus.DONE &&
      record.status === ItemStatus.PENDING
    ) {
      // we update the same completedBy field when a user incompletes an item
      const completedBy = await get("User", record.completedById)
      console.log("un-completed by", completedBy)
      const logId = uuidv4()
      return await create("Log", {
        id: logId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: `${record.name} Incompleted by ${
          completedBy.name ? completedBy.name : completedBy.email
        }`,
        type: LogType.ITEM_INCOMPLETED,
        groupId: record.groupId,
        itemId: record.id,
        userId: completedBy.id,
      })
    } else {
      // no log event for item update
      return Promise.resolve()
    }
  } catch (err) {
    console.log("ERROR IN ITEM UPDATED HANDLER", err)
    context.done(err, null)
  }
}
