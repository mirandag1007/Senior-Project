import Image from 'next/image'

interface HeaderProps {
  size: 'small' | 'large'
}

export default function Header({ size }: HeaderProps) {
  const headerClasses = size === 'large' 
    ? "py-8 px-4" 
    : "py-4 px-4 border-b border-gray-200 dark:border-gray-700"
  
  const logoSize = size === 'large' 
    ? { width: 200, height: 60 } 
    : { width: 150, height: 45 }

  return (
    <header className={`bg-white dark:bg-gray-800 shadow-sm ${headerClasses}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Your Relay Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/Relay-Logo.png"
            alt="Relay"
            width={logoSize.width}
            height={logoSize.height}
            priority
            className="object-contain"
          />
        </a>
        
        {/* Navigation (only show on small header) */}
        {size === 'small' && (
          <nav className="flex items-center gap-6 text-sm">
            <a href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Dashboard
            </a>
            <a href="/connect" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Connect
            </a>
            <button className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
