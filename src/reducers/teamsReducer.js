export default (state = [], action) => {
  switch (action.type) {
    case 'TEAM_LIST':
      return action.payload;
    default:
      return state;
  }
}