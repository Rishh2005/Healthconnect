"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

const SettingsContext = createContext(null)

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    twoFactorAuth: false,
    dataSharing: true,
    smsNotifications: false,
    smsApiKey: '',
  })

  useEffect(() => {
    const savedSettings = localStorage.getItem('healthConnectSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('healthConnectSettings', JSON.stringify(settings))
    
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [settings])

  const updateSetting = (key, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value
    }))
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  )
}

