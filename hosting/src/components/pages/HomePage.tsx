import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { AppleStoreButton, GooglePlayStoreButton } from '../atoms'
import BackgroundImage from '../../../assets/images/background.jpg'

const HomePage = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.backgroundWrapper}>
        <img className={classes.backgroundImage} src={BackgroundImage} />
      </div>
      <div className={classes.companyWrapper}>
        <Typography className={classes.companyText}>Gorori.llc</Typography>
      </div>
      <div className={classes.messageContainer}>
        <Typography className={classes.subtitleText}>飲み会 マッチングアプリ</Typography>
        <div className={classes.titleWrapper}>
          <Typography className={classes.titleText}>Nomoca</Typography>
        </div>
        <div className={classes.actionArea}>
          <div className={classes.appleWrapper}>
            <AppleStoreButton />
          </div>
          <div className={classes.googleWrapper}>
            {/* TODO: GooglePlayStoreButtonで使用している画像の周りに透明箇所があり見た目サイズがAppleStoreButtonと変わるため、手動でサイズを指定して対応。 */}
            <GooglePlayStoreButton height={57.5} width={138} />
          </div>
        </div>

        <Typography className={classes.whiteText}>
          <Link className={classes.linkText} to="/terms">
            利用規約
          </Link>
          および
          <Link className={classes.linkText} to="/privacy">
            プライバシーポリシー
          </Link>
          に同意して、アプリをインストール。
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
      padding: 96
    },
    messageContainer: {
      paddingTop: '20vh',
      width: 278
    },
    actionArea: {
      display: 'flex',
      width: '100%',
      paddingBottom: 12
    },
    backgroundWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      heigth: '100vh',
      zIndex: -5
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
      paddingLeft: 6,
      marginTop: -4 // TODO: GooglePlayStoreButtonで使用している画像の周りに透明箇所があるため、一旦negative marginで対応。
    },
    backgroundImage: {
      width: '100vw',
      height: '100vh',
      objectFit: 'cover'
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
      color: 'white'
    },
    linkText: {
      fontSize: 12,
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    whiteText: {
      fontSize: 12,
      color: 'white'
    }
  })
)

export default HomePage
