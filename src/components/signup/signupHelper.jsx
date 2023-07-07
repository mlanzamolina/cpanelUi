"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  ChakraProvider,
  CSSReset,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and one special case Character",
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSignup = async (formData) => {
    console.log(formData);
    const headers = new Headers({
      accept: "application/json",
      "Content-Type": "application/json",
    });

    const body = JSON.stringify({
      username: formData.email,
      email: formData.email,
      password: formData.password,
      projects: [],
    });

    try {
      const response = await fetch(
        "https://cpanelapi-4-n0294901.deta.app/api/",
        {
          method: "POST",
          headers,
          body,
          redirect: "follow",
        },
      );
      const data = await response.json();
      console.log(data);
      toast.success("Signup Successful");
      router.push("/login");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        bg="black"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom right, red, blue)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            p={8}
            maxWidth="100%"
            mx="auto"
            bg="white"
            borderRadius="md"
            boxShadow="lg"
          >
            <form onSubmit={handleSubmit(handleSignup)}>
              <FormControl id="email">
                <FormLabel fontSize="xl">Email address</FormLabel>
                <Input
                  type="email"
                  {...register("email")}
                  focusBorderColor="blue.500"
                  fontSize="lg"
                />
                {errors.email && (
                  <Box color="red.500" fontSize="sm">
                    {errors.email.message}
                  </Box>
                )}
              </FormControl>

              <FormControl id="password">
                <FormLabel fontSize="xl">Password</FormLabel>
                <Input
                  type="password"
                  {...register("password")}
                  focusBorderColor="blue.500"
                  fontSize="lg"
                />
                {errors.password && (
                  <Box color="red.500" fontSize="sm">
                    {errors.password.message}
                  </Box>
                )}
              </FormControl>

              <FormControl id="confirmPassword">
                <FormLabel fontSize="xl">Confirm Password</FormLabel>
                <Input
                  type="password"
                  {...register("confirmPassword")}
                  focusBorderColor="blue.500"
                  fontSize="lg"
                />
                {errors.confirmPassword && (
                  <Box color="red.500" fontSize="sm">
                    {errors.confirmPassword.message}
                  </Box>
                )}
              </FormControl>

              <Button type="submit" colorScheme="blue" size="lg" fontSize="xl">
                Sign Up
              </Button>
            </form>
          </Box>
        </div>
      </Box>
    </ChakraProvider>
  );
}
