import { ref, onValue, set, increment, get } from 'firebase/database';
import { realtimeDb } from '../firebase/config';

export const subscribeToCourseLikes = (courseId, callback, userId) => {
  const likesRef = ref(realtimeDb, `courseLikes/${courseId}`);
  const userLikeRef = ref(realtimeDb, `userLikes/${userId}/${courseId}`);
  
  // Listen for total likes changes
  const likesUnsubscribe = onValue(likesRef, async (snapshot) => {
    const likes = snapshot.val() || 0;
    // Check if user has liked
    const userLikeSnapshot = await get(userLikeRef);
    const hasLiked = userLikeSnapshot.val() || false;
    callback(likes, hasLiked);
  });

  return likesUnsubscribe;
};

export const toggleCourseLike = async (courseId, userId) => {
  const userLikeRef = ref(realtimeDb, `userLikes/${userId}/${courseId}`);
  const courseLikesRef = ref(realtimeDb, `courseLikes/${courseId}`);

  try {
    const snapshot = await get(userLikeRef);
    const hasLiked = snapshot.val();

    if (hasLiked) {
      // Unlike
      await Promise.all([
        set(userLikeRef, null),
        set(courseLikesRef, increment(-1))
      ]);
      return false;
    } else {
      // Like
      await Promise.all([
        set(userLikeRef, true),
        set(courseLikesRef, increment(1))
      ]);
      return true;
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
}; 