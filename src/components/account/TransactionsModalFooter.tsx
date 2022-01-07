// TransactionsModalFooter.tsx
import React, { useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  Link as ChakraLink,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getNetworkPrefix } from "src/utils";
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import { useYobot } from "src/contexts";

const TransactionListWrapper = styled.div`
`;

const pendingTransactions : (mapping string[]) = [];
// "{action} bid for {_quantity} of {_token_address} NFTs at {priceInEth} ETH each."

const addPendingTx = (tx) => {
    pendingTransactions.push(tx);
};

const addSuccessfulTx = (tx) => {
    pendingTransactions.remove(tx);

};

const TransactionsModalFooter = () => {
    const { chainId, actions } = useYobot();

    const fetchTransactions = async () => {
        for (const action of actions) {
            let values = action["returnValues"];
            if (values !== undefined) {
              let _address = values["0"];
              let _token_address = values["1"];
              let _action = values["4"];
              console.log(values);
            }
        } 
    }

    useEffect(() => {fetchTransactions()});

    // const sortedRecentTransactions = useMemo(() => {
    //   const txs = Object.values(allTransactions)
    //   return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
    // }, [allTransactions])

    function renderTransactions(transactions: string[]) {
        return (
          <TransactionListWrapper>
            {transactions.map((_token_address, i) => {
              return (
                <Stack direction="row">
                    <ChakraLink
                    display="flex"
                    mr="0.2em"
                    color="blue.400"
                    isExternal
                    href={`https://${
                        chainId > 0 ? getNetworkPrefix(chainId) : ""
                    }etherscan.io/address/${_token_address}`}
                    >
                    {_token_address}
                    <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                        <ExternalLinkIcon />
                    </span>
                    </ChakraLink>
                </Stack>
              )
            })}
          </TransactionListWrapper>
        )
      }

    const pendingTransactions = [];
    const confirmedTransactions = [];
    // const pendingTransactions = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
    // const confirmedTransactions = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash)

    return (
        <ModalFooter
        justifyContent="begin"
        background="gray.700"
        borderBottomLeftRadius="3xl"
        borderBottomRightRadius="3xl"
        p={6}
        >
            {!!pendingTransactions.length || !!confirmedTransactions.length ? (
                <Text
                color="white"
                textAlign="left"
                fontWeight="medium"
                fontSize="md"
                width="100%"
                >
                Recent Transactions
                </Text>
                // {renderTransactions(pendingTransactions)}
                // {renderTransactions(confirmedTransactions)}
        ) : (
                <Text
                color="white"
                textAlign="left"
                fontWeight="medium"
                fontSize="md"
                width="100%"
                >
                Your transactions will appear here...
                </Text>
            )}
        </ModalFooter>
    );
};

export default TransactionsModalFooter;
