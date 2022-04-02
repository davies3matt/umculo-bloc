import { get, list, listUsers, update } from "../../services/ddb";

// this function receives a group id + list of users to invite to the group belonging to that id
export default async (event, context) => {

    // get group id and list of user ids 
    const { groupId, users } = event.arguments;

    // fetch group
    const group = await get('Group', groupId);

    await Promise.all([
        // loop through each invited user
        ...users.map(async user => {
            // TODO - find a better way to filter/search user by phone number using query filter
            // get all users
            const allUsers = await listUsers();
            console.log(allUsers);
            // find first user that matches phone number
            const invitedUser = allUsers.find(invitedUser => invitedUser.phoneNumber === user.phoneNumber);
            console.log('invitedUser', invitedUser);

            // add invited user id to group's invited user list
            const pendingGroups = invitedUser.pendingGroups ? invitedUser.pendingGroups : [];
            const pendingUsers = group.pendingUsers ? group.pendingUsers : [];
            console.log('pendingGroups', pendingGroups);
            console.log('pendingUsers', pendingUsers);
            // check if user is already pending 
            await update('Group', groupId, { pendingUsers: [...pendingUsers, ...[invitedUser.id]] })
            // add group id to user's pending groups
            return update('User', invitedUser.id, { pendingGroups: [...pendingGroups, ...[groupId]] })
        })
    ])
    return await get('Group', groupId);
}