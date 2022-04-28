import { Button, Box, Heading } from 'native-base';
import { AntDesign } from "@expo/vector-icons"
import React, { useState } from 'react';
import SlideRightView from '../../components/SlideRightView';
import { useListUsersGroupsQuery, UsersGroups, useGetUserProfileQuery } from '../../generated/graphql';
import { useAuthContext } from '../../contexts/AuthContext';

interface Props {
    navigation: any;
}

const Groups: React.FC<Props> = ({navigation}) => {

    const { authData } = useAuthContext();
    const [groups, setGroups] = useState<UsersGroups[]>();
    const [pendingGroups, setPendingGroups] = useState<String[]>();

    // user profile query
    const { data: userProfileData } = useGetUserProfileQuery({
        onError: (err) => console.log(err),
        fetchPolicy: 'network-only'
    });
    React.useEffect(() => {
        if (userProfileData?.getUserProfile?.pendingGroups?.length > 0) {
            setPendingGroups(userProfileData.getUserProfile.pendingGroups)
        } 
    }, [userProfileData])

    // user-groups query
    const { data } = useListUsersGroupsQuery({
        variables: {
            filter: {
                userID: { eq: authData.username }
            },
        },
        fetchPolicy: 'network-only',
        onError: (err) => console.log(err),
    })
    React.useEffect(() => {
        console.log(authData.username);
        if (data?.listUsersGroups?.items) {
            setGroups(data.listUsersGroups.items as UsersGroups[]);
        }
    }, [data])
    return (
        <SlideRightView>
            <Box>
                <Button 
                    style={{margin: 20, marginBottom: 0, alignSelf: 'flex-end'}} 
                    size='lg' 
                    variant='solid'
                    rightIcon={<AntDesign name="addusergroup" size={24} color="white" />}
                    onPress={() => navigation.navigate('AddGroup')}
                    >
                    Add Group
                </Button>
                {pendingGroups?.map(group => {
                    return <Box>
                        <Heading>Pending Group Invite</Heading>
                        <Button onPress={() => navigation.navigate('ViewInvite', { groupId: group })}>View Invite</Button>
                    </Box>
                })}
                {groups?.map(item => <Box 
                    backgroundColor={'pink.100'} 
                    key={item.id}
                    padding='20'    
                >
                    <Heading>{item.group.name}</Heading>
                    <Button onPress={() => navigation.navigate('EditGroup', {groupId: item.groupID})}>View Group</Button>
                </Box>)}
            </Box>
        </SlideRightView>
    )
}

export default Groups;