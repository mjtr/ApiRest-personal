var mongoClient = require("mongodb").MongoClient;

var mongoURL = "mongodb://mjtr:gatete@ds111299.mlab.com:11299/rape-personal-1718";
var db = null;


/******CONECTAR CON LA BASE DE DATOS******/


mongoClient.connect (mongoURL,{native_parser : true }, (error,database)=>{
    
      if (error) {
        console.log("No se puede usar la base de datos " + error);
        process.exit();
    }

   db = database.db("rape-personal-1718").collection("rape-stats");
   
   console.log ("la base de datos ha sido conectada con éxito");

});

module.exports.getInitialData = (request,response)=>{
    
    
    //Comprueba que la base de datos no esté vacía

        if (db != null ||db.length != 0) {
            //recorremos la base de datos
            db.find({}).toArray(function(error, conjunto) {
                if (error) {
                    
                    console.error(' Error from DB');
                    response.sendStatus(500); // internal server error
                }
                else {

                
                /*Comprobamos que el conjunto no esté vacío*/
                    if (!conjunto || conjunto.length !== 0) { 
                        
                        //TODO: añadimos un console log para tener un punto de control.Section 1
                        console.log("Error en el control section 1");
                        response.sendStatus(409); //Conflicto,la base de datos ya estaba inicializada

                    }
                    else {
                        db.insert([{
                            "country": "france",
                            "year": 2004,
                            "number-of-rape": 10408,
                            "rate": 17.4 ,
                            "total-since-two-thousand": 20914
                        }, {
                            "country": "france",
                            "year": 2009,
                            "number-of-rape": 10108,
                            "rate": 16.2,
                            "total-since-two-thousand": 71208
                        }, {
                            "country": "germany",
                            "year": 2010,
                            "number-of-rape": 7724,
                            "rate": 9.4,
                            "total-since-two-thousand": 25730
                        }, {
                            "country": "germany",
                            "year": 2005,
                            "number-of-rape": 8133,
                            "rate": 9.9 ,
                            "total-since-two-thousand": 12017
                            
                        }, {
                            "country": "belgium",
                            "year": 2006,
                            "number-of-rape": 3194,
                            "rate": 30.5,
                            "total-since-two-thousand": 24319
                            
                        }, {
                            "country": "belgium",
                            "year": 2010,
                            "number-of-rape": 2991,
                            "rate": 27.9 ,
                            "total-since-two-thousand": 20914
                            
                        }, {
                            "country": "italy",
                            "year": 2004,
                            "number-of-rape": 3734,
                            "rate": 6.4,
                            "total-since-two-thousand": 6478
                        }, {
                            "country": "sweden",
                            "year": 2003,
                            "number-of-rape": 2235,
                            "rate": 25,
                            "total-since-two-thousand": 2235
                        }, {
                            "country": "sweden",
                            "year": 2010,
                            "number-of-rape": 5960,
                            "rate": 63.5,
                            "total-since-two-thousand": 34583
                            
                        }, {
                            "country": "netherlands",
                            "year": 2007,
                            "number-of-rape": 2095,
                            "rate": 12.7,
                            "total-since-two-thousand": 10465
                            
                        }, {
                            "country": "netherlands",
                            "year": 2008,
                            "number-of-rape": 1920,
                            "rate": 11.6,
                            "total-since-two-thousand": 12385
                            
                        }, {
                            "country": "ukraine",
                            "year": 2009,
                            "number-of-rape": 758,
                            "rate": 1.7,
                            "total-since-two-thousand": 1048
                            
                        }, {
                            "country": "ukraine",
                            "year": 2003,
                            "number-of-rape": 1048,
                            "rate": 2.2 ,
                            "total-since-two-thousand": 6445
                            
                        }, {
                            "country": "portugal",
                            "year": 2008,
                            "number-of-rape": 392,
                            "rate": 3.7,
                            "total-since-two-thousand": 392
                            
                        }, {
                            "country": "portugal",
                            "year": 2010,
                            "number-of-rape": 424,
                            "rate": 4,
                            "total-since-two-thousand": 2856
                            
                        }]);
        
        
                    console.log("La base de datos se ha creado correctamente");
                        response.sendStatus(201);
                    }
                }
            });
        }
        else {
            //TODO: Otro control más para manejar los erroes, section 2
            console.log("No se ha inicialiazado la base de datos correctamente, SECTION 2 ERROR");
            response.sendStatus(500);

        }
    
};



