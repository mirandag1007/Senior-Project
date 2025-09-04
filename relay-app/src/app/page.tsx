import Header from '../../components/Header'
import AuthWindow from '../../components/AuthWindow'

export default function HomePage() {
  return (
    // Use a neutral gray background with an orange accent for the overall page.
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {/* Large Header for Home Page */}
      <Header size="large" />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Side - Description */}
          <div className="flex-1 text-center lg:text-left">
            {/* Main headline in UTRGV Orange */}
            <h1 className="text-xl lg:text-xl font-bold text-[#F58220] dark:text-[#BA5100] mb-6">
              Never miss out on notes again!
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Record lectures with AI transcription, connect with other classmates,
              and never fall behind in your studies.
            </p>
            
            {/* Placeholder for your future image - styled with gray */}
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