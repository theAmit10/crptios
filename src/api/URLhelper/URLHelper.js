const BASE_URL = 'https://www.hostmansa.com/crypto/public/';
const USER_SECRET_KEY = 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp';

const SIGN_UP = 'api/sign-up';
const SIGN_IN = 'api/sign-in';
// const FORGOT_PASSWORD = 'api/reset-password';
const FORGOT_PASSWORD = 'api/forgot-password';

const PROFILE = 'api/profile';
const CHANGE_PASSWORD = 'api/change-password';
const UPDATE_PROFILE = 'api/update-profile';
const WALLET_LIST = 'api/wallet-list';
const INVESTMENT_LIST = 'api/investment-list';
const MY_INVESTMENT_LIST = BASE_URL + 'api/my-investment-history';
const PAYMENTG_LIST = BASE_URL + 'api/method-deposit';
const MAKE_INVESTMENT = BASE_URL + 'api/investment-buy';
const OTP_VERIFY = BASE_URL + 'api/verify-email';
const DEPOSIT_API = BASE_URL + 'api/currency-deposit-process';
const DEPOSIT_HISTORY = BASE_URL + 'api/currency-deposit-history';
const WITHDRAW_HISTORY = BASE_URL + 'api/fiat-withdrawal-history';
const TRADE_HISTORY = BASE_URL + 'api/all-sell-orders-history-app';
const ALL_TRADE_HISTORY = BASE_URL + 'api/all-buy-orders-history-app';
const REFERREL_DETAILS = BASE_URL + 'api/referral-app';

// for Ticket
const CREATE_TICKET = BASE_URL + 'api/submit-ticket';
const GET_ALL_TICKET = BASE_URL + 'api/submit-ticket-list';
const GET_TICKET_DETAILS = BASE_URL + 'api/submit-ticket-list-detail';

// For Crypto Deposit
const CHECK_ADDRESS = BASE_URL + 'api/check-address';
const TRANSFER_CRYPTO = BASE_URL + 'api/buy-limit-app';

// For Trade
const BUY_TRADE = BASE_URL + 'api/buy-market-app';
const ABOUT_CRYPTO = BASE_URL + 'api/landing';
const API_INR_USDT = BASE_URL + 'api/wallet-list/INR_USDT';
const API_USDT_INR = BASE_URL + 'api/wallet-list/USDT_INR';

// To Buy Cryoto
const BUY_CRYPTO = BASE_URL + 'api/buy-crypto';

// Withdraw Request
const API_WITHDRAW = BASE_URL + 'api/fiat-withdrawal-process';
const API_WITHDRAW_HISTORY = BASE_URL + 'api/fiat-withdrawal-history';

const API_PROFIT = BASE_URL + 'api/get-exchange-chart-data-app';
const NOTIFICATION_API = BASE_URL + 'api/notifications';

export default {
  BASE_URL,
  SIGN_UP,
  USER_SECRET_KEY,
  SIGN_IN,
  FORGOT_PASSWORD,
  PROFILE,
  CHANGE_PASSWORD,
  UPDATE_PROFILE,
  WALLET_LIST,
  INVESTMENT_LIST,
  PAYMENTG_LIST,
  MY_INVESTMENT_LIST,
  MAKE_INVESTMENT,
  OTP_VERIFY,
  DEPOSIT_API,
  DEPOSIT_HISTORY,
  REFERREL_DETAILS,
  CREATE_TICKET,
  GET_ALL_TICKET,
  GET_TICKET_DETAILS,
  BUY_CRYPTO,
  BUY_TRADE,
  CHECK_ADDRESS,
  TRANSFER_CRYPTO,
  ABOUT_CRYPTO,
  API_WITHDRAW,
  API_WITHDRAW_HISTORY,
  API_INR_USDT,
  API_USDT_INR,
  WITHDRAW_HISTORY,
  TRADE_HISTORY,
  ALL_TRADE_HISTORY,
  API_PROFIT,
  NOTIFICATION_API
};
