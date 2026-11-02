/* ================= CarReviews v17 – additions to voice.html =================
   loaded by voice.html after the main script. Adds:
   - "מעלדונגען" page (reports + company requests)
   - hide a review only with a written reason, show again, remove with a reason
   - publish a voice message only after "word for word" is confirmed            */

const REASONS17 = { spam:'ספאם', abuse:'באליידיגונג / סטראשען', fake:'פאלש', conflict_of_interest:'שייכות צו א קאמפאני', privacy:'פריוואטקייט', legal:'געזעץ', other:'אנדערש' };
const RSTAT17 = { new:['נייע','p-blue'], under_review:['מען קוקט','p-purple'], kept:['געלאזט / פארטיג','p-green'], hidden:['פארשטעקט','p-orange'], removed:['אויסגעמעקט','p-red'] };
let reports = [], repRevs = {}, hiddenMap = {}, repF = 'open';

const newRep = () => reports.filter(r => r.status === 'new').length;
const pendRev17 = () => reviews.filter(r => !r.approved && !hiddenMap[r.id]).length;

/* nav: reviews counter without hidden ones + new page */
PAGES[PAGES.findIndex(p => p[0] === 'reviews')][3] = pendRev17;
PAGES.splice(PAGES.findIndex(p => p[0] === 'recs'), 0, ['reports', 'ban', 'מעלדונגען', newRep]);

/* ---------- data ---------- */
async function loadReportsData(){
  const { data, error } = await sb.from('review_reports').select('*').order('created_at', { ascending:false }).limit(300);
  if (error) { reports = []; toast(error.message, true); return; }
  reports = data || [];
  repRevs = {};
  const ids = [...new Set(reports.map(r => r.review_id).filter(Boolean))];
  if (ids.length) {
    const { data: rv } = await sb.from('reviews').select('id,company_id,comment,created_at,approved,hidden_at,hidden_reason').in('id', ids);
    (rv || []).forEach(x => { repRevs[x.id] = x; });
  }
}
async function loadHiddenData(){
  hiddenMap = {};
  try {
    const { data, error } = await sb.from('reviews').select('id,hidden_at,hidden_reason,hidden_note').not('hidden_at', 'is', null);
    if (!error) (data || []).forEach(x => { hiddenMap[x.id] = x; });
  } catch (e) {}
}
window.loadAll = async function(){
  await Promise.all([loadSettingsData(), loadPhonesData(), loadReviewsData(), loadMessagesData(), loadCompaniesData(), loadProblemsData(), loadReportsData(), loadHiddenData()]);
  renderNav();
};
async function reload17(){
  await Promise.all([loadReviewsData(), loadMessagesData(), loadReportsData(), loadHiddenData()]);
  renderNav(); render();
}

/* ---------- render hooks ---------- */
const _render16 = window.render, _renderList16 = window.renderList, _renderReviews16 = window.renderReviews;
window.render = function(){ if (page === 'reports') return renderReports(); return _render16(); };
window.renderList = function(){ if (page === 'reports') { $('listBox').innerHTML = reportsHtml(); return; } return _renderList16(); };
window.renderReviews = function(){
  _renderReviews16();
  const sel = document.querySelector('#tools select[onchange^="revF"]');
  if (sel) sel.insertAdjacentHTML('beforeend', `<option value="hidden" ${revF==='hidden'?'selected':''}>פארשטעקט</option>`);
};

/* ---------- reason window ---------- */
function askReason(title){
  return new Promise(res => {
    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:999;display:flex;align-items:center;justify-content:center;padding:16px';
    d.innerHTML = `<div class="card" style="max-width:460px;width:100%;margin:0">
      <b style="font-size:18px">${esc(title)}</b>
      <label class="f">סיבה (מוז)</label>
      <select class="in" id="ar_r" style="width:100%"><option value="">— קלויבט א סיבה —</option>${Object.entries(REASONS17).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('')}</select>
      <label class="f">נאטיץ: וואס פונקט (פאר די רעקארדס)</label>
      <textarea class="in" id="ar_n" rows="3" style="width:100%"></textarea>
      <div class="muted" style="margin-top:8px;font-size:13px">מען פארשטעקט נישט א רעוויו ווייל ער איז גוט אדער שלעכט.</div>
      <div class="actions"><button class="btn" id="ar_ok">${ic('check')} OK</button><button class="btn ghost" id="ar_x">צוריק</button></div>
    </div>`;
    document.body.appendChild(d);
    const done = v => { d.remove(); res(v); };
    d.querySelector('#ar_x').onclick = () => done(null);
    d.querySelector('#ar_ok').onclick = () => {
      const r = d.querySelector('#ar_r').value, n = d.querySelector('#ar_n').value.trim();
      if (!r) { toast('קלויבט א סיבה', true); return; }
      if (r === 'other' && !n) { toast('ביי "אנדערש" מוז מען שרייבן א נאטיץ', true); return; }
      done({ reason: r, note: n || null });
    };
  });
}

