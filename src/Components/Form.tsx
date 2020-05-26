import React, { useState, useEffect } from "react";
import { Entry, getMinutesRoundedDown5, padMinutes } from "../lib";
import { connect } from "react-redux";
import { actions } from "../ducks/entries";
import { nanoid } from "nanoid";

const generateStartTime = () => {
  const now = new Date();
  const startTime = now.setMinutes(getMinutesRoundedDown5(now), 0);
  return new Date(startTime);
};

const createStartTime = (hours: number, minutes: number) => {
  const now = new Date();
  const startTime = now.setHours(hours, minutes, 0);
  return new Date(startTime);
};

const parseTimeField = (value: string) => {
  console.log("value:", value);
  return value.split(":").map((x) => parseInt(x));
};

const Form = (props: { entryAdded: any }) => {
  const [startTime, setStartTime] = useState<Date>(generateStartTime());
  const [duration, setDuration] = useState(10);
  const [details, setDetails] = useState("");

  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {      
      setStartTime(generateStartTime());
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
            created: JSON.stringify(now),
            startTime: JSON.stringify(startTime),
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
          value={
            startTime.getHours() + ":" + padMinutes(startTime.getMinutes())
          }
          onChange={(e) => {
            const [hours, minutes] = parseTimeField(e.target.value);
            setStartTime(createStartTime(hours, minutes));
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
          type="entry"
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
