import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Provider as GraphqlProvider } from 'urql'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import theme from './theme'
import graphqlClient from './graphqlClient'

import Home from './routes/Home'
import Login from './routes/Login'
import Profile from './routes/Profile'
import Recipe from './routes/Recipe'
import NewRecipe from './routes/NewRecipe'
import Errors from './routes/Errors'
import NonFound from './routes/NotFound'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GraphqlProvider value={graphqlClient}>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/profiles/:userId' exact component={Profile}></Route>
            <Route path='/recipes/:recipeId' exact component={Recipe}></Route>
            <Route path='/recipes/new' exact component={NewRecipe}></Route>
            <Route path='/errors' exact component={Errors}></Route>
            <Route component={NonFound} />
          </Switch>
        </Router>
      </GraphqlProvider>
    </ThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: helvetica, arial, sans-serif;
  }

  body {
    color: red;
  }
`
export default App
