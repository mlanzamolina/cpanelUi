import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
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
import Link from "next/link";

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
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
    ),
});

export default function Login(navigation) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const data = useSelector((state) => state.data); // Access a specific property from the Redux state
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogin = async (formData) => {
    console.log(formData);
    const headers = new Headers({
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    });

    const body = new URLSearchParams({
      grant_type: "",
      username: formData.email,
      password: formData.password,
      scope: "",
      client_id: "",
      client_secret: "",
    });

    const requestOptions = {
      method: "POST",
      headers,
      body,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://cpanelapi-4-n0294901.deta.app/api/users/login",
        requestOptions,
      );
      const result = await response.json();

      if (result.token) {
        const newData = {
          user: result.user,
          token: result.token,
        };
        await dispatch({ type: "login", payload: newData });
        router.push("/homepage");
      }
      if (result.detail) {
        // Display a toast message instead of creating a new element
        toast.error(`Login failed: ${result.detail}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
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
            <form onSubmit={handleSubmit(handleLogin)}>
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
              <br />
              {/* center buttons */}
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="xl"
                >
                  Login
                </Button>
                <Link href="/signUp">
                  <Button colorScheme="red" size="lg" fontSize="xl">
                    Sign Up
                  </Button>
                </Link>
              </Box>
            </form>
          </Box>
        </div>
      </Box>
    </ChakraProvider>
  );
}
