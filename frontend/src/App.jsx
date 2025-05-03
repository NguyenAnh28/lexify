import { useState } from 'react'
import { Button, Typography } from '@mui/material'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Typography variant="h4" gutterBottom>
          Welcome to Vite + React + MUI
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setCount(count + 1)}
        >
          Count is {count}
        </Button>
      </div>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
