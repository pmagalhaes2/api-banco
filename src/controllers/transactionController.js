const {
  contas,
  saques,
  depositos,
  transferencias,
} = require("../db/bancodedados");

const { checkExistingBankAccount } = require('../middlewares')

const { formatISO9075 } = require("date-fns");

const createDeposit = (req, res) => {
  const { numero_conta, valor } = req.body;

  if (existingBankAccount === -1) {
    return res
      .status(404)
      .json({ message: "Não existe nenhuma conta com o número informado!" });
  }

  if (!numero_conta) {
    return res.status(400).json({ message: "O numero_conta é obrigatório!" });
  }

  if (!valor) {
    return res.status(400).json({ message: "O valor é obrigatório!" });
  }

  if (valor <= 0) {
    return res
      .status(400)
      .json({ message: "O valor deve ser maior que zero!" });
  }

  const existingBankAccount = checkExistingBankAccount(numero_conta);

  const newDeposit = {
    data: formatISO9075(new Date()),
    numero_conta: String(numero_conta),
    valor,
  };

  depositos.push(newDeposit);

  contas[existingBankAccount].saldo += valor;

  return res.status(201).send();
};

const createWithdraw = (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  if (!numero_conta) {
    return res.status(400).json({ message: "O numero_conta é obrigatório!" });
  }

  if (!valor) {
    return res.status(400).json({ message: "O valor é obrigatório!" });
  }

  if (valor <= 0) {
    return res
      .status(400)
      .json({ message: "O valor deve ser maior que zero!" });
  }

  if (!senha) {
    return res.status(400).json({ message: "A senha é obrigatória!" });
  }

  const existingBankAccount = checkExistingBankAccount(numero_conta);

  if (existingBankAccount === -1) {
    return res
      .status(404)
      .json({ message: "Não existe nenhuma conta com o número informado!" });
  }

  if (String(senha) !== contas[existingBankAccount].usuario.senha) {
    return res.status(401).json({ message: "A senha é obrigatória!" });
  }

  if (contas[existingBankAccount].saldo < valor) {
    return res.status(400).json({
      message: `O valor excede o saldo da conta: R$ ${contas[existingBankAccount].saldo}`,
    });
  }

  saques.push({
    data: formatISO9075(new Date()),
    numero_conta: String(numero_conta),
    valor,
  });

  contas[existingBankAccount].saldo -= valor;

  return res.status(201).send();
};

const createBankTransfer = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_origem) {
    return res
      .status(400)
      .json({ message: "O numero_conta_origem é obrigatório!" });
  }

  if (!numero_conta_destino) {
    return res
      .status(400)
      .json({ message: "O numero_conta_destino é obrigatório!" });
  }

  if (!senha) {
    return res.status(400).json({ message: "A senha é obrigatória!" });
  }

  if (!valor) {
    return res.status(400).json({ message: "O valor é obrigatório!" });
  }

  if (String(numero_conta_origem) === String(numero_conta_destino)) {
    return res.status(400).json({
      message:
        "O numero_conta_origem e numero_conta_destino devem ser diferentes!",
    });
  }

  const existingDestinationAccount =
    checkExistingBankAccount(numero_conta_destino);

  if (existingDestinationAccount === -1) {
    return res.status(404).json({
      message: `Não existe nenhuma conta com o número ${numero_conta_destino}!`,
    });
  }

  const existingSourceAccount = checkExistingBankAccount(numero_conta_origem);

  if (existingSourceAccount === -1) {
    return res.status(404).json({
      message: `Não existe nenhuma conta com o número ${numero_conta_origem}!`,
    });
  }

  if (String(senha) !== contas[existingSourceAccount].usuario.senha) {
    return res.status(400).json({ message: "A senha informada é inválida!" });
  }

  if (contas[existingSourceAccount].saldo < valor) {
    return res.status(400).json({
      message: `O valor excede o saldo da conta: R$ ${contas[existingSourceAccount].saldo}`,
    });
  }

  contas[existingSourceAccount].saldo -= valor;
  contas[existingDestinationAccount].saldo += valor;

  transferencias.push({
    data: formatISO9075(new Date()),
    numero_conta_origem: String(numero_conta_origem),
    numero_conta_destino: String(numero_conta_destino),
    valor,
  });

  return res.status(201).send();
};

const getAccountStatement = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta) {
    return res.status(400).json({ message: "O numero_conta é obrigatório!" });
  }

  if (!senha) {
    return res.status(400).json({ message: "A senha é obrigatória!" });
  }

  const existingBankAccount = checkExistingBankAccount(numero_conta);

  if (existingBankAccount === -1) {
    return res
      .status(404)
      .json({ message: "Não existe nenhuma conta com o número informado!" });
  }

  if (String(senha) !== contas[existingBankAccount].usuario.senha) {
    return res.status(400).json({ message: "A senha informada é inválida!" });
  }

  const deposits = depositos.filter(
    (deposito) => deposito.numero_conta === String(numero_conta)
  );

  const withdraws = saques.filter(
    (saque) => saque.numero_conta === String(numero_conta)
  );

  const sentTransfers = transferencias.filter(
    (transferencia) =>
      transferencia.numero_conta_origem === String(numero_conta)
  );

  const incomingTranfers = transferencias.filter(
    (transferencia) =>
      transferencia.numero_conta_destino === String(numero_conta)
  );

  const statement = {
    depositos: deposits,
    saques: withdraws,
    transferenciaEnviadas: sentTransfers,
    transferenciasRecebidas: incomingTranfers,
  };

  return res.status(200).json(statement);
};

module.exports = {
  createDeposit,
  createWithdraw,
  createBankTransfer,
  getAccountStatement,
};
