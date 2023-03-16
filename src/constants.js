import { config } from 'dotenv';
import axios from 'axios';

config();

const constants = {};

export async function setup() {
  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
  });

  const { data: cashIn } = await api.get('/cash-in');
  constants.cashInPercent = cashIn.percents;
  constants.cashInMaxFee = cashIn.max.amount;
  constants.supportedCurrency = cashIn.max.currency;

  const { data: cashOutNatural } = await api.get('/cash-out-natural');
  constants.cashOutNaturalPercent = cashOutNatural.percents;
  constants.cashOutNaturalFreeOfChargeLimit = cashOutNatural.week_limit.amount;

  const { data: cashOutJuridical } = await api.get('/cash-out-juridical');
  constants.cashOutJuridicalPercent = cashOutJuridical.percents;
  constants.cashOutJuridicalMinFee = cashOutJuridical.min.amount;

  return constants;
}

export default constants;
