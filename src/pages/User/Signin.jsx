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
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { hashDataWithSaltRounds, storeToken } from "../../util/security";
import useFetch from "../../hooks/useFetch";
import useToast from "../../hooks/useToast";
import { getUser } from "../../service/users";
import { useState } from "react";

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sendRequest, getLoginDetails } = useFetch();
  const { successToast, errorToast } = useToast();
  const { setUser } = useOutletContext();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const loginDetails = await getLoginDetails(email);
      const hashedPassword = hashDataWithSaltRounds(
        password,
        loginDetails.salt,
        loginDetails.iterations
      );
      const payload = {
        email: email,
        password: hashedPassword,
      };
      const token = await sendRequest(
        `${import.meta.env.VITE_API_URL}/user/login`,
        "POST",
        payload
      );
      storeToken(token);
      setUser(getUser());
      setSubmitting(false);
      navigate("/");
      successToast({
        title: "Welcome back!",
        message: "You have successfully logged in.",
      });
    } catch (err) {
      console.log(err);
      errorToast(err.message ? err.message : "error");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component={Link} to="/signup">
            Create account
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="user@chopeseats.com"
            required
            withAsterisk
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter Your Password"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth mt="xl" onClick={handleSubmit} loading={submitting}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default SignInPage;
