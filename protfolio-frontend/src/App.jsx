

import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import ProjectView from './pages/ProjectView'
import Home from './pages/Home'
import Footer from './pages/sub-components/Footer'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'

function App() {

  

  useEffect(() => {
    const wakeBackend = async () => {
      try {
        // Replace with your actual backend URL
        await fetch('http://localhost:4000/api/v1/user/wake-up')
        console.log('Backend wake-up triggered')
      } catch (error) {
        console.error('Error waking up backend:', error)
      }
    }

    wakeBackend()
  }, []) // Empty dependency array to run this only once on component mount


  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

        <Router>
          <Routes>
           <Route path='/' element={<Home/>} />
           <Route path='/project/:id' element={<ProjectView/>} />
          </Routes>
          <Footer/>
          <ToastContainer position='bottom-right' theme='dark' />
        </Router>

      </ThemeProvider>
    </>
  )
}

export default App
