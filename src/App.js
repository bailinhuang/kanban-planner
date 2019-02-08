import React, { Component } from 'react'
import './App.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './components/login.component/login.component'
import Board from './components/board.component/board.component'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons' 

library.add(faPlus)
class App extends Component {
  
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch> 
            <Route exact path='/' component={Login} /> 
            <Route strict path='/board' component={Board} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
