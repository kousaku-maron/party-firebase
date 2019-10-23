import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import GooglePlayImage from '../../../assets/images/badge/google_play_download.png'

type Props = {
  width?: number
  height?: number
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string // React.HTMLAttributes<HTMLDivElement>.className
}

const GooglePlayButton = ({ width = 120, height = 50, onClick }: Props) => {
  const classes = useStyles({ width, height })

  return (
    <ButtonBase className={classes.container} onClick={onClick}>
      <img className={classes.image} src={GooglePlayImage} />
    </ButtonBase>
  )
}

const useStyles = ({ width, height }: { width: number, height: number }) =>
  makeStyles(() =>
    createStyles({
      container: {
        width,
        height
      },
      image: {
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%'
      }
    })
  )()

export default GooglePlayButton
