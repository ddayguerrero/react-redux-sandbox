import { SAVE_COMMENT } from './types';

// Action Creators
export function saveComment(comment){
  return {
    type: SAVE_COMMENT,
    payload: comment
  };
}