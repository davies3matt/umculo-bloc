import { Heading, Box, Spinner, Center, Button } from 'native-base';
import React from 'react';
import { useGetGroupQuery, useInviteResponseMutation } from '../../generated/graphql';

const ViewInvite = (props) => {
    // get group data 
    const { data, loading } = useGetGroupQuery({
        variables: {
            id: props.route.params.groupId
        }
    });

    // response mutation function
    const [inviteResponse, { loading: loadingMutation }] = useInviteResponseMutation();
 
    return (
        <Box>
            {
                loading ? 
                <Spinner />
                : <Center>
                    <Heading>{data.getGroup.name}</Heading>
                    <Button isLoading={loadingMutation} onPress={() => inviteResponse({
                        variables: { 
                            groupId: props.route.params.groupId,
                            accept: true
                        }
                    })}>Accept</Button>
                    <Button isLoading={loadingMutation} onPress={() => inviteResponse({
                        variables: { 
                            groupId: props.route.params.groupId,
                            accept: false
                        }
                    })} colorScheme='secondary'>Decline</Button>
                </Center>
            }
        </Box>
    )
}

export default ViewInvite;