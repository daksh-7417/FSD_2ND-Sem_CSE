import React, { useState } from 'react';

const App = () => {
  // State management for form inputs
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    password: '',
    course: '',
    mobileNumber: ''
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('Registration Successful!');
  };

  // Inline CSS Styles Object
  const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f4f4',
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box',
      margin: 0,
      padding: '20px'
    },
    formContainer: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      boxSizing: 'border-box'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '24px',
      color: '#333333',
      fontSize: '24px'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      outline: 'none'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.2s'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h2 style={styles.heading}>Student Registration Form</h2>

        {/* Student Name */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="studentName"
            placeholder="Enter Student Name"
            value={formData.studentName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Email */}
        <div style={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Password */}
        <div style={styles.inputGroup}>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Course */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="course"
            placeholder="Enter Course Name"
            value={formData.course}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Mobile Number */}
        <div style={styles.inputGroup}>
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Enter Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Register Button */}
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default App;
