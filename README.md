# Server


```
nb: Make sure you already had NodeJS on your local
```
_How to Install PM2 with NPM_
```
npm install
```
___

### After the installation process was done, perhaps you have your own config for PostgreSQL database. You can set it up on config.json inside config file. Then you should create the database with:
```
sequelize db:create
```

### Then migrate the models into the database:
```
seqelize db:migrate
```

### Now you can run the application with:
```
npm run start
```