import React, { useEffect, useState } from "react";

const Home = () => {
  const [attendee, setAttendee] = useState([]);
  const [totalAttendees, setTotalAttendees] = useState(0);

  const fetchAttendee = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/attendee`
      );
      const data = await response.json();
      setAttendee(data);
      setTotalAttendees(data.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAttendee(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchAttendee(); // Fetch data every 10 seconds
    }, 10000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const deleteAttendee = async (uid) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/attendee/${uid}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setAttendee((prevAttendee) =>
          prevAttendee.filter((a) => a.uid !== uid)
        );
        setTotalAttendees((prevTotal) => prevTotal - 1);
      } else {
        console.error("Error deleting attendee");
      }
    } catch (error) {
      console.error("Error deleting attendee:", error);
    }
  };

  const dashboardStyle = {
    backgroundColor: "#4CAF50", // Green color
    padding: "15px",
    borderRadius: "10px", // Curved corners
    marginBottom: "15px",
    color: "white",
  };

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    border: "1px solid #ddd",
  };

  const thStyle = {
    backgroundColor: "#f2f2f2",
    border: "1px solid #ddd",
    padding: "8px",
  };

  const tdStyle = {
    textAlign: "center",
    verticalAlign: "middle",
    border: "1px solid #ddd",
    padding: "8px",
  };

  const buttonStyle = {
    padding: "6px 12px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <section className="section">
      <h2>Attendant</h2>
      <div style={dashboardStyle}>
        <h3>Total Attendees: {totalAttendees}</h3>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>UID</th>
            <th style={thStyle}>Person</th>
            <th style={thStyle}>Company</th>
            <th style={thStyle}>Lucky</th>
            <th style={thStyle}>Table</th>
            <th style={thStyle}>CheckIn</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendee.map((a) => (
            <tr key={a._id}>
              <td style={tdStyle}>{a.uid}</td>
              <td style={tdStyle}>{a.person}</td>
              <td style={tdStyle}>{a.company}</td>
              <td style={tdStyle}>{a.lucky}</td>
              <td style={tdStyle}>{a.table}</td>
              <td style={tdStyle}>{a.checkInTime}</td>
              <td style={tdStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => deleteAttendee(a.uid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Home;
