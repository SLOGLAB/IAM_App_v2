import React from "react"
import { ProgressCircle } from "react-native-svg-charts"
import { View, Text } from "react-native"

const ProgressO = ({ number }) => {
  return (
    <View>
      <ProgressCircle
        style={{ height: 100 }}
        progress={number}
        progressColor={"rgb(134, 65, 244)"}
      />
    </View>
  )
}

export default ProgressO
