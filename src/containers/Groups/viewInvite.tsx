import { Heading, Box, Spinner, Center, Button } from "native-base"
import React from "react"
import {
  useGetGroupQuery,
  useInviteResponseMutation,
} from "../../generated/graphql"
import { NavigationProps } from "../Authentication/Login"
import { GroupRouteProps } from "./addItem"

interface Props extends NavigationProps, GroupRouteProps {}

const ViewInvite = ({ navigation, route }: Props): JSX.Element => {
  // get group data
  const { data, loading } = useGetGroupQuery({
    variables: {
      id: route.params.groupId,
    },
  })

  // response mutation function
  const [inviteResponse, { loading: loadingMutation }] =
    useInviteResponseMutation()

  return (
    <Box>
      {loading ? (
        <Spinner />
      ) : (
        <Center>
          <Heading>{data.getGroup.name}</Heading>
          <Button
            isLoading={loadingMutation}
            onPress={() =>
              inviteResponse({
                variables: {
                  groupId: route.params.groupId,
                  accept: true,
                },
              })
            }
          >
            Accept
          </Button>
          <Button
            isLoading={loadingMutation}
            onPress={() =>
              inviteResponse({
                variables: {
                  groupId: route.params.groupId,
                  accept: false,
                },
              })
            }
            colorScheme="secondary"
          >
            Decline
          </Button>
        </Center>
      )}
    </Box>
  )
}

export default ViewInvite
