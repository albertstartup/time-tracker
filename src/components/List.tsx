import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { displayStartDate, startDateIsSameDay, startDateIsToday } from "utils";
import { selectors, actions } from "features/entries/entriesSlice";
import Edit from "./Edit";
import { createSelector } from "@reduxjs/toolkit";

const selectAllEntries = createSelector(
  (state: RootState) => state.entries,
  selectors.selectAll
);

const selectEntriesOfToday = createSelector(selectAllEntries, (entries) =>
  entries.filter((entry) => startDateIsToday(entry.startDate))
);

const selectEntriesOfDate = createSelector(
  selectAllEntries,
  (_: any, dateToDisplay: Date) => dateToDisplay,
  (entries, dateToDisplay: Date) =>
    entries.filter((entry) =>
      startDateIsSameDay(entry.startDate, dateToDisplay)
    )
);

const subtractDayFromDate = (date: Date) => {
  const newDate = new Date();
  newDate.setDate(date.getDate() - 1)
  return newDate;
};

const addDayToDate = (date: Date) => {
  const newDate = new Date();
  newDate.setDate(date.getDate() + 1)
  return newDate;
};

const List = () => {
  const [editingEntryId, setEditingEntryId] = useState("");
  const [dateToDisplay, setDateToDisplay] = useState(new Date());

  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) =>
    selectEntriesOfDate(state, dateToDisplay)
  );

  return (
    <div>
      <h1>Entries: </h1>
      {entries.map((entry) => {
        if (editingEntryId === entry.id) {
          return (
            <Edit
              entry={entry}
              setEditingEntryId={setEditingEntryId}
              key={entry.id}
            />
          );
        } else {
          return (
            <div key={entry.id}>
              {displayStartDate(entry.startDate) + " " + entry.details}

              <button onClick={() => dispatch(actions.removeEntry(entry.id))}>
                X
              </button>
              <button onClick={() => setEditingEntryId(entry.id)}>Edit</button>
            </div>
          );
        }
      })}
      <button onClick={() => setDateToDisplay(subtractDayFromDate(dateToDisplay))}>&lt; Previous Day</button>
      <button onClick={() => setDateToDisplay(new Date())}>Today</button>
      <button onClick={() => setDateToDisplay(addDayToDate(dateToDisplay))}>Next Day &gt;</button>
    </div>
  );
};

export default List;
