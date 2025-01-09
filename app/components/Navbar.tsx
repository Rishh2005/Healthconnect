import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Calendar, FileText, MapPin, User, Info, Menu, X } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#3B82F6" />
              </svg>
              <span className="text-2xl font-bold text-blue-600">HealthConnect</span>
            </Link>
          </motion.div>
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink href="/dashboard" icon={<Home className="w-5 h-5" />}>{t.dashboard}</NavLink>
            <NavLink href="/hospitals" icon={<MapPin className="w-5 h-5" />}>{t.hospitals}</NavLink>
            <NavLink href="/records" icon={<FileText className="w-5 h-5" />}>{t.records}</NavLink>
            <NavLink href="/appointments" icon={<Calendar className="w-5 h-5" />}>{t.appointments}</NavLink>
            <NavLink href="/profile" icon={<User className="w-5 h-5" />}>{t.profile}</NavLink>
            <NavLink href="/about" icon={<Info className="w-5 h-5" />}>{t.about}</NavLink>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/dashboard" icon={<Home className="w-5 h-5" />}>{t.dashboard}</MobileNavLink>
            <MobileNavLink href="/hospitals" icon={<MapPin className="w-5 h-5" />}>{t.hospitals}</MobileNavLink>
            <MobileNavLink href="/records" icon={<FileText className="w-5 h-5" />}>{t.records}</MobileNavLink>
            <MobileNavLink href="/appointments" icon={<Calendar className="w-5 h-5" />}>{t.appointments}</MobileNavLink>
            <MobileNavLink href="/profile" icon={<User className="w-5 h-5" />}>{t.profile}</MobileNavLink>
            <MobileNavLink href="/about" icon={<Info className="w-5 h-5" />}>{t.about}</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

const NavLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) => (
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
    <Link href={href} className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  </motion.div>
)

const MobileNavLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) => (
  <Link href={href} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md text-base font-medium">
    {icon}
    <span>{children}</span>
  </Link>
)

export default Navbar

