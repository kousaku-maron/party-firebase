import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Layout from '../templates/Layout'
import { useUsers, useUserToggleActions } from '../../services'

const MembersPage = () => {
  const classes = useStyles()
  const users = useUsers()
  const { onChangeEnabled, onChangeIsAccepted } = useUserToggleActions()

  return (
    <Layout>
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
                    <Switch
                      checked={user.enabled}
                      onChange={(_e, checked) => {
                        onChangeEnabled(user.uid, checked)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={user.isAccepted}
                      onChange={(_e, checked) => {
                        onChangeIsAccepted(user.uid, checked)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </Layout>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      paddingTop: 12,
      paddingBottom: 12
    }
  })
)

export default MembersPage
