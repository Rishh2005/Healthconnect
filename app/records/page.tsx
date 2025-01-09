"use client"

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { FileText, Download, Eye, Plus, ImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'
import LanguageSelector from '../components/LanguageSelector'

const initialRecords = [
  { id: 1, date: '2023-01-15', type: 'General Checkup', doctor: 'Dr. Smith', notes: 'Patient is in good health. Recommended to maintain current diet and exercise routine.', image: null },
  { id: 2, date: '2023-03-22', type: 'Blood Test', doctor: 'Dr. Johnson', notes: 'Cholesterol levels slightly elevated. Advised to reduce saturated fat intake and increase physical activity.', image: null },
  { id: 3, date: '2023-05-10', type: 'X-Ray', doctor: 'Dr. Williams', notes: 'No abnormalities detected in chest X-ray. Lungs appear clear.', image: '/placeholder.svg?height=300&width=300' },
  { id: 4, date: '2023-06-05', type: 'Dental Checkup', doctor: 'Dr. Brown', notes: 'Two cavities found. Scheduled for fillings next month. Advised to improve oral hygiene routine.', image: null },
  { id: 5, date: '2023-07-18', type: 'Eye Exam', doctor: 'Dr. Davis', notes: 'Slight change in prescription. New glasses ordered. Follow-up in one year recommended.', image: null },
]

export default function Records() {
  const { language } = useLanguage()
  const t = translations[language]
  const [records, setRecords] = useState(initialRecords)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [newRecord, setNewRecord] = useState({ date: '', type: '', doctor: '', notes: '', image: null })
  const fileInputRef = useRef(null)

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault()
    const id = records.length + 1
    setRecords([...records, { id, ...newRecord }])
    setNewRecord({ date: '', type: '', doctor: '', notes: '', image: null })
  }

  const handleDownload = (record) => {
    const content = `Date: ${record.date}
Type: ${record.type}
Doctor: ${record.doctor}
Notes: ${record.notes}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `record_${record.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewRecord({ ...newRecord, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
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
        {t.healthRecords}
      </motion.h1>
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">{t.yourRecords}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Doctor</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-b">
                  <td className="px-4 py-2">{record.date}</td>
                  <td className="px-4 py-2">{record.type}</td>
                  <td className="px-4 py-2">{record.doctor}</td>
                  <td className="px-4 py-2">
                    {record.image && (
                      <Image src={record.image} alt="Record" width={50} height={50} className="rounded-md" />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      className="mr-2"
                      onClick={() => setSelectedRecord(record)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {t.view}
                    </Button>
                    <Button variant="secondary" onClick={() => handleDownload(record)}>
                      <Download className="w-4 h-4 mr-1" />
                      {t.download}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      {selectedRecord && (
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">{t.recordDetails}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Date:</strong> {selectedRecord.date}</p>
              <p><strong>Type:</strong> {selectedRecord.type}</p>
              <p><strong>Doctor:</strong> {selectedRecord.doctor}</p>
            </div>
            <div>
              <p><strong>Notes:</strong></p>
              <p className="text-gray-700">{selectedRecord.notes}</p>
            </div>
          </div>
          {selectedRecord.image && (
            <div className="mt-4">
              <p><strong>Attached Image:</strong></p>
              <Image src={selectedRecord.image} alt="Record" width={300} height={300} className="rounded-md" />
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <Button onClick={() => handleDownload(selectedRecord)}>
              <FileText className="w-4 h-4 mr-1" />
              {t.generateReport}
            </Button>
          </div>
        </motion.div>
      )}
      <motion.div
        className="card p-6"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">{t.addNewRecord}</h2>
        <form onSubmit={handleAddRecord} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">{t.date}</label>
            <Input
              type="date"
              id="date"
              value={newRecord.date}
              onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">{t.type}</label>
            <Input
              type="text"
              id="type"
              value={newRecord.type}
              onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">{t.doctor}</label>
            <Input
              type="text"
              id="doctor"
              value={newRecord.doctor}
              onChange={(e) => setNewRecord({ ...newRecord, doctor: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">{t.notes}</label>
            <Textarea
              id="notes"
              value={newRecord.notes}
              onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
              rows={3}
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">{t.attachImage}</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              ref={fileInputRef}
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current.click()}
              variant="secondary"
            >
              <ImageIcon className="w-4 h-4 mr-1" />
              {t.chooseImage}
            </Button>
            {newRecord.image && <p className="mt-2 text-sm text-gray-500">Image attached</p>}
          </div>
          <Button type="submit">
            <Plus className="w-4 h-4 mr-1" />
            {t.addRecord}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

