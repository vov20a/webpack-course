import React, { useState } from 'react'
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import avatarPng from '@/assets/avatar.png'
import avatarJpg from '@/assets/avatar.jpg'
import Image from '@/assets/app-image.svg'
// import './App.css'

function TODO() {
    console.log('first')
}


export const App = () => {
    const [count, setCount] = useState<number>(0)
    const increment = () => {
        setCount(prev => prev + 1)

    }
    // if (__PLARFORM__ === 'desktop') {
    //     return 'ISDESKTOPPLATFORM'
    // }
    // if (__PLARFORM__ === 'mobile') {
    //     return 'ISMOBILEPLATFORM'
    // }
    // if (__ENV__ === 'development') {
    //     //add devTools()

    // }

    return (

        <div data-testid={'App.DataTestid'}>
            <h1 data-testid={'Platform'}>Platform={__PLARFORM__}</h1>
            <img width={130} src={avatarPng} alt="" />
            <img width={130} src={avatarJpg} alt="" />
            <div>
                <Image className={classes.icons} width={50} height={50} fill='red' />
            </div>
            <Link to='./about'>About</Link>
            <br />
            <Link to='./shop'>Shop</Link>
            <h1 className={classes.value}>{count}</h1>
            <button className={classes.button} onClick={increment}>Add</button>
            <Outlet />

        </div>

    )
}

