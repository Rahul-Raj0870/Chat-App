// store/store.js
import { createStore, combineReducers } from 'redux';

// Example reducer for messages
const initialMessagesState = {
  messages: [],
};

const messagesReducer = (state = initialMessagesState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  messages: messagesReducer,
});

const store = createStore(rootReducer);

export default store;