import { Box, Container, AccordionItem, Accordion, AccordionButton, AccordionIcon, AccordionPanel, Text, Image, Button, Flex, Progress, Spacer, Center, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { LockIcon } from "@chakra-ui/icons"
import { Fade } from '@chakra-ui/react'

export const Taskboard = ({ course, handleBack, handlePurchase, }) => {
    return <Container maxW="container.lg" minH="100vh">
        <Accordion defaultIndex={ [0] } allowMultiple>
            { Array.from({ length: 10 }).map((d, i) => <AccordionItem>
                <Box backgroundColor="white" shadow="xl" borderRadius="50" mt="1" overflow="hidden">
                    <AccordionButton >
                        <Box flex='1' textAlign='left' p={ 1 }>
                            <Flex>
                                <Text>
                                    Question { i + 1 } -  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </Text>
                                <Spacer />
                                <Text>$3 LLL</Text>
                            </Flex>

                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </Box>
                <AccordionPanel pb={ 4 }>
                    Answer 1
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </AccordionPanel>
            </AccordionItem>) }
        </Accordion>
    </Container>
}