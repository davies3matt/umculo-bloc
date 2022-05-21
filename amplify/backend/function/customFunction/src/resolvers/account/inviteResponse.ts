import { create, get, update } from "../../services/ddb"
import { v4 as uuidv4 } from "uuid"
import { LogType } from "../../utils/constants"

export default async (event, context) => {
  try {
    // get user responding
    const user = await get("User", event.identity.sub)

    if (!user) {
      throw new Error("User not found!")
    }

    // get group from passed id
    const { groupId } = event.arguments
    const group = await get("Group", groupId)

    const { accept } = event.arguments
    const userGroupId = uuidv4()
    if (accept) {
      // add user to group
      await create("UserGroup", {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __typename: "UserGroup",
        id: userGroupId,
        userID: user.id,
        groupID: groupId,
      })
      // create group log
      const logId = uuidv4()
      await create("Log", {
        id: logId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: `${user.name ? user.name : user.email} Joined ${
          group.name
        }`,
        type: LogType.USER_JOINED,
        groupId: groupId,
        userId: user.id,
      })
    }
    // remove pending ids - regardless
    const updatedPendingGroups = user.pendingGroups.filter(
      (group) => group !== groupId
    )
    await update("User", user.id, { pendingGroups: updatedPendingGroups })

    const updatedPendingUsers = group.pendingUsers.filter(
      (userId) => userId !== user.id
    )
    await update("Group", groupId, { pendingUsers: updatedPendingUsers })

    return await get("Group", groupId)
  } catch (err) {
    console.log("ERROR IN INVITE RESPONSE RESOLVER", err)
    context.done(err, null)
  }
}
