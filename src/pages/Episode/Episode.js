import React, { Component } from "react";
// import axios from "axios";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

import { getEpisode, getUrl } from "../../components/api";

function makePromises(urls = []) {
  return urls.map((url) => getUrl(url));
}

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
      name:"",
      image:"",
      status:"",
      species:"",
      created:"",
      location:"",
      episodes:[],
    };

    this.loadEpisode = this.loadEpisode.bind(this);
    // this.loadCharacter = this.loadCharacter.bind(this);
  }

  componentDidMount() {
    // console.log(this.props)
    const { match } = this.props;
    const { episodeId } = match.params;
    // const { characterId } = match.params;

    // console.log(episodeId)
    this.loadEpisode(episodeId);
    // this.loadCharacter(characterId);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  async loadEpisode(episodeId) {
    //  console.log(this);
    try {
      const { data } = await getEpisode(episodeId);
      // console.log(data.characters);
      // const promises = data.characters.map((character) => axios.get(character));

      const charactersResponse = await Promise.all(
        makePromises(data.characters),
      );
      const characters = charactersResponse.map((character) => character.data);
      // console.log(data);
      // console.log(charactersResponse);
      // console.log(characters);
      this.setState({
        hasLoaded: true,
        episode: data,
        characters: characters,
      episode: null,
      characters: [],
      name:data.name,
      image:data.image,
      status:data.status,
      species:data.species,
      created:data.created,
      location:data.location,
      episodes:[],
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

export default Episode;
