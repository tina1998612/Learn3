
import { Spacer, Flex, Box, Text, Image } from '@chakra-ui/react';

export let Navbar = ({ selectedAddress, balance, tokenData, ConnectWalletBtn }) => {
    return <Box pt={ 4 }>
        <Flex px="10" py="3" backgroundColor="white" shadow="xl" borderRadius="50" align="center">
            <Box>
                {/* <Text fontSize='xl'>Learn3 Protocol</Text> */ }
                <Image src="Learn3-02.png" h="55"></Image>

            </Box>
            <Spacer></Spacer>
            <Flex>
                < b > { selectedAddress }</b >
                <Spacer w="5"></Spacer>
                { balance && (balance || 0).toString() } { tokenData?.symbol }
            </Flex>
            { !selectedAddress && ConnectWalletBtn }
        </Flex >
    </Box>
}