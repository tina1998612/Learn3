import React from "react";

// We'll use ethers to interact with the Ethereum network and our contract
import { BigNumber, ethers } from "ethers";

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import contractAddress from "../contracts/contract-address.json";
import CourseArtifact from "../contracts/Course.json";
import CourseFactoryArtifact from "../contracts/CourseFactory.json";
import QnABoardArtifact from "../contracts/QnABoard.json";
import courseMockData from "../data/courses.json";

// All the logic of this dapp is contained in the Dapp component.
// These other components are just presentational ones: they don't have any
// logic. They just render HTML.
import { ConnectWallet } from "./ConnectWallet";
import { NoTokensMessage } from "./NoTokensMessage";
import { NoWalletDetected } from "./NoWalletDetected";
import { TransactionErrorMessage } from "./TransactionErrorMessage";
import { Transfer } from "./Transfer";
import { WaitingForTransactionMessage } from "./WaitingForTransactionMessage";

import { Box, Container, Image } from "@chakra-ui/react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CourseList } from "./CourseList";
import { Navbar } from "./Navbar";

// import { OpenSeaSDK, Network } from "opensea-js";
// This is the Hardhat Network id, you might change it in the hardhat.config.js.
// If you are using MetaMask, be sure to change the Network id to 1337.
// Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
// to use when deploying to other networks.
const HARDHAT_NETWORK_ID = "31337";

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

// This component is in charge of doing these things:
//   1. It connects to the user's wallet
//   2. Initializes ethers and the Token contract
//   3. Polls the user balance to keep it updated.
//   4. Transfers tokens by sending transactions
//   5. Renders the whole application
//
// Note that (3) and (4) are specific of this sample application, but they show
// you how to keep your Dapp and contract's state in sync,  and how to send a
// transaction.
export class Dapp extends React.Component {
  constructor(props) {
    super(props);

    // We store multiple things in Dapp's state.
    // You don't need to follow this pattern, but it's an useful example.
    this.initialState = {
      // The info of the token (i.e. It's Name and symbol)
      tokenData: undefined,
      // The user's address and balance
      selectedAddress: undefined,
      balance: undefined,
      // The ID about transactions being sent, and any possible error with them
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
      courses: undefined,
    };

    this.state = this.initialState;
  }

  render() {
    // Ethereum wallets inject the window.ethereum object. If it hasn't been
    // injected, we instruct the user to install MetaMask.
    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    }

    // The next thing we need to do, is to ask the user to connect their wallet.
    // When the wallet gets connected, we are going to save the users's address
    // in the component's state. So, if it hasn't been saved yet, we have
    // to show the ConnectWallet component.
    //
    // Note that we pass it a callback that is going to be called when the user
    // clicks a button. This callback just calls the _connectWallet method.
    // if (!this.state.selectedAddress) {
    //   return (
    //     <ConnectWallet
    //       connectWallet={ () => this._connectWallet() }
    //       networkError={ this.state.networkError }
    //       dismiss={ () => this._dismissNetworkError() }
    //     />
    //   );
    // }

    // If the token data or the user's balance hasn't loaded yet, we show
    // a loading component.
    // if (!this.state.tokenData || !this.state.balance) {
    //   return <Loading />;
    // }

    return (
      <>
        <Box backgroundColor="#E9E9E7">
          <Container maxW="100%">
            <Navbar
              maxW="100%"
              selectedAddress={ this.state.selectedAddress }
              balance={ this.state.balance }
              tokenData={ this.state.tokenData }
              disconnectWallet={ () => {
                console.log("hi");
                this.setState({ selectedAddress: undefined });
                this._resetState();
              } }
              ConnectWalletBtn={
                <ConnectWallet
                  connectWallet={ () => this._connectWallet() }
                  networkError={ this.state.networkError }
                  dismiss={ () => this._dismissNetworkError() }
                />
              }
              createCourse={ (data) => this._createCourse(data) }
            ></Navbar>
            { !this.state.selectedAddress &&
              <Image src="Learn3.jpg"></Image>
            }
            <CourseList
              purchaseCourse={ (selectedCourse) =>
                this._purchaseCourse(selectedCourse)
              }
              coursesJsonArr={ this.state.courses }
              refundCourse={ (selectedCourse) =>
                this._refundCourse(selectedCourse)
              }
              giftCourse={ (selectedCourse) => this._giftCourse(selectedCourse) }
              revenue={ (selectedCourse) => this._revenue(selectedCourse) }
            ></CourseList>
          </Container>
        </Box>
      </>
    );

