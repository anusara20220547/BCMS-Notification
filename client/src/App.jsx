import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Employee from "./pages/Employees/Employee";
import Document from "./pages/documents/Document";
import Calendar from "./pages/calendar/Calendar";
import Meeting from "./pages/meetings/Meeting";
import Roles from "./pages/Roles_Responsibilities/Roles";
import CreateMeeting from "./pages/meetings/CreateMeeting";
import UpdateMeetings from "./pages/meetings/UpdateMeetings";
import ViewMeeting from "./pages/meetings/ViewMeeting";
import EditHome from "./pages/Edit Home/HomeEdit";
import DescriptionPage from "./pages/descriptionpage/description";

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Check if current location is not the home page or description page
  const shouldDisplaySidebar = !isHomePage && !location.pathname.includes('/description');

  return (
    <>
      <Navbar />
      <div className={`${!isHomePage ? "flex gap-x-10" : ""}`}>
        {shouldDisplaySidebar && (
          <div className="fixed z-10 top-20">
            <Sidebar />
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/document" element={<Document />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/edit" element={<EditHome />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/meeting/createMeeting" element={<CreateMeeting />} />
          <Route path="/meeting/updateMeetings/:id" element={<UpdateMeetings />} />
          <Route path="/meeting/viewMeetings/:id" element={<ViewMeeting />} />
          <Route path="/description/:id" element={<DescriptionPage />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
