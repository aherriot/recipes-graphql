import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'urql'
import { loader } from 'graphql.macro'
import Header from 'commonComponents/Header'
import RecipeTile from './RecipeTile'
const recipesQuery = loader('./Recipes.graphql')

interface Recipe {
  id: string
  title: string
  user: {
    id: string
    username: string
  }
}

function Home() {
  const [res] = useQuery({
    query: recipesQuery,
  })

  return (
    <div>
      <Header />
      {res.fetching && <p>Loading...</p>}
      {res.error && <p>Error</p>}
      <h2>Salads</h2>
      <StyledRecipesSection>
        {res?.data?.salads.map((recipe: Recipe) => (
          <RecipeTile
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            username={recipe.user?.username}
          />
        ))}
      </StyledRecipesSection>

      {/* <h2>Mains</h2>
      <StyledRecipesSection>
        {res?.data?.mains.map((recipe: Recipe) => (
          <RecipeTile
            key={recipe.id}
            title={recipe.title}
            username={recipe.user?.username}
          />
        ))}
      </StyledRecipesSection> */}

      <h2>Desserts</h2>
      <StyledRecipesSection>
        {res?.data?.desserts.map((recipe: Recipe) => (
          <RecipeTile
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            username={recipe.user?.username}
          />
        ))}
      </StyledRecipesSection>
    </div>
  )
}

const StyledRecipesSection = styled.div`
  display: flex;
`

export default Home
