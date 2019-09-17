
=====================================================================
Ejecución en node       
=====================================================================

Antes de ejecutar, se recomienda hacer lo siguiente

npm install -g npm  && npm install

=====================================================================
Uso con node:
=====================================================================

npm start

Puerto configurado 3000.

=====================================================================
Docker: 
=====================================================================

Para montar la infraestructura en docker, con docker-compose ejecutar:

docker-compose up --build

=====================================================================
Servicios:
=====================================================================

GET /lista?desde=<pagina>&cantidad=<Elementos_por_pagina>
    .- Lista los usuarios almacenados en la base de datos

GET /usuario/:id
    .- Obtiene un usuario de la base de datos


POST /usuario
    .- Crea un usuario, se le debe pasar el objeto por body de la petición

PUT /usuario/:id
    .- Actualiza un usuario almacenado

DEL /usuario/:id
    .- Elimina (esta preparado para la eliminación suave) de un usuario.


Respuesta:
En caso de error

    {
        ok:false,
        mensaje:<object>
    }

En caso de exito
    {
        ok:true,
        usuarioBD:<object>
    }

o en el caso de la lista
    {
        ok:true,
        paginations:{
            desde:<0>,
            cantidad:<0>,
            hasta:<0>,
            total:<0>
        },
        usuarios:[]
    }