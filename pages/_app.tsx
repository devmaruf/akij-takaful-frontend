import Layout from '@/components/layouts/Layout'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import Login from './login';
import ResetPassword from './forget-password'



export default function App({ Component, pageProps }: AppProps) {

  // Check if the current page is the login page or forget password page
  const isLoginPage = Component === Login;
  const isResetPage = Component === ResetPassword;


  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="canonical" href="https://akijtakaful.com" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {
        isLoginPage || isResetPage ?
          <>
            <Component {...pageProps} />
          </> :
          <Layout>
            <Component {...pageProps}></Component>
          </Layout>
      }
      <ToastContainer />
    </Provider>
  )
}
