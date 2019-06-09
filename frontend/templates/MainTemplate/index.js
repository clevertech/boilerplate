import Meta from '../../components/atoms/Meta'
import AppBar from '../../components/molecules/AppBar'
import React from 'react'
import 'regenerator-runtime/runtime'

import './index.scss'

const MainTemplate = (props) => (
  <div className="main-template">
    <React.StrictMode />
    <Meta />
    {props.appBar ? <AppBar /> : ''}
    {props.children}
  </div>
)
  
export default MainTemplate
