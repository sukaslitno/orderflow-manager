import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import Dashboard from './screens/Dashboard'
import OrderDetail from './screens/OrderDetail'

function AnimatedRoutes() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState<'enter' | 'exit' | 'idle'>('idle')
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      const isGoingDeeper = location.pathname.length > prevPath.current.length
      prevPath.current = location.pathname

      if (isGoingDeeper) {
        setTransitionStage('enter')
        setDisplayLocation(location)
      } else {
        setTransitionStage('exit')
        setTimeout(() => {
          setDisplayLocation(location)
          setTransitionStage('idle')
        }, 250)
      }
    }
  }, [location])

  useEffect(() => {
    if (transitionStage === 'enter') {
      const timer = setTimeout(() => setTransitionStage('idle'), 300)
      return () => clearTimeout(timer)
    }
  }, [transitionStage])

  const getStyle = (): React.CSSProperties => {
    if (transitionStage === 'enter') {
      return {
        animation: 'slide-in-right 300ms ease-out forwards',
      }
    }
    if (transitionStage === 'exit') {
      return {
        animation: 'slide-out-right 250ms ease-in forwards',
      }
    }
    return {}
  }

  return (
    <div style={getStyle()}>
      <Routes location={displayLocation}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/order/:id" element={<OrderDetail />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
