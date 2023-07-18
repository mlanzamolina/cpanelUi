import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Flex,
  Heading,
  Divider,
  Input,
  Stack,
  Container,
  CSSReset,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import NavBar from "../navbar/NavBar";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomeBanner() {
  const router = useRouter();
  // show local storage user projects
  const data = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(data || null);
  const [projects, setProjects] = useState([]);
  const [projectTitles, setProjectTitles] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", settings: [] });

  useEffect(() => {
    console.log(data);
    if(!token) {
      // navigate to /
      router.push("/");
    }
    if (user) {
      console.log(user.projects);
      setProjects(user.projects);
      setProjectTitles(user.projects.map((project) => project.name));
    }
  }, []);

  // show expanded project settings
  const [expandedProjectIndex, setExpandedProjectIndex] = useState(null);
  const handleProjectClick = (index) => {
    if (expandedProjectIndex === index) {
      setExpandedProjectIndex(null);
    } else {
      setExpandedProjectIndex(index);
    }
  };

  const toggleProjectSettings = () => {
    setExpandedProjectIndex((prevIndex) => (prevIndex === null ? 0 : null));
  };

  // add project setting
  const handleAddSetting = (projectIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].settings.push({ name: "", value: "" });
    setProjects(updatedProjects);
  };

  // delete project setting
  const handleDeleteSetting = (projectIndex, settingIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].settings.splice(settingIndex, 1);
    setProjects(updatedProjects);
  };

  // update project setting name
  const handleSettingNameChange = (projectIndex, settingIndex, event) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].settings[settingIndex].name =
      event.target.value;
    setProjects(updatedProjects);
  };

  // update project setting value
  const handleSettingValueChange = (projectIndex, settingIndex, event) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].settings[settingIndex].value =
      event.target.value;
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setNewProject({ name: "", settings: [] });
    setProjectTitles([...projectTitles, ""]);
  };

  const handleSaveProject = () => {
    // Add logic to save the project
    const updatedUser = { ...user, projects };
    setUser(updatedUser);
    //console.log(updatedUser._id);

var myHeaders = new Headers();
myHeaders.append("accept", "application/json");
myHeaders.append("Content-Type", "application/json");


var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: projects,
  redirect: 'follow'
};

fetch(`https://cpanelapi-4-n0294901.deta.app/api/${updatedUser._id}/projects`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
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
            <NavBar />
            {/* Rest of the content */}

            {projects?.length > 0 && token ? (
              <Box bg="white" p={100} borderRadius="md" boxShadow="md">
                <Heading fontSize="xl" fontWeight="bold" mb={2}>
                  Your Projects:
                </Heading>
                {projects.map((project, projectIndex) => (
                  <Box
                    key={projectIndex}
                    mb={4}
                    cursor="pointer"
                    borderWidth="1px"
                    borderColor={
                      expandedProjectIndex === projectIndex
                        ? "gray.300"
                        : "transparent"
                    }
                    borderRadius="md"
                    p={2}
                    _hover={{
                      bg: "gray.100",
                    }}
                    transition="background-color 0.3s"
                  >
                    <Flex
                      align="center"
                      justify="space-between"
                      mb={2}
                      onClick={() => handleProjectClick(projectIndex)}
                    >
                      <Text
                        fontWeight={
                          expandedProjectIndex === projectIndex
                            ? "bold"
                            : "normal"
                        }
                        color="gray.700"
                        fontSize={["md", "lg"]}
                      >
                        <input
                          type="text"
                          value={projectTitles[projectIndex]}
                          onChange={(event) => {
                            const updatedProjectTitles = [...projectTitles];
                            updatedProjectTitles[projectIndex] =
                              event.target.value;
                            setProjectTitles(updatedProjectTitles);
                          }}
                          onBlur={() => {
                            const updatedProjects = [...projects];
                            updatedProjects[projectIndex].name =
                              projectTitles[projectIndex];
                            setProjects(updatedProjects);
                          }}
                        />
                      </Text>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => {
                          toggleProjectSettings();
                        }}
                      >
                        {expandedProjectIndex === projectIndex
                          ? "Minimize"
                          : "Settings"}
                      </Button>
                    </Flex>
                    {expandedProjectIndex === projectIndex && (
                      <Box mt={2}>
                        {project.settings.map((setting, settingIndex) => (
                          <Flex
                            key={settingIndex}
                            direction="row"
                            align="center"
                            mb={2}
                            justifyContent="space-between"
                          >
                            <Stack direction="row" align="center">
                              <Input
                                placeholder="Setting name"
                                value={setting.name}
                                onChange={(event) =>
                                  handleSettingNameChange(
                                    projectIndex,
                                    settingIndex,
                                    event
                                  )
                                }
                                size={["sm", "md"]}
                              />
                              <Input
                                placeholder="Setting value"
                                value={setting.value}
                                onChange={(event) =>
                                  handleSettingValueChange(
                                    projectIndex,
                                    settingIndex,
                                    event
                                  )
                                }
                                size={["sm", "md"]}
                              />
                            </Stack>
                            <Button
                              onClick={() =>
                                handleDeleteSetting(projectIndex, settingIndex)
                              }
                              color="gray.700"
                              size="sm"
                              variant="outline"
                            >
                              Delete
                            </Button>
                          </Flex>
                        ))}
                        <Button
                          onClick={() => handleAddSetting(projectIndex)}
                          color="gray.700"
                          mt={2}
                          size="sm"
                          variant="outline"
                        >
                          Add Setting
                        </Button>
                      </Box>
                    )}
                  </Box>
                ))}
                <Button
                  onClick={handleAddProject}
                  color="gray.700"
                  mt={[2, 4]}
                  size={["sm", "md"]}
                  variant="outline"
                >
                  Add Project
                </Button>

                <Button
                  onClick={handleSaveProject}
                  colorScheme="blue"
                  mt={[2, 4]}
                  size={["sm", "md"]}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <Box bg="white" p={4} borderRadius="md" boxShadow="md">
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                You have no projects yet.
              </Text>
              <Input
                placeholder="Project name"
                value={newProject.name}
                onChange={(event) => setNewProject({ ...newProject, name: event.target.value })}
                size={["sm", "md"]}
              />
              <Button
                onClick={handleAddProject}
                color="gray.700"
                mt={[2, 4]}
                size={["sm", "md"]}
                variant="outline"
              >
                Add Project
              </Button>
            </Box>
            )}
          </Box>
        </div>
      </Box>
    </ChakraProvider>
  );
}
