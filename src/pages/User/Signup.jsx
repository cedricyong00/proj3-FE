/* eslint-disable no-unused-vars */
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  Title,
} from "@mantine/core";
import EmailSignUp from "../../components/User/EmailSignUp";
import classes from "./Signin.module.css";
import { Header } from "../../components/Layout/Header";
import CheckboxCard from "../../components/User/Checkbox";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUpPage() {
  //Function to redirect users upon clicking button
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  //Handle change in form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Function to handle submit events
  const handleSubmit = (e) => {
    e.preventDefault();
    const UserDetails = {
      Email: userEmail,
      Password: password,
      IsOwner: isOwner,
    };
    console.log(UserDetails);
    setTimeout(() => {
      if (isOwner === true) navigate("/signin");
    }, 5000);
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{" "}
          <Anchor size="sm" component={Link} to="/signin">
            Sign in
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <EmailSignUp userEmail={userEmail} setUserEmail={setUserEmail} />
          <PasswordInput
            label="Password"
            placeholder="Enter Your Password"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <CheckboxCard isOwner={isOwner} setIsOwner={setIsOwner} />

          <Button fullWidth mt="xl" onClick={handleSubmit}>
            Sign Up
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default SignUpPage;
