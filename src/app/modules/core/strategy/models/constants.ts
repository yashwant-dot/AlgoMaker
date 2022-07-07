export const directionOptions = [
  { id: 'BUY', name: 'BUY' },
  { id: 'SELL', name: 'SELL' },
  { id: 'BOTH', name: 'BOTH' },
];

export const timeframeOptions = [
  { id: 1, name: '1 min' },
  { id: 2, name: '2 min' },
  { id: 3, name: '3 min' },
  { id: 4, name: '4 min' },
  { id: 5, name: '5 min' },
  { id: 10, name: '10 min' },
  { id: 15, name: '15 min' },
  { id: 30, name: '30 min' },
  { id: 60, name: '60 min' },
];

export const indicatorOptions = [
  { id: 'supertrend', name: 'Supertrend' },
  { id: 'rsi', name: 'RSI' },
  { id: 'sma', name: 'SMA' },
  { id: 'fisherTransform', name: 'Fisher Transform' },
  { id: 'centerOfGravity', name: 'Center of Gravity' },
  { id: 'chandeMomentum', name: 'Chande Momentum' },
];

export const candleParamOptions = [
  { id: 'close', name: 'Close' },
  { id: 'high', name: 'High' },
  { id: 'low', name: 'Low' },
  { id: 'open', name: 'Open' },
];

export const operatorOptions = [
  { id: 'signal', name: 'Indicator Signal' },
  { id: 'greater', name: 'Greater Than' },
  { id: 'less', name: 'Less Than' },
];

export const orderTypeOptions = [
  { id: 'MIS', name: 'MIS' },
  { id: 'NRML', name: 'NRML' },
  { id: 'CNC', name: 'CNC' },
];

export const targetUnitOptions = [
  { id: '%', name: '%' },
  { id: 'Rs', name: 'Points' },
];

export const stopLossUnitOptions = [
  { id: '%', name: '%' },
  { id: 'Rs', name: 'Points' },
];

export const exchangeOptions = [
  { id: 'fut_fut', name: 'Fut-Fut' },
  { id: 'fut_opt', name: 'Fut-Opt' },
  { id: 'opt_opt', name: 'Opt-Opt' },
];

export const futDataSymbols = [
  { id: 'NIFTY_FUT', name: 'NIFTY FUT' },
  { id: 'BANKNIFTY_FUT', name: 'BANKNIFTY FUT' },
];

export const optNiftyOrderSymbols = [
  { id: 'NIFTY_OPT_ATM_+_0', name: 'Nifty Opt ATM + 0' },
  { id: 'NIFTY_OPT_ATM_+_50', name: 'Nifty Opt ATM + 50' },
  { id: 'NIFTY_OPT_ATM_+_100', name: 'Nifty Opt ATM + 100' },
  { id: 'NIFTY_OPT_ATM_+_150', name: 'Nifty Opt ATM + 150' },
  { id: 'NIFTY_OPT_ATM_+_200', name: 'Nifty Opt ATM + 200' },
  { id: 'NIFTY_OPT_ATM_+_250', name: 'Nifty Opt ATM + 250' },
  { id: 'NIFTY_OPT_ATM_+_300', name: 'Nifty Opt ATM + 300' },
  { id: 'NIFTY_OPT_ATM_-_50', name: 'Nifty Opt ATM - 50' },
  { id: 'NIFTY_OPT_ATM_-_100', name: 'Nifty Opt ATM - 100' },
  { id: 'NIFTY_OPT_ATM_-_150', name: 'Nifty Opt ATM - 150' },
  { id: 'NIFTY_OPT_ATM_-_200', name: 'Nifty Opt ATM - 200' },
  { id: 'NIFTY_OPT_ATM_-_250', name: 'Nifty Opt ATM - 250' },
  { id: 'NIFTY_OPT_ATM_-_300', name: 'Nifty Opt ATM - 300' },
];

export const optBankNiftyOrderSymbols = [
  { id: 'BANKNIFTY_OPT_ATM_+_0', name: 'BankNifty Opt ATM + 0' },
  { id: 'BANKNIFTY_OPT_ATM_+_100', name: 'BankNifty Opt ATM + 100' },
  { id: 'BANKNIFTY_OPT_ATM_+_200', name: 'BankNifty Opt ATM + 200' },
  { id: 'BANKNIFTY_OPT_ATM_+_300', name: 'BankNifty Opt ATM + 300' },
  { id: 'BANKNIFTY_OPT_ATM_+_400', name: 'BankNifty Opt ATM + 400' },
  { id: 'BANKNIFTY_OPT_ATM_+_500', name: 'BankNifty Opt ATM + 500' },
  { id: 'BANKNIFTY_OPT_ATM_-_100', name: 'BankNifty Opt ATM - 100' },
  { id: 'BANKNIFTY_OPT_ATM_-_200', name: 'BankNifty Opt ATM - 200' },
  { id: 'BANKNIFTY_OPT_ATM_-_300', name: 'BankNifty Opt ATM - 300' },
  { id: 'BANKNIFTY_OPT_ATM_-_400', name: 'BankNifty Opt ATM - 400' },
  { id: 'BANKNIFTY_OPT_ATM_-_500', name: 'BankNifty Opt ATM - 500' },
];

export const optDataSymbol = [
  ...optNiftyOrderSymbols,
  ...optBankNiftyOrderSymbols,
];
