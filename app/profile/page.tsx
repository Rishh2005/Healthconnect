"use client"

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { User, Mail, Phone, Calendar, Edit, Award, Dumbbell, Brain, Flame, Zap, Heart, Smile } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

const streakData = [
  { day: 'Mon', streak: 1 },
  { day: 'Tue', streak: 2 },
  { day: 'Wed', streak: 3 },
  { day: 'Thu', streak: 4 },
  { day: 'Fri', streak: 5 },
  { day: 'Sat', streak: 6 },
  { day: 'Sun', streak: 7 },
]

const initialAchievements = [
  { id: 'ach1', name: "7-Day Streak", description: "Logged in for 7 consecutive days", completed: true, icon: <Award className="w-6 h-6 text-yellow-500" /> },
  { id: 'ach2', name: "Health Explorer", description: "Viewed all sections of the app", completed: true, icon: <User className="w-6 h-6 text-blue-500" /> },
  { id: 'ach3', name: "Appointment Master", description: "Scheduled 5 appointments", completed: false, icon: <Calendar className="w-6 h-6 text-green-500" /> },
  { id: 'ach4', name: "Record Keeper", description: "Added 10 health records", completed: false, icon: <Mail className="w-6 h-6 text-purple-500" /> },
]

const games = [
  { id: 'game1', name: "Health Quiz", description: "Test your health knowledge", completed: false, icon: <Brain className="w-6 h-6 text-indigo-500" /> },
  { id: 'game2', name: "Meditation Challenge", description: "Complete a 5-minute guided meditation", completed: false, icon: <Brain className="w-6 h-6 text-teal-500" /> },
  { id: 'game3', name: "Memory Match", description: "Match health-related cards", completed: false, icon: <Zap className="w-6 h-6 text-orange-500" /> },
  { id: 'game4', name: "Healthy Habits Bingo", description: "Complete a line of healthy habits", completed: false, icon: <Heart className="w-6 h-6 text-pink-500" /> },
]

const exercises = [
  { id: 'ex1', name: "10,000 Steps", description: "Walk 10,000 steps in a day", completed: false, icon: <Dumbbell className="w-6 h-6 text-red-500" /> },
  { id: 'ex2', name: "Yoga Session", description: "Complete a 15-minute yoga routine", completed: false, icon: <Dumbbell className="w-6 h-6 text-pink-500" /> },
  { id: 'ex3', name: "Surya Namaskar", description: "Complete 10 rounds of Sun Salutation", completed: false, icon: <Dumbbell className="w-6 h-6 text-orange-500" /> },
  { id: 'ex4', name: "Meditation", description: "Practice mindfulness for 10 minutes", completed: false, icon: <Brain className="w-6 h-6 text-purple-500" /> },
]

const yogaAsanas = [
  { id: 'yoga1', name: "Tadasana", description: "Mountain Pose for 1 minute", completed: false, icon: <Dumbbell className="w-6 h-6 text-green-500" /> },
  { id: 'yoga2', name: "Vrikshasana", description: "Tree Pose for 30 seconds each side", completed: false, icon: <Dumbbell className="w-6 h-6 text-blue-500" /> },
  { id: 'yoga3', name: "Adho Mukha Svanasana", description: "Downward-Facing Dog for 1 minute", completed: false, icon: <Dumbbell className="w-6 h-6 text-yellow-500" /> },
  { id: 'yoga4', name: "Balasana", description: "Child's Pose for 2 minutes", completed: false, icon: <Dumbbell className="w-6 h-6 text-indigo-500" /> },
]

export default function Profile() {
  const [achievements, setAchievements] = useState([...initialAchievements, ...games, ...exercises, ...yogaAsanas])
  const [dailyStreak, setDailyStreak] = useState(0)
  const [lastLoginDate, setLastLoginDate] = useState(null)
  const [showMotivationalPopup, setShowMotivationalPopup] = useState(false)
  const [completedItem, setCompletedItem] = useState(null)
  const { toast } = useToast()
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    // Simulating loading the last login date from storage
    const storedLastLoginDate = localStorage.getItem('lastLoginDate')
    if (storedLastLoginDate) {
      setLastLoginDate(new Date(storedLastLoginDate))
    }

    // Simulating loading the daily streak from storage
    const storedDailyStreak = localStorage.getItem('dailyStreak')
    if (storedDailyStreak) {
      setDailyStreak(parseInt(storedDailyStreak, 10))
    }

    // Update the streak
    updateStreak()
  }, [])

  const updateStreak = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (lastLoginDate) {
      const lastLogin = new Date(lastLoginDate)
      lastLogin.setHours(0, 0, 0, 0)

      const diffDays = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        // Consecutive day, increase streak
        setDailyStreak(prevStreak => prevStreak + 1)
      } else if (diffDays > 1) {
        // Streak broken, reset to 1
        setDailyStreak(1)
      }
    } else {
      // First login, set streak to 1
      setDailyStreak(1)
    }

    // Update last login date
    setLastLoginDate(today)
    localStorage.setItem('lastLoginDate', today.toISOString())
    localStorage.setItem('dailyStreak', dailyStreak.toString())
  }

  const completeAchievement = (id: string) => {
    setAchievements(achievements.map(achievement => 
      achievement.id === id ? { ...achievement, completed: true } : achievement
    ))
    const completedAchievement = achievements.find(a => a.id === id)
    setCompletedItem(completedAchievement)
    setShowMotivationalPopup(true)
    toast({
      title: "Achievement Completed!",
      description: `You've completed: ${completedAchievement.name}`,
    })
  }

  return (
    <div className="space-y-8 p-8 doodle-bg">
      <motion.h1
        className="text-4xl font-bold text-blue-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t.userProfile}
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">{t.personalInformation}</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <p><strong>{t.name}:</strong> John Doe</p>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-500" />
              <p><strong>{t.email}:</strong> john.doe@example.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-blue-500" />
              <p><strong>{t.phone}:</strong> (123) 456-7890</p>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <p><strong>{t.dateOfBirth}:</strong> January 1, 1990</p>
            </div>
            <Button className="mt-4">
              <Edit className="w-4 h-4 mr-2" />
              {t.editProfile}
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">{t.healthStreaks}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={streakData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="streak" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">{t.dailyStreak}</h2>
        <div className="flex items-center space-x-4">
          <Flame className="w-8 h-8 text-orange-500" />
          <div className="flex-grow">
            <p className="text-lg font-semibold">{dailyStreak} {t.day}{dailyStreak !== 1 ? 's' : ''}</p>
            <Progress value={dailyStreak % 7 * 100 / 7} className="h-2" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">{t.keepStreak}</p>
      </motion.div>
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">{t.achievementsGamesExercises}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className={`card p-4 ${achievement.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
              <div className="flex items-center space-x-2">
                {achievement.icon}
                <h3 className="font-semibold">{achievement.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mt-2">{achievement.description}</p>
              {achievement.completed ? (
                <span className="text-green-600 text-sm mt-2 block">{t.completed}</span>
              ) : (
                <Button 
                  className="mt-2 text-sm" 
                  variant="outline"
                  onClick={() => completeAchievement(achievement.id)}
                >
                  {t.complete}
                </Button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
      <Dialog open={showMotivationalPopup} onOpenChange={setShowMotivationalPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.congratulations}</DialogTitle>
            <DialogDescription>
              {completedItem && (
                <div className="flex flex-col items-center space-y-4">
                  <Smile className="w-16 h-16 text-yellow-500" />
                  <p>{t.youCompleted}: {completedItem.name}</p>
                  <p>{t.keepUpGoodWork}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowMotivationalPopup(false)}>{t.close}</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

