import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { compareDates } from "utils";
import { Entry } from "./utils";

const entriesAdapter = createEntityAdapter<Entry>({
  sortComparer: (a, b) => -compareDates(a.createdAt, b.createdAt)
})

const entriesSlice = createSlice({
  name: 'entries',
  initialState: entriesAdapter.getInitialState(),
  reducers: {
    addEntry: entriesAdapter.addOne,
    removeEntry: entriesAdapter.removeOne,
    updateEntry: entriesAdapter.updateOne
  }
});

const reducer = entriesSlice.reducer

export const actions = entriesSlice.actions

export const selectors = entriesAdapter.getSelectors()

export default reducer