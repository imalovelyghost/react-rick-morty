import React, { Component } from "react";
import EpisodeCard from "../EpisodeCard";

class EpisodeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: props.episodes ? props.episodes : [],
    };
  }

  render() {
    const { episodes } = this.state;

    return (
      <>
        {episodes.length > 0 &&
          episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              id={episode.id}
              name={episode.name}
              airDate={episode.air_date}
              episode={episode.episode}
            />
          ))}
      </>
    );
  }
}

export default EpisodeList;
