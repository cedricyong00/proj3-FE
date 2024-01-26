/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Button,
  Group,
  Checkbox,
} from "@mantine/core";
import { AccountInformationList } from "../../components/Layout/CurrentAccountInfo";
import classes from "../../components/Layout/CurrentAccountInfo.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";

function EditAccount() {
  //Handle change in form fields
  const [email, setEmail] = useState("cedrictest@gmail.com");
  const [name, setName] = useState("Cedric Test");
  const [address, setAddress] = useState("my house lor what you want");
  const [isOwner, setIsOwner] = useState(true);
  //Navigate
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Update button
  const handleUpdate = (e) => {
    e.preventDefault();
    const UserDetails = {
      Email: email,
      Name: name,
      Adress: address,
      isOwner: isOwner,
    };
    console.log(UserDetails);
    setTimeout(() => {
      navigate("/account");
    }, 5000);
  };

  //Back button
  const back = (e) => {
    e.preventDefault();
    navigate("/account");
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.wrapper}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
            <div>
              <Title className={classes.title}>
                Current Account Information
              </Title>
              <Text className={classes.description} mt="sm" mb={30}></Text>

              <AccountInformationList />
            </div>
            <div className={classes.form}>
              <TextInput
                label="Email"
                value={email}
                classNames={{ input: classes.input, label: classes.inputLabel }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextInput
                label="Name"
                value={name}
                mt="md"
                classNames={{ input: classes.input, label: classes.inputLabel }}
                onChange={(e) => setName(e.target.value)}
              />

              <TextInput
                label="Restaurant Info"
                value={address}
                mt="md"
                classNames={{ input: classes.input, label: classes.inputLabel }}
                onChange={(e) => setAddress(e.target.value)}
              />

              <br />

              <Group justify="space-between" mt="lg">
                <Checkbox
                  label="I am a owner of restaurant"
                  checked={isOwner}
                  onChange={() => {
                    setIsOwner((prev) => !prev);
                  }}
                />
              </Group>

              <Group justify="flex-end" mt="md">
                <Button className={classes.control} onClick={handleUpdate}>
                  Update
                </Button>
              </Group>

              <Group justify="flex-end" mt="md">
                <Button className={classes.control} onClick={back}>
                  Back
                </Button>
              </Group>
            </div>
          </SimpleGrid>
        </div>
      )}
    </>
  );
}

export default EditAccount;
