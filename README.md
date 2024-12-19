# PetSync - Sistema de Gerenciamento para Petshops

PetSync é um sistema web full stack simples desenvolvido para gerenciar petshops. O sistema está dividido entre o frontend, desenvolvido em React e utilizando o Vite, e o backend, desenvolvido em Node.js, que está em um repositório privado. O banco de dados utilizado é o PostgreSQL, hospedado na Supabase.

## Telas do Sistema

O sistema possui as seguintes telas:

1. **Tela de Login**: Realiza a verificação de usuários e níveis de acesso, garantindo que usuários com acesso de admnistrador, acessem a tela de gerenciamento de usuário.
2. **Tela de Dashboard**: Exibe informações gerais sobre o petshop, como número de clientes, animais e usuários cadastrados e os agendamentos cadastrados, podendo alterar o status e filtrar pelo mesmo.
3. **CRUD de Clientes**: Permite a adição, edição, visualização e exclusão de informações sobre os clientes do petshop.
4. **CRUD de Animais**: Permite a gestão de animais cadastrados, incluindo dados como espécie, nome, dono, entre outros, contendo adição, edição, visualização e exclusão.
5. **CRUD de Usuários**: Facilita a administração dos usuários que têm acesso ao sistema, permitindo adicionar, editar ou excluir usuários, determinando seu nível de acesso de admnistrador ou funcionário.

## Tecnologias Utilizadas

- **Frontend**: React, Vite
- **Backend**: Node.js (em outro repositório privado)
- **Banco de Dados**: PostgreSQL (hospedado na Supabase)

## Como Rodar Apenas o Frontend (o sistema nã irá funcionar corretamente devido a falta do backend)

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm

### Passos para Rodar o Projeto Localmente

1. **Clone o repositório do frontend**:

   ```bash
   git clone https://github.com/Arthu085/PetSync
   cd PetSync

   ```

2. **Instale as dependências**:

   ```bash
   npm install

   ```

3. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```
