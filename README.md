
# API Bancária Cubos Academy

O desafio consiste em desenvolver uma API REST para um Banco Digital. Essa API deve permitir a realização de múltiplas operações bancárias, como: criação de contas, depósitos, saques, transferências, consulta de saldo e emissão de extratos.


## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- **[Git](https://git-scm.com/doc)**
- **[Node.js](https://nodejs.org/en)**
- **[Express](https://expressjs.com/pt-br/)**
- **[date-fns](https://date-fns.org/)**


## ⚠️ Dependências

Antes de começar, você deve ter as seguintes ferramentas instaladas na sua máquina: [Git] ([https://git-scm.com](https://git-scm.com/)), [Node.js] ([https://nodejs.org/en/](https://nodejs.org/en/)). Como complemento, é bom tem um editor de código como o [VSCode] ([https://code.visualstudio.com/](https://code.visualstudio.com/))



## 📥 Installation and usage

```bash
# Clone este repositório

$  git  clone  https://github.com/pmagalhaes2/api-banco.git


# Acesse a pasta do projeto pelo terminal

$  cd api-banco


# Instale as dependências

$  npm  install


# Rode a aplicação no modo de desenvolvimento

$  npm run dev

```

## 📖 Documentação da API

### Listagem contas bancárias

O endpoint de listagem de contas bancárias deve fornecer a senha de autenticação do banco (`senha_banco`) como parâmetro de consulta, conforme abaixo:

| Parâmetro | Tipo | Descrição| Valor
| ------------ | ------------------------- |------------ | ----- |
| `senha_banco`  | `string` | Responsável por armazenar a senha de autenticação do banco | Cubos123Bank

    GET /contas?senha_banco=Cubos123Bank

Retorna a listagem com todas as contas bancárias cadastradas.

##### Endpoint:

    http://localhost:3000/contas

### Criação de conta bancária

    POST /contas

Cria uma nova conta bancária com base nos dados descritos abaixo recebidos no body da requisição.

##### Endpoint:

    http://localhost:3000/contas


##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do cliente |
|  `cpf` |  `string`|  Responsável por armazenar o cadastro de pessoa física (CPF) do cliente |
|  `data_nascimento` |  `string`|  Responsável por armazenar a data de nascimento do cliente |
|  `telefone` |  `string`| Responsável por armazenar o telefone do cliente |
|  `email` | `string`| Responsável por armazenar o e-mail do cliente  |
|  `senha` | `string`| Responsável por armazenar a senha do cliente  |


---

### Atualização de conta bancária

    PUT /contas/:numeroConta/usuario

Altera uma conta bancária baseada no parâmetro de requisição `numeroConta`  e no corpo da requisição

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `numeroConta`  | `string` | Responsável por armazenar o número da conta do cliente |

##### Endpoint:

    http://localhost:3000/contas/:numeroConta/usuario

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do cliente |
|  `cpf` |  `string`|  Responsável por armazenar o cadastro de pessoa física (CPF) do cliente |
|  `data_nascimento` |  `string`|  Responsável por armazenar a data de nascimento do cliente |
|  `telefone` |  `string`| Responsável por armazenar o telefone do cliente |
|  `email` | `string`| Responsável por armazenar o e-mail do cliente  |
|  `senha` | `string`| Responsável por armazenar a senha do cliente  |


---

### Deleção de conta bancária

    DELETE /contas/:numeroConta

Exclui uma conta bancária com baseada no `numeroConta` recebido como parâmetro de requisição

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `numeroConta`  | `string` | Responsável por armazenar o número da conta do cliente |


##### Endpoint:

    http://localhost:3000/contas/:numeroConta

---

### Depósito em conta bancária

    POST /transacoes/depositar

Realiza depósito em conta bancária de acordo com os parâmetros `numero_conta` e `valor` recebidos no corpo da requisição


##### Endpoint:

    http://localhost:3000/transacoes/depositar
    
##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `numero_conta`  | `string` | Responsável por armazenar o número da conta do cliente  |
|  `valor` |  `number`|  Responsável por armazenar o valor a ser depositado para o cliente |

--- 

### Saque em conta bancária

    POST /transacoes/sacar

Realiza depósito em conta bancária de acordo com os parâmetros `numero_conta`,  `valor` e `senha` recebidos no corpo da requisição


##### Endpoint:

    http://localhost:3000/transacoes/sacar
    
##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `numero_conta`  | `string` | Responsável por armazenar o número da conta do cliente  |
|  `valor` |  `number`|  Responsável por armazenar o valor a ser depositado para o cliente |
|  `senha` |  `string`|  Responsável por armazenar a senha do cliente  |

--- 

### Transferência entre contas bancárias 

    POST /transacoes/transferir

Realiza depósito em conta bancária de acordo com os parâmetros `numero_conta_origem`, `numero_conta_destino`,  `valor` e `senha` recebidos no corpo da requisição


##### Endpoint:

    http://localhost:3000/transacoes/transferir
    
##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `numero_conta_origem`  | `string` | Responsável por armazenar o número da conta de origem  |
| `numero_conta_destino`  | `string` | Responsável por armazenar o número da conta de destino
|  `valor` |  `number`|  Responsável por armazenar o valor a ser transferido para o cliente |
|  `senha` |  `string`|  Responsável por armazenar a senha do cliente de origem  |

---

###  Saldo de conta bancária

    GET /contas/saldo

Retorna o saldo de uma conta bancária de acordo com os parâmetros de consulta `numero_conta` e `senha`

| Parâmetro | Tipo | Descrição| 
| ------------ | ------------------------- |------------ |
| `numero_conta`  | `string` |  Responsável por armazenar o número da conta do cliente 
|  `senha` |  `string`|  Responsável por armazenar a senha do cliente  |


##### Endpoint:

    http://localhost:3000/contas/saldo
  
  ---

###  Extrato de conta bancária

    GET /contas/extrato

Retorna o extrato de uma conta bancária de acordo com os parâmetros de consulta `numero_conta` e `senha`

| Parâmetro | Tipo | Descrição| 
| ------------ | ------------------------- |------------ |
| `numero_conta`  | `string` |  Responsável por armazenar o número da conta do cliente 
|  `senha` |  `string`|  Responsável por armazenar a senha do cliente  |


##### Endpoint:

    http://localhost:3000/contas/extrato
---

Feito por Patricia Magalhães 💙