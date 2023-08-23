const express = require("express");
const {
  getBankAccounts,
  createBankAccount,
  restoreBankAccount,
  deleteBankAccount,
  getAccountBalance,
} = require("./controllers/bankAccountController");
const {
  createDeposit,
  createWithdraw,
  createBankTransfer,
  getAccountStatement,
} = require("./controllers/transactionController");

const router = express();

router.get("/contas", getBankAccounts);
router.get("/contas/saldo", getAccountBalance);
router.post("/contas", createBankAccount);
router.put("/contas/:numeroConta/usuario", restoreBankAccount);
router.delete("/contas/:numeroConta", deleteBankAccount);

router.get("/contas/extrato", getAccountStatement);
router.post("/transacoes/depositar", createDeposit);
router.post("/transacoes/sacar", createWithdraw);
router.post("/transacoes/transferir", createBankTransfer);

module.exports = { router };
