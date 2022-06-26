// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const CourseFactory = await ethers.getContractFactory("CourseFactory");
  const courseFactory = await CourseFactory.deploy();
  await courseFactory.deployed();

  console.log("CourseFactory address:", courseFactory.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(courseFactory);
}

function saveFrontendFiles(courseFactory) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ CourseFactory: courseFactory.address }, undefined, 2)
  );

  const CourseFactoryArtifact = artifacts.readArtifactSync("CourseFactory");

  fs.writeFileSync(
    contractsDir + "/CourseFactory.json",
    JSON.stringify(CourseFactoryArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
