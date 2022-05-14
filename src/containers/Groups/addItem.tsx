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
  const [loadingCreateItem, setLoadingCreateItem] = useState(false)
  const [postItem, { loading }] = useCreateItemMutation({
    onCompleted: () => setLoadingCreateItem(false),
    onError: (err) => console.log(err),
  })
  // create item function
  const createItem = (item: ItemDetails) => {
    setLoadingCreateItem(true)
    const id = uuid.v4().toString()
    let input = {
      name: item.name,
      category: item.category,
    }
    // if assigned to user add to input item
    if (item.itemUserId) {
      input["userId"] = item.itemUserId
    }
    postItem({
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

  const playCheckAnimation = () => {
    checkAnimation.play(() => {
      if (loading) {
        checkAnimation.play(playCheckAnimation())
      } else {
        setLoadingCreateItem(false)
      }
    })
  }

  React.useEffect(() => {
    console.log(loadingCreateItem)
    if (loadingCreateItem && checkAnimation) {
      console.log("Playing check animation...")
      playCheckAnimation()
    }
  }, [loadingCreateItem])

  React.useEffect(() => {}, [loading])

  const [animation, setAnimation] = useState<any>()
  const [checkAnimation, setCheckAnimation] = useState<any>()
  React.useEffect(() => {
    if (animation) {
      animation.play()
    }
  }, [animation])
  React.useEffect(() => {
    if (checkAnimation) {
      checkAnimation.play()
    }
  })
  return (
    <Center>
      <Box marginTop={"20px"} w={"80%"}>
        <Center>
          {!loadingCreateItem ? (
            <LottieView
              ref={(anim) => setAnimation(anim)}
              style={{
                width: "50%",
                height: 200,
              }}
              source={require("../../../assets/animations/girl-with-list.json")}
            />
          ) : (
            <LottieView
              ref={(anim) => setCheckAnimation(anim)}
              style={{
                width: "25%",
                height: 200,
              }}
              source={require("../../../assets/animations/done-check.json")}
            />
          )}
          <Divider my={2} />
          <ItemBox
            item={item}
            setItem={setItem}
            createItem={createItem}
            loading={loadingCreateItem}
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
    </Center>
  )
}

export default AddItem
