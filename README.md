# Learn3

### 🚀 The Next Generation Web3 Education NFT Protocol

- Dev: @tina1998612, @frank890417
- Made in ETH New York 2022 ⭐️

## Visual

![](https://i.imgur.com/w9nJpve.png)
![](https://i.imgur.com/3wzRBl1.jpg)

## Problem Definition

1. Non-transparent payment and rules, the funding doesn't go to the original content creators.
2. No incentive mechanisms for instructors and TAs to coninuously improve course content.
3. Course ownership cannot be resold, or it's being shared in the black market. The reselling profit doesn't go to the original content creators.
4. Learning history is hard to be recorded across different course platforms. (Token metadata SBT, learning profile)
5. No easy setup for individuals to lauch course crowdfunding events.
6. No automation and clear refund process & rules that can be easily be executed (ERC721R)
7. Course review is scattered around different platforms.

## Main Goal

- **Unlockable Content - use NFT to watch course videos & View Contents**
- **Secondary digital content marketing (sell NFT and revenue share)**
- **Crowd Online course funding mechanism**
- **Bulletin board and Reward-offer Task board - Q&A**
- **Course refund mechanism ( complete rate / locked income to claim & refund), signature to open specific course unit and log the complete rate**
- **Web3 Interest Group, goals and contest**

## Other goals

- Course owner / platfrom signed voucher Coupon System
- Learner Profile - Dynamic Passport NFT
- First / Secondary fee for creator, TA and Platform
- **Tokenomics - Yield of staking token & rewards - Creator, Student, Workers and Platform**
- Community approve based Collaborative note for content module
- **Interactive Quiz Modules + reward pool to bootstrap and marketing -> ( Yield -> Course fund -> % that goes to the 'learn to earn' quiz)**
- Engraving Learning record using SBT
- Token-based Interaction private club
- Time sensitive content access with burnable NFT or POAP

## Dev

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/nomiclabs/Learn3.git
cd Learn3
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
npx hardhat run scripts/deploy.js --network rinkeby
npx hardhat run scripts/deploy.js --network polygon
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```
