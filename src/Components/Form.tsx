import React, { useState, useEffect } from "react";
import {
  Entry,
  generateStartDate,
  parseTimeField,
  createStartDate,
  startDateToInputValue
} from "../lib";
import { connect } from "react-redux";
import { actions } from "../ducks/entries";
import { nanoid } from "nanoid";

const Form = (props: { entryAdded: any }) => {
  const [startDate, setStartDate] = useState(generateStartDate());
  const [duration, setDuration] = useState(10);
  const [details, setDetails] = useState("");

  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartDate(generateStartDate());
    }, 60000);

    return function cleanup() {
      clearTimeout(timeout);
    };
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const now = new Date();

          const newEntry = {
            id: nanoid(),
            createdAt: JSON.stringify(now),
            startDate: JSON.stringify(startDate),
            duration,
            details,
          };

          const newEntries = entries.concat(newEntry);

          props.entryAdded(newEntry);
          setEntries(newEntries);
        }}
      >
        <label>Enter start time:</label>
        <input
          value={startDateToInputValue(startDate)}
          onChange={(e) => {
            const [hours, minutes] = parseTimeField(e.target.value);
            setStartDate(createStartDate(hours, minutes));
          }}
          step="300"
          type="time"
        />
        <br />

        <label>Enter duration:</label>
        <input
          onChange={(e) => setDuration(parseInt(e.target.value))}
          value={duration}
          step="5"
          type="number"
        />
        <br />

        <label>Enter detail:</label>
        <input
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          type="text"
          required
        />
        <br />

        <button type="submit">Save</button>
      </form>
    </>
  );
};

const mapDispatch = {
  entryAdded: actions.entryAdded,
};

export default connect(null, mapDispatch)(Form);
