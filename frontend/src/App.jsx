import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './App.css'
import { Toaster } from 'react-hot-toast';   // 🔥 Import this


function App() {

  return (
    <>
       <Navbar/>
       <Outlet/>
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 1000,
          style: {
            fontSize: '14px',
          },
        }}
      />
    </>
  )
}

export default App
