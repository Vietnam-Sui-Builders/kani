module kani::kani_test;

use kani::kani::{
    create_collection,
    mint_to_sender,
    collection_name,
    collection_total_supply,
    collection_minted,
    init_for_testing,
    claim_for_testing,
    NFTCollection
};
use std::string;
use sui::test_scenario;

#[test] // Marks this function as a unit test
public fun test_create_and_mint(ctx: &mut TxContext) {
    // Define test addresses for the collection owner and NFT recipient
    let collection_owner = @0xcafe;
    let recipient = @0xc0ffee;

    // Initialize a test scenario (simulated blockchain environment)
    let mut scenario = test_scenario::begin(collection_owner);

    {
        // Initialize the Kani module for testing (e.g., set up shared state)
        init_for_testing(scenario.ctx());
    };

    // Move to the next transaction, executed by the collection owner
    scenario.next_tx(collection_owner);

    {
        // Claim a mock Publisher capability
        // (In real deployment, the Publisher would come from Move framework registration)
        let publisher = claim_for_testing(scenario.ctx());

        // --- CREATE COLLECTION ---
        // Call your main function to create a new NFT collection.
        // The context passed here (ctx) represents the transaction context.
        create_collection(&publisher, string::utf8(b"Kani Collection"), 2, ctx);

        // Retrieve the created collection object from the sender’s account
        let mut collection = scenario.take_from_sender<NFTCollection>();

        // --- ASSERT COLLECTION PROPERTIES ---
        // Verify that collection name is correctly set
        assert!(collection_name(&collection) == string::utf8(b"Kani Collection"), 100);

        // Verify the total supply is 2 NFTs
        assert!(collection_total_supply(&collection) == 2, 101);

        // Verify that no NFTs have been minted yet
        assert!(collection_minted(&collection) == 0, 102);

        // --- MINT FIRST NFT ---
        mint_to_sender(
            &mut collection,
            string::utf8(b"Kani #1"), // NFT name
            string::utf8(b"First NFT"), // NFT description
            b"https://kani.io/1", // NFT metadata URI
            recipient, // Recipient address
            ctx,
        );

        // After minting, minted count should increase to 1
        assert!(collection_minted(&collection) == 1, 103);

        // --- MINT SECOND NFT ---
        mint_to_sender(
            &mut collection,
            string::utf8(b"Kani #2"), // NFT name
            string::utf8(b"Second NFT"),
            b"https://kani.io/2",
            recipient,
            ctx,
        );

        // After minting the second NFT, total minted should now be 2
        assert!(collection_minted(&collection) == 2, 104);

        // --- CLEANUP ---
        // Return the publisher capability (non-owned object)
        test_scenario::return_immutable(publisher);

        // Return the collection object back to the collection_owner
        // to avoid linear resource leaks
        test_scenario::return_to_address(collection_owner, collection);
    };

    // End the test scenario
    scenario.end();
}
