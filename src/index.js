import React from 'react';
import ReactDOM from 'react-dom';
import MedFeed from './components/MedFeed';
import CreateCaseBox from './components/CreateCaseBox';
import ShortProfile from './components/ShortProfile';
import EditProfile from './components/EditProfile';
import SearchBox from './components/SearchBox';
import MedCaseModalArray from './components/MedCaseModalArray';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import $ from 'jquery';
window.jQuery = window.$ = $;
require('bootstrap/dist/js/bootstrap.min.js');

ReactDOM.render(
  <ShortProfile />
  ,document.getElementById('profile'));

ReactDOM.render(
  <SearchBox />
  ,document.getElementById('searchBox'));

ReactDOM.render(
  <MedFeed />
  ,document.getElementById('medFeed'));

ReactDOM.render(
  <CreateCaseBox />
  ,document.getElementById('createCase'));

ReactDOM.render(
  <MedCaseModalArray />
  ,document.getElementById('medCases'));

ReactDOM.render(
  <EditProfile />
  ,document.getElementById('editProfile'));

registerServiceWorker();