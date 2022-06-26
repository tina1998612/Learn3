
import { Spacer, Flex, Box, Text } from '@chakra-ui/react';

export let Navbar = ({ selectedAddress, balance, tokenData }) => {
    return <Flex px="10" py="5" backgroundColor="white" shadow="xl" borderRadius="50">
        <Box>
            <Text fontSize='xl'>Learn3 Protocol</Text>

        </Box>
        <Spacer></Spacer>
        <Flex>
            < b > { selectedAddress }</b >
            <Spacer w="5"></Spacer>
            { balance.toString() } { tokenData.symbol }
        </Flex>

    </Flex >
}