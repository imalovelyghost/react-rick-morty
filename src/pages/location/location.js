import React, { Component } from "react";
// import { getEpisode, getCharacters } from "../../components/api/api";
import Layout from "../../components/Layout";
import { getUrls, getLocation } from "../../components/api/api";
import CharacterCard from "../../components/CharacterCard";

function makePromises(Urls=[]){
    return Urls.map((Url) =>getUrls(Url) )
  }

class Location extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
       locations:[],
    //    locationN:"",
    //    locationD:"",
    //    locationT:"",
       hasLoaded: false,
       hasError: false,
       errorMessage: null,
      };
     this.loadEpisodes = this.loadEpisodes.bind(this);
    }

    componentDidMount(){
        const{match} = this.props;
        const {locationId} = match.params;
        
        console.log(match);
        console.log(locationId);
         this.loadEpisodes(locationId)
        }
       
       
    async loadEpisodes(location) { 
        const {data}= await getLocation(location);
        const { name, type,dimension } = data;
        const residentsCall=await Promise.all(makePromises(data.residents))
        const dataResident=residentsCall.map((resident) => resident.data)
     
         console.log(data);
         console.log(this);
         this.setState({
            locations:dataResident,
            // locationN:name,
            // locationD:type,
            // locationT:dimension,

         })
        
       }

render() {
    const { 
            locations,
            // locationN,
            // locationD,
            // locationT,
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
             
          {locations.map((location) => (
              <CharacterCard
                key={location.id}
                id={location.id}
                name={location.name}
                image={location.image}
                species={location.species}
                status={location.status}
                origin={location.origin}
                location={location.location}
                // locationN={locationN}
                // locationD={locationD}
                // locationT={locationT}
              />
            ))}
             
          </div>
        </section>
      </Layout>
    );
  }
}

export default Location;