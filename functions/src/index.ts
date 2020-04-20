import * as admin from 'firebase-admin'
admin.initializeApp()

export {
  updateUserID,
  applyFriend,
  unapplyFriend,
  acceptFriend,
  refuseFriend,
  blockUser,
  unblockUser
} from './handlers/user'
export { createUser } from './triggers/user'

export { createFriend, deleteFriend } from './triggers/friend'

export { createApplyAndAppliedFriendUser, deleteApplyAndAppliedFriendUser } from './triggers/applyFriendUser'

export { createBlockAndBlockedUser, deleteBlockAndBlockedUser } from './triggers/blockUser'

export { entryParty } from './handlers/party'
export { entryInitialParties } from './triggers/party'

export { createGroup, deleteGroup } from './triggers/group'

export { createMyGroupAsset, updateMyGroupAsset, deleteMyGroupAsset } from './triggers/groupAsset/myGroupAsset'
export {
  createLikedGroupAsset,
  updateLikedGroupAsset,
  deleteLikedGroupAsset
} from './triggers/groupAsset/likedGroupAsset'
export { createLikeGroupAsset, updateLikeGroupAsset, deleteLikeGroupAsset } from './triggers/groupAsset/likeGroupAsset'
export {
  createMatchGroupAsset,
  updateMatchGroupAsset,
  deleteMatchGroupAsset
} from './triggers/groupAsset/matchGroupAsset'

export { createApplyCard, deleteApplyCard, recommendApplyCardsScheduler } from './triggers/applyCard'
export { recommendApplyCards, likeApplyCard } from './handlers/applyCard'

export { createRoom, updateRoomHash, updateNewMessage } from './triggers/room'

export { updateMessageUser } from './triggers/message'

export { pushMessageNotification } from './triggers/notification'

export { createReport } from './handlers/report/create'
