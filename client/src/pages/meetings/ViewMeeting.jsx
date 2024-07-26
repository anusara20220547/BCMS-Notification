import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewMeeting = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [purpose, setPurpose] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [attendeesData, setAttendeesData] = useState([]);
  const [meetingEvidence, setMeetingEvidence] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/meeting/getSingleMeeting/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Meeting data:", data); // Debugging log
        setMeeting(data);
        setPurpose(data.purpose);
        setLocation(data.location);
        setDate(data.date);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        fetchAttendeesData(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const fetchAttendeesData = async (meeting) => {
    if (meeting) {
      try {
        const response = await fetch(
          "http://localhost:5000/employees/getEmployees"
        );
        const data = await response.json();
        console.log("Attendees data:", data); // Debugging log
        const mappedAttendees = meeting.attendees.map((attendeeId) => {
          return data.find((employee) => employee._id === attendeeId);
        });
        setAttendeesData(mappedAttendees.filter(attendee => attendee)); // Ensure no undefined attendees
      } catch (error) {
        console.error("Error fetching attendees data:", error);
      }
    }
  };

  useEffect(() => {
    fetch(
      `http://localhost:5000/meetingEvidence/getSingleMeetingEvidence/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Meeting evidence:", data); // Debugging log
        setMeetingEvidence(Array.isArray(data) ? data : []); // Ensure data is an array
      })
      .catch((err) => console.log(err));
  }, [id]);

  const presentAttendees = meetingEvidence
    .filter((evidence) => evidence.attended)
    .map((evidence) =>
      attendeesData.find((attendee) => attendee._id === evidence.attendeeId)
    )
    .filter((attendee) => attendee)
    .map((attendee) => attendee.name);

  const absentAttendees = meetingEvidence
    .filter((evidence) => !evidence.attended)
    .map((evidence) =>
      attendeesData.find((attendee) => attendee._id === evidence.attendeeId)
    )
    .filter((attendee) => attendee)
    .map((attendee) => attendee.name);

  return (
    <div className="border-2 w-full p-5 rounded-2xl mr-5 ml-96 mt-20">
      <div className="flex flex-col">
        <h2 className="font-bold text-[#52B14A] text-4xl text-center mt-3">
          View Meeting
        </h2>
        <div className="border mt-5 bg-cyan-50 rounded-2xl mx-5">
          <div className="relative overflow-x-auto justify-center items-center flex">
            <table className="text-lg text-left rtl:text-right text-black dark:text-gray-400">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Meeting
                  </th>
                  <td className="px-6 py-2">{purpose}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Location
                  </th>
                  <td className="px-6 py-2">{location}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Date
                  </th>
                  <td className="px-6 py-2">{date}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Time
                  </th>
                  <td className="px-6 py-4">
                    {startTime} - {endTime}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Chaired by
                  </th>
                  <td className="px-6 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-5 px-5">
            <div className="relative overflow-x-auto justify-center items-center flex">
              <table className="text-sm text-center rtl:text-right text-[#003E81] dark:text-gray-400 border border-[#52B14A]">
                <thead className="bg-cyan-300 text-[#003E81] text-sm uppercase dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Present
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Absent
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Excused
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-4">
                      {presentAttendees.map((name, index) => (
                        <div key={index}>{name}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {absentAttendees.map((name, index) => (
                        <div key={index}>{name}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-5 px-5 mb-5">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-center rtl:text-right text-[#003E81] dark:text-gray-400 border border-[#52B14A]">
                <thead className="bg-cyan-300 text-[#003E81] text-sm uppercase dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Item No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Responsible Person
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Target Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Updates
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {meetingEvidence.map((evidence, index) => (
                    <tr
                      key={index}
                      className="border border-[#52B14A] dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {evidence.actionNo}
                      </th>
                      <td className="px-6 py-4">{evidence.action}</td>
                      <td className="px-6 py-4">
                        {
                          attendeesData.find(
                            (attendee) => attendee._id === evidence.attendeeId
                          )?.name
                        }
                      </td>
                      <td className="px-6 py-4">{evidence.targetDate}</td>
                      <td className="px-6 py-4">{evidence.updates}</td>
                      <td className="px-6 py-4">
                        {evidence.status ? "Completed" : "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between mt-20 px-10 mb-5">
            <div>
              <h1 className="text-xl">Created by</h1>
              <h1>..................................</h1>
            </div>
            <div>
              <h1 className="text-xl">Checked by</h1>
              <h1>..................................</h1>
            </div>
            <div>
              <h1 className="text-xl">Approved by</h1>
              <h1>..................................</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMeeting;
