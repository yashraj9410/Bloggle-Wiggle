import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import conf from './conf/conf'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'

// we will do the main thing here that is check if user is logged in or out 
// dispatch connects react to redux
function App() {
  const [loading,setLoading] = useState(true); 
  const dispatch = useDispatch();

  // check the status of current user 
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch(error => console.log(error))
    .finally(()=> setLoading(false))
  },[])
  
  return !loading ? (
    <div className='min-h-sc flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
         TODO: {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : (null)
}

export default App
