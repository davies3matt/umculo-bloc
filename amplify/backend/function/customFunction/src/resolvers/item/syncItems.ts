import { get, update } from "../../services/ddb"
import { ItemStatus } from "../../utils/constants"

export default async (event, context) => {
  const { items, groupId } = event.arguments.itemIdList
  if (items && items.length > 0) {
    try {
      const group = await get("Group", groupId)
      console.log("Group", group)
      await Promise.all([
        // map through each updated item
        ...items.map(async (updatedItem) => {
          console.log("Updated Item", updatedItem)
          // get current record of that udpated item
          const item = await get("Item", updatedItem.id)
          console.log("Item", item)
          // initialise a variable that will store fields and values to be updated
          let input = {}
          // map through each updated item's fields and compare them to the current record's values of those fields
          Object.keys(updatedItem).forEach((field) => {
            console.log(`Updated Item - ${field}:`, updatedItem[field])
            console.log(`Item - ${field}:`, item[field])
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
                input["completedById"] = event.identity.sub
              }
              input[field] = updatedItem[field]
            }
          })
          console.log("Input", input)
          return update("Item", updatedItem.id, input)
        }),
      ])
      return "Successfully Synced Items!"
    } catch (err) {
      console.log("Error", err)
      throw new Error("Error Syncing Items")
    }
  } else {
    throw new Error("You cannot pass an empty item list!")
  }
}