    // If everything is loaded, we render the application.
    return (
      <div className="container p-4">
        <div className="row">
          <div className="col-12">
            <h1>
              { this.state.tokenData.name } ({ this.state.tokenData.symbol })
            </h1>
            <p>
              Welcome <b>{ this.state.selectedAddress }</b>, you have{ " " }
              <b>
                { this.state.balance.toString() } { this.state.tokenData.symbol }
              </b>
              .
            </p>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12">
            {/* 
              Sending a transaction isn't an immediate action. You have to wait
              for it to be mined.
              If we are waiting for one, we show a message here.
            */}
            { this.state.txBeingSent && (
              <WaitingForTransactionMessage txHash={ this.state.txBeingSent } />
            ) }

            {/* 
              Sending a transaction can fail in multiple ways. 
              If that happened, we show a message here.
            */}
            { this.state.transactionError && (
              <TransactionErrorMessage
                message={ this._getRpcErrorMessage(this.state.transactionError) }
                dismiss={ () => this._dismissTransactionError() }
              />
            ) }
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {/*
              If the user has no tokens, we don't show the Transfer form
            */}
            { this.state.balance.eq(0) && (
              <NoTokensMessage selectedAddress={ this.state.selectedAddress } />
            ) }

            {/*
              This component displays a form that the user can use to send a 
              transaction and transfer some tokens.
              The component doesn't have logic, it just calls the transferTokens
              callback.
            */}
            { this.state.balance.gt(0) && (
              <Transfer
                transferTokens={ (to, amount) =>
                  this._transferTokens(to, amount)
                }
                tokenSymbol={ this.state.tokenData.symbol }
              />
            ) }
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    // We poll the user's balance, so we have to stop doing that when Dapp
    // gets unmounted
    this._stopPollingData();
  }

  async _connectWallet() {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    // this._originalProvider = new WalletConnectProvider({
    //   rpc: {
    //     4: process.env.REACT_APP_RINKEBY,
    //     // 137: process.env.REACT_APP_POLYGON,
    //   },
    //   qrcodeModalOptions: {
    //     mobileLinks: [
    //       "rainbow",
    //       "metamask",
    //       "argent",
    //       "trust",
    //       "imtoken",
    //       "pillar",
    //     ],
    //     desktopLinks: ["encrypted ink", "metamask"],
    //   },
    // });
    // await this._originalProvider.enable();

    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Once we have the address, we can initialize the application.

    // First we check the network
    if (!this._checkNetwork()) {
      return;
    }

    this._initialize(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData();
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state
      if (newAddress === undefined) {
        return this._resetState();
      }

      this._initialize(newAddress);
    });

