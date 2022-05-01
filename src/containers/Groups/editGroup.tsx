import { Button, Center, Heading, Spinner, VStack, Box, Select, FormControl, Input, Divider, ScrollView } from 'native-base';
import React, { useState } from 'react';
import { Category, useCreateItemMutation, useGetGroupQuery, useInviteUsersToGroupMutation } from '../../generated/graphql';
import uuid from 'react-native-uuid';

interface Props {
    navigation: any
    route: {
        params: {
            groupId: string
        }
    }
}
const EditGroup: React.FC<Props> = (props) => {
    const groupId = props.route.params.groupId
    const { data, loading, refetch } = useGetGroupQuery({
        variables: {
            id: groupId
        },
        fetchPolicy: 'network-only'
    })

    const [inviteUser] = useInviteUsersToGroupMutation({
        onError: err => console.log('Error Inviting User', err)
    });

    const [postItem, { loading: loadingCreateItem }] = useCreateItemMutation({
        onCompleted: () => refetch(),
        onError: (err) => console.log(err)
    });

    interface ItemDetails {
        name?: string,
        category?: Category,
        assignedTo?: String // <<---- userID
    }

    interface UserDetails {
        email?: string,
        phoneNumber?: string,
    }

    const createItem = async (item: ItemDetails) => {
        console.log(item);
        // await postItem({
        //     variables: {
        //         input: {
        //             id: uuid.v4().toString(),
        //             itemGroupId: props.route.params.groupId,
        //             name: item.name,
        //             category: item.category,
        //         }
        //     }
        // })
    }

    const submitInviteUser = async (user: UserDetails) => {
        await inviteUser({
            variables: {
                groupId: groupId,
                users: [user]
            }
        })
    }

    const [item, setItem] = useState<ItemDetails>({});
    const [user, setUser] = useState<UserDetails>({});
     return(
         <ScrollView>
        <Center>
            {!loading ?
            <VStack>
                <Center>
                <Heading>{data?.getGroup?.name}</Heading>
                {/***************************** ITEMS **************************************/}
                <Box padding={'20px'}>
                    <Heading>Item List</Heading>
                    <Divider my={2}/>
                    {data?.getGroup?.items?.items.map(item => {
                    return <Box key={item?.id}>
                        <Heading fontSize='xs'>{item?.name} - {item?.category}</Heading>
                    </Box>
                    })}
                </Box>
                {/***************************** ADD ITEM **************************************/}
                <Box marginTop={'20px'} backgroundColor='pink.100' w={'200px'}>
                    <FormControl>
                        <FormControl.Label>Name</FormControl.Label>
                        <Input placeholder="Milk" onChangeText={val => setItem({...item, name: val})} value={item?.name as string} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Category</FormControl.Label>
                        <Select
                            onValueChange={val => setItem({...item, category: val as Category})}
                            placeholder='Select Category'
                        >
                            {Object.values(Category).map(cat => {
                                return <Select.Item key={cat} value={cat} label={cat}/>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Assigned To</FormControl.Label>
                        <Select
                            onValueChange={val => setItem({...item, assignedTo: val})}
                            placeholder='Select User'
                        >
                            {data?.getGroup?.users?.items?.map(user => {
                                return <Select.Item key={user.user.id} value={user.user.id} label={user.user.email}/>
                            })}
                        </Select>
                    </FormControl>
                    <Button isLoading={loadingCreateItem} onPress={() => createItem(item)}>Add Item</Button>
                </Box>
                {/***************************** USERS **************************************/}
                <Heading marginTop={'50px'}>User List</Heading>
                <Divider my={2}/>
                <Box>
                    {data?.getGroup?.users?.items?.map(user => {
                        return <Box marginTop={'10px'} key={user.id}>
                            <Center>
                                <Heading fontSize='xs'>{user.user.email}</Heading>
                            </Center>
                        </Box>
                    })}
                </Box>
                {/***************************** INVITE USER **************************************/}
                <Heading marginTop={'50px'}>Invite a User</Heading>
                <Divider my={2}/>
                <Box marginTop={'20px'} backgroundColor='pink.100' w={'200px'}>
                <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input placeholder="piet@gmail.com" onChangeText={val => setUser({...item, email: val})} value={item?.name as string} />
                </FormControl>
                <FormControl>
                <FormControl.Label>Phone Number</FormControl.Label>
                <Input placeholder="+27834636516" onChangeText={val => setUser({...item, phoneNumber: val})} value={item?.name as string} />
                </FormControl>
                    <Button isLoading={loadingCreateItem} onPress={() => submitInviteUser(user)}>Invite User</Button>
                </Box>
                </Center>
            </VStack>
            : <Spinner/>}
        </Center>
        </ScrollView>
    )
}

export default EditGroup;