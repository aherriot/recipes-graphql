import React from 'react'
import { useQuery, useMutation } from 'urql'
import { loader } from 'graphql.macro'

import Header from 'commonComponents/Header'

const getRecipeQuery = loader('./GetRecipe.graphql')
const likeRecipeMutation = loader('./LikeRecipe.graphql')
const unlikeRecipeMutation = loader('./UnlikeRecipe.graphql')

type Favourite = {
  id: string
  username: string
}

type Recipe = {
  id: string
  title: string
  description: string
  user: [
    {
      id: string
      username: string
    }
  ]
  favourites: [Favourite]
}

interface Props {
  match: {
    params: {
      recipeId: string
    }
  }
}

const Recipe = ({
  match: {
    params: { recipeId },
  },
}: Props) => {
  const [res] = useQuery({
    query: getRecipeQuery,
    variables: {
      id: recipeId,
    },
  })
  const [, executeLikeRecipe] = useMutation(likeRecipeMutation)
  const [, executeUnlikeRecipe] = useMutation(unlikeRecipeMutation)

  const recipe: Recipe | null = res?.data?.recipe
  const userId: string | null = window.localStorage.getItem('userId')
  let currentUserLikesRecipe = recipe?.favourites?.find(
    (fav: Favourite) => fav.id === userId
  )

  const onUnlike = () =>
    executeUnlikeRecipe({
      userId: userId,
      recipeId: recipeId,
    })
  const onLike = () => executeLikeRecipe({ userId: userId, recipeId: recipeId })

  return (
    <div>
      <Header />
      {recipe && (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <div>Number of likes: {recipe.favourites.length}</div>
          {currentUserLikesRecipe ? (
            <button onClick={onUnlike}>Unlike</button>
          ) : (
            <button onClick={onLike}>Like</button>
          )}
        </>
      )}
    </div>
  )
}

export default Recipe
