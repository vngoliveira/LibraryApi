# Etapa 1: Usando uma imagem oficial do Node.js como base
FROM node:20

# Etapa 2: Criar um diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Etapa 3: Copiar os arquivos de dependências do projeto (package.json e package-lock.json) para o container
COPY package.json package-lock.json ./

# Etapa 4: Instalar as dependências do projeto
RUN npm install

# Etapa 5: Copiar o código da aplicação para dentro do container
COPY . .

# Etapa 6: Expor a porta que a API vai rodar
EXPOSE 3000

# Etapa 7: Definir o comando para rodar a aplicação
CMD ["node", "app.js"]
