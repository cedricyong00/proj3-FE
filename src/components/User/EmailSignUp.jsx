/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// import { useState, useRef } from "react";
import { TextInput } from "@mantine/core";

// Define the AutocompleteLoading function
export default function EmailSignUp({ userEmail, setUserEmail }) {
  return (
    <TextInput
      mt="md"
      withAsterisk
      label="Email Address"
      placeholder="email@chopeseats.com"
      onChange={(e) => setUserEmail(e.target.value)}
      value={userEmail}
    ></TextInput>
  );
}
