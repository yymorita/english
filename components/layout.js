import Link from 'next/link'
import Head from 'next/head'

export default function Layout({children}) {
    return (
        <div className='layout'>
            <Head>
                <title>英語学習の記録</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <h1><Link href={`/`}>英語学習の記録</Link></h1>
            {children}
        </div>
    )
}