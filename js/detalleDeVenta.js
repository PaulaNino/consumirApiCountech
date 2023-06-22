//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'https://apicountech-7wn1.onrender.com/api/detalleDeVenta'

const listarDatos = async () => {
  let respuesta = ''
  let body = document.getElementById('contenido')
  //url de donde se tiene la api
  //consultar/ trabajar apis desde javascript
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaDetalleDeVenta = data.detalleDeVenta
      return listaDetalleDeVenta.map(function (detalleDeVenta) {
        const fechaOrdenTrabajo = new Date(detalleDeVenta.fechaOrdenTrabajo)
        const formattedFechaOrdenTrabajo = fechaOrdenTrabajo.toISOString().split('T')[0]

        const fechaEntregaOrden = new Date(detalleDeVenta.fechaEntregaOrden)
        const formattedFechaEntregaOrden = fechaEntregaOrden.toISOString().split('T')[0]

        respuesta += `<tr><td>${detalleDeVenta.idVenta}</td>` +
        `<td>${detalleDeVenta.cliente}</td>`+
        `<td>${detalleDeVenta.contacto}</td>`+
        `<td>${detalleDeVenta.ordenTrabajo}</td>`+
        `<td>${formattedFechaOrdenTrabajo}</td>`+
        `<td>${formattedFechaEntregaOrden}</td>`+
        `<td>${detalleDeVenta.observaciones}</td>` +
        `<td>${detalleDeVenta.referencia}</td>` +
        `<td>${detalleDeVenta.proceso}</td>` +
        `<td>${detalleDeVenta.color}</td>` +
        `<td>${detalleDeVenta.talla}</td>` +
        `<td><button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#ModalEdit" onclick='editar(${JSON.stringify(detalleDeVenta)})'>Editar</button></td>
        <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(detalleDeVenta)})' type="button">Eliminar</a></td></tr>`
        body.innerHTML = respuesta
      })
    })
  body.innerHTML = respuesta
}


const registrar = async () => {
    const validarClienteRespuesta = validarCliente();
    const validarContactoRespuesta = validarContacto();
    const validarVentaRespuesta = validarVenta();
    const validarOrdenTrabajoRespuesta = validarOrdenTrabajo();
    const validarFechaOrdenTrabajoRespuesta = validarFechaOrdenTrabajo ();
    const validarFechaEntregaOrdenRespuesta = validarFechaEntregaOrden ();
    const validarReferenciaRespuesta = validarReferencia ();
    const validarColorRespuesta = validarColor ();
    

    if (validarVentaRespuesta && validarOrdenTrabajoRespuesta && validarFechaOrdenTrabajoRespuesta && validarFechaEntregaOrdenRespuesta && validarClienteRespuesta && validarContactoRespuesta && validarColorRespuesta && validarReferenciaRespuesta){
        let _idVenta = document.getElementById('idVenta').value
        let _cliente = document.getElementById('cliente').value
        let _contacto = document.getElementById('contacto').value
        let _ordenTrabajo = document.getElementById('ordenTrabajo').value
        let _fechaOrdenTrabajo = document.getElementById('fechaOrdenTrabajo').value
        let _fechaEntregaOrden = document.getElementById('fechaEntregaOrden').value
        let _observaciones = document.getElementById('observaciones').value
        let _referencia = document.getElementById('referencia').value
        let _proceso = document.getElementById('proceso').value
        let _color = document.getElementById('color').value
        let _talla = document.getElementById('talla').value


    let detalleDeVenta = {
      idVenta: _idVenta,
      cliente: _cliente,
      contacto: _contacto,
      ordenTrabajo: _ordenTrabajo,
      fechaOrdenTrabajo: _fechaOrdenTrabajo,
      fechaEntregaOrden: _fechaEntregaOrden,
      observaciones: _observaciones,
      referencia: _referencia,
      proceso: _proceso,
      color: _color,
      talla: _talla
    }

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(detalleDeVenta),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(json => {
        Swal.fire({
          icon: 'success',
          title: 'El detalle de venta ha sido creado exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = 'listarDetalleDeVenta.html';
        }, 1000);
      })
  }
}



