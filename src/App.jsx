import Sidebar from './components/sidebar/Sidebar'

import { Outlet } from "react-router-dom"

import './App.css'

function App() {

  return (
    <div className='main'>
      <Sidebar />
      <div className='content'>
        <Outlet />

      </div>

    </div>
  )
}

export default App
