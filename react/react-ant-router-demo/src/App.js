import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Layout from './page/Layout';
import 'antd/dist/antd.css';

// hashRouter   #   hashchange
// historyRouter  不带 #    BrowserRouter 实现方式是通过H5的api History

function App() {
  return (
    <Router>
      <Route path="/" component={Layout} ></Route>
    </Router>
  );
}

export default App;
