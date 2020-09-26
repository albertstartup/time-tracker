import { combineReducers } from "@reduxjs/toolkit";
import entriesReducer from "features/entries/entriesSlice";

const rootReducer = combineReducers({
  entries: entriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
