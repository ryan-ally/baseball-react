import React from 'react';
import { connect } from 'react-redux';
import SelectTeam from './SelectTeam';
import TeamDataContainer from './TeamDataContainer';
import YesterdayScore from './YesterdayScore';
import TodayGame from './TodayGame';
import Standings from './Standings';
import PlayerStats from './PlayerStats';
import TeamNews from './TeamNews';
import Error from './Error';
import '../css/style.css';
import { getPreviousTeam, getStandings,  getTeamNews, toggleMenu} from '../actions';
import { fetchTeamData } from '../ducks/teams';
import { getDivisionStandings } from '../ducks/standings';
import { getYesterdayScore } from '../ducks/yesterday';
import { getTodayGame } from '../ducks/today';
import { getPlayerStats } from '../ducks/stats';

const playerStats = ['HR', 'AVG', 'RBI', 'OPS'];


class App extends React.Component {

  getTeamClass() {
    if (this.props.selected_team.Name){
      let teamName = this.props.selected_team.Name
      return teamName.split(' ').join('').toLowerCase();
    }
  }

  async componentDidMount() {
    await this.props.fetchTeamData();
    await this.props.getDivisionStandings();
    await this.props.getYesterdayScore();
    await this.props.getTodayGame();
    await this.props.getPlayerStats();
    await this.props.getPreviousTeam();
    //this.getAllStats();
  }

  getAllStats = () => {
    this.props.getYesterdayScore();
    this.props.getTodayGame();
    this.props.getStandings();
    this.props.getTeamNews();
    this.props.getPlayerStats(playerStats);
    this.props.toggleMenu();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  renderStats() {
    if (this.props.stats){
      return playerStats.map((stat) => {
        return (
          <TeamDataContainer
            heading={`${stat} Leaders`}
            class="stats"
            key={stat}
            team={this.getTeamClass()}
            ready={this.props.stats.ready}
            placeholderRows={3}
            >
            <PlayerStats statData={this.props.stats[stat]} stat={stat}/>
          </TeamDataContainer>
        );
      });
    }
  }

  divisionName() {
    if (this.props.standings["@name"]){
      return this.props.standings["@name"];
    } else {
      return '';
    }
  }

  renderOld(){
    if (this.props.teams.error) {
      return (
        <React.Fragment>
          <header role="banner" className="header header--mlb">
            <SelectTeam error={true} team="mlb"></SelectTeam>
          </header>
          <main role="main" className={`main main--${this.getTeamClass()}`}>
            <div className="container">
              <TeamDataContainer
                heading="Error"
                class="full"
                team="mlb"
                ready={true}
                placeholderRows={1}
              >
              <Error />
            </TeamDataContainer>
            </div>
          </main>
        </React.Fragment>
      )
    } else if (this.props.teams.ready) {
      return (
        <React.Fragment>
          <header role="banner" className={`header header--${this.getTeamClass()}`}>
            <SelectTeam getAllStats={this.getAllStats} team={this.getTeamClass()}/>
          </header>
          <main role="main" className={`main main--${this.getTeamClass()}`}>
            <div className="container">
              <TeamDataContainer
                heading="Yesterday's Score"
                class="schedule"
                team={this.getTeamClass()}
                ready={this.props.yesterday.ready}
                placeholderRows={2}
                >
                <YesterdayScore/>
              </TeamDataContainer>

              <TeamDataContainer
                heading="Today's Game"
                class="schedule"
                team={this.getTeamClass()}
                ready={this.props.today.ready}
                placeholderRows={2}
                >
                <TodayGame/>
              </TeamDataContainer>

              <TeamDataContainer
                heading={`${this.divisionName()} Standings`}
                class="full"
                team={this.getTeamClass()}
                ready={this.props.standings.ready}
                placeholderRows={5}
                >
                <Standings/>
              </TeamDataContainer>

              {this.renderStats()}

              <TeamDataContainer
                heading="News"
                subheading="by newsapi.org"
                class="full"
                class2="news"
                team={this.getTeamClass()}
                ready={this.props.news.ready}
                placeholderRows={1}
                >
                <TeamNews team={this.getTeamClass()}/>
              </TeamDataContainer>
            </div>
          </main>
          <footer role="contentinfo" className={`footer footer--${this.getTeamClass()}`}>
            <div className={`footer__content footer__content--${this.getTeamClass()} text--right`}>
              <a className="footer__a" href="https://www.brittanyisenberg.com" target="_blank" rel="noopener noreferrer">By Brittany Isenberg</a>
            </div>
          </footer>
            </React.Fragment>
      )
    } else {
      return (
        <div className="loader">
          <img className="loader__img" src={require(`../img/baseball.svg`)} alt="spinning baseball loader icon"></img>
        </div>
      )
    }
  }

  render() {
    console.log(this.props.stats);
    return (
      <p>Testing</p>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    standings: state.standings,
    stats: state.stats,
    selected_team: state.selected_team,
    today: state.today,
    yesterday: state.yesterday,
    news: state.news,
    teams: state.teams
  };
}

export default connect(mapStateToProps,
  { fetchTeamData, getPreviousTeam, getYesterdayScore, getTodayGame, getPlayerStats, getTeamNews, toggleMenu, getDivisionStandings }
)(App);
