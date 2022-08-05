use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::Vector;
use near_sdk::{env, near_bindgen};

pub type AccountId = String;

#[derive(BorshDeserialize, BorshSerialize, Clone, Debug)]
pub struct Data {
    pub owner_id: AccountId,
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
    pub fn get_ownerid(&self) -> AccountId {
        self.owner_id.clone()
    }

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
    records: Vector<Data>,
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
            records: Vector::new(b"a"),
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
            owner_id: ownerid,
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
        self.records.push(&data);
    }

    /*pub fn get_data(&self) -> Vec<Data> {
        self.records.to_vec()
    }*/
    pub fn get_ownerid(&self) -> Vec<AccountId> {
        let mut vec: Vec<AccountId> = Vec::new();
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => vec.push(d.get_ownerid()),
                None => panic!("There is no data for this owner_id"),
            }
        }
        vec
    }

    pub fn get_tokenid(&self) -> Vec<AccountId> {
        let mut vec: Vec<AccountId> = Vec::new();
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => vec.push(d.get_tokenid()),
                None => panic!("There is no data for this owner_id"),
            }
        }
        vec
    }

    pub fn get_amount_of_token(&self) -> Vec<u128> {
        let mut vec: Vec<u128> = Vec::new();
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => vec.push(d.get_amount_of_token()),
                None => panic!("There is no data for this owner_id"),
            }
        }
        vec
    }

    pub fn get_locked_amount(&self) -> Vec<u128> {
        let mut vec: Vec<u128> = Vec::new();
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => vec.push(d.get_locked_amount()),
                None => panic!("There is no data for this owner_id"),
            }
        }
        vec
    }

    pub fn get_unlocked_amount(&self) -> Vec<u128> {
        let mut vec: Vec<u128> = Vec::new();
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => vec.push(d.get_unlocked_amount()),
                None => panic!("There is no data for this owner_id"),
            }
        }
        vec
    }

    pub fn get_duration(&self) -> Vec<u64> {
        let mut vec: Vec<u64> = Vec::new();
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => vec.push(d.get_duration()),
                None => panic!("There is no data for this owner_id"),
            }
        }
        vec
    }

    pub fn get_clifftime(&self) -> Vec<u64> {
        let mut vec: Vec<u64> = Vec::new();
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => vec.push(d.get_duration()),
                None => panic!("There is no data for this owner_id"),
            }
        }
        vec
    }

    pub fn is_paid(&self) -> Vec<bool> {
        let mut vec: Vec<bool> = Vec::new();
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => vec.push(d.is_paid()),
                None => panic!("There is no data for this owner_id"),
            }
        }
        vec
    }

    pub fn get_nb_time_payment(&self) -> Vec<u8> {
        let mut vec: Vec<u8> = Vec::new();
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => vec.push(d.get_nb_time_payment()),
                None => panic!("There is no data for this owner_id"),
            }
        }
        vec
    }

    pub fn get_time_of_payments(&self) -> Vec<[u64; 4]> {
        let mut vec: Vec<[u64; 4]> = Vec::new();
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => vec.push(d.get_time_of_payments()),
                None => panic!("There is no data for this owner_id"),
            }
        }
        vec
    }

    // all locked amount of all accounts
    // this will return an error fel build cuz lookupmap is not iterable
    pub fn get_total_locked_amount(&self) -> u128 {
        let mut total_locked_amount = 0;
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => total_locked_amount += d.get_locked_amount(),
                None => panic!("There is no data"),
            }
        }
        total_locked_amount
    }

    pub fn get_total_unlocked_amount(&self) -> u128 {
        let mut total_unlocked_amount = 0;
        for i in 0..self.records.len() {
            match self.records.get(i) {
                Some(d) => total_unlocked_amount += d.get_unlocked_amount(),
                None => panic!("There is no data"),
            }
        }
        total_unlocked_amount
    }
}
