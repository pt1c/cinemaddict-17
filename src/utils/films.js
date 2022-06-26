import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const sortFilmsByRating = (filmA, filmB) => (filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);
const sortFilmsByDate = (filmA, filmB) => (dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date)));

const getTopRatedFilms = (films) => {
  const topRatedTwoFilms = Array.from(films.values()).sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating).slice(0, 2);
  return topRatedTwoFilms;
};

const getMostCommentedFilms = (films) => {
  const topRatedTwoFilms = Array.from(films.values()).sort((a, b) => b.commentsIds.length - a.commentsIds.length).slice(0, 2);
  return topRatedTwoFilms;
};

dayjs.extend(duration);

export {
  sortFilmsByRating,
  sortFilmsByDate,
  getTopRatedFilms,
  getMostCommentedFilms
};
