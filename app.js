// ======================================================
// LA TERRAZA - PROGRAMA DE TAXISTAS
// app.js
// ======================================================

let tipoUsuario = sessionStorage.getItem('tipoUsuario') || 'taxista';
function aplicarPermisosUsuario() {

  const seccionTickets = document.getElementById('seccionTickets');
  const menuTickets = document.getElementById('menuTickets');
  const seccionRegistro = document.getElementById('seccionRegistro');

  // REGISTRAR TICKET: solo cajeros
  if (seccionTickets) {
    seccionTickets.style.display =
      tipoUsuario === 'cajero' ? '' : 'none';

    if (
      tipoUsuario === 'taxista' &&
      seccionTickets.classList.contains('activa')
    ) {
      seccionTickets.classList.remove('activa');
    }
  }

  // Botón del menú "Registrar Ticket": solo cajeros
  if (menuTickets) {
    menuTickets.style.display =
      tipoUsuario === 'cajero' ? '' : 'none';
  }

  // Al entrar como taxista, mostrar Registro de Taxista
  if (tipoUsuario === 'taxista' && seccionRegistro) {
    seccionRegistro.style.display = '';
    seccionRegistro.classList.add('activa');
  }
}
document.addEventListener('DOMContentLoaded', function () {
  aplicarPermisosUsuario();
});
// ------------------------------------------------------
// CONFIGURACIÓN
// ------------------------------------------------------

// Más adelante colocaremos aquí la URL del nuevo flujo
// de Power Automate para registrar taxistas.
const POWER_AUTOMATE_TAXISTA_URL = 'https://default360b5914f0284ef2a7ea9e27a75aac.a8.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/08/workflows/c6b7c2469f344866ac5f60461e86ec5f/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7_RT1iZnqWAlCXT72fcPYQ8wL4lSAufJB6TRlyNojX0';
const POWER_AUTOMATE_TICKET_URL = 'https://default360b5914f0284ef2a7ea9e27a75aac.a8.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/01/workflows/4066e8ddd7c34582b076075659165142/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DXyNtdlu6iNhzOJWvveUEQ3Lx9MyEch61H_T1ifliVM';
const POWER_AUTOMATE_UPDATE_URL = 'https://default360b5914f0284ef2a7ea9e27a75aac.a8.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/21/workflows/e6f757a94e8549f68184d6fbe70ec462/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SrTUPlG0JWlYoMS5v_9OBnJ6dNWQYa8sQhrU-wLZqsQ';
const POWER_AUTOMATE_CREDENCIAL_URL = 'https://default360b5914f0284ef2a7ea9e27a75aac.a8.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/04/workflows/aaea0b3160fe44c480f09a7d67baaaa0/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9O6tyKCv5O_g6FOxzO5XPMzovzAEog3t63qmtQ3qJ8w';
const POWER_AUTOMATE_SALDO_URL = "https://default360b5914f0284ef2a7ea9e27a75aac.a8.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/20/workflows/7b52f6bad623430e89ae2cb47ec79ed0/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cSY_eAypxYHkt0vyeeAClRG8yCKdQUrXcSjZzSx4WTI";
const POWER_AUTOMATE_PAGO_URL = "https://default360b5914f0284ef2a7ea9e27a75aac.a8.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/09/workflows/10ad9f2d3709438fa6649f89be98876b/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VVw4iiB20EUPAIZtD09UlLZUtMzviL96FWJEn6cY9rA";
const POWER_AUTOMATE_ACCESO_URL = 'https://default360b5914f0284ef2a7ea9e27a75aac.a8.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/23/workflows/9735f45e168e415bbf91f9ce2ccb1a7a/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AgxnsT9qpOFmlI-Ue8_0TEyF98l-vu8RhVHyY0uUQCI';
// ------------------------------------------------------
// ELEMENTOS DEL MENÚ
// ------------------------------------------------------

const botonMenu = document.getElementById('botonMenu');
const menuLateral = document.getElementById('menuLateral');
const fondoMenu = document.getElementById('fondoMenu');

const opcionesMenu = document.querySelectorAll('.opcion-menu:not(#menuAccesoPersonal)');
const menuAccesoPersonal = document.getElementById('menuAccesoPersonal');
const modalAccesoPersonal = document.getElementById('modalAccesoPersonal');
if (menuAccesoPersonal) {
  menuAccesoPersonal.addEventListener('click', function () {
    modalAccesoPersonal.style.display = 'flex';
    menuLateral.classList.remove('abierto');
  });
}
const cancelarAccesoPersonal = document.getElementById('cancelarAccesoPersonal');