/**********************************GET***************************/
//Get a un conjunto de datos


module.exports.getAllData = (request,response)=> {
    
    if(!db || db == null || db.length === 0){
        
        //TODO: controlar el error base de datos vacía a la hora de hacer el get al conjunto, section 1
        console.log("la base de datos está vacía, get all data, section 1");
        response.sendStatus(500);
    }else{
        
        
        db.find({}).toArray((error,data) => {
            
            if(error){
                
                //TODO: error en el section 2 
                console.log("Error en el section 2 get all data");
                response.sendStatus(500);
                
            }else{
                
                
                if(!data || data.length ===0 ){
                    
                    //TODO: error en el section 3
                    console.log("section 3 all data error");
                }else{
                    
                    
                    response.send(data);
                    
                }
                
                
                
            }
        });
        
    }
    
    
};


//Get a un recurso en concreto por nombre y año


module.exports.getSingleDataNameYear = (request,response)=>{

    //cogemos los datos que pasamos en la url como parámetros    
   var country = request.params.name; 
   var year = request.params.year;
   var conjuntoAux = [];
   
   if (!country || !year || isNaN(country) == false || isNaN(year) == true){
       
      console.log ("Error al introducir el nombre o el año, section 1 getSingleDataNameYear error");
      response.sendStatus(400);
       
   }
   
   if (!db || db == null){
       
       console.log("algo pasa con la base de datos, section 2 getSingleDataNameYear error");
       response.sendStatus(500);
       
   }else {
       
       
       db.find({}).toArray(function (error, datos){
           
           if(!datos || datos.length == 0 ){
               console.log("No hay ningún dato en la base de datos");
               response.sendStatus(404);
           }else {
               var nameAux = "";
               var yearAux = "";
               
               for(var i = 0; i< datos.length; i++){
                   
                   nameAux = datos[i].country;
                   yearAux = datos[i].year;
                   //filtramos buscando el dato
                   if(nameAux == country && yearAux == year){
                       
                       conjuntoAux.push(datos[i]);
                   }
                   
               }
           }
           
           if (conjuntoAux.length === 0){
               
               console.log ("el conjunto auxiliar no ha guardado ningún dato, luego no lo ha encontrado");
               response.sendStatus(404);
               
           }else{
               
               response.send(conjuntoAux);
           }
           
       });
       
   }
    
};



module.exports.postDenied = (request, response)=>{
    
    console.log("hemos hecho un post a un dato en concreto, método no permitido"); 
    response.sendStatus(405);
    
    
    
};

module.exports.postDataGroup = (request,response) =>{
    
        var parametros = request.body; 
        console.log ("compruebo ahora que el dato que he cogido no esté vacío");
        if(!parametros || parametros == null ){
            
            response.sendStatus(400);
            
        }else {
            
            if(chequeaParametro(parametros) == false ){
                
                console.log("Bad request, algunos parámetros están mal");
                response.sendStatus(400);
            }else{
                
                db.find({}).toArray(function(error, datos) {
                    
                    datos.push(parametros);
                    console.log("dato creado correctamente");
                    
                });
                
            }
            
            
        }
    
    
};


var chequeaParametro = function(parametros){
    
    var res = true; 
    
    if (parametros.country == null || parametros.country == "" ||
    parametros.year == null || parametros.year == "" ||
    parametros.number-of-rape == null || parametros.number-of-rape == "" ||
    parametros.rate == null || parametros.rate == "" ||
    parametros.total-since-two-thousand == null || parametros.total-since-two-thousand == "" ){
        
        console.log("hay alguno datos nulos o vacíos");
        res= false;
    }else{
        
     if (isNaN(parametros.country) == false || isNaN(parametros.year) == true 
     || isNaN(parametros.number-of-rape) == true  || isNaN(parametros.rate) == true  
     || isNaN(parametros.total-since-two-thousand) == true ){
         console.log("alguno de los parámetros están mal introducidos");
         res = false;
     }
        
        
    }
    
    return res;
};






