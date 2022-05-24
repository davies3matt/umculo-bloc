import React, { useState } from "react"
import { Box, Button, Center } from "native-base"
import {
  Area,
  Category,
  ItemStatus,
  useCreateItemMutation,
  useGetGroupQuery,
} from "../../../generated/graphql"
import uuid from "react-native-uuid"
import { NavigationProps } from "../../Authentication/Login"
import { useAuthContext } from "../../../contexts/AuthContext"
import LottieView from "lottie-react-native"
import ItemBox from "../../../components/ItemBox"
import LottieAnimation from "../../../components/LottieAnimation"
import { animations } from "../../../theme"
import SlideRightView from "../../../components/SlideRightView"

export interface GroupRouteProps {
  route: {
    params: {
      groupId: string
    }
  }
}

interface Props extends NavigationProps, GroupRouteProps {}

interface ItemDetails {
  name: string
  area?: Area
  category?: Category
  itemUserId?: String // <<---- userID
}
const AddItem = ({ navigation, route }: Props): JSX.Element => {
  const { authData } = useAuthContext()
  const [item, setItem] = useState<ItemDetails>({
    name: "",
  })
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
  // TODO: use loading
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
      area: item.area,
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
  const [checkAnimation, setCheckAnimation] = useState<any>()
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
    if (loadingCreateItem && checkAnimation) {
      playCheckAnimation()
    }
  }, [loadingCreateItem])

  React.useEffect(() => {}, [loading])

  React.useEffect(() => {
    if (checkAnimation) {
      checkAnimation.play()
    }
  })

  return (
    <SlideRightView>
      <Box marginTop={"20px"} w={"80%"}>
        <Center>
          {!loadingCreateItem ? (
            <LottieAnimation source={animations.list_girl} boxSize={200} />
          ) : (
            <LottieView
              ref={(anim) => setCheckAnimation(anim)}
              style={{
                width: "25%",
                height: 200,
                marginBottom: 20,
              }}
              source={animations.check}
            />
          )}
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
    </SlideRightView>
  )
}

export default AddItem
