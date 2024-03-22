import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header>
      <nav>
      <div className='navbar justify-between bg-base-300'>
        <Link href="/" className='btn btn-ghost'>
        Ecomm - Demo
        </Link> 
        <ul className='flex gap-5'>
          <li><Link href='/cart' className='btn btn-outline btn-warning'>Cart</Link></li>
          <li><Link href='/signin' className='btn btn-warning'>Sign In</Link></li>
          
        </ul>
      </div>
      </nav>
      
    </header>
  )
}

export default Header