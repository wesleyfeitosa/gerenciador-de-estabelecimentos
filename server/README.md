# Funcionalidades do servidor de Gerenciamento de Estabelecimentos

## Segurança e autenticação

**RF**

- O usuário deve poder criar uma nova conta com login e senha;
- O usuário deve poder logar com e-mail e senha;

**RNF**

- Utilizar tokens JWT para a autenticação;

**RN**

- depois de autenticado a sessão deve ser encerrado depois de 8h;
- O usuário precisa confirmar a senha na criação de uma nova conta;

## CRUD de estabelecimentos

**RF**

- O usuário deve poder criar novos estabelecimentos;
- O usuário deve poder inserir todas as informações de um estabelecimento: nome, localidade e contato;

**RNF**

- Utilizar Axios como cliente de requisições;

**RN**

- Deve haver a possibilidade de inserção, atualização, listagem e remoção de estabelecimentos;

## Busca de estabelecimentos por localização

**RF**

- O usuário deve poder pesquisar um estabelecimento pela sua cidade, estado, bairro e rua

**RNF**

- O input de pesquisa deve usar debounce para enviar as requisições de pesquisa;

**RN**

- Se nenhum resultado for recuperado da pesquisa deve haver um aviso para o usu[ario de que nada foi encontrado]

