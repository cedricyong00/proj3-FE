import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./Signin.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hashData } from "../../util/security";
import useFetch from "../../hooks/useFetch";
import useToast from "../../hooks/useToast";

function SignUpPage() {
  //Function to redirect users upon clicking button
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { sendRequest } = useFetch();
  const { successToast, errorToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  //user input
  const formState = {
    email: email,
    password: password,
    isOwner: isOwner,
    name: name,
  };

  function hashPassword() {
    var currForm = formState;
    if (currForm.password) {
      var hash = hashData(currForm.password);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setSubmitting(true);
    try {
      hashPassword();
      const formData = { ...formState };
      await sendRequest(
        `${import.meta.env.VITE_API_URL}/user/create`,
        "POST",
        formData
      );
      setSubmitting(false);
      navigate("/signin");
      successToast({
        title: "Signup Completed!",
        message: "You have successfully created your account. Please login",
      });
    } catch (err) {
      console.log(err);
      errorToast(err.message ? err.message : "Error");
      setSubmitting(false);
    }
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
          {/* Name */}
          <TextInput
            label="Name"
            withAsterisk
            required
            placeholder="John Tan"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          {/* Email */}
          <TextInput
            mt="md"
            withAsterisk
            label="Email Address"
            placeholder="email@chopeseats.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          ></TextInput>

          {/* Password */}
          <PasswordInput
            label="Password"
            placeholder="Enter Your Password"
            withAsterisk
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* IsOwner */}
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="I am an owner of restaurant"
              checked={isOwner}
              onChange={() => {
                setIsOwner((prev) => !prev);
              }}
            />
          </Group>

          <Button fullWidth mt="xl" onClick={handleSubmit} loading={submitting}>
            Sign Up
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default SignUpPage;
