import { Button, Box, Heading } from "native-base"
import { AntDesign } from "@expo/vector-icons"
import React, { useState } from "react"
import SlideRightView from "../../components/SlideRightView"
import {
  useListUserGroupsQuery,
  UserGroup,
  useGetUserProfileQuery,
  useRemoveGroupMutation,
} from "../../generated/graphql"
import { useAuthContext } from "../../contexts/AuthContext"
import { NavigationProps } from "../Authentication/Login"
import { useFocusEffect } from "@react-navigation/native"
import ConfirmationModal from "../../components/ConfirmationModal"

const Groups = ({ navigation }: NavigationProps): JSX.Element => {
  const { authData } = useAuthContext()
  const [groups, setGroups] = useState<UserGroup[]>()
  const [pendingGroups, setPendingGroups] = useState<String[]>()
  const [deleteConfirmationModalVisible, setDeleteConfirmationModalVisible] =
    useState(false)
  const [selectedGroup, setSelectedGroup] = useState<UserGroup>()

  // user profile query
  const { data: userProfileData } = useGetUserProfileQuery({
    onError: (err) => console.log(err),
    fetchPolicy: "network-only",
  })
  React.useEffect(() => {
    if (userProfileData?.getUserProfile?.pendingGroups?.length > 0) {
      setPendingGroups(userProfileData.getUserProfile.pendingGroups)
    }
  }, [userProfileData])

  // user-groups query
  const { data, refetch } = useListUserGroupsQuery({
    variables: {
      filter: {
        userID: { eq: authData.username },
      },
    },
    fetchPolicy: "network-only",
    onError: (err) => console.log(err),
  })
  React.useEffect(() => {
    console.log(authData.username)
    if (data?.listUserGroups?.items) {
      setGroups(data.listUserGroups.items as UserGroup[])
    }
  }, [data])

  useFocusEffect(
    React.useCallback(() => {
      refetch()
    }, [refetch])
  )

  // remove group mutation
  const [removeGroup, { loading: removingGroupLoading }] =
    useRemoveGroupMutation({
      onError: (err) => console.log(err),
      onCompleted: () => {
        refetch()
        setDeleteConfirmationModalVisible(false)
      },
    })

  return (
    <SlideRightView>
      <Box>
        <Button
          style={{ margin: 20, marginBottom: 0, alignSelf: "flex-end" }}
          size="lg"
          variant="solid"
          rightIcon={<AntDesign name="addusergroup" size={24} color="white" />}
          onPress={() => navigation.navigate("AddGroup")}
        >
          Add Group
        </Button>
        {pendingGroups?.map((group) => {
          return (
            <Box padding="20" key={group.toString()}>
              <Heading>Pending Group Invite</Heading>
              <Button
                onPress={() =>
                  navigation.navigate("ViewInvite", { groupId: group })
                }
              >
                View Invite
              </Button>
            </Box>
          )
        })}
        {groups?.map((item) => (
          <Box key={item.id} padding="20">
            <Heading>{item.group.name}</Heading>
            <Button
              onPress={() =>
                navigation.navigate("ViewGroup", { groupId: item.groupID })
              }
            >
              View Group
            </Button>
            <Button
              onPress={() => {
                setSelectedGroup(item)
                setDeleteConfirmationModalVisible(true)
              }}
              isLoading={removingGroupLoading}
              backgroundColor={"red.500"}
            >
              Delete Group
            </Button>
          </Box>
        ))}
        {/** Deletion Confirmation Modal */}
        {selectedGroup && (
          <ConfirmationModal
            visible={deleteConfirmationModalVisible}
            onOk={() => {
              removeGroup({
                variables: {
                  groupId: selectedGroup.groupID,
                },
              })
            }}
            onCancel={() => setDeleteConfirmationModalVisible(false)}
            header={`Remove Group - ${selectedGroup.group.name}`}
            description="Are you sure you want to remove this group?"
            loading={removingGroupLoading}
          />
        )}
      </Box>
    </SlideRightView>
  )
}

export default Groups
