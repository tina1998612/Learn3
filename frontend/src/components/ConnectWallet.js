import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";
import { Flex, Stack } from '@chakra-ui/react';

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <Flex align="center">
      {/* Metamask network should be set to Localhost:8545. */ }
      {
        networkError && (
          <NetworkErrorMessage
            message={ networkError }
            dismiss={ dismiss }
          />
        )
      }
      <Flex align="center">
        {/* <p>Please connect to your wallet.</p> */ }
        <button
          className="btn btn-warning"
          type="button"
          onClick={ connectWallet }
        >  Connect Wallet
        </button>
      </Flex>
    </Flex >
  );
}
