import React from 'react';
import ReactDOM from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronRight,
  faChevronLeft,
  faMagnifyingGlass,
  faTrashCan,
  faFont,
  faLink,
  faPlus,
  faImage,
  faBars,
  faShareFromSquare,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import './assets/themes/searchidea-bootstrap.scss';
import './index.scss';
import config from './config';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { AccountLayout, DefaultLayout } from './views/layouts';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// import fontawesome icons for global use
library.add(
  faChevronLeft, faChevronRight, faMagnifyingGlass, faTrashCan,
  faFont, faLink, faPlus, faImage, faBars, faShareFromSquare,
  faPenToSquare,
);

// initial website title
document.title = config.PRODUCT_NAME;

// set axios default to bring session cookie
axios.defaults.withCredentials = true;

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container fluid>
        <Routes>
          <Route path='/login' element={<AccountLayout />} />
          <Route path='/*' element={<DefaultLayout />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
