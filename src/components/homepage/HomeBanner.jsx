import React from "react";
import { ChakraProvider, Button, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

export default function HomeBanner() {
  //show local storage user projects
  const data = useSelector((state) => state); // Access a specific property from the Redux state
  const [user, setUser] = useState(data || null);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    console.log(data);
    if (user) {
      setProjects(user.user.projects);
    }
  }, []);

  //show expanded project settings
  const [expandedProjectIndex, setExpandedProjectIndex] = useState(null);
  const handleProjectClick = (index) => {
    if (expandedProjectIndex === index) {
      setExpandedProjectIndex(null);
    } else {
      setExpandedProjectIndex(index);
    }
  };

  const handleAddProject = () => {
    // Add logic to add a new project
  };

  return (
    <ChakraProvider>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          mb="4"
        >
          <Button mr="2">HOME PAGE</Button>
          <Button mr="2">PROFILE</Button>
          <Button mr="2">PROJECTS</Button>
          <Button mr="2">CREATE PROJECT</Button>
          <Link href="/">
            <Button>LOGOUT</Button>
          </Link>
        </Box>
        {projects?.length > 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text fontSize="xl" fontWeight="bold" mb="2">
              Your Projects:
            </Text>
            {projects.map((project, index) => (
              <Box key={index} mb="2">
                <Text
                  onClick={() => handleProjectClick(index)}
                  style={{ cursor: "pointer" }}
                >
                  {project.name}
                </Text>
                {expandedProjectIndex === index && (
                  <Box>
                    {project.settings.map((setting, settingIndex) => (
                      <Box key={settingIndex} mb="2">
                        <Text>{setting.name}</Text>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}

            <Button onClick={handleAddProject}>Add Project</Button>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text fontSize="xl" fontWeight="bold" mb="2">
              You have no projects yet.
            </Text>
            <Button onClick={handleAddProject}>Add Project</Button>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
}