if (cancelarAccesoPersonal) {
  cancelarAccesoPersonal.addEventListener('click', function () {
    modalAccesoPersonal.style.display = 'none';
    document.getElementById('clavePersonal').value = '';
    document.getElementById('mensajeClavePersonal').textContent = '';
  });
}
const confirmarAccesoPersonal = document.getElementById('confirmarAccesoPersonal');

if (confirmarAccesoPersonal) {
  confirmarAccesoPersonal.addEventListener('click', async function () {
    const clave = document.getElementById('clavePersonal').value.trim();
    const mensaje = document.getElementById('mensajeClavePersonal');

    if (!clave) {
      mensaje.textContent = 'Ingresá la clave de acceso.';
      return;
    }

    mensaje.textContent = 'Verificando...';
    try {
  const respuesta = await fetch(POWER_AUTOMATE_ACCESO_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      clave: clave
    })
  });

  const datos = await respuesta.json();

  if (respuesta.ok && datos.autorizado === true) {
    tipoUsuario = 'cajero';
    sessionStorage.setItem('tipoUsuario', 'cajero');
    modalAccesoPersonal.style.display = 'none';
    document.getElementById('clavePersonal').value = '';
    mensaje.textContent = '';

    aplicarPermisosUsuario();
  } else {
    mensaje.textContent = 'Clave incorrecta';
  }

} catch (error) {
  console.error('Error acceso personal:', error);
  mensaje.textContent = 'No se pudo verificar el acceso.';
}
  });
}
const secciones = document.querySelectorAll('.seccion');


// ------------------------------------------------------
// ABRIR MENÚ
// ------------------------------------------------------

botonMenu.addEventListener('click', function () {

  menuLateral.classList.add('abierto');
  fondoMenu.classList.add('visible');

});


// ------------------------------------------------------
// CERRAR MENÚ
// ------------------------------------------------------

function cerrarMenu() {

  menuLateral.classList.remove('abierto');
  fondoMenu.classList.remove('visible');

}

fondoMenu.addEventListener('click', cerrarMenu);


// ------------------------------------------------------
// CAMBIAR DE SECCIÓN
// ------------------------------------------------------

opcionesMenu.forEach(function (opcion) {

  opcion.addEventListener('click', function () {

    const destino = opcion.dataset.seccion;

    // Sacar selección anterior
    opcionesMenu.forEach(function (item) {
      item.classList.remove('activa');
    });

    // Marcar opción seleccionada
    opcion.classList.add('activa');

    // Ocultar todas las secciones
    secciones.forEach(function (seccion) {
      seccion.classList.remove('activa');
    });

    // Mostrar sección correspondiente
    if (destino === 'credencial') {
  document
    .getElementById('seccionCredencial')
    .classList.add('activa');
}
    if (destino === 'registro') {
      document
        .getElementById('seccionRegistro')
        .classList.add('activa');
    }

    if (destino === 'tickets') {
      document
        .getElementById('seccionTickets')
        .classList.add('activa');
    }

    if (destino === 'saldo') {
      document
        .getElementById('seccionSaldo')
        .classList.add('activa');
    }

    cerrarMenu();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });

});


// ======================================================
// REGISTRO DE TAXISTA
// ======================================================

const formulario = document.getElementById('formRegistroTaxista');

formulario.addEventListener('submit', function (event) {

  event.preventDefault();

  registrarNuevoTaxista();

});


// ------------------------------------------------------
// REGISTRAR NUEVO TAXISTA
// ------------------------------------------------------

