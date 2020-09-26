import React, { FormEvent, useState } from "react";
import { actions } from "features/entries/entriesSlice";
import {
  createStartDate,
  parseTimeField,
  startDateToInputValue,
} from "utils";
import { Entry } from "features/entries/utils";
import { useDispatch } from "react-redux";

interface EditProps {
  entry: Entry;
  setEditingEntryId: (id: string) => void;
}

const Edit = (props: EditProps) => {
  const [startDate, setStartDate] = useState(props.entry.startDate);
  const [duration, setDuration] = useState(props.entry.duration);
  const [details, setDetails] = useState(props.entry.details);

  const dispatch = useDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(actions.updateEntry({
      id: props.entry.id,
      changes: { startDate, duration, details },
    }));
    props.setEditingEntryId("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={startDateToInputValue(startDate)}
        onChange={(e) => {
          const [hours, minutes] = parseTimeField(e.target.value);
          setStartDate(createStartDate(hours, minutes));
        }}
        step="300"
        type="time"
      />

      <input
        onChange={(e) => setDuration(parseInt(e.target.value))}
        value={duration}
        step="5"
        type="number"
      />

      <input
        onChange={(e) => setDetails(e.target.value)}
        value={details}
        type="text"
        required
      />

      <button type="submit">Save</button>
    </form>
  );
};

export default Edit;
