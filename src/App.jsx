import { useEffect, useState } from 'react'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import { Outlet } from 'react-router-dom'
import {login,logout} from "./store/AuthSlice"
import authservice from './appwrite/auth'
import {useDispatch} from 'react-redux'


import './App.css'

function App() {
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    authservice.getCurrentUser()
               .then((userData) => {
                   if (userData) {
                       dispatch(login({userData}))
                   } else {
                       dispatch(logout())
                   }
               })
               .finally(() => setLoading(false))
  },[])

   return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-400">
      <Header />
      {/* This main will grow to fill the space between header and footer */}
      <main className="flex-grow bg-blue-50">
        <Outlet />
      </main>
      {/* Footer is pushed to bottom by flex layout */}
      <Footer />
    </div>
  ) : null;
}

export default App
