"use client";
import React from 'react'
import { Home, List } from 'react-feather'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Link from 'next/link'


function LeftNavigation() {
    return (
        <div className='bg-secondary w-12 h-screen  md:w-44 lg:w-52 flex-grow-0 flex-shrink-0 basis-[12%] p-2 pt-6 '>
            
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/home" legacyBehavior passHref>
                        
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <Home className=''/>
                            <span className='ml-2'>Home</span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    {/* <NavigationMenuItem>
                        <Link href="/categories" legacyBehavior passHref className='w-full'>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <List />
                                <span className='ml-2'>Categories </span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem> */}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default LeftNavigation