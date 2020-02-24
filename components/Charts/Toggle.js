import React, { useEffect, useState } from "react"
import styled from "styled-components"
import gql from "graphql-tag"
import { useQuery, useSubscription, useMutation } from "react-apollo-hooks"
import { BackHandler } from "react-native"

const View = styled.View``

const PeopleIn = styled.Text`
  font-size: 25;
  margin-bottom: 30px;
  border: 1px solid;
  justify-content: center;
  align-items: center;
  padding-left: 85px;
  padding-top: 20px;
  width: 200px;
  height: 100px;
  background-color: green;
`

const PeopleOut = styled.Text`
  font-size: 25;
  margin-bottom: 30px;
  border: 1px solid;
  justify-content: center;
  align-items: center;
  padding-left: 85px;
  padding-top: 20px;
  width: 200px;
  height: 100px;
  background-color: red;
`
// const SEND_MESSAGE = gql`
//   mutation update_existToggle($userID: String!, $existToggle: Boolean!) {
//     update_existToggle(userID: $userID, existToggle: $existToggle)
//   }
// `

const MY_TO = gql`
  query see_existToggle {
    see_existToggle {
      id
      toggle
    }
  }
`
const NEW_TO = gql`
  subscription new_existToggle($userID: String!) {
    new_existToggle(userID: $userID)
  }
`
function Toggle({ userid }) {
  const {
    data: { see_existToggle }
  } = useQuery(MY_TO, {
    suspend: true
  })
  const { data } = useSubscription(NEW_TO, {
    variables: { userID: userid }
  })
  // const [see_existToggle, setsee_existToggle]=useState(see_existToggle)

  // const handle = () => {
  //   if (data !== undefined) {
  //     const { new_existToggle } = data
  //     see_existToggle(new_existToggle)
  //     // toggleMutation()
  //   }
  // }
  useEffect(() => {
    // console.log(data)
    // handle()
  }, [data])

  return (
    <View key={see_existToggle.id}>
      {see_existToggle.toggle ? <PeopleIn>a</PeopleIn> : <PeopleOut>a</PeopleOut>}
    </View>
  )
}

export default Toggle

// const toggleMutation = useMutation(SEND_MESSAGE, {
//   variables: {
//     userID: see_existToggle.id,
//     existToggle: see_existToggle.toggle
//   }
// })
