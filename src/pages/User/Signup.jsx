/* eslint-disable no-unused-vars */
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Title,
} from "@mantine/core";
import EmailSignUp from "../../components/Layout/EmailSignUp";
import classes from "./Signin.module.css";
import { Header } from "../../components/Layout/Header";
import CheckboxCard from "../../components/Layout/Checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {

//Function to redirect users upon clicking button
const navigate = useNavigate();
const [userEmail, setUserEmail] = useState("");
const [isOwner, setIsOwner] = useState(false);

//Handle change in form fields
const [password, setPassword] = useState("");

//Function to handle submit events
const handleSubmit = (e) => {
e.preventDefault();
const UserDetails = {
    Email: userEmail,
    Password: password,
    IsOwner: isOwner
}
console.log(UserDetails)
setTimeout(() => {
    if (isOwner === true)
    navigate("/signin")
},5000);
}


  return (
    <>
      <Header />
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Account Registration
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <EmailSignUp userEmail={userEmail} setUserEmail={setUserEmail}/>
          <PasswordInput
            label="Password"
            placeholder="Enter Your Password"
            required 
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <CheckboxCard isOwner={isOwner} setIsOwner={setIsOwner}/>
          <Button fullWidth mt="xl" onClick={handleSubmit}>
            Sign Up
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default SignUpPage;
