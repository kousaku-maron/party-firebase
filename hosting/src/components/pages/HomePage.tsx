import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const HomePage = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <h1>ホーム</h1>
      <Link to="/terms">利用規約</Link>
      <Link to="/webview-terms">利用規約(webview)</Link>
      <Link to="/privacy">プライバシーポリシー</Link>
      <Link to="/webview-privacy">プライバシーポリシー(webview)</Link>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column'
    }
  })
)

export default HomePage
