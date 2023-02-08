import { decrement, increment } from '@/slices/CounterSlice';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from './../store/store';

const Counter: NextPage = () => {

  const count = useSelector((state: RootState)=> state.counter.value);
const dispatch = useDispatch();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Akij Takafful Insurance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600">
          Counter {' '}
          {count}
        </h1>
        <button onClick={()=> dispatch(increment())} className='py-3 px-4 rounded-md bg-green-500/50'>Increment</button> <br/>
        <button onClick={()=> dispatch(decrement())} className='py-3 px-4 rounded-md bg-red-500/50'>Decrement</button>
      </main>
    </div>
  )
}

export default Counter