import { Box, Button, FormControl, Input, Select, VStack } from "native-base"
import React from "react"
import SlideRightView from "../../components/SlideRightView"
import { Formik } from "formik"
import {
  GroupType,
  useCreateGroupMutation,
  useCreateUserGroupMutation,
} from "../../generated/graphql"
import { formatEnums } from "../../utils/helpers"
import { useAuthContext } from "../../contexts/AuthContext"
import uuid from "react-native-uuid"
import { NavigationProps } from "../Authentication/Login"

const AddGroup = ({ navigation }: NavigationProps): JSX.Element => {
  // context
  const { authData } = useAuthContext()
  // states
  const [addGroup] = useCreateGroupMutation()
  const [addUserGroup] = useCreateUserGroupMutation()

  interface GroupProps {
    name: string
    type: GroupType
  }
  const onSubmit = async (values: GroupProps) => {
    const groupId = uuid.v4().toString()
    try {
      await addGroup({
        variables: {
          input: {
            id: groupId,
            name: values.name,
            type: values.type,
          },
        },
      })
      await addUserGroup({
        variables: {
          input: {
            id: uuid.v4().toString(),
            userID: authData.username,
            groupID: groupId,
          },
        },
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <SlideRightView>
      <Formik
        initialValues={{
          name: "Huis Woes",
          type: GroupType.Digs,
        }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => {
          return (
            <Box alignItems={"center"}>
              <VStack width="80%" space={4}>
                <FormControl isRequired>
                  <FormControl.Label>Group Name</FormControl.Label>
                  {console.log("errors")}
                  <Input
                    onBlur={handleBlur("name")}
                    placeholder="Huis Woes"
                    onChangeText={handleChange("name")}
                    value={values.name}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormControl.Label>Group Type</FormControl.Label>
                  <Select>
                    {Object.keys(GroupType).map((type) => (
                      <Select.Item
                        key={type}
                        label={formatEnums(type)}
                        value={type}
                      />
                    ))}
                  </Select>
                  {/* <Input onBlur={handleBlur('type')} placeholder="Digs" onChangeText={handleChange('type')} value={values.type} /> */}
                </FormControl>

                <Button onPress={() => handleSubmit()} colorScheme="pink">
                  Submit
                </Button>
              </VStack>
            </Box>
          )
        }}
      </Formik>
      <VStack></VStack>
    </SlideRightView>
  )
}

export default AddGroup
