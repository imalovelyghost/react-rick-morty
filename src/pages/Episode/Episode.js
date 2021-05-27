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
      });
    } catch (error) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: error.errorMessage,
      });
    }
  }

  // async loadCharacter(characterId) {
  //   console.log(this);
  //   try {

  //     const { datos } = await getCharacter(characterId);
  //     console.log(datos);
  //     console.log(characterId);

  //     // const promises = data.characters.map((character) => axios.get(character));

  //     // const charactersResponse = await Promise.all(
  //     //   makePromises(data.characters),
  //     // );
  //     // const characters = charactersResponse.map((character) => character.data);
  //     // // console.log(data);
  //     // // console.log(charactersResponse);
  //     // // console.log(characters);
  //     // this.setState({
  //     //   hasLoaded: true,
  //     //   episode: data,
  //     //   characters: characters,
  //     // });
  //   } catch (error) {
  //     this.setState(
  //     //   {
  //     //   // hasLoaded: true,
  //     //   // hasError: true,
  //     //   // errorMessage: error.errorMessage,
  //     // }
  //     console.log("ERROR HERE")

  //     );
  //   }
  // }
  

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
          {/* {episode && JSON.stringify(episode, null, 2)} */}
          {hasLoaded && (
            <div className="col col-12">
              <h1>{episode.name}</h1>
              <h1>{episode.air_date}</h1>
            </div>
          )}
          <hr />
          {characters.length > 0 &&
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