/* ---------- review actions ---------- */
async function hideReview(id, reportId){
  const a = await askReason('פארשטעקן דעם רעוויו');
  if (!a) return;
  const { error } = await sb.rpc('admin_hide_review', { p_id:id, p_reason:a.reason, p_note:a.note, p_report:reportId || null });
  if (error) { toast(error.message, true); return; }
  toast('פארשטעקט'); await reload17();
}
async function unhideReview(id){
  const note = prompt('ווייזן ווידער דעם רעוויו אויפן זייטל?\nשרייבט פארוואס (נישט מוז):', '');
  if (note === null) return;
  const { error } = await sb.rpc('admin_unhide_review', { p_id:id, p_note:note.trim() || null });
  if (error) { toast(error.message, true); return; }
  toast('ווידער אויפן זייטל'); await reload17();
}
async function removeReview(id, reportId){
  const a = await askReason('אויסמעקן דעם רעוויו אויף שטענדיג');
  if (!a) return;
  if (!confirm('זיכער אויסמעקן? מען קען עס נישט צוריקברענגען.\n(אויב איר זענט נישט זיכער, קלויבט "פארשטעקן")')) return;
  const { error } = await sb.rpc('admin_remove_review', { p_id:id, p_reason:a.reason, p_note:a.note, p_report:reportId || null });
  if (error) { toast(error.message, true); return; }
  toast('אויסגעמעקט'); await reload17();
}
window.delReview = id => removeReview(id);

/* ---------- publish voice message (word for word) ---------- */
window.publishMsg = async function(id){
  const txt = $('mt' + id).value.trim(), co = $('mc' + id).value;
  if (!txt) { toast('שרייב ערשט דעם טעקסט', true); return; }
  if (!co) { toast('קלויב א קאמפאני', true); return; }
  if (!$('mv' + id) || !$('mv' + id).checked) { toast('באשטעטיגט ערשט אז דער טעקסט איז ווארט ביי ווארט', true); return; }
  await sb.from('voice_messages').update({ reviewer_name:$('mn' + id).value, admin_notes:$('mo' + id).value }).eq('id', id);
  const { error } = await sb.rpc('admin_publish_message_v17', { p_id:id, p_company:co, p_text:txt, p_verbatim:true });
  if (error) { toast(/NO_PHONE_USER/.test(error.message) ? 'דער נומער איז נישט אין "טעלעפאן נומערן"' : error.message, true); return; }
  toast('פובליצירט אויפן וועבסייט'); await Promise.all([loadMessagesData(), loadReviewsData()]); renderNav(); renderList();
};

