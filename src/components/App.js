import React from 'react';
import { connect } from 'react-redux';
import SelectTeam from './SelectTeam';
import TeamDataContainer from './TeamDataContainer';
import YesterdayScore from './YesterdayScore';
import TodayGame from './TodayGame';
import Standings from './Standings';
import PlayerStats from './PlayerStats';
import { fetchTeamData, getPreviousTeam, getYesterdayScore, getTodayGame, getStandings, getPlayerStats} from '../actions';

const playerStats = ['HR', 'AVG', 'RBI', 'OPS'];

class App extends React.Component {
  
  componentDidMount() {
    this.props.fetchTeamData();
    this.props.getPreviousTeam();
    this.props.getYesterdayScore();
    this.props.getTodayGame();
    this.props.getStandings();
    this.props.getPlayerStats(playerStats);
  }
  
  renderStats() {
    if (this.props.stats){
      return playerStats.map((stat) => {
        return (
          <TeamDataContainer heading={`${stat} Leaders`} class="stats" key={stat}>
            <PlayerStats stat={this.props.stats[stat]}/>
          </TeamDataContainer>
        );
      });
    }

  }
  
  render(){
    return (
      <React.Fragment>
        <header role="banner">
          <SelectTeam/>
        </header>
        <main role="main" className="container">
          <TeamDataContainer heading="Yesterday's Score" class="schedule">
            <YesterdayScore/>
          </TeamDataContainer>
          <TeamDataContainer heading="Today's Game" class="schedule">
            <TodayGame/>
          </TeamDataContainer>
          <TeamDataContainer heading={`${this.props.standings["@name"]} Standings`} class="standings">
            <Standings/>
          </TeamDataContainer>
          {this.renderStats()}
        </main>
      </React.Fragment>
    )    
  }
}

const mapStateToProps = (state) => {
  return { 
    standings: state.standings,
    stats: state.stats,
  };
}

export default connect(mapStateToProps, 
  { fetchTeamData, getPreviousTeam, getYesterdayScore, getTodayGame, getStandings, getPlayerStats }
)(App);