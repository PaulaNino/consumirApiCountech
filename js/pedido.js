//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'http://localhost:8091/api/pedido'

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
        let listaPedidos = data.pedidos
        return listaPedidos.map(function(pedido){
            respuesta+=`<tr><td>${pedido.cliente}</td>`+
            `<td>${pedido.contacto}</td>`+
            `<td>${pedido.ordenTrabajo}</td>`+
            `<td>${pedido.fechaOrdenTrabajo}</td>`+
            `<td>${pedido.fechaEntregaOrdenTrabajo}</td>`+
            `<td>${pedido.formaPago}</td>`+
            `<td>${pedido.valorTotal}</td>`+
            `<td>${pedido.observaciones}</td>`+            
            `<td>${pedido.estado}</td>`+
            `<td><button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(pedido)})'>Editar</button></td>
            <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(pedido)})' type="button">Eliminar</a></td></tr>`
            body.innerHTML = respuesta
        })
    })
    body.innerHTML= respuesta
}


const registrar = async() =>{    
    const validarOrdenTrabajoRespuesta = validarOrdenTrabajo1();
    const validarValorTotalRespuesta = validarValorTotal1 ();
    const validarFechaOrdenTrabajoRespuesta = validarFechaOrdenTrabajo1 ();
    const validarFechaEntregaOrdenTrabajoRespuesta = validarFechaEntregaOrdenTrabajo1 ();
    const validarClienteRespuesta = validarCliente1();
    const validarContactoRespuesta = validarContacto1();

    if (validarOrdenTrabajoRespuesta && validarFechaOrdenTrabajoRespuesta && validarFechaEntregaOrdenTrabajoRespuesta && validarValorTotalRespuesta && validarClienteRespuesta && validarContactoRespuesta ){
        let _cliente = document.getElementById('cliente1').value
        let _contacto = document.getElementById('contacto1').value
        let _ordenTrabajo = document.getElementById('ordenTrabajo1').value
        let _fechaOrdenTrabajo = document.getElementById('fechaOrdenTrabajo1').value
        let _fechaEntregaOrdenTrabajo = document.getElementById('fechaEntregaOrdenTrabajo1').value
        let _formaPago = document.getElementById('formaPago1').value
        let _valorTotal = document.getElementById('valorTotal1').value
        let _observaciones = document.getElementById('observaciones1').value
        let _estado = document.getElementById('estado1').value

        let pedido = {
            cliente : _cliente,
            contacto : _contacto,
            ordenTrabajo : _ordenTrabajo,
            fechaOrdenTrabajo : _fechaOrdenTrabajo,
            fechaEntregaOrdenTrabajo : _fechaEntregaOrdenTrabajo,
            formaPago : _formaPago,
            valorTotal : _valorTotal,
            observaciones : _observaciones,
            estado : _estado
        }

        fetch(url,{
            method: 'POST',
            mode : 'cors',
            body: JSON.stringify(pedido),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'success',
                title: 'El pedido ha sido creado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'listarPedido.html';
            },1000);  
        })
    }
}

validarCliente1 = () => {
    let validarCliente = document.getElementById('cliente1').value
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (validarCliente === null || validarCliente === '' || validarCliente.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre del cliente</span>';
      document.getElementById('errorCliente1').innerHTML = texto;
      return false;
    } else if (validarCliente.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre del cliente debe de ser mayor o igual a 3 letras</span>';
      document.getElementById('errorCliente1').innerHTML = texto;
      return false;
    } else if (!expresion.test(validarCliente)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('errorCliente1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorCliente1').innerHTML = '';
      return true;
    }
};

validarContacto1 = () => {
    let validarContacto = document.getElementById('contacto1').value
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (validarContacto === null || validarContacto === '' || validarContacto.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el contacto de la empresa</span>';
      document.getElementById('errorContacto1').innerHTML = texto;
      return false;
    } else if (validarContacto.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre del contacto debe de ser mayor o igual a 3 letras</span>';
      document.getElementById('errorContacto1').innerHTML = texto;
      return false;
    } else if (!expresion.test(validarContacto)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('errorContacto1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorContacto1').innerHTML = '';
      return true;
    }
};

