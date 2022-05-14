import { get, update } from "../../services/ddb"
import { ItemStatus } from "../../utils/constants"

export default async (event, context) => {
  /**
   *
   * TODO - Remove Console Logs Once Succesfully Tested!
   *
   */
  const { items, groupId } = event.arguments
  const username = event.identity.sub
  if (items && items.length > 0) {
    try {
      const group = await get("Group", groupId)
      await Promise.all([
        // map through each updated item
        ...items.map(async (updatedItem) => {
          // get current record of that udpated item
          const item = await get("Item", updatedItem.id)
          // initialise a variable that will store fields and values to be updated
          let input = {}
          // map through each updated item's fields and compare them to the current record's values of those fields
          Object.keys(updatedItem).forEach((field) => {
            if (updatedItem[field] !== item[field]) {
              // field has been updated
              if (
                field === "status" &&
                updatedItem[field] === ItemStatus.DONE
              ) {
                /**
                 *  The item was marked complete
                 *  record user identity who envoked this mutation
                 */
                input["completedById"] = username
              }
              input[field] = updatedItem[field]
            }
          })
          return update("Item", updatedItem.id, input)
        }),
      ])
      return "Successfully Synced Items!"
    } catch (err) {
      console.log("Error Syncing Items", err)
      throw new Error("Error Syncing Items")
    }
  } else {
    throw new Error("You cannot pass an empty item list!")
  }
}
