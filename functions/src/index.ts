import * as admin from 'firebase-admin'
admin.initializeApp()

export { updateUserID } from './handlers/user'
export { createUser } from './triggers/user'

export { entryParty } from './handlers/party'
export { entryInitialParties } from './triggers/party'

export { createGroup, deleteGroup } from './triggers/group'

export { createApplyCard, deleteApplyCard } from './triggers/applyCard'
export { recommendApplyCards, likeApplyCard } from './handlers/applyCard'

export { updateRoomHash, updateNewMessage } from './triggers/room'

export { updateMessageUser } from './triggers/message'

export { applyFriend, acceptFriend, refuseFriend } from './handlers/friend'

export { createReport } from './handlers/report/create'

export { blockUser } from './handlers/block'