    // We reset the dapp state if the network is changed
    window.ethereum.on("chainChanged", ([networkId]) => {
      this._stopPollingData();
      this._resetState();
    });
  }

  _initialize(userAddress) {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    this.setState({
      selectedAddress: userAddress,
    });

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
    this._initializeEthers();
    // this._getTokenData();
    this._startPollingData();
  }

  async _initializeEthers() {
    // We first initialize ethers by creating a provider using window.ethereum
    // this._provider = new ethers.providers.Web3Provider(this._originalProvider);
    this._provider = new ethers.providers.Web3Provider(window.ethereum);
    // this.openseaSDK = new OpenSeaSDK(this._provider, {
    //   networkName: Network.Rinkeby,
    //   apiKey: process.env.REACT_APP_OPENSEA_API_KEY,
    // });
    // Then, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.

    this._courseFactory = new ethers.Contract(
      contractAddress.CourseFactory,
      CourseFactoryArtifact.abi,
      this._provider.getSigner(0)
    );
    // this._QA = new ethers.Contract(
    //   contractAddress._QnABoard,
    //   QnABoardArtifact.abi,
    //   this._provider.getSigner(0)
    // );

    window._courseFactory = this._courseFactory;
  }

  // The next two methods are needed to start and stop polling data. While
  // the data being polled here is specific to this example, you can use this
  // pattern to read any data from your contracts.
  //
  // Note that if you don't need it to update in near real time, you probably
  // don't need to poll it. If that's the case, you can just fetch it when you
  // initialize the app, as we do with the token data.
  _startPollingData() {
    this._pollDataInterval = setInterval(() => {
      // this._updateBalance();
      this._updateCourseList();
    }, 1000);

    // We run it once immediately so we don't have to wait for it
    // this._updateBalance();
    this._updateCourseList();
  }

  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  // The next two methods just read from the contract and store the results
  // in the component state.
  async _getTokenData() {
    const name = await this._token.name();
    const symbol = await this._token.symbol();

    this.setState({ tokenData: { name, symbol } });
  }

  async _updateBalance() {
    const balance = await this._token.balanceOf(this.state.selectedAddress);
    this.setState({ balance });
  }
  async _updateCourseList() {
    if (!this._courseFactory) return;
    const courseCnt = await this._courseFactory.functions.getCourseCount();
    // console.log(parseInt(courseCnt));
    // let etherPrice = await this._provider.getEtherPrice();
    let courses = [];
    for (let i = 0; i < parseInt(courseCnt); i++) {
      let contractAddr = await this._courseFactory.courses(i);
      let _courseContract = new ethers.Contract(
        contractAddr,
        CourseArtifact.abi,
        this._provider.getSigner(0)
      );
      const _name = await _courseContract.name();
      // console.log(_courseContract);
      const _price = await _courseContract.price();
      const _goalFund = await _courseContract.crowdfundGoalStudentCount();
      const _currentFund = await _courseContract.totalSupply();
      const _purchased = await _courseContract.balanceOf(
        this.state.selectedAddress
      );
      // console.log(_purchased);
      courses.push({
        id: courses.length,
        name: _name,
        cover: courseMockData[courses.length].cover,
        description: "This is a course you just created.",
        status: "funding",
        price: ethers.utils.formatEther(_price),
        totalFunding: _goalFund.toNumber(),
        fund: _currentFund.toNumber(),
        purchased: _purchased.toNumber() != 0,
        address: contractAddr,
      });
    }
    // console.log(courses);
    this.setState({ courses });
  }

  // This method sends an ethereum transaction to transfer tokens.
  // While this action is specific to this application, it illustrates how to
  // send a transaction.
  async _transferTokens(to, amount) {
    // Sending a transaction is a complex operation:
    //   - The user can reject it
    //   - It can fail before reaching the ethereum network (i.e. if the user
    //     doesn't have ETH for paying for the tx's gas)
    //   - It has to be mined, so it isn't immediately confirmed.
    //     Note that some testing networks, like Hardhat Network, do mine
    //     transactions immediately, but your dapp should be prepared for
    //     other networks.
    //   - It can fail once mined.
    //
    // This method handles all of those things, so keep reading to learn how to
    // do it.

    try {
      // If a transaction fails, we save that error in the component's state.
      // We only save one such error, so before sending a second transaction, we
      // clear it.
      this._dismissTransactionError();

      // We send the transaction, and save its hash in the Dapp's state. This
      // way we can indicate that we are waiting for it to be mined.
      const tx = await this._token.transfer(to, amount);
      this.setState({ txBeingSent: tx.hash });

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that made the transaction fail when it
        // was mined, so we throw this generic one.
        throw new Error("Transaction failed");
      }

      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
      // await this._updateBalance();
    } catch (error) {
      // We check the error code to see if this error was produced because the
      // user rejected a tx. If that's the case, we do nothing.
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      // Other errors are logged and stored in the Dapp's state. This is used to
      // show them to the user, and for debugging.
      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      // If we leave the try/catch, we aren't sending a tx anymore, so we clear
      // this part of the state.
      this.setState({ txBeingSent: undefined });
    }
  }
  async _refundCourse(selectedCourse) {
    try {
      this._dismissTransactionError();
      console.log("refunding");
      let _course = new ethers.Contract(
        selectedCourse.address,
        CourseArtifact.abi,
        this._provider.getSigner(0)
      );
      const tx = await _course.refund();

      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      this.setState({ txBeingSent: undefined });
    }
  }
  async _revenue(selectedCourse) {
    try {
      this._dismissTransactionError();
      console.log("distributing revenue");
      let _course = new ethers.Contract(
        selectedCourse.address,
        CourseArtifact.abi,
        this._provider.getSigner(0)
      );
      const tx = await _course.distributeRevenue();

      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      this.setState({ txBeingSent: undefined });
    }
  }
  async _giftCourse(selectedCourse) {
    try {
      this._dismissTransactionError();
      console.log("gifting");
      let _course = new ethers.Contract(
        selectedCourse.address,
        CourseArtifact.abi,
        this._provider.getSigner(0)
      );
      const courseAddr = selectedCourse.address;
      const addr = this.state.selectedAddress;
      const _tokenid = await _course.addrToTokenIDPlusOne(addr);
      const tokenid = _tokenid.toNumber() - 1;
      let friendAddr = prompt("Please enter your friend's address:)");
      const transactionHash = await _course.transfer({
        asset: { tokenid, courseAddr },
        addr, // Must own the asset
        friendAddr,
      });

      this.setState({ txBeingSent: transactionHash });

      // const receipt = await tx.wait();

      // if (receipt.status === 0) {
      //   throw new Error("Transaction failed");
      // }
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      this.setState({ txBeingSent: undefined });
    }
  }
  async _postQ(selectedCourse, question) {
    try {
      this._dismissTransactionError();
      console.log("ask");
      let _course = new ethers.Contract(
        selectedCourse.address,
        CourseArtifact.abi,
        this._provider.getSigner(0)
      );
      const QA_address = await _course.qaBoard();
      let _qa = new ethers.Contract(
        QA_address,
        QnABoardArtifact.abi,
        this._provider.getSigner(0)
      );
      const tx = await _qa.postQuestion(question.reward, question.hash, {
        value: question.reward,
      });

      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      this.setState({ txBeingSent: undefined });
    }
  }
  async _ansQ(selectedCourse, answer) {
    try {
      this._dismissTransactionError();
      console.log("answer");
      let _course = new ethers.Contract(
        selectedCourse.address,
        CourseArtifact.abi,
        this._provider.getSigner(0)
      );
      const QA_address = await _course.qaBoard();
      let _qa = new ethers.Contract(
        QA_address,
        QnABoardArtifact.abi,
        this._provider.getSigner(0)
      );
      const tx = await _qa.answerQuestion(answer.qid, answer.hash);

      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      this.setState({ txBeingSent: undefined });
    }
  }
  async _acceptQ(selectedCourse, answer) {
    try {
      this._dismissTransactionError();
      console.log("accept ans");
      let _course = new ethers.Contract(
        selectedCourse.address,
        CourseArtifact.abi,
        this._provider.getSigner(0)
      );
      const QA_address = await _course.qaBoard();
      let _qa = new ethers.Contract(
        QA_address,
        QnABoardArtifact.abi,
        this._provider.getSigner(0)
      );
      const tx = await _qa.acceptAnswer(answer.qid, answer.id);

      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      this.setState({ txBeingSent: undefined });
    }
  }
  async _purchaseCourse(selectedCourse) {
    try {
      this._dismissTransactionError();
      // console.log("purchasing course", selectedCourse.address);
      let _course = new ethers.Contract(
        selectedCourse.address,
        CourseArtifact.abi,
        this._provider.getSigner(0)
      );
      const _price = await _course.price();
      const tx = await _course.enroll({
        value: _price,
      });
      //  const tx = await this._course.createCourse(
      //    data.name,
      //    data.symbol,
      //    BigNumber.from(data.price),
      //    data._baseTokenURI,
      //    data._isCrowdfund == "true",
      //    BigNumber.from(data._crowdfundPeriod),
      //    BigNumber.from(data._crowdfundGoalStudentCount),
      //    BigNumber.from(data._refundPeriod),
      //    data._tutors.split(","),
      //    data._tutorsPercent.split(","),
      //    BigNumber.from(data._QnABoardShare)
      //  );
      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      this.setState({ txBeingSent: undefined });
    }
  }
  async _createCourse(data, callback) {
    try {
      this._dismissTransactionError();
      // console.log("creating course", data);
      // console.log(
      //   data.name,
      //   data.symbol,
      //   // BigNumber.from(data.price),
      //   data._baseTokenURI,
      //   data._isCrowdfund == "true",
      //   // BigNumber.from(data._crowdfundPeriod),
      //   BigNumber.from(data._crowdfundGoalStudentCount),
      //   BigNumber.from(data._refundPeriod),
      //   data._tutors.split(","),
      //   data._tutorsPercent.split(","),
      //   BigNumber.from(data._QnABoardShare)
      // );
      const tx = await this._courseFactory.createCourse(
        data.name,
        data.symbol,
        BigNumber.from(data.price),
        data._baseTokenURI,
        data._isCrowdfund == "true",
        BigNumber.from(data._crowdfundPeriod),
        BigNumber.from(data._crowdfundGoalStudentCount),
        BigNumber.from(data._refundPeriod),
        data._tutors.split(","),
        data._tutorsPercent.split(","),
        BigNumber.from(data._QnABoardShare)
      );
      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }

      // await this._updateBalance();
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      this.setState({ txBeingSent: undefined });
      callback && callback();
    }
  }

  // This method just clears part of the state.
  _dismissTransactionError() {
    this.setState({ transactionError: undefined });
  }

  // This method just clears part of the state.
  _dismissNetworkError() {
    this.setState({ networkError: undefined });
  }

  // This is an utility method that turns an RPC error into a human readable
  // message.
  _getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  // This method resets the state
  _resetState() {
    this.setState(this.initialState);
  }

  // This method checks if Metamask selected network is Localhost:8545
  _checkNetwork() {
    // if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
    //   return true;
    // }

    // this.setState({
    //   networkError: "Please connect Metamask to Localhost:8545",
    // });
    // if (window.ethereum.networkVersion === "4") {
    //   return true;
    // }
    // this.setState({
    //   networkError: "Please connect Metamask to Rinkeby",
    // });
    if (window.ethereum.networkVersion === "137") {
      return true;
    }
    this.setState({
      networkError: "Please connect Metamask to Polygon",
    });

    return false;
  }
}