validarOrdenTrabajo1 = () => {
    let ordenTrabajo = document.getElementById('ordenTrabajo1').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (ordenTrabajo === null || ordenTrabajo === '' || ordenTrabajo.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un numero de orden de trabajo</span   >';
      document.getElementById('errorOrdenTrabajo1').innerHTML = texto;
      return false;
    } else if (!expresion.test(ordenTrabajo)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('errorOrdenTrabajo1').innerHTML = texto;
      return false;
    } else if (ordenTrabajo.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser mayor o igual a 3 caracteres numericos</span>';
      document.getElementById('errorOrdenTrabajo1').innerHTML = texto;
      return false;
    } else if (ordenTrabajo.length > 7) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser menor o igual carcateres numericos</span>';
      document.getElementById('errorOrdenTrabajo1').innerHTML = texto;
      return false;    
    }else{
      document.getElementById('errorOrdenTrabajo1').innerHTML = '';
      return true;
    } 
}

validarValorTotal1 = () => {
    let valorTotal = document.getElementById('valorTotal1').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (valorTotal === null || valorTotal === '' || valorTotal.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el valor total</span   >';
      document.getElementById('errorValorTotal1').innerHTML = texto;
      return false;
    } else if (!expresion.test(valorTotal)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('errorValorTotal1').innerHTML = texto;
      return false;
    } else if (valorTotal.length <= 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El valor total no puede ser menor o igual a 0</span>';
      document.getElementById('errorValorTotal1').innerHTML = texto;
      return false;
    } else{
      document.getElementById('errorValorTotal1').innerHTML = '';
      return true;
    } 
}

validarFechaOrdenTrabajo1 = () => {

    let fechaOrdenTrabajo = document.getElementById('fechaOrdenTrabajo1').value
    let texto;
    let fechaEntregaOrdenTrabajo = document.getElementById('fechaEntregaOrdenTrabajo1').value
    let fechaActual = new Date().toISOString().split('T')[0];
    
    if (fechaOrdenTrabajo === null || fechaOrdenTrabajo === '' || fechaOrdenTrabajo.length === 0) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de la orden de trabajo</span>';
        document.getElementById('errorFechaOrdenTrabajo1').innerHTML = texto;
        return false;
      }else if (fechaOrdenTrabajo > fechaActual){
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede ser mayor a la fecha de registro</span>';
        document.getElementById('errorFechaOrdenTrabajo1').innerHTML = texto;
        return false;
      }else if(fechaOrdenTrabajo > fechaEntregaOrdenTrabajo){
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede ser mayor a la fecha de entrega</span>';
        document.getElementById('errorFechaOrdenTrabajo1').innerHTML = texto;
        return false;
      }else{
        document.getElementById('errorFechaOrdenTrabajo1').innerHTML = '';
      return true;
      }
}

validarFechaEntregaOrdenTrabajo1 = () => {

    let fechaEntregaOrdenTrabajo = document.getElementById('fechaEntregaOrdenTrabajo1').value
    let texto;
    let fechaActual = new Date().toISOString().split('T')[0];
    let fechaOrdenTrabajo = document.getElementById('fechaOrdenTrabajo1').value

    if (fechaEntregaOrdenTrabajo === null || fechaEntregaOrdenTrabajo === '' || fechaEntregaOrdenTrabajo.length === 0) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de entrega de la orden de trabajo</span>';
        document.getElementById('errorFechaEntregaOrdenTrabajo1').innerHTML = texto;
        return false;
      }else if (fechaEntregaOrdenTrabajo < fechaActual){
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede ser menor a la fecha de registro</span>';
        document.getElementById('errorFechaEntregaOrdenTrabajo1').innerHTML = texto;
        return false;
      }else if(fechaEntregaOrdenTrabajo < fechaOrdenTrabajo){
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede ser menor a la fecha de entrega</span>';
        document.getElementById('errorFechaEntregaOrdenTrabajo1').innerHTML = texto;
        return false;
      }else{
        document.getElementById('errorFechaEntregaOrdenTrabajo1').innerHTML = '';
      return true;
      }
}


