"use client"

import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'
import LanguageSelector from './LanguageSelector'

const Footer = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-gray-600 text-sm mb-4 sm:mb-0">
          © 2023 HealthConnect. {t.allRightsReserved}
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">{t.privacyPolicy}</a>
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">{t.termsOfService}</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

