'use strict';
function classifyDemo(consulta) {
  const q = consulta.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const human = /precio|costo|cuanto cuesta|tarifa|garanti|kilos|soy candidat|apto|apta|elegib|medic|dolor|vomit|sangr|embaraz|diagnost|riesgo personal|cirugia previa|puedo usar|puedo oper|asegur/.test(q);
  return human ? {categoria:'revision_humana', respuesta:'Esta consulta requiere revisión de una persona. La demo no confirma precios, elegibilidad ni resultados clínicos. No se ha enviado una notificación ni agendado una cita. Si describes síntomas intensos o una posible urgencia, busca atención médica inmediata.'} : {categoria:'informacion', respuesta:'Puedes empezar por una evaluación profesional para conocer las alternativas, sus beneficios y riesgos. Gekai presenta información general sobre bariátrica y balón Allurion. La elección requiere una valoración individual. Esta demo no agenda citas.'};
}
if (typeof module !== 'undefined') module.exports = {classifyDemo};
if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-service]').forEach(a => a.addEventListener('click', () => {document.querySelector('#servicio').value = a.dataset.service;}));
  document.querySelector('#demo-form').addEventListener('submit', e => {e.preventDefault(); const form=e.currentTarget; if(!form.reportValidity()) return; const r=classifyDemo(form.consulta.value); const target=document.querySelector('#resultado'); target.replaceChildren(); const tag=document.createElement('strong'); tag.textContent=r.categoria==='informacion'?'Ruta: información general':'Ruta: revisión humana'; const p=document.createElement('p');p.textContent=r.respuesta;target.append(tag,p);});
  const c=window.GEKAI_CONFIG||{};
  for (const [url,label] of [[c.n8nFormUrl,'Abrir formulario n8n ↗'],[c.gptUrl,'Abrir asistente GPT ↗']]) {if(!url) continue;try{const parsed=new URL(url);if(parsed.protocol!=='https:')continue;const a=document.createElement('a');a.className='button small';a.href=parsed.href;a.textContent=label;a.target='_blank';a.rel='noopener noreferrer';document.querySelector('#live-links').append(a);}catch{}}
}

