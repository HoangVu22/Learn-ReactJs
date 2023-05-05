function logger(reducer) {
    return (prevState, action) => {
      const newState = reducer(prevState, action);
  
      console.group(action.type);
  
      console.log(prevState);
      console.log(action);
      console.log(newState);
  
      console.groupEnd(action.type);
  
      return newState;
    };
  }
  
  export default logger;
  