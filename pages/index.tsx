import { decrement, increment } from '@/slices/CounterSlice';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from './../store/store';

const Home: NextPage = () => {

  const count = useSelector((state: RootState)=> state.counter.value);
const dispatch = useDispatch();

  return (
    <div className="bg-login-bg bg-cover bg-no-repeat bg-center overflow-x-hidden">
      <Head>
        <title>Akij Takafful Insurance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
      <section className="section main-section">
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">
        <span className="icon">
          <i className="mdi mdi-lock" />
        </span>
        Login
      </p>
    </header>
    <div className="card-content">
      <form method="get">
        <div className="field spaced">
          <label className="label">Login</label>
          <div className="control icons-left">
            <input
              className="input"
              type="text"
              name="login"
              placeholder="user@example.com"
              autoComplete="username"
            />
            <span className="icon is-small left">
              <i className="mdi mdi-account" />
            </span>
          </div>
          <p className="help">Please enter your login</p>
        </div>
        <div className="field spaced">
          <label className="label">Password</label>
          <p className="control icons-left">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <span className="icon is-small left">
              <i className="mdi mdi-asterisk" />
            </span>
          </p>
          <p className="help">Please enter your password</p>
        </div>
        <div className="field spaced">
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                name="remember"
                defaultValue={1}
                defaultChecked={true}
              />
              <span className="check" />
              <span className="control-label">Remember</span>
            </label>
          </div>
        </div>
        <hr />
        <div className="field grouped">
          <div className="control">
            <button type="submit" className="button blue">
              Login
            </button>
          </div>
          <div className="control">
            <a href="index.html" className="button">
              Back
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>


      </main>
    </div>
  )
}

export default Home