import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

import { getEpisode } from "../../components/api";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadEpisode = this.loadEpisode.bind(this);
  }

  componentDidMount() {
    // console.log(this.props)
    const { match } = this.props;
    const { episodeId } = match.params;

    console.log(episodeId)
  }

  async loadEpisode() {
    console.log(this);
  }

  render() {
    const {
      episode,
      characters,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <p>Episode not loaded...</p>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p>Episode error...</p>
              <p>{errorMessage}</p>
            </div>
          )}
          <hr />
          {episode && JSON.stringify(episode, null, 2)}
          <hr />
          {characters.lenght > 0 &&
            characters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
                status={character.status}
                origin={character.origin}
                location={character.location}
              />
            ))}
        </section>
      </Layout>
    );
  }
}

export default Episode;
