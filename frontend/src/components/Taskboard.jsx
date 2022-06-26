import { Box, Input, Container, AccordionItem, Accordion, AccordionButton, AccordionIcon, AccordionPanel, Text, Image, Button, Flex, Progress, Spacer, Center, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { LockIcon, StarIcon } from "@chakra-ui/icons"
import { Fade } from '@chakra-ui/react'
let questions = [
    {
        id: 0,
        question: "Question 1",
        solved: true,
        answers: [
            {
                id: 0,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                bestAnswer: true
            }, {
                id: 1,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                bestAnswer: false
            }
        ],
        reward: 3,
        rewardUnit: "LLL"
    }, {
        id: 0,
        question: "Question 2",
        solved: false,
        answers: [
            {
                id: 0,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                bestAnswer: false
            }, {
                id: 1,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                bestAnswer: false
            }
        ],
        reward: 3,
        rewardUnit: "LLL"
    }
]

export const Taskboard = ({ course, handleBack, handlePurchase, }) => {
    let handleAddQuestion = () => {

    }
    return <Container maxW="container.lg" minH="100vh">
        <Flex w="100%">
            <Input placeholder="ask something"></Input>
            <Button onClick={ handleAddQuestion() }>Ask Question</Button>
        </Flex>
        <Accordion mt={ 2 } defaultIndex={ Array.from({ length: questions.length }).map((d, i) => i) } allowMultiple>
            { questions.map(({ question, answers, reward, rewardUnit }, i) => <AccordionItem>
                <Box backgroundColor="white" shadow="xl" borderRadius="50" mt="1" overflow="hidden">
                    <AccordionButton >
                        <Box flex='1' textAlign='left' p={ 1 }>
                            <Flex>
                                <Text>
                                    { question }
                                </Text>
                                <Spacer />
                                <Text> { question.solved && '[Solved]' } </Text>
                                <Text> $ { reward } { rewardUnit }</Text>
                            </Flex>

                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </Box>
                <AccordionPanel pb={ 4 } pt="10">
                    { answers.map(answer =>
                        <Box flex='1' textAlign='left' p={ 3 } backgroundColor={ answer.bestAnswer ? 'yellow.300' : '' }>
                            <Flex>
                                <Text flex="6">
                                    { answer.bestAnswer && <StarIcon mr={ 2 }></StarIcon> }
                                    { answer.content }

                                </Text>
                                <Spacer></Spacer>
                                { !answer.bestAnswer && <Button borderRadius="50" >
                                    <StarIcon></StarIcon>
                                </Button> }
                            </Flex>
                        </Box>
                    ) }

                    <Flex w="100%">
                        <Input placeholder="Answer Question"></Input>
                        <Button onClick={ answerQuestion() }>Answer</Button>
                    </Flex>
                </AccordionPanel>
            </AccordionItem>) }
        </Accordion>
    </Container >
}

