"use client"; // Enable React hooks

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import axios from "axios";

const Availability = () => {
  const [participantIds, setParticipantIds] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [result, setResult] = useState(null);

  // Function to handle form submission
  const handleSubmit = () => {
    const input = {
      participant_ids: participantIds,
      date_range: {
        start: startDate?.toLocaleDateString("en-GB"),
        end: endDate?.toLocaleDateString("en-GB"),
      },
    };

    axios
      .post("/api/check-slots", input)
      .then((response) => setResult(response.data)) // Set response data to result state
      .catch((error) => console.error("Error fetching slots:", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Check Participant Availability</h1>

      {/* Multi-select Dropdown */}
      <div className="mb-4">
        <label htmlFor="participants" className="block mb-2">
          Participants
        </label>
        <select
          id="participants"
          multiple
          className="block w-full p-2 border border-gray-300 rounded"
          onChange={(e) =>
            setParticipantIds(
              [...e.target.selectedOptions].map((o) => parseInt(o.value))
            )
          }
        >
          <option value="1">Adam</option>
          <option value="2">Bosco</option>
          <option value="3">Catherine</option>
        </select>
      </div>

      {/* Start Date Picker */}
      <div className="mb-4">
        <label htmlFor="start-date" className="block mb-2">
          Start Date
        </label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* End Date Picker */}
      <div className="mb-4">
        <label htmlFor="end-date" className="block mb-2">
          End Date
        </label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Check Slots
      </button>

      {/* Display Results */}
      {result && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Available Slots</h2>
          {Object.entries(result).map(([date, slots]) => (
            <div key={date}>
              <h3 className="text-md font-semibold">{date}</h3>
              <ul className="list-disc ml-6">
                {slots.map((slot, index) => (
                  <li key={index}>{slot}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Availability;
