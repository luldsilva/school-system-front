# Sistemas de Gerenciamento Escolar

Aplicação web para gerenciamento de escolas e alunos, construída com Angular.  

![teste-school-system](https://github.com/user-attachments/assets/a79aaabe-71dd-40ab-ad5c-9a742bd47bc0)

## Tecnologias e práticas utilizadas
- **Angular 17** com components standalone e signals
- **TypeScript**, **RxJS** e **NgxMask** para validações de campos
- **Bootstrap 5** para layout responsivo e estilização
- **Material Design** (opcional) para alguns componentes
- **Boas práticas de desenvolvimento**: services, components, modularização e reuso
- **CRUD completo** para alunos e escolas
- **Busca e filtros** em listas
- **Paginação no backend**
- **Autenticação básica** com login fixo

## Funcionalidades
- Listar, criar, editar e excluir **alunos** e **escolas**
- Pesquisa por **nome ou CPF** (alunos) e **descrição** (escolas)
- Paginação de resultados
- Exibição da **escola associada** ao aluno
- Responsividade para **desktop e mobile**
- Logout e navegação entre telas

## Como rodar
1. Clone o repositório:  
   ```bash
   git clone https://github.com/luldsilva/school-system-front.git
2. Instale as dependências:
   ```bash
   npm install
3. Execute o projeto:
   ```bash
   ng serve
## OBS1
Para usar esse front consumindo da sua API, será necessário seguir clonar e seguir os passos da API para poder rodar em paralelo. Repositório da API: https://github.com/luldsilva/SchoolSystem
## OBS2
Para efeitos de teste e melhorar a dinâmica, as credenciais de teste estão fixas como user name: TESTE e senha: 123. 
