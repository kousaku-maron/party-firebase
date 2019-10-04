import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

type Props = {
  title: string
}

const ContractWebviewTemplate: React.FC<Props> = props => {
  const { children } = props
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <div className={classes.titleWrapper}>
          <Typography variant="h4">{props.title}</Typography>
        </div>

        {children}
      </div>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    inner: {
      width: '100%',
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 12,
      paddingRight: 12
    },
    titleWrapper: {
      paddingBottom: 28
    }
  })
)

export default ContractWebviewTemplate
