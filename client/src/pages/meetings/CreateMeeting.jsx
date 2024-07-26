import React, { useState, useEffect } from "react";

const CreateMeeting = () => {
  const [employees, setEmployees] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [chairedBy, setChairedBy] = useState("");

  // Get all employees
  useEffect(() => {
    fetch("http://localhost:5000/employees/getEmployees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
      });
  }, []);

  // Select attendees from all employees
  const handleAttendeeClick = (employeeId) => {
    if (employees.length === 0) {
      console.error("No employees data available.");
      return;
    }
    const selectedEmployee = employees.find(
      (employee) => employee._id === employeeId
    );
    if (!selectedEmployee) {
      console.error(`Employee with ID ${employeeId} not found.`);
      return;
    }
    setAttendees((prevAttendees) => {
      if (prevAttendees.some((attendee) => attendee._id === employeeId)) {
        console.warn(
          `Employee with ID ${employeeId} already added as an attendee.`
        );
        return prevAttendees;
      }
      return [...prevAttendees, selectedEmployee];
    });
  };

  // Select chairperson from all employees
  const handleChairedByClick = (employeeId) => {
    const selectedEmployee = employees.find(
      (employee) => employee._id === employeeId
    );
    if (!selectedEmployee) {
      console.error(`Employee with ID ${employeeId} not found.`);
      return;
    }
    setChairedBy(selectedEmployee._id);
  };

  // Store form data in database
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/meeting/createMeeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        purpose,
        location,
        date,
        startTime,
        endTime,
        attendees: attendees.map((attendee) => attendee._id),
        chairedBy,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Submit Response:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  // Delete attendee from the list
  const removeAttendee = (employeeId) => {
    setAttendees(attendees.filter(attendee => attendee._id !== employeeId));
  };

  return (
    <div className=" border-2 w-full p-5 rounded-2xl mx-2 h-screen ml-96 mt-20">
      <div className="h-screen flex flex-col">
        <h2 className="font-bold text-[#52B14A] text-4xl text-center mt-3">
          New Meeting
        </h2>
        <div className=" border mt-5 bg-cyan-50 rounded-2xl mx-5">
          <form onSubmit={handleSubmit} className="p-5">
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
                        onChange={(e) => setPurpose(e.target.value)}
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
                        onChange={(e) => setLocation(e.target.value)}
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
                        onChange={(e) => setDate(e.target.value)}
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
                        onChange={(e) => setStartTime(e.target.value)}
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
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Attendees"
                      className="block text-m font-medium leading-6 text-[#003E81]"
                    >
                      Attendees
                    </label>
                    <div className="mt-2">
                      <select
                        id="Attendees"
                        name="Attendees"
                        className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        onChange={(e) => handleAttendeeClick(e.target.value)}
                      >
                        <option value="">Select attendees</option>
                        {employees.map((employee) => (
                          <option key={employee._id} value={employee._id}>
                            {employee.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="ChairedBy"
                      className="block text-m font-medium leading-6 text-[#003E81]"
                    >
                      Chaired By
                    </label>
                    <div className="mt-2">
                      <select
                        id="ChairedBy"
                        name="ChairedBy"
                        className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        onChange={(e) => handleChairedByClick(e.target.value)}
                      >
                        <option value="">Select the chairperson</option>
                        {employees.map((employee) => (
                          <option key={employee._id} value={employee._id}>
                            {employee.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-x-auto pb-5 mt-5 mx-10">
              <table className="table table-xs w-full text-center mt-10 border border-[#52B14A]">
                <thead className="bg-[#00bbf6] h-10">
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Section</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((attendee, i) => (
                    <tr
                      key={attendee._id}
                      value={attendee._id}
                      className="bg-cyan-50 border-b border-[#52B14A] dark:bg-white dark:border-gray-700 hover:bg-cyan-100 dark:hover:bg-gray-100"
                    >
                      <td>{i + 1}</td>
                      <td>{attendee.name}</td>
                      <td>{attendee.designation}</td>
                      <td>{attendee.section}</td>
                      <td>
                        <button
                          type="button"
                          class="ms-auto -mx-1.5 -my-1.5 text-red-500 hover:text-red-700 rounded-lg focus:ring-1 focus:ring-red-300 p-1 hover:bg-red-100 inline-flex items-center justify-center h-6 w-6 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                          data-dismiss-target="#toast-default"
                          aria-label="Close"
                          onClick={() => removeAttendee(attendee._id)}
                        >
                          <span class="sr-only">Close</span>
                          <svg
                            class="w-3 h-3"
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
            <div className=" border-gray-900/10 mt-4 flex items-center justify-center gap-x-6">
              <button
                type="submit"
                className="mt-6 rounded-md bg-[#52B14A] px-7 py-2 text-m font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;