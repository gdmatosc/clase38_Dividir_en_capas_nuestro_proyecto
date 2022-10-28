const ApiAuth=require('../b13.api/apiAuth.js')
const PassportAuth=require('../b14.model/passportAuth.js')
const logd = require('../b7.configuraciones/logging.js')
const modname='[controllerAuth.js]'
const logr=logd.child({modulo:`${modname}`})
const fnCom=require('../b6.funciones_adicionales/comunicaciones')

class ControllerAuth{
constructor(){
    this.apiAuth=new ApiAuth()
}
getRoot=(req,res)=>{
    let web= this.apiAuth.getPublic()
    res.sendFile(web)
}

getLogin=(req,res)=>{
    //const loge=factoryLog(`${modname}[getlogin]`)
    const loger=logd.child({modulo:`${modname}[getLogin]`})
    loger.debug(req.isAuthenticated(),{recurso:'(antes del if req.isAuthenticated())[req.isAuthenticated()]'})
    if(req.isAuthenticated()){
        loger.debug('(inicio if req.isAuthenticated())',{recurso:'[na]'})
        const user=req.user
        let username=req.user.username
        let webAuth= this.apiAuth.getLogin(username)
        //res.send('login-ok')
        res.render(webAuth)
    }else{
        loger.debug('(inicio else req.isAuthenticated())',{recurso:'[na]'})
        let webNoAuth= this.apiAuth.getPublic('Login')
        res.sendFile(webNoAuth)
    }
}

postLogin=(req,res)=>{
     const loger=logd.child({modulo:`${modname}[postLogin]`})
    // loger.debug('(antes de this.passportAuth.authLogin)',{recurso:'[na]'})
    //PassportAuth.authLoginNew(req, res)
    
    loger.debug(req.isAuthenticated(),{recurso:'(despues de this.passportAuth.authLogin)[req.isAuthenticated()]'})

    if(req.isAuthenticated()){
        
        loger.info(JSON.stringify(req.user),{recurso:'[req.user]'})
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
    
    
}

getHomeGeneral=(req,res)=>{
    const loger=logd.child({modulo:`${modname}[get-homeGeneral]`})
    let username=req.user.username
    loger.verbose(username,{recurso:"[username]"})
    if(!username) return res.redirect('/login')
    return res.render('homeGeneral',{username})
}

getLogout=(req,res)=>{
    let username=req.user.username
    req.session.destroy()
    return res.render('logout',{username})
}


getUserProfile=(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-userProfile]`})
    let username=req.user.username
    let name=req.user.name
    let email=req.user.email
    let address=req.user.address
    let age=req.user.age
    let telephone=req.user.telephone
    loger.verbose(username,{recurso:"[username]"})
    if(!username) return res.redirect('/login')
    return res.render('userProfile',{username,name,email,address,age,telephone})
}

getChatGeneral=(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-chatGeneral]`})
    let username=req.user.username
    loger.verbose(username,{recurso:"[username]"})
    return res.render('chatGeneral.ejs',{username})
}

getProductosClientes=(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-productosClientes]`})
    let username=req.session.username
    loger.verbose(username,{recurso:"[reqSessionUsername]"})
    return res.render('productosClientes.ejs',{username})
    //return res.sendFile(path.resolve(__dirname, '../Clase28.desafio/f1.views')+'/productosClientes.html')
}

getCarritoClientes=(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-carritoClientes]`})
    let username=req.session.username
    //loger.verbose(res,{recurso:"[res]"})
    loger.verbose(username,{recurso:"[reqSessionUsername]"})
    return res.render('carritoClientes.ejs',{username})
}

getHomeAdmin=(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-homeAdmin]`})
    let username=req.user.username
    loger.verbose(username,{recurso:"username"})
    return res.render('homeAdmin',{username})
}

getCompraExitosa=(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-compraExitosa]`})
    //twilio_sms(cliente)
    //twilio_whs(admin)
    //nodemailer(admin,detalles)
    let username=req.user.username
    loger.verbose(username,{recurso:"username"})
    return res.render('compraExitosa',{username})
}

