import { useEffect, useState } from 'react'
import './App.css'
// import Header from './Componants/Header'
// import Landing from './Pages/Landing'

function App() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = globalThis.setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)

    return () => globalThis.clearInterval(interval)
  }, [])

  return (
    <div className='page'>
      <h1 id='txt'>Coming Soon{dots}</h1>
    </div>
  )
}

export default App
