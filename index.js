const express = require ('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config();



const app = express()
const port = 5000;

// middleware 
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pp3lw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try{
        await client.connect()
        const database = client.db('myProject')
        const projectCollection = database.collection('projects')

        // GET API 
        app.get('/projects', async(req, res)=>{
            const cursor = projectCollection.find({})
            const projects = await cursor.toArray();
            res.send(projects)
        })

        //POST API
        app.post('/projects', async(req, res)=>{
            const project = req.body;
            console.log(project)

            console.log('hit the post api ')
            
           const result = await projectCollection.insertOne(project)
           res.json(result)

        console.log(result)
        })

        
        }
    finally{
        // await  client.close()

    }
}

run().catch(console.dir)




app.get('/', (req, res)=>{
    res.send('Running my-profile')
});


app.listen(port, ()=>{
    console.log('Running my profile on port', port )
})