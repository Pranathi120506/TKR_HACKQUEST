// src/hooks/useAuth.js
import { useState } from 'react'

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Login functions (MOCK)
  async function loginMother(email, password) {
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (email === 'mother@demo.in' && password === 'care1000') {
        setCurrentUser({ id: 'mother-mock-id', role: 'mother', name: 'Priya Sharma' })
      } else {
        setError('Invalid credentials. Use mother@demo.in / care1000')
      }
      setLoading(false)
    }, 500)
  }

  async function loginDoctor(email, password) {
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (email === 'doctor@demo.com' && password === 'medic1000') {
        setCurrentUser({ id: 'doctor-mock-id', role: 'doctor', name: 'Dr. Anita Desai' })
      } else {
        setError('Invalid credentials. Use doctor@demo.com / medic1000')
      }
      setLoading(false)
    }, 500)
  }

  async function loginPartner(email, password) {
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (email === 'partner@demo.in' && password === 'partner123') {
        setCurrentUser({ id: 'partner-mock-id', role: 'partner', name: 'Rahul Sharma', linkedMotherId: 'mother-mock-id' })
      } else {
        setError('Invalid credentials. Use partner@demo.in / partner123')
      }
      setLoading(false)
    }, 500)
  }

  async function signupMother(name, email, phone, password) {
    setLoading(true)
    setError('')
    setTimeout(() => {
      setCurrentUser({ id: 'new-mother-id', role: 'mother', name })
      setLoading(false)
    }, 500)
  }

  async function signupDoctor(name, email, password) {
    setLoading(true)
    setError('')
    setTimeout(() => {
      setCurrentUser({ id: 'new-doctor-id', role: 'doctor', name })
      setLoading(false)
    }, 500)
  }

  async function signupPartner(name, email, password) {
    setLoading(true)
    setError('')
    setTimeout(() => {
      setCurrentUser({ id: 'new-partner-id', role: 'partner', name })
      setLoading(false)
    }, 500)
  }

  function logout() {
    setCurrentUser(null)
  }

  function clearError() {
    setError('')
  }

  return {
    currentUser,
    error,
    loading,
    clearError,
    loginMother,
    loginDoctor,
    loginPartner,
    signupMother,
    signupDoctor,
    signupPartner,
    logout,
  }
}