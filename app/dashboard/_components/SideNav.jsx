"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { GraduationCap, Hand, LayoutIcon, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function SideNav() {

  const {user}=useKindeBrowserClient();
  

  const menuList=[
    {
      id:1,
      name:'Dashboard',
      icon: LayoutIcon,
      path:'/dashboard'
    },
    {
      id:2,
      name:'Students',
      icon:GraduationCap,
      path:'/dashboard/students'

    },
    {
      id:3,
      name:'Attendance',
      icon:Hand,
      path:'/dashboard/attendance'

    },
    {
      id:4,
      name:'Settings',
      icon:Settings,
      path:'/dashboard/settings'

    },
  ]
  const path = usePathname();
  useEffect(()=>{
    console.log(path)
  },[path])
  return (
    <div className='border shadow-md h-screen'>
      <div className="flex justify-center items-center h-20 my-5"> 
        <Image 
          src={'/logo1.svg'} 
          width={180} 
          height={50} 
          alt='logo' 
        />
      </div>

      <hr className='my-5'></hr>
      {menuList.map((menu,index)=>(
        <Link href={menu.path}>
        <h2 className={`flex items-center gap-3 text-md p-4
        text-slate-500 
        hover:bg-orange-400
        hover:text-white
        cursor-pointer
        rounded-lg
        my-2
        ${path==menu.path&&'bg-orange-400 text-white'}
        `}>
          <menu.icon/>
          {menu.name}

        </h2>
        </Link>
      ))}

      <div className='flex gap-2 items-centre bottom-5 fixed pd-2'>
        <Image src={user?.picture} 
        width={35}
        height={35}
        alt='user'
        className='rounded-full'
        />
        <div>
          <h2 text-sm fon-bold>{user?.given_name} {user?.family_name}</h2>
          <h2 className='text-xs text-slate-400'>{user?.email}</h2>
        </div>
      </div>
    </div>
  )
}

export default SideNav