function registrarNuevoTaxista() {

  const nombre =
    document.getElementById('nombreNuevo').value.trim();

  const telefono =
    document.getElementById('telefonoNuevo').value.trim();

  const nacionalidad =
    document.getElementById('nacionalidadNuevo').value.trim();

  const paradaAgencia =
    document.getElementById('paradaNuevo').value.trim();

  const dni =
    document.getElementById('dniNuevo').value.trim();

  const correo =
    document.getElementById('correoNuevo').value.trim();

  const aceptaAcuerdo =
    document.getElementById('aceptaAcuerdo').checked;

  const boton =
    document.getElementById('botonNuevo');

  const mensaje =
    document.getElementById('mensajeNuevo');


  // Limpiar mensaje anterior
  mensaje.className = '';
  mensaje.style.display = 'none';
  mensaje.innerHTML = '';


  // ----------------------------------------------------
  // VALIDAR CAMPOS
  // ----------------------------------------------------

  if (
    !nombre ||
    !telefono ||
    !nacionalidad ||
    !paradaAgencia ||
    !dni ||
    !correo
  ) {

    mostrarError(
      'Completá todos los datos para continuar.'
    );

    return;
  }


  // ----------------------------------------------------
  // VALIDAR ACUERDO
  // ----------------------------------------------------

  if (!aceptaAcuerdo) {

    mostrarError(
      'Para registrarte tenés que leer y aceptar el acuerdo.'
    );

    return;
  }


  // ----------------------------------------------------
  // VALIDAR CORREO
  // ----------------------------------------------------

  if (!correoValido(correo)) {

    mostrarError(
      'Ingresá un correo electrónico válido.'
    );

    return;
  }


  // ----------------------------------------------------
  // DATOS QUE ENVIAREMOS A POWER AUTOMATE
  // ----------------------------------------------------

  const datosTaxista = {

    nombre: nombre,
    telefono: telefono,
    nacionalidad: nacionalidad,
    paradaAgencia: paradaAgencia,
    dni: dni,
    correo: correo,
    aceptaAcuerdo: true

  };


  console.log(
    'Datos preparados para Power Automate:',
    datosTaxista
  );


  // ----------------------------------------------------
  // TODAVÍA NO CONECTAMOS POWER AUTOMATE
  // ----------------------------------------------------

  if (!POWER_AUTOMATE_TAXISTA_URL) {

    mensaje.className = 'correcto';

    mensaje.innerHTML =
      '<strong>Formulario correcto.</strong><br><br>' +
      'Los datos están preparados para enviarse a Power Automate.';

    mensaje.style.display = 'block';

    mensaje.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    return;
  }


  // ----------------------------------------------------
  // CUANDO CONECTEMOS POWER AUTOMATE
  // ----------------------------------------------------

  boton.disabled = true;
  boton.textContent = 'REGISTRANDO...';


  fetch(POWER_AUTOMATE_TAXISTA_URL, {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(datosTaxista)

  })

    .then(async function (response) {

      let resultado = {};

      try {

        resultado = await response.json();

      } catch (error) {

        throw new Error(
          'Power Automate no devolvió una respuesta válida.'
        );

      }


      if (!response.ok) {

        throw new Error(
          resultado.mensaje ||
          'No se pudo realizar el registro.'
        );

      }


      if (resultado.ok === false) {

        throw new Error(
          resultado.mensaje ||
          'No se pudo realizar el registro.'
        );

      }


      return resultado;

    })

   .then(function (resultado) {

  boton.disabled = false;
  boton.textContent = 'OBTENER MI NÚMERO';

  if (resultado.yaRegistrado === true) {

    mostrarYaRegistrado(
      resultado.nombre || nombre,
      resultado.numeroTaxista
    );

    return;
  }

  mostrarRegistroCorrecto(
    resultado.nombre || nombre,
    resultado.numeroTaxista
  );

})
    .catch(function (error) {

      console.error(error);

      boton.disabled = false;
      boton.textContent = 'OBTENER MI NÚMERO';

      mostrarError(
        error.message ||
        'No pudimos realizar el registro. Intentá nuevamente.'
      );

    });

}


// ------------------------------------------------------
// REGISTRO CORRECTO
// ------------------------------------------------------
function mostrarRegistroCorrecto(nombre, numeroTaxista) {

  const formulario =
    document.getElementById('formRegistroTaxista');

  const mensaje =
    document.getElementById('mensajeNuevo');

  formulario.style.display = 'none';

  mensaje.className = 'correcto';

  mensaje.innerHTML =
    '<strong style="font-size:20px;">' +
    '¡Gracias, ' + escapar(nombre) + '!' +
    '</strong>' +

    '<br><br>' +

    'Tu registro se realizó correctamente.' +

    '<br><br>' +

    'Tu número de taxista es:' +

    '<br>' +

    '<strong style="font-size:34px;">' +
    escapar(String(numeroTaxista)) +
    '</strong>' +

    '<br><br>' +

    'Guardá este número para identificarte en La Terraza.' +

    '<br>' +

    'También enviamos esta información a tu correo electrónico.';

  mensaje.style.display = 'block';

  mensaje.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });

}
// ------------------------------------------------------
// TAXISTA YA REGISTRADO
// ------------------------------------------------------

function mostrarYaRegistrado(nombre, numeroTaxista) {

  const formulario =
    document.getElementById('formRegistroTaxista');

  const mensaje =
    document.getElementById('mensajeNuevo');

  formulario.style.display = 'none';

  mensaje.className = 'correcto';

  mensaje.innerHTML =
    '<strong style="font-size:20px;">' +
    '¡Hola, ' + escapar(nombre) + '!' +
    '</strong>' +

    '<br><br>' +

    'Este DNI ya se encuentra registrado en el Programa de Taxistas de La Terraza.' +

    '<br><br>' +

    'Tu número de taxista es:' +

    '<br>' +

    '<strong style="font-size:34px;">' +
    escapar(String(numeroTaxista)) +
    '</strong>' +

    '<br><br>' +

    'No es necesario volver a registrarte.';

  mensaje.style.display = 'block';

  mensaje.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });

}

// ------------------------------------------------------
// MOSTRAR ERROR
// ------------------------------------------------------

