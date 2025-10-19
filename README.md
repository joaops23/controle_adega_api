# Controle de adega

# passo a passo 

-> Configurar variáveis de ambiente, duplicar arquivo `.env.example` e renomar para `.env`

-> Iniciar container
```shell
docker-compose up -d --build
```

-> instalar dependências
```shell
npm i
```

-> Iniciar servidor
```
npm run start
```