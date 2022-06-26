import { Box, Container, AccordionItem, Accordion, AccordionButton, AccordionIcon, AccordionPanel, Text, Image, Button, Flex, Progress, Spacer, Center, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { LockIcon } from "@chakra-ui/icons"
import { Fade } from '@chakra-ui/react'
let questions = [
    {
        id: 0,
        question: "question 1",
        answer: "answer 1",
        reward: 3,
        rewardUnit: "LLL"
    }
]

export const Taskboard = ({ course, handleBack, handlePurchase, }) => {
    return <Container maxW="container.lg" minH="100vh">
        <Accordion defaultIndex={ [0] } allowMultiple>
            { questions.map(({ question, answer, reward, rewardUnit }, i) => <AccordionItem>
                <Box backgroundColor="white" shadow="xl" borderRadius="50" mt="1" overflow="hidden">
                    <AccordionButton >
                        <Box flex='1' textAlign='left' p={ 1 }>
                            <Flex>
                                <Text>
                                    { question }
                                </Text>
                                <Spacer />
                                <Text>$ { reward } { rewardUnit }</Text>
                            </Flex>

                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </Box>
                <AccordionPanel pb={ 4 }>
                    { answer }
                </AccordionPanel>
            </AccordionItem>) }
        </Accordion>
    </Container>
}