function mostrarError(texto) {

  const mensaje =
    document.getElementById('mensajeNuevo');

  mensaje.className = 'error';

  mensaje.textContent = texto;

  mensaje.style.display = 'block';


  mensaje.scrollIntoView({

    behavior: 'smooth',
    block: 'center'

  });

}


// ------------------------------------------------------
// VALIDAR CORREO
// ------------------------------------------------------

function correoValido(correo) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

}


// ------------------------------------------------------
// ESCAPAR TEXTO
// Evita insertar HTML recibido desde datos externos
// ------------------------------------------------------

function escapar(texto) {

  const div = document.createElement('div');

  div.textContent = texto ?? '';

  return div.innerHTML;

}
// ======================================================
// CARGA DE TICKET
// ======================================================

const formularioTicket =
  document.getElementById('formRegistroTicket');

if (formularioTicket) {

  formularioTicket.addEventListener('submit', function (event) {

    event.preventDefault();

    probarCargaTicket();

  });

}


// ------------------------------------------------------
// PRUEBA DE CARGA Y CÁLCULO DE COMISIÓN
// ------------------------------------------------------

function probarCargaTicket() {

  const numeroTaxista =
    document.getElementById('numeroTaxistaTicket').value.trim();

  const numeroTicket =
    document.getElementById('numeroTicket').value.trim();

  const importe =
    Number(document.getElementById('importeTicket').value);

  const resultado =
    document.getElementById('resultadoTicket');

  const mensaje =
    document.getElementById('mensajeTicket');


  // Limpiar mensajes anteriores
  mensaje.className = '';
  mensaje.style.display = 'none';
  mensaje.textContent = '';

  resultado.style.display = 'none';


  // Validaciones
  if (!numeroTaxista || !numeroTicket || !importe) {

    mostrarErrorTicket(
      'Completá el número de taxista, número de ticket e importe.'
    );

    return;
  }


  if (importe <= 0) {

    mostrarErrorTicket(
      'El importe de la cuenta debe ser mayor a cero.'
    );

    return;
  }


  // Calcular comisión del 10 %
  const comision = (importe / 1.21) * 0.10;
const datosTicket = {
  numeroTaxista: numeroTaxista,
  numeroTicket: numeroTicket,
  importe: importe,
  comision: comision,
  comisionReal: comision,
  estado: 'Pendiente de pago'
  };
  const botonCargarTicket =
  document.querySelector('#formRegistroTicket button[type="submit"]');

botonCargarTicket.disabled = true;
botonCargarTicket.textContent = 'GUARDANDO TICKET...';
  fetch(POWER_AUTOMATE_TICKET_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(datosTicket)
})
.then(response => response.json())
.then(data => {

  botonCargarTicket.disabled = false;
botonCargarTicket.textContent = 'CARGAR TICKET';

  console.log('Respuesta Power Automate:', data);

  if (data.ticketDuplicado === true) {
    mostrarErrorTicket(
      data.mensaje || 'Este número de ticket ya fue registrado.'
    );
    throw new Error('TICKET_DUPLICADO');
  }
if (data.taxistaNoExiste === true) {
  mostrarErrorTicket(
    data.mensaje || 'El número de taxista no está registrado.'
  );
  throw new Error('TAXISTA_NO_EXISTE');
}
if (data.ok !== true) {
  mostrarErrorTicket(
    data.mensaje || 'El ticket todavía no fue confirmado en Excel.'
  );
  throw new Error('TICKET_NO_CONFIRMADO');
}

  return data;
})

  // Por ahora mostramos el número.
  // Luego Power Automate nos devolverá el nombre real del taxista.
  document.getElementById('resultadoNombreTaxista').textContent =
    'N.º ' + numeroTaxista;

  document.getElementById('resultadoNumeroTicket').textContent =
    numeroTicket;

  document.getElementById('resultadoImporte').textContent =
    formatearPesos(importe);

  document.getElementById('resultadoComision').textContent =
    formatearPesos(comision);


  // Comisión real comienza con el mismo 10 %
  document.getElementById('comisionReal').value =
    comision.toFixed(2);


  // Estado inicial
  document.getElementById('estadoPago').value =
    'Pendiente';


  resultado.style.display = 'block';

  resultado.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })

}


// ------------------------------------------------------
// ERROR DE TICKET
// ------------------------------------------------------

function mostrarErrorTicket(texto) {
const resultado = document.getElementById('resultadoTicket');

if (resultado) {
  resultado.style.display = 'none';
}
  const mensaje =
    document.getElementById('mensajeTicket');

  mensaje.className = 'error';

  mensaje.textContent = texto;

  mensaje.style.display = 'block';

}


// ------------------------------------------------------
// FORMATO PESOS
// ------------------------------------------------------

