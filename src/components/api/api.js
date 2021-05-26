import axios from "axios";
import * as rout from "../../constants/routes";


 function makeAPI() {
    return axios.create({
        baseURL:"https://rickandmortyapi.com/api",
    });   
}

export function getEpisodesP(page =1, api=makeAPI()){

    return  api.get(`${rout.EPISODE}?page=${page}`)
}