//VALIDACIONES
validarVenta = () => {
  let ordenTrabajo = document.getElementById('idVenta').value;
  let texto;
  let expresion = /[0-9]/;

  if (ordenTrabajo === null || ordenTrabajo === '' || ordenTrabajo.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un número de venta</span   >';
    document.getElementById('errorVenta').innerHTML = texto;
    return false;
  } else if (!expresion.test(ordenTrabajo)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite números</span>';
    document.getElementById('errorVenta').innerHTML = texto;
    return false;
  } else if (ordenTrabajo.length < 3) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El número tiene que ser mayor o igual a 3 caracteres numericos</span>';
    document.getElementById('errorVenta').innerHTML = texto;
    return false;
  } else if (ordenTrabajo.length > 10) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El número tiene que ser menor o igual a 10 carcateres numericos</span>';
    document.getElementById('errorVenta').innerHTML = texto;
    return false;    
  }else{
    document.getElementById('errorVenta').innerHTML = '';
    return true;
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


validarFechaOrdenTrabajo = () => {

  let fechaOrdenTrabajo = document.getElementById('fechaOrdenTrabajo').value
  let texto;
  let fechaEntregaOrdenTrabajo = document.getElementById('fechaEntregaOrden').value
  let fechaActual = new Date().toISOString().split('T')[0];
  
  if (fechaOrdenTrabajo === null || fechaOrdenTrabajo === '' || fechaOrdenTrabajo.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de la orden de trabajo</span>';
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


validarFechaEntregaOrden = () => {

  let fechaEntregaOrden = document.getElementById('fechaEntregaOrden').value
  let texto;
  let fechaOrdenTrabajo = document.getElementById('fechaOrdenTrabajo').value

  if (fechaEntregaOrden === null || fechaEntregaOrden === '' || fechaEntregaOrden.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de entrega de la orden de trabajo</span>';
      document.getElementById('errorFechaEntregaOrden').innerHTML = texto;
      return false;
  }else if(fechaEntregaOrden < fechaOrdenTrabajo){
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede ser menor a la fecha de orden de trabajo</span>';
      document.getElementById('errorFechaEntregaOrden').innerHTML = texto;
      return false;
    }else{
      document.getElementById('errorFechaEntregaOrden').innerHTML = '';
    return true;
    }
}



validarColor = () => {
  let validarContacto = document.getElementById('color').value
  let texto;
  let expresion = /[a-zA-Z]/;

  if (validarContacto === null || validarContacto === '' || validarContacto.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el color</span>';
    document.getElementById('errorColor').innerHTML = texto;
    return false;
  } else if (!expresion.test(validarContacto)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
    document.getElementById('errorColor').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorColor').innerHTML = '';
    return true;
  }
};


validarReferencia = () => {
  let ordenTrabajo = document.getElementById('referencia').value;
  let texto;
  let expresion = /[0-9]/;

  if (ordenTrabajo === null || ordenTrabajo === '' || ordenTrabajo.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la referencia</span   >';
    document.getElementById('errorReferencia').innerHTML = texto;
    return false;
  } else if (!expresion.test(ordenTrabajo)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
    document.getElementById('errorReferencia').innerHTML = texto;
    return false;
  } else if (ordenTrabajo.length < 3) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser mayor o igual a 3 caracteres numericos</span>';
    document.getElementById('errorReferencia').innerHTML = texto;
    return false;
  } else if (ordenTrabajo.length > 7) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser menor o igual a 7 carcateres numericos</span>';
    document.getElementById('errorReferencia').innerHTML = texto;
    return false;    
  }else{
    document.getElementById('errorReferencia').innerHTML = '';
    return true;
  } 
}





const ActualizarRegistro = async () => {
  const validarReferenciaRespuesta = validarReferencia1 ();
  const validarColorRespuesta = validarColor1 ();
  

  if (validarColorRespuesta && validarReferenciaRespuesta){
      let _id = document.getElementById('id1').value
      let _idVenta = document.getElementById('idVenta1').value
      let _cliente = document.getElementById('cliente1').value
      let _contacto = document.getElementById('contacto1').value
      let _ordenTrabajo = document.getElementById('ordenTrabajo1').value
      let _fechaOrdenTrabajo = document.getElementById('fechaOrdenTrabajo1').value
      let _fechaEntregaOrden = document.getElementById('fechaEntregaOrden1').value
      let _observaciones = document.getElementById('observaciones1').value
      let _referencia = document.getElementById('referencia1').value
      let _proceso = document.getElementById('proceso1').value
      let _color = document.getElementById('color1').value
      let _talla = document.getElementById('talla1').value


  let detalleDeVenta = {
    _id:_id,
    idVenta: _idVenta,
    cliente: _cliente,
    contacto: _contacto,
    ordenTrabajo: _ordenTrabajo,
    fechaOrdenTrabajo: _fechaOrdenTrabajo,
    fechaEntregaOrden: _fechaEntregaOrden,
    observaciones: _observaciones,
    referencia: _referencia,
    proceso: _proceso,
    color: _color,
    talla: _talla
  }

  fetch(url, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(detalleDeVenta),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(json => {
      Swal.fire({
        icon: 'success',
        title: 'El detalle de venta ha sido modificado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        window.location.href = 'listarDetalleDeVenta.html';
      }, 1000);
    })
}
}

//VALIDACIONES
validarColor1 = () => {
  let validarContacto = document.getElementById('color1').value
  let texto;
  let expresion = /[a-zA-Z]/;

  if (validarContacto === null || validarContacto === '' || validarContacto.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el color</span>';
    document.getElementById('errorColor1').innerHTML = texto;
    return false;
  } else if (!expresion.test(validarContacto)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
    document.getElementById('errorColor1').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorColor1').innerHTML = '';
    return true;
  }
};


validarReferencia1 = () => {
  let ordenTrabajo = document.getElementById('referencia1').value;
  let texto;
  let expresion = /[0-9]/;

  if (ordenTrabajo === null || ordenTrabajo === '' || ordenTrabajo.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la referencia</span   >';
    document.getElementById('errorReferencia1').innerHTML = texto;
    return false;
  } else if (!expresion.test(ordenTrabajo)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
    document.getElementById('errorReferencia1').innerHTML = texto;
    return false;
  } else if (ordenTrabajo.length < 3) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser mayor o igual a 3 caracteres numericos</span>';
    document.getElementById('errorReferencia1').innerHTML = texto;
    return false;
  } else if (ordenTrabajo.length > 7) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser menor o igual a 7 carcateres numericos</span>';
    document.getElementById('errorReferencia1').innerHTML = texto;
    return false;    
  }else{
    document.getElementById('errorReferencia1').innerHTML = '';
    return true;
  } 
}




