import React, { useState, useEffect, FormEvent, useRef } from "react";
import {
  generateStartDate,
  parseTimeField,
  createStartDate,
  startDateToInputValue,
} from "utils";
import { useDispatch } from "react-redux";
import { actions } from "features/entries/entriesSlice";
import { generateEntry } from "features/entries/utils";
import { GlobalHotKeys } from "react-hotkeys";

const Form = () => {
  const [startDate, setStartDate] = useState(generateStartDate());
  const [duration, setDuration] = useState(10);
  const [details, setDetails] = useState("");

  const dispatch = useDispatch();

  const detailInputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartDate(generateStartDate());
    }, 10000);

    return function cleanup() {
      clearTimeout(timeout);
    };
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newEntry = generateEntry(startDate, duration, details);
    dispatch(actions.addEntry(newEntry));
  };

  const keyMap = {
    focusEntryDetailsInput: "ctrl+a",
  };

  const hotkeyHandlers = {
    focusEntryDetailsInput: () => {      
      detailInputRef.current && detailInputRef.current.focus();
    },
  };

  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={hotkeyHandlers} />
      <form onSubmit={onSubmit}>
        <label>Enter start time:</label>
        <input
          value={startDateToInputValue(startDate)}
          onChange={(e) => {
            const [hours, minutes] = parseTimeField(e.target.value);
            setStartDate(createStartDate(hours, minutes));
          }}
          step="300"
          type="time"
          autoFocus
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
          ref={detailInputRef}
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

export default Form;
