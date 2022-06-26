import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useState } from "react";
export const Popup = ({ createCourse }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({});
  let [newCourse, setNewCourse] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  function _createCourse(data) {
    console.log(data);
    createCourse(data);
    // var data = new FormData(evt.target);
    // let formObject = Object.fromEntries(data.entries());
    // console.log(formObject);
  }
  return (
    <>
      <Button
        borderRadius={50}
        colorScheme="yellow"
        mr={4}
        px={8}
        type="button"
        onClick={onOpen}
      >
        {" "}
        CreateCourse
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(_createCourse)}>
              <FormControl>
                <FormLabel htmlFor="Name">Name</FormLabel>
                <Input
                  {...register("name", {
                    required: "This is required",
                  })}
                  placeholder="Name"
                  value="Name"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="symbol">symbol</FormLabel>
                <Input
                  {...register("symbol", {
                    required: "This is required",
                  })}
                  id="symbol"
                  type="symbol"
                  value="SSS"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="price">price</FormLabel>
                <Input
                  {...register("price", {
                    required: "This is required",
                  })}
                  id="price"
                  type="number"
                  value="0"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_baseTokenURI">_baseTokenURI</FormLabel>
                <Input
                  {...register("_baseTokenURI", {
                    required: "This is required",
                  })}
                  id="_baseTokenURI"
                  value="ipfs://QmVmhJLwZLTvVN54dp2jeSVRsX7epY8CnuWbr2iAwnWtty/"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_isCrowdfund">_isCrowdfund</FormLabel>
                <Input
                  {...register("_isCrowdfund", {
                    required: "This is required",
                  })}
                  id="_isCrowdfund"
                  value="true"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_crowdfundPeriod">
                  _crowdfundPeriod
                </FormLabel>
                <Input
                  {...register("_crowdfundPeriod", {
                    required: "This is required",
                  })}
                  id="_crowdfundPeriod"
                  value="111"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="_crowdfundGoalStudentCount">
                  _crowdfundGoalStudentCount
                </FormLabel>

                <Input
                  {...register("_crowdfundGoalStudentCount", {
                    required: "This is required",
                  })}
                  id="_crowdfundGoalStudentCount"
                  type="number"
                  value="111"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_refundPeriod">_refundPeriod</FormLabel>
                <Input
                  {...register("_refundPeriod", {
                    required: "This is required",
                  })}
                  id="_refundPeriod"
                  value="111"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="tutor">tutor</FormLabel>
                <Input
                  {...register("_tutors", {
                    required: "This is required",
                  })}
                  id="_tutors"
                  value="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_tutorsPercent">_tutorsPercent</FormLabel>
                <Input
                  {...register("_tutorsPercent", {
                    required: "This is required",
                  })}
                  id="_tutorsPercent"
                  value="100"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_QnABoardShare">_QnABoardShare</FormLabel>
                <Input
                  {...register("_QnABoardShare", {
                    required: "This is required",
                  })}
                  id="_QnABoardShare"
                  value="20"
                />
              </FormControl>
              <Button
                mt={5}
                w="100%"
                borderRadius={50}
                colorScheme="yellow"
                mr={4}
                px={8}
                type="submit"
              >
                {" "}
                Create
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={ 3 } onClick={ onClose }>
                            Close
                        </Button> */}
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
