import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateMeetings = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [updatePurpose, setUpdatePurpose] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateStartTime, setUpdateStartTime] = useState("");
  const [updateEndTime, setUpdateEndTime] = useState("");
  const [attendeesData, setAttendeesData] = useState([]);

  useEffect(() => {
    const fetchMeetingData = async () => {
      const res = await fetch(
        `http://localhost:5000/meeting/getSingleMeeting/${id}`
      );
      const data = await res.json();
      setMeeting(data);
      setUpdatePurpose(data.purpose);
      setUpdateLocation(data.location);
      setUpdateDate(data.date);
      setUpdateStartTime(data.startTime);
      setUpdateEndTime(data.endTime);
      fetchAttendeesData(data.attendees);
    };

    const fetchAttendeesData = async (attendeeIds) => {
      try {
        const response = await fetch(
          "http://localhost:5000/employees/getEmployees"
        );
        const data = await response.json();
        const mappedAttendees = attendeeIds.map((attendeeId) => {
          const attendee = data.find((employee) => employee._id === attendeeId);
          return {
            ...attendee,
            reason: "",
            actionNo: "",
            action: "",
            targetDate: "",
            attended: false,
            status: false,
          };
        });
        setAttendeesData(mappedAttendees);
      } catch (error) {
        console.error("Error fetching attendees data:", error);
      }
    };

    fetchMeetingData();
  }, [id]);

  // Update the meeting data

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedMeeting = {
      purpose: updatePurpose,
      location: updateLocation,
      date: updateDate,
      startTime: updateStartTime,
      endTime: updateEndTime,
      attendees: meeting.attendees,
    };
    fetch(`http://localhost:5000/meeting/updateMeeting/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMeeting),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Meeting updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Submit the meeting evidence

  const handleSubmit = (e) => {
    e.preventDefault();
    const attendeesDetails = attendeesData.map((attendee) => ({
      attendeeId: attendee._id,
      reason: attendee.reason,
      actionNo: attendee.actionNo,
      action: attendee.action,
      targetDate: attendee.targetDate,
      attended: attendee.attended,
      status: attendee.status,
    }));

    fetch(`http://localhost:5000/meetingEvidence/createMeetingEvidence/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendeesDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to store meeting evidence");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("Meeting evidence stored successfully");
      })
      .catch((error) => {
        console.error("Error storing meeting evidence:", error);
        alert("Failed to store meeting evidence");
      });
  };

  const handleAttendeeChange = (index, field, value) => {
    const newAttendees = [...attendeesData];
    newAttendees[index][field] = value;
    setAttendeesData(newAttendees);
  };

  if (!meeting) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className=" border-2 w-full p-5 rounded-2xl mr-5 ml-96 mt-20 ">
      <div className="flex flex-col">
        <h2 className="font-bold text-[#52B14A] text-4xl text-center mt-3">
          Update Meeting
        </h2>
        <div className=" border mt-5 bg-cyan-50 rounded-2xl mx-5">
          <form className="p-5" onSubmit={handleUpdate}>
            <div className=" mx-10">
              <div className="pb-2">
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Purpose"
                      className="block text-m font-medium leading-6 text-[#003E81]"
                    >
                      Purpose
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="Purpose"
                        id="Purpose"
                        required
                        autoComplete="Purpose"
                        className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setUpdatePurpose(e.target.value)}
                        defaultValue={updatePurpose}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Location"
                      className="block text-m font-medium leading-6 text-[#003E81]"
                    >
                      Location
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="Location"
                        id="Location"
                        required
                        autoComplete="Location"
                        className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setUpdateLocation(e.target.value)}
                        defaultValue={updateLocation}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Date"
                      className="block text-m font-medium leading-6 text-[#003E81]"
                    >
                      Date
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="Date"
                        id="Date"
                        required
                        autoComplete="Date"
                        className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setUpdateDate(e.target.value)}
                        defaultValue={updateDate}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Time"
                      className="block text-m font-medium leading-6 text-[#003E81]"
                    >
                      Start Time
                    </label>
                    <div className="mt-2">
                      <input
                        type="time"
                        name="Time"
                        id="Time"
                        required
                        autoComplete="Time"
                        className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setUpdateStartTime(e.target.value)}
                        defaultValue={updateStartTime}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Time"
                      className="block text-m font-medium leading-6 text-[#003E81]"
                    >
                      End Time
                    </label>
                    <div className="mt-2">
                      <input
                        type="time"
                        name="Time"
                        id="Time"
                        required
                        autoComplete="Time"
                        className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setUpdateEndTime(e.target.value)}
                        defaultValue={updateEndTime}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" border-gray-900/10 mt-4 flex items-center justify-center gap-x-6">
              <button
                type="submit"
                className="mt-6 rounded-md bg-[#52B14A] px-7 py-2 text-m font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Update
              </button>
            </div>
          </form>
          <div className="relative overflow-x-auto pb-5 mt-7 px-3">
            <table className="table table-xs w-full text-center border border-[#52B14A]">
              <thead className="bg-cyan-300 text-[#003E81] text-sm">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Section</th>
                  <th>Attended</th>
                  <th>Reason (If not attended)</th>
                  <th>Action No</th>
                  <th>Action</th>
                  <th>Target Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="py-20">
                {attendeesData.map((attendee, i) => (
                  <tr
                    key={i}
                    className=" border-b border-[#52B14A] text-[#003874] dark:border-gray-700 hover:bg-cyan-100 dark:hover:bg-gray-100"
                  >
                    <th className="pl-2">{i + 1}</th>
                    <td>{attendee.name}</td>
                    <td>{attendee.designation}</td>
                    <td>{attendee.section}</td>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox "
                          checked={attendee.attended}
                          onChange={(e) =>
                            handleAttendeeChange(
                              i,
                              "attended",
                              e.target.checked
                            )
                          }
                        />
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="reason"
                        id="reason"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
                        value={attendee.reason}
                        onChange={(e) =>
                          handleAttendeeChange(i, "reason", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="actionNo"
                        id="actionNo"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
                        value={attendee.actionNo}
                        onChange={(e) =>
                          handleAttendeeChange(i, "actionNo", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <textarea
                        type="text"
                        name="action"
                        id="acction"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
                        value={attendee.action}
                        onChange={(e) =>
                          handleAttendeeChange(i, "action", e.target.value)
                        }
                        rows={1}
                      />
                    </td>
                    <td>
                      <input
                        type='date'
                        name="targetDate"
                        id="targetDate"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
                        value={attendee.targetDate}
                        onChange={(e) =>
                          handleAttendeeChange(i, "targetDate", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={attendee.status}
                          onChange={(e) =>
                            handleAttendeeChange(i, "status", e.target.checked)
                          }
                        />
                      </label>
                    </td>
                    <td className="pr-2">
                      <button
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 text-red-500 hover:text-red-700 focus:ring-1 focus:ring-red-300 p-1 hover:bg-red-100 inline-flex items-center justify-center h-6 w-6 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        data-dismiss-target="#toast-default"
                        aria-label="Close"
                        onClick={() => deleteSingleMeetingEvidence(attendee._id)}
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" border-gray-900/10 mt-4 flex items-center justify-center gap-x-6 mb-5">
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-6 rounded-md bg-[#52B14A] px-7 py-2 text-m font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMeetings;
