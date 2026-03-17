import { useEffect, useState } from 'react'
import './coming_soon.css'

const Coming_Soon = () =>{
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

export default Coming_Soon