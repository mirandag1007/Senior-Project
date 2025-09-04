'use client'

import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { useState, useEffect } from 'react'


type AuthMode = 'initial' | 'login' | 'signup'

interface FormData {
  email: string
  password: string
  confirmPassword?: string
  name?: string
}

export default function AuthWindow() {
  const [mode, setMode] = useState<AuthMode>('initial')
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  //
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  /* ---------- Helpers ---------- */
  const isValidEduEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.edu$/.test(email)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    /* basic client-side validation */
    if (!isValidEduEmail(formData.email)) {
      setError('Please use a valid .edu email address')
      return
    }

    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }
      if (!formData.name?.trim()) {
        setError('Please enter your name')
        return
      }
    }
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            }
          }
        })

        if (error) {
          setError(error.message)
          return
        }

        // Success - redirect without blocking alert
        setSuccessMessage('Account created successfully! Redirecting...')



      } else {
        // Login logic
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (error) {
          setError(error.message)
          return
        }

        // Success - redirect without blocking alert

        setSuccessMessage('Login successful! Redirecting...')
      }

    } catch (err) {
      console.error('Detailed error:', err)
      if (err instanceof Error) {
        setError(`An unexpected error occurred: ${err.message}`)
      } else {
        setError('An unexpected error occurred: Unknown error')
      }
    }

  }




  /* ---------- Initial Screen ---------- */
  if (mode === 'initial') {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Get Started
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Join thousands of students who never miss important notes
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setMode('login')}
            className="w-full py-3 px-4 bg-utrgv-orange text-white rounded-lg hover:bg-utrgv-dark-orange transition-colors font-medium shadow-sm"
          >
            Already have an account? Log in
          </button>

          <button
            onClick={() => setMode('signup')}
            className="w-full py-3 px-4 bg-gradient-to-b from-utrgv-orange via-utrgv-orange to-utrgv-orange text-white rounded-lg hover:from-utrgv-dark-orange hover:via-utrgv-dark-orange hover:to-utrgv-dark-orange transition-colors font-medium shadow-sm"
          >
            Create an account to save your first note!
          </button>
        </div>
      </div>
    )
  }

  /* ---------- Login / Signup Form ---------- */
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>

        <button
          type="button"
          onClick={() => setMode('initial')}
          className="text-utrgv-orange dark:text-utrgv-dark-orange hover:underline text-sm"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-utrgv-orange dark:bg-gray-700 dark:text-white"
              placeholder="Enter your full name"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            University Email (.edu)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-utrgv-orange dark:bg-gray-700 dark:text-white"
            placeholder="student@university.edu"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-utrgv-orange dark:bg-gray-700 dark:text-white"
            placeholder="Enter your password"
            required
          />
        </div>

        {mode === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-utrgv-orange dark:bg-gray-700 dark:text-white"
              placeholder="Confirm your password"
              required
            />
          </div>
        )}

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-utrgv-orange text-white rounded-lg hover:bg-utrgv-dark-orange transition-colors font-medium"
        >
          {mode === 'login' ? 'Log In' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}