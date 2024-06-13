import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Datepiker = ({ handleDateChange, selecteddate }) => {
  const [selected, setSelected] = useState(selecteddate);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    format(selected, "PP");
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  useEffect(() => {
    handleDateChange(selected);
  }, [selected, selecteddate]);

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={footer}
    />
  );
};

export default Datepiker;