/* ---------- reports page ---------- */
function renderReports(){
  head('מעלדונגען', `${reports.length} מעלדונגען · ${newRep()} נייע`,
    searchBox('זוך אימעיל, קאמפאני אדער טעקסט...') + `<select class="in" onchange="repF=this.value;renderList()">
      <option value="open" ${repF==='open'?'selected':''}>אפענע</option><option value="all" ${repF==='all'?'selected':''}>אלע</option>
      ${Object.keys(RSTAT17).map(k => `<option value="${k}" ${repF===k?'selected':''}>${RSTAT17[k][0]}</option>`).join('')}</select>` + refreshBtn);
  $('content').innerHTML = `<div id="listBox">${reportsHtml()}</div>`;
}
function reportsHtml(){
  const s = q.trim().toLowerCase();
  const list = reports.filter(r =>
    (repF === 'all' || (repF === 'open' ? ['new', 'under_review'].includes(r.status) : r.status === repF)) &&
    (!s || [r.email, r.name, r.company_name, r.message, r.admin_notes].some(x => (x || '').toLowerCase().includes(s))));
  if (!list.length) return empty('קיין מעלדונגען נישטא', '⚑');
  return '<div class="g2">' + list.map(r => {
    const st = RSTAT17[r.status] || [r.status, 'p-gray'];
    const rv = r.review_id ? repRevs[r.review_id] : null;
    const co = companies.find(c => c.id === (r.company_id || (rv && rv.company_id)));
    const ev = /^https?:\/\//i.test(r.evidence_url || '') ? `<div style="margin-top:6px">🔗 <a class="ltr" href="${esc(r.evidence_url)}" target="_blank" rel="noopener noreferrer">${esc(r.evidence_url)}</a></div>` : (r.evidence_url ? `<div class="muted ltr">${esc(r.evidence_url)}</div>` : '');
    const revBox = r.review_id
      ? (rv ? `<div class="cmt" style="border-inline-start:4px solid #f59e0b"><div class="muted" style="font-size:12px">דער רעוויו (${esc(fmtDate(rv.created_at))})${rv.hidden_at ? ` · <b>פארשטעקט: ${esc(REASONS17[rv.hidden_reason] || rv.hidden_reason || '')}</b>` : ''}</div>${rv.comment ? esc(rv.comment) : '<span class="muted">(אן טעקסט, נאר רייטינגס)</span>'}</div>`
            : '<div class="muted" style="margin-top:8px">דער רעוויו עקזיסטירט שוין נישט</div>')
      : '';
    const acts = [];
    if (rv && !rv.hidden_at) acts.push(`<button class="btn orange" onclick="hideReview('${rv.id}','${r.id}')">${ic('eyeoff')} פארשטעקן</button>`);
    if (rv && rv.hidden_at) acts.push(`<button class="btn ghost" onclick="unhideReview('${rv.id}')">${ic('eye')} ווייזן ווידער</button>`);
    acts.push(`<button class="btn green" onclick="repSet('${r.id}','kept')">${ic('check')} ${r.kind === 'company' ? 'פארטיג' : 'לאזן (ברעכט נישט קיין כלל)'}</button>`);
    if (rv) acts.push(`<button class="btn ghost danger" onclick="removeReview('${rv.id}','${r.id}')">${ic('trash')} אויסמעקן</button>`);
    acts.push(`<button class="btn ghost" onclick="repSet('${r.id}','')">${ic('save')} שפייכערן</button>`);
    return `<div class="card">
      <div class="chead">
        <div class="row"><span class="pill ${st[1]}">${esc(st[0])}</span><span class="pill ${r.kind === 'company' ? 'p-purple' : 'p-orange'}">${r.kind === 'company' ? 'קאמפאני' : 'מעלדונג'}</span><span class="pill p-gray">${esc(REASONS17[r.reason] || r.reason)}</span></div>
        <div class="muted">${ic('clock')} ${esc(fmtDate(r.created_at))}</div>
      </div>
      ${co ? `<div><b style="font-size:17px">${esc(co.name)}</b></div>` : ''}
      <div class="muted" style="margin-top:4px">${r.name ? `<b>${esc(r.name)}</b> · ` : ''}<a class="ltr" href="mailto:${esc(r.email)}">${esc(r.email)}</a>${r.company_name ? ` · ${esc(r.company_name)}` : ''}${r.role ? ` (${esc(r.role)})` : ''}${r.lang ? ` · ${esc(r.lang)}` : ''}</div>
      <div class="cmt">${esc(r.message)}</div>
      ${ev}
      ${revBox}
      <div class="cols" style="margin-top:6px">
        <div><label class="f">סטאטוס</label><select id="rs${r.id}" class="in" style="width:100%">${Object.keys(RSTAT17).map(k => `<option value="${k}" ${r.status === k ? 'selected' : ''}>${RSTAT17[k][0]}</option>`).join('')}</select></div>
        <div>${r.handled_at ? `<label class="f">באהאנדלט</label><div class="muted">${esc(fmtDate(r.handled_at))}</div>` : ''}</div>
      </div>
      <label class="f">נאטיצן (נאר פאר אייך)</label><textarea id="rn${r.id}" class="in" rows="2" style="width:100%">${esc(r.admin_notes || '')}</textarea>
      <div class="actions">${acts.join('')}</div>
    </div>`;
  }).join('') + '</div>';
}
async function repSet(id, status){
  const st = status || $('rs' + id).value;
  const { error } = await sb.rpc('admin_report_set', { p_id:id, p_status:st, p_notes:$('rn' + id).value });
  if (error) { toast(error.message, true); return; }
  toast('געשפייכערט'); await reload17();
}

