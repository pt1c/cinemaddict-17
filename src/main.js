import UserProfileView from './view/user-profile-view.js';
import MainMenuView from './view/main-menu-view.js';
import StatisticsView  from './view/statistics-view.js';
import {render} from './render.js';

import FilmsPresenter from './presenter/films-presenter.js';

import FilmsModel from './model/film-model.js';
// import CommentModel from './model/comment-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const statisticsFooterElement = document.querySelector('.footer__statistics');

render(new UserProfileView(), siteHeaderElement);
render(new MainMenuView(), siteMainElement);

const filmModel = new FilmsModel();
// const commentModel = new CommentModel();

const filmsPresenter = new FilmsPresenter();
filmsPresenter.init(siteMainElement, filmModel);

render(new StatisticsView(), statisticsFooterElement);

// //Временно открытый popup {
// import FilmDetailsView from './view/film-details-view.js';
// const films = [...filmModel.films];
// const comments = [...commentModel.comments];
// render(new FilmDetailsView(films[0], comments), siteMainElement);
// // }
