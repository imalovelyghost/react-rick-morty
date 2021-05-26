import React, { Component } from "react";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import { getEpisodesP } from "../../components/api/api";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // page: 1,
      // paginationInfo: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      // errorMessage: true,
    };
  }

  async componentDidMount() {
    this.loadEpisodes();
  }
  
  async loadEpisodes() { 
    try{
    const {data} = await getEpisodesP();
    const {results} = data;
    this.setState({
      episodes:results,
      hasLoaded:true,
    })
  }catch{
    this.setState({
      hasError:true,
    })
  }
  }

  render() {
      const{hasLoaded}=this.state;
      const{hasError}=this.state;
      const{episodes}=this.state;
      // const{errorMessage}=this.state
    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )} 
          {hasError && (
          <div className="col col-12"> 
            <h1>ERrrrrroooooorr capullo</h1>
          </div>
          )}
           {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              /> 
            ))}
          <div className="col col-12">
            <hr />
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
