import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Container, Flex } from "@mantine/core";
import { Footer } from "./Footer";
import { useState } from "react";
import { getUser } from "../../service/users";

export const Layout = () => {
  const [user, setUser] = useState(getUser());

  return (
    <Flex
      direction="column"
      position={"relative"}
      style={{ minHeight: "100vh" }}
    >
      <Header user={user} setUser={setUser} />
      <main style={{ flexGrow: "1", padding: "40px 0" }}>
        <Container size="md">
          <Outlet context={{ user, setUser }} />
        </Container>
      </main>
      <Footer />
    </Flex>
  );
};
