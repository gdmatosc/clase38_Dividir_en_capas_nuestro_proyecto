const comunicacionesFn=require('../b6.funciones_adicionales/comunicaciones.js')
const logd = require('../b7.configuraciones/logging.js')
const modname='[apiAuth.js]'
const logr=logd.child({modulo:`${modname}`})
const path = require('path')

class ApiAuth{
    constructor(){
        this.coms=comunicacionesFn
    }

    getPublic(target){
        switch(target){
            case 'Login': return path.resolve(__dirname, '../public')+'/login.html'
            case 'Signup': return path.resolve(__dirname, '../public')+'/signup.html'
            default: return path.resolve(__dirname, '../public')+'/index.html'
        }
    }
    getLogin(username){
        logr.info(username,{recurso:'[username]'})
        return ('userProfile',{username})
    }

}

module.exports=ApiAuth