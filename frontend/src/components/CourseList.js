import { Container, SimpleGrid, Text, Button, Flex, Box } from "@chakra-ui/react";
import { Course } from "./CourseListItem";
import courseMockData from "../data/courses.json"
import { CourseView } from "./CourseView"
import React, { useState, useEffect } from 'react'
import { Fade } from '@chakra-ui/react'

export const CourseList = (selectedAddress) => {
    let [selectedCourse, setSelectedCourse] = useState(null)

    return <>
        <Fade in={ true }>
            <Container maxW="container.xl" minH="100vh" pb="50"  >

                { selectedCourse &&
                    <>
                        <CourseView course={ selectedCourse }
                            handleBack={ () => setSelectedCourse(null) } />
                    </> }
                { !selectedCourse && <Container maxW='container.xl' p="5" minH="100vh" >
                    <Text fontSize="5xl" mb={ 5 } >Course List</Text>
                    <SimpleGrid w="100%" columns={ [1, 1, 2, 3] } spacing={ 8 }>
                        { courseMockData.map((course, courseId) =>
                            <Course course={ course }
                                key={ courseId }
                                handleOpenCourse={ () => {
                                    setSelectedCourse(course)
                                } }>


                            </Course>) }
                    </SimpleGrid>
                </Container>
                }
            </Container>
        </Fade>
    </>
}