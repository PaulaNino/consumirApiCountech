//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'http://localhost:8091/api/empleado'

const listarDatos= async()=>{
    let respuesta=''
    let body = document.getElementById('contenido')
    //url de donde se tiene la api
    //consultar/ trabajar apis desde javascript
    fetch (url,{
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp)=> resp.json())
    .then(function(data){
        let listaEmpleados = data.empleados
        return listaEmpleados.map(function(empleado){
            respuesta+=`<tr><td>${empleado.tipoDocumento}</td>`+
            `<td>${empleado.cedula}</td>`+
            `<td>${empleado.nombres}</td>`+
            `<td>${empleado.apellidos}</td>`+
            `<td>${empleado.correo}</td>`+
            `<td>${empleado.telefono}</td>`+
            `<td>${empleado.ciudad}</td>`+
            `<td>${empleado.direccion}</td>`+
            `<td>${empleado.fechaIngreso}</td>`+
            `<td>${empleado.estado}</td>`+
            `<td><button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(empleado)})'>Editar</button></td>
            <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(empleado)})' type="button">Eliminar</a></td></tr>`
            body.innerHTML = respuesta
        })
    })
    body.innerHTML= respuesta
}

   /* const registrar = async() =>{
        let _tipoDocumento = document.getElementById('tipoDocumento1').value  
        let _cedula = document.getElementById('cedula1').value 
        let _nombres = document.getElementById('nombres1').value 
        let _apellidos = document.getElementById('apellidos1').value 
        let _correo = document.getElementById('correo1').value 
        let _telefono = document.getElementById('telefono1').value 
        let _ciudad = document.getElementById('ciudad1').value 
        let _direccion = document.getElementById('direccion1').value 
        let _fechaIngreso = document.getElementById('fechaIngreso1').value 
        let _estado = document.getElementById('estado1').value 

        let empleado = {
            tipoDocumento : _tipoDocumento,
            cedula : _cedula,
            nombres : _nombres,
            apellidos : _apellidos,
            correo : _correo,
            telefono : _telefono,
            ciudad : _ciudad,
            direccion : _direccion,
            fechaIngreso : _fechaIngreso,
            estado : _estado
        }
        fetch(url,{
            method: 'POST',
            mode : 'cors',
            body: JSON.stringify(empleado),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            alert(json.msg);
        })
    }  */


    const registrar = async() =>{
        const validarNombresRespuesta1 = validarNombres1 ();
        const validarApellidosRespuesta1 = validarApellidos1 ();
        const validarCedulaRespuesta1 = validarCedula1();
        const validarCiudadRespuesta1 = validarCiudad1 ();
        const validarTelefonoRespuesta1 = validarTelefono1 ();
        const validarFechaIngresoRespuesta1 = validarFechaIngreso1 ();
        const validarCorreoRespuesta1 = validarCorreo1 ();
        const validarDireccionRespuesta1 = validarDireccion1 ();

        if(validarNombresRespuesta1 && validarApellidosRespuesta1 &&  validarCedulaRespuesta1 && validarCiudadRespuesta1 && validarTelefonoRespuesta1 && validarFechaIngresoRespuesta1 && validarCorreoRespuesta1 && validarDireccionRespuesta1){
        let _tipoDocumento = document.getElementById('tipoDocumento1').value  
        let _cedula = document.getElementById('cedula1').value 
        let _nombres = document.getElementById('nombres1').value 
        let _apellidos = document.getElementById('apellidos1').value 
        let _correo = document.getElementById('correo1').value 
        let _telefono = document.getElementById('telefono1').value 
        let _ciudad = document.getElementById('ciudad1').value 
        let _direccion = document.getElementById('direccion1').value 
        let _fechaIngreso = document.getElementById('fechaIngreso1').value 
        let _estado = document.getElementById('estado1').value 


            let empleado = {
                tipoDocumento : _tipoDocumento,
                cedula : _cedula,
                nombres : _nombres,
                apellidos : _apellidos,
                correo : _correo,
                telefono : _telefono,
                ciudad : _ciudad,
                direccion : _direccion,
                fechaIngreso : _fechaIngreso,
                estado : _estado
            }
            fetch(url,{
                method: 'POST',
                mode : 'cors',
                body: JSON.stringify(empleado),
                headers:{"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp)=> resp.json())
            .then(json => {
                Swal.fire({
                    icon: 'success',
                    title: 'El empleado ha sido creado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                  });
                setTimeout(() =>{
                    window.location.href = 'listarEmpleado.html';
                },1000);  
            })
        }      
    }

    validarNombres1 = () => {
        let nombre = document.getElementById('nombres1').value;
        let texto;
        let expresion = /[a-zA-Z]/;
      
        if (nombre === null || nombre === '' || nombre.length === 0) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un nombre</span>';
          document.getElementById('errorNombres1').innerHTML = texto;
          return false;
        } else if (nombre.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre debe de ser mayor o igual a 3 letras</span>';
          document.getElementById('errorNombres1').innerHTML = texto;
          return false;
        } else if (!expresion.test(nombre)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
          document.getElementById('errorNombres1').innerHTML = texto;
          return false;
        } else {
          document.getElementById('errorNombres1').innerHTML = '';
          return true;
        }
    };

      validarApellidos1 = () => {
        let nombre = document.getElementById('apellidos1').value;
        let texto;
        let expresion = /[a-zA-Z]/;
      
        if (nombre === null || nombre === '' || nombre.length === 0) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un nombre</span>';
          document.getElementById('errorApellidos1').innerHTML = texto;
          return false;
        } else if (nombre.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre debe de ser mayor o igual a 3 letras</span>';
          document.getElementById('errorApellidos1').innerHTML = texto;
          return false;
        } else if (!expresion.test(nombre)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
          document.getElementById('errorApellidos1').innerHTML = texto;
          return false;
        } else {
          document.getElementById('errorApellidos1').innerHTML = '';
          return true;
        }
    };

      validarCedula1 = () => {
        let cedula = document.getElementById('cedula1').value;
        let texto;
        let expresion = /[0-9]/;
      
        if (cedula === null || cedula === '' || cedula.length === 0) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese su numero de identificación</span   >';
          document.getElementById('errorCedula1').innerHTML = texto;
          return false;
        } else if (!expresion.test(cedula)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite</span>';
          document.getElementById('errorCedula1').innerHTML = texto;
          return false;
        } else if (cedula.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su cedula tiene que ser mayor a 6 caracteres numericos</span>';
          document.getElementById('errorCedula1').innerHTML = texto;
          return false;
        } else if (cedula.length > 13) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su cédula tiene que ser menor a 13 carcateres numericos</span>';
          document.getElementById('errorCedula1').innerHTML = texto;
          return false;    
        }else{
          document.getElementById('errorCedula1').innerHTML = '';
          return true;
        } 
    };
    
    validarCiudad1 = () => {
        let ciudad = document.getElementById('ciudad1').value;
        let texto;
        let expresion = /[a-zA-Z]/;
      
        if (ciudad === null || ciudad === '' || ciudad.length === 0) {
         
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la ciudad de residencia</span>';
          document.getElementById('errorCiudad1').innerHTML = texto;
          return false;
        } else if (ciudad.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre de la ciudad debe de ser mayor a 3 letras</span>';
          document.getElementById('errorCiudad1').innerHTML = texto;
          return false;
        } else if (!expresion.test(ciudad)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
          document.getElementById('errorCiudad1').innerHTML = texto;
          return false;
        } else {
          document.getElementById('errorCiudad1').innerHTML = '';
          return true;
        }
    };

      validarTelefono1 = () => {
        let telefono = document.getElementById('telefono1').value.trim();
        let texto;
        let expresion = /^[0-9]+$/;
      
        if (!telefono) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese el número de teléfono.</span>';
            document.getElementById('errorTelefono1').innerHTML = texto;
            return false;
        } else if (telefono.length < 10) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su número de teléfono debe tener al menos 10 dígitos.</span>';
            document.getElementById('errorTelefono1').innerHTML = texto;
            return false;
        } else if (!expresion.test(telefono)) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo números en su número de teléfono.</span>';
            document.getElementById('errorTelefono1').innerHTML = texto;
            return false;
        }else{
          document.getElementById('errorTelefono1').innerHTML = '';
          return true;
        }
    };

    validarFechaIngreso1 = () => {
        let fechaIngreso = document.getElementById('fechaIngreso1').value
        let texto;
    
    if (fechaIngreso === null || fechaIngreso === '' || fechaIngreso.length === 0) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de ingreso del empleado</span>';
            document.getElementById('errorFechaIngreso1').innerHTML = texto;
            return false;
          }else{
            document.getElementById('errorFechaIngreso1').innerHTML = '';
          return true;
          }
    }
    
    validarCorreo1 = () => {
        let correo = document.getElementById('correo1').value.trim();
        let texto;
        let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;3
      
        if (!correo) {      
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese el correo electrónico.</span>';
            document.getElementById('errorCorreo1').innerHTML = texto;
            return false;
        } else if (!expresion.test(correo)) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de correo electrónico válida.</span>';
            document.getElementById('errorCorreo1').innerHTML = texto;
            return false;
        }else {
          document.getElementById('errorCorreo1').innerHTML = '';
          return true;
        }
    }
    
    validarDireccion1 = () => {
        let direccion = document.getElementById('direccion1').value.trim();
        let texto;
        let expresion = /^[a-zA-Z0-9\s'#,-]*$/;
      
        if (!direccion) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese una dirección de residencia.</span>';
            document.getElementById('errorDireccion1').innerHTML = texto;
            return false;
        } else if (direccion.length < 5) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La dirección de residencia debe tener al menos 5 caracteres.</span>';
            document.getElementById('errorDireccion1').innerHTML = texto;
            return false;
        } else if (!expresion.test(direccion)) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia válida.</span>';
            document.getElementById('errorDireccion1').innerHTML = texto;
            return false;
        }else{
          document.getElementById('errorDireccion1').innerHTML = '';
          return true;
        } 
    };


    const editar = (empleado) => {
        document.getElementById('tipoDocumento').value = empleado.tipoDocumento;
        document.getElementById('cedula').value = empleado.cedula;
        document.getElementById('nombres').value = empleado.nombres;
        document.getElementById('apellidos').value = empleado.apellidos;
        document.getElementById('correo').value = empleado.correo;
        document.getElementById('telefono').value = empleado.telefono;
        document.getElementById('ciudad').value = empleado.ciudad;
        document.getElementById('direccion').value = empleado.direccion;
        document.getElementById('fechaIngreso').value = empleado.fechaFormateada;
        document.getElementById('estado').value = empleado.estado;     
    }

