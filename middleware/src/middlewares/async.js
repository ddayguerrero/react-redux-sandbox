export default function({ dispatch }) {
  return next => action => {
    // if action does not have a payload or a .then property
    if(!action.payload || !action.payload.then){
      return next(action);
    }

    action.payload
      .then(function(response){
        // create new action with response data
        const newAction = { ...action, payload: response.data };
        dispatch(newAction);
      });
  }
}