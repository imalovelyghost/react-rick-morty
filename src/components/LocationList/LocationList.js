import React, { Component } from "react";
import EpisodeCard from "../EpisodeCard";

class LocationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: props.locations ? props.locations : [],
    };
  }

  render() {
    const { locations } = this.state;

    return (
      <>
        {locations.length > 0 &&
          locations.map((location) => (
            <EpisodeCard
              key={location.id}
              id={location.id}
              name={location.name}
              airDate={location.air_date}
              location={location.episode}
            />
          ))}
      </>
    );
  }
}

export default LocationList;
