"use client"

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Activity, Heart, Droplet, Scale, Edit, Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'
import LanguageSelector from '../components/LanguageSelector'

const healthData = [
  { name: 'Jan', steps: 4000, calories: 2400, weight: 150, bloodPressure: 120, sleepHours: 7 },
  { name: 'Feb', steps: 3000, calories: 1398, weight: 151, bloodPressure: 118, sleepHours: 6.5 },
  { name: 'Mar', steps: 2000, calories: 9800, weight: 152, bloodPressure: 122, sleepHours: 8 },
  { name: 'Apr', steps: 2780, calories: 3908, weight: 151, bloodPressure: 119, sleepHours: 7.5 },
  { name: 'May', steps: 1890, calories: 4800, weight: 150, bloodPressure: 121, sleepHours: 7 },
  { name: 'Jun', steps: 2390, calories: 3800, weight: 149, bloodPressure: 120, sleepHours: 8 },
]

const activityData = [
  { name: 'Mon', walking: 30, running: 0, cycling: 0, swimming: 0 },
  { name: 'Tue', walking: 20, running: 15, cycling: 0, swimming: 0 },
  { name: 'Wed', walking: 25, running: 0, cycling: 30, swimming: 0 },
  { name: 'Thu', walking: 15, running: 20, cycling: 0, swimming: 0 },
  { name: 'Fri', walking: 30, running: 0, cycling: 20, swimming: 0 },
  { name: 'Sat', walking: 40, running: 30, cycling: 0, swimming: 20 },
  { name: 'Sun', walking: 35, running: 0, cycling: 40, swimming: 0 },
]

export default function Dashboard() {
  const { language } = useLanguage()
  const t = translations[language]
  const [editMode, setEditMode] = useState(false)
  const [userData, setUserData] = useState({
    steps: 8234,
    heartRate: 72,
    bloodPressure: '120/80',
    weight: 150
  })

  const [appointments, setAppointments] = useState([
    { id: 1, doctor: "Dr. Smith", type: "General Checkup", location: "Memorial Hospital", datetime: "Tomorrow, 10:00 AM" },
    { id: 2, doctor: "Dr. Johnson", type: "Dental Cleaning", location: "City Dental Clinic", datetime: "Next Week, 2:00 PM" },
    { id: 3, doctor: "Dr. Williams", type: "Eye Exam", location: "Vision Care Center", datetime: "Jul 15, 11:30 AM" },
  ])

  useEffect(() => {
    // Load user data from localStorage on component mount
    const savedUserData = localStorage.getItem('healthConnectUserData')
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
    }
  }, [])

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    localStorage.setItem('healthConnectUserData', JSON.stringify(userData))
  }, [userData])

  const handleEdit = (field: string, value: string | number) => {
    setUserData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setEditMode(false)
    // Here you would typically send the updated data to your backend
    console.log('Saving updated user data:', userData)
  }

  const handleAppointmentEdit = (id: number, field: string, value: string) => {
    setAppointments(prev => prev.map(app =>
      app.id === id ? { ...app, [field]: value } : app
    ))
  }

  return (
    <div className="space-y-8 p-8 doodle-bg">
      <div className="mb-4 flex justify-end">
        <LanguageSelector />
      </div>
      <motion.h1
        className="text-4xl font-bold text-blue-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t.dashboard}
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <HealthCard title="Steps" value={userData.steps} icon={<Activity className="w-8 h-8 text-blue-500" />} editable={editMode} onEdit={(value) => handleEdit('steps', value)} />
        <HealthCard title="Heart Rate" value={`${userData.heartRate} bpm`} icon={<Heart className="w-8 h-8 text-red-500" />} editable={editMode} onEdit={(value) => handleEdit('heartRate', value)} />
        <HealthCard title="Blood Pressure" value={userData.bloodPressure} icon={<Droplet className="w-8 h-8 text-blue-500" />} editable={editMode} onEdit={(value) => handleEdit('bloodPressure', value)} />
        <HealthCard title="Weight" value={`${userData.weight} lbs`} icon={<Scale className="w-8 h-8 text-green-500" />} editable={editMode} onEdit={(value) => handleEdit('weight', value)} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">{t.healthOverview}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="steps" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="calories" stroke="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#ffc658" />
              <Line yAxisId="left" type="monotone" dataKey="bloodPressure" stroke="#ff7300" />
              <Line yAxisId="left" type="monotone" dataKey="sleepHours" stroke="#0088FE" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">{t.weeklyActivity}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="walking" stackId="a" fill="#8884d8" />
              <Bar dataKey="running" stackId="a" fill="#82ca9d" />
              <Bar dataKey="cycling" stackId="a" fill="#ffc658" />
              <Bar dataKey="swimming" stackId="a" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-800">{t.upcomingAppointments}</h2>
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {editMode ? t.saveChanges : t.editData}
          </Button>
        </div>
        <ul className="space-y-4">
          {appointments.map(appointment => (
            <li key={appointment.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-semibold">
                  {editMode ? (
                    <Input
                      value={appointment.doctor}
                      onChange={(e) => handleAppointmentEdit(appointment.id, 'doctor', e.target.value)}
                      className="mb-1"
                    />
                  ) : (
                    appointment.doctor
                  )} - {editMode ? (
                    <Input
                      value={appointment.type}
                      onChange={(e) => handleAppointmentEdit(appointment.id, 'type', e.target.value)}
                      className="mb-1"
                    />
                  ) : (
                    appointment.type
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  {editMode ? (
                    <Input
                      value={appointment.location}
                      onChange={(e) => handleAppointmentEdit(appointment.id, 'location', e.target.value)}
                    />
                  ) : (
                    appointment.location
                  )}
                </p>
              </div>
              <p className="text-blue-600">
                {editMode ? (
                  <Input
                    value={appointment.datetime}
                    onChange={(e) => handleAppointmentEdit(appointment.id, 'datetime', e.target.value)}
                  />
                ) : (
                  appointment.datetime
                )}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

const HealthCard = ({ title, value, icon, editable, onEdit }: { title: string; value: string | number; icon: React.ReactNode; editable: boolean; onEdit: (value: string) => void }) => (
  <motion.div
    className="card p-6 flex items-center space-x-4"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {icon}
    <div className="flex-grow">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {editable ? (
        <Input
          type="text"
          value={value}
          onChange={(e) => onEdit(e.target.value)}
          className="text-2xl font-bold text-blue-600 bg-transparent border-b border-blue-300 focus:outline-none focus:border-blue-500"
        />
      ) : (
        <p className="text-2xl font-bold text-blue-600">{value}</p>
      )}
    </div>
  </motion.div>
)

