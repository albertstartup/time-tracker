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
    entryAdded: entriesAdapter.addOne,
    entryRemoved: entriesAdapter.removeOne,
    entryUpdated: entriesAdapter.updateOne
  }
});

const reducer = entriesSlice.reducer

export const actions = entriesSlice.actions

export const selectors = entriesAdapter.getSelectors()

export default reducer