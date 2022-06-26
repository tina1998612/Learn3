import { Box, Text, Image, Button, Flex, Progress, Spacer, Center, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Fade } from '@chakra-ui/react'

export const CourseView = ({ course, handleBack, handlePurchase }) => {
    return <Fade in={ true }>
        <Flex pt="5">
            <Box flex='4' p="5" px="5">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={ handleBack }>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink >
                            <Text>{ course.name }</Text></BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Text fontSize='4xl' fontWeight='semibold'>{ course.name }</Text>
                <Image src={ course.cover || "http://via.placeholder.com/640x360" } ></Image >
                <Text mt='5' fontSize='2xl'>Contents:</Text>
                { Array.from({ length: 10 }).map(unit => {
                    return <Center backgroundColor='white' p="2" shadow="xl" mb="3">Course Unit</Center>
                }) }
            </Box>
            <Box flex='8' pt="15" px="5">
                <Flex direction="column" overflow="hidden"
                    backgroundColor="white" shadow="xl" p="5" >
                    { !course.purchased ? <Flex direction="column">
                        <Text> Purchase Course to start Learning</Text>
                        <Button mt="5" colorScheme="yellow" onClick={ handlePurchase }> Purchase Course ({ course.price }ETH)</Button>
                    </Flex> : <Flex direction="column" flex="1">
                        <Text fontSize="3xl" mb="5"> Chapter 1</Text>
                        <Image src="http://via.placeholder.com/640x360"></Image>
                        <Text mt="3">{ course.description }</Text>
                        <Text mt="3">{ course.description }</Text>
                        <Text mt="3">{ course.description }</Text>
                        <Text mt="3">{ course.description }</Text>
                        <Text mt="3">{ course.description }</Text>
                        <Image mt="3" src="http://via.placeholder.com/640x360"></Image>

                        <Spacer />

                    </Flex> }
                </Flex >
            </Box>
        </Flex >
    </Fade >
}