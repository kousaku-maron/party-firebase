import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import { useUsers } from '../../services'
import { TableRow, TableSortLabel, Paper, Toolbar, Typography } from '@material-ui/core'

const MembersPage = () => {
  const classes = useStyles()
  const users = useUsers()

  return (
    <div className={classes.container}>
      <Paper>
        <Toolbar>
          <Typography>ユーザー</Typography>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel>uid</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>userID</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>gender</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>enabled</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>isAccepted</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map(user => (
              <TableRow key={user.uid}>
                <TableCell>{user.uid}</TableCell>
                <TableCell>{user.userID}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                  <Switch checked={user.enabled} />
                </TableCell>
                <TableCell>
                  <Switch checked={user.isAccepted} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      padding: 12
    }
  })
)

export default MembersPage
