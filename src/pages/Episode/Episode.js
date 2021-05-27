import React, { Component } from "react";
import { getEpisode } from "../../components/api/api";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
       // episode: null,
        characters: [],
       hasLoaded: false,
       hasError: false,
       errorMessage: null,
    };
  this.loadEpisodes = this.loadEpisodes.bind(this);
  }

  componentDidMount(){
   const{match} = this.props;
   const {episodeId} = match.params;
   this.loadEpisodes(episodeId)
  }
  
  async loadEpisodes(episode) { 
   const {data}= await getEpisode(episode);
   console.log(data);
   console.log(this.props);
  }

  render() {
    const { characters,
            hasLoaded,
            hasError,
            errorMessage
          } = this.state;
    return (
      <Layout>
        <section className="row">
        {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )} 
           {!hasLoaded &&  (
            <div className="col col-12">
              <h1>Is loading , Wait!!</h1>
            </div>
          )} 
          {hasError && (
          <div className="col col-12"> 
            <h1>{errorMessage}</h1>
          </div>
          )}
          <div className="col col-12">
            {characters.map((character) => (
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
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
