import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store.js'
import {Provider} from 'react-redux'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Homescreen } from './screens/Homescreen.jsx'
import { Loginscreen } from './screens/Loginscreen.jsx'
import { Registerscreen } from './screens/Registerscreen.jsx'
import { Profilescreen } from './screens/Profilescreen.jsx'
import {PrivateRoute} from './components/PrivateRoute.jsx'
import Dashboardscreen from './screens/Dashboardscreen.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="/login" element={<Loginscreen/>} />
      <Route path="/register" element={<Registerscreen/>} />
      <Route path='' element={<PrivateRoute/>} >
        <Route path="/profile" element={<Profilescreen/>} />
        <Route path="/dashboard" element={<Dashboardscreen/>} />
      </Route>
      <Route index={true} path="/" element={<Homescreen />} />
      {/* <Route path="/profile" element={<Profilescreen/>} /> */}
      <Route path="*" element={<div>Not Found</div>} />
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={routes}/>
    </React.StrictMode>,
  </Provider>,
)
