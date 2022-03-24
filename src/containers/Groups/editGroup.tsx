import { Button, Center, Heading, Spinner, VStack, Box, Select, FormControl, Input } from 'native-base';
import React, { useState } from 'react';
import { Category, Item, useCreateItemMutation, useGetGroupQuery, useInviteUsersToGroupMutation } from '../../generated/graphql';
import uuid from 'react-native-uuid';

interface Props {
    navigation: any
    groupId: string
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
        onCompleted: dataC => console.log('jaja', dataC),
        onError: err => console.log(err)
    });

    const [postItem, { loading: loadingCreateItem }] = useCreateItemMutation({
        onCompleted: () => refetch(),
        onError: (err) => console.log(err)
    });

    interface ItemDetails {
        name?: string,
        category?: Category
    }

    interface UserDetails {
        email?: string,
        phoneNumber?: string,
    }

    const createItem = async (item: ItemDetails) => {
        console.log(item);
        await postItem({
            variables: {
                input: {
                    id: uuid.v4().toString(),
                    itemGroupId: props.route.params.groupId,
                    name: item.name,
                    category: item.category,
                }
            }
        })
    }

    const submitInviteUser = async (user: UserDetails) => {
        console.log(user);
        await inviteUser({
            variables: {
                groupId: groupId,
                users: [user]
            }
        })
    }

    React.useEffect(() => {
        console.log('awdawd');
    }, [data])

    const [item, setItem] = useState<ItemDetails>({});
    const [user, setUser] = useState<UserDetails>({});
     return(
        <Center>
            {!loading ?
            <VStack>
                <Center>
                <Heading>{data?.getGroup?.name}</Heading>
                <Box padding={'20px'}>
                    <Heading>Item List</Heading>
                    {data?.getGroup?.items?.items.map(item => {
                    return <Box key={item?.id}>
                        <Heading fontSize='xs'>{item?.name} - {item?.category}</Heading>
                    </Box>
                    })}
                </Box>
                <Box marginTop={'20px'} backgroundColor='pink.100'>
                <FormControl>
                <FormControl.Label>New Item Details</FormControl.Label>
                <Input placeholder="Milk" onChangeText={val => setItem({...item, name: val})} value={item?.name as string} />
                </FormControl>
                    <Select
                        onValueChange={val => setItem({...item, category: val as Category})}
                    >
                        {Object.values(Category).map(cat => {
                            return <Select.Item key={cat} value={cat} label={cat}/>
                        })}
                    </Select>
                    <Button isLoading={loadingCreateItem} onPress={() => createItem(item)}>Add Item</Button>
                </Box>
                <Box marginTop={'20px'} backgroundColor='pink.100'>
                <FormControl>
                <FormControl.Label>email</FormControl.Label>
                <Input placeholder="piet@gmail.com" onChangeText={val => setUser({...item, email: val})} value={item?.name as string} />
                </FormControl>
                <FormControl>
                <FormControl.Label>phone number</FormControl.Label>
                <Input placeholder="+27834636516" onChangeText={val => setUser({...item, phoneNumber: val})} value={item?.name as string} />
                </FormControl>
                    <Button isLoading={loadingCreateItem} onPress={() => submitInviteUser(user)}>Add User</Button>
                </Box>
                </Center>
            </VStack>
            : <Spinner/>}
        </Center>
    )
}

export default EditGroup;