import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Load initial state
    chrome.storage.local.get(['enabled'], (result: { enabled?: boolean }) => {
      setEnabled(result.enabled ?? false)
    })
  }, [])

  const toggleExtension = () => {
    const newState = !enabled
    setEnabled(newState)
    chrome.storage.local.set({ enabled: newState })
  }

  return (
    <div className="container">
      <h1>MURAi</h1>
      
      <div className="control-panel">
        <button 
          onClick={toggleExtension}
          className={`toggle-button ${enabled ? 'enabled' : 'disabled'}`}
        >
          {enabled ? 'Disable' : 'Enable'} Protection
        </button>
      </div>

      <div className="status-text">
        Protection is currently {enabled ? 'enabled' : 'disabled'}
      </div>
    </div>
  )
}

export default App
