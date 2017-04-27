module.exports = function(deployer) {
  deployer.deploy(MyAdvancedToken,10000,'QWJ_coin',2,'QB',"0x12360b6159d0c46af2ea8c0e80b466716042a592");
  //deployer.autolink(); // for linking imports of other contracts
};
