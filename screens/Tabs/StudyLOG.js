import React, { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import gql from "graphql-tag"
import Loader from "../../components/Loader"
import { useQuery, useSubscription } from "react-apollo-hooks"
import Chart from "../../components/Chart"
import withSuspense from "../../components/Charts/withSuspense"

const ME = gql`
  {
    me {
      id
      avatar
      username
    }
  }
`

function StudyLOG() {
  const { loading, data } = useQuery(ME, {
    suspend: true
  })
  return <ScrollView>{loading ? <Loader /> : data && data.me && <Chart {...data.me} />}</ScrollView>
}
export default withSuspense(StudyLOG)

// see_existToggle {
//   id
//   toggle
// }

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
