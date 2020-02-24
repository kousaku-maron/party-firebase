import * as admin from 'firebase-admin'
admin.initializeApp()

export { helloWorld } from './handlers/hello'

export { updateUserID } from './handlers/user'
export { createUser } from './triggers/user'

export { entryParty } from './handlers/party'

export { createApplyCard, deleteApplyCard } from './triggers/applyCard'

export { updateRoomHash } from './triggers/room'

export { createMessage, updateMessageUser } from './triggers/message'

export { onQuickReplyEvent } from './handlers/event'
export { sendEventMessage } from './triggers/event'

export { applyFriend, acceptFriend, refuseFriend } from './handlers/friend'

export { reportUser } from './handlers/reports'

export { blockUser } from './handlers/block'
