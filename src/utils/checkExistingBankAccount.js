const { contas } = require("../db/bancodedados");

const checkExistingBankAccount = (accountNumber) => {
  return contas.findIndex((conta) => conta.numero === String(accountNumber));
};

module.exports = { checkExistingBankAccount };
