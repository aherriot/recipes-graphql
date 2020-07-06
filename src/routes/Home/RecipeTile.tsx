import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface Props {
  id: string
  title: string
  username: string
}

function RecipeTile({ id, title, username }: Props) {
  return (
    <Link to={`/recipes/${id}`}>
      <StyledRecipeTile>
        {title} by {username}
      </StyledRecipeTile>
    </Link>
  )
}

const StyledRecipeTile = styled.div`
  width: 200px;
  height: 200px;
  flex: 0 0 400px;
  background-color: grey;
  margin: 20px;
  border: 1px solid grey;
`

export default RecipeTile
