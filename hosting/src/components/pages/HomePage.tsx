import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const HomePage = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.companyWrapper}>
        <Typography className={classes.companyText}>Gorori.llc</Typography>
      </div>
      <div className={classes.messageContainer}>
        <Typography className={classes.subtitleText}>
          飲み会 マッチングアプリ
        </Typography>
        <div className={classes.titleWrapper}>
          <Typography className={classes.titleText}>
            Nomoca
          </Typography>
        </div>
        <div className={classes.actionArea}>
          <div className={classes.appleWrapper}>
            <Button variant='outlined' color='primary' fullWidth={true}>
              <Typography className={classes.whiteText}>Apple Store</Typography>
            </Button>
          </div>
          <div className={classes.googleWrapper}>
            <Button variant='outlined' color='primary' fullWidth={true}>
              <Typography className={classes.whiteText}>Google Store</Typography>
            </Button>
          </div>
        </div>
        
        <Typography className={classes.whiteText}>
          <Link className={classes.linkText} to="/terms">利用規約</Link>および<Link className={classes.linkText} to="/privacy">プライバシーポリシー</Link>に同意して、アプリをインストール。
        </Typography> 
      </div>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      padding: 96
    },
    messageContainer: {
      paddingTop: 100,
      width: 278,
    },
    actionArea: {
      display: 'flex',
      width: '100%',
      paddingBottom: 12
    },
    companyWrapper: {
      position: 'absolute',
      top: 46,
      right: 46
    },
    titleWrapper: {
      paddingBottom: 24
    },
    appleWrapper: {
      flex: 1,
      paddingRight: 6
    },
    googleWrapper: {
      flex: 1,
      paddingLeft: 6
    },
    companyText: {
      fontSize: 18,
      color: 'white'
    },
    titleText: {
      fontSize: 56,
      color: 'white',
      letterSpacing: 12
    },
    subtitleText: {
      fontSize: 24,
      color: 'white',
    },
    linkText: {
      fontSize: 12,
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    whiteText: {
      fontSize: 12,
      color: 'white',
    }
  })
)

export default HomePage