const ActualizarRegistro = async() =>{
    const validarOrdenTrabajoRespuesta = validarOrdenTrabajo();
    const validarValorTotalRespuesta = validarValorTotal ();
    const validarFechaOrdenTrabajoRespuesta = validarFechaOrdenTrabajo ();
    const validarFechaEntregaOrdenTrabajoRespuesta = validarFechaEntregaOrdenTrabajo ();
    const validarClienteRespuesta = validarCliente();
    const validarContactoRespuesta = validarContacto();

    if (validarOrdenTrabajoRespuesta && validarFechaOrdenTrabajoRespuesta && validarFechaEntregaOrdenTrabajoRespuesta && validarValorTotalRespuesta && validarClienteRespuesta && validarContactoRespuesta ){
        let _cliente = document.getElementById('cliente').value
        let _contacto = document.getElementById('contacto').value
        let _ordenTrabajo = document.getElementById('ordenTrabajo').value
        let _fechaOrdenTrabajo = document.getElementById('fechaOrdenTrabajo').value
        let _fechaEntregaOrdenTrabajo = document.getElementById('fechaEntregaOrdenTrabajo').value
        let _formaPago = document.getElementById('formaPago').value
        let _valorTotal = document.getElementById('valorTotal').value
        let _observaciones = document.getElementById('observaciones').value
        let _estado = document.getElementById('estado').value

        let pedido = {
            cliente : _cliente,
            contacto : _contacto,
            ordenTrabajo : _ordenTrabajo,
            fechaOrdenTrabajo : _fechaOrdenTrabajo,
            fechaEntregaOrdenTrabajo : _fechaEntregaOrdenTrabajo,
            formaPago : _formaPago,
            valorTotal : _valorTotal,
            observaciones : _observaciones,
            estado : _estado
        }

        fetch(url,{
            method: 'PUT',
            mode : 'cors',
            body: JSON.stringify(pedido),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'info',
                title: 'El pedido ha sido modificado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'listarPedido.html';
            },1000);  
        })

    }
}

validarCliente = () => {
    let validarCliente = document.getElementById('cliente').value
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (validarCliente === null || validarCliente === '' || validarCliente.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre del cliente</span>';
      document.getElementById('errorCliente').innerHTML = texto;
      return false;
    } else if (validarCliente.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre del cliente debe de ser mayor o igual a 3 letras</span>';
      document.getElementById('errorCliente').innerHTML = texto;
      return false;
    } else if (!expresion.test(validarCliente)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('errorCliente').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorCliente').innerHTML = '';
      return true;
    }
};

validarContacto = () => {
    let validarContacto = document.getElementById('contacto').value
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (validarContacto === null || validarContacto === '' || validarContacto.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el contacto de la empresa</span>';
      document.getElementById('errorContacto').innerHTML = texto;
      return false;
    } else if (validarContacto.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre del contacto debe de ser mayor o igual a 3 letras</span>';
      document.getElementById('errorContacto').innerHTML = texto;
      return false;
    } else if (!expresion.test(validarContacto)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('errorContacto').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorContacto').innerHTML = '';
      return true;
    }
};

validarOrdenTrabajo = () => {
    let ordenTrabajo = document.getElementById('ordenTrabajo').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (ordenTrabajo === null || ordenTrabajo === '' || ordenTrabajo.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un numero de orden de trabajo</span   >';
      document.getElementById('errorOrdenTrabajo').innerHTML = texto;
      return false;
    } else if (!expresion.test(ordenTrabajo)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('errorOrdenTrabajo').innerHTML = texto;
      return false;
    } else if (ordenTrabajo.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser mayor o igual a 3 caracteres numericos</span>';
      document.getElementById('errorOrdenTrabajo').innerHTML = texto;
      return false;
    } else if (ordenTrabajo.length > 7) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser menor o igual carcateres numericos</span>';
      document.getElementById('errorOrdenTrabajo').innerHTML = texto;
      return false;    
    }else{
      document.getElementById('errorOrdenTrabajo').innerHTML = '';
      return true;
    } 
}

