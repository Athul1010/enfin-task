"use client"; 

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'tailwindcss/tailwind.css';

export default function Availability() {
  const [participantIds, setParticipantIds] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = async () => {
    const input = {
      participant_ids: participantIds,
      date_range: {
        start: startDate.toLocaleDateString('en-GB'),
        end: endDate.toLocaleDateString('en-GB'),
      },
    };

    const response = await fetch('/api/check-slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const data = await response.json();
    console.log(data); // Display output
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Check Participant Availability</h1>
      <div className="mb-4">
        <label htmlFor="participants" className="block mb-2">Participants</label>
        <select
          id="participants"
          multiple
          className="block w-full p-2 border border-gray-300 rounded"
          onChange={(e) =>
            setParticipantIds([...e.target.selectedOptions].map((o) => o.value))
          }
        >
          <option value="1">Adam</option>
          <option value="2">Bosco</option>
          <option value="3">Catherine</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="start-date" className="block mb-2">Start Date</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="end-date" className="block mb-2">End Date</label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Check Slots
      </button>
    </div>
  );
}
