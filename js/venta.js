//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'https://apicountech-7wn1.onrender.com/api/ventas'

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
      let listaVentas = data.ventas
      return listaVentas.map(function (ventas) {
        const fechaVenta = new Date(ventas.fechaVenta)
        const formattedFechaVenta = fechaVenta.toISOString().split('T')[0]
        respuesta += `<tr><td>${ventas.idPedido}</td>` +
          `<td>${formattedFechaVenta}</td>` +
          `<td>${ventas.valorTotal}</td>` +
          `<td>${ventas.formaDePago}</td>` +
          `<td>${ventas.observaciones}</td>` +
          `<td>${ventas.estado}</td>` +
          `<td><button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(ventas)})'>Editar</button></td>
            <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(ventas)})' type="button">Eliminar</a></td></tr>`
        body.innerHTML = respuesta
      })
    })
  body.innerHTML = respuesta
}


const registrar = async () => {
  const validarIdPedidoRespuesta = validarPedido();
  const validarFechaVentaRespuesta = validarFechaVenta();
  const validarValorTotalRespuesta = validarValorTotal();

  if (validarIdPedidoRespuesta && validarFechaVentaRespuesta && validarValorTotalRespuesta) {
    let _idPedido = document.getElementById('idPedido').value
    let _fechaVenta = document.getElementById('fechaVenta').value
    let _valorTotal = document.getElementById('valorTotal').value
    let _formaDePago = document.getElementById('formaDePago').value
    let _observaciones = document.getElementById('observaciones').value
    let _estado = document.getElementById('estado').value

    let ventas = {
      idPedido: _idPedido,
      fechaVenta: _fechaVenta,
      valorTotal: _valorTotal,
      formaDePago: _formaDePago,
      observaciones: _observaciones,
      estado: _estado
    }

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(ventas),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(json => {
        Swal.fire({
          icon: 'success',
          title: 'La venta ha sido creado exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = 'listarVenta.html';
        }, 1000);
      })
  }
}


//VALIDACIONES
validarPedido = () => {
  let pedido = document.getElementById('idPedido').value;
  let texto;
  let expresion = /[0-9]/;

  if (pedido === null || pedido === '' || pedido.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un número de pedido</span   >';
    document.getElementById('errorPedido').innerHTML = texto;
    return false;
  } else if (!expresion.test(pedido)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite números</span>';
    document.getElementById('errorPedido').innerHTML = texto;
    return false;
  } else if (pedido.length < 3) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El número de pedido debe ser mayor a 3 caracteres numericos</span>';
    document.getElementById('errorPedido').innerHTML = texto;
    return false;
  } else if (pedido.length > 10) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El número de pedido debe ser menor a 10 caracteres numericos</span>';
    document.getElementById('errorPedido').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorPedido').innerHTML = '';
    return true;
  }
}

validarFechaVenta = () => {
  let fechaVenta = document.getElementById('fechaVenta').value
  let texto;

  if (fechaVenta === null || fechaVenta === '' || fechaVenta.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de venta</span>';
    document.getElementById('errorFechaVenta').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorFechaVenta').innerHTML = '';
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
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite números</span>';
    document.getElementById('errorValorTotal').innerHTML = texto;
    return false;
  } else if (valorTotal.length <= 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El valor total no puede ser menor o igual a 0</span>';
    document.getElementById('errorValorTotal').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorValorTotal').innerHTML = '';
    return true;
  }
}




const ActualizarRegistro = async () => {
  const validarIdPedidoRespuesta = validarPedido1();
  const validarFechaVentaRespuesta = validarFechaVenta1();
  const validarValorTotalRespuesta = validarValorTotal1();

  if (validarIdPedidoRespuesta && validarFechaVentaRespuesta && validarValorTotalRespuesta) {
    let _idPedido = document.getElementById('idPedido1').value
    let _fechaVenta = document.getElementById('fechaVenta1').value
    let _valorTotal = document.getElementById('valorTotal1').value
    let _formaDePago = document.getElementById('formaDePago1').value
    let _observaciones = document.getElementById('observaciones1').value
    let _estado = document.getElementById('estado1').value

    let ventas = {
      idPedido: _idPedido,
      fechaVenta: _fechaVenta,
      valorTotal: _valorTotal,
      formaDePago: _formaDePago,
      observaciones: _observaciones,
      estado: _estado
    }

    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(ventas),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(json => {
        Swal.fire({
          icon: 'info',
          title: 'La venta ha sido modificada exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = 'listarVenta.html';
        }, 1000);
      })
  }
}


//VALIDACIONES
validarPedido1 = () => {
  let pedido = document.getElementById('idPedido1').value;
  let texto;
  let expresion = /[0-9]/;

  if (pedido === null || pedido === '' || pedido.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un numero de pedido</span   >';
    document.getElementById('errorPedido1').innerHTML = texto;
    return false;
  } else if (!expresion.test(pedido)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
    document.getElementById('errorPedido1').innerHTML = texto;
    return false;
  } else if (pedido.length < 3) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de identidad tiene que ser mayor a 6 caracteres numericos</span>';
    document.getElementById('errorPedido1').innerHTML = texto;
    return false;
  } else if (pedido.length > 11) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de identidad tiene que ser menor a 11 carcateres numericos</span>';
    document.getElementById('errorPedido1').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorPedido1').innerHTML = '';
    return true;
  }
}

validarFechaVenta1 = () => {
  let fechaVenta = document.getElementById('fechaVenta1').value
  let texto;

  if (fechaVenta === null || fechaVenta === '' || fechaVenta.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de ingreso del empleado</span>';
    document.getElementById('errorFechaVenta1').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorFechaVenta1').innerHTML = '';
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
  } else {
    document.getElementById('errorValorTotal1').innerHTML = '';
    return true;
  }
}






const editar = (ventas) => {
  document.getElementById('idPedido1').value = ventas.idPedido;
  const fechaVenta = new Date(ventas.fechaVenta)
  const formattedFechaVenta = fechaVenta.toISOString().split('T')[0]
  document.getElementById('fechaVenta1').value = formattedFechaVenta;
  document.getElementById('valorTotal1').value = ventas.valorTotal;
  document.getElementById('formaDePago1').value = ventas.formaDePago;
  document.getElementById('observaciones1').value = ventas.observaciones;
  document.getElementById('estado1').value = ventas.estado;
}




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
      let ventas = {
        _id: id
      }
      fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify(ventas),//Convertir el objeto _usuario a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }).then(() => {
        Swal.fire(
          'Eliminado!',
          'la venta ha sido eliminada.',
          'success',
        );
        setTimeout(() => {
          window.location.href = 'listarVenta.html';
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