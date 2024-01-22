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
import { hashData } from "../../util/security";
import { signUp } from "../../api/users";

function SignUpPage() {
  //Function to redirect users upon clicking button
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  //Handle change in form fields
  const [password, setPassword] = useState("");

  //user input
  const formState = {
    userEmail: userEmail,
    password: password,
    isOwner: isOwner
  }

  //Function to hash password
  function hashPassword() {
    var currForm = formState;
    if (currForm.password) {
      console.log(currForm.password)
      var hash = hashData(currForm.password);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
  }

  //Function to handle submit events
  async function handleSubmit (evt) {
    try {
        evt.preventDefault();
        hashPassword();
        const formData = {...formState};
        delete formData.error;
        delete formData.confirm;
        console.log(formData);
        const user = await signUp(formData);
        console.log(user)
    } catch(e) {
      console.log(e);
    }
        setTimeout(() => {
          if (isOwner === true) navigate("/signin");
        }, 5000);
  }

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
