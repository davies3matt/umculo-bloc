import { Box, Center, FormControl, Input, Select, useToast } from "native-base"
import React, { useRef } from "react"
import { Animated, Dimensions } from "react-native"
import GestureRecognizer from "react-native-swipe-gestures"
import { Category } from "../../generated/graphql"
import { gestureRight, invalidShake } from "../../theme/animations"

interface ItemProps {
  item: ItemDetails
  setItem: (d: ItemDetails) => void
  createItem: (d: any) => void
  loading: boolean
  users: any
}
interface ItemDetails {
  name?: string
  category?: Category
  itemUserId?: String // <<---- userID
}
const ItemBox: React.FC<ItemProps> = ({
  item,
  setItem,
  users,
  createItem,
  loading,
}) => {
  const toast = useToast()
  const translateAnim = useRef(new Animated.Value(0)).current
  const swipeCallback = () => {
    // reset item state
    setItem({})
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }

  /**
   *  check if the item is ready to be posted and gesture the user to swipe right
   */
  const showItemReady = () => {
    toast.show({
      title: "Swipe Right to Add Item!",
      placement: "bottom-right",
      variant: "outline-light",
      duration: 3000,
    })
    gestureRight(translateAnim)
  }

  const onSwipe = (gestureName) => {
    switch (gestureName) {
      case "SWIPE_RIGHT": {
        if (item.name && item.category) {
          // create item and trigger swipe animation
          createItem(item)
          Animated.timing(translateAnim, {
            toValue: 350,
            duration: 250,
            useNativeDriver: true,
          }).start(swipeCallback)
        } else {
          toast.show({
            title: "More Info Needed!",
            description: "Tell us a little more about this item",
            variant: "subtle",
          })
          invalidShake(translateAnim)
        }
      }
    }
  }
  return (
    <GestureRecognizer
      config={{ velocityThreshold: 0.1 }}
      onSwipe={(dir, state) => onSwipe(dir)}
    >
      <Box width={Dimensions.get("window").width}>
        <Center>
          <Animated.View
            style={{
              alignItems: "center",
              justifyContent: "center",
              transform: [{ translateX: translateAnim }],
            }}
          >
            <Box
              width={300}
              borderWidth="2px"
              borderColor="#61daf9"
              borderRadius={"10px"}
              padding={"20px"}
            >
              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input
                  placeholder="Milk"
                  onChangeText={(val) => setItem({ ...item, name: val })}
                  onEndEditing={() => {
                    if (item.category && item.name) {
                      showItemReady()
                    }
                  }}
                  value={item?.name as string}
                />
              </FormControl>
              <FormControl marginTop={"20px"}>
                <FormControl.Label>Category</FormControl.Label>
                <Select
                  onValueChange={(val) => {
                    setItem({ ...item, category: val as Category })
                    if (val && item.name) {
                      showItemReady()
                    }
                  }}
                  placeholder="Select Category"
                  selectedValue={item.category || ""}
                >
                  {Object.values(Category).map((cat) => {
                    return <Select.Item key={cat} value={cat} label={cat} />
                  })}
                </Select>
              </FormControl>
              <FormControl marginTop={"20px"}>
                <FormControl.Label>Assigned To</FormControl.Label>
                <Select
                  onValueChange={(val) => setItem({ ...item, itemUserId: val })}
                  placeholder="Select User"
                >
                  {users.map((user) => {
                    return (
                      <Select.Item
                        key={user.id}
                        value={user.id}
                        label={user.user.email}
                      />
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Animated.View>
        </Center>
      </Box>
    </GestureRecognizer>
  )
}

export default ItemBox
