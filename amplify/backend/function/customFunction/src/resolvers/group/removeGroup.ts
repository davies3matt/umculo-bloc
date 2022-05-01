import { get, list, remove } from "../../services/ddb"

export default async (event, context) => {
  const user = await get("User", event.identity.sub)
  if (!user) {
    throw new Error("User not found!")
  } else {
    // get group
    const group = await get("Group", event.arguments.groupId)
    if (!group) {
      throw new Error("Group Not Found!")
    }
    // get group items
    const items = await list("Item", { itemGroupId: group.id })
    // map through and remove all items
    await Promise.all([
      ...items.map((item) => {
        return remove("Item", item.id)
      }),
    ])
    // get users-groups records
    const usersGroups = await list("UsersGroups", { groupId: group.id })
    // map through and remove all records affiliated with group
    await Promise.all([
      ...usersGroups.map((usersGroup) => {
        return remove("UsersGroups", { id: usersGroup.id })
      }),
    ])
    return "Successfully removed group!"
  }
}
