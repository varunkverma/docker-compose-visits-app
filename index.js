const express=require("express")
const redis=require("redis")

const app=express();
const client = redis.createClient({
    host:'redis-server',
    port:6379,
});
client.set('visits',0)

const getVisitsFromRedis=(cb)=>{
    client.get("visits",(err,visits)=>cb(visits))
}
const getNumberOfClientVisits=(cb)=>{
    return getVisitsFromRedis((visits)=>{
        cb('Number of visits is: '+visits); 
    })
}
const updateNumberOfClientVisits=()=>{
    getVisitsFromRedis((visits)=>{
        client.set('visits',parseInt(visits)+1)
    })
}

app.get("/",(req,res)=>{
    getNumberOfClientVisits((message)=>res.send(message))    
    updateNumberOfClientVisits()
})

app.listen(8081,()=>{
    console.log("Listening on port: 8081")
})