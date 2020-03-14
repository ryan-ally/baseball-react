import news from "../apis/news";

const REQUEST = "mlbStats/news/REQUEST";
const SUCCESS = "mlbStats/news/SUCCESS";
const FAILURE = "mlbStats/news/FAILURE";

const initialState = { data: [] };
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST:
      return { ...state, isFetching: true };
    case SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    case FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export const getTeamNews = () => async (dispatch, getState) => {
  let payload;
  const { team } = getState().team;
  const { id, teamName } = team;
  const team_search = encodeURIComponent(teamName);
  dispatch({ type: REQUEST });

  return news
    .get(
      "everything?q=" +
        team_search +
        "&domains=mlb.com,espn.com,bleacherreport.com&sortBy=publishedAt&pageSize=40"
    )
    .then(results => {
      const team_news = results.data.articles.filter(article => {
        return article.title.includes(teamName);
      });
      payload = results.data.articles ? team_news.slice(0, 7) : null;
      dispatch({ type: SUCCESS, payload });
    })
    .catch(error => dispatch({ type: FAILURE, payload: true }));
};