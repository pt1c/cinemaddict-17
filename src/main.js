import UserProfileView from './view/user-profile-view.js';
import MainMenuView from './view/main-menu-view.js';
import StatisticsView from './view/statistics-view.js';
import { render } from './render.js';

import FilmsPresenter from './presenter/films-presenter.js';

import FilmsModel from './model/film-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const statisticsFooterElement = document.querySelector('.footer__statistics');

render(new UserProfileView(), siteHeaderElement);
render(new MainMenuView(), siteMainElement);

const filmModel = new FilmsModel();

const filmsPresenter = new FilmsPresenter();
filmsPresenter.init(siteMainElement, filmModel);

render(new StatisticsView(), statisticsFooterElement);
