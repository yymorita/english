import '../styles/global.css'
// import localFont from '@next/font/local'
import { AppProps } from 'next/app'

// const IBMPlexSansJP = localFont({src: '../public/IBM-Plex-Sans-JP/hinted/IBMPlexSansJP-Text.otf'})

function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default App