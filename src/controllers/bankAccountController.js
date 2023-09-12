const { contas } = require("../db/bancodedados");
const { checkExistingBankAccount } = require('../middlewares')

const getBankAccounts = (req, res) => {
  return res.status(200).json(contas);
};

const createBankAccount = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json({ message: "O nome é obrigatório!" });
  }

  if (!cpf) {
    return res.status(400).json({ message: "O cpf é obrigatório!" });
  }

  if (!data_nascimento) {
    return res
      .status(400)
      .json({ message: "A data_nascimento é obrigatória!" });
  }

  if (!telefone) {
    return res.status(400).json({ message: "O telefone é obrigatório!" });
  }

  if (!email) {
    return res.status(400).json({ message: "O email é obrigatório!" });
  }

  if (!senha) {
    return res.status(400).json({ message: "A senha é obrigatória!" });
  }

  const existingCpfOrEmail = contas.findIndex(
    (conta) => conta.usuario.cpf === cpf || conta.usuario.email === email
  );

  if (existingCpfOrEmail !== -1) {
    return res
      .status(400)
      .json({ message: "Já existe uma conta com o cpf ou e-mail informado!" });
  }

  const bankAccount = {
    numero: String(contas.length + 1),
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  contas.push(bankAccount);

  return res.status(201).send();
};

const restoreBankAccount = (req, res) => {
  const { numeroConta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json({ message: "O nome é obrigatório!" });
  }

  if (!cpf) {
    return res.status(400).json({ message: "O cpf é obrigatório!" });
  }

  if (!data_nascimento) {
    return res
      .status(400)
      .json({ message: "A data_nascimento é obrigatória!" });
  }

  if (!telefone) {
    return res.status(400).json({ message: "O telefone é obrigatório!" });
  }

  if (!email) {
    return res.status(400).json({ message: "O email é obrigatório!" });
  }

  if (!senha) {
    return res.status(400).json({ message: "A senha é obrigatória!" });
  }

  const existingBankAccount = checkExistingBankAccount(numeroConta);

  if (existingBankAccount === -1) {
    return res
      .status(404)
      .json({ message: "Não existe nenhuma conta com o número informado!" });
  }

  const existingCpf = contas.findIndex((conta) => conta.usuario.cpf === cpf);

  const existingEmail = contas.findIndex(
    (conta) => conta.usuario.email === email
  );

  if (existingCpf !== existingBankAccount && existingCpf !== -1) {
    return res
      .status(400)
      .json({ message: "O CPF informado já existe cadastrado!" });
  }

  if (existingEmail !== existingBankAccount && existingEmail !== -1) {
    return res
      .status(400)
      .json({ message: "O e-mail informado já existe cadastrado!" });
  }

  const newBankAccount = {
    numero: numeroConta,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  contas.splice(existingBankAccount, 1, newBankAccount);

  return res.status(204).send();
};

const deleteBankAccount = (req, res) => {
  const { numeroConta } = req.params;

  const existingBankAccount = checkExistingBankAccount(numeroConta);

  if (existingBankAccount === -1) {
    return res
      .status(404)
      .json({ message: "Não existe nenhuma conta com o número informado!" });
  }

  if (contas[existingBankAccount].saldo > 0) {
    return res
      .status(400)
      .json({ message: "A conta só pode ser removida se o saldo for zero!" });
  }

  contas.splice(existingBankAccount, 1);

  return res.status(204).send();
};

const getAccountBalance = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta) {
    return res.status(400).json({ message: "O numero_conta é obrigatório!" });
  }

  if (!senha) {
    return res.status(400).json({ message: "A senha é obrigatória!" });
  }

  const existingBankAccount = checkExistingBankAccount(numero_conta)

  if (existingBankAccount === -1) {
    return res
      .status(404)
      .json({ message: "Não existe nenhuma conta com o número informado!" });
  }

  if (String(senha) !== contas[existingBankAccount].usuario.senha) {
    return res.status(401).json({ message: "A senha informada é inválida!" });
  }

  return res.status(200).json({
    saldo: contas[existingBankAccount].saldo,
  });
};

module.exports = {
  getBankAccounts,
  createBankAccount,
  restoreBankAccount,
  deleteBankAccount,
  getAccountBalance,
};
