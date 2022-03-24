import { get, list, update } from "../../services/ddb";

export default async (event, context) => {
    const { groupId, users } = event.arguments;
    const group = await get('Group', groupId);
    console.log('group', group);
    await Promise.all([
        ...users.map(async user => {
            const allUsers = await list('User', { phoneNumber: user.phoneNumber });
            console.log(allUsers);
            console.log('This User', allUsers[0]);
            await update('Group', groupId, { pendingUsers: [...group.pendingUsers, ...[allUsers[0].id]] })
            return update('User', allUsers[0].id, { pendingGroups: [...allUsers[0].pendingGroups, ...[groupId]] })
        })
    ])
    return await get('Group', groupId);
}