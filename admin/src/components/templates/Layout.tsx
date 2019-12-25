import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { useAuthState } from '../../services'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title }) => {
  const classes = useStyles()
  const { onSignOut } = useAuthState()

  return (
    <div className={classes.scrollView}>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">{title ? title : '管理画面'}</Typography>
          <Button color="inherit" onClick={onSignOut}>
            <Typography>サインアウト</Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container className={classes.container}>{children}</Container>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    scrollView: {
      overflow: 'scroll',
      height: '100vh'
    },
    container: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    toolbar: {
      flex: 1,
      justifyContent: 'space-between'
    }
  })
)

export default Layout
