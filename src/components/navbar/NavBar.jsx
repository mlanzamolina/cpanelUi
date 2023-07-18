import React from "react";
import { Box, Flex, Button, Link as ChakraLink, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const NavBar = () => {
  return (
    <Flex justifyContent={["center", "flex-start"]} alignItems="center" mb={4}>
      <Box mr={4}>
        <NextLink href="/" passHref>
          <ChakraLink as="a" variant="ghost" color="gray.500">
            <Text fontSize="lg" fontWeight="bold">
              LOGO
            </Text>
          </ChakraLink>
        </NextLink>
      </Box>
      <Box display={["none", "block"]}>
        <NextLink href="/" passHref>
          <ChakraLink as="a" variant="ghost" color="gray.500" mr={4}>
            HOME PAGE
          </ChakraLink>
        </NextLink>
      </Box>
      <Box display={["none", "block"]}>
        <NextLink href="/profile" passHref>
          <ChakraLink as="a" variant="ghost" color="gray.500" mr={4}>
            PROFILE
          </ChakraLink>
        </NextLink>
      </Box>
      <Box display={["none", "block"]}>
        <NextLink href="/projects" passHref>
          <ChakraLink as="a" variant="ghost" color="gray.500" mr={4}>
            PROJECTS
          </ChakraLink>
        </NextLink>
      </Box>
      <Box display={["none", "block"]}>
        <NextLink href="/create-project" passHref>
          <ChakraLink as="a" variant="ghost" color="gray.500" mr={4}>
            CREATE PROJECT
          </ChakraLink>
        </NextLink>
      </Box>
      <NextLink href="/" passHref>
        <ChakraLink as="a" variant="ghost" color="gray.500">
          LOGOUT
        </ChakraLink>
      </NextLink>
    </Flex>
  );
};

export default NavBar;
