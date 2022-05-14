import React, { useState } from "react"
import { Box, Button, Center, Divider } from "native-base"
import {
  Category,
  ItemStatus,
  useCreateItemMutation,
  useGetGroupQuery,
} from "../../generated/graphql"
import uuid from "react-native-uuid"
import { NavigationProps } from "../Authentication/Login"
import { useAuthContext } from "../../contexts/AuthContext"
import LottieView from "lottie-react-native"
import ItemBox from "../../components/ItemBox"

export interface GroupRouteProps {
  route: {
    params: {
      groupId: string
    }
  }
}

interface Props extends NavigationProps, GroupRouteProps {}

interface ItemDetails {
  name?: string
  category?: Category
  itemUserId?: String // <<---- userID
}
const AddItem = ({ navigation, route }: Props): JSX.Element => {
  const { authData } = useAuthContext()
  const [item, setItem] = useState<ItemDetails>({})
  // const [itemList, setItemList] = useState<ItemDetails[]>([])

  const groupId = route.params.groupId
  // get group query
  const { data } = useGetGroupQuery({
    fetchPolicy: "network-only",
    variables: {
      id: groupId,
    },
    onError: (err) => console.log(err),
  })

  // mutation
  const [postItem, { loading: loadingCreateItem }] = useCreateItemMutation({
    // onCompleted: () => ,
    onError: (err) => console.log(err),
  })
  // create item function
  const createItem = async (item: ItemDetails) => {
    console.log(item)
    const id = uuid.v4().toString()
    let input = {
      name: item.name,
      category: item.category,
    }
    // if assigned to user add to input item
    if (item.itemUserId) {
      input["userId"] = item.itemUserId
    }
    await postItem({
      variables: {
        input: {
          id: id,
          groupId: groupId,
          status: ItemStatus.Pending,
          addedById: authData.username,
          ...input,
        },
      },
    })
  }

  const [animation, setAnimation] = useState<any>()
  React.useEffect(() => {
    if (animation) {
      animation.play()
    }
  }, [animation])
  return (
    <Center>
      {loadingCreateItem ? (
        <LottieView
          ref={(anim) => setAnimation(anim)}
          style={{
            width: "50%",
            height: "50%",
          }}
          source={require("../../../assets/animations/done-check.json")}
        />
      ) : (
        <Box marginTop={"20px"} w={"80%"}>
          <Center>
            <LottieView
              ref={(anim) => setAnimation(anim)}
              style={{
                width: "50%",
              }}
              source={require("../../../assets/animations/girl-with-list.json")}
            />
            <Divider my={2} />
            <ItemBox
              item={item}
              setItem={setItem}
              users={data?.getGroup?.users?.items || []}
            />
            <Button
              marginTop={"20px"}
              isLoading={loadingCreateItem}
              onPress={() =>
                navigation.navigate("ViewGroup", { groupId: groupId })
              }
            >
              Done
            </Button>
          </Center>
        </Box>
      )}
    </Center>
  )
}

export default AddItem
