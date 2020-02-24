import React, { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { gql } from "apollo-boost"
import Loader from "../../components/Loader"
import { useQuery, useSubscription } from "react-apollo-hooks"
import Chart from "../../components/Chart"

export const ME = gql`
  {
    me {
      id
      avatar
      username
    }
  }
`
// see_existToggle {
//   id
//   toggle
// }

export default ({ navigation }) => {
  const { loading, data } = useQuery(ME)
  return <ScrollView>{loading ? <Loader /> : data && data.me && <Chart {...data.me} />}</ScrollView>
}

//  const { data } = useSubscription(NEW_SECONDS, {
//   variables: {
//     userID: id
//   }
// })
// const [existTime1, setExistTime1] = useState(existTime)

// const handleNewexistTime = () => {
//   console.log(data)
//   if (data !== undefined) {
//     const { new_existTime } = data
//     setExistTime1(new_existTime)
//   } else {
//     setExistTime1(existTime)
//   }
// }
// useEffect(() => {
//   handleNewexistTime()
// }, [data])

// {loading ? <Loader /> : data && data.myTime && <Chart {...data.myTime} />}
// {loading ? <Loader /> : data && data.me && <Chart {...data.me} />}
