<!-- prettier-ignore-start -->
# Projeto MVP Social Care

O MVP Social Care é um projeto desenvolvido para a disciplina de Sistemas ditribuídos da Graduação em Sistemas para Internet da UTFPR - Guarapuava. Pensando em uma melhoria para o dia a dia de trabalho de assistente social, o sistema foi pensado para auxiliar o cadastro de sujeitos e atendimentos realizados.

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

Este processo visa fazer upload do projeto no seu próprio repositório, desta forma permitindo que você realize alterações e o deploy da sua própria cópia do sistema. É necessário ter uma conta no github para prosseguir.

1. Acesse o github do projeto [https://github.com/andresjesse/sd-mvp-social-care](https://github.com/andresjesse/sd-mvp-social-care), e crie um Fork para a sua própria conta


2. Acesse as configurações do seu projeto no github (o fork), procure por "Secrets and Variables", e adicione o conteúdo do seu `firebaseConfig.ts` como um "Secret" chamado "FIREBASE_CONFIG"

3. Acesse as configurações do seu projeto no github (o fork), procure por Settings >> Actions >> General, depois role a página até Workflow permissions e ative a opção "enable Read and Write permissions"

>>>>>>>>>>>>>>> Daqui pra frente não foi testado!

4. Crie uma chave de conta de serviço para o seu projeto firebase, siga os passos do tutorial oficial: https://cloud.google.com/iam/docs/keys-create-delete?hl=pt-br 

5. Ao finalizar a criação da chave da conta de serviço, você receberá um arquivo JSON, copie o seu conteúdo e crie um novo Secret no github (similar ao passo 2) chamado "FIREBASE_SERVICE_ACCOUNT_SD_MVP_SOCIAL_CARE"


## Setup Deploy

**Install Firebase CLI**

Firebase CLI can be installed globally or used as a standalone binary (your choice). Follow official guide: https://firebase.google.com/docs/cli

Execute: `firebase login`

**Setup Firebase Hosting**

Execute: `firebase init hosting`

- ❯ Use an existing project
- ❯ sd-mvp-social-care (sd-mvp-social-care)
- ? What do you want to use as your public directory? build
- ? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) y
- ? Set up automatic builds and deploys with GitHub? (y/N) y
- ? For which GitHub repository would you like to set up a GitHub workflow? (format:
  user/repository) (andresjesse/sd-mvp-social-care)
- ? Set up the workflow to run a build script before every deploy? Yes
- ? What script should be run before every deploy? yarn install --frozen-lockfile && yarn build
- ? Set up automatic deployment to your site's live channel when a PR is merged? (Y/n) Y
- ? What is the name of the GitHub branch associated with your site's live channel? main

Previous process will generate configs for firebase deploy and two github workflows: `firebase-hosting-merge.yml` and `firebase-hosting-pull-request.yml`. For this project we decided to merge them into the following workflow (`cd-firebase.yml`):

```
name: Deploy to Firebase Hosting
# "on": pull_request
"on":
  push:
    branches:
      - main
jobs:
  build_and_deploy:
    name: "Build and Deploy to Firebase Hosting"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Write firebaseConfig
        env:
          MY_VAL: ${{ secrets.FIREBASE_CONFIG }}
        run: |
          import os
          data = open("src/config/firebaseConfig.ts", "w")
          for q in (os.getenv("MY_VAL")):
            data.write(q)
        shell: python
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      - name: Lint
        run: yarn lint
      - name: Build
        run: yarn build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT_SD_MVP_SOCIAL_CARE }}"
          channelId: live
          projectId: sd-mvp-social-care
```

**Setup github permissions for workflow**:

From your repository: Settings >> Actions >> General, scroll down to Workflow permissions >> enable Read and Write permissions.

**Setup FIREBASE_CONFIG secret**:

Open your repository Settings >> Secrets and Variables >> Actions >> Tab Secrets.

Add the content of `src/config/firebaseConfig` as a secret named `FIREBASE_CONFIG`.

<!-- prettier-ignore-end -->
