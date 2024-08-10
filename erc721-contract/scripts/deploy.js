const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("TestNFT");
  await contract.waitForDeployment();
  const deployedContract = await contract.getAddress();
  console.log(`Swisstronik contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
