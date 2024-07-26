import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);

  // Fetch all meeting
  useEffect(() => {
    fetch("http://localhost:5000/meeting/getMeetings")
      .then((res) => res.json())
      .then((data) => {
        setMeetings(data);
      });
  }, []);

  // Delete a meeting
  const handleDelete = (meetingId) => {
    fetch(`http://localhost:5000/meeting/deleteMeeting/${meetingId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setMeetings(data);
        window.location.reload();
      });
  };

  return (
    <div className=" border-2 w-full p-5 rounded-2xl ml-96 mt-20 mr-5">
      <div className="flex justify-between">
        <h1 className="mt-5 text-[#52B14A] font-bold text-3xl">Meeting</h1>
        <Link to={"createMeeting"}>
          <button
            type="button"
            class=" mt-5 focus:outline-none text-white bg-[#32a3a9] hover:bg-[#26777b] focus:ring-2 focus:ring-emerald-500 font-medium rounded-3xl text-m px-5 py-2.5"
          >
            Create a Meeting
          </button>
        </Link>
      </div>
      <div className="bg-cyan-50 p-3 mt-5 rounded-2xl px-5 border">
        <div className="xl:grid xl:grid-cols-3 gap-10 mt-5">
          {meetings.map((meeting, i) => (
            <div key={i} class=" p-6 border border-[#52B14A] rounded-lg shadow-xl bg-white">
              <div className="flex justify-between">
                <h4 className="text-[#003E81]">{meeting.date}</h4>
                <h4 className="text-[#003E81]">
                  {meeting.startTime} - {meeting.endTime}
                </h4>
              </div>
              <div className="text-center mt-5 font-semibold text-lg">
                <h3 className="text-[#003E81]">{meeting.purpose}</h3>
                <h3 className="text-[#52B14A]">{meeting.location}</h3>
              </div>
              <div className="flex justify-between mt-5">
                <Link to={`/meeting/viewMeetings/${meeting._id}`}>
                  <button
                    type="button"
                    class="text-white bg-[#003E81] focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    View
                  </button>
                </Link>
                <Link to={`/meeting/updateMeetings/${meeting._id}`}>
                  <button
                    type="button"
                    class="text-white bg-[#52B14A] focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Update
                  </button>
                </Link>
                <button
                  type="button"
                  class="text-white bg-[#B83C31] focus:outline-none focus:ring-2 focus:ring- font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={() => handleDelete(meeting._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meeting;
