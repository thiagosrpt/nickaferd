import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Mark mounted so portal content is only rendered client-side after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="fixed w-full top-0 z-30 bg-[var(--header-bg)] backdrop-blur border-b shadow-2xs">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Nickaferd
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#top" className="hover:underline">Home</a>
          <a href="#content" className="hover:underline">Content</a>
          <a href="#audience" className="hover:underline">Audience</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay + panel rendered via portal (only after mount to avoid SSR hydration mismatch) */}
      {mounted && createPortal(
        <>
          <div
            className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setOpen(false)}
          />

          <div
            className={`md:hidden fixed top-0 right-0 h-full w-64 bg-[var(--header-bg)] shadow-lg z-50 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4">
              <nav className="flex flex-col gap-4">
                <a href="#top" onClick={() => setOpen(false)} className="font-medium">Home</a>
                <a href="#content" onClick={() => setOpen(false)} className="font-medium">Content</a>
                <a href="#audience" onClick={() => setOpen(false)} className="font-medium">Audience</a>
                <a href="#contact" onClick={() => setOpen(false)} className="font-medium">Contact</a>
              </nav>
            </div>
          </div>
        </>,
        document.body
      )}
    </header>
  )
}
