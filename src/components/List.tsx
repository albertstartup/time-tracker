import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { displayStartDate, startDateIsToday } from "utils";
import { selectors, actions } from "features/entries/entriesSlice";
import Edit from "./Edit";
import { createSelector } from "@reduxjs/toolkit";

const allEntriesSelector = createSelector(
  (state: RootState) => state.entries,
  selectors.selectAll
);

const List = () => {
  const [editingEntryId, setEditingEntryId] = useState("");

  const dispatch = useDispatch();
  const entries = useSelector(allEntriesSelector);

  return (
    <>
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
    </>
  );
};

export default List;
