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
import { ethers } from "ethers";
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
    console.log("hi", data.price);

    const newData = {
      name: data.name || "Course101",
      price: data.price ? ethers.utils.parseEther(data.price) : 0,
      symbol: data.symbol || "CRS",
      _baseTokenURI:
        data._baseTokenURI ||
        "ipfs://QmVmhJLwZLTvVN54dp2jeSVRsX7epY8CnuWbr2iAwnWtty/",
      _QnABoardShare: data._QnABoardShare || "20",
      _crowdfundGoalStudentCount: data._crowdfundGoalStudentCount || "3",
      _crowdfundPeriod: data._crowdfundPeriod || 100000,
      _isCrowdfund: data._isCrowdfund || true,
      _refundPeriod: data._refundPeriod || 100000,
      _tutors: data._tutors || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      _tutorsPercent: data._tutorsPercent || "100",
    };
    // console.log(newData);
    createCourse(newData, () => {
      onClose();
    });
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
                    required: false,
                  })}
                  placeholder="Course101"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="symbol">symbol</FormLabel>
                <Input
                  {...register("symbol", {
                    required: false,
                  })}
                  id="symbol"
                  type="symbol"
                  placeholder="CRS"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="price">price</FormLabel>
                <Input
                  {...register("price", {
                    required: false,
                  })}
                  id="price"
                  type="float"
                  placeholder="0"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_baseTokenURI">_baseTokenURI</FormLabel>
                <Input
                  {...register("_baseTokenURI", {
                    required: false,
                  })}
                  id="_baseTokenURI"
                  placeholder="ipfs://QmVmhJLwZLTvVN54dp2jeSVRsX7epY8CnuWbr2iAwnWtty/"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_isCrowdfund">_isCrowdfund</FormLabel>
                <Input
                  {...register("_isCrowdfund", {
                    required: false,
                  })}
                  id="_isCrowdfund"
                  placeholder="true"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_crowdfundPeriod">
                  _crowdfundPeriod
                </FormLabel>
                <Input
                  {...register("_crowdfundPeriod", {
                    required: false,
                  })}
                  id="_crowdfundPeriod"
                  placeholder="100000"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="_crowdfundGoalStudentCount">
                  _crowdfundGoalStudentCount
                </FormLabel>

                <Input
                  {...register("_crowdfundGoalStudentCount", {
                    required: false,
                  })}
                  id="_crowdfundGoalStudentCount"
                  type="number"
                  placeholder="3"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_refundPeriod">_refundPeriod</FormLabel>
                <Input
                  {...register("_refundPeriod", {
                    required: false,
                  })}
                  id="_refundPeriod"
                  placeholder="100000"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="tutor">tutor</FormLabel>
                <Input
                  {...register("_tutors", {
                    required: false,
                  })}
                  id="_tutors"
                  placeholder="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_tutorsPercent">_tutorsPercent</FormLabel>
                <Input
                  {...register("_tutorsPercent", {
                    required: false,
                  })}
                  id="_tutorsPercent"
                  placeholder="100"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="_QnABoardShare">_QnABoardShare</FormLabel>
                <Input
                  {...register("_QnABoardShare", {
                    required: false,
                  })}
                  id="_QnABoardShare"
                  placeholder="20"
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
