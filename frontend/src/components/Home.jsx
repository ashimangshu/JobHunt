import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Herosection from './Herosection'
import Categorycarousel from './Categorycarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs();

  const { User } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (User?.role === 'recruiter') { navigate("/admin/companies"); }
  }, []);
  return (
    <div>
      <Navbar />
      <Herosection />
      <Categorycarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home