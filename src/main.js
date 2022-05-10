import { FILTER_TYPES } from './const.js';
import UserProfileView from './view/user-profile-view.js';
import MainMenuView from './view/main-menu-view.js';
import StatisticsView from './view/statistics-view.js';
import { render } from './framework/render.js';

import FilmsPresenter from './presenter/films-presenter.js';

import FilmsModel from './model/film-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const statisticsFooterElement = document.querySelector('.footer__statistics');

const filmModel = new FilmsModel();

render(new UserProfileView(), siteHeaderElement);
render(new MainMenuView(filmModel.filtered, FILTER_TYPES.ALL), siteMainElement); //TODO: active

const filmsPresenter = new FilmsPresenter(siteMainElement, filmModel);
filmsPresenter.init();

render(new StatisticsView(filmModel.count), statisticsFooterElement);
