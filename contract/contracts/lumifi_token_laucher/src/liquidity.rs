use soroban_sdk::{contract,contracttype, contractimpl, Address, Env};
use crate::storage_types::DataKey;

#[derive(Clone, Debug)]
#[contracttype]
pub struct LiquidityPool {
    pub token_a: Address,
    pub token_b: Address,
    pub reserves_a: i128,
    pub reserves_b: i128,
}

#[contract]
pub struct LiquidityPoolContract;

#[contractimpl]
impl LiquidityPoolContract {
    pub fn create_pool(env: Env, token_a: Address, token_b: Address) {
        let pool = LiquidityPool {
            token_a: token_a.clone(),
            token_b: token_b.clone(),
            reserves_a: 0,
            reserves_b: 0,
        };

        env.storage()
            .instance()
            .set(&DataKey::LiquidityPool(token_a), &pool);
    }

    pub fn add_liquidity(env: Env, token_a: Address, amount_a: i128, amount_b: i128) {
        let mut pool: LiquidityPool = env
            .storage()
            .instance()
            .get(&DataKey::LiquidityPool(token_a.clone()))
            .expect("Pool not found");

        pool.reserves_a += amount_a;
        pool.reserves_b += amount_b;

        env.storage().instance().set(&DataKey::LiquidityPool(token_a), &pool);
    }

    pub fn swap(env: Env, from_token: Address, amount_in: i128) -> i128 {
        let mut pool: LiquidityPool = env
            .storage()
            .instance()
            .get(&DataKey::LiquidityPool(from_token.clone()))
            .expect("Pool not found");

        let amount_out = if from_token == pool.token_a {
            let new_reserve = pool.reserves_a + amount_in;
            let output = (amount_in * pool.reserves_b) / new_reserve;
            pool.reserves_a = new_reserve;
            pool.reserves_b -= output;
            output
        } else {
            let new_reserve = pool.reserves_b + amount_in;
            let output = (amount_in * pool.reserves_a) / new_reserve;
            pool.reserves_b = new_reserve;
            pool.reserves_a -= output;
            output
        };

        env.storage()
            .instance()
            .set(&DataKey::LiquidityPool(from_token), &pool);

        amount_out
    }
}
