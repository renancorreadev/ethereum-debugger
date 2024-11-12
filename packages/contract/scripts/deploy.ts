import { ethers } from 'hardhat';
import { ContractFactory, parseUnits } from 'ethers';

async function main() {
  // Retrieve the contract to deploy
  const Token: ContractFactory = await ethers.getContractFactory('Token');

  // Define the initial supply for the ERC20 token
  const initialSupply = parseUnits('1000000', 18);

  // Deploy the contract
  const token = await Token.deploy(initialSupply);

  // Wait for the deployment to be mined
  const address = await token.getAddress();

  console.log('Token deployed to:', address);
}

// Execute the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
