import "reflect-metadata";
import { createConnection } from "typeorm";
import { Machines } from "./entity/machine";
import { Partners } from './entity/partners';
import { Users } from './entity/user';

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.listen(3000,() =>{
    console.log("server running...");
});

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "infsys_assignment",
    entities: [
        __dirname + '/entity/**/*.ts'
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    let partnerRepository = connection.getRepository(Partners);
    let machineRepository = connection.getRepository(Machines);
    let userRepository = connection.getRepository(Users);
    
    //get all partners
    app.get('/partner',(req,res)=>{
        
        let savedPartners = partnerRepository.find();
        savedPartners.then(function(result){
            if(result.length>0){
                res.send({
                    message:'All partner data',
                    data:result
                });
            }else {
                res.send({
                    message:'Error or no data in table'
                })
            }
        })
    })

    //get single partner
    app.get('/partner/:id',(req,res)=>{
        let gID = req.params.id;
        let partner = partnerRepository.query(`select * from partners where id = ${gID}`);
        partner.then(function(result){
            if(result.length>0){
                res.send({
                    message:'Get single data',
                    data:result
                });
           }
           else{
               res.send({
                   message:'Data not found'
               });
           }
    
        });
       
    });

    //create user
    app.post('/insertNewUser',(req,res)=>{
        console.log(req);
        
        let username = req.body.username;
        let password = req.body.password;
        console.log(username);
        
        let create = userRepository.query(`insert into users (username, password) values ('${username}', '${password}')`);
        res.send({
            message: "Sikeres feltöltés!",
        });
    });

    //create partner
    app.post('/partner',(req,res)=>{
        
        let name = req.body.name;
        let zipCode = req.body.zipCode;
        let city = req.body.city;
        let address = req.body.address;
        let ballance = req.body.ballance;
    
        let create  = partnerRepository.query(`insert into partners(name,zipCode,city,address,ballance) 
        values ('${name}',${zipCode},'${city}','${address}','${ballance}')`);
        res.send({
            message: 'Sikeres feltöltés!',  
        });
    });

    //update single partner
    app.put('/partner/:id',(req,res)=>{

        let gID = req.params.id;
        let name = req.body.name;
        let zipCode = req.body.zipCode;
        let city = req.body.city;
        let address = req.body.address;
        let ballance = req.body.ballance;
    
        partnerRepository.query(`update partners set name = '${name}',zipCode='${zipCode}' ,city='${city}', address='${address}', ballance='${ballance}' where id = ${gID}`);
        res.send({
            message: 'Sikeres módosítás!'
        });
    });

    //delete single partner
    app.delete('/partner/:id',(req,res)=>{
        let qID = req.params.id;

        partnerRepository.query(`delete from partners where id = ${qID}`);
        res.send({
            message:'Sikeres törlés!'
        })
    });


    //search partner by name
    app.get('/searchPartnerByName/:name',(req,res)=>{
        let name = req.params.name;
        let partner = partnerRepository.query(`select * from partners where name like '%${name}%'`);
        partner.then(function(result){
            if(result.length>0){
                res.send({
                    message:'Get searched data',
                    data:result
                });
            }
            else{
                res.send({
                    message:'Data not found'
                });
            }
        });
    });


    //search partner by id
    app.get('/searchPartnerById/:id',(req,res)=>{
        let id = req.params.id;
        let partner = partnerRepository.query(`select * from partners where id like '%${id}%'`);
        partner.then(function(result){
            if(result.length>0){
                res.send({
                    message:'Get searched data',
                    data:result
                });
            }
            else{
                res.send({
                    message:'Data not found'
                });
            }
        });
    });
    


    //login
    app.post('/logging',(req,res)=>{
        
        let username = req.body.username;
        let password = req.body.password;

        let login = userRepository.query(`select count(*) numberOfUsers from users where username = '${username}' and password ='${password}'`);
        login.then(function(result){
            if(result.length>0){
                res.send({
                    message:'Query success',
                    data:result
                });
            }else {
                res.send({
                    message:'Error or no data in table'
                })
            }
        });
    });



    //get all machines
    app.get('/machine',(req,res)=>{
        let savedMachines = machineRepository.find();
        savedMachines.then(function(result){
            if(result.length>0){
                res.send({
                    message:'All machine data',
                    data:result
                });
            }else {
                res.send({
                    message:'Error or no data in table'
                })
            }
        })
        
    });

    //get single machine
    app.get('/machine/:id',(req,res)=>{
        let gID = req.params.id;
    
        let machine = machineRepository.query(`select * from machines where id = ${gID}`);
        machine.then(function(result){
    
            if(result.length>0){
                res.send({
                    message:'Get single data',
                    data:result
                });
            }
            else{
                res.send({
                    message:'Data not found'
                });
            }
        });
    });

    // create machine

    app.post('/machine',(req,res)=>{

        let machineName = req.body.machineName;
        let acquisition = req.body.acquisition;
        let manufacturer = req.body.manufacturer;
        let chassisNumber = req.body.chassisNumber;

        let qr = machineRepository.query(`insert into machines(machineName,acquisition,manufacturer,state,chassisNumber,partner_Id)
        values ('${machineName}','${acquisition}','${manufacturer}','Szabad','${chassisNumber}',0)`);

        res.send({
            message: 'Sikeres feltöltés!',  
        });
    });


    //upadte single machine
    app.put('/machine/:id',(req,res)=>{

        let gID = req.params.id;
        let machineName = req.body.machineName;
        let acquisition = req.body.acquisition;
        let manufacturer = req.body.manufacturer;
        let state = req.body.state;
        let chassisNumber = req.body.chassisNumber;

        let qr = machineRepository.query(`update machines set machineName = '${machineName}',acquisition='${acquisition}' ,manufacturer='${manufacturer}', state='${state}',chassisNumber='${chassisNumber}' where id = ${gID}`);
        res.send({
            message: 'Sikeres módosítás!'
        });
    });


    //delete single machine
    app.delete('/machine/:id',(req,res)=>{
        let qID = req.params.id;

        machineRepository.query(`delete from machines where id = ${qID}`);
            res.send({
                message:'Sikeres törlés!'
            })
    });

    //search machine by name
    app.get('/searchMachineByName/:name',(req,res)=>{
        let name = req.params.name;
        let machine = machineRepository.query(`select * from machines where machineName like '%${name}%'`);
        machine.then(function(result){
            if(result.length>0){
                res.send({
                    message:'Get searched data',
                    data:result
                });
            }
            else{
                res.send({
                    message:'Data not found'
                });
            }
        });
    });

    //search machine by id
    app.get('/searchMachineById/:id',(req,res)=>{
        let id = req.params.id;
        let machine = machineRepository.query(`select * from machines where id like '%${id}%'`);
        machine.then(function(result){
            if(result.length>0){
                res.send({
                    message:'Get searched data',
                    data:result
                });
            }
            else{
                res.send({
                    message:'Data not found'
                });
            }
        });
    });


    //loan machine
    app.post('/loanMachine',(req,res)=>{

        let partnerId = req.body.partnerId;
        let machineId = req.body.machineId;

        machineRepository.query(`update machines set partner_Id =${partnerId} where id = ${machineId}`);
        res.send({
            message: 'Sikeres kölcsönzés!',  
        });
    });

    //get machine id and name
    app.get('/getMachineIdAndName',(req,res)=>{
        
        let machine = machineRepository.query(`select id,machineName from machines where state = 'Szabad'`);
        machine.then(function(result){
            if(result.length>0){
                res.send({
                    message:'Machine id and name',
                    data:result
                });
            }else {
                res.send({
                    message:'Error or no data in table'
                })
            }
        });
    });

    //get partner id and name
    app.get('/getPartnerIdAndName',(req,res)=>{
        
        let partner = partnerRepository.query(`select id,name from partners`);
        partner.then(function(result){
            if(result.length>0){
                res.send({
                    message:'Partner id and name',
                    data:result
                });
            }else {
                res.send({
                    message:'Error or no data in table'
                })
            }
        });
    });

    app.get('/getPartnerBallance',(req,res)=>{
        
        let partner = partnerRepository.query(`select ballance from partners`);
        partner.then(function(result){
            if(result.length>0){
                res.send({
                    message:'Partner ballance',
                    data:result
                });
            }else {
                res.send({
                    message:'Error or no data in table'
                })
            }
        });
    });

    //set state busy
    app.put('/setStateBusy',(req,res)=>{

        let gID = req.body.id;

        machineRepository.query(`update machines set state='Foglalt' where id = ${gID}`);
        res.send({
            message: 'Sikeres módosítás!',

        });
    });


    //set partnerId for machine
    app.put('/setPartnerIdForMachine',(req,res)=>{

        let partnerId = req.body.partnerId;
        let machineId = req.body.machineId;
    
        machineRepository.query(`update machines set partner_Id=${partnerId} where id = ${machineId}`);
        res.send({
            message: 'Sikeres módosítás!',
        });
    });


    //get number of machines for a partner 
    app.get('/numberOfMachines/:id',(req,res)=>{

        let id = req.params.id;    
        
        let machine = machineRepository.query(`select count(*) numberOfMachines from machines where partner_Id=${id}`);
        machine.then(function(result){
            if(result.length>0){
                res.send({
                    message:'Number of machines for a partner',
                    data:result
                });
            }else {
                res.send({
                    message:'Error or no data in table'
                })
            }
        });
    });


    //setting partner ids to default in machines
    app.put('/setPartnerIdToDefault',(req,res)=>{

        let partnerId = req.body.partnerId;

        machineRepository.query(`update machines set partner_Id=0, state='Szabad' where partner_Id = ${partnerId}`);
        res.send({
            message: 'Sikeres módosítás!',
        });
    });

}).catch(error => console.log(error));




