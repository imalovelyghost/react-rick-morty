import React, { Component } from "react";

import { getCharacter, getUrl } from "../../components/api";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import EpisodeList from "../../components/EpisodeList";

function makePromises(urls = []) {
  return urls.map((url) => getUrl(url));
}

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: [],
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
      name: "",
      status: "",
      species: "",
      gender: "",
      origin: "",
      location: "",
      image: "",
      url: "",
      created: "",
    };
    this.loadCharacter = this.loadCharacter.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { characterId } = match.params;
    this.loadCharacter(characterId);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  async loadCharacter(characterId) {
    // console.log(page);
    try {
      const { data } = await getCharacter(characterId);
      console.table(data);

      const episodesResponse = await Promise.all(makePromises(data.episode));
      const episodes = episodesResponse.map((episode) => episode.data);

      this.setState({
        hasLoaded: true,
        episodes: episodes,
        name: data.name,
        status: data.status,
        species: data.species,
        gender: data.gender,
        origin: data.origin.name,
        location: data.location.name,
        image: data.image,
        url: data.url,
        created: data.created,
      });
    } catch (error) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: error.errorMessage,
      });
    }
  }

  render() {
    const {
      episodes,
      hasLoaded,
      hasError,
      errorMessage,
      name,
      status,
      species,
      gender,
      origin,
      location,
      image,
      episode,
      url,
      created,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <p>Character not loaded...</p>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p>Character error...</p>
              <p>{errorMessage}</p>
            </div>
          )}
          <hr />
          {/* {character && JSON.stringify(episode, null, 2)} */}
          <hr />
          {hasLoaded && (
            
            <div className="col col-12">
              <h4>Información de {name}</h4>
              <img src={image} />
              <h5>CHARACTER</h5>
              <p>Estatus del personaje : {status}</p>
              <p>Especie del personaje : {species}</p>
              <p>Creación del personaje : {created}</p>
              <h5>ORIGIN</h5>
              <p>{origin}</p>
              <h5>LOCATION</h5>
              <p>{location}</p>
              <h4>Episodios en los que aparece {name} :</h4>
            </div>
           
          )}
          {episodes.length > 0 && <EpisodeList episodes={episodes} />}
          <div className="col col-12">
            <hr />
          </div>
        </section>
      </Layout>
    );
  }
}

export default Character;
