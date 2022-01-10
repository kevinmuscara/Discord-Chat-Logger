const database = require('./')

database.connect({
  host: '127.0.0.1',
  port: 5520,
  user: 'postgres',
  password: 'e550pinxwt'
});

(async() => {
  database.doesTableExist('guilds').then(res => {
    if(res) {
      database.insertData(`guilds`, 'guild_name, guild_id, verified, partnered', `'your mom', '1234', 'true', 'false'`).then(insertRes => {
        if(insertRes.status === 200) {
          database.findData('guilds').then(response => console.log(response.rows))
        } else {
          console.log('failed to insert data')
        }
      })
    } else {
      database.createTable('guilds', `guild_name text NOT NULL, guild_id text NOT NULL, verified text NOT NULL, partnered text NOT NULL`).then(createRes => {
        if(createRes.status === 200) {
          database.insertData(`guilds`, 'guild_name, guild_id, verified, partnered', `'your mom', '1234', 'true', 'false'`).then(insertRes => {
            if(insertRes.status === 200) {
              database.findData('guilds').then(response => console.log(response.rows))
            } else {
              console.log('failed to insert data')
            }
          })
        } else {
          console.log('failed to create table')
        }
      })
    }
  })
})()