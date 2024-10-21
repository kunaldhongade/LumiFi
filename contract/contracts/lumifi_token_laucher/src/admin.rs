use soroban_sdk::{Address, Env};
use crate::storage_types::DataKey;

pub fn has_administrator(e: &Env) -> bool {
    e.storage().instance().has(&DataKey::Admin)
}

pub fn read_administrator(e: &Env) -> Address {
    e.storage().instance().get(&DataKey::Admin).unwrap()
}

pub fn write_administrator(e: &Env, id: &Address) {
    e.storage().instance().set(&DataKey::Admin, id);
}
