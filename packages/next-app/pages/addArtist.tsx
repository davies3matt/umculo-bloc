import { Button, Input } from "@chakra-ui/react"
import { Formik } from "formik"
import React, { Fragment } from "react"
import { useCreateArtistMutation } from "../src/generated/graphql"

const MarketPlace = () => {
  const [createUser, { loading }] = useCreateArtistMutation({
    onError: (err) => console.log("ERROR", err),
    onCompleted: () => console.log("SUCCESSSSS!!🐍"),
  })
  return (
    <Fragment>
      <Formik
        initialValues={{
          name: "",
          imageUrl: "",
        }}
        onSubmit={(values) => {
          console.log(values)
          createUser({
            variables: {
              input: {
                name: values.name,
                image: values.imageUrl,
              },
            },
          })
        }}
      >
        {({ setFieldValue, handleSubmit }) => (
          <Fragment>
            <Input
              onChange={(e) => {
                setFieldValue("name", e.target.value)
              }}
              placeholder="Artist Name"
            />
            <Input
              onChange={(e) => {
                setFieldValue("imageUrl", e.target.value)
              }}
              placeholder="Image URL"
            />
            <Button isLoading={loading} onClick={() => handleSubmit()}>
              Create Artist
            </Button>
          </Fragment>
        )}
      </Formik>
    </Fragment>
  )
}

export default MarketPlace
