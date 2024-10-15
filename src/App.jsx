import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoUploader from './component/VideoUploader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex flex-col items-center space-y-9 justify-center py-9'>

        <h1 className='text-3xl font-bold text-gray-700 dark:text-gray-100'>
          Welcome to <span className='text-red-700'>EPadhai</span>
        </h1>
        <VideoUploader />
        
      </div>
    </>
  )
}

export default App
