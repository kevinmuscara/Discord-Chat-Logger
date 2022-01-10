const { Client } = require('pg')
let database;

module.exports = {
  connect: async(options) => {
    try {
      database = new Client(options)
      database.connect()
    } catch {}
  },

  query: async(query, params, callback) => {
    try {
      return database.query(query, params, callback)
    } catch {}
  },

  doesTableExist: async(tableName) => {
    return new Promise(async(resolve, reject) => {
      database.query(`SELECT 'public.${tableName}'::regclass`, (err, res) => {
        if(res !== undefined) {
          resolve(true)
        } else {
          resolve(false)
        }
      });
    })
  },

  createTable: async(tableName, values) => {
    return new Promise(async(resolve, reject) => {
      try {
        database.query(`CREATE TABLE ${tableName}(${values});`, (err, res) => {
          if(err) reject(err)
          else resolve({ status: 200, res})
        })
      } catch {}
    })
  },

  insertData: async(tableName, types, values) => {
    return new Promise(async(resolve, reject) => {
      try {
        database.query(`INSERT INTO ${tableName}(${types}) VALUES (${values})`, (err, res) => {
          if(err) reject(err)

          resolve({ status: 200, res })
        })
      } catch {}
    })
  },

  findData: async(tableName) => {
    return new Promise(async(resolve, reject) => {
      try {
        let result = await database.query(`SELECT * FROM ${tableName}`)
        resolve(result)
      } catch {}
    })
  }
}