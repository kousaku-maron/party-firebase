import React from 'react'
// import { makeStyles, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Layout from '../templates/Layout'

const LoadingPage = () => {
  // const classes = useStyles()

  return (
    <Layout>
      <CircularProgress size="large" />
    </Layout>
  )
}

// const useStyles = makeStyles(() =>
//   createStyles({
//     container: {}
//   })
// )

export default LoadingPage
