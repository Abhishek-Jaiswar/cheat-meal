import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
    { title: "Home", path: '/' },
    { title: "Advertise", path: '/advertise' },
    { title: "Register Restaurants", path: '/register-restaurant' },
    { title: "Login", path: '/login' },
    { title: "Sign Up", path: '/sign-up' }
]

const Navbar = () => {
    const [active, setActive] = useState("Home")
    return (
        <div className='flex max-w-7xl mx-auto items-center justify-between py-4'>
            <div>
                <h1 className='text-3xl font-bold'>CheatMeal</h1>
            </div>
            <div>
                <ul className='flex items-center gap-8'>
                    {links.map((link) => (
                        <Link to={link.path} key={link.path}>
                            <li onClick={() => setActive(link.title)} className={`${active === link.title ? "border-b-2" : ""}`}>{link.title}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Navbar