function formatearPesos(valor) {

  return new Intl.NumberFormat(
    'es-AR',
    {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }
  ).format(valor);

}
const botonActualizarTicket = document.getElementById('botonActualizarTicket');

botonActualizarTicket.addEventListener('click', function () {
  const numeroTicket = document.getElementById('resultadoNumeroTicket').textContent.trim();
  const comisionReal = parseFloat(document.getElementById('comisionReal').value);
  const estado = document.getElementById('estadoPago').value;
  const mensajeActualizacion = document.getElementById('mensajeActualizacion');

mensajeActualizacion.textContent = 'Actualizando comisión...';
mensajeActualizacion.style.display = 'block';

botonActualizarTicket.disabled = true;
botonActualizarTicket.textContent = 'ACTUALIZANDO...';

  console.log('Datos para actualizar:', {
    numeroTicket,
    comisionReal,
    estado
  });

    fetch(POWER_AUTOMATE_UPDATE_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    numeroTicket: numeroTicket,
    comisionReal: comisionReal,
    estado: estado
  })
})
.then(response => response.json())
.then(data => {
  console.log('Respuesta actualización:', data);

  const mensajeActualizacion =
    document.getElementById('mensajeActualizacion');
botonActualizarTicket.disabled = false;
botonActualizarTicket.textContent = 'ACTUALIZAR';
  if (data.ok === true) {
    mensajeActualizacion.innerHTML =
      '✓ Comisión actualizada correctamente<br>Estado: ' + estado;
  } else {
    mensajeActualizacion.textContent =
      data.mensaje || 'No se pudo actualizar la comisión.';
  }

  mensajeActualizacion.style.display = 'block';
})
.catch(error => {
  console.error('ERROR ACTUALIZAR:', error);

  const mensajeActualizacion =
    document.getElementById('mensajeActualizacion');

  mensajeActualizacion.textContent =
    'ERROR: ' + error.message;

  mensajeActualizacion.style.display = 'block';
});
});
// ===============================
// IDIOMA
// ===============================

let idiomaActual = localStorage.getItem('idiomaTaxista') || 'es';

