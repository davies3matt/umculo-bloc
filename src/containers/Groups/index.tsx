import { Button, Box, Heading } from 'native-base';
import { AntDesign } from "@expo/vector-icons"
import React, { useState } from 'react';
import SlideRightView from '../../components/SlideRightView';
import { useListUsersGroupsQuery, UsersGroups } from '../../generated/graphql';
import { useAuthContext } from '../../contexts/AuthContext';

interface Props {
    navigation: any;
}

const Groups: React.FC<Props> = ({navigation}) => {

    const { authData } = useAuthContext();
    const [groups, setGroups] = useState<UsersGroups[]>();
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
            <Box >
                <Button 
                    style={{margin: 20, marginBottom: 0, alignSelf: 'flex-end'}} 
                    size='lg' 
                    variant='solid'
                    rightIcon={<AntDesign name="addusergroup" size={24} color="white" />}
                    onPress={() => navigation.navigate('AddGroup')}
                    >
                    Add Group
                </Button>
                {groups?.map(item => <Heading>{item.group.name}</Heading>)}
            </Box>
        </SlideRightView>
    )
}

export default Groups;