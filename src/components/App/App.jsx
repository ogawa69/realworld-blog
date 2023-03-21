import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ArticleList from '../ArticleList'
import ArticlePage from '../ArticlePage'
import Header from '../Header'

import './App.scss'

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header></Header>
        <main className="main">
          <Route path={'/'} exact component={ArticleList} />
          <Route path={'/articles'} exact component={ArticleList}></Route>
          <Route
            path={'/articles/:slug'}
            render={({ match }) => {
              return <ArticlePage slug={match.params.slug}></ArticlePage>
            }}
          ></Route>
        </main>
      </div>
    </Router>
  )
}

export default App
