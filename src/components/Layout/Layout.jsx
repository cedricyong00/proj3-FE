import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Container, Flex } from "@mantine/core";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <Flex
      direction="column"
      position={"relative"}
      style={{ minHeight: "100vh" }}
    >
      <Header />
      <main style={{ flexGrow: "1", padding: "40px 0" }}>
        <Container size="md">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </Flex>
  );
};
