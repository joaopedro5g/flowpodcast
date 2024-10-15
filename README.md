---

# Flow Podcast 🎙️

Este projeto foi criado para aprender e explorar **NodeJS**, **NextJS**, **Socket.IO** e **Redis**, com a ideia de desenvolver uma plataforma de streaming de áudio. O projeto inclui um SDK feito em **JavaScript puro** com **Socket.IO** para permitir a integração com dispositivos externos. O repositório também contém um projeto demo usando **Electron** para exemplificar o uso do SDK.

## Tecnologias Utilizadas

- **NodeJS** para o backend.
- **NextJS** para o frontend.
- **Socket.IO** para comunicação em tempo real.
- **Redis** para gerenciamento de sessões.
- **JavaScript** para o SDK.
- **Electron** para o projeto demo.

## Funcionalidades

- **Streaming de Áudio**: Gerenciamento do fluxo de áudio em tempo real.
- **Frontend com NextJS**: Interface web para acessar e controlar o conteúdo.
- **SDK com Socket.IO**: Permite a integração com dispositivos de terceiros via comunicação em tempo real.
- **Demo em Electron**: Exemplo de uso do SDK.

## Como Rodar

1. Clone o repositório e instale as dependências:

   ```bash
   git https://github.com/joaopedro5g/flowpodcast
   cd flowpodcast
   ```

2. Inicie o **backend**:

   ```bash
   cd api
   yarn install
   yarn start
   ```

3. Inicie o **frontend**:

   ```bash
   cd frontend
   yarn install
   yarn dev
   ```

4. Para testar o **demo em Electron**:

   ```bash
   cd sdk
   yarn install
   yarn start
   ```

## Licença

Este projeto está sob a licença [MIT License](LICENSE).

---
