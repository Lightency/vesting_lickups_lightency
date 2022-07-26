use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};

pub type AccountId = String;

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct TimeOfPayments {
    pub first_payment: u64,
    pub second_payment: u64,
    pub third_payment: u64,
    pub fourth_payment: u64,
}
impl TimeOfPayments {
    pub fn the_first_payment(&self) -> u64 {
        self.first_payment
    }
    pub fn the_second_payment(&self) -> u64 {
        self.second_payment
    }
    pub fn the_third_payment(&self) -> u64 {
        self.third_payment
    }
    pub fn the_fourth_payment(&self) -> u64 {
        self.fourth_payment
    }
}
// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct VestingContract {
    pub owner_id: AccountId,
    pub token_id: AccountId,
    pub amount_of_token: u128,
    pub locked_amount: u128,
    pub unlocked_amount: u128,
    pub duration: u64,
    pub time_of_payments: TimeOfPayments,
    pub clifftime: u64,
    pub ispaid: bool,
    pub nb_time_payment: u8,
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
    pub fn new(tokenid: AccountId, duration: u64) -> Self {
        assert!(env::state_read::<Self>().is_none(), "Already initialized");
        Self {
            owner_id: env::current_account_id().into(),
            token_id: tokenid.into(),
            amount_of_token: 0,
            locked_amount: 0,
            unlocked_amount: 0,
            duration: duration.into(),
            time_of_payments: TimeOfPayments {
                first_payment: 0,
                second_payment: 0,
                third_payment: 0,
                fourth_payment: 0,
            },
            clifftime: (duration / 4).into(),
            nb_time_payment: 0,
            ispaid: false,
        }
    }

    // Owner's methods. Can only be called by the owner
    pub fn add_lockup(&mut self, ownerid: AccountId, amount_of_token: u128) {
        assert_self();
        self.owner_id = ownerid.into();
        self.amount_of_token = amount_of_token.into();
        self.locked_amount = amount_of_token.into();
        self.unlocked_amount = 0;
        self.time_of_payments = TimeOfPayments {
            first_payment: env::block_timestamp() + (self.clifftime),
            second_payment: env::block_timestamp() + (2 * self.clifftime),
            third_payment: env::block_timestamp() + (3 * self.clifftime),
            fourth_payment: env::block_timestamp() + (4 * self.clifftime),
        }
    }

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
            self.time_of_payments.the_first_payment(),
            self.time_of_payments.the_second_payment(),
            self.time_of_payments.the_third_payment(),
            self.time_of_payments.the_fourth_payment(),
        ];
    }

    pub fn set_duration(&mut self, duration: u64) {
        self.duration = duration.into();
        self.clifftime = (duration / 4).into();
    }
}
