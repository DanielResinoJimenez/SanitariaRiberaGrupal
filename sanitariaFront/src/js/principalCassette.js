// Obtener referencias a los elementos del DOM

//Nuevo cassete
const btnNuevo = document.getElementById('btnNuevo');

//Detalles de un cassette
const btnBorrarDetalle = document.getElementById('btnBorrarDetalle');
const btnModificarDetalle = document.getElementById('btnModificarDetalle');
const modalCassette = document.getElementById('modalCassette');
const modalModificarCassette = document.getElementById('modalModificarCassette');
const modalConfirmarBorrar = document.getElementById('modalConfirmarBorrar');

//Modal muestra
const modalMuestra = document.getElementById('modalMuestra');
const modalTitle = document.getElementById('modalTitle');
const modalFecha = document.getElementById('modalFecha');
const modalDescripcion = document.getElementById('modalDescripcion');
const modalOrgano = document.getElementById('modalOrgano');
const modalCaracteristicas = document.getElementById('modalCaracteristicas');
const modalObservaciones = document.getElementById('modalObservaciones');
const modalSave = document.getElementById('modalSave');
const modalClose = document.getElementById('modalClose');

//Modal modificar
const modalModificarTitle = document.getElementById('modalModificarTitle');
const modalModificarFecha = document.getElementById('modalModificarFecha');
const modalModificarDescripcion = document.getElementById('modalModificarDescripcion');
const modalModificarOrgano = document.getElementById('modalModificarOrgano');
const modalModificarCaracteristicas = document.getElementById('modalModificarCaracteristicas');
const modalModificarObservaciones = document.getElementById('modalModificarObservaciones');
const modalModificarSave = document.getElementById('modalModificarSave');
const modalModificarClose = document.getElementById('modalModificarClose');
const modalConfirmarBorrarClose = document.getElementById('modalConfirmarBorrarClose');
const modalConfirmarBorrarEliminar = document.getElementById('modalConfirmarBorrarEliminar');

// Fecha y select del header
const organos = document.getElementById('organos');
const fechaInicioInput = document.getElementById('fechaInicioInput');
const fechaFinInput = document.getElementById('fechaFinInput');
const muestra__tbody = document.getElementById('muestra__tbody');
const tbody = document.getElementById("tbody");

const descripcion = document.getElementById('cassette__descripcion');
const organo = document.getElementById('cassette__organo');
const caracteristicas = document.getElementById('cassette__caracteristicas');
const observaciones = document.getElementById('cassette__observaciones');
const id_cassette = document.getElementById("cassette_id")


// Modal Nueva Muestra
const btnNuevaMuestra = document.getElementById('btnNuevaMuestra');
const modalNuevaMuestra = document.getElementById('modalNuevaMuestra');
const modalMuestraSave = document.getElementById('modalMuestraSave');
const modalMuestraClose = document.getElementById('modalMuestraClose');

const urls = {
  backend : 'http://localhost:3000/sanitaria',
  users : '/usuarios/all',
  cassettes : '/cassettes/all',
  cassettes_insert : '/cassettes/create',
  cassettes_update : '/cassettes/modify',
  cassettes_delete : '/cassettes/delete/',
}

let cassettes = [];
let selectedIndex = -1;
let fecha_inicio = '';
let fecha_fin = '';
let filtered_cassettes;


// Actualiza la tabla de cassettes 
const actualizarTabla = (cassetes_to_show) => {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  cassetes_to_show.forEach((cassette, index) => {
    const row = document.createElement('tr');

    const fechaActualizada = document.createElement('td');
    fechaActualizada.classList.add('px-4', 'py-2');
    fechaActualizada.textContent = cassette.fecha;
    row.appendChild(fechaActualizada);

    const descripcionActualizada = document.createElement('td');
    descripcionActualizada.classList.add('px-4', 'py-2');
    descripcionActualizada.textContent = cassette.descripcion;
    row.appendChild(descripcionActualizada);

    const organoActualizado = document.createElement('td');
    organoActualizado.classList.add('px-4', 'py-2');
    organoActualizado.textContent = cassette.organo;
    row.appendChild(organoActualizado);

    row.addEventListener('click', () => {
      mostrarDetalles(index);
    });

    tbody.appendChild(row);
  });
}

