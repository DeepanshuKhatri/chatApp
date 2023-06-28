import React from 'react'
import Auth from './components/Auth'
import Home from './pages/Home'
import { auth } from './config/firebase'
import {useAuthState} from "react-firebase-hooks/auth";



const App = () => {
  const [user] = useAuthState(auth);
  console.log(user)
  return (
    <div>
      {/* <Auth/> */}
      {!user ? <Auth/> : <Home/>}
      {/* <Home/> */}
    </div>
  )
}

export default App