/* ---------- overridden lists (copied from v16 with the v17 changes) ---------- */
window.reviewsHtml = function(){
  const s=q.trim().toLowerCase();
  const list = reviews.filter(r => (!revPh||fmtPhone(r.phone)===revPh) && (revF==='all'||(revF==='pending'&&!r.approved&&!hiddenMap[r.id])||(revF==='approved'&&r.approved)||(revF==='hidden'&&hiddenMap[r.id])) &&
    (!s || (r.company||'').toLowerCase().includes(s) || String(r.phone||'').replace(/\D/g,'').includes(s.replace(/\D/g,'')||'§')));
  if(!list.length) return empty('קיין רעוויוס נישטא','⭐');
  return '<div class="g2">'+list.map(r=>{
    const vals=[r.punctuality,r.service,r.cleanliness,r.driving,r.driver_service].filter(v=>v!=null);
    const avg = vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
    const tone = avg>=4?'bg-green':avg>=3?'bg-gold':'bg-red';
    const stars = '★'.repeat(Math.round(avg))+'☆'.repeat(5-Math.round(avg));
    const rt=[['אנקום',r.punctuality],['סערוויס',r.service],['רייניקייט',r.cleanliness],['פארן',r.driving],['דרייווער',r.driver_service]].filter(x=>x[1]!=null).map(x=>`<span>${x[0]}<b>${x[1]}</b></span>`).join('');
    const ride=[r.trip_from&&r.trip_to?`${esc(r.trip_from)} → ${esc(r.trip_to)}`:'', r.price_paid!=null?'$'+esc(r.price_paid):'', esc(r.trip_date||'')].filter(Boolean).join(' · ');
    return `<div class="card rev ${r.approved?'':'pend'}">
      <div class="row between" style="align-items:flex-start">
        <div class="row" style="gap:12px">${avg?`<span class="score ${tone}">${avg.toFixed(1)}</span>`:''}<div><b style="font-size:18px">${esc(r.company||'?')}</b><div class="row" style="gap:6px;margin-top:4px">${avg?`<span class="stars">${stars}</span>`:''}${hiddenMap[r.id]?`<span class="pill p-red">פארשטעקט · ${esc(REASONS17[hiddenMap[r.id].hidden_reason]||hiddenMap[r.id].hidden_reason||'')}</span>`:r.approved?'<span class="pill p-green">אויפן זייטל</span>':'<span class="pill p-orange">ווארט</span>'}</div></div></div>
        <div class="meta"><span>${ic('clock')} ${esc(fmtDate(r.created_at))}</span><span class="ltr">${ic('phone')} ${esc(fmtPhone(r.phone))||'?'}</span></div>
      </div>
      <div class="rt">${rt||'<span class="muted">קיין רייטינגס</span>'}${r.recommend===true?`<span style="background:#dcfce7;border-color:#86efac;color:#166534">${ic('up')} רעקאמענדירט</span>`:r.recommend===false?`<span style="background:#fee2e2;border-color:#fca5a5;color:#991b1b">${ic('down')} נישט רעקאמענדירט</span>`:''}</div>
      ${r.tags&&r.tags.length?`<div class="row" style="margin-top:8px;gap:5px">${r.tags.map(t=>`<span class="pill p-gray">${esc(TAGN[t]||t)}</span>`).join('')}</div>`:''}
      ${ride?`<div class="muted" style="margin-top:8px">🚗 ${ride}</div>`:''}
      ${r.comment?`<div class="cmt">${esc(r.comment)}</div>`:''}
      ${r.voice_path?`<div id="v-${r.id}" style="margin-top:10px"><button class="btn sm ghost" onclick="playVoice('v-${r.id}','${esc(r.voice_path)}')">${ic('play')} הער דעם קאמענט</button></div>`:''}
      <div class="actions">
        ${hiddenMap[r.id]?`<button class="btn ghost" onclick="unhideReview('${r.id}')">${ic('eye')} ווייזן ווידער</button>`:`${r.approved?'':`<button class="btn green" onclick="setApproved('${r.id}',true)">${ic('check')} באשטעטיג</button>`}<button class="btn orange" onclick="hideReview('${r.id}')">${ic('eyeoff')} פארשטעקן (מיט א סיבה)</button>`}
        <button class="btn ghost danger" onclick="removeReview('${r.id}')">${ic('trash')} מעק אויס</button>
      </div></div>`;
  }).join('')+'</div>';
};

