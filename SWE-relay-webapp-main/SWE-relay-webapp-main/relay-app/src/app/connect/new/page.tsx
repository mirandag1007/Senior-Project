'use client'
import Header from '../../../../components/Header'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewRequestPage() {
  const [course, setCourse] = useState('')
  const [dateISO, setDateISO] = useState('')
  const [time, setTime] = useState('')
  const [priceType, setPriceType] = useState<'free' | 'paid'>('free')
  const [amount, setAmount] = useState<number | ''>('')
  const [details, setDetails] = useState('')
  const router = useRouter()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: POST to backend API
    alert('Request created successfully! (Demo)')
    router.push('/connect')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header size="small" />
      
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Make a Request</h1>
          <p className="text-gray-600 dark:text-gray-300">Find a classmate to take notes for you</p>
        </div>
        
        <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course
              </label>
              <input 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={course} 
                onChange={e => setCourse(e.target.value)} 
                placeholder="e.g., CS201 - Data Structures" 
                required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={dateISO} 
                  onChange={e => setDateISO(e.target.value)} 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={time} 
                  onChange={e => setTime(e.target.value)} 
                  placeholder="e.g., 10:00 AM - 11:15 AM" 
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Payment
              </label>
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="price" 
                    checked={priceType === 'free'} 
                    onChange={() => setPriceType('free')}
                    className="mr-2 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Free (study group help)</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="price" 
                    checked={priceType === 'paid'} 
                    onChange={() => setPriceType('paid')}
                    className="mr-2 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Paid</span>
                </label>
                {priceType === 'paid' && (
                  <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">$</span>
                    <input 
                      type="number" 
                      className="w-24 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="25" 
                      value={amount} 
                      onChange={e => setAmount(e.target.value ? Number(e.target.value) : '')} 
                      min="1"
                      required={priceType === 'paid'}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Details
              </label>
              <textarea 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={4} 
                value={details} 
                onChange={e => setDetails(e.target.value)}
                placeholder="e.g., Professor uses lots of diagrams, sits in front left, lecture is heavily slide-based..."
                required
              />
            </div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <button 
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Post Request
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
