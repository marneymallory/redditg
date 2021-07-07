export default (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) {
    case 'ADD_POST':
      return Object.assign({}, state, {
        [id]: {
          names: names,
          location: location,
          issue: issue, 
          id: id 
        }
      });
    case 'DELETE_POST':
      let newState = {...state};
      delete newState[id];
      return newState;
    default:
      return state;
  }
};