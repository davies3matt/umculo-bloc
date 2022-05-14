import moment from "moment"
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "native-base"
import React from "react"
import SlideRightView from "../../../components/SlideRightView"
import { useListLogsQuery } from "../../../generated/graphql"
import { formatEnums } from "../../../utils/helpers"
import { NavigationProps } from "../../Authentication/Login"
import { GroupRouteProps } from "../../Groups/addItem"

interface GroupLogsProps extends NavigationProps, GroupRouteProps {}
const GroupLogs: React.FC<GroupLogsProps> = ({ route }) => {
  const groupId = route.params.groupId
  const { data, loading } = useListLogsQuery({
    fetchPolicy: "network-only",
    variables: {
      filter: {
        groupId: {
          eq: groupId,
        },
      },
    },
    onError: (err) => console.log("ERROR LISTING LOGS", err),
  })
  return (
    <SlideRightView>
      <Heading>Group Logs</Heading>
      {data?.listLogs?.items && (
        <FlatList
          data={data.listLogs.items}
          renderItem={(item) => {
            return (
              <Box
                borderBottomWidth="1"
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="2"
              >
                <HStack space={3} justifyContent="space-between">
                  <VStack>
                    <Text bold>{formatEnums(item.item.type)}</Text>
                    <Text fontSize={"13px"}>{item.item.description}</Text>
                  </VStack>
                  <Text fontSize="xs" alignSelf={"flex-start"}>
                    {moment(item.item.createdAt).format(
                      moment(item.item.createdAt).isSame(moment(), "day")
                        ? "HH:mm"
                        : "DD-MM-YYYY"
                    )}
                  </Text>
                </HStack>
              </Box>
            )
          }}
        />
      )}
      {loading && <Spinner />}
    </SlideRightView>
  )
}

export default GroupLogs
