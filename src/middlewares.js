const { banco, contas } = require("./db/bancodedados");

const validatePassword = (req, res, next) => {
  const { senha_banco } = req.query;

  if (senha_banco !== banco.senha) {
    return res.status(401).json({
      mensagem: "A senha do banco informada é inválida!",
    });
  }

  next();
};

const checkExistingBankAccount = (accountNumber) => {
  return contas.findIndex((conta) => conta.numero === String(accountNumber));
};

module.exports = { validatePassword, checkExistingBankAccount };
