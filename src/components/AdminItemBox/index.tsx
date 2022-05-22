import {
  Box,
  Center,
  Checkbox,
  FormControl,
  Input,
  useToast,
} from "native-base"
import React, { useRef } from "react"
import { Animated, Dimensions } from "react-native"
import GestureRecognizer from "react-native-swipe-gestures"
import { Area, Category } from "../../generated/graphql"
import { gestureRight, invalidShake } from "../../theme/animations"
import { formatEnums } from "../../utils/helpers"

interface ItemProps {
  item: ItemDetails
  setItem: (d: ItemDetails) => void
  createItem: (d: any) => void
  loading: boolean
}
interface ItemDetails {
  name: string
  categories: Category[]
  areas: Area[]
}
const AdminItemBox: React.FC<ItemProps> = ({
  item,
  setItem,
  createItem,
  loading,
}) => {
  const toast = useToast()
  const translateAnim = useRef(new Animated.Value(0)).current
  const swipeCallback = () => {
    // reset item state
    setItem({
      name: "",
      areas: [],
      categories: [],
    })
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
        if (item.name && item.categories) {
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
      case "SWIPE_LEFT": {
        setItem({
          name: "",
          areas: [],
          categories: [],
        })
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
                    if (item.categories && item.name) {
                      showItemReady()
                    }
                  }}
                  value={item?.name as string}
                />
              </FormControl>
              <FormControl marginTop={"20px"}>
                <FormControl.Label>Categories</FormControl.Label>
                {Object.values(Category).map((cat) => (
                  <Checkbox
                    key={cat}
                    onChange={(val) => {
                      if (val && !item.categories.includes(cat)) {
                        let categoryList = item.categories
                        categoryList.push(cat)
                        console.log("THIS IS THE ITEM", item)
                        setItem({
                          ...item,
                          categories: [...categoryList],
                        })
                      } else if (!val) {
                        setItem({
                          ...item,
                          categories: [
                            ...item.categories.filter((item) => item !== cat),
                          ],
                        })
                      }
                    }}
                    value={cat}
                    isChecked={item.categories.includes(cat)}
                  >
                    {formatEnums(cat)}
                  </Checkbox>
                ))}
              </FormControl>
              <FormControl marginTop={"20px"}>
                <FormControl.Label>Area</FormControl.Label>
                {Object.values(Area).map((area) => (
                  <Checkbox
                    value={area}
                    key={area}
                    onChange={(val) => {
                      if (val && !item.areas.includes(area)) {
                        let areaList = item.areas
                        areaList.push(area)
                        setItem({
                          ...item,
                          areas: [...areaList],
                        })
                      } else if (!val) {
                        setItem({
                          ...item,
                          areas: [
                            ...item.areas.filter((item) => item !== area),
                          ],
                        })
                      }
                    }}
                    isChecked={item.areas.includes(area)}
                  >
                    {area}
                  </Checkbox>
                ))}
              </FormControl>
            </Box>
          </Animated.View>
        </Center>
      </Box>
    </GestureRecognizer>
  )
}

export default AdminItemBox