// Muestra los detalles de un cassette seleccionado
const mostrarDetalles = (index) => {
  const cassette = cassettes[index];
  descripcion.textContent = cassette.descripcion;
  organo.textContent = cassette.organo;
  caracteristicas.textContent = cassette.caracteristicas;
  observaciones.textContent = cassette.observaciones;
  selectedIndex = index;
  actualizarTablaMuestras();
  mostrarMuestraPorCassette(cassette.id_cassette);
}

// Limpia los detalles de un cassette seleccionado
const limpiarDetalles = () => {
  descripcion.textContent = '---';
  organo.textContent = '---';
  caracteristicas.textContent = '---';
  observaciones.textContent = '---';
  selectedIndex = -1;
}

// Actualiza la tabla de muestras asociadas a un cassette
const actualizarTablaMuestras  = () => {
  const tbody = document.querySelector('section:nth-child(2) tbody');
  tbody.innerHTML = '';
  if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
    const cassette = cassettes[selectedIndex];
    if (cassette.muestras) {
      cassette.muestras.forEach((muestra, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="px-4 py-2">${muestra.fecha}</td>
          <td class="px-4 py-2">${muestra.descripcion}</td>
          <td class="px-4 py-2">${muestra.tincion}</td>
          <td class="px-4 py-2"><button class="muestra__button bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" >Detalles</button></td>
        `;
        tbody.appendChild(row);
      });
    }
  }
}

// Muestra los detalles de una muestra específica
const verDetallesMuestra = (index) => {
  const cassette = cassettes[selectedIndex];
  const muestra = cassette.muestras[index];
  // alert(`Detalles de la muestra:\nFecha: ${muestra.fecha}\nDescripción: ${muestra.descripcion}\nTinción: ${muestra.tincion}\nObservaciones: ${muestra.observaciones}`);
}

// Petición mostrar cassettes desde la api

const cassettesApi = () => {
  cassettes = [];  // Limpiar el array antes de llenarlo
  fetch(urls.backend + urls.cassettes)
  .then(response => response.json())
  .then(data => {data.forEach((cassette) => { 
    cassettes.push(cassette);})
    actualizarTabla(cassettes);}); 
}

// Petición post en la api

const post = (url, data,) => {;

  const url_request = urls.backend + urls[url]

  
  // Usa fetch para hacer la petición POST
  fetch(url_request, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    cassettesApi(); // Recargar la lista completa desde la API
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Petición put en la api

const put = (url, data, id) => {
  const url_request = urls.backend + urls[url] + '/' + id;

  // Usa fetch para hacer la petición PUT
  fetch(url_request, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    cassettesApi();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

// Petición delete en la api

const del = (url, id) => {
  const url_request = urls.backend + urls[url] + id;

  // Usa fetch para hacer la petición DELETE
  fetch(url_request, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    cassettesApi();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

// Maneja el evento de clic en el botón 'Nuevo' para abrir el modal de creación de cassette

btnNuevo.addEventListener('click', () => {
  selectedIndex = -1;
  modalTitle.textContent = 'Nuevo Cassette';
  modalFecha.value = '';
  modalDescripcion.value = '';
  modalOrgano.value = '';
  modalCaracteristicas.value = '';
  modalObservaciones.value = '';
  modalCassette.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

// Maneja el evento de clic en el botón 'Borrar' para abrir el modal de confirmación de borrado

btnBorrarDetalle.addEventListener('click', () => {
  if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
    modalConfirmarBorrar.classList.remove('hidden');
    document.body.classList.add('modal-open');
  } else {
    alert('No hay cassette seleccionado para borrar');
  }
});

// Maneja el evento de clic en el botón 'Modificar' para abrir el modal de modificación de cassette

btnModificarDetalle.addEventListener('click', () => {
  const cassette = cassettes[selectedIndex];
  modalModificarTitle.textContent = 'Modificar Cassette';
  modalModificarFecha.value = cassette.fecha;
  modalModificarDescripcion.value = cassette.descripcion;
  modalModificarOrgano.value = cassette.organo;
  modalModificarCaracteristicas.value = cassette.caracteristicas;
  modalModificarObservaciones.value = cassette.observaciones;
  modalModificarCassette.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

// Maneja el evento de clic en el botón de confirmación de borrado para eliminar un cassette
modalConfirmarBorrarEliminar.addEventListener('click', () => {
  // cassettes.splice(selectedIndex, 1);
  del('cassettes_delete', cassettes[selectedIndex].id_cassette);  
  // localStorage.setItem('cassettes', JSON.stringify(cassettes));
  // limpiarDetalles();
  cassettesApi();
  modalConfirmarBorrar.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// Maneja el evento de clic en el botón de cierre del modal de confirmación de borrado
modalConfirmarBorrarClose.addEventListener('click', () => {
  modalConfirmarBorrar.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// Maneja el evento de clic en el botón de guardar para crear un nuevo cassette
modalSave.addEventListener('click', () => {
  const nuevoCassette = {
    fecha: modalFecha.value,
    descripcion: modalDescripcion.value,
    organo: modalOrgano.value,
    caracteristicas: modalCaracteristicas.value,
    observaciones: modalObservaciones.value,
    identificador: crypto.randomUUID(),
    id_user : 1 // SE DEBE DE COGER DEL LOCAL STORAGE
  };

  post('cassettes_insert', nuevoCassette);
  modalCassette.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cassettesApi();
  actualizarTabla(cassettes);
});

// Maneja el evento de clic en el botón de guardar para modificar un cassette existente
modalModificarSave.addEventListener('click', () => {
  if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
    cassettes[selectedIndex], data = {
      fecha: modalModificarFecha.value,
      descripcion: modalModificarDescripcion.value,
      organo: modalModificarOrgano.value,
      caracteristicas: modalModificarCaracteristicas.value,
      observaciones: modalModificarObservaciones.value
    };

    put("cassettes_update", data, cassettes[selectedIndex].id_cassette);

    // localStorage.setItem('cassettes', JSON.stringify(cassettes));
    modalModificarCassette.classList.add('hidden');
    document.body.classList.remove('modal-open');
    cassettesApi();
    mostrarDetalles(selectedIndex);
  }
});

// Maneja el evento de clic en el botón de cierre del modal de creación de cassette
modalClose.addEventListener('click', () => {
  modalCassette.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// Maneja el evento de clic en el botón de cierre del modal de modificación de cassette
modalModificarClose.addEventListener('click', () => {
  modalModificarCassette.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// Maneja el evento de clic en el botón 'Nueva Muestra' para abrir el modal de creación de muestra
btnNuevaMuestra.addEventListener('click', () => {
  if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
    modalNuevaMuestra.classList.remove('hidden');
    document.body.classList.add('modal-open');
  } else {
    alert('No hay cassette seleccionado para agregar una muestra');
  }
});

// Maneja el evento de clic en el botón de cierre del modal de creación de muestra
modalMuestraClose.addEventListener('click', () => {
  modalNuevaMuestra.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// Maneja el evento de clic en el botón de guardar para crear una nueva muestra
modalMuestraSave.addEventListener('click', () => {
  const nuevaMuestra = {
    //Obtener cada valor de la nueva muestra desde su campo
    fecha: document.getElementById('modalMuestraFecha').value,
    // Obtiene el valor de la fecha de la nueva muestra desde el campo de entrada con ID 'modalMuestraFecha'
    descripcion: document.getElementById('modalMuestraDescripcion').value,
    tincion: document.getElementById('modalMuestraTincion').value,
    observaciones: document.getElementById('modalMuestraObservaciones').value,
    // Obtiene el primer archivo seleccionado, si no hay ningún archivo seleccionado asigna un valor vacío ('')
    imagen: document.getElementById('modalMuestraImagen').files[0] || ''
  };

  // Verifica que el índice seleccionado está dentro del rango válido del array de cassettes
  if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
    const cassette = cassettes[selectedIndex];
    // Si el cassette no tiene muestras, inicializa un array vacío
    if (!cassette.muestras) {
      cassette.muestras = [];
    }
    
    // Añade la nueva muestra al array de muestras del cassette
    cassette.muestras.push(nuevaMuestra);

    // Almacena el array de cassettes en el localStorage
    localStorage.setItem('cassettes', JSON.stringify(cassettes));
    modalNuevaMuestra.classList.add('hidden');
    document.body.classList.remove('modal-open');
    // Actualiza la tabla de muestras 
    actualizarTablaMuestras();
    
  }
});

// Filtra los cassettes por órgano seleccionado
organos.addEventListener('change', () => {

  const organo = organos.value;
  // * --> todos los organos
  if (organo === '*') {
    actualizarTabla(cassettes);
    return;
  }
  const filtered_cassettes = cassettes.filter(cassette => cassette.organo === organo);
  actualizarTabla(filtered_cassettes);
});

// Filtra los cassettes por fecha de inicio
fechaInicioInput.addEventListener('change', () => {
  fecha_inicio = fechaInicioInput.value;
  if (fecha_fin === '') {
    filtered_cassettes = cassettes.filter(cassette => cassette.fecha == fecha_inicio);
  } else {
    filtered_cassettes = cassettes.filter(cassette => cassette.fecha >= fecha_inicio && cassette.fecha <= fecha_fin);
  }
  actualizarTabla(filtered_cassettes);
});

// Filtra los cassettes por fecha de fin
fechaFinInput.addEventListener('change', () => {
  fecha_fin = fechaFinInput.value;
  if (fecha_inicio === '') {
    actualizarTabla(cassettes);
    return;
  }
  filtered_cassettes = cassettes.filter(cassette => cassette.fecha >= fecha_inicio && cassette.fecha <= fecha_fin);
  actualizarTabla(filtered_cassettes);
});

// Cargar muestras de cassettes
const muestras = []
const cargarMuestrasApi = () => {
  fetch("http://localhost:3000/sanitaria/muestras/all")
  .then(response => response.json())
  .then(data => data.forEach((muestra) => {muestras.push(muestra)}));
}

// Inicializa la aplicación cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Función para que al crear un nuevo cassette la fecha no pueda ser anterior al día de hoy
  const fechaInput = document.getElementById('modalFecha');
  const hoy = new Date().toISOString().split('T')[0];
  fechaInput.setAttribute('min', hoy);
  selectedIndex = -1;
  cassettesApi();
  cargarMuestrasApi();
});

// Muestra el modal de detalles de una muestra específica
const mostrarModalMuestra = (muestra) => {
  modalMuestra.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  // TENGO QUE CARGAR LOS DATOS EN EL MODAL DE MUESTRA QUE VIENEN DE EL PARAMETRO MUESTRA DE LA FUNCION
}

// Funciones con muestras

const cargarMuestraTabla = (muestras) => {
  const fragment = document.createDocumentFragment();
  muestras.forEach((muestra) => {
    let tr = document.createElement("tr");
    let fecha = document.createElement("td");
    let descripcion = document.createElement("td");
    let tincion = document.createElement("td");
    fecha.textContent = muestra.fecha_muestra;
    descripcion.textContent = muestra.descripcion;
    tincion.textContent = muestra.tincion;
    tr.appendChild(fecha);
    tr.appendChild(descripcion);
    tr.appendChild(tincion);
    fragment.appendChild(tr);
  })
  muestra__tbody.appendChild(fragment);
}

const mostrarMuestraPorCassette = (id_cassette) => {
  const muestraPorCassette = muestras.filter((mues) => mues.id_cassette == parseInt(id_cassette));
  console.log(muestraPorCassette);
  cargarMuestraTabla(muestraPorCassette);
}

// Añadir muestras a un cassette concreto

const aniadirMuestras = () => {

}

// Maneja el evento de clic en los botones de detalles de muestra en la tabla
muestra__tbody.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('muestra__button')) {
    row_to_find = target.parentElement.parentElement;
    const index_muestra = Array.from(muestra__tbody.children).indexOf(row_to_find);
    muestra_to_show = cassettes[selectedIndex].muestras[index_muestra];
    mostrarModalMuestra(muestra_to_show);
  }
});





