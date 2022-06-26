import {
  Box,
  Input,
  Container,
  AccordionItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
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
import React, { useState } from "react";
import { LockIcon, StarIcon } from "@chakra-ui/icons";
import { Fade } from "@chakra-ui/react";
let questions = [
  {
    id: 0,
    question: "Question 1",
    solved: true,
    answers: [
      {
        questionId: 0,
        id: 0,
        content: "I am the best answer. yaya",
        bestAnswer: true,
      },
      {
        questionId: 0,
        id: 1,
        content:
          "I'm the first runner up... the winner except for the best answer",
        bestAnswer: false,
      },
    ],
    reward: 3,
    rewardUnit: "LLL",
  },
  {
    id: 1,
    question: "Question 2",
    solved: false,
    answers: [
      {
        questionId: 1,
        id: 0,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        bestAnswer: false,
      },
      {
        questionId: 1,
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        bestAnswer: false,
      },
    ],
    reward: 3,
    rewardUnit: "LLL",
  },
];

export const Taskboard = ({ course, handleBack, handlePurchase }) => {
  let [currentQuestion, setCurrentQuestion] = useState("");
  let [currentQuestionPrice, setCurrentQuestionPrice] = useState(3);
  let handleAddQuestion = () => {
    console.log("submit question", currentQuestion, currentQuestionPrice);
    setCurrentQuestion("");
  };
  let answerQuestion = () => {
    // console.log("hi")
  };
  return (
    <Container maxW="container.lg" minH="100vh">
      <Flex w="100%">
        <Input
          flex="10"
          placeholder="ask something"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
        ></Input>
        <Input
          flex="1"
          type="number"
          placeholder="price"
          value={currentQuestionPrice}
          onChange={(e) => setCurrentQuestionPrice(e.target.value)}
        ></Input>

        <Button onClick={() => handleAddQuestion()}>Ask Question</Button>
      </Flex>
      <Accordion
        mt={2}
        defaultIndex={Array.from({ length: questions.length }).map((d, i) => i)}
        allowMultiple
      >
        {questions.map(({ question, answers, reward, rewardUnit }, i) => (
          <AccordionItem key={i}>
            <Box
              backgroundColor="white"
              shadow="xl"
              borderRadius="50"
              mt="1"
              overflow="hidden"
            >
              <AccordionButton>
                <Box flex="1" textAlign="left" p={1}>
                  <Flex>
                    <Text>{question}</Text>
                    <Spacer />
                    <Text> {question.solved && "[Solved]"} </Text>
                    <Text>
                      {" "}
                      $ {reward} {rewardUnit}
                    </Text>
                  </Flex>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Box>
            <AccordionPanel pb={4} pt="10">
              {answers.map((answer) => (
                <Box
                  flex="1"
                  textAlign="left"
                  p={3}
                  backgroundColor={answer.bestAnswer ? "yellow.300" : ""}
                >
                  <Flex>
                    <Text flex="6">
                      {answer.bestAnswer && <StarIcon mr={2}></StarIcon>}
                      {answer.content}
                    </Text>
                    <Spacer></Spacer>
                    {!answer.bestAnswer && (
                      <Button borderRadius="50">
                        <StarIcon></StarIcon>
                      </Button>
                    )}
                  </Flex>
                </Box>
              ))}

              <Flex w="100%">
                <Input placeholder="Answer Question"></Input>
                <Button onClick={answerQuestion()}>Answer</Button>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};
