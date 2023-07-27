import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import {
  AuthReducer,
  GlobalReducer,
  SearchMapperReducer,
  SearchReducer,
} from "./reducers";

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    global: GlobalReducer,
    auth: AuthReducer,
    search: SearchReducer,
    searchMapper: SearchMapperReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
