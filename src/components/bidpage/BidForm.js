import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Spinner,
  Input,
  Flex,
  Text,
  useDisclosure,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { toast } from "material-react-toastify";
import { useYobot } from "src/contexts/YobotContext";
import { ConnectWallet, NoShadowButton } from "src/components";
import { useTranslation } from "react-i18next";
import {
  onTxSubmitted,
  onTxFailed,
  userRejectedCallback,
  onTxConfirmed,
} from "src/utils";

function PlaceBidButtonTW() {
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Button text
      </button>
    </>
  );
}

const PlaceBidButton = styled(Button)`
  width: 100%;
  height: 48px;
  /* margin: auto; */
  /* padding-left: 1rem; */
  /* padding-right: 1rem; */
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  line-height: 1.5rem;

  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
  }
`;

const BidForm = () => {
  const { t } = useTranslation();
  const { yobot, isAuthed, balance, address, refreshEvents } = useYobot();
  const [validParams, setValidParams] = useState(false);
  const [placingBid, setPlacingBid] = useState(false);

  // ** Does the user want to see a modal to confirm placing bids? **
  const [notNovice, setNotNovice] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactionTimedOut, setTransactionTimedOut] = useState(false);

  useEffect(() => {
    if (!isOpen) setTransactionTimedOut(false);
  }, [isOpen]);

  useEffect(() => {
    setNotNovice(localStorage.getItem("BASED_YOBOT_APE_MODE") !== "I_AM_BASED");
  }, []);

  // ** Insufficient Funds **
  const [insufficentFunds, setInsufficientFunds] = useState(false);

  // ** Bid Inputs **
  const [bidPrice, setBidPrice] = useState(0.0);
  const [bidQty, setBidQty] = useState(0);

  // ** Are bid inputs empty **
  const [bidPriceEmpty, setBidPriceEmpty] = useState(false);
  const [bidQtyEmpty, setBidQtyEmpty] = useState(false);

  // ** Frozen bid price and qty when submitting a transaction **
  const [frozenBidPrice, setFrozenBidPrice] = useState(bidPrice);
  const [frozenBidQty, setFrozenBidQty] = useState(bidQty);

  // ** Allow user to press enter on Quantity **
  const [enterPressed, setEnterPressed] = useState(false);

  // ** Checks if we have enough ETH balance in the connected wallet **
  useEffect(() => {
    setInsufficientFunds(bidPrice * bidQty > balance || balance == 0);
  }, [bidPrice, bidQty, balance]);

  // ** Gas Estimates **
  // TODO: fetch these predicted fees every x time
  // ?? use previous bids to predict new fees ??
  const [lowGasFee, setLowGasFee] = useState(0);
  const [mediumGasFee, setMediumGasFee] = useState(0);
  const [highGasFee, setHighGasFee] = useState(0);

  // ** Helper function to fetch gas timeouts **
  const updateGasEstimates = () => {
    // TODO::::
    // console.log("updating gas estimates...");
  };

  // ** Every 15 seconds, update gas estimates **
  useEffect(() => {
    let gasTimer = setTimeout(() => updateGasEstimates(), 15 * 1000);
    return () => {
      clearTimeout(gasTimer);
    };
  }, []);

  // ** Bid placed helper function **
  const placeBid = async () => {
    setPlacingBid(true);

    // ** Freeze Inputs **
    const _frozenBidPrice = bidPrice;
    setFrozenBidPrice(_frozenBidPrice);
    const _frozenBidQty = bidQty;
    setFrozenBidQty(_frozenBidQty);

    // ** Validate Frozen Inputs (sanity check) **
    if (validateParams(_frozenBidPrice, _frozenBidQty)) {
      // ** If novice, Pop up modal and await confirmation to continue **
      if (notNovice) {
        onOpen();
        // Set a 1 minute transaction timeout
        setTimeout(() => {
          setTransactionTimedOut(true);
        }, 60 * 1000);
      } else {
        // ** Continue with placing bid **
        submitBid(_frozenBidPrice, _frozenBidQty);
      }
    } else {
      // !! Invalid Inputs !!
      toast.error({
        title: "Invalid Inputs!",
        description:
          "Please enter a valid bid price and quantity and try again!",
        status: "error",
        position: "bottom",
        duration: 3000,
        isClosable: true,
      });
      setPlacingBid(false);
    }
  };

  const submitBid = async (_frozenBidPrice, _frozenBidQty) => {
    // TODO: depending on the erc721 - art blocks or general - this should change
    try {
      setPlacingBid(true);
      let placeBidTx = await yobot.YobotERC721LimitOrder.placeOrder(
        yobot.web3, // web3
        yobot.YobotERC721LimitOrder.YobotERC721LimitOrder, // yobotERC721LimitOrder
        _frozenBidPrice, // price
        _frozenBidQty, // quantity
        // TODO: dynamically pull token address from query string parameters
        // tokenAddress, // tokenAddress
        "0xd8bbf8ceb445de814fb47547436b3cfeecadd4ec",
        address, // sender
        async (msg) => {
          onTxSubmitted(msg);
          setPlacingBid(false);
        },
        async (msg) => {
          onTxFailed(msg);
        },
        async (msg) => {
          onTxConfirmed(msg);
          refreshEvents();
        },
        async (msg) => {
          userRejectedCallback();
          setPlacingBid(false);
        } // userRejectedCallback
      );
    } catch (e) {
      onTxFailed();
      setPlacingBid(false);
      console.error("Placing bid returned:", e);
    }
  };

  // ** Helper function to validate parameters
  const validateParams = (_bidPrice, _bidQty) => {
    if (_bidPrice && _bidPrice > 0 && _bidQty && _bidQty > 0) {
      setValidParams(true);
      return true;
    }
    // ** Any other case we reject **
    setValidParams(false);
    return false;
  };

  // ** Whenever our input values change, we want to validate them **
  useEffect(() => {
    validateParams(bidPrice, bidQty);
  }, [bidPrice, bidQty]);

  return (
    <div className="px-5 text-left sm:w-530 rounded-xl ">
      <p className="py-5 text-3xl font-medium">Place Bids</p>
      <form className="space-y-6">
        <div className="space-y-1">
          <label
            className="font-medium"
            htmlFor="tk-form-elements-lg-name"
          >
            Price per NFT (ETH)
          </label>
          <input
            className="block w-full px-5 py-3 text-4xl leading-6 text-gray-800 border border-gray-200 rounded bg-slate-200 h-80 font-Roboto focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="number"
            id="tk-form-elements-lg-name"
            placeholder="0.0"
            min="0.000"
            step="0.0001"
            required
            precision={3}
            onChange={(e) => {
              setBidPriceEmpty(e.target.value == "");
              setBidPrice(
                e.target.value ? parseFloat(e.target.value) : undefined
              );
            }}
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium" htmlFor="place-bid-quantity">
            Quantity
          </label>
          <input
            className="w-full px-5 py-3 text-4xl leading-6 text-gray-800 border rounded bg-slate-200 h-80 zblock font-Roboto border-grey-200 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="number"
            id="place-bid-quantity"
            placeholder="# of NFTs"
            min="1"
            required
            value={bidQty}
            onKeyDown={(e) => {
              if (!enterPressed) {
                setEnterPressed(true);
                // ** Let's allow the user to hit enter here to place bid **
                if (
                  validParams &&
                  !bidPriceEmpty &&
                  !bidQtyEmpty &&
                  !insufficentFunds &&
                  isAuthed &&
                  !placingBid
                ) {
                  if (e.key === "Enter") {
                    setTimeout(() => {
                      placeBid();
                      setEnterPressed(false);
                    }, 200);
                  } else {
                    setEnterPressed(false);
                  }
                } else {
                  setEnterPressed(false);
                }
              }
            }}
            onChange={(e) => {
              setBidQtyEmpty(e.target.value == "");
              setBidQty(e.target.value ? parseInt(e.target.value) : undefined);
            }}
          />
        </div>


        {insufficentFunds ? (
          <Text mb="0.5em" fontSize="14px" color="red.500">
            Insufficient Funds ~ {balance && balance.toFixed(3)}Ξ
          </Text>
        ) : (
          ""
        )}
        {!isAuthed ? (
          <ConnectWallet fullWidth={true} darkerBackground={true} />
        ) : (
          <PlaceBidButton
            disabled={
              !validParams ||
              insufficentFunds ||
              bidPriceEmpty ||
              bidQtyEmpty ||
              placingBid
            }
            colorScheme={validParams ? "green" : "red"}
            backgroundColor={validParams ? "green.600" : "red.800"}
            _hover={
              validParams
                ? {
                    color: "white.900",
                    border: "0.4px",
                    borderStyle: "solid",
                    borderColor: "white.900",
                    backgroundColor: "green.500",
                  }
                : {}
            }
            color={validParams ? "white.800" : "red.100"}
            variant={validParams ? "solid" : "outline"}
            onClick={placeBid}
            display={"flex"}
          >
            {!placingBid ? (
              <>
                {" "}
                {validParams && !bidPriceEmpty && !bidQtyEmpty
                  ? "Place Bid"
                  : "Enter a Price and Quantity"}{" "}
              </>
            ) : (
              <Spinner margin={"auto"} color={"green.400"} />
            )}
          </PlaceBidButton>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading>🚨 Place Bid? 🚨</Heading>
              <ModalCloseButton
                onClick={() => {
                  setPlacingBid(false);
                  onClose();
                }}
              />
            </ModalHeader>
            <ModalBody>
              <Checkbox
                colorScheme="red"
                checked={notNovice}
                onChange={(e) => {
                  setNotNovice(!notNovice);
                }}
              >
                {t("Don't show this message in the future")}
              </Checkbox>
            </ModalBody>

            <ModalFooter>
              <NoShadowButton
                colorScheme="green"
                onClick={() => {
                  // ** If not a novice, make sure our localstorage is set
                  if (!notNovice) {
                    localStorage.setItem("BASED_YOBOT_APE_MODE", "I_AM_BASED");
                  }
                  if (!transactionTimedOut) {
                    // SUBMIT
                    submitBid(frozenBidPrice, frozenBidQty);
                    // ** Close the Modal **
                    onClose();
                  } else {
                    // ** Close the Modal **
                    onClose();
                    // ** Toast notification that the 1 minute confirmation period timed out...
                    // ** Please resubmit tx
                    toast.error({
                      title: "Confirmation Timeout! (> 1 minute)",
                      description: "Please confirm in less than 60 seconds!",
                      status: "error",
                      position: "middle",
                      duration: 3000,
                      isClosable: true,
                    });
                    setPlacingBid(false);
                  }
                }}
              >
                Submit
              </NoShadowButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </div>
  );
};

export default BidForm;
