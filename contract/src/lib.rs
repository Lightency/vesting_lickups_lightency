use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::{env, near_bindgen};

pub type AccountId = String;

#[derive(BorshDeserialize, BorshSerialize, Clone, Debug)]
pub struct Data {
    pub token_id: AccountId,
    pub amount_of_token: u128,
    pub locked_amount: u128,
    pub unlocked_amount: u128,
    pub duration: u64,
    pub first_payment: u64,
    pub second_payment: u64,
    pub third_payment: u64,
    pub fourth_payment: u64,
    pub clifftime: u64,
    pub ispaid: bool,
    pub nb_time_payment: u8,
}
impl Data {
    pub fn get_tokenid(&self) -> AccountId {
        self.token_id.clone()
    }

    pub fn get_amount_of_token(&self) -> u128 {
        self.amount_of_token
    }

    pub fn get_locked_amount(&self) -> u128 {
        self.locked_amount
    }

    pub fn get_unlocked_amount(&self) -> u128 {
        self.unlocked_amount
    }

    pub fn get_duration(&self) -> u64 {
        self.duration
    }

    pub fn get_clifftime(&self) -> u64 {
        self.clifftime
    }

    pub fn is_paid(&self) -> bool {
        self.ispaid
    }
    pub fn get_nb_time_payment(&self) -> u8 {
        self.nb_time_payment
    }
    pub fn get_time_of_payments(&self) -> [u64; 4] {
        return [
            self.first_payment,
            self.second_payment,
            self.third_payment,
            self.fourth_payment,
        ];
    }
}
// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct VestingContract {
    records: LookupMap<AccountId, Data>,
}

// Define the default, which automatically initializes the contract
impl Default for VestingContract {
    fn default() -> Self {
        panic!("Vesting is not initialized yet")
    }
}

// Make sure that the caller of the function is the owner
fn assert_self() {
    assert_eq!(
        env::current_account_id(),
        env::predecessor_account_id(),
        "Can only be called by owner"
    );
}

// Implement the contract structure
#[near_bindgen]
impl VestingContract {
    #[init]
    pub fn new() -> Self {
        assert!(env::state_read::<Self>().is_none(), "Already initialized");
        Self {
            records: LookupMap::new(b"a"),
        }
    }

    // Owner's methods. Can only be called by the owner
    pub fn add_lockup(
        &mut self,
        ownerid: AccountId,
        tokenid: AccountId,
        amount_of_token: u128,
        duration: u64,
    ) {
        assert_self();
        let data = Data {
            token_id: tokenid,
            amount_of_token: amount_of_token,
            locked_amount: amount_of_token,
            unlocked_amount: 0,
            duration: duration,
            clifftime: (duration / 4),
            first_payment: env::block_timestamp() + (duration / 4),
            second_payment: env::block_timestamp() + (2 * (duration / 4)),
            third_payment: env::block_timestamp() + (3 * (duration / 4)),
            fourth_payment: env::block_timestamp() + (4 * (duration / 4)),
            ispaid: false,
            nb_time_payment: 0,
        };
        self.records.insert(&ownerid, &data);
    }

    /*pub fn get_data(&self) -> Data {
        match self.records.get(&env::current_account_id()) {
            Some(d) => d.clone(),
            None => panic!("There is no data for this owner_id"),
        }
    }*/

    pub fn get_tokenid(&self) -> AccountId {
        match self.records.get(&env::predecessor_account_id()) {
            Some(d) => d.get_tokenid(),
            None => panic!("There is no data for this owner_id"),
        }
    }

    pub fn get_amount_of_token(&self) -> u128 {
        match self.records.get(&env::predecessor_account_id()) {
            Some(d) => d.get_amount_of_token(),
            None => panic!("There is no data for this owner_id"),
        }
    }

    pub fn get_locked_amount(&self) -> u128 {
        match self.records.get(&env::predecessor_account_id()) {
            Some(d) => d.get_locked_amount(),
            None => panic!("There is no data for this owner_id"),
        }
    }

    pub fn get_unlocked_amount(&self) -> u128 {
        match self.records.get(&env::predecessor_account_id()) {
            Some(d) => d.get_unlocked_amount(),
            None => panic!("There is no data for this owner_id"),
        }
    }

    pub fn get_duration(&self) -> u64 {
        match self.records.get(&env::predecessor_account_id()) {
            Some(d) => d.get_duration(),
            None => panic!("There is no data for this owner_id"),
        }
    }

    pub fn get_clifftime(&self) -> u64 {
        match self.records.get(&env::predecessor_account_id()) {
            Some(d) => d.get_clifftime(),
            None => panic!("There is no data for this owner_id"),
        }
    }

    pub fn is_paid(&self) -> bool {
        match self.records.get(&env::predecessor_account_id()) {
            Some(d) => d.is_paid(),
            None => panic!("There is no data for this owner_id"),
        }
    }

    pub fn get_nb_time_payment(&self) -> u8 {
        match self.records.get(&env::predecessor_account_id()) {
            Some(d) => d.get_nb_time_payment(),
            None => panic!("There is no data for this owner_id"),
        }
    }

    pub fn get_time_of_payments(&self) -> [u64; 4] {
        match self.records.get(&env::predecessor_account_id()) {
            Some(d) => d.get_time_of_payments(),
            None => panic!("There is no data for this owner_id"),
        }
    }
}
