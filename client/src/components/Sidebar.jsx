import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div className="ml-5 rounded-2xl w-full bg-[#001A3E] text-center p-5 flex flex-col justify-between">
        <div>
          <Link to="">
            <h1 className="text-[40px] font-bold text-[#00BBF6]">BCMS</h1>
          </Link>
          <h1 className="text-md text-[#C8ECFE] font-semibold">Dashboard</h1>
        </div>
        <div className="px-7 text-center">
          <ul className="text-white text-lg flex flex-col gap-7 text-left mt-10">
            <Link to="/employee">
              <li className="flex gap-4 items-center hover:underline">Employees</li>
            </Link>
            <hr className="opacity-50" />
            <Link to="/document">
              <li className="flex gap-4 items-center hover:underline">Documents</li>
            </Link>
            <hr className="opacity-50" />
            <Link to="/calendar">
              <li className="flex gap-4 items-center hover:underline">Calendar</li>
            </Link>
            <hr className="opacity-50" />
            <Link to="/meeting">
              <li className="flex gap-4 items-center hover:underline">Meetings</li>
            </Link>
            <hr className="opacity-50" />
            <Link to="/roles">
              <li className="flex gap-4 items-center hover:underline">Roles & Responsibilities</li>
            </Link>
          </ul>
        </div>
        <div className="flex gap-3 mt-10">
          <button className="px-8 py-1 bg-[#00BBF6] text-black font-semibold rounded-2xl">
            Logout
          </button>
          <button className="px-8 py-1 bg-[#C8ECFE] text-black font-semibold rounded-2xl">
            Intranet
          </button>
        </div>
      </div>
      </div>
  );
};

export default Sidebar;