window.messagesHtml = function(){
  const s=q.trim().toLowerCase();
  const list = messages.filter(m => (!msgF||m.status===msgF) && (!s || String(m.from_number||'').replace(/\D/g,'').includes(s.replace(/\D/g,'')||'§') || (m.reviewer_name||'').toLowerCase().includes(s) || (m.typed_text||'').toLowerCase().includes(s) || (m.admin_notes||'').toLowerCase().includes(s)));
  if(!list.length) return empty('0 הודעות','🎙️');
  return '<div class="g2">'+list.map(m=>{ const st=STATUS[m.status]||[m.status,'p-gray']; return `<div class="card">
    <div class="chead">
      <div class="row"><span class="pill ${st[1]}">${esc(st[0])}</span><b class="num ltr">${esc(fmtPhone(m.from_number))}</b>${m.reviewer_name?`<b class="muted">· ${esc(m.reviewer_name)}</b>`:''}</div>
      <div class="muted">${ic('clock')} ${esc(fmtDate(m.created_at))} · <b>${esc(m.duration_seconds||0)}s</b></div>
    </div>
    ${m.storage_path?`<div id="m-${m.id}"><button class="btn sm" onclick="playVoice('m-${m.id}','${esc(m.storage_path)}')">${ic('play')} הער די הודעה</button></div>`:'<div class="muted">קיין אודיא</div>'}
    <div class="cols" style="margin-top:4px">
      <div><label class="f">נאמען</label><input id="mn${m.id}" class="in" value="${esc(m.reviewer_name||'')}"></div>
      <div><label class="f">סטאטוס</label><select id="ms${m.id}" class="in" style="width:100%">${Object.keys(STATUS).map(k=>`<option value="${k}" ${m.status===k?'selected':''}>${STATUS[k][0]}</option>`).join('')}</select></div>
    </div>
    <label class="f">אפגעשריבענער טעקסט</label><textarea id="mt${m.id}" class="in" rows="3">${esc(m.typed_text||'')}</textarea>
    ${m.original_text&&m.original_text!==(m.typed_text||'')?`<div class="muted" style="font-size:13px;margin-top:4px">ערשטער טעקסט (געהאלטן): ${esc(m.original_text)}</div>`:''}
    <label class="f">נאטיצן</label><input id="mo${m.id}" class="in" value="${esc(m.admin_notes||'')}">
        <label class="f">קאמפאני (פאר פובליצירן)</label>
    <select id="mc${m.id}" class="in"><option value="">— קלויב קאמפאני —</option>${companies.map(c=>`<option value="${c.id}" ${m.company_id===c.id?'selected':''}>${c.phone_code?'#'+String(c.phone_code).padStart(2,'0')+' · ':''}${esc(c.name)}</option>`).join('')}</select>
    <div class="row" style="margin-top:8px;gap:6px">
      ${m.published_review_id?'<span class="pill p-green">✔ שוין פובליצירט אויפן וועבסייט</span>':''}
      ${m.status==='published'?'<span class="pill p-green">🔊 מען הערט עס אויפן טעלעפאן</span>':'<span class="pill p-gray">🔇 מען הערט עס נישט אויפן טעלעפאן ביז פובליצירן</span>'}
    </div>
    <label style="display:flex;gap:8px;align-items:center;margin-top:10px;font-weight:700;cursor:pointer"><input type="checkbox" id="mv${m.id}" style="width:18px;height:18px"> איך האב אפגעשריבן פונקט ווי מען האט געזאגט (ווארט ביי ווארט)</label>
    ${m.verbatim_confirmed?'<div style="margin-top:6px"><span class="pill p-green">✔ באשטעטיגט ווארט ביי ווארט</span></div>':''}
    <div class="actions"><button class="btn" onclick="publishMsg('${m.id}')">פובליצירן אלס רעוויו</button><button class="btn green" onclick="saveMsg('${m.id}')">${ic('save')} שפייכערן</button><button class="btn ghost danger" onclick="delMsg('${m.id}','${esc(m.storage_path||'')}')">${ic('trash')} מעק אויס</button></div>
  </div>`; }).join('')+'</div>';};

window.renderNav = function(){
  $('nav').innerHTML = PAGES.map(([k,i,l,c])=>{ const n=c(); return `<button class="${page===k?'on':''}" onclick="go('${k}')">${ic(i)} ${l}${n?`<span class="cnt ${k==='reviews'||k==='reports'?'red':''}">${n}</span>`:''}</button>`; }).join('');
  document.title = (pendRev17()+newMsg()+waitPh()+newRep() ? `(${pendRev17()+newMsg()+waitPh()+newRep()}) ` : '') + 'CarReviews — טעלעפאן אדמין';};

/* start */
init();
