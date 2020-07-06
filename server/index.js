const { ApolloServer, gql, UserInputError } = require('apollo-server')
const recipes = require('./controllers/recipes')
const users = require('./controllers/users')

const userData = require('./db/userData')

let favouriteData = require('./db/favouriteData')

const schema = gql`
  type Query {
    recipe(id: ID!): Recipe
    recipes(course: Course): [Recipe]
  }

  type Mutation {
    login(loginInput: LoginInput!): User
    createAccount(createAccountInput: CreateAccountInput!): User

    createRecipe(createRecipeInput: CreateRecipeInput!): Recipe
    editRecipe(editRecipeInput: EditRecipeInput!): Recipe
    likeRecipe(userId: ID!, recipeId: ID!): Boolean
    unlikeRecipe(userId: ID!, recipeId: ID!): Boolean
  }

  enum Course {
    APPETIZER
    SALAD
    SOUP
    MAIN
    DESSERT
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Recipe {
    id: ID
    userId: ID!
    user: User
    course: Course!
    title: String!
    description: String!
    favouriteCount: Int
    favourites: [User]!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input CreateAccountInput {
    username: String!
    password: String!
    email: String!
  }

  input CreateRecipeInput {
    course: Course!
    title: String!
    description: String!
  }

  input EditRecipeInput {
    course: Course
    title: String
    description: String
  }
`
// Resolver map
const resolvers = {
  Query: {
    recipe: recipes.getRecipe,
    recipes: recipes.getRecipes,
  },
  Mutation: {
    login: users.login,
    createAccount: users.createAccount,
    createRecipe: recipes.createRecipe,
    editRecipe: recipes.editRecipe,
    likeRecipe: recipes.likeRecipe,
    unlikeRecipe: recipes.unlikeRecipe,
  },
  Recipe: {
    user(parent) {
      return userData.find((user) => user.id === parent.userId)
    },
    favouriteCount(parent) {
      return favouriteData.reduce(
        (acc, val) => (val.recipeId === parent.id ? acc + 1 : acc),
        0
      )
    },
    favourites(parent) {
      return favouriteData
        .filter((val) => val.recipeId === parent.id)
        .map((val) => userData.find((user) => user.id === val.userId))
    },
  },
}

const server = new ApolloServer({ typeDefs: schema, resolvers })

// Launch the server
const PORT = 3002 || process.env.PORT
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
