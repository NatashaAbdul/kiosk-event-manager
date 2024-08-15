import React, { useEffect, useState } from "react";
const Products = () => {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const response = await fetch(
        "https://seado.herokuapp.com/api/companylist"
      );
      const data = await response.json();
      setCompany(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    border: "1px solid #ddd", // Add a border to the entire table
  };

  const thStyle = {
    backgroundColor: "#f2f2f2",
    border: "1px solid #ddd",
    padding: "8px",
  };

  const tdStyle = {
    textAlign: "center", // Center the content horizontally
    verticalAlign: "middle", // Center the content vertically
    border: "1px solid #ddd",
    padding: "8px",
  };
  return (
    <section className="section">
      <h2>Company</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Company</th>
          </tr>
        </thead>
        <tbody>
          {company.map((c) => (
            <tr key={c._id}>
              <td style={tdStyle}>{c.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
export default Products;
