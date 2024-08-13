import React, { useEffect, useState } from "react";

const About = () => {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/registration`
      );
      const data = await response.json();
      setCompany(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteRegistration = async (uid) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/registration/${uid}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setCompany((prevCompany) => prevCompany.filter((c) => c.uid !== uid));
      } else {
        console.error("Error deleting registration");
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
    }
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
      <h2>Registration</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>UID</th>
            <th style={thStyle}>Person</th>
            <th style={thStyle}>Company</th>
            <th style={thStyle}>Lucky</th>
            <th style={thStyle}>Table</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {company.map((c) => (
            <tr key={c._id}>
              <td style={tdStyle}>{c.uid}</td>
              <td style={tdStyle}>{c.person}</td>
              <td style={tdStyle}>{c.company}</td>
              <td style={tdStyle}>{c.lucky}</td>
              <td style={tdStyle}>{c.table}</td>
              <td style={tdStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => deleteRegistration(c.uid)}
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

export default About;
