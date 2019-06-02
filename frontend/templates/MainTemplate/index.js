import Meta from '../../components/atoms/Meta'
import AppBar from '../../components/molecules/AppBar'
import { Provider } from 'reakit' // we use Provider to make sure SSR is still accessible
import "regenerator-runtime/runtime"

import "./index.scss"

const MainTemplate = (props) => (
  <Provider>
    <div className="main-template">
      <Meta />
      <AppBar />
      {props.children}
    </div>
  </Provider>
)
  
export default MainTemplate
