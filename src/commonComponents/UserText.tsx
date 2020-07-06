import React from 'react'
import styled from 'styled-components'

interface Props {
  children: string
}

const UserText = ({ children }: Props) =>
  children
    .split('\n')
    .map((paragraph, i) =>
      paragraph ? (
        <StyledP key={i}>{paragraph}</StyledP>
      ) : (
        <StyledP key={i}>&nbsp;</StyledP>
      )
    )

const StyledP = styled.p`
  font-size: 14px;
`

export default UserText
