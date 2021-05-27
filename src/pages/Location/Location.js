import React, { Component } from "react";

import { getLocation, getUrl } from "../../components/api";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

function makePromises(urls = []) {
  return urls.map((url) => getUrl(url));
}

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      residents: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,

      id: "",
      name: "",
      type: "",
      dimension: "",
      url: "",
      created: "",
    };
    this.loadLocation = this.loadLocation.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { locationId } = match.params;
    this.loadCharacter(locationId);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  async loadLocation(locationId) {
    // console.log(page);
    try {
      const { data } = await getLocation(locationId);
      console.table(data);

      const residentsResponse = await Promise.all(makePromises(data.location));
      const residents = residentsResponse.map((residents) => resident.data);

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

  render() {
    const {
      location,
      residents,
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

export default Location;
