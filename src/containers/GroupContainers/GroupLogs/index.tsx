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
import React, { useState } from "react"
import SlideRightView from "../../../components/SlideRightView"
import { Log, useListLogsQuery } from "../../../generated/graphql"
import { formatEnums } from "../../../utils/helpers"
import { NavigationProps } from "../../Authentication/Login"
import { GroupRouteProps } from "../../Groups/addItem"

interface GroupLogsProps extends NavigationProps, GroupRouteProps {}
const GroupLogs: React.FC<GroupLogsProps> = ({ route }) => {
  const groupId = route.params.groupId
  const [logs, setLogs] = useState<Log[]>()
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
  React.useEffect(() => {
    if (data?.listLogs?.items) {
      const sortedLogs = data.listLogs.items.sort((a, b) => {
        if (moment(a.createdAt).isBefore(moment(b.createdAt))) {
          return -1
        } else return 1
      })
      setLogs(sortedLogs as Log[])
    }
  }, [data])
  return (
    <SlideRightView>
      <Heading>Group Logs</Heading>
      {data?.listLogs?.items && (
        <FlatList
          data={logs}
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