validarValorTotal = () => {
    let valorTotal = document.getElementById('valorTotal').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (valorTotal === null || valorTotal === '' || valorTotal.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el valor total</span   >';
      document.getElementById('errorValorTotal').innerHTML = texto;
      return false;
    } else if (!expresion.test(valorTotal)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('errorValorTotal').innerHTML = texto;
      return false;
    } else if (valorTotal.length <= 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El valor total no puede ser menor o igual a 0</span>';
      document.getElementById('errorValorTotal').innerHTML = texto;
      return false;
    } else{
      document.getElementById('errorValorTotal').innerHTML = '';
      return true;
    } 
}

validarFechaOrdenTrabajo = () => {

    let fechaOrdenTrabajo = document.getElementById('fechaOrdenTrabajo').value
    let texto;
    let fechaEntregaOrdenTrabajo = document.getElementById('fechaEntregaOrdenTrabajo').value
    let fechaActual = new Date().toISOString().split('T')[0];
    
    if (fechaOrdenTrabajo === null || fechaOrdenTrabajo === '' || fechaOrdenTrabajo.length === 0) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de la orden de trabajo</span>';
        document.getElementById('errorFechaOrdenTrabajo').innerHTML = texto;
        return false;
      }else if (fechaOrdenTrabajo > fechaActual){
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede ser mayor a la fecha de registro</span>';
        document.getElementById('errorFechaOrdenTrabajo').innerHTML = texto;
        return false;
      }else if(fechaOrdenTrabajo > fechaEntregaOrdenTrabajo){
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede ser mayor a la fecha de entrega</span>';
        document.getElementById('errorFechaOrdenTrabajo').innerHTML = texto;
        return false;
      }else{
        document.getElementById('errorFechaOrdenTrabajo').innerHTML = '';
      return true;
      }
}

validarFechaEntregaOrdenTrabajo = () => {

    let fechaEntregaOrdenTrabajo = document.getElementById('fechaEntregaOrdenTrabajo').value
    let texto;
    let fechaActual = new Date().toISOString().split('T')[0];
    let fechaOrdenTrabajo = document.getElementById('fechaOrdenTrabajo').value

    if (fechaEntregaOrdenTrabajo === null || fechaEntregaOrdenTrabajo === '' || fechaEntregaOrdenTrabajo.length === 0) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de entrega de la orden de trabajo</span>';
        document.getElementById('errorFechaEntregaOrdenTrabajo').innerHTML = texto;
        return false;
      }else if (fechaEntregaOrdenTrabajo < fechaActual){
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede ser menor a la fecha de registro</span>';
        document.getElementById('errorFechaEntregaOrdenTrabajo').innerHTML = texto;
        return false;
      }else if(fechaEntregaOrdenTrabajo < fechaOrdenTrabajo){
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede ser menor a la fecha de entrega</span>';
        document.getElementById('errorFechaEntregaOrdenTrabajo').innerHTML = texto;
        return false;
      }else{
        document.getElementById('errorFechaEntregaOrdenTrabajo').innerHTML = '';
      return true;
      }
}


const editar = (pedido) => {
    document.getElementById('cliente').value = pedido.cliente;
    document.getElementById('contacto').value = pedido.contacto;
    document.getElementById('ordenTrabajo').value = pedido.ordenTrabajo;
    document.getElementById('fechaOrdenTrabajo').value = pedido.fechaOrdenTrabajo;
    document.getElementById('fechaEntregaOrdenTrabajo').value = pedido.fechaEntregaOrdenTrabajo;
    document.getElementById('formaPago').value = pedido.formaPago;
    document.getElementById('valorTotal').value = pedido.valorTotal;
    document.getElementById('observaciones').value = pedido.observaciones;    
    document.getElementById('estado').value = pedido.estado;     
  }

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
            let pedido = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(pedido),//Convertir el objeto _usuario a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(() =>{
                Swal.fire(
                    'Eliminado!',
                    'El empleado ha sido eliminado.',
                    'success',
                    );
                setTimeout(() =>{
                    window.location.href = 'listarPedido.html';
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