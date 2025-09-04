'use client'
import Header from '../../../components/Header'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ConnectRequest } from '@/types' // Import your type

export default function ConnectPage() {
  const [requests, setRequests] = useState<ConnectRequest[]>([])
  const [loading, setLoading] = useState(true)

  // This will fetch real requests from your API later
  useEffect(() => {
    // For now, simulate loading then show empty state
    setTimeout(() => {
      setRequests([]) // Empty for now, will be replaced with API call
      setLoading(false)
    }, 500)
    
    // Later, replace with:
    // fetchRequestsFromAPI().then(setRequests).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header size="small" />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading requests...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header size="small" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Open Requests</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Help your classmates by taking notes for them</p>
          </div>
          <Link href="/connect/new" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            Make a Request
          </Link>
        </div>

        <div className="space-y-4">
          {requests.map(request => (
            <div key={request.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{request.course}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      request.status === 'unfulfilled' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                      request.status === 'accepted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>📅 {new Date(request.dateISO).toLocaleDateString()}</span>
                    <span>🕐 {request.time}</span>
                    <span className={request.priceType === 'paid' ? 'text-green-600 dark:text-green-400 font-medium' : ''}>
                      {request.priceType === 'paid' ? `💰 $${request.amount}` : '🆓 Free'}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{request.details}</p>
                </div>
                
                <button className="ml-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Accept Request
                </button>
              </div>
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No requests available</h3>
            <p className="text-gray-500 dark:text-gray-400">Check back later or create your own request.</p>
          </div>
        )}
      </main>
    </div>
  )
}
