const MyContract = artifacts.require("CharityFactory");

module.exports = function (deployer) {
  deployer.deploy(MyContract);
};
