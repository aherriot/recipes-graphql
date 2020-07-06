const { UserInputError } = require('apollo-server')
const uuid = require('uuid')
const recipeData = require('../db/recipeData')
const favouriteData = require('../db/favouriteData')

const getRecipe = (parent, args, context, info) => {
  const recipe = recipeData.find((recipe) => recipe.id === args.id)
  return recipe
}

const getRecipes = (parent, args, context, info) => {
  const recipes = recipeData.filter((recipe) => recipe.course === args.course)
  return recipes
}

const createRecipe = (parent, { course, title, description }, context) => {
  const newRecipe = {
    id: uuid.v4(),
    course,
    title,
    description,
  }

  recipeData.push(newRecipe)

  return newRecipe
}
const editRecipe = (parent, { id, course, title, description }, context) => {
  const recipe = recipeData.find((val) => val.id === id)
  if (!recipe) {
    throw new UserInputError('Recipe not Found', { errorCode: 'NOT_FOUND' })
  }

  if (course) {
    recipe.course = course
  }

  if (title) {
    recipe.title = title
  }

  if (description) {
    recipe.description = description
  }

  return recipe
}

const likeRecipe = (_, { userId, recipeId }) => {
  const existingLike = favouriteData.find(
    (val) => val.recipeId === recipeId && val.userId === userId
  )
  if (existingLike) {
    throw new UserInputError('Already likes this recipe', {
      errorCode: 'DUPLICATE',
    })
  }

  favouriteData.push({ userId, recipeId })
  return true
}

const unlikeRecipe = (_, { userId, recipeId }) => {
  const prevLength = favouriteData.length
  const index = favouriteData.findIndex(
    (val) => val.recipeId === recipeId && val.userId === userId
  )
  favouriteData.splice(index, 1)
  if (prevLength === favouriteData.length) {
    throw new UserInputError('Did not already like this recipe.', {
      errorCode: 'NOT_FOUND',
    })
  }

  return true
}

module.exports = {
  getRecipe,
  getRecipes,
  createRecipe,
  editRecipe,
  likeRecipe,
  unlikeRecipe,
}
