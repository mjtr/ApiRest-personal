var mongoClient = require("mongodb").MongoClient;

var mongoURL = "mongodb://mjtr:gatete@ds111299.mlab.com:11299/rape-personal-1718";
var db = null;
var db2 = null;



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
                            "numberOfRape": 10108,
                            "rate": 16.2,
                            "total-since-two-thousand": 71208
                        }, {
                            "country": "germany",
                            "year": 2010,
                            "numberOfRape": 7724,
                            "rate": 9.4,
                            "total-since-two-thousand": 25730
                        }, {
                            "country": "germany",
                            "year": 2005,
                            "numberOfRape": 8133,
                            "rate": 9.9 ,
                            "total-since-two-thousand": 12017
                            
                        }, {
                            "country": "belgium",
                            "year": 2006,
                            "numberOfRape": 3194,
                            "rate": 30.5,
                            "total-since-two-thousand": 24319
                            
                        }, {
                            "country": "belgium",
                            "year": 2010,
                            "numberOfRape": 2991,
                            "rate": 27.9 ,
                            "total-since-two-thousand": 20914
                            
                        }, {
                            "country": "italy",
                            "year": 2004,
                            "numberOfRape": 3734,
                            "rate": 6.4,
                            "total-since-two-thousand": 6478
                        }, {
                            "country": "sweden",
                            "year": 2003,
                            "numberOfRape": 2235,
                            "rate": 25,
                            "total-since-two-thousand": 2235
                        }, {
                            "country": "sweden",
                            "year": 2010,
                            "numberOfRape": 5960,
                            "rate": 63.5,
                            "total-since-two-thousand": 34583
                            
                        }, {
                            "country": "netherlands",
                            "year": 2007,
                            "numberOfRape": 2095,
                            "rate": 12.7,
                            "total-since-two-thousand": 10465
                            
                        }, {
                            "country": "netherlands",
                            "year": 2008,
                            "numberOfRape": 1920,
                            "rate": 11.6,
                            "total-since-two-thousand": 12385
                            
                        }, {
                            "country": "ukraine",
                            "year": 2009,
                            "numberOfRape": 758,
                            "rate": 1.7,
                            "total-since-two-thousand": 1048
                            
                        }, {
                            "country": "ukraine",
                            "year": 2003,
                            "numberOfRape": 1048,
                            "rate": 2.2 ,
                            "total-since-two-thousand": 6445
                            
                        }, {
                            "country": "portugal",
                            "year": 2008,
                            "numberOfRape": 392,
                            "rate": 3.7,
                            "total-since-two-thousand": 392
                            
                        }, {
                            "country": "portugal",
                            "year": 2010,
                            "numberOfRape": 424,
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
