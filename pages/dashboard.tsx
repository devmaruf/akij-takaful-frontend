import Layout from '@/components/layout/Layout';
import { decrement, increment } from '@/slices/CounterSlice';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from './../store/store';

const Dashboard: NextPage = () => {

  const count = useSelector((state: RootState)=> state.counter.value);
const dispatch = useDispatch();
  return (
    <Layout title='Home'>
        <h3>Home Page</h3>
    </Layout>
  )
}

export default Dashboard;