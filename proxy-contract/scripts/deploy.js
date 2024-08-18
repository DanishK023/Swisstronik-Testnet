const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Swisstronik = await ethers.getContractFactory('Swisstronik');
  const swisstronik = await Swisstronik.deploy();
  await swisstronik.waitForDeployment();
  console.log('Non-proxy Swisstronik deployed to:', swisstronik.target);

  console.log(`Deployment transaction hash: https://explorer-evm.testnet.swisstronik.com/address/${swisstronik.target}`);

  const upgradedSwisstronik = await upgrades.deployProxy(Swisstronik, ['Good To be Here!'], { kind: 'transparent' });
  await upgradedSwisstronik.waitForDeployment(); 
  console.log('Proxy Swisstronik deployed to:', upgradedSwisstronik.target);
  console.log(`Deployment transaction hash: https://explorer-evm.testnet.swisstronik.com/address/${upgradedSwisstronik.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
