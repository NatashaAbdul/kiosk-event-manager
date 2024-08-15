import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from 'uuid';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    company: "",
    person: "",
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
      person: formData.person,
      uid: uuidv4(),
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
          person: "",
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
      var status = 0;
      for (let row of worksheet) {
        // Assuming your Excel columns are named 'Company', 'Table', 'Person', 'Lucky', 'UID'
        const formDataFromExcel = {
          company: row.Company,
          person: row.Person,
          uid: uuidv4(),
        };

        // Send data to the server
        const result = await handleExcelData(formDataFromExcel);
        console.log(result);
        if (result == "Success") {
          status = 1
        }
      }
      if (status == 1) {
        alert("Registration successful!");
      } else {
        alert("Registration unsuccessful!");
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
        return "Failed"
      } else {
        console.log(response)
        // Clear the file input after processing
        fileInputRef.current.value = null;
        // alert("Registration successful!");
        return "Success"
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
        name="person"
        value={formData.person}
        onChange={handleChange}
        placeholder="Person"
        style={inputStyle}
        required
      />
      <input
        type="text"
        name="uid"
        value={formData.uid}
        onChange={handleChange}
        placeholder="Registration Number"
        style={inputStyle}
        required
      />
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
