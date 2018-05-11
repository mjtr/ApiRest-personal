// Aquí estarán todos los datos con apikey, limit y offset incluidos
var mongoClient = require("mongodb").MongoClient;

var mongoURL = "mongodb://mjtr:gatete@ds111299.mlab.com:11299/rape-personal-1718";
var db = null;


/******CONECTAR CON LA BASE DE DATOS******/

mongoClient.connect(mongoURL, { native_parser: true }, (error, database) => {

    if (error) {
        console.log("No se puede usar la base de datos " + error);
        process.exit();
    }

    db = database.db("rape-personal-1718").collection("rape-stats");

    console.log("la base de datos ha sido conectada con éxito");

});

module.exports.getInitialData = (request, response) => {

    //Comprueba que la base de datos no esté vacía

    if (db != null || db.length != 0) {
        //recorremos la base de datos
        db.find({}).toArray(function(error, conjunto) {
            if (error) {

                console.error(' Error from DB');
                response.sendStatus(500); // internal server error
            }
            else {


                /*Comprobamos que el conjunto no esté vacío*/
                if (conjunto.length !== 0) {

                    console.log("la base de datos ya está creada");
                    response.sendStatus(409); //Conflicto,la base de datos ya estaba inicializada

                }
                else {
                    db.insert([

                        {
                            "country": "belgium",
                            "year": 2006,
                            "number-of-rape": 3194,
                            "rate": 30.5,
                            "total-since-two-thousand": 24319

                        }, {
                            "country": "belgium",
                            "year": 2010,
                            "number-of-rape": 2991,
                            "rate": 27.9,
                            "total-since-two-thousand": 20914

                        }, {
                            "country": "france",
                            "year": 2004,
                            "number-of-rape": 10408,
                            "rate": 17.4,
                            "total-since-two-thousand": 20914
                        }, {
                            "country": "france",
                            "year": 2009,
                            "number-of-rape": 10108,
                            "rate": 16.2,
                            "total-since-two-thousand": 71208
                        }, {
                            "country": "germany",
                            "year": 2005,
                            "number-of-rape": 8133,
                            "rate": 9.9,
                            "total-since-two-thousand": 12017

                        }, {
                            "country": "germany",
                            "year": 2010,
                            "number-of-rape": 7724,
                            "rate": 9.4,
                            "total-since-two-thousand": 25730
                        }, {
                            "country": "italy",
                            "year": 2004,
                            "number-of-rape": 3734,
                            "rate": 6.4,
                            "total-since-two-thousand": 6478
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
                            "country": "ukraine",
                            "year": 2003,
                            "number-of-rape": 1048,
                            "rate": 2.2,
                            "total-since-two-thousand": 6445

                        }, {
                            "country": "ukraine",
                            "year": 2009,
                            "number-of-rape": 758,
                            "rate": 1.7,
                            "total-since-two-thousand": 1048

                        }
                    ]);
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

module.exports.getAllData = (request, response) => {
    var limit = request.query.limit;
    var offset = request.query.offset;
    //Todas las siguientes variables serán para las búsquedas
    var from = request.query.from;
    var to = request.query.to;
    var pais = request.query.country;
    var fromRate = request.query["from-rate"];
    var toRate = request.query["to-rate"];
    var fromIncidence = request.query["from-rape"];
    var toIncidence = request.query["to-rape"];
    var fromTotal = request.query["from-total"];
    var toTotal = request.query["to-total"];

    if (checkdb(db) == false)
        response.sendStatus(500);

    else {
        
   

        if (!limit || !offset || limit == null || offset == null)
            recorreDatos(response, from, to, pais, fromIncidence, toIncidence, fromRate, toRate, fromTotal, toTotal);

        else
            recorreDatosLimitOffset(response, parseInt(limit), parseInt(offset), from, to,
                pais, fromIncidence, toIncidence, fromRate, toRate, fromTotal, toTotal);
    
}
};

//Get a un recurso en concreto por nombre y año

module.exports.getSingleDataNameYear = (request, response) => {

    var country = request.params.name;
    var year = request.params.year;
    var conjuntoAux = [];

    if (compruebaDatosURL(country, year) == false)
        response.sendStatus(400);


    if (checkdb(db) == false)
        response.sendStatus(500);

    else {
        db.find({}).toArray(function(error, datos) {

            if (checkdb(datos) == false)
                response.send([]);

            else
                filtradoNombreAnio(datos, conjuntoAux, country, year);

            if (conjuntoAux.length === 0) {
                console.log("el conjunto auxiliar no ha guardado ningún dato, luego no lo ha encontrado");
                response.send([]);
            }
            else {

                response.send(conjuntoAux);
            }

        });

    }

};

//GET a un recurso por nombre o año 

module.exports.getData = (request, response) => {

    var parametro = request.params.name;
    var aux = [];
    var year = null;

    if (!parametro || parametro == null) {

        console.log("No has introducido correctamente los datos, get data error section 1");
        response.sendStatus(400);
    }
    else {

        if (checkdb(db) == false) {
            response.sendStatus(500);
            process.exit();
        }
        else {

            db.find({}).toArray(function(error, datos) {

                if (checkdb(datos) == false) {
                    response.sendStatus(500);
                }
                else {

                    filtradoNombreAnio(datos, aux, parametro, year);

                    if (aux.length == 0) {
                        console.log("no se ha encontrado ningún dato");
                        response.send([]);
                    }
                    else {
                        response.send(aux);

                    }

                }

            });

        }
    }
};

/***********************POST***************************/

// post a un dato en concreto no debe estar permitido
module.exports.postDenied = (request, response) => {

    console.log("hemos hecho un post a un dato en concreto, método no permitido");
    response.sendStatus(405);
};


//post al grupo completo, deberá crear el dato
module.exports.postDataGroup = (request, response) => {

    var parametros = request.body;
    var conflicto = [];

    if (!parametros || parametros == null) 
        response.sendStatus(400);

    else {
        if (chequeaParametro(parametros) == false)
            response.sendStatus(400);

        else {

            if (checkdb(db) == false)
                response.sendStatus(500);

            else {
                db.find({}).toArray(function(error, datos) {

                    conflicto = datos.filter((x) => {
                        return parametros.country == x.country && parametros.year == x.year
                    }).map((x) => {
                        return conflicto.push(x);
                    });

                    if (conflicto.length != 0) 
                        response.sendStatus(409);

                    else {

                        db.insert(parametros);
                        console.log("dato creado correctamente");
                        response.sendStatus(201);

                    }

                });
            }
        }
    }

};


/***********************PUT****************************/

module.exports.putDenied = (request, response) => {
    console.log("no está permitido hace put a un conjunto de datos");
    response.sendStatus(405);

};

module.exports.putSingleData = (request, response) => {

    var pais = request.params.name;
    var anio = request.params.year;
    var datoActualizar = request.body;

    if (compruebaDatosURL(pais, anio) == false) {

        console.log("los datos año o país están mal introducidos");
        response.sendStatus(400);
    }
    else {

        if (checkdb(db) == false) {

            console.log("fallo base de datos en el  put single data, section 1");
            response.sendStatus(500);

        }
        else {

            if (chequeaParametro(datoActualizar) == false) {
                console.log("Algunos parámetros del dato nuevo que has introducido son incorrectos");
                response.sendStatus(400);
            }
            else {

                if (pais === datoActualizar.country && parseInt(anio) === parseInt(datoActualizar.year)) {
                    db.update({
                        country: pais,
                        year: parseInt(anio)
                    }, {
                        country: datoActualizar.country,
                        year: datoActualizar.year,
                        ["number-of-rape"]: datoActualizar["number-of-rape"],
                        rate: datoActualizar.rate,
                        ["total-since-two-thousand"]: datoActualizar["total-since-two-thousand"]

                    });
                    response.sendStatus(200); //OK
                }
                else {
                    console.log("No puedes modificar el país o el año, procura que tenga los mismos datos");
                    response.sendStatus(400);
                }
            }
        }
    }
};


/***********************DELETE****************************/

module.exports.deleteData = (request, response) => {

    var name = request.params.name;
    var year = request.params.year;

    if (compruebaDatosURL(name, year) == false) {

        console.log("Al hacer delete los datos de la url no se han puesto correctamente");
        response.sendStatus(400);
    }
    else {

        if (checkdb(db) == false) {

            console.log("Algo ocurre con la base de datos, error delete single data section 1");
            response.sendStatus(500);

        }
        else {

            db.remove({
                country: name,
                year: parseInt(year)
            }, function(error, conjunto) {
                var numeros = JSON.parse(conjunto);
                if (error) {
                    console.log("Algo pasa con la base de datos que está vacía");
                    response.sendStatus(404);
                }
                else if (numeros.n > 0) {

                    console.log("El dato se ha borrado satisfactoriamente");
                    response.sendStatus(204);
                }
                else {
                    console.log("no se ha borrado nada ");
                    response.sendStatus(404);
                }

            });

        }
    }
};

module.exports.deleteAll = (request, response) => {

    if (checkdb(db) == false) {
        response.sendStatus(500);
    }
    else {

        db.remove();
        console.log("datos eliminados correctamente");
        response.sendStatus(204);
    }

};



/************MÉTODOS AUXILIARES***********/

var chequeaParametro = function(parametros) {

    if (parametros.country == null || parametros.country == "" ||
        parametros.year == null || parametros.year == "" ||
        parametros["number-of-rape"] == null || parametros["number-of-rape"] == "" ||
        parametros.rate == null || parametros.rate == "" ||
        parametros["total-since-two-thousand"] == null || parametros["total-since-two-thousand"] == "") {

        console.log("hay alguno datos nulos o vacíos");
        return false;
    }
    else {

        if (isNaN(parametros.country) == false || isNaN(parametros.year) == true ||
            isNaN(parametros["number-of-rape"]) == true || isNaN(parametros.rate) == true ||
            isNaN(parametros["total-since-two-thousand"]) == true) {
            console.log("alguno de los parámetros están mal introducidos");
            return false;
        }
        else {
            return true;
        }
    }
};

var compruebaDatosURL = function(pais, anio) {

    if (!pais || !anio || isNaN(pais) == false || isNaN(anio) == true) {
        console.log("Error al introducir el nombre o el año, section 1 getSingleDataNameYear error");
        return false;
    }
    else {
        return true;
    }
};

var filtradoNombreAnio = function(datos, aux, country, year) {

    if (year == null) {
        if (isNaN(country)) {
            datos.filter((x) => {
                return x.country == country;

            }).map((x) => {
                return aux.push(x);
            });
        }
        else {
            datos.filter((x) => {
                return x.year == parseInt(country);
            }).map((x) => {
                return aux.push(x);
            });
        }
    }
    else {
        datos.filter((x) => {
            return x.country == country && x.year == parseInt(year);
        }).map((x) => {
            return aux.push(x);
        });
    }





};

var checkdb = function(database) {

    if (!database || database == null || database.length === 0) {
        console.log("la base de datos está vacía, get all data, section 1");
        return false;
    }
    else {
        return true;
    }

};

var recorreDatos = function(response, desde, hasta, pais, fromIncidence, toIncidence, fromRate, toRate, desdeTotal, hastaTotal) {
    console.log("Estamos en el recorre datos");
    db.find({}).toArray((error, data) => {

        if (error)
            response.sendStatus(500);

        else {

            if (checkdb(data) == false)
                response.send([]);

            else {

                if ((desde && hasta) || (!desde && hasta) || (desde && !hasta))
                    busquedaYear(response, desde, hasta);

                else if (pais)
                    busquedaPais(response, pais);

                else if (fromIncidence && toIncidence)
                    busquedaIncidencia(response, fromIncidence, toIncidence);

                else if (fromRate && toRate)
                    busquedaPorcentaje(response, fromRate, toRate);

                else if (desdeTotal && hastaTotal)
                    buscarTotal(response, desdeTotal, hastaTotal);
                else {
                    console.log("devolviendo todos los datos");
                    response.send(data);
                }
            }
        }
    });

};

var recorreDatosLimitOffset = function(response, limit, offset, desde, hasta,
    pais, fromIncidence, toIncidence, fromRate, toRate, fromTotal, toTotal) {
    console.log("Hemos entrado con limit y offset");
    if (limit < 0 || offset < 0)
        response.send([]);
    else {
        db.find({}).skip(offset).limit(limit).toArray((error, data) => {
            if (error) {
                console.log("Error con la base de datos ");
                response.sendStatus(500);
            }
            else {

                if (checkdb(data) == false) {
                    console.log("section 3 all data error");
                    response.sendStatus(500);

                }
                else {
                    console.log("devolviendo la base de datos completa limit y offset");
                    response.send(data);
                }
            }
        });
    }

};

var busquedaYear = function(response, desde, hasta) {
    var res = [];
    console.log("Hemos entrado en la búsqueda por años");
    db.find({}).toArray((error, data) => {

        if (error)
            response.sendStatus(500);

        else {

            if (checkdb(data) == false)
                response.sendStatus(500);

            else {
                if (desde && hasta) {
                    console.log("Hay from y to");
                    data.filter((x) => {
                        return (x.year >= parseInt(desde) && x.year <= parseInt(hasta));
                    }).map((x) => {
                        return res.push(x);
                    });
                }
                else {

                    if (desde && !hasta) {
                        console.log("Solamente hemos puesto el from");
                        data.filter((x) => {
                            return x.year >= parseInt(desde);
                        }).map((x) => {
                            return res.push(x);
                        });
                    }
                    else {

                        if (!desde && hasta) {
                            console.log("Solamente hemos puesto el to");

                            data.filter((x) => {
                                return x.year <= parseInt(hasta);
                            }).map((x) => {
                                return res.push(x);
                            });
                        }
                    }
                }
                if (res.length == 0) {
                    console.log("No se ha podido encontrar ningún dato con esos parámetros de búsquedas");
                    response.send([]);
                }
                else
                    response.send(res);
            }
        }
    });
};

var busquedaPais = function(response, pais) {
    console.log("Hemos entrado en la búsqueda por países");
    if (isNaN(pais) == false) {
        console.log("el país que has puesto no está formado por caracteres");
        response.send([]);
    }
    else {
        db.find({ country: pais }).toArray((error, data) => {
            if (error) {
                console.log("Error con la base de datos");
                response.sendStatus(500);
            }
            else {
                if (data.length == 0)
                    response.send([]);
                else
                    response.send(data);
            }
        });

    }

};

var busquedaIncidencia = function(response, desdeIncidencia, hastaIncidencia) {
    var res = [];
    console.log("hemos entrado en la busqueda de incidencias");
    if (isNaN(desdeIncidencia) == true || isNaN(hastaIncidencia) == true) {
        console.log("el número de violaciones indicado tiene que ser numérico");
        response.send([]);
    }
    else {
        db.find({}).toArray((error, data) => {

            if (error)
                response.sendStatus(500);
            else {

                if (checkdb(data) == false)
                    response.sendStatus(500);

                else {

                    data.filter((x) => {
                        return (x["number-of-rape"] >= parseInt(desdeIncidencia) && x["number-of-rape"] <= parseInt(hastaIncidencia));
                    }).map((x) => {
                        return res.push(x);
                    });

                    if (res.length == 0)
                        response.send([]);
                    else
                        response.send(res);
                }
            }
        });
    }
};

var busquedaPorcentaje = function(response, fromRate, toRate) {
    var res = [];
    console.log("hemos entrado en la busqueda de porcentajes");
    if (isNaN(fromRate) == true || isNaN(toRate) == true) {
        console.log("el porcentaje buscado tiene que ser numérico");
        response.send([]);
    }
    else {
        db.find({}).toArray((error, data) => {
            if (error)
                response.sendStatus(500);
            else {

                if (checkdb(data) == false)
                    response.sendStatus(500);

                else {

                    data.filter((x) => {
                        return (x.rate >= parseInt(fromRate) && x.rate <= parseInt(toRate));
                    }).map((x) => {
                        return res.push(x);
                    });
                    if (res.length == 0)
                        response.send([]); 
                    else
                        response.send(res);
                }
            }
        });
    }
};

var buscarTotal = (response, desdeTotal, hastaTotal) => {
    var res = [];
    console.log("hemos entrado en el busqueda de totales");
    if (isNaN(desdeTotal) == true || isNaN(hastaTotal) == true) {
        console.log("el porcentaje buscado tiene que ser numérico");
        response.send([]);
    }
    else {

        db.find({}).toArray((error, data) => {

            if (error)
                response.sendStatus(500);
            else {

                if (checkdb(data) == false)
                    response.sendStatus(500);
                else {

                    data.filter((x) => {
                        return x["total-since-two-thousand"] >= parseInt(desdeTotal) &&
                            x["total-since-two-thousand"] <= parseInt(hastaTotal);
                    }).map((x) => {
                        return res.push(x);
                    });

                    if (res.length == 0)
                        response.send([]);

                    else
                        response.send(res);
                }
            }
        });
    }
};
