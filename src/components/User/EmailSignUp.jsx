/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState, useRef } from "react";
import { Autocomplete, Loader } from "@mantine/core";

// Define the AutocompleteLoading function
export default function EmailSignUp({userEmail, setUserEmail}) {
  // Create a ref for timeout management
  const timeoutRef = useRef(-1);

  // Initialize state variables
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Define the handleChange function
  const handleChange = (val) => {
    // Clear the timeout to avoid unnecessary requests
    window.clearTimeout(timeoutRef.current);

    // Update the value and reset the data
    setUserEmail(val);
    setData([]);

    // Check conditions for loading and fetching data
    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["gmail.com", "outlook.com", "yahoo.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 1000);
    }
  };

  // Return the Autocomplete component
  return (
    <Autocomplete
      value={userEmail}
      data={data}
      onChange={handleChange}
      rightSection={loading ? <Loader size="1rem" /> : null}
      label="Email Address"
      placeholder="Your email"
      required
    />
  );
}
