import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

type Props = {
  title: string
}

const ContractTemplate: React.FC<Props> = props => {
  const { children } = props
  const classes = useStyles()

  return (
    <div className={classes.scrollView}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Nomoka</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container className={classes.container}>
        <div className={classes.cardWrapper}>
          <Card className={classes.card}>
            <CardHeader title={props.title} />
            <CardContent>{children}</CardContent>
          </Card>
        </div> 
      </Container>
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
    cardWrapper: {
      paddingTop: 64,
      paddingBottom: 64
    },
    card: {
      width: '100%',
      maxWidth: 740,
      padding: 24
    }
  })
)

export default ContractTemplate