const editar = (detalleDeVenta) => {
  const fechaOrdenTrabajo = new Date(detalleDeVenta.fechaOrdenTrabajo);
  const formattedFechaOrdenTrabajo = fechaOrdenTrabajo.toISOString().split('T')[0];
  console.log(formattedFechaOrdenTrabajo)

  const fechaEntregaOrden = new Date(detalleDeVenta.fechaEntregaOrden);
  const formattedFechaEntregaOrden = fechaEntregaOrden.toISOString().split('T')[0];
  console.log(formattedFechaEntregaOrden)

  document.getElementById('idVenta1').value = detalleDeVenta.idVenta;
  document.getElementById('cliente1').value = detalleDeVenta.cliente;
  document.getElementById('contacto1').value = detalleDeVenta.contacto;
  document.getElementById('ordenTrabajo1').value = detalleDeVenta.ordenTrabajo;
  document.getElementById('fechaOrdenTrabajo1').value = formattedFechaOrdenTrabajo;
  document.getElementById('fechaEntregaOrden1').value = formattedFechaEntregaOrden;
  document.getElementById('observaciones1').value = detalleDeVenta.observaciones;
  document.getElementById('referencia1').value = detalleDeVenta.referencia;
  document.getElementById('proceso1').value = detalleDeVenta.proceso;
  document.getElementById('color1').value = detalleDeVenta.color;
  document.getElementById('talla1').value = detalleDeVenta.talla;
  document.getElementById('id1').value = detalleDeVenta._id;
};



const eliminar = (id) => {

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
      let detalleDeVenta = {
        _id: id
      }
      fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify(detalleDeVenta),//Convertir el objeto _usuario a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }).then(() => {
        Swal.fire(
          'Eliminado!',
          'El detalle de venta ha sido eliminado.',
          'success',
        );
        setTimeout(() => {
          window.location.href = 'listarDetalleDeVenta.html';
        }, 1000);
      })
    }
  })
}

if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar')
    .addEventListener('click', registrar)
}

if (document.querySelector('#btnActualizar')) {
  document.querySelector('#btnActualizar')
    .addEventListener('click', ActualizarRegistro)
}