import React, { FormEvent, useState } from "react";
import { connect } from "react-redux";
import { actions } from "../ducks/entries";
import {
  createStartDate,
  Entry,
  parseTimeField,
  startDateToInputValue,
} from "../lib";

interface EditProps {
  entry: Entry;
  setEditingEntryId: (id: string) => void;
  entryUpdated: any;
}

const Edit = (props: EditProps) => {
  const [startDate, setStartDate] = useState(props.entry.startDate);
  const [duration, setDuration] = useState(props.entry.duration);
  const [details, setDetails] = useState(props.entry.details);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    props.entryUpdated({
      id: props.entry.id,
      changes: { startDate, duration, details },
    });
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

const mapDispatch = {
  entryUpdated: actions.entryUpdated,
};

export default connect(null, mapDispatch)(Edit);
