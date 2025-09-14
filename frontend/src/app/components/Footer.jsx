import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaFacebookF, FaGithub, FaXTwitter, IconName } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center p-4 bg-gradient-to-b from-gray-900 to-black">
      © {new Date().getFullYear()} Gitlytics. All rights reserved.
     <div className='flex gap-4 text-lg hover:cursor-pointer'>
      <a className='hover:text-green-300' href='#'><FaInstagram/></a>
      <a className='hover:text-green-300' href='#'><FaFacebookF/></a>
      <a className='hover:text-green-300' href='#'><FaGithub/></a>
      <a className='hover:text-green-300' href='#'><FaXTwitter/></a>
</div>
    </footer>
  )
}

export default Footer;