import Link from 'next/link';
import React from 'react'

const NavBar = () => {
  return (
     <nav className="flex justify-between items-center p-4 bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <h1 className="text-xl text-green-400 font-bold">Gitlytics</h1>
      <div className="space-x-6 font-semibold hover:cursor-pointer">
        <Link href="/" className='hover:text-green-300 hover:underline'>Home</Link>
        <Link href="/leaderboard" className='hover:text-green-300 hover:underline'>Leaderboard</Link>
        <Link href="/aboutus" className='hover:text-green-300 hover:underline'>About</Link>
        <Link href="/history" className='hover:text-green-300 hover:underline'>History</Link>
        <Link href="/contactus" className='hover:text-green-300 hover:underline'>Contact</Link>
        <Link href="/login" className='hover:text-green-300 hover:underline'>Sign in</Link>
      </div>
    </nav>
  )
}

export default NavBar;