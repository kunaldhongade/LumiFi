use soroban_sdk::{contract,contracttype, contractimpl, Address, Env, Map};
use crate::storage_types::DataKey;

#[derive(Clone, Debug)]
#[contracttype]
pub struct ICO {
    pub token: Address,
    pub target_amount: i128,
    pub deadline: u64,
    pub contributions: Map<Address, i128>,
}

#[contract]
pub struct ICOContract;

#[contractimpl]
impl ICOContract {
    pub fn start(env: Env, token: Address, target_amount: i128, deadline: u64) {
        let admin = crate::admin::read_administrator(&env);
        admin.require_auth();

        let ico = ICO {
            token: token.clone(),
            target_amount,
            deadline,
            contributions: Map::new(&env),
        };

        env.storage().instance().set(&DataKey::ICO(token.clone()), &ico);
    }

    pub fn contribute(env: Env, token: Address, contributor: Address, amount: i128) {
        contributor.require_auth();

        let mut ico: ICO = env
            .storage()
            .instance()
            .get(&DataKey::ICO(token.clone()))
            .expect("ICO not found.");

        if env.ledger().timestamp() > ico.deadline {
            panic!("ICO has ended");
        }

        let current = ico.contributions.get(contributor.clone()).unwrap_or(0);
        ico.contributions.set(contributor, current + amount);

        env.storage().instance().set(&DataKey::ICO(token), &ico);
    }

    pub fn claim(env: Env, token: Address, contributor: Address) {
        contributor.require_auth();

        let ico: ICO = env
            .storage()
            .instance()
            .get(&DataKey::ICO(token.clone()))
            .expect("ICO not found.");

        if env.ledger().timestamp() <= ico.deadline {
            panic!("ICO is still active");
        }

        let amount = ico.contributions.get(contributor.clone()).unwrap_or(0);
        if amount == 0 {
            panic!("No contributions");
        }

        env.storage().instance().set(&DataKey::ICO(token), &ico);
    }
}
