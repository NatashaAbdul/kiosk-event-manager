import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    company: "",
    table: "",
    person: "",
    lucky: "",
    // uid: "",
  });

  const fileInputRef = useRef(null); // Create a ref for the file input


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var formattedData = {
      company: formData.company,
      table: formData.table,
      person: formData.person,
      lucky: formData.lucky,
      uid: formData.lucky,
    }
    console.log(formattedData);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (response.ok) {
        alert("Registration successful!");
        // Optionally, clear the form after successful submission
        setFormData({
          company: "",
          table: "",
          person: "",
          lucky: "",
          // uid: "",
        });
      } else {
        alert("Error: Could not register");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Error: Could not register");
    }
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      for (let row of worksheet) {
        // Assuming your Excel columns are named 'Company', 'Table', 'Person', 'Lucky', 'UID'
        const formDataFromExcel = {
          company: row.Company,
          table: row.Table,
          person: row.Person,
          lucky: row.Lucky,
          uid: row.Lucky,
        };

        // Send data to the server
        await handleExcelData(formDataFromExcel);

      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExcelData = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.error("Error updating record", formData);
      } else {
        console.log(response)
        // Clear the file input after processing
        fileInputRef.current.value = null;
        alert("Registration successful!");

      }
    } catch (error) {
      console.error("Error processing Excel data:", error);
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2>Add Registration</h2>
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company"
        style={inputStyle}
        required
      />
      <input
        type="text"
        name="table"
        value={formData.table}
        onChange={handleChange}
        placeholder="Table"
        style={inputStyle}
        required
      />
      <input
        type="text"
        name="person"
        value={formData.person}
        onChange={handleChange}
        placeholder="Person"
        style={inputStyle}
        required
      />
      <input
        type="text"
        name="lucky"
        value={formData.lucky}
        onChange={handleChange}
        placeholder="Lucky Draw Number"
        style={inputStyle}
        required
      />
      {/* <input
        type="text"
        name="uid"
        value={formData.uid}
        onChange={handleChange}
        placeholder="UID should be same as lucky"
        style={inputStyle}
        required
      /> */}
      <button type="submit" style={buttonStyle}>
        Register
      </button>
      <br />
      <h3>Import Excel File</h3>
      <input type="file" accept=".xlsx, .xls" ref={fileInputRef} onChange={handleFileUpload} />
    </form>
  );
};

export default RegistrationForm;
