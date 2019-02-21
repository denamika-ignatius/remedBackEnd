const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var app = express();
const port = process.env.port || 1997;

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'ignatius',
    password: 'fernando08',
    database: 'hotelbertasbih',
    port: 3306
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send("<h1>API running! Congrats!</h1>");        
})

// ---------------------------- get user -------------------------------
app.get('/getuserlist', (req,res) => {
    
    var sql = `SELECT * FROM tableuser`;

    conn.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    })

})

// --------------------------------- add(register) USER -----------------------

app.post('/adduser', (req,res) => {
    var addUser = req.body
    var sql = `insert into tableuser set ? `;
   conn.query(sql, addUser, (err, result) => {
    if(err) throw err;
    res.send(result);
    console.log(result);
    })
})

// ------------------------------- SignIn User -----------------------------

app.get('/signin/:username/:password',(req,res)=>{
    var sql = `select * from tableuser where 
    username = ${req.params.username} && password = ${req.params.password}`
    conn.query(sql, (err,result)=>{
        if(err) throw err
        res.send('Anda berhasil Masuk')
    }) 
})

// -------------------------------- get kamar by Nama Category ------------- 
app.post('/getkamarlist',(req,res) => {
    /*var sql = `select tk.id as Id, tk.nomorkamar as nomor kamar,
    tk.categoryid as id category, tk.harga as harga, 
    tc.id ,tc.namacategory as nama category  
    from tablekamar tk join tablecategory tc on tk.categoryid = tc.id
    where tc.namacategory = ${req.params.namacategory}`*/
    
    var sql = `SELECT * FROM tablekamar`;

    conn.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    })
})

// -------------------------------- add Kamar -------------------------
app.post('/addkamar', (req,res) => {
    var addkamar = req.body
    var sql = `insert into tablekamar set ? `;
   conn.query(sql, addkamar, (err, result) => {
    if(err) throw err;
    res.send(result);
    })
})

// -------------------------------- edit Kamar -------------------------
app.put('/editkamar/:id',(req,res)=>{
    var edit = req.body
    var sql = `update tablekamar set ? where id=${req.params.id}`;
    conn.query(sql, edit, (err, result) => {
        if(err) throw err;
        res.send(result);
        })
})

// -------------------------------- Delete Kamar ------------------------
app.delete('/deletekamar/:id',(req,res)=>{
    var sql = `delete from tablekamar where id =${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
    })
})

// -------------------------------- Get Category ------------------------
app.get('/getcategorylist', (req,res) => {
    
    var sql = `SELECT * FROM tablecategory`;

    conn.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    })

})

// -------------------------------- add Category -------------------------
app.post('/addcategory', (req,res) => {
    var addCategory = req.body
    var sql = `insert into tablecategory set ? `;
   conn.query(sql, addCategory, (err, result) => {
    if(err) throw err;
    res.send(result);
    })
})

// -------------------------------- edit Category -------------------------
app.put('/editcategory/:id',(req,res)=>{
    var edit = req.body
    var sql = `update tablecategory set ? where id=${req.params.id}`;
    conn.query(sql, edit, (err, result) => {
        if(err) throw err;
        res.send(result);
        })
})

// -------------------------------- Delete Category ------------------------
app.delete('/deletecategory/:id',(req,res)=>{
    var sql = `delete from tablecategory where id =${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
    })
})

app.listen(port, () => console.log('API Aktif di port ' + port))