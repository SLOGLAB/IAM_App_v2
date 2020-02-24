import React from "react"
import styled from "styled-components"
//import PropTypes from "prop-types"
//import { ActivityIndicator } from "react-native"

const Touchable = styled.TouchableOpacity``
const Container = styled.View`
  background-color: grey;
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: 100px;
  margin-top: 10px;
`
const Text2 = styled.Text`
  color: black;
  text-align: center;
  font-weight: 600;
`
const Button1 = ({ text, onPress }) => (
  <Touchable onPress={onPress}>
    <Container>
      <Text2>{text}</Text2>
    </Container>
  </Touchable>
)
// Button1.PropTypes = {
//   onPress: PropTypes.func.isRequired
// }
export default Button1
