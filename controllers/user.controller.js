const { config } = require("dotenv")
const fs = require('fs')
// const data = fs.readFileSync('../users.json', 'utf-8')
const data = fs.readFileSync(`${__dirname}\\users.json`);
const userData = JSON.parse(data)


module.exports.randomUser = (req, res) => {
    const random = userData[Math.floor(Math.random() * userData.length)]
    res.send(random)
}
module.exports.allUser = (req, res) => {
    // const { limit, page } = req.query;
    // console.log(limit, page);
    // undefined.test();
    // const data=res.json(userData.slice(0, limit));
    // console.log(userData);
    res.send(userData)
}
module.exports.saveUser = (req, res) => {
    
        fs.readFile(`${__dirname}\\users.json`, (err, data) => {
            if(err){
               res.send({error:"error occured"})
            }  
            else{
               let jsonData = JSON.parse(data)
   
               let unavailable = true;
               jsonData.map(i => {
                   if (i.id == req.body.id) {
                       unavailable = false
                   }
               })
   
               if (unavailable) {
                   const userData = {
                       "id": req.body.id,
                       "gender": req.body.gender,
                       "name": req.body.name,
                       "contact": req.body.contact,
                       "address": req.body.address,
                       "photoUrl": req.body.photoUrl
                   }
   
                   jsonData.push(userData)
                   fs.writeFileSync(`${__dirname}\\users.json`, JSON.stringify(jsonData)) 
                   res.send({success:'Data added successfully'})  
               } else {
                   res.send({error:"This id already available."})
               }
            }
           }) 
    
}

   

module.exports.updateUser = (req, res) => {
    if (!req.body.id || typeof (req.body.id) == 'string') {
        if (!req.body.id) {
            res.send("id missing")
        }
        else {
            res.send("id should be number")
        }
    } else {
        const userData = {
            "id": req.body.id,
            "gender": req.body.gender,
            "name": req.body.name,
            "contact": req.body.contact,
            "address": req.body.address,
            "photoUrl": req.body.photoUrl
        }

        fs.readFile(`${__dirname}\\users.json`, (err, data) => {
            let jsonData = JSON.parse(data)
            let available = false;
            jsonData.map(i => {
                if (i.id == req.body.id) {
                    available = true
                }
            })
            if (available) {
                let filteredData = jsonData.filter(i => i.id !== req.body.id)
                filteredData.push(userData)
                fs.writeFile(`${__dirname}\\users.json`, JSON.stringify(filteredData), (err) => {
                    if (!err) {
                        res.send("Data updated successfully.")
                    }
                })
            } else {
                res.send("This id not available.")
            }
        })
    }
}
// module.exports.bulkUpdateUser = (req, res) => {
//     res.send(userData)
// }
module.exports.deleteUser = (req, res) => {
    if (!req.body.id || typeof (req.body.id) == 'string') {
        if (!req.body.id) {
            res.send("id missing")
        }
        else {
            res.send("id should be number")
        }
    } else {
        fs.readFile(`${__dirname}\\users.json`, (err, data) => {
            let jsonData = JSON.parse(data)
            let available = false;
            jsonData.map(i => {
                if (i.id == req.body.id) {
                    available = true
                }
            })

            if (available) {
                let filteredData = jsonData.filter(i => i.id !== req.body.id)
                fs.writeFile(`${__dirname}\\users.json`, JSON.stringify(filteredData), (err) => {
                    if (!err) {
                        res.send("Data deleted successfully.")
                    }
                })
            }
            else {
                res.send("This id not available.")
            }
        })
    }
}