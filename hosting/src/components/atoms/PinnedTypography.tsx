import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

type Props = {
  pinSize?: number
  pin?: JSX.Element | string
  className?: string // React.HTMLAttributes<HTMLDivElement>.className
}

const PinnedTypography: React.FC<Props> = ({ pin, pinSize = 16, children, className, ...defaultProps }) => {
  const classes = useStyles({ pinSize })

  const pinType = typeof pin
  let pinComponent = pin
  if (pinType === 'string') {
    pinComponent = <Typography className={className}>{pin}</Typography>
  }

  return (
    <div className={classes.container}>
      <div className={classes.pinWrapper}>{pinComponent}</div>
      <div className={classes.typoWrapper}>
        <Typography className={className} {...defaultProps}>
          {children}
        </Typography>
      </div>
    </div>
  )
}

const useStyles = ({ pinSize }: { pinSize: number }) =>
  makeStyles(() =>
    createStyles({
      container: {
        display: 'flex',
        flexDirection: 'row'
      },
      typoWrapper: {
        flex: 1
      },
      pinWrapper: {
        width: pinSize
      }
    })
  )()

export default PinnedTypography