function cambiarIdioma(idioma) {
  idiomaActual = idioma;

  // Recordar idioma elegido
  localStorage.setItem('idiomaTaxista', idioma);

  // Marcar botón activo
  document.getElementById('idiomaES')
    .classList.toggle('activo', idioma === 'es');

  document.getElementById('idiomaPT')
    .classList.toggle('activo', idioma === 'pt');
    if (idioma === 'pt') {
  document.getElementById('textoPrograma').textContent = 'Programa de Taxistas';
  document.getElementById('menuCredencial').textContent = 'Minha Credencial';
document.getElementById('tituloCredencial').textContent = 'Minha Credencial';
document.getElementById('descripcionCredencial').textContent =
  'Digite seu RG / Documento para consultar sua credencial.';
document.getElementById('labelDocumentoCredencial').textContent = 'RG / Documento';
document.getElementById('textoBotonCredencial').textContent = 'BUSCAR CREDENCIAL';
  document.getElementById('menuRegistro').textContent = 'Cadastro de Taxista';
  document.getElementById('menuTickets').textContent = 'Registrar Ticket';
  document.getElementById('menuSaldo').textContent = 'Consultar Saldo';
  document.getElementById('tituloSaldo').textContent = 'Consultar Saldo';
document.getElementById('descripcionSaldo').textContent =
  'Consulte as comissões pendentes de pagamento ou já pagas.';
document.getElementById('labelSaldoTaxista').textContent = 'N.º do Taxista';
document.getElementById('labelSaldoEstado').textContent = 'Status';
document.getElementById('opcionSaldoPendiente').textContent = 'Pendente de pagamento';
document.getElementById('opcionSaldoPagado').textContent = 'Pago';
document.getElementById('opcionSaldoTodos').textContent = 'Todos';
document.getElementById('textoBotonConsultarSaldo').textContent = 'CONSULTAR';
  document.getElementById('tituloRegistro').textContent = 'Cadastro de Taxista';
document.getElementById('descripcionRegistro').textContent =
  'Preencha seus dados para fazer parte do Programa de Taxistas do La Terraza.';

document.getElementById('labelNombre').textContent = 'Nome e sobrenome';
document.getElementById('labelTelefono').textContent = 'Telefone';
document.getElementById('labelNacionalidad').textContent = 'Nacionalidade';
document.getElementById('labelParada').textContent = 'Ponto ou agência';
document.getElementById('labelDni').textContent = 'RG / Documento';
document.getElementById('labelCorreo').textContent = 'E-mail';

document.getElementById('tituloAcuerdo').textContent =
  'Acordo do Programa de Comissões';

document.getElementById('textoAceptacion').textContent =
  'Li e aceito o Acordo do Programa de Comissões do La Terraza.';

document.getElementById('botonNuevo').textContent =
  'OBTER MEU NÚMERO';
  document.getElementById('textoAcuerdo').innerHTML = `
  <p>
    <strong>Comissão:</strong>
   
<p>Ao se cadastrar no Programa de Comissões do La Terraza, o taxista declara conhecer e aceitar as condições estabelecidas neste acordo.</p>

<p>O participante deverá fornecer dados pessoais verdadeiros e atualizados. Após o cadastro, receberá um número único de identificação, que deverá apresentar ao operador do caixa para registrar suas comissões.</p>

<p>Será concedida uma comissão de 10% sobre o valor do consumo de alimentos e bebidas elegíveis, após a dedução do IVA (Imposto sobre Valor Agregado). Não estão incluídas gorjetas, espetáculos, cortesias, descontos e outros valores não relacionados ao consumo.</p>

<p>A comissão será válida exclusivamente para clientes efetivamente encaminhados ao restaurante pelo taxista. Não serão reconhecidas comissões referentes a hóspedes do Iguazú Grand ou Panoramic Grand, reservas realizadas previamente sem a participação do taxista ou visitas posteriores não intermediadas por ele. Será reconhecida apenas uma comissão por comprovante de consumo.</p>

<p>Após a finalização do consumo e o fechamento da conta do cliente, o operador do caixa registrará o comprovante no aplicativo. A comissão poderá ser paga no momento ou permanecer pendente para recebimento posterior.</p>

<p>As comissões serão pagas em pesos argentinos, exclusivamente no Restaurante La Terraza, durante o horário de funcionamento: sextas-feiras e sábados, das 19h às 23h30, e domingos, das 12h às 16h.</p>

<p>O Iguazú Grand reserva-se o direito de verificar os consumos e rejeitar comprovantes duplicados, inválidos ou que não atendam às condições do programa. Também poderá modificar as condições do programa, comunicando as alterações e respeitando as comissões validamente geradas.</p>

<p>Os dados pessoais fornecidos serão utilizados para administrar o programa, verificar as operações e gerenciar os pagamentos correspondentes.</p>

<p>Ao aceitar este acordo, o participante declara ter lido, compreendido e aceitado as condições do Programa de Comissões do La Terraza – Iguazú Grand. A aceitação e sua respectiva data ficarão registradas digitalmente.</p>

`;
} else {
  document.getElementById('textoPrograma').textContent = 'Programa de Taxistas';
  document.getElementById('menuCredencial').textContent = 'Mi Credencial';
document.getElementById('tituloCredencial').textContent = 'Mi Credencial';
document.getElementById('descripcionCredencial').textContent =
  'Ingresá tu DNI / Documento para consultar tu credencial.';
document.getElementById('labelDocumentoCredencial').textContent = 'DNI / Documento';
document.getElementById('textoBotonCredencial').textContent = 'BUSCAR CREDENCIAL';
  document.getElementById('menuRegistro').textContent = 'Registro de Taxista';
  document.getElementById('menuTickets').textContent = 'Cargar Ticket';
  document.getElementById('menuSaldo').textContent = 'Consultar Saldo';
  document.getElementById('tituloSaldo').textContent = 'Consultar Saldo';
document.getElementById('descripcionSaldo').textContent =
  'Consultá las comisiones pendientes de pago o ya abonadas.';
document.getElementById('labelSaldoTaxista').textContent = 'N.º de Taxista';
document.getElementById('labelSaldoEstado').textContent = 'Estado';
document.getElementById('opcionSaldoPendiente').textContent = 'Pendiente de pago';
document.getElementById('opcionSaldoPagado').textContent = 'Pagado';
document.getElementById('opcionSaldoTodos').textContent = 'Todos';
document.getElementById('textoBotonConsultarSaldo').textContent = 'CONSULTAR';
  document.getElementById('tituloRegistro').textContent = 'Registro de Taxista';

document.getElementById('descripcionRegistro').textContent =
  'Completá tus datos para formar parte del Programa de Taxistas de La Terraza.';

document.getElementById('labelNombre').textContent = 'Nombre y apellido';
document.getElementById('labelTelefono').textContent = 'Teléfono';
document.getElementById('labelNacionalidad').textContent = 'Nacionalidad';
document.getElementById('labelParada').textContent = 'Parada o agencia';
document.getElementById('labelDni').textContent = 'DNI / Documento';
document.getElementById('labelCorreo').textContent = 'Correo electrónico';

document.getElementById('tituloAcuerdo').textContent =
  'Acuerdo del Programa de Comisiones';

document.getElementById('textoAceptacion').textContent =
  'He leído y acepto el Acuerdo del Programa de Comisiones de La Terraza.';

document.getElementById('botonNuevo').textContent =
  'OBTENER MI NÚMERO';
  document.getElementById('textoAcuerdo').innerHTML = `
  <p>
    <strong>Comisión:</strong>
   
<p>Al registrarse en el Programa de Comisiones de La Terraza, el taxista declara conocer y aceptar las condiciones establecidas en el presente acuerdo.</p>

<p>El participante deberá proporcionar datos personales verdaderos y actualizados. Una vez registrado, recibirá un número único de identificación que deberá presentar al cajero para registrar sus comisiones.</p>

<p>Se reconocerá una comisión del 10% sobre el consumo de alimentos y bebidas elegibles, descontando previamente el IVA. Quedan excluidos propinas, espectáculos, cortesías, bonificaciones y otros conceptos ajenos al consumo.</p>

<p>La comisión será válida únicamente por clientes efectivamente derivados al restaurante por el taxista. No se reconocerán comisiones por huéspedes de Iguazú Grand o Panoramic Grand, reservas previas sin intervención del taxista ni visitas posteriores no gestionadas por este. Se reconocerá una única comisión por ticket.</p>

<p>Una vez finalizado el consumo y cerrada la cuenta del cliente, el cajero registrará el ticket en la aplicación. La comisión podrá abonarse en el momento o quedar pendiente de pago para su posterior cobro.</p>

<p>Las comisiones se abonarán en pesos argentinos, exclusivamente en el Restaurante La Terraza, durante sus horarios de atención: viernes y sábados de 19:00 a 23:30 hs y domingos de 12:00 a 16:00 hs.</p>

<p>Iguazú Grand se reserva el derecho de verificar los consumos y rechazar tickets duplicados, inválidos o que no cumplan las condiciones del programa. Asimismo, podrá modificar las condiciones del programa, comunicando los cambios correspondientes y respetando las comisiones válidamente generadas.</p>

<p>Los datos personales proporcionados serán utilizados para administrar el programa, verificar las operaciones y gestionar los pagos correspondientes.</p>

<p>Al aceptar este acuerdo, el participante declara haber leído, comprendido y aceptado las condiciones del Programa de Comisiones de La Terraza – Iguazú Grand. La aceptación y su fecha quedarán registradas digitalmente.</p>

`;
}
}

