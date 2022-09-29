import { seed } from "../scripts/seedDb";

exports.mochaGlobalSetup = async function() {
    console.log('Setting up database for testing.');
    await seed();
};