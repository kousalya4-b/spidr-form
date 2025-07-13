import React, { useState, useRef, useEffect } from "react";
import SpiderWeb from "./SpiderWeb";
import "./App.css";

function FormPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    costGuess: '',
    spidrPin: '',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const resultRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'spidrPin') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
      formattedValue = digitsOnly.replace(/(.{4})/g, '$1-').replace(/-$/, '');
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     const isValidPin = /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(formData.spidrPin);
  if (!isValidPin) {
    alert("Invalid PIN format. Please enter 16 digits in ####-####-####-#### format.");
    return;
  }

  
  console.log("Submitted Form Data:", {
    FirstName: formData.firstName,
    LastName: formData.lastName,
    Phone: formData.phone,
    Email: formData.email,
    AirFryerCost: formData.costGuess,
    SpidrPIN: formData.spidrPin,
  });

    setSubmittedData(formData);
    setShowSubmitted(true);
  };

  useEffect(() => {
    if (showSubmitted && resultRef.current) {
      setTimeout(() => {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [showSubmitted]);

  const handleBackToForm = () => {
    setShowSubmitted(false);
  };

  const handleResetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      costGuess: '',
      spidrPin: '',
    });
    setSubmittedData(null);
    setShowSubmitted(false);
  };

  return (
    <div className="form-page-container">
      <SpiderWeb />

      {!showSubmitted && (
        <div className="form-wrapper">
          <img src="./spidr-title.png" alt="Spidr Title" className="spidr-title" />
<form onSubmit={handleSubmit} noValidate autoComplete="off">
  <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
  <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
  <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
  <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
  <input name="costGuess" placeholder="Air Fryer Cost" type="number" value={formData.costGuess} onChange={handleChange} required />

  <input
    name="spidrPin"
    placeholder="####-####-####-####"
    value={formData.spidrPin}
    onChange={handleChange}
    required
    pattern="\d{4}-\d{4}-\d{4}-\d{4}"
    title="Enter a valid 16-digit PIN in the format ####-####-####-####"
  />

  <button type="submit">Submit</button>
</form>

        </div>
      )}

      {showSubmitted && submittedData && (
        <div className="submitted-section" ref={resultRef}>
          <h2>Submitted Information</h2>
          <p><strong>First Name:</strong> {submittedData.firstName}</p>
          <p><strong>Last Name:</strong> {submittedData.lastName}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>AirFryerCost:</strong> {submittedData.costGuess}</p>
          <p><strong>Spidr Pin:</strong> {submittedData.spidrPin}</p>

          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button onClick={handleBackToForm}>Back to Form</button>
            <button onClick={handleResetForm}>Reset Form</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormPage;
