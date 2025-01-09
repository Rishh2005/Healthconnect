"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Search, Phone, Clock, Star, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'
import LanguageSelector from '../components/LanguageSelector'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: -3.745,
  lng: -38.523
}

const hospitals = [
  { id: 1, name: "City General Hospital", position: { lat: -3.745, lng: -38.523 }, rating: 4.5, phone: "123-456-7890", hours: "24/7", address: "123 Main St, Cityville" },
  { id: 2, name: "St. Mary's Medical Center", position: { lat: -3.746, lng: -38.525 }, rating: 4.2, phone: "098-765-4321", hours: "8AM - 8PM", address: "456 Oak Ave, Townsburg" },
  { id: 3, name: "Sunshine Community Hospital", position: { lat: -3.747, lng: -38.520 }, rating: 4.7, phone: "555-123-4567", hours: "24/7", address: "789 Elm St, Villageton" },
  { id: 4, name: "Central Health Clinic", position: { lat: -3.748, lng: -38.522 }, rating: 4.0, phone: "111-222-3333", hours: "9AM - 5PM", address: "321 Pine Rd, Hamletville" },
  { id: 5, name: "Riverside Medical Center", position: { lat: -3.744, lng: -38.521 }, rating: 4.8, phone: "444-555-6666", hours: "24/7", address: "654 River Ln, Streamtown" },
]

export default function Hospitals() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY // Replace with your Google Maps API key
  })

  const [map, setMap] = useState(null)
  const [selectedHospital, setSelectedHospital] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const { language } = useLanguage()
  const t = translations[language]

  const onLoad = (map: any) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }

  const onUnmount = () => {
    setMap(null)
  }

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        {t.nearbyHospitals}
      </motion.h1>
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t.searchHospitals}
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {filteredHospitals.map((hospital) => (
              <Marker
                key={hospital.id}
                position={hospital.position}
                title={hospital.name}
                onClick={() => setSelectedHospital(hospital)}
              />
            ))}
          </GoogleMap>
        ) : <div>Loading...</div>}
      </motion.div>
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">{t.hospitalList}</h2>
        <ul className="space-y-4">
          {filteredHospitals.map((hospital) => (
            <li key={hospital.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-semibold text-lg">{hospital.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{hospital.rating}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{hospital.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{hospital.hours}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{hospital.address}</span>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setSelectedHospital(hospital)}
              >
                {t.viewDetails}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
      {selectedHospital && (
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">{selectedHospital.name}</h2>
          <p><strong>{t.rating}:</strong> {selectedHospital.rating}</p>
          <p><strong>{t.phone}:</strong> {selectedHospital.phone}</p>
          <p><strong>{t.hours}:</strong> {selectedHospital.hours}</p>
          <p><strong>{t.address}:</strong> {selectedHospital.address}</p>
          <Link href="/appointments" className="btn btn-primary mt-4">
            {t.bookAppointment}
          </Link>
        </motion.div>
      )}
    </div>
  )
}

