import { create, get, update } from "../../services/ddb"
import { v4 as uuidv4 } from 'uuid';

export default async (event, context) => {
    // get user responding
    const user = await get('User', event.identity.sub);
    console.log('User', user);
    
    if (!user) {
        throw new Error('User not found!')
    }

    // get group from passed id
    const { groupId } = event.arguments;
    const group = await get('Group', groupId);
    console.log('Group', group);

    const { accept } = event.arguments;
    const userGroupId = uuidv4()
    if (accept) {
        // add user to group
        await create('UsersGroups', {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            __typeName: 'UsersGroups',
            id: userGroupId,
            userID: user.id,
            groupID: groupId
        });
    } 
    // remove pending ids - regardless
    const updatedPendingGroups = user.pendingGroups.filter(group => group !== groupId);
    console.log('updatedPendingGroups', updatedPendingGroups);
    await update('User', user.id, { pendingGroups: updatedPendingGroups });
    
    const updatedPendingUsers = group.pendingUsers.filter(userId => userId !== user.id)
    console.log('updatedPendingUsers', updatedPendingUsers)
    await update('Group', groupId, { pendingUsers: updatedPendingUsers });

    return await get('Group',groupId);
}