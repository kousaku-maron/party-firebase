import * as admin from 'firebase-admin'
admin.initializeApp()

export { updateUserID } from './handlers/user'
export { createUser } from './triggers/user'

export { entryParty } from './handlers/party'
export { entryInitialParties } from './triggers/party'

export { createGroup, deleteGroup } from './triggers/group'

export { updateRoomHash } from './triggers/room'

export { createMessage, updateMessageUser } from './triggers/message'

export { applyFriend, acceptFriend, refuseFriend } from './handlers/friend'

export { reportUser } from './handlers/reports'

export { blockUser } from './handlers/block'

export { recommendApplyCards } from './handlers/applyCards'

export { likeApplyCard } from './handlers/like'
