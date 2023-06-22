//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'https://apicountech-7wn1.onrender.com/api/abonos'

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
      let listaAbonos = data.abonos
      return listaAbonos.map(function (abonos) {
        const fechaAbono = new Date(abonos.fechaAbono)
        const formattedFechaAbono = fechaAbono.toISOString().split('T')[0]
        respuesta += `<tr><td>${abonos.idVenta}</td>` +
          `<td>${formattedFechaAbono}</td>` +
          `<td>${abonos.valorAbono}</td>` +
          `<td>${abonos.estado}</td>` +
          `<td><button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(abonos)})'>Editar</button></td>
            <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(abonos)})' type="button">Eliminar</a></td></tr>`
        body.innerHTML = respuesta
      })
    })
  body.innerHTML = respuesta
}


const registrar = async () => {
  const validarVentaRespuesta = validarVenta();
  const validarFechaAbonoRespuesta = validarFechaAbono();
  const validarValorAbonoRespuesta = validarValorAbono();

  if (validarVentaRespuesta && validarFechaAbonoRespuesta && validarValorAbonoRespuesta) {
    let _idVenta = document.getElementById('idVenta').value
    let _fechaAbono = document.getElementById('fechaAbono').value
    let _valorAbono = document.getElementById('valorAbono').value
    let _estado = document.getElementById('estado').value

    let abonos = {
      idVenta: _idVenta,
      fechaAbono: _fechaAbono,
      valorAbono: _valorAbono,
      estado: _estado
    }

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(abonos),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(json => {
        Swal.fire({
          icon: 'success',
          title: 'El abono ha sido creado exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = 'listarAbono.html';
        }, 1000);
      })
  }
}

//VALIDACIONES
validarFechaAbono = () => {
  let fechaAbono = document.getElementById('fechaAbono').value
  let texto;
  let fechaActual = new Date();

  if (fechaAbono === null || fechaAbono === '' || fechaAbono.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de abono</span>';
    document.getElementById('errorFechaAbono').innerHTML = texto;
    return false;
  } else if (fechaAbono > fechaActual) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha de abono no puede superar la fecha actual</span>';
    document.getElementById('errorFechaAbono').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorFechaAbono').innerHTML = '';
    return true;
  }
}

validarValorAbono = () => {
  let valorAbono = document.getElementById('valorAbono').value;
  let texto;
  let expresion = /[0-9]/;

  if (valorAbono === null && valorAbono === '') {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el valor del abono</span   >';
    document.getElementById('errorValorAbono').innerHTML = texto;
    return false;
  } else if (!expresion.test(valorAbono)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el valor del abono</span>';
    document.getElementById('errorValorAbono').innerHTML = texto;
    return false;
  } else if (valorAbono <= 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El valor del abono no puede ser menor o igual a 0</span>';
    document.getElementById('errorValorAbono').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorValorAbono').innerHTML = '';
    return true;
  }
}

validarVenta = () => {
  let venta = document.getElementById('idVenta').value;
  let texto;
  let expresion = /[0-9]/;

  if (venta === null || venta === '' || venta.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un numero de venta</span   >';
    document.getElementById('errorVenta').innerHTML = texto;
    return false;
  } else if (!expresion.test(venta)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
    document.getElementById('errorVenta').innerHTML = texto;
    return false;
  } else if (venta.length < 3) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El id de venta debe que ser mayor a 3 caracteres numericos</span>';
    document.getElementById('errorVenta').innerHTML = texto;
    return false;
  } else if (venta.length > 10) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El id de venta debe que ser menor a 10 caracteres numericos</span>';
    document.getElementById('errorVenta').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorVenta').innerHTML = '';
    return true;
  }
}



const actualizarRegistro = async () => {
  const validarFechaAbonoRespuesta = validarFechaAbono1();
  const validarValorAbonoRespuesta = validarValorAbono1();

  if (validarFechaAbonoRespuesta && validarValorAbonoRespuesta) {
    let _id = document.getElementById('id1').value
    let _idVenta = document.getElementById('idVenta1').value
    let _fechaAbono = document.getElementById('fechaAbono1').value
    let _valorAbono = document.getElementById('valorAbono1').value
    let _estado = document.getElementById('estado1').value

    let abonos = {
      _id:_id,
      idVenta: _idVenta,
      fechaAbono: _fechaAbono,
      valorAbono: _valorAbono,
      estado: _estado
    }
    console.log(abonos)

    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(abonos),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(json => {
        Swal.fire({
          icon: 'info',
          title: 'El abono ha sido modificado exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = 'listarAbono.html';
        }, 1000);
      })
  }
}

//VALIDACIONES
validarFechaAbono1 = () => {
  let fechaAbono = document.getElementById('fechaAbono1').value
  let texto;
  let fechaActual = new Date();

  if (fechaAbono === null || fechaAbono === '' || fechaAbono.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de abono</span>';
    document.getElementById('errorFechaAbono1').innerHTML = texto;
    return false;
  } else if (fechaAbono > fechaActual) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha de abono no puede superar la fecha actual</span>';
    document.getElementById('errorFechaAbono1').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorFechaAbono1').innerHTML = '';
    return true;
  }
}

validarValorAbono1 = () => {
  let valorAbono = document.getElementById('valorAbono1').value;
  let texto;
  let expresion = /[0-9]/;

  if (valorAbono === null && valorAbono === '') {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el valor del abono</span   >';
    document.getElementById('errorValorAbono1').innerHTML = texto;
    return false;
  } else if (!expresion.test(valorAbono)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el valor del abono</span>';
    document.getElementById('errorValorAbono1').innerHTML = texto;
    return false;
  } else if (valorAbono <= 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El valor del abono no puede ser menor o igual a 0</span>';
    document.getElementById('errorValorAbono1').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorValorAbono1').innerHTML = '';
    return true;
  }
}


const editar = (abonos) => {
  document.getElementById('idVenta1').value = abonos.idVenta;
  const fechaAbono = new Date(abonos.fechaAbono)
  const formattedFechaAbono = fechaAbono.toISOString().split('T')[0]
  document.getElementById('fechaAbono1').value = formattedFechaAbono;
  document.getElementById('valorAbono1').value = abonos.valorAbono;
  document.getElementById('estado1').value = abonos.estado;
  document.getElementById('id1').value = abonos._id;
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
      let abonos = {
        _id: id
      }
      fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify(abonos),//Convertir el objeto _usuario a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }).then(() => {
        Swal.fire(
          'Eliminado!',
          'la venta ha sido eliminada.',
          'success',
        );
        setTimeout(() => {
          window.location.href = 'listarAbono.html';
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
    .addEventListener('click', actualizarRegistro)
}