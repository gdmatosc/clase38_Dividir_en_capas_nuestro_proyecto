const express=require('express')
const { Router }=express
//const {fork}=require('child_process')
const { calculo } = require('../b6.funciones_adicionales/operacion1.js')
const fnCom=require('../b6.funciones_adicionales/comunicaciones')
const logd = require('../b7.configuraciones/logging.js')
const modname='[indexDAO.js]'
const logr=logd.child({modulo:`${modname}`})
const loger=logd.child({modulo:`${modname}[submod]`})
const apiRouterOper=Router(); 
const procAdminEmail=process.env.ADMIN_EMAIL

apiRouterOper.post('/notificacion', (req, res) => {
    const dataBody=req.body;
    //console.log("username-text.comentariosFile.routerPost",dataBody)//debug
    fnCom.nodemailer('compraNew',procAdminEmail,dataBody)
    fnCom.twilio_sms_client()
    fnCom.twilio_whs_admin()
    //console.log("Guardado.comentariosFile.routerPost")//debug
    res.send("Enviado")
   
});

apiRouterOper.get('/numerosRandom/:id', (req, res) => {
    let cant = req.query.cant
    console.log("cant.apiRouterGet",cant)
    console.log("Alive")
    resultado=calculo(cant)
    console.log("resultado.apiRouterOper.Get",resultado)
    return res.json(resultado)
   
});

module.exports=apiRouterOper