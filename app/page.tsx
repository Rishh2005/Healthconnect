"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Shield, Zap } from 'lucide-react'
import { useLanguage } from './contexts/LanguageContext'
import { translations } from './utils/translations'

export default function Home() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 doodle-bg">
      <motion.h1
        className="text-6xl font-bold text-blue-600 mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t.welcome}
      </motion.h1>
      <motion.p
        className="text-xl text-blue-800 mb-8 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {t.description}
      </motion.p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <FeatureCard
          icon={<Heart className="w-12 h-12 text-blue-500" />}
          title={t.personalizedCare}
          description={t.personalizedCareDesc}
        />
        <FeatureCard
          icon={<Shield className="w-12 h-12 text-blue-500" />}
          title={t.securePrivate}
          description={t.securePrivateDesc}
        />
        <FeatureCard
          icon={<Zap className="w-12 h-12 text-blue-500" />}
          title={t.instantAccess}
          description={t.instantAccessDesc}
        />
      </motion.div>
      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link href="/dashboard" className="btn btn-primary">
          {t.getStarted}
        </Link>
        <Link href="/about" className="btn btn-secondary">
          {t.learnMore}
        </Link>
      </motion.div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div
    className="card card-hover p-6 flex flex-col items-center text-center"
    whileHover={{ scale: 1.05 }}
  >
    {icon}
    <h2 className="text-xl font-semibold mt-4 mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

