# Shop-list

Sistema para cadrastras os produtos para a sua compra

# 📋 Descrição do Projeto
A proposta deste projeto é proporcionar suporte essencial para a criação de sua lista de compras e não ter que precisar lembrar de tudo.


# 🛠️ Funcionalidades 
- `Funcionalidade 1`: Login de usuario
- `Funcionalidade 2`: Apresentação em forma de tabela dos dados registrados para cada produto
- `Funcionalidade 3`: criar produto
- `Funcionalidade 4`: Ver as informações do produto
- `Funcionalidade 5`: Deletar produto

# 🎥 Demontrações
<img src="coronavirus-self-checker/public/demonstracao.png" alt="Telas de demonstrações" />

# 💻 Tecnologias
- <a href="https://inertiajs.com">InertiaJs</a>
- <a href="https://legacy.reactjs.org/docs/getting-started.html">React</a>
- <a href="https://www.typescriptlang.org/docs/">TypeScript</a>
- <a href="https://laravel.com/docs/12.x">Laravel 12</a>

# 🔧 Instalação
Vamos seguir um processo passo a passo. Começaremos pela instalação do projeto. 
É importante ter o Composer, o Node.js e o Git instalados em sua máquina para realizar essa tarefa. Certifique-se de tê-los configurados corretamente antes de prosseguir.

1. Faça um fork desse repositório para o seu perfil
```bash 
git clone https://github.com/tiagoferreira22/Shop-list.git
```
2. Acesse o repositório do projeto
```bash
cd Shop-list
```
3. Instale as dependências do back-end
```bash 
composer install
```
4. Aguarde até que as dependências sejam instaladas completamente.
5. Copie e cole o arquivo `.env.example` com um novo nome: `.env`
copie o comando:
```bash
cp .env.example .env
```
6. Atualize as variáveis do arquivo de configuração, localizado em .env, com as informações adequadas. Se você ainda não criou um banco de dados, certifique-se de criá-lo antes de editar o arquivo .env.
7. Gere uma chave para que o Laravel consiga se comunicar com o banco
```bash
php artisan key:generate
```
8. Instale as dependências do front-end
```bash
npm install
```
9. Se der algum erro, adicione --force ao final do comando
```bash 
npm install --force
```
10. Pronto para ser usado

# ✨ Como usar
1. Inicie o laravel
```bash
php artisan serve
```
2. inicie o frontend com:
```bash
npm run build
```
e depois:
```bash
npm run dev
```
3. Após concluir essas etapas, abra no navergador com o link que é dado no terminal e pronto seu computador já pode começar a trabalhar com o projeto.

🌟 Obrigado por utilizar este repositório e contribuir para o sucesso do projeto! Seu envolvimento é fundamental para o seu crescimento e aprimoramento contínuos.

Feito com ❤️ by <a href="https://github.com/tiagoferreira22">Tiago Ferriera</a>
