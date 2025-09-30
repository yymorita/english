import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import utilStyles from '../styles/utils.module.css'
import Pagination from './pagination'


function Layout({ children }) {
    return (
        <div className='layout'>
            <Head>
                <title>DAILY</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <div className={utilStyles.leftSide}>
                <Link href={`/`}>HOME</Link> | 
                <Link href={'/tags'}> TAGS</Link> |
                SINCE 2020~
            </div>
            {children}
        </div>
    )
}

export default Layout