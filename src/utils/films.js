import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const sortFilmsByRating = (filmA, filmB) => (filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);
const sortFilmsByDate = (filmA, filmB) => (dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date)));

dayjs.extend(duration);

export {
  sortFilmsByRating,
  sortFilmsByDate
};
