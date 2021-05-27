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

export function getEpisodes(page = 1, api = makeApi()) {
  return api.get(`/character?page=${page}`);
}

export function getEpisode(characterId, api = makeApi()) {
  return api.get(`/character/${characterId}`);
}

export function getUrl(url, api = makeApi()) {
  return api.get(url);
}
