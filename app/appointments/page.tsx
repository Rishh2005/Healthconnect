"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Clock, MapPin, User } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
]

const hospitals = [
  { id: 1, name: "City General Hospital" },
  { id: 2, name: "St. Mary's Medical Center" },
  { id: 3, name: "Sunshine Community Hospital" },
  { id: 4, name: "Central Health Clinic" },
  { id: 5, name: "Riverside Medical Center" },
]

const doctors = [
  { id: 1, name: "Dr. Smith", specialty: "General Practitioner", hospitalId: 1 },
  { id: 2, name: "Dr. Johnson", specialty: "Cardiologist", hospitalId: 1 },
  { id: 3, name: "Dr. Williams", specialty: "Dermatologist", hospitalId: 2 },
  { id: 4, name: "Dr. Brown", specialty: "Pediatrician", hospitalId: 2 },
  { id: 5, name: "Dr. Davis", specialty: "Neurologist", hospitalId: 3 },
  { id: 6, name: "Dr. Wilson", specialty: "Orthopedist", hospitalId: 3 },
  { id: 7, name: "Dr. Taylor", specialty: "Gynecologist", hospitalId: 4 },
  { id: 8, name: "Dr. Anderson", specialty: "Urologist", hospitalId: 4 },
  { id: 9, name: "Dr. Thomas", specialty: "Ophthalmologist", hospitalId: 5 },
  { id: 10, name: "Dr. Jackson", specialty: "Psychiatrist", hospitalId: 5 },
]

export default function Appointments() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)

  const filteredDoctors = doctors.filter(doctor => doctor.hospitalId === selectedHospital)

  const handleBookAppointment = () => {
    if (date && selectedTime && selectedHospital && selectedDoctor) {
      const appointment = {
        date: date.toISOString(),
        time: selectedTime,
        hospital: hospitals.find(h => h.id === selectedHospital)?.name,
        doctor: doctors.find(d => d.id === selectedDoctor)?.name,
      }
      console.log('Booking appointment:', appointment)
      // Here you would typically send this data to your backend
      alert('Appointment booked successfully!')
    } else {
      alert('Please fill in all fields before booking.')
    }
  }

  return (
    <div className="space-y-8 p-8 doodle-bg">
      <motion.h1
        className="text-4xl font-bold text-blue-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Schedule an Appointment
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Select a Date</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </motion.div>
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Available Time Slots</h2>
          {date && (
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedTime(time)}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {time}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      <motion.div
        className="card p-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Select a Hospital</h2>
        <Select onValueChange={(value) => setSelectedHospital(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a hospital" />
          </SelectTrigger>
          <SelectContent>
            {hospitals.map((hospital) => (
              <SelectItem key={hospital.id} value={hospital.id.toString()}>
                {hospital.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
      {selectedHospital && (
        <motion.div
          className="card p-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Select a Doctor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDoctors.map((doctor) => (
              <button
                key={doctor.id}
                className={`card p-4 text-left ${selectedDoctor === doctor.id ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedDoctor(doctor.id)}
              >
                <User className="w-6 h-6 mb-2 text-blue-600" />
                <h3 className="font-semibold">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}
      {date && selectedTime && selectedHospital && selectedDoctor && (
        <motion.div
          className="card p-6 mt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Appointment Summary</h2>
          <div className="space-y-2">
            <p><strong>Date:</strong> {date.toDateString()}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Hospital:</strong> {hospitals.find(h => h.id === selectedHospital)?.name}</p>
            <p><strong>Doctor:</strong> {doctors.find(d => d.id === selectedDoctor)?.name}</p>
          </div>
          <button className="btn btn-primary mt-4" onClick={handleBookAppointment}>
            Confirm Appointment
          </button>
        </motion.div>
      )}
    </div>
  )
}

