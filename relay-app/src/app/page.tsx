import Header from '../../components/Header'
import AuthWindow from '../../components/AuthWindow'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Large Header for Home Page */}
      <Header size="large" />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Side - Description */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-xl lg:text- xl font-bold text-gray-800 dark:text-white mb-6">
              Never miss out on notes again!
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Record lectures with AI transcription, connect with other classmates,
              and never fall behind in your studies.
            </p>
            
            {/* Placeholder for your future image */}
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400"> functionality image will go here</p>
            </div>
          </div>
          
          {/* Right Side - Auth Window */}
          <div className="flex-1 max-w-md w-full">
            <AuthWindow />
          </div>
        </div>
      </main>
    </div>
  )
}
