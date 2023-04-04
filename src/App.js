
import React, { Component } from 'react'
import NavBar from './componenet/NavBar';
import News from './componenet/News';
import Spin from './componenet/Spin';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Spin onclick={console.log("hi my ghost")} />
          <Routes>
            <Route exact path="/" element={<News key="genral" pageSize={12} country="in" category="science" />} />
            <Route exact path="/business" element={<News key="buisness" pageSize={12} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={12} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News key="genral" pageSize={12} country="in" category="general" />} />
            <Route exact path="/health" element={<News key="health" pageSize={12} country="in" category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={12} country="in" category="science" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={12} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={12} country="in" category="technology" />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

