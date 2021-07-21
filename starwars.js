// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
import { AudioPlayer } from "./music.js";
import { friendlyFetch } from "./friendly-fetch.js";
import { intToRoman } from "./roman.js";
import { restartAnimation } from "./restart-animation.js";

const API_ENDPOINT = "https://swapi.dev/api";

const musicPlayer = new AudioPlayer();

const song = {
  audioUrl: "audio/tema-sw.mp3",
  coverImageUrl: "imgs/logo.svg",
  title: "Intro",
  artist: "John Williams",
};


//Autoplay desabilitado devido as novas politicas de autoplay do chrome
//https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
musicPlayer.start(song, document.body);

let movies = await friendlyFetch(`${API_ENDPOINT}/films`);
movies = movies.results;
movies.sort((a, b) => a.episode_id - b.episode_id);
console.log(movies);

const movieListEl = document.querySelector("#filmes ul");
movieListEl.innerHTML = "";
movies.map((movie) => {
  const listItemEl = document.createElement("li");
  let movieName = `Episode ${intToRoman(movie.episode_id)}`;
  movieName = movieName.padEnd(11, " ");
  movieName = `${movieName} - ${movie.title}`;
  listItemEl.associatedMovie = movie;

  const listItemText = document.createTextNode(movieName);
  listItemEl.appendChild(listItemText);

  movieListEl.addEventListener("click", showIntro);
  movieListEl.insertAdjacentElement("beforeend", listItemEl);
});

const introShowEl = document.querySelector("pre.introducao");
function showIntro(evt) {
  introShowEl.innerHTML = "";
  const newIntroText = `Episode ${intToRoman(
    evt.target.associatedMovie.episode_id
  )}
    ${evt.target.associatedMovie.title}
    
    ${evt.target.associatedMovie.opening_crawl}`;

  const newIntro = document.createTextNode(newIntroText);

  introShowEl.appendChild(newIntro);

  restartAnimation(introShowEl);
}
