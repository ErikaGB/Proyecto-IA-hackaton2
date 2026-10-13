const formulario = document.getElementById("formularioRiesgo");
const cajaResultado = document.getElementById("resultado");
 
// 2. Cuando el usuario envía el formulario, ejecutamos calcular()
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();   // evita que la página se recargue
  calcular();
});
 
// 3. Función principal: lee datos -> calcula -> muestra
function calcular() {
  // Number() convierte el texto del campo en número
  const datos = {
    cultivo: document.getElementById("cultivo").value,
    temperatura: Number(document.getElementById("temperatura").value),
    lluvia: Number(document.getElementById("lluvia").value),
    humedad: Number(document.getElementById("humedad").value),
    plagas: Number(document.getElementById("plagas").value),
    suelo: document.getElementById("suelo").value,
  };
 
  const riesgos = [
    riesgoHongos(datos),
    riesgoHidrico(datos),
    riesgoCalor(datos),
    riesgoPlagas(datos),
  ];
  mostrar(riesgos, datos.cultivo);
}
 
// 4. Cada función devuelve: { titulo, nivel, mensaje }
//    Los umbrales son de ejemplo: un técnico agrícola debe ajustarlos.
 
function riesgoHongos(d) {
  let puntos = 0;
  if (d.humedad >= 80) puntos++;
  if (d.lluvia >= 60) puntos++;
  if (d.suelo === "humedo") puntos++;
  if (d.temperatura >= 20 && d.temperatura <= 30) puntos++;
  const nivel = puntos >= 4 ? "alto" : puntos >= 2 ? "medio" : "bajo";
  return {
    titulo: "🍄 Hongos por humedad",
    nivel,
    mensaje: nivel === "bajo"
      ? "Condiciones poco favorables para hongos."
      : "Mucha humedad: revisa hojas y frutos, y mejora la ventilación y el drenaje.",
  };
}
 
function riesgoHidrico(d) {
  let puntos = 0;
  if (d.lluvia < 15) puntos++;
  if (d.suelo === "seco") puntos++;
  if (d.humedad < 50) puntos++;
  const nivel = puntos >= 3 ? "alto" : puntos === 2 ? "medio" : "bajo";
  return {
    titulo: "💧 Estrés hídrico",
    nivel,
    mensaje: nivel === "bajo"
      ? "El agua disponible parece suficiente."
      : "Poca agua: considera riego y cobertura del suelo (mulch).",
  };
}
 
function riesgoCalor(d) {
  const nivel = d.temperatura >= 35 ? "alto" : d.temperatura >= 31 ? "medio" : "bajo";
  return {
    titulo: "🌡️ Calor",
    nivel,
    mensaje: nivel === "bajo"
      ? "Temperatura dentro de lo normal."
      : "Temperatura alta: protege con sombra y evita labores al mediodía.",
  };
}
 
function riesgoPlagas(d) {
  const nivel = d.plagas === 2 ? "alto" : d.plagas === 1 ? "medio" : "bajo";
  return {
    titulo: "🐛 Plagas y enfermedades",
    nivel,
    mensaje: nivel === "bajo"
      ? "Sigue inspeccionando tus plantas cada semana."
      : "Hay síntomas: consulta a un técnico para confirmar la causa antes de tratar.",
  };
}
 
// 5. Dibuja los resultados dentro de <div id="resultado">
function mostrar(riesgos, cultivo) {
  let html = `<p><b>Cultivo:</b> ${cultivo}</p>`;
  for (const r of riesgos) {
    html += `
      <div class="riesgo ${r.nivel}">
        <b>${r.titulo}: ${r.nivel.toUpperCase()}</b><br>${r.mensaje}
      </div>`;
  }
  cajaResultado.innerHTML = html;
}