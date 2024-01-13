/* eslint-disable no-unused-vars */
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./Signin.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Layout/Header";

function SignInPage() {
  //Function to redirect users upon clicking button
  const navigate = useNavigate();

  //Handle change in form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Function to handle submit events
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginDetails = {
      Email: email,
      Password: password,
    };
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <>
      {/* Header Component */}
      <Header />

      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" href="/signup">
            Create account
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="Enter Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter Your Password"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth mt="xl" onClick={handleSubmit}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default SignInPage;