getProductosMantenimiento=(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-productosMantenimiento]`})
    let username=req.session.username
    loger.verbose(username,{recurso:"[reqSession.Username]"})
    return res.render('productosMantenimiento.ejs',{username})
}

getOperacionesRandoms=(req,res)=>{
    //logr.verbose(req.session);
    const loger=logd.child({modulo:`${modname}[get-operaciones1Admin`})
    let username=req.session.username
    loger.verbose(username,{recurso:"[reqSession.Username]"})
    return res.render('operaciones1Admin.ejs',{username})
}

getOperacionesInfo=(req,res)=>{
    //logr.verbose(req.session);
    let username=req.session.username
    let dato1='hola'
    let id_proceso=process.pid
    nombre_plataforma=process.platform
    version_node=process.version
    carpeta_proyecto=process.cwd()
    path_ejecucion=process.execPath
    memoria_reservada=process.memoryUsage.rss()
    argumentos_entrada=process.execArgv
    logr.verbose(username,{recurso:"reqSessionUsername.appGet"})
    return res.render('operaciones2Admin.ejs',{username,id_proceso,nombre_plataforma,version_node,carpeta_proyecto,path_ejecucion,memoria_reservada,argumentos_entrada})
}

postUploadFile=(req, res) => {
    //basic setup
    const loger=logd.child({modulo:`${modname}[post-api/uploadFile`})
    const form = new formidable.IncomingForm();
    const uploadFolder = path.join(__dirname, "public", "imgUser");
    loger.verbose(uploadFolder,{recurso:"[uploadFolder]"})
    //console.log("[b0.server]",uploadFolder)
    //basic configuration
    form.uploadDir = uploadFolder
    //console.log(form);
    loger.verbose(JSON.stringify(form),{recurso:"[form]"})
    //parsing
    form.parse(req, function (err, fields, files) {
        //console.log(fields)
        //console.log(files)
        loger.verbose(fields,{recurso:"[fields]"})
        loger.verbose(JSON.stringify(files),{recurso:"[files]"})
        if (err) {
            loger.warn(`Error en sección parsing: ${err}`,{recurso:'[error]'});
            return res.status(400).json({
              status: "Fail",
              message: "There was an error parsing the files",
              error: err,
            });
          }
        else {
            
            //update name
                const file = files.myFile;
                //console.log(file)
                loger.verbose(JSON.stringify(file),{recurso:"[file]"})
                // creates a valid name by removing spaces
               // const fileName = encodeURIComponent(file.name);
               
                //console.log(fileName)
                loger.verbose(file.originalFilename,{recurso:"[file.originalFilename]"})
                try {
                 // renames the file in the directory
                loger.verbose(file.filepath,{recurso:"[file.filepath]"})
                //const fileType = '.'+file.mimetype.split("/").pop();
                const fileName = 'avatar1'+'.'+file.mimetype.split("/").pop();
                loger.verbose(fileName,{recurso:"[fileName]"})
                fs.renameSync(file.filepath, path.join(uploadFolder, fileName));
                // return res.status(200).json({
                //     status: "success",
                //     message: "File created successfully!!",
                //   });
                res.write('File uploaded');
                res.end();
                } catch (error) {
                    loger.warn(`Error en sección update name: ${error}`,{recurso:'[error]'});
                console.log(error);
                }

               
        }


        
      });
    
    
  };

getDefault= (req, res)=> {
    const loger=logd.child({modulo:`${modname}[get-Ruta-Default]`})
    let ruta=req.path
    loger.warn(ruta,{recurso:"[path]"})
    res.send('<h1>la ruta no existe</h1>');
}




}

module.exports=ControllerAuth


//app.post('/login',passport.authLogin,apiRouterAuth.postLogin)

// app.get('/logout',checkAuthentication,(req,res)=>{
//     let username=req.user.username
//     req.session.destroy()
//     return res.render('logout',{username})

// })

// function getRoot(req,res){
//     res.sendFile(path.resolve(__dirname, '../public')+'/index.html')
// }

// function getLogin(req,res){
//     //const loge=factoryLog(`${modname}[getlogin]`)
//     if(req.isAuthenticated()){
//         const user=req.user
//         let username=req.user.username
//         logr.info(username,{recurso:'[username]'})
//         //res.send('login-ok')
//         res.render('userProfile',{username})
//     }else{
        
//         res.sendFile(path.resolve(__dirname, '../public')+'/login.html')
//     }
// }

// function postLogin(req,res){
//     //const loge=factoryLog(`${modname}[postlogin]`)
//     const loger=logd.child({modulo:`${modname}[postLogin]`})
//     loger.info(JSON.stringify(req.user),{recurso:'[req.user]'})
//     loger.debug(JSON.stringify(req.session),{recurso:'[req.session]'})
//     loger.info(JSON.stringify(req.user.username),{recurso:'[req.user.username]'});
//     let username=req.user.username
//     let name=req.user.name
//     let email=req.user.email
//     let address=req.user.address
//     let age=req.user.age
//     let telephone=req.user.telephone
//     fnCom.currentUser(username)
//     fnCom.currentUserTelephone(telephone)
//     res.render('userProfile',{username,name,email,address,age,telephone})
// }