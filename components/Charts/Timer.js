import React, { useState, useEffect } from "react"
import styled from "styled-components"
import ProgressO from "./ProgressCircle"
import gql from "graphql-tag"
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks"

const Text = styled.Text`
  font-size: 20px;
`
const PText = styled.Text`
  font-size: 25px;
  margin-left: 30px;
`
const View = styled.View``

const Timer = ({ existTime, targetTime }) => {
  // const [seconds, setSeconds] = useState(0)
  // const minutes = Math.floor(seconds / 60)
  // const hour = Math.floor(minutes / 60)
  // useEffect(() => {
  //   if (exist) {
  //     interval = setInterval(() => {
  //       setSeconds(seconds => seconds + 1)
  //     }, 1000)
  //   } else if (!exist && seconds !== 0) {
  //     clearInterval(interval)
  //     // handleNewexistTime()
  //     // sendMessageMutation()
  //   }
  // }, [exist])

  return (
    <View>
      <ProgressO number={existTime / targetTime} />
      <PText>{Math.floor((existTime / targetTime) * 100)}%</PText>
      {/* <Text>
        {hour < 10 ? `0${hour}` : hour}:{minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds - minutes * 60}
      </Text> */}
    </View>
  )
}
export default Timer

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

// const SEND_SECONDS = gql`
//   mutation new_existTime($id: String) {
//     update_existTime(userID: $id) {
//       id
//       existTime
//     }
//   }
// `
// const sendMessageMutation = useMutation(SEND_SECONDS, {
//   variables: {
//     id: ID,
//     existTime: seconds
//   }
// })

// const min = {time.sec} / 60;
// const hour = min / 60;
// const sec = sec % 60;
// const min = min % 60;

// const formatTime(sec){
//   let minutes = Math.floor(sec/60)
//    sec-=minutes*60;
// let seconds = parseInt(sec %60,10)
// return `${minutes<10  ?  `0${minutes}` : minutes}
//         :
//         ${seconds <10 ? `0${seconds}` :seconds}`;
// }
