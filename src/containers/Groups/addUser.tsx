import React, { useState } from 'react';
import { Box, Heading, Divider, FormControl, Input, Button, Center } from 'native-base';
import { useInviteUsersToGroupMutation } from '../../generated/graphql';

// interfaces
interface Props {
    navigation: any
    route: {
        params: {
            groupId: string
        }
    }
}

interface UserDetails {
    email?: string,
    phoneNumber?: string,
}

// functional component 
const AddUser: React.FC<Props> = (props) => {
    // mutation function
    const [inviteUser, { loading }] = useInviteUsersToGroupMutation({
        onError: err => console.log('Error Inviting User', err)
    });

    // invite user function
    const submitInviteUser = async (user: UserDetails, groupId) => {
        await inviteUser({
            variables: {
                groupId: groupId,
                users: [user]
            }
        })
    }
    const groupId = props.route.params.groupId;
    const [user, setUser] = useState<UserDetails>({});
    return (
        <Center>
            <Box>
                <Heading marginTop={'50px'}>Invite a User</Heading>
                <Divider my={2}/>
                <Box marginTop={'20px'} backgroundColor='pink.100' w={'200px'}>
                <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input placeholder="piet@gmail.com" onChangeText={val => setUser({...user, email: val})} value={user?.email as string} />
                </FormControl>
                <FormControl>
                <FormControl.Label>Phone Number</FormControl.Label>
                <Input placeholder="+27834636516" onChangeText={val => setUser({...user, phoneNumber: val})} value={user?.phoneNumber as string} />
                </FormControl>
                    <Button isLoading={loading} onPress={() => submitInviteUser(user, groupId)}>Invite User</Button>
                </Box>
            </Box>
        </Center>
    )
}

export default AddUser;