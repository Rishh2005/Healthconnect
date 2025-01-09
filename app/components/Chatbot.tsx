"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader, Bot } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from 'ai/react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat()
  const { language } = useLanguage()
  const t = translations[language]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 w-14 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg z-50 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 w-[calc(100vw-2rem)] sm:w-96 max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 z-50"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center space-x-2">
                <div className="bg-white p-1 rounded-full">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">{t.healthConnectAI}</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-700 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="h-[60vh] sm:h-80 overflow-y-auto p-4 bg-gray-50 chatbot-messages">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-lg chatbot-message ${
                    message.role === 'user' 
                      ? 'chatbot-user-message' 
                      : 'chatbot-ai-message'
                  }`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin text-blue-600 w-6 h-6" />
                </div>
              )}
              {error && (
                <div className="text-red-500 text-center text-sm mt-2 p-2 bg-red-100 rounded">
                  {error.message}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder={t.typeYourMessage}
                  value={input}
                  onChange={handleInputChange}
                  className="flex-grow chatbot-input"
                />
                <Button type="submit" className="chatbot-send-button">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot

