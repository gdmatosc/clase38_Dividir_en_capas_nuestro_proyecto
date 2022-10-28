
const res=require('express/lib/response')
const path = require('path')
const logd = require('../b7.configuraciones/logging.js')
const fnCom=require('../b6.funciones_adicionales/comunicaciones')
const modname='[apiRouterAuth.js]'
const logr=logd.child({modulo:`${modname}`})
//const logd=factoryLog(modname)
//const logdr=factoryLog.child({modulo:`[${modname}]`})

function getRoot(req,res){
    res.sendFile(path.resolve(__dirname, '../public')+'/index.html')
}

function getLogin(req,res){
    //const loge=factoryLog(`${modname}[getlogin]`)
    if(req.isAuthenticated()){
        const user=req.user
        let username=req.user.username
        logr.info(username,{recurso:'[username]'})
        //res.send('login-ok')
        res.render('userProfile',{username})
    }else{
        
        res.sendFile(path.resolve(__dirname, '../public')+'/login.html')
    }
}

function postLogin(req,res){
    //const loge=factoryLog(`${modname}[postlogin]`)
    const loger=logd.child({modulo:`${modname}[postLogin]`})
    loger.info(JSON.stringify(req.user),{recurso:'[req.user]'})
    loger.info(req.isAuthenticated(),{recurso:'[req.isAuthenticated()]'})
    loger.debug(JSON.stringify(req.session),{recurso:'[req.session]'})
    loger.info(JSON.stringify(req.user.username),{recurso:'[req.user.username]'});
    let username=req.user.username
    let name=req.user.name
    let email=req.user.email
    let address=req.user.address
    let age=req.user.age
    let telephone=req.user.telephone
    fnCom.currentUser(username)
    fnCom.currentUserTelephone(telephone)
    res.render('userProfile',{username,name,email,address,age,telephone})
}

function getSignup(req,res){
    res.sendFile(path.resolve(__dirname, '../public')+'/signup.html')
}

function getFailSignup(req,res){
    res.write('Error: El usuario ya existe');
    res.end();
    //res.send('Fail signup')
}

function getFailLogin(req,res){
    res.write('Error: El usuario o password es invalido');
    res.end();
}

function postSignup(req,res){
    console.log("req.user.postSignup.RoutesJS",req.user)
    let username=req.user.username
    let name=req.user.name
    let email=req.user.email
    let address=req.user.address
    let age=req.user.age
    let telephone=req.user.telephone
    res.render('userProfile',{username,name,email,address,age,telephone})

}

function getUserData(req, res) {

    if (req.user === undefined) {
        // The user is not logged in
        res.json({});
    } else {
        res.json({
            username: req.user
        });
    }
}

module.exports={
    getRoot,
    getLogin,
    postLogin,
    getSignup,
    getFailSignup,
    getFailLogin,
    postSignup,
    getUserData
}