import { Box, Button, Heading } from "native-base"
import React from "react"
import { Group } from "../../generated/graphql"

interface Props {
  groupData: Group
  navigation: {
    navigate: (s: string) => void
  }
}
const GroupCard: React.FC<Props> = ({ navigation, groupData }) => {
  return (
    <Box>
      <Heading>{groupData.name}</Heading>
      <Button>View</Button>
    </Box>
  )
}

export default GroupCard
