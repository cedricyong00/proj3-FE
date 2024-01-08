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


function SignInPage() {
  return (
    <>
      {/* Redirects to signup page */}
      <a href="/signup">SIGN UP</a>
      <br />
      <a href="/owner/bookings">OWNER DASHBOARD</a>

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
          <TextInput label="Email" placeholder="Enter Your Email" required />
          <PasswordInput
            label="Password"
            placeholder="Enter Your Password"
            required
            mt="md"
          />
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default SignInPage;
