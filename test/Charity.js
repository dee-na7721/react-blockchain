const CharityFactory = artifacts.require('CharityFactory');
const Charity = artifacts.require('Charity');

contract('CharityFactory', () => {

    let charityFactory;

    before(async () => {                                        //runs before running the test
        charityFactory = await CharityFactory.deployed();
    });

    it('Should deploy the contract factory correctly', async () => {
        // const charityFactory = await CharityFactory.deployed();
        console.log(charityFactory.address);
        assert(CharityFactory.address !== ''); // assert -> pass this case if
    });
    

    it("should create a contract ", async () => {
        // const charityFactory = await CharityFactory.deployed();
        const accounts = await web3.eth.getAccounts();          //truffle vitra ko test netwrok ko array , its diff from ganache
        await charityFactory.createCharity('abc',100);          //default creates from 1st account
        const result = await charityFactory.charityList(accounts[0],0);
        assert(result !== '');      //blockchain stores 90 in large number by adding numerous zeros to it, so it must be converted to number to check the value
    });

    it("should update charityCount when new charity is created", async () => {
        // const charityFactory = await CharityFactory.deployed();
        const result = await charityFactory.charityCount(); //public varivable has automatic getter
        assert(result.toNumber() === 1);
    })

    it("should update the values of charity contract", async () => {
        // const charityFactory = await CharityFactory.deployed();
        const accounts = await web3.eth.getAccounts();
        const charityAddress = await charityFactory.charityList(accounts[0], 0); //1st account is the acc of deployer 
        
        const charity = await Charity.at(charityAddress);
        const name = await charity.name();
        const targetAmount = await charity.targetAmount();
        const owner = await charity.owner();

        assert(name === "abc" && targetAmount.toNumber() === 100 && owner === accounts[0]);
        console.log(name, targetAmount, owner);
    })
});