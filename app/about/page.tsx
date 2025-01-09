"use client"

import { motion } from 'framer-motion'
import { Heart, Shield, Zap, TrendingUp, Settings, Bell, Moon, Lock, Share, MessageCircle } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSettings } from '@/components/settings-provider'

export default function About() {
  const { settings, updateSetting } = useSettings()

  const handleSmsApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetting('smsApiKey', e.target.value)
  }

  return (
    <div className="space-y-8 p-8">
      <motion.h1
        className="text-4xl font-bold text-blue-600 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About HealthConnect
      </motion.h1>
      <motion.p
        className="text-xl text-center max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        HealthConnect is a comprehensive healthcare management system designed to streamline patient care and hospital management. Our mission is to empower individuals to take control of their health journey while providing healthcare providers with the tools they need to deliver exceptional care.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Feature
          icon={<Heart className="w-12 h-12 text-blue-500" />}
          title="Our Mission"
          description="To revolutionize healthcare management by providing an intuitive, secure, and comprehensive platform that connects patients with their healthcare providers."
        />
        <Feature
          icon={<Shield className="w-12 h-12 text-blue-500" />}
          title="Data Security"
          description="We prioritize the security and privacy of your health information, employing state-of-the-art encryption and following all relevant data protection regulations."
        />
        <Feature
          icon={<Zap className="w-12 h-12 text-blue-500" />}
          title="Innovative Features"
          description="From appointment scheduling to health record management, we're constantly innovating to bring you the best healthcare management experience possible."
        />
        <Feature
          icon={<TrendingUp className="w-12 h-12 text-blue-500" />}
          title="Future Plans"
          description="We're working on integrating AI-powered health insights, telemedicine capabilities, and expanded interoperability with various healthcare systems."
        />
      </div>
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingToggle
            icon={<Bell className="w-5 h-5" />}
            label="Enable Notifications"
            checked={settings.notifications}
            onToggle={() => updateSetting('notifications', !settings.notifications)}
          />
          <SettingToggle
            icon={<Moon className="w-5 h-5" />}
            label="Dark Mode"
            checked={settings.darkMode}
            onToggle={() => updateSetting('darkMode', !settings.darkMode)}
          />
          <SettingToggle
            icon={<Lock className="w-5 h-5" />}
            label="Two-Factor Authentication"
            checked={settings.twoFactorAuth}
            onToggle={() => updateSetting('twoFactorAuth', !settings.twoFactorAuth)}
          />
          <SettingToggle
            icon={<Share className="w-5 h-5" />}
            label="Data Sharing"
            checked={settings.dataSharing}
            onToggle={() => updateSetting('dataSharing', !settings.dataSharing)}
          />
          <SettingToggle
            icon={<MessageCircle className="w-5 h-5" />}
            label="SMS Notifications"
            checked={settings.smsNotifications}
            onToggle={() => updateSetting('smsNotifications', !settings.smsNotifications)}
          />
          <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
            <Label htmlFor="smsApiKey" className="text-sm font-medium text-gray-700">SMS API Key</Label>
            <Input
              id="smsApiKey"
              type="password"
              value={settings.smsApiKey}
              onChange={handleSmsApiKeyChange}
              className="w-48"
              placeholder="Enter API Key"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {icon}
    <h2 className="text-xl font-semibold mt-4 mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const SettingToggle = ({ icon, label, checked, onToggle }: { icon: React.ReactNode; label: string; checked: boolean; onToggle: () => void }) => (
  <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
    <div className="flex items-center space-x-2">
      {icon}
      <Label htmlFor={label} className="text-sm font-medium text-gray-700">{label}</Label>
    </div>
    <Switch id={label} checked={checked} onCheckedChange={onToggle} />
  </div>
)

