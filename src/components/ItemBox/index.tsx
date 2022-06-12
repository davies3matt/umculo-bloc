import { Box, Center, FormControl, Select, useToast } from "native-base"
import React, { useRef } from "react"
import { Animated, Dimensions } from "react-native"
import GestureRecognizer from "react-native-swipe-gestures"
import { Area, FoodCategory, DrinkCategory } from "../../generated/graphql"
import { gestureRight, invalidShake } from "../../theme/animations"
import SearchableDropdown from "react-native-searchable-dropdown"
import { theme } from "../../theme"
import { formatEnums, getAreaSelectOptions } from "../../utils/helpers"

interface ItemProps {
  item: ItemDetails
  setItem: (d: ItemDetails) => void
  createItem: (d: any) => void
  loading: boolean
  users: any
}
interface ItemDetails {
  name: string
  area?: Area
  subCategory?: string
  itemUserId?: string // <<---- userID
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
    setItem({
      name: "",
    })
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }

  // this is used within the NAME input to avoid updating the state on every text change for better performance
  let itemName = ""
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
        if ((item.name || itemName) && item.subCategory) {
          // create item and trigger swipe animation
          createItem({
            ...item,
            name: item.name ? item.name : itemName,
          })
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
                <FormControl.Label>Area</FormControl.Label>
                <Select
                  onValueChange={(val) => {
                    setItem({
                      ...item,
                      area: val as Area,
                    })
                  }}
                  placeholder="Select an Area"
                  borderColor={theme.colors.accent[100]}
                  color={theme.colors.accent[100]}
                >
                  {Object.values(Area).map((area) => (
                    <Select.Item
                      key={area}
                      value={area}
                      label={formatEnums(area)}
                    />
                  ))}
                </Select>
              </FormControl>
              {(item.area === Area.Food || item.area === Area.Drinks) && (
                <FormControl marginTop={"20px"}>
                  <FormControl.Label>Category</FormControl.Label>
                  <Select
                    onValueChange={(val) => {
                      setItem({ ...item, subCategory: val })
                      if (val && item.name) {
                        showItemReady()
                      }
                    }}
                    placeholder="Select Category"
                    selectedValue={
                      item.subCategory ? item.subCategory : undefined
                    }
                    borderColor={theme.colors.accent[100]}
                    color={theme.colors.accent[100]}
                  >
                    {Object.values(
                      item.area === Area.Food ? FoodCategory : DrinkCategory
                    ).map((cat) => {
                      return (
                        <Select.Item
                          key={cat}
                          value={cat}
                          label={formatEnums(cat)}
                        />
                      )
                    })}
                  </Select>
                </FormControl>
              )}
              <FormControl marginTop={"20px"}>
                <FormControl.Label>Name</FormControl.Label>
                <SearchableDropdown
                  items={
                    item.subCategory ? getAreaSelectOptions(item.area) : []
                  }
                  onItemSelect={(itm) => {
                    itemName = itm.name
                    setItem({
                      ...item,
                      name: itm.name,
                    })
                  }}
                  onTextChange={(text) => {
                    itemName = text
                  }}
                  containerStyle={{
                    padding: 5,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: theme.colors.accent[100],
                  }}
                  placeholder={"Help"}
                  placeholderTextColor={theme.colors.accent[300]}
                  textInputStyle={{ padding: 2 }}
                  itemsContainerStyle={{ padding: 5, maxHeight: 110 }}
                  itemStyle={{
                    padding: 5,
                    borderColor: theme.colors.accent[300],
                    borderTopWidth: 1,
                  }}
                  itemTextStyle={{
                    color: theme.colors.accent[200],
                    fontWeight: "bold",
                  }}
                  textInputProps={{
                    value: item.name ? item.name : undefined,
                    style: { color: theme.colors.accent[100] },
                    onEndEditing: () => {
                      if (itemName) {
                        setItem({
                          ...item,
                          name: itemName,
                        })
                      }
                      if (item.subCategory && item.name) {
                        showItemReady()
                      }
                    },
                  }}
                />
              </FormControl>
              <FormControl marginTop={"20px"}>
                <FormControl.Label>Assigned To</FormControl.Label>
                <Select
                  onValueChange={(val) => setItem({ ...item, itemUserId: val })}
                  placeholder="Select User"
                  borderColor={theme.colors.accent[100]}
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
