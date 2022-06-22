export const getRank = (movies) => {
  const watched = movies.filter((item) => item.userDetails.alreadyWatched);
  const watchedCount = watched.length;

  const Rank = {
    NONE: '',
    NOVICE: 'Novice',
    FAN: 'Fan',
    MOVIE_BUFF: 'Movie Buff',
  };

  const NONE_COUNT = 0;
  const MIN_NOVICE_COUNT = 1;
  const MAX_NOVICE_COUNT = 10;
  const MIN_FAN_COUNT = 11;
  const MAX_FAN_COUNT = 20;
  const MOVIE_BUFF_COUNT = 21;

  if (watchedCount === NONE_COUNT) {
    return '';
  }

  if (watchedCount >= MIN_NOVICE_COUNT && watchedCount <= MAX_NOVICE_COUNT) {
    return Rank.NOVICE;
  }

  if (watchedCount >= MIN_FAN_COUNT && watchedCount <= MAX_FAN_COUNT) {
    return Rank.FAN;
  }

  if (watchedCount >= MOVIE_BUFF_COUNT) {
    return Rank.MOVIE_BUFF;
  }
};
