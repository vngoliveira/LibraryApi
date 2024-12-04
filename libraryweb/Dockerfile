# Usando uma imagem oficial do Node.js como base
FROM node:20

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências do projeto para o diretório de trabalho no container
COPY package.json package-lock.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código da aplicação para o container
COPY . .

# Expor a porta em que a API vai rodar 
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["npm", "start"]
