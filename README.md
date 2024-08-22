<!-- prettier-ignore-start -->
# Open Social Care - Protótipo MVP

O MVP Open Social Care é um projeto desenvolvido para a disciplina de Sistemas ditribuídos da Graduação em Sistemas para Internet da UTFPR - Guarapuava. Pensando em uma melhoria para o dia a dia de trabalho de assistente social, o sistema foi pensado para auxiliar o cadastro de sujeitos e atendimentos realizados.

## Ambiente de desenvolvimento e ferramentas

Este sistema foi desenvolvido de modo a não exigir um servidor de Backend, sendo toda a sua infraestrutura focada em nuvem. As principais tecnologias utilizadas foram Firebase e React.JS, com o seguinte detalhamento:

- Node.js: https://nodejs.org/en (Versão 18.14.2 LTS)
- [Create React App](https://github.com/facebook/create-react-app)
- [Mantine UI](https://v6.mantine.dev/)
- [Firebase](https://firebase.google.com/?hl=pt-br)
- Testado em Pop OS 22.04 LTS

## Executando o projeto em ambiente de desenvolvimento

1. Clone o projeto:

    - `$ git clone git@github.com:andresjesse/sd-mvp-social-care.git`

2. Crie um projeto no firebase e copie as credenciais:

    - Acesse [https://console.firebase.google.com/](https://console.firebase.google.com/)
    - Crie um novo projeto, a adição do Google Analytics é opcional visto que este recurso não é utilizado no projeto
    - Ao finalizar a criação do projeto, adicione um App Web e registre-o (o nome do App pode ser de sua preferência)
    - Nas configurações do App, procure pelas credenciais de conexão, copie o conteúdo do objeto `firebaseConfig`

3. Adicione as credenciais ao projeto clonado no passo 1:

    - Abra o projeto em um editor de sua preferência, como o VSCode
    - Crie o arquivo `src/config/firebaseConfig.ts`
    - Cole o conteúdo das credenciais no arquivo recém criado, existe um modelo nesta mesma pasta com o nome de `firebaseConfig.example.ts`

4. Ative os serviços necessários no firebase:

    - Acesse [https://console.firebase.google.com/](https://console.firebase.google.com/)
    - No painel lateral, na aba "Criação", inicialize os seguintes serviços: 
      - Auth, com o provedor nativo "Email/Senha" (Link do e-mail (login sem senha) não é necessário). Dica: na Aba "Users" você pode aproveitar e criar um usuário logo após a ativação deste serviço
      - Cloud Firestore: crie um banco de dados, escolha o datacenter mais próximo da sua localidade
      - Storage: configure o cloud storage (use as definições padrão)

    - As regras do Cloud Firestore precisam ser configuradas antes do uso, acesse a aba "Firestore Database" e procure por "Regras". Altere as regras de acesso para o seguinte:
      ```js
      rules_version = '2';

      service cloud.firestore {
        match /databases/{database}/documents {
          match /{document=**} {
            allow read, write: if request.auth != null;
          }
        }
      }
      ```

    - Faça o mesmo atualizando as regras do serviço Storage:

      ```js
      rules_version = '2';

      service firebase.storage {
        match /b/{bucket}/o {
          match /{allPaths=**} {
            allow read, write: if request.auth != null;
          }
        }
      }
      ```

5. Instale as dependências:

    - Na pasta do projeto, abra um terminal e execute: `$ yarn`

6. Execute o servidor:

    - `$ yarn start`
    - Acesse: [http://localhost:3000](http://localhost:3000)

7. Referências adicionais para estudo e resolução de problemas:

    - https://firebase.google.com/docs/web/setup?hl=pt-br


## Criando uma cópia do projeto para desenvolvimento próprio

Este processo visa fazer upload do projeto em um novo repositório git (na sua conta, por exemplo), desta forma permitindo que você realize alterações e o deploy da sua própria cópia do sistema. É necessário ter uma conta no github para prosseguir. Note que este processo configurará um workflow de deploy automatizado usando github actions e um projeto (novo) do firebase. Recomenda-se conhecimento prévio em github actions para execução destes procedimentos.

Nota: outras formas de deploy podem ser implementadas de maneira mais simples. Este projeto conta com um script `yarn build` que gerará uma versão de produção do software localmente (na pasta `build`). Qualquer serviço de hospedagem compatível com React.js pode ser usado para servir a aplicação.

1. Acesse o github do projeto [https://github.com/andresjesse/sd-mvp-social-care](https://github.com/andresjesse/sd-mvp-social-care), e crie um Fork para a sua própria conta

2. Repita as ações do guia anterior: 

    1. Clone o projeto (usando a url do seu fork)
    2. Crie um projeto no firebase e copie as credenciais (esta será a versão de produção do sistema)
    3. Adicione as credenciais ao projeto clonado no passo 1
    4. Ative os serviços necessários no firebase
    5. Instale as dependências


3. Acesse as configurações do seu projeto no github (o fork), procure por "Secrets and Variables", e adicione o conteúdo do seu `firebaseConfig.ts` como um "Secret" chamado "FIREBASE_CONFIG"

4. Acesse as configurações do seu projeto no github (o fork), procure por Settings >> Actions >> General, depois role a página até Workflow permissions e ative a opção "Read and Write permissions"

5. Instale a CLI do firebase seguindo o guia oficial: https://firebase.google.com/docs/cli 

    - Nota: este tutorial foi testado usando a CLI instalada via npm: `npm install -g firebase-tools`

6. Faça login no firebase usando a CLI: `firebase login`

7. Inicialize o serviço hosting usando a CLI. Um log das opções usadas neste tutorial é apresentado a seguir, você pode usar as mesmas respostas para configurar o seu deploy: 

    Usando o `projectId` do seu `firebaseConfig.ts`, execute: `firebase init hosting --project seuProjectIdAqui`

    Siga os passos da CLI usando as seguintes respostas: 
    
    ```
    ? Do you want to use a web framework? (experimental) No
    ? What do you want to use as your public directory? build
    ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
    ? Set up automatic builds and deploys with GitHub? Yes
    ? For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository) seu_repositorio_git_aqui
    ? Set up the workflow to run a build script before every deploy? No
    ? Set up automatic deployment to your site's live channel when a PR is merged? No
    ```

8. Atualize o workflow de deploy:

    - Abra o arquivo `.github/workflows/cd-firebase.yml`
    - Atualize a variável `firebaseServiceAccount`. Você deve acessar os Secrets do seu projeto no github e procurar por uma chave com este formato: `FIREBASE_SERVICE_ACCOUNT_SEU_PROJETO_AQUI`
    - Atualize a variável `projectId` de acordo com o seu `firebaseConfig.ts`
    - Salve o arquivo, realize algum commit e push para testar a Action de deploy no github actions.

9. Acesse o console do firebase, em seguida abra a Aba "hosting" para conferir a url onde os deploys do seu projeto foram feitos. A action `cd-firebase` é configurada para realizar um novo deploy a cada vez que atualizações chegam ao branch main, portanto, é sugerido o seguinte fluxo de trabalho:

    - Criar um novo branch para as features a serem desevolvidas
    - Criar uma Pull Request quando a feature estiver pronta
    - Realizar o merge do branch da feature no branch main
    - Inspecionar os logs do github actions para detectar falhas

## Testes

Este repositório conta com exemplos de testes End-to-End configurados com a biblioteca playwright. Veja a pasta `tests/e2e/` para detalhes. **Atenção**: o workflow de testes foi configurado para execução apenas em localhost e deve, idealmente, usar um projeto do firebase exclusivo para testes, conforme sugere a documentação [testing/staging database connection](https://playwright.dev/docs/best-practices#testing-with-a-database). **Não execute o pipeline de testes com o `firebaseConfig.ts` de desenvolvimento ou de produção!**. O workflow de testes também não foi integrado ao github actions.

Para executar os testes:

    - Crie um projeto novo no firebase, use-o exclusivamente para o ambiente de testes
    - Substitua o `firebaseConfig.ts` com as informações do ambiente de testes
    - Execute: `yarn test`

Ideia para o futuro: fazer com o `firebaseConfig.ts` carregue as credenciais de variáveis de ambiente, assim seria possível criar um `.env` para desenvolvimento e outro para testes, facilitando o processo.

Nota: a aplicação foi criada usando o template CRA (Create-React-App), portanto possui pré-configurado o ambiente de testes com Jest. Este ambiente de testes não foi utilizado (por enquanto), todavia, você pode implementar testes unitários com Jest e executá-los com o comando `yarn test-default`. Para mais detalhes de como os testes são executados, veja o bloco `scripts` no arquivo `package.json`.


<!-- prettier-ignore-end -->
