import React from 'react'
import { Home, List } from 'react-feather'

function LeftNavigation() {
  return (
    <div className='bg-[#3f7afe] w-12  md:w-44 lg:w-52 flex-initial fixed p-2 h-full'>
        <div className='m-2 flex justify-center'>
            <a  href='/home'
                className='flex hover:bg-white/20 focus:bg-white/40 p-2 flex-1  rounded cursor-pointer'
            >
                <Home className='text-white mr-2'/>
                <span className='font-medium text-white hidden md:block '>Home</span>
            </a>
        </div>
        <div className='m-2 flex justify-center'>
            <a  href='/home'
                className='flex  hover:bg-white/20 focus:bg-white/40 p-2 flex-1  rounded cursor-pointer'
            >
                <List className='text-white mr-2'/>
                <span className='font-medium text-white hidden md:block'>Categories</span>
            </a>
        </div>
    </div>
  )
}

export default LeftNavigation