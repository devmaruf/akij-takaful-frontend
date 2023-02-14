import Layout from '@/components/layouts/Layout'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="canonical" href="https://akijtakaful.com" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps}></Component>
        <ToastContainer />
      </Layout>
    </Provider>
  )
}
