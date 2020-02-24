import React, { useState, useEffect } from "react"
import { Image, View, TouchableOpacity } from "react-native"
import styled from "styled-components"
import styles from "../styles"

import Timer from "./Charts/Timer"
import Toggle from "./Charts/Toggle"
import HeaderTime from "./Charts/HeaderTime"

import Button1 from "./Charts/Button1"
import gql from "graphql-tag"

import { useQuery, useSubscription } from "react-apollo-hooks"
//import StackedBar from "./Charts/StackedBar"

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Mid = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`
const HeaderColumn = styled.View``

const Bold = styled.Text`
  font-weight: 600;
`

const ProfileMeta = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`

const MY_TIME = gql`
  {
    myTime {
      id
      existTime
      targetTime
    }
  }
`
const UPDATED = gql`
  subscription onnew_existTime($userID: String!) {
    new_existTime(userID: $userID) {
      id
      existTime
      targetTime
    }
  }
`
function Chart({ avatar, username }) {
  const {
    data: { myTime }
  } = useQuery(MY_TIME, {
    suspend: true
  })
  const { data } = useSubscription(UPDATED, {
    variables: {
      userID: myTime.id
    }
  })

  // const [myTime, setmyTime] = useState(myTime)
  console.log(myTime)
  const handleNewTime = () => {
    if (data !== undefined) {
      const { new_existTime } = data
      myTime(new_existTime)
    }
  }
  useEffect(() => {
    handleNewTime()
  }, [data])

  return (
    <View>
      <ProfileHeader>
        <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={{ uri: avatar }} />

        <HeaderColumn key={myTime.id}>
          <HeaderTime existTime={myTime.existTime} targetTime={myTime.targetTime} />
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{username}</Bold>
      </ProfileMeta>
      <Mid key={myTime.id}>
        <Toggle userid={id} />
        <Timer existTime={myTime.existTime} targetTime={myTime.targetTime} />
      </Mid>
    </View>
  )
}

export default Chart

{
  /* <Button1 /> */
}

{
  /* <Button1 onPress={stop1} /> */
}

{
  /* <StackedBar /> */
}

// const [exist, setExist] = useState(false)
// const stop1 = () => {
//   if (exist === true) {
//     setExist(false)
//   } else {
//     setExist(true)
//   }
// }

// const UPDATED = gql`
//   subscription new_existTime($userID: String!) {
//     new_existTime(userID: $userID) {
//       id
//       existTime
//       targetTime
//     }
//   }
// `

// const { data } = useSubscription(UPDATED, {
//   variables: {
//     userID: { id }
//   }
// })
// const [myTime, setMyTime] = useState(pmyTime)

// const handleNewexistTime = () => {
//   // console.log(data)
//   if (data !== undefined) {
//     const { new_existTime } = data
//     setMyTime(new_existTime)
//   }
// }

// useEffect(() => {
//   handleNewexistTime()
// }, [data])
{
  /* 그래프 */
}
{
  /* <ProgressO number={existTime / targetTime} /> */
}
{
  /* <Mid>
        <Bold>{Math.floor((existTime / targetTime) * 100)}%</Bold>
      </Mid> */
}
