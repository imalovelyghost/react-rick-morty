import axios from "axios";

export function makeApi() {
  return axios.create({
    baseURL: "https://rickandmortyapi.com/api",
  });
}
// EPISODES

export function getEpisodes(page = 1, api = makeApi()) {
  return api.get(`/episode?page=${page}`);
}

export function getEpisode(episodeId, api = makeApi()) {
  return api.get(`/episode/${episodeId}`);
}

// CHARACTERS

export function getCharacters(page = 1, api = makeApi()) {
  return api.get(`/character?page=${page}`);
}

export function getCharacter(characterId, api = makeApi()) {
  return api.get(`/character/${characterId}`);
}

// LOCATION

export function getLocations(page = 1, api = makeApi()) {
  return api.get(`/location?page=${page}`);
}

export function getLocation(locationId, api = makeApi()) {
  return api.get(`/location/${locationId}`);
}

export function getUrl(url, api = makeApi()) {
  return api.get(url);
}
