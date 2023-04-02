import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import utilStyles from '../styles/utils.module.css'
import Pagination from './pagination'


function Layout({ children }) {
    return (
        <div className='layout'>
            <Head>
                <title>英語学習の記録</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <div className={utilStyles.leftSide}>
                <Link href={`/`}>英語学習の記録</Link> | 
                <Link href={'/tags'}>タグ</Link> |
                <Link href='https://daily.cocno.co/posts/vt3ormwet'>英語のハノン</Link>
            </div>
            {children}
        </div>
    )
}

export default Layout