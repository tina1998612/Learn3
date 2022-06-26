import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  Progress,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { Popup } from "./Popup";
export const Course = ({ course, handleOpenCourse }) => {
  return (
    <Flex
      direction="column"
      borderRadius="5"
      overflow="hidden"
      backgroundColor="white"
      shadow="xl"
    >
      <Image src={course.cover || "http://via.placeholder.com/640x360"}></Image>
      <Flex p="5" direction="column" flex="1">
        <Text fontSize="3xl" fontWeight="semibold">
          {course.name}
        </Text>
        <Text mt="3">{course.description}</Text>
        {course.status == "funding" && (
          <Box mt="5">
            <Progress
              value={(100 * course.fund) / course.totalFunding}
              borderRadius="5"
              colorScheme="yellow"
            ></Progress>
            Funding Progress:{" "}
            {((100 * course.fund) / course.totalFunding).toFixed(1)}% (Target
            Students:
            {course.totalFunding})
          </Box>
        )}
        <Spacer />
        <Flex justify="end" alignItems="end" mt="4">
          {course.purchased && (
            <Button
              onClick={() => handleOpenCourse()}
              w="100%"
              colorScheme="grey"
              variant="outline"
              mt="5"
            >
              View
            </Button>
          )}
          {!course.purchased && (
            <Button
              onClick={() => handleOpenCourse()}
              w="100%"
              colorScheme="yellow"
              mt="5"
            >
              Purchase ({course.price}ETH)
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
