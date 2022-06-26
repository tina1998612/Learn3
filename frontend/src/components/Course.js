import { Box, Text, Image, Button, Flex, Progress } from "@chakra-ui/react";
import React from "react";

export const Course = ({ course }) => {
    return <Box borderRadius="5" overflow="hidden" backgroundColor="white">
        < Image src={ course.cover || "http://via.placeholder.com/640x360" } ></Image >
        <Box p="5" >
            <Text fontSize='3xl'>{ course.name }</Text>
            <Text>{ course.description }</Text>
            { course.status == "funding" && <Box mt="5">
                <Progress value={ course.fund } borderRadius="5"></Progress>
                Funding Progress: { (100 * course.fund / course.totalFunding).toFixed(1) }%
            </Box> }
            <Flex justify="end">
                { course.purchased && <Button colorScheme='blue' mt="5">View</Button> }
                { !course.purchased && <Button colorScheme='yellow' mt="5">Purchase</Button> }

            </Flex>
        </Box>
    </Box >
}