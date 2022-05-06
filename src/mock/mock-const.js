const GENERATE_FILMS = 21;
const GENERATE_COMMENTS = 50;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 5;
const MIN_DESCRIPTION_SENTENCES = 2;
const MAX_DESCRIPTION_SENTENCES = 5;
const MIN_GENRES = 1;
const MAX_GENRES = 5;
const MIN_RUNTIME = 10;
const MAX_RUNTIME = 300;
const POSTER_PRE_URL = './images/posters/';
const MIN_WRIGHTERS = 1;
const MAX_WRIGHTERS = 4;
const MIN_ACTORS = 1;
const MAX_ACTORS = 10;
const MIN_RATING = 1;
const MAX_RATING = 10;

const TITLES = [
  'Made for Each Other',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trail',
  'Santa Claus Conquers the Martians',
  'The Dance of Life',
  'The Great Flamarion',
  'The Man with the Golden Arm',
];

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const FILM_GENRES = [
  'Horror',
  'Sports',
  'War',
  'Westerns',
  'Comedy',
  'Crime',
  'Horror',
  'Sci-Fi',
  'Sports',
  'Westerns',
  'Action',
  'Comedy',
  'Crime',
  'Horror',
  'Melodramas',
  'Musicals',
  'Romance'
];

const AGE_RATINGS = [6, 12, 16, 18];

const PEOPLE_NAMES = [
  'Morgan Freeman',
  'Takeshi Kitano',
  'Tom Ford',
  'Robert De Niro',
  'Jack Nicholson',
  'Marlon Brando',
  'Denzel Washington',
  'Katharine Hepburn',
  'Humphrey Bogart',
  'Meryl Streep',
  'Daniel Day-Lewis',
  'Sidney Poitier',
  'Clark Gable',
  'Ingrid Bergman',
  'Tom Hanks',
  'Elizabeth Taylor',
  'Bette Davis',
  'Gregory Peck',
  'Leonardo DiCaprio',
  'Cate Blanchett',
  'Audrey Hepburn',
  'Spencer Tracy',
  'Kate Winslet',
  'Shah Rukh Khan',
  'Viola Davis',
  'Sophia Loren',
  'Cary Grant',
  'Vivien Leigh',
  'Marilyn Monroe',
  'Laurence Olivier',
  'James Stewart',
  'Steve McQueen',
  'Diane Keaton',
  'Julia Roberts',
  'Jodie Foster',
  'Judy Garland'
];

const COUNTRIES = [
  'Russia',
  'Norway',
  'USA',
  'Peru',
  'Saint Lucia',
  'Saint Kitts and Nevis',
  'Spain',
  'Ghana',
  'China'
];

const EMOCTION = ['smile', 'sleeping', 'puke', 'angry'];

export {
  GENERATE_FILMS,
  GENERATE_COMMENTS,
  TITLES,
  POSTERS,
  DESCRIPTIONS,
  MIN_DESCRIPTION_SENTENCES,
  MAX_DESCRIPTION_SENTENCES,
  FILM_GENRES,
  MIN_GENRES,
  MAX_GENRES,
  MIN_RUNTIME,
  MAX_RUNTIME,
  POSTER_PRE_URL,
  AGE_RATINGS,
  PEOPLE_NAMES,
  MIN_WRIGHTERS,
  MAX_WRIGHTERS,
  MIN_ACTORS,
  MAX_ACTORS,
  COUNTRIES,
  MIN_RATING,
  MAX_RATING,
  MIN_COMMENTS,
  MAX_COMMENTS,
  EMOCTION
};
