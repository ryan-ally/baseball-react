import React from "react";
import PropTypes from "prop-types";
import TeamDataContainer from "./TeamDataContainer";

class Schedule extends React.Component {
  render() {
    const { game, heading, team } = this.props;

    const awayTeam = (
      <div className="game__team game__team--away">
        {game.teams.away.team.name} @
      </div>
    );
    const homeTeam = (
      <div className="game__team game__team--home">
        {game.teams.home.team.name}{" "}
      </div>
    );
    const status = game.status.detailedState;
    let gameTime = new Date(game.gameDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    gameTime = gameTime.charAt(0) === "0" ? gameTime.slice(1) : gameTime;

    return (
      <TeamDataContainer heading={heading} className="schedule" team={team}>
        <div className="game">
          <div className="game__detail">
            {game.status.statusCode !== "S" ? status : gameTime}
          </div>
          {awayTeam}
          {homeTeam}
        </div>
      </TeamDataContainer>
    );
  }
}

Schedule.propTypes = {
  game: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired
};

export default Schedule;
