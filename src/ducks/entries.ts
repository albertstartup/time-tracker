import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { Entry, compareDates } from "../lib";

const entriesAdapter = createEntityAdapter<Entry>({
  sortComparer: (a, b) => -compareDates(a.created, b.created)
})

const entriesSlice = createSlice({
  name: 'entries',
  initialState: entriesAdapter.getInitialState(),
  reducers: {
    entryAdded: entriesAdapter.addOne,
    entryRemoved: entriesAdapter.removeOne
  }
});

const reducer = entriesSlice.reducer

export const actions = entriesSlice.actions

export const selectors = entriesAdapter.getSelectors()

export default reducer