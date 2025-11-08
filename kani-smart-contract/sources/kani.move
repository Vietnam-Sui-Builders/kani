module kani::kani;

use std::string::String;
use sui::event;
use sui::package::{Self, Publisher};
use sui::url::{Self, Url};

const ENotAuthorized: u64 = 0;
const ECollectionSoldOut: u64 = 1;

public struct KaniNFT has key, store {
    id: UID,
    name: String,
    description: String,
    url: Url,
}

public struct NFTCollection has key {
    id: UID,
    name: String,
    total_supply: u64,
    minted: u64,
}

// For emit event
public struct NFTMinted has copy, drop {
    collection_id: ID,
    nft_id: ID,
    minter: address,
}

public struct KANI has drop {}

fun init(otw: KANI, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    transfer::public_transfer(publisher, ctx.sender());
}

public entry fun create_collection(
    cap: &Publisher,
    name: String,
    total_supply: u64,
    ctx: &mut TxContext,
) {
    assert!(cap.from_module<KANI>(), ENotAuthorized);
    let collection = NFTCollection {
        id: object::new(ctx),
        name,
        total_supply,
        minted: 0,
    };
    transfer::transfer(collection, ctx.sender());
}

public entry fun mint_to_sender(
    collection: &mut NFTCollection,
    name: String,
    description: String,
    url: vector<u8>,
    to: address,
    ctx: &mut TxContext,
) {
    assert!(collection.minted < collection.total_supply, ECollectionSoldOut);

    collection.minted = collection.minted + 1;

    let minted_nft = KaniNFT {
        id: object::new(ctx),
        name,
        description,
        url: url::new_unsafe_from_bytes(url),
    };
    event::emit(NFTMinted {
        collection_id: object::id(collection),
        nft_id: object::id(&minted_nft),
        minter: to,
    });
    transfer::transfer(minted_nft, to);
}

// Getters
public fun name(nft: &KaniNFT): String {
    nft.name
}

public fun description(nft: &KaniNFT): String {
    nft.description
}

public fun url(nft: &KaniNFT): &Url {
    &nft.url
}

public fun collection_name(collection: &NFTCollection): String {
    collection.name
}

public fun collection_total_supply(collection: &NFTCollection): u64 {
    collection.total_supply
}

public fun collection_minted(collection: &NFTCollection): u64 {
    collection.minted
}

#[test_only]
public fun init_for_testing(ctx: &mut TxContext) {
    init(KANI {}, ctx);
}

#[test_only]
public fun claim_for_testing(ctx: &mut TxContext): Publisher {
    sui::package::claim(KANI {}, ctx)
}
