import React from "react"
import styled from "styled-components"

const ProfileStats = styled.View`
  flex-direction: row;
`
const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`
const Bold = styled.Text`
  font-weight: 600;
`

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: black;
`

const HeaderTime = ({ existTime, targetTime }) => {
  return (
    <ProfileStats>
      <Stat>
        <Bold>{existTime}</Bold>
        <StatName>existTime</StatName>
      </Stat>
      <Stat>
        <Bold>{targetTime}</Bold>
        <StatName>targetTime</StatName>
      </Stat>
    </ProfileStats>
  )
}
export default HeaderTime
