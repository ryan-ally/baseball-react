import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Error from "./Error";
import TeamDataContainer from "./TeamDataContainer";
import TeamDataPlaceholder from "./TeamDataPlaceholder";

class Standings extends React.Component {
  formatAVG(average) {
    return average.slice(1);
  }

  renderTeams() {
    const { standings, selected_team } = this.props;

    if (standings.data.length > 0) {
      return standings.data.map(team => {
        const teamInfo = this.props.teams.data.find(teamData => {
          return teamData.id === team.team.id;
        });

        return (
          <tr className=" team_container__tr standings" key={team.team.id}>
            <td className="team_container__item">{team.divisionRank} </td>
            <td className="team_container__item team_container__item--grow">
              <span className="standings__team-name">{team.team.name}</span>
              <span className="standings__team-abbreviation">
                {teamInfo.abbreviation}
              </span>
            </td>
            <td className="team_container__item  team_container__item--center">
              {team.leagueRecord.wins}-{team.leagueRecord.losses}{" "}
            </td>
            <td className="team_container__item team_container__item--center">
              {team.leagueRecord.pct}{" "}
            </td>
            <td className="team_container__item team_container__item--center">
              {team.divisionGamesBack}
            </td>
          </tr>
        );
      });
    }
    return <Error heading="Standings" team={selected_team.className} />;
  }

  render() {
    const { standings, selected_team } = this.props;

    if (standings.isFetching) {
      return (
        <TeamDataPlaceholder
          heading="Standings"
          placeholderRows={5}
          team={selected_team.className}
          className="full"
        />
      );
    }

    return (
      <TeamDataContainer
        heading="Standings"
        className="full"
        team={selected_team.className}
      >
        <table className="team_container__table">
          <thead>
            <tr className="team_container__tr team_container__tr-heading ">
              <td></td>
              <td></td>
              <td className="team_container__tr-heading-item">W-L</td>
              <td className="team_container__tr-heading-item">AVG</td>
              <td className="team_container__tr-heading-item">GB</td>
            </tr>
          </thead>
          <tbody>{this.renderTeams()}</tbody>
        </table>
      </TeamDataContainer>
    );
  }
}

Standings.propTypes = {
  standings: PropTypes.object.isRequired,
  selected_team: PropTypes.object.isRequired,
  teams: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    standings: state.standings,
    selected_team: state.team.team,
    teams: state.teams
  };
};

export default connect(mapStateToProps)(Standings);
