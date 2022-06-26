import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    ModalFooter,
} from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
} from "@chakra-ui/react";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";

import { useState } from "react";
export const Popup = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({});
    let [newCourse, setNewCourse] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    function createCourse(data) {
        console.log(data);
        // var data = new FormData(evt.target);
        // let formObject = Object.fromEntries(data.entries());
        // console.log(formObject);
    }
    return (
        <>
            <Button
                borderRadius={ 50 }
                colorScheme="yellow"
                mr={ 4 }
                px={ 8 }
                type="button"
                onClick={ onOpen }
            >
                { " " }
                CreateCourse
            </Button>
            <Modal isOpen={ isOpen } onClose={ onClose }>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Course</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={ handleSubmit(createCourse) }>
                            <FormControl>
                                <FormLabel htmlFor="Name">Name</FormLabel>
                                <Input
                                    { ...register("name", {
                                        required: "This is required",
                                    }) }
                                    placeholder="Name"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="symbol">symbol</FormLabel>
                                <Input  { ...register("symbol", {
                                    required: "This is required",
                                }) } id="symbol" type="symbol" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="price">price</FormLabel>
                                <Input
                                    { ...register("price", {
                                        required: "This is required",
                                    }) } id="price" type="number" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="_baseTokenURI">_baseTokenURI</FormLabel>
                                <Input
                                    { ...register("_baseTokenURI", {
                                        required: "This is required",
                                    }) } id="_baseTokenURI" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="_isCrowdfund">_isCrowdfund</FormLabel>
                                <Input
                                    { ...register("_isCrowdfund", {
                                        required: "This is required",
                                    }) } id="_isCrowdfund" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="_crowdfundPeriod">
                                    _crowdfundPeriod
                                </FormLabel>
                                <Input
                                    { ...register("_crowdfundPeriod", {
                                        required: "This is required",
                                    }) } id="_crowdfundPeriod" />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="_crowdfundGoalStudentCount">
                                    _crowdfundGoalStudentCount
                                </FormLabel>

                                <Input
                                    { ...register("_crowdfundGoalStudentCount", {
                                        required: "This is required",
                                    }) } id="_crowdfundGoalStudentCount" type="number" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="_refundPeriod">_refundPeriod</FormLabel>
                                <Input id="_refundPeriod" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="tutor">tutor</FormLabel>
                                <Input
                                    { ...register("tutor", {
                                        required: "This is required",
                                    }) } id="tutor" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="_tutorsPercent">_tutorsPercent</FormLabel>
                                <Input
                                    { ...register("_tutorsPercent", {
                                        required: "This is required",
                                    }) } id="_tutorsPercent" />
                            </FormControl>
                            <Button
                                mt={ 5 }
                                w="100%"
                                borderRadius={ 50 }
                                colorScheme="yellow"
                                mr={ 4 }
                                px={ 8 }
                                type="submit"
                            >
                                { " " }
                                Create
                            </Button>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        {/* <Button colorScheme='blue' mr={ 3 } onClick={ onClose }>
                            Close
                        </Button> */}
                        {/* <Button variant='ghost'>Secondary Action</Button> */ }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
