const sqlite = require('sqlite3').verbose()
let sql;
const morgan = require('morgan')
const express = require('express')
const app = express()
app.set('view engine', 'ejs')

// Connect to DB
const db = new sqlite.Database('./test.db', sqlite.OPEN_READWRITE, err => { 
  if (err) return console.error(err.message) 
  else console.log('Conectado ao banco de dados')
})

// Create table
sql = `CREATE TABLE Clientes(
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL,
  aniversario TEXT NOT NULL,
  email TEXT NOT NULL
) STRICT`
db.run(sql, err => {
  if (err) return console.error(err.message)
  else console.log('Tabela criada')
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use((req, res) => { res
  .status(404)
  .render('404', { title: '404 | Page not found' })
})