/*    const ActualizarRegistro = async() =>{

        let _tipoDocumento = document.getElementById('tipoDocumento').value  
        let _cedula = document.getElementById('cedula').value 
        let _nombres = document.getElementById('nombres').value 
        let _apellidos = document.getElementById('apellidos').value 
        let _correo = document.getElementById('correo').value 
        let _telefono = document.getElementById('telefono').value 
        let _ciudad = document.getElementById('ciudad').value 
        let _direccion = document.getElementById('direccion').value 
        let _fechaIngreso = document.getElementById('fechaIngreso').value 
        let _estado = document.getElementById('estado').value 

        let empleado = {
            tipoDocumento : _tipoDocumento,
            cedula : _cedula,
            nombres : _nombres,
            apellidos : _apellidos,
            correo : _correo,
            telefono : _telefono,
            ciudad : _ciudad,
            direccion : _direccion,
            fechaIngreso : _fechaIngreso,
            estado : _estado
        }
        fetch(url,{
            method: 'PUT',
            mode : 'cors',
            body: JSON.stringify(empleado),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            alert(json.msg);
        })
    } */


    const ActualizarRegistro = async() =>{

        const validarNombresRespuesta = validarNombres ();
        const validarApellidosRespuesta = validarApellidos ();
        const validarCedulaRespuesta = validarCedula();
        const validarCiudadRespuesta = validarCiudad ();
        const validarTelefonoRespuesta = validarTelefono ();
        const validarFechaIngresoRespuesta = validarFechaIngreso ();
        const validarCorreoRespuesta = validarCorreo ();
        const validarDireccionRespuesta = validarDireccion ();

        if(validarNombresRespuesta && validarApellidosRespuesta && validarCedulaRespuesta && validarCiudadRespuesta && validarTelefonoRespuesta && validarFechaIngresoRespuesta && validarCorreoRespuesta && validarDireccionRespuesta){
        let _tipoDocumento = document.getElementById('tipoDocumento').value  
        let _cedula = document.getElementById('cedula').value 
        let _nombres = document.getElementById('nombres').value 
        let _apellidos = document.getElementById('apellidos').value 
        let _correo = document.getElementById('correo').value 
        let _telefono = document.getElementById('telefono').value 
        let _ciudad = document.getElementById('ciudad').value 
        let _direccion = document.getElementById('direccion').value 
        let _fechaIngreso = document.getElementById('fechaIngreso').value 
        let _estado = document.getElementById('estado').value 

        let empleado = {
            tipoDocumento : _tipoDocumento,
            cedula : _cedula,
            nombres : _nombres,
            apellidos : _apellidos,
            correo : _correo,
            telefono : _telefono,
            ciudad : _ciudad,
            direccion : _direccion,
            fechaIngreso : _fechaIngreso,
            estado : _estado
        }
        fetch(url,{
            method: 'PUT',
            mode : 'cors',
            body: JSON.stringify(empleado),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'info',
                title: 'El Empleado ha sido modificado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'listarEmpleado.html';
            },1000);
        })
        }
    }


    validarNombres = () => {
        let nombre = document.getElementById('nombres').value;
        let texto;
        let expresion = /[a-zA-Z]/;
      
        if (nombre === null || nombre === '' || nombre.length === 0) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un nombre</span>';
          document.getElementById('errorNombres').innerHTML = texto;
          return false;
        } else if (nombre.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre debe de ser mayor o igual a 3 letras</span>';
          document.getElementById('errorNombres').innerHTML = texto;
          return false;
        } else if (!expresion.test(nombre)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
          document.getElementById('errorNombres').innerHTML = texto;
          return false;
        } else {
          document.getElementById('errorNombres').innerHTML = '';
          return true;
        }
    };

    validarApellidos = () => {
        let nombre = document.getElementById('apellidos').value;
        let texto;
        let expresion = /[a-zA-Z]/;
      
        if (nombre === null || nombre === '' || nombre.length === 0) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un nombre</span>';
          document.getElementById('errorApellidos').innerHTML = texto;
          return false;
        } else if (nombre.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre debe de ser mayor o igual a 3 letras</span>';
          document.getElementById('errorApellidos').innerHTML = texto;
          return false;
        } else if (!expresion.test(nombre)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
          document.getElementById('errorApellidos').innerHTML = texto;
          return false;
        } else {
          document.getElementById('errorApellidos').innerHTML = '';
          return true;
        }
    };

    validarCedula = () => {
        let cedula = document.getElementById('cedula').value;
        let texto;
        let expresion = /[0-9]/;
      
        if (cedula === null || cedula === '' || cedula.length === 0) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese su numero de identificación</span   >';
          document.getElementById('errorCedula').innerHTML = texto;
          return false;
        } else if (!expresion.test(cedula)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite</span>';
          document.getElementById('errorCedula').innerHTML = texto;
          return false;
        } else if (cedula.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su cedula tiene que ser mayor a 6 caracteres numericos</span>';
          document.getElementById('errorCedula').innerHTML = texto;
          return false;
        } else if (cedula.length > 13) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su cédula tiene que ser menor a 13 carcateres numericos</span>';
          document.getElementById('errorCedula').innerHTML = texto;
          return false;    
        }else{
          document.getElementById('errorCedula').innerHTML = '';
          return true;
        } 
    }
    
    validarCiudad = () => {
        let ciudad = document.getElementById('ciudad').value;
        let texto;
        let expresion = /[a-zA-Z]/;
      
        if (ciudad === null || ciudad === '' || ciudad.length === 0) {
         
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la ciudad de residencia</span>';
          document.getElementById('errorCiudad').innerHTML = texto;
          return false;
        } else if (ciudad.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre de la ciudad debe de ser mayor a 3 letras</span>';
          document.getElementById('errorCiudad').innerHTML = texto;
          return false;
        } else if (!expresion.test(ciudad)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
          document.getElementById('errorCiudad').innerHTML = texto;
          return false;
        } else {
          document.getElementById('errorCiudad').innerHTML = '';
          return true;
        }
    };

      validarTelefono = () => {
        let telefono = document.getElementById('telefono').value.trim();
        let texto;
        let expresion = /^[0-9]+$/;
      
        if (!telefono) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese el número de teléfono.</span>';
            document.getElementById('errorTelefono').innerHTML = texto;
            return false;
        } else if (telefono.length < 10) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su número de teléfono debe tener al menos 10 dígitos.</span>';
            document.getElementById('errorTelefono').innerHTML = texto;
            return false;
        } else if (!expresion.test(telefono)) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo números en su número de teléfono.</span>';
            document.getElementById('errorTelefono').innerHTML = texto;
            return false;
        }else{
          document.getElementById('errorTelefono').innerHTML = '';
          return true;
        }
    };

    validarFechaIngreso = () => {
        let fechaIngreso = document.getElementById('fechaIngreso').value
        let texto;
    
    if (fechaIngreso === null || fechaIngreso === '' || fechaIngreso.length === 0) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de ingreso del empleado</span>';
            document.getElementById('errorFechaIngreso').innerHTML = texto;
            return false;
          }else{
            document.getElementById('errorFechaIngreso').innerHTML = '';
          return true;
          }
    }
    
    validarCorreo = () => {
        let correo = document.getElementById('correo').value.trim();
        let texto;
        let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;3
      
        if (!correo) {      
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese el correo electrónico.</span>';
            document.getElementById('errorCorreo').innerHTML = texto;
            return false;
        } else if (!expresion.test(correo)) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de correo electrónico válida.</span>';
            document.getElementById('errorCorreo').innerHTML = texto;
            return false;
        }else {
          document.getElementById('errorCorreo').innerHTML = '';
          return true;
        }
    }
    
    validarDireccion = () => {
        let direccion = document.getElementById('direccion').value.trim();
        let texto;
        let expresion = /^[a-zA-Z0-9\s'#,-]*$/;
      
        if (!direccion) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese una dirección de residencia.</span>';
            document.getElementById('errorDireccion').innerHTML = texto;
            return false;
        } else if (direccion.length < 5) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La dirección de residencia debe tener al menos 5 caracteres.</span>';
            document.getElementById('errorDireccion').innerHTML = texto;
            return false;
        } else if (!expresion.test(direccion)) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia válida.</span>';
            document.getElementById('errorDireccion').innerHTML = texto;
            return false;
        }else{
          document.getElementById('errorDireccion').innerHTML = '';
          return true;
        } 
    };


    const eliminar = (id) =>{

        Swal.fire({
            title: 'Estas seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminarlo!'
          }).then((result) => {
            if (result.isConfirmed) {
                let empleado = {
                    _id: id
                }
                fetch (url,{
                    method: 'DELETE',
                    mode: 'cors',
                    body: JSON.stringify(empleado),//Convertir el objeto _usuario a un JSON
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                }).then(() =>{
                    Swal.fire(
                        'Eliminado!',
                        'El empleado ha sido eliminado.',
                        'success',
                        );
                    setTimeout(() =>{
                        window.location.href = 'listarEmpleado.html';
                    },1000);  
                })
            }
          })
    }

    if(document.querySelector('#btnRegistrar')){
        document.querySelector('#btnRegistrar')
        .addEventListener('click',registrar)
    }

    if(document.querySelector('#btnActualizar')){
        document.querySelector('#btnActualizar')
        .addEventListener('click',ActualizarRegistro)
    }

   