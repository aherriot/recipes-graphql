const express = require('express')
const expressGraphql = require('express-graphql')
const { buildSchema } = require('graphql')
const userData = require('./userData')
const recipeData = require('./recipeData')

const app = express()

const schema = buildSchema(`
  type Query {
    recipe(id: ID!): Recipe
    recipes(course: Course): [Recipe]
  }
  
  enum Course {
    APPETIZER
    SALAD
    SOUP
    MAIN
    DESSERT
  }

  type User {
    id: ID
    username: String
    email: String
  }

  type Recipe {
    id: ID
    userId: ID
    user: User
    course: Course
    title: String
    description: String
  }

`)

const getRecipe = (args, req, other) => {
  console.log(other.fieldNodes[0].selectionSet.selections[3].name.value)
  const recipe = recipeData.find((recipe) => recipe.id === args.id)
  recipe.user = usersData.find((user) => user.id === recipe.userId)
  return recipe
}

const getRecipes = (args) => {
  const recipes = recipeData.filter((recipe) => recipe.course === args.course)
  recipes.forEach((recipe) => {
    recipe.user = usersData.find((user) => user.id === recipe.userId)
  })
  return recipes
}

const root = {
  recipe: getRecipe,
  recipes: getRecipes,
}

app.use(
  '/graphql',
  expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

app.get('/test', (req, res) => {
  res.send('test')
})

const PORT = 3002 || process.env.PORT
app.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT};`)
})
