import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  Progress,
  Spacer,
  Center,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";
import { LockIcon } from "@chakra-ui/icons";
import { Fade } from "@chakra-ui/react";
import { Taskboard } from "./Taskboard.jsx";

export const CourseView = ({
  course,
  handleBack,
  handlePurchase,
  handleRefund,
  handleGift,
  handleRevenue,
}) => {
  return (
    <Fade in={ true }>

      <Flex pt="4">
        <Box flex="3" p="6" px="5">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={ handleBack }>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink>
                <Text>{ course.name }</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Text fontSize="4xl" fontWeight="semibold">
            { course.name }
          </Text>
          <Image
            src={ course.cover || "http://via.placeholder.com/500/360" }
          ></Image>
          <Text mt="5" fontSize="2xl">
            Contents:
          </Text>
          { Array.from({ length: 3 }).map((unit) => {
            return (
              <Center backgroundColor="white" p="2" shadow="xl" mb="3">
                Course Unit
              </Center>
            );
          }) }
          { course.purchased && course.price != 0 && (
            <Button mt="5" colorScheme="yellow" onClick={ handleRefund }>
              { " " }
              Refund Course
            </Button>
          ) }
          <br />
          { course.price != 0 && (
            <>
              <Button mt="5" colorScheme="yellow" onClick={ handleRevenue }>
                { " " }
                Distribute Revenue
              </Button>
              <br />
              <br />
              <p>(Needs to wait until the refund period ends.)</p>
            </>
          ) }
        </Box>
        <Box flex="8" pt="15" px="5">
          <Flex
            direction="column"
            overflow="hidden"
            backgroundColor="white"
            shadow="xl"
            p="5"
          >
            { !course.purchased ? (
              <Flex direction="column">
                <Center p={ 5 }>
                  <LockIcon w={ 10 } h={ 10 }></LockIcon>
                </Center>
                <Text align="center"> Purchase Course to start Learning</Text>
                <Button mt="5" colorScheme="yellow" onClick={ handlePurchase }>
                  { " " }
                  Purchase Course ({ course.price }ETH)
                </Button>
              </Flex>
            ) : (
              <Tabs>
                <TabList>
                  <Tab>Course Conent</Tab>
                  <Tab>Discussion Task Board</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Flex direction="column" flex="1">
                      <Text fontSize="3xl" mb="5">
                        { " " }
                        Chapter 1
                      </Text>
                      <Image src="https://placekitten.com/1200/360"></Image>
                      <Text mt="3">{ course.description }</Text>
                      <Text mt="3">{ course.description }</Text>
                      <Image
                        mt="3"
                        src="https://placekitten.com/640/360"
                      ></Image>

                      <Spacer />
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Taskboard></Taskboard>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            ) }
          </Flex>
        </Box>
      </Flex>
    </Fade>
  );
};
