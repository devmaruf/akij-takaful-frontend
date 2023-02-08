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
      <section className="container m-0 mx-auto p-3 md:p-0">
  <div className="flex justify-center items-center pt-12">
    <div className="w-full md:w-[35%] shadow-md">
      <div className="bg-[#d3f5ff] py-8 rounded-t-md flex justify-center">
        {/* <img src="./images/logo.png" alt="devsHunt logo" className="w-40" /> */}
      </div>
      <div className="bg-white text-center p-5 py-8 pb-12">
        <h5 className="text-gray-500 font-nunito font-bold text-lg">Sign In</h5>
        <p className="text-gray-400 mt-5 px-12">
          Enter your email address and password to access admin panel.
        </p>
        <form action="" method="GET" className="mt-5 text-left">
          <div className="group">
            <label
              htmlFor="price"
              className="block text-base font-medium text-gray-500"
            >
              {" "}
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="rounded-sm w-full border p-2 mt-3 outline-none hover:outline-1 hover:outline-red-400 transition-all"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="group mt-3">
            <div className="flex justify-between items-center">
              <label
                htmlFor="price"
                className="block text-base font-medium text-gray-500"
              >
                {" "}
                Password
              </label>
              <div>
                <a
                  href="resetPassword.html"
                  className="text-xs text-gray-400 font-semibold"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="mt-3 flex relative">
              <input
                type="password"
                name="email"
                id="email"
                className="rounded-sm w-full border p-2 outline-none hover:outline-1 hover:outline-red-400 transition-all"
                placeholder="Password"
              />
              <span className="inline-flex items-center justify-center p-3 pt-2 absolute top-[3px] right-1 rounded-l-md border border-l-0  bg-gray-100 text-gray-500 text-sm cursor-pointer">
                <i className="fa-solid fa-eye" />
              </span>
            </div>
          </div>
          <div className="flex items-center mt-5">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-[#91340f] focus:ring-red-500 border-red-500 rounded cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block cursor-pointer text-base text-gray-500 font-medium"
            >
              {" "}
              Remember me
            </label>
          </div>
          <div className="text-center mt-5">
            <button className="bg-red-600 py-2 px-6 text-white rounded-sm shadow-md font-medium">
              <a href="dashboard.html"> Log In</a>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div className="text-center flex justify-center items-center mt-8">
    <p className="text-gray-400">Don't have an account?</p>
    <a href="register.html" className="ml-3 text-gray-500 font-bold capitalize">
      Sign up
    </a>
  </div>
</section>

      </main>
    </div>
  )
}

export default Home