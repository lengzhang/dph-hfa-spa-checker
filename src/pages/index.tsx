import React from 'react'

import { grey } from '@material-ui/core/colors'

import Header from '../components/Header'

import Checker from '../components/Checker'

const Home = () => {
  return (
    <div style={{ backgroundColor: grey[200] }}>
      <Header title="DPH HFA SPA Checker" />
      <Checker />
    </div>
  )
}

export default Home
