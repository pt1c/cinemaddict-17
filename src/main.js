import { AUTHORIZATION, END_POINT } from './const.js';
import StatisticsView from './view/statistics-view.js';
import { render } from './framework/render.js';

import FilmsPresenter from './presenter/films-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ProfilePresenter from './presenter/profile-presenter.js';

import FilmsModel from './model/film-model.js';
import FilterModel from './model/filter-model.js';

import FilmsApiService from './films-api-service.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const statisticsFooterElement = document.querySelector('.footer__statistics');

const filmModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();


const mainMenuPresenter = new FilterPresenter(siteMainElement, filterModel, filmModel);
const filmsPresenter = new FilmsPresenter(siteMainElement, filmModel, filterModel);
const profilePresenter = new ProfilePresenter(siteHeaderElement, filmModel);

mainMenuPresenter.init();
filmsPresenter.init();
filmModel.init().finally(() => {
  render(new StatisticsView(filmModel.count), statisticsFooterElement);
  profilePresenter.init();
});
