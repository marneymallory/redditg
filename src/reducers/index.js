import formVisibleReducer from './form-visible-reducer';
import postFeedReducer from './post-feed-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterPostFeed: postFeedReducer,
});

export default rootReducer;