// Cargar el idioma guardado al abrir la app
document.addEventListener('DOMContentLoaded', function () {
  cambiarIdioma(idiomaActual);
});
// ========================================
// CONSULTA DE SALDO DE TAXISTA
// ========================================

const botonConsultarSaldo = document.getElementById('botonConsultarSaldo');

if (botonConsultarSaldo) {
  botonConsultarSaldo.addEventListener('click', async function () {

    const numeroTaxista = document
      .getElementById('saldoNumeroTaxista')
      .value
      .trim();

    const estado = document
      .getElementById('saldoEstado')
      .value;

    const resultado = document.getElementById('resultadoSaldo');

    if (!numeroTaxista) {
      resultado.innerHTML = '<p>Ingresá el número de taxista.</p>';
      return;
    }

    resultado.innerHTML = '<p>Consultando...</p>';

    try {

      const respuesta = await fetch(POWER_AUTOMATE_SALDO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numeroTaxista: numeroTaxista,
          estado: estado
        })
      });

      const datos = await respuesta.json();

      console.log('Respuesta consulta saldo:', datos);

      const cuentas = Array.isArray(datos.cuentas) ? datos.cuentas : [];
      const detalleCuentas = cuentas.map(cuenta => `
  <tr>
<td>${
  cuenta.Fecha
    ? new Date((Number(cuenta.Fecha) - 25569) * 86400 * 1000).toLocaleDateString('es-AR', { timeZone: 'UTC' })
    : '-'
}</td>
    <td>${cuenta['Numero de ticket'] || '-'}</td>
    <td>$ ${Number(cuenta.Importe || 0).toLocaleString('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}</td>
    <td>$ ${Number(cuenta.Comision || 0).toLocaleString('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}</td>
    <td>${cuenta.Estado || '-'}</td>
    <td>${
  cuenta.Estado === 'Pagado' && cuenta['Fecha de pago']
    ? new Date((Number(cuenta['Fecha de pago']) - 25569) * 86400 * 1000).toLocaleDateString('es-AR')
    : '-'
}</td>
    <td>${
  cuenta.Estado === 'Pagado' && cuenta['Hora de pago']
    ? new Date(Number(cuenta['Hora de pago']) * 86400 * 1000).toISOString().slice(11, 16)
    : '-'
}</td>
  </tr>
`).join('');
      resultado.innerHTML = `
  <div class="resultado-saldo">

    <h3>Total de comisión</h3>

    <div class="total-saldo">
    $ ${Number(datos.totalComision || 0).toLocaleString('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}
    </div>
    ${tipoUsuario === 'cajero' && estado === 'Pendiente de pago' && Number(datos.totalComision || 0) > 0 ? `
  <button
    type="button"
    id="botonConfirmarPago"
    class="boton-confirmar-pago"
  >
    REALIZAR PAGO
  </button>
` : ''}

    <table class="tabla-saldo">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Ticket</th>
          <th>Importe</th>
          <th>Comisión</th>
          <th>Estado</th>
          <th>Fecha de pago</th>
          <th>Hora de pago</th>
        </tr>
      </thead>

      <tbody>
        ${detalleCuentas}
      </tbody>
    </table>

  </div>
`;
const botonConfirmarPago = document.getElementById('botonConfirmarPago');

if (botonConfirmarPago) {
  botonConfirmarPago.addEventListener('click', async function () {
    document.getElementById('modalPagoTaxista').textContent =
  `Taxista N.º ${numeroTaxista}`;

document.getElementById('modalPagoTickets').textContent =
  `${cuentas.length} tickets pendientes`;

document.getElementById('modalPagoTotal').textContent =
  `$ ${Number(datos.totalComision || 0).toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

document.getElementById('modalPago').style.display = 'flex';
document.getElementById('cancelarPago').onclick = function () {
  document.getElementById('modalPago').style.display = 'none';
};
document.getElementById('confirmarPago').onclick = async function () {
    const botonProcesarPago = document.getElementById('confirmarPago');
botonProcesarPago.disabled = true;
botonProcesarPago.textContent = 'PROCESANDO PAGO...';
const respuestaPago = await fetch(POWER_AUTOMATE_PAGO_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    numeroTaxista: numeroTaxista
  })
});
if (!respuestaPago.ok) {
  throw new Error('Error al procesar el pago');
}

const datosPago = await respuestaPago.json();

document.getElementById('modalPago').style.display = 'none';
botonProcesarPago.disabled = false;
botonProcesarPago.textContent = 'PAGAR';
document.getElementById('modalPagoExitoso').style.display = 'flex';
document.getElementById('cerrarPagoExitoso').onclick = function () {
  document.getElementById('modalPagoExitoso').style.display = 'none';
  botonConsultarSaldo.click();
};
botonConsultarSaldo.click();
};
});
}
    } catch (error) {

      console.error('Error consulta saldo:', error);

      resultado.innerHTML =
        '<p>No se pudo realizar la consulta.</p>';
    }

  });
}
// ========================================
// MI CREDENCIAL
// ========================================

const botonBuscarCredencial =
  document.getElementById('botonBuscarCredencial');

if (botonBuscarCredencial) {

  botonBuscarCredencial.addEventListener('click', async function () {

    const documento =
      document.getElementById('documentoCredencial').value.trim();

    const resultado =
      document.getElementById('resultadoCredencial');

    if (!documento) {
      resultado.innerHTML =
        '<p class="error">Ingresá tu DNI / Documento.</p>';
      return;
    }

    resultado.innerHTML = '<p>Buscando credencial...</p>';

    try {

      const respuesta = await fetch(POWER_AUTOMATE_CREDENCIAL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          documento: documento
        })
      });

      const datos = await respuesta.json();

      console.log('Respuesta credencial:', datos);
      if (datos.encontrado === true) {
        document.getElementById('documentoCredencial').value = '';

  const documentoCompleto = String(datos.documento || '');
  const ultimos4 = documentoCompleto.slice(-4);
  const documentoOculto =
    '*'.repeat(Math.max(0, documentoCompleto.length - 4)) + ultimos4;

  resultado.innerHTML = `
    <div class="credencial-taxista">

      <div class="credencial-marca">
        IGUAZÚ GRAND
      </div>

      <div class="credencial-titulo">
        LA TERRAZA
      </div>

      <div class="credencial-subtitulo">
        PROGRAMA DE TAXISTAS
      </div>

      <div class="credencial-numero-label">
        N.º DE TAXISTA
      </div>

      <div class="credencial-numero">
        ${escapar(String(datos.numeroTaxista || ''))}
      </div>

      <div class="credencial-nombre">
        ${escapar(datos.nombre || '')}
      </div>

      <div class="credencial-dato">
        Documento: ${escapar(documentoOculto)}
      </div>

      <div class="credencial-dato">
        Parada / Agencia: ${escapar(datos.paradaAgencia || '-')}
      </div>

      <div class="credencial-estado">
        ✓ TAXISTA REGISTRADO
      </div>

    </div>
  `;

} else {

  resultado.innerHTML =
    '<p class="error">El documento ingresado no se encuentra registrado.</p>';

}

    } catch (error) {

      console.error('Error credencial:', error);

      resultado.innerHTML =
        '<p class="error">No se pudo consultar la credencial.</p>';
    }

  });

}