
import { Spacer, Flex, Box, Text } from '@chakra-ui/react';

export let Navbar = ({ selectedAddress, balance, tokenData, ConnectWalletBtn }) => {
    return <Flex mt="5" px="10" py="5" backgroundColor="white" shadow="xl" borderRadius="50">
        <Box>
            <Text fontSize='xl'>Learn3 Protocol</Text>

        </Box>
        <Spacer></Spacer>
        <Flex>
            < b > { selectedAddress }</b >
            <Spacer w="5"></Spacer>
            { balance && (balance || 0).toString() } { tokenData?.symbol }
        </Flex>
        { !selectedAddress && ConnectWalletBtn }
    </Flex >
}