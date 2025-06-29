import { useEffect, useState } from 'react'
import './App.css'
import Logo from './assets/Logo.svg'

interface WhitelistData {
  terms: string[];
  websites: string[];
}

interface UICustomization {
  flagStyle: 'asterisk' | 'blur' | 'highlight';
  highlightColor: string;
  showHighlight: boolean;
}

const HIGHLIGHT_COLOR_PRESETS = [
  { name: 'Soft Red', value: '#ffcdd2' },
  { name: 'Soft Blue', value: '#bbdefb' },
  { name: 'Soft Yellow', value: '#fff9c4' },
  { name: 'Soft Green', value: '#c8e6c9' },
  { name: 'Soft Purple', value: '#e1bee7' }
];

function App() {
  const [enabled, setEnabled] = useState(false)
  const [sensitivity, setSensitivity] = useState<'low' | 'medium' | 'high'>('medium')
  const [language, setLanguage] = useState<'tagalog' | 'english' | 'mixed'>('mixed')
  const [whitelist, setWhitelist] = useState<WhitelistData>({
    terms: [],
    websites: []
  })
  const [newTerm, setNewTerm] = useState('')
  const [newWebsite, setNewWebsite] = useState('')
  const [uiCustomization, setUiCustomization] = useState<UICustomization>({
    flagStyle: 'asterisk',
    highlightColor: '#ffebee',
    showHighlight: true
  })
  const [showWhitelistPanel, setShowWhitelistPanel] = useState(false)
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false)

  useEffect(() => {
    // Load initial state
    chrome.storage.local.get(
      ['enabled', 'sensitivity', 'language', 'whitelist', 'uiCustomization'], 
      (result: { 
        enabled?: boolean;
        sensitivity?: 'low' | 'medium' | 'high';
        language?: 'tagalog' | 'english' | 'mixed';
        whitelist?: WhitelistData;
        uiCustomization?: UICustomization;
      }) => {
        setEnabled(result.enabled ?? false)
        setSensitivity(result.sensitivity ?? 'medium')
        setLanguage(result.language ?? 'mixed')
        setWhitelist(result.whitelist ?? { terms: [], websites: [] })
        setUiCustomization(result.uiCustomization ?? {
          flagStyle: 'asterisk',
          highlightColor: '#ffebee',
          showHighlight: true
        })
      }
    )
  }, [])

  const toggleExtension = () => {
    const newState = !enabled
    setEnabled(newState)
    chrome.storage.local.set({ enabled: newState })
  }

  const handleSensitivityChange = (value: 'low' | 'medium' | 'high') => {
    setSensitivity(value)
    chrome.storage.local.set({ sensitivity: value })
  }

  const handleLanguageChange = (value: 'tagalog' | 'english' | 'mixed') => {
    setLanguage(value)
    chrome.storage.local.set({ language: value })
  }

  const addToWhitelist = (type: 'terms' | 'websites', value: string) => {
    if (!value.trim()) return

    const newWhitelist = {
      ...whitelist,
      [type]: [...whitelist[type], value.trim()]
    }
    setWhitelist(newWhitelist)
    chrome.storage.local.set({ whitelist: newWhitelist })

    if (type === 'terms') {
      setNewTerm('')
    } else {
      setNewWebsite('')
    }
  }

  const removeFromWhitelist = (type: 'terms' | 'websites', value: string) => {
    const newWhitelist = {
      ...whitelist,
      [type]: whitelist[type].filter(item => item !== value)
    }
    setWhitelist(newWhitelist)
    chrome.storage.local.set({ whitelist: newWhitelist })
  }

  const updateUiCustomization = (key: keyof UICustomization, value: string | boolean) => {
    const newCustomization = {
      ...uiCustomization,
      [key]: value
    }
    setUiCustomization(newCustomization)
    chrome.storage.local.set({ uiCustomization: newCustomization })
  }

  return (
    <div className="container" style={{ width: '400px' }}>
      <div className="header">
        <img src={Logo} alt="MURAi" className="logo" />
      </div>

      <div className="control-panel">
        <div className="control-group enable-group">
          <span className="switch-label">Enable Protection</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={enabled}
              onChange={toggleExtension}
            />
            <span className="slider"></span>
          </label>
        </div>

        {enabled && (
          <>
            <div className="control-group">
              <label>Language</label>
              <div className="button-group">
                {['tagalog', 'english', 'mixed'].map((lang) => (
                  <button
                    key={lang}
                    className={`option-button ${language === lang ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(lang as 'tagalog' | 'english' | 'mixed')}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label>Sensitivity</label>
              <div className="button-group">
                {['low', 'medium', 'high'].map((level) => (
                  <button
                    key={level}
                    className={`option-button ${sensitivity === level ? 'active' : ''}`}
                    onClick={() => handleSensitivityChange(level as 'low' | 'medium' | 'high')}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <button 
                className="panel-toggle"
                onClick={() => setShowWhitelistPanel(!showWhitelistPanel)}
              >
                {showWhitelistPanel ? 'Hide' : 'Show'} Whitelist Options
              </button>
              {showWhitelistPanel && (
                <div className="whitelist-panel">
                  <div className="whitelist-section">
                    <label className="whitelist-label">Whitelist Term</label>
                    <div className="input-group">
                      <input
                        type="text"
                        value={newTerm}
                        onChange={(e) => setNewTerm(e.target.value)}
                        placeholder="Enter term to whitelist"
                        className="whitelist-input"
                      />
                      <button className="whitelist-add-btn" onClick={() => addToWhitelist('terms', newTerm)}>Add</button>
                    </div>
                    <div className="whitelist-items">
                      {whitelist.terms.map((term) => (
                        <div key={term} className="whitelist-item">
                          <span className="whitelist-item-text">{term}</span>
                          <button className="whitelist-remove-btn" onClick={() => removeFromWhitelist('terms', term)}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="whitelist-section">
                    <label className="whitelist-label">Whitelist Website</label>
                    <div className="input-group">
                      <input
                        type="text"
                        value={newWebsite}
                        onChange={(e) => setNewWebsite(e.target.value)}
                        placeholder="Enter website URL"
                        className="whitelist-input"
                      />
                      <button className="whitelist-add-btn" onClick={() => addToWhitelist('websites', newWebsite)}>Add</button>
                    </div>
                    <div className="whitelist-items">
                      {whitelist.websites.map((website) => (
                        <div key={website} className="whitelist-item">
                          <span className="whitelist-item-text">{website}</span>
                          <button className="whitelist-remove-btn" onClick={() => removeFromWhitelist('websites', website)}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="control-group">
              <button 
                className="panel-toggle"
                onClick={() => setShowCustomizationPanel(!showCustomizationPanel)}
              >
                {showCustomizationPanel ? 'Hide' : 'Show'} UI Customization
              </button>
              {showCustomizationPanel && (
                <div className="customization-panel">
                  <div className="customization-option">
                    <label>Flag Style</label>
                    <div className="button-group">
                      {['asterisk', 'blur', 'highlight'].map((style) => (
                        <button
                          key={style}
                          className={`option-button ${uiCustomization.flagStyle === style ? 'active' : ''}`}
                          onClick={() => updateUiCustomization('flagStyle', style)}
                        >
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="customization-option">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={uiCustomization.showHighlight}
                        onChange={(e) => updateUiCustomization('showHighlight', e.target.checked)}
                      />
                      <span className="checkbox-text">Show Highlight</span>
                    </label>
                  </div>

                  {uiCustomization.showHighlight && (
                    <div className="customization-option">
                      <label>Highlight Color</label>
                      <div className="color-presets">
                        {HIGHLIGHT_COLOR_PRESETS.map((color) => (
                          <button
                            key={color.value}
                            className={`color-preset ${uiCustomization.highlightColor === color.value ? 'active' : ''}`}
                            style={{ backgroundColor: color.value }}
                            onClick={() => updateUiCustomization('highlightColor', color.value)}
                            title={color.name}
                          />
                        ))}
                      </div>
                      <input
                        type="color"
                        value={uiCustomization.highlightColor}
                        onChange={(e) => updateUiCustomization('highlightColor', e.target.value)}
                        className="color-picker"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="status-panel">
        <div className="status-text">
          Protection is {enabled ? 'enabled' : 'disabled'}
        </div>
        {enabled && (
          <div className="status-details">
            Language: {language.charAt(0).toUpperCase() + language.slice(1)} |
            Sensitivity: {sensitivity.charAt(0).toUpperCase() + sensitivity.slice(1)}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
