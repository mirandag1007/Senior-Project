import Link from 'next/link'

interface HeaderProps {
  size: 'small' | 'large'
}

export default function Header({ size }: HeaderProps) {
  const headerClasses = size === 'large'
    ? "py-8 px-4"
    : "py-4 px-4 border-b border-gray-200 dark:border-gray-700"

  return (
    <header className={`bg-white dark:bg-gray-800 shadow-sm ${headerClasses}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* App Name (replacing the logo) */}
        <Link href="/" className="flex items-center">
          <span className={`font-bold text-utrgv-orange ${size === 'large' ? 'text-3xl' : 'text-xl'}`}>
            Relay
          </span>
        </Link>

        {/* Navigation (only show on small header) */}
        {size === 'small' && (
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-utrgv-orange dark:hover:text-utrgv-dark-orange font-medium">
              Dashboard
            </Link>
            <Link href="/connect" className="text-gray-700 dark:text-gray-300 hover:text-utrgv-orange dark:hover:text-utrgv-dark-orange font-medium">
              Connect
            </Link>
            <button className="text-gray-700 dark:text-gray-300 hover:text-utrgv-orange dark:hover:text-utrgv-dark-orange font-medium">
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}