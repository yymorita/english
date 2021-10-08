import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import utilStyles from '../styles/utils.module.css'
import Pagination from './pagination'


function Layout({ children }: { children: React.ReactNode}) {
    return (
        <div className='layout'>
            <Head>
                <title>英語学習の記録</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <h1><Link href={`/`}>英語学習の記録</Link></h1>
            <div className={utilStyles.rightSide}><Link href={'/tags'}>タグ</Link> <Link href='https://klcal.netlify.app/'>カレンダー</Link></div>
            {children}
        </div>
    )
}

export default Layout