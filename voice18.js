/* ================= CarReviews v18 – additions to voice.html =================
   loaded by voice.html AFTER voice17.js. Adds:
   - phone messages: YOUR word-for-word recording (the only voice ever played on the phone),
     the caller's agreement (18+), how many days a message is waiting
   - "פריוואטקייט" page: privacy requests + erase a person
   - "אויסמעקן" page: turn automatic deleting on/off, delete due original recordings now
   - the 4 new phone recordings in "הקלטות"                                         */

I.lock = '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>';
I.broom = '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"/><path d="M10 10v8M14 10v8"/>';

const DSTAT18 = { new:['נייע','p-blue'], acknowledged:['געענטפערט אז מען האט באקומען','p-purple'], done:['פארטיג','p-green'], rejected:['אפגעווארפן','p-red'] };
const DKIND18 = { delete:'מעק אויס מיינע פרטים', access:'וואס האט איר וועגן מיר', correct:'פאררעכטן', other:'אנדערע' };
const JOB18 = {
  voice_original:'די ארגינעלע הקלטה פון רופער (נאכן פובליצירן אדער אפווארפן)',
  voice_rejected:'אפגעווארפענע טעלעפאן־מעסעדזשעס (די גאנצע שורה, נאר נאכדעם וואס די הקלטה איז שוין אויסגעמעקט)',
  admin_messages:'מעסעדזשעס פארן אדמין',
  call_log:'ווער האט געדריקט "רופן" אויפן וועבזייטל',
  usage_events:'סטאטיסטיק (רופן, אויסהערן, באזוכן)',
  phone_users_no_review:'טעלעפאן נומערן וואס האבן קיינמאל נישט געלאזט קיין רעוויו (נישט פארשפארטע, אן א נאמען)',
  review_reports_closed:'פארמאכטע מעלדונגען'
};
let dreqs = [], dreqF = 'open', retRows = null, vq = { waiting:0, overdue:0 }, myId = null, aRec = null;

const openReq = () => dreqs.filter(r => r.status === 'new' || r.status === 'acknowledged').length;
const todayNY = () => new Date().toLocaleDateString('en-CA', { timeZone:'America/New_York' });   // YYYY-MM-DD
const fmtDay = d => d ? String(d).slice(0, 10).split('-').reverse().join('/') : '—';
const daysWaiting = m => Math.floor((Date.now() - new Date(m.created_at).getTime()) / 864e5);

/* nav */
PAGES.splice(PAGES.findIndex(p => p[0] === 'recs'), 0, ['privacy', 'lock', 'פריוואטקייט', openReq], ['retention', 'broom', 'אויסמעקן', () => 0]);

/* ---------- data ---------- */
async function loadReqData(){
  const { data, error } = await sb.from('cr_data_requests').select('*').order('created_at', { ascending:false }).limit(300);
  dreqs = error ? [] : (data || []);
}
async function loadQueueData(){
  try { const { data } = await sb.rpc('cr_voice_queue'); vq = (data && data[0]) || { waiting:0, overdue:0 }; } catch (e) {}
}
async function loadRetData(){
  const { data, error } = await sb.rpc('cr_retention_preview');
  if (error) { toast(error.message, true); retRows = []; return; }
  retRows = data || [];
}
const _loadAll17 = window.loadAll;
window.loadAll = async function(){
  await Promise.all([_loadAll17(), loadReqData(), loadQueueData()]);
  retRows = null;
  if (!myId) { try { const { data } = await sb.auth.getUser(); myId = data && data.user ? data.user.id : null; } catch (e) {} }
  renderNav();
};
const _loadMsgs16 = window.loadMessagesData;
window.loadMessagesData = async function(){ await Promise.all([_loadMsgs16(), loadQueueData()]); };

/* ---------- render hooks ---------- */
const _render17 = window.render, _renderList17 = window.renderList, _renderMsgs16 = window.renderMessages;
window.render = function(){
  if (page === 'privacy') return renderPrivacy();
  if (page === 'retention') return renderRetention();
  return _render17();
};
window.renderList = function(){
  if (page === 'privacy') { $('listBox').innerHTML = privacyHtml(); return; }
  return _renderList17();
};
window.renderMessages = function(){
  _renderMsgs16();
  if (vq.waiting) $('content').insertAdjacentHTML('afterbegin', `<div class="card" style="border-inline-start:5px solid ${vq.overdue ? '#dc2626' : '#f59e0b'}">
    ${ic('clock')} <b>${vq.waiting} מעסעדזשעס ווארטן</b>${vq.overdue ? ` · <b style="color:#b91c1c">${vq.overdue} שוין איבער 7 טעג!</b>` : ''}
    <div class="muted" style="margin-top:4px">לויט די תנאים באהאנדלט מען א מעסעדזש אין 7 טעג: פובליצירן אדער אפווארפן.</div></div>`);
};
window.renderNav = function(){
  $('nav').innerHTML = PAGES.map(([k,i,l,c]) => { const n = c(); return `<button class="${page===k?'on':''}" onclick="go('${k}')">${ic(i)} ${l}${n?`<span class="cnt ${['reviews','reports','privacy'].includes(k)?'red':''}">${n}</span>`:''}</button>`; }).join('');
  const t = pendRev17() + newMsg() + waitPh() + newRep() + openReq();
  document.title = (t ? `(${t}) ` : '') + 'CarReviews — טעלעפאן אדמין';
};

/* ================= 1) PHONE MESSAGES ================= */
window.messagesHtml = function(){
  const s = q.trim().toLowerCase();
  const list = messages.filter(m => (!msgF || m.status === msgF) && (!s || String(m.from_number||'').replace(/\D/g,'').includes(s.replace(/\D/g,'')||'§') || (m.reviewer_name||'').toLowerCase().includes(s) || (m.typed_text||'').toLowerCase().includes(s) || (m.admin_notes||'').toLowerCase().includes(s)));
  if (!list.length) return empty('0 הודעות', '🎙️');
  return '<div class="g2">' + list.map(m => {
    const st = STATUS[m.status] || [m.status, 'p-gray'];
    const open = m.status === 'new' || m.status === 'typed', dw = daysWaiting(m);
    const wait = open ? `<span class="pill ${dw >= 7 ? 'p-red' : dw >= 6 ? 'p-orange' : 'p-gray'}">ווארט ${dw} טעג</span>` : '';
    const consent = m.consent_at ? '<span class="pill p-green" title="דער רופער האט געדריקט 1">✔ 18+ / מסכים</span>' : '<span class="pill p-gray">אן הסכמה (פון פאר v18)</span>';
    const orig = m.storage_path
      ? `<div id="m-${m.id}"><button class="btn sm ghost" onclick="playVoice('m-${m.id}','${esc(m.storage_path)}')">${ic('play')} הער דעם רופער (נאר צום איבערשרייבן)</button></div>`
      : `<div class="muted">${m.original_deleted_at ? `🗑 די ארגינעלע הקלטה איז אויסגעמעקט (${esc(fmtDate(m.original_deleted_at))})` : 'קיין אודיא'}</div>`;
    const recOn = aRec && aRec.id === m.id;
    const mine = m.admin_audio_path
      ? `<div class="row" style="gap:6px;margin-top:6px"><span class="pill p-green">✔ אייער הקלטה איז דא${m.admin_audio_at ? ' · ' + esc(fmtDate(m.admin_audio_at)) : ''}</span>
           <span id="a-${m.id}"><button class="btn sm ghost" onclick="playVoice('a-${m.id}','${esc(m.admin_audio_path)}')">${ic('play')} הער</button></span>
           <button class="btn sm ghost danger" onclick="aDel('${m.id}')">${ic('trash')} אוועקנעמען</button></div>`
      : '<div class="muted" style="margin-top:6px">נאך נישט אויפגענומען. אן אייער הקלטה ליינט דער טעלעפאן נאר די רייטינגס, אן א קול.</div>';
    return `<div class="card">
    <div class="chead">
      <div class="row"><span class="pill ${st[1]}">${esc(st[0])}</span><b class="num ltr">${esc(fmtPhone(m.from_number))}</b>${m.reviewer_name?`<b class="muted">· ${esc(m.reviewer_name)}</b>`:''}</div>
      <div class="muted">${ic('clock')} ${esc(fmtDate(m.created_at))} · <b>${esc(m.duration_seconds||0)}s</b></div>
    </div>
    <div class="row" style="gap:6px;margin-bottom:8px">${consent}${wait}</div>
    ${orig}
    <div class="cols" style="margin-top:4px">
      <div><label class="f">נאמען</label><input id="mn${m.id}" class="in" value="${esc(m.reviewer_name||'')}"></div>
      <div><label class="f">סטאטוס</label><select id="ms${m.id}" class="in" style="width:100%">${Object.keys(STATUS).map(k=>`<option value="${k}" ${m.status===k?'selected':''}>${STATUS[k][0]}</option>`).join('')}</select></div>
    </div>
    <label class="f">אפגעשריבענער טעקסט (ווארט ביי ווארט)</label><textarea id="mt${m.id}" class="in" rows="3">${esc(m.typed_text||'')}</textarea>
    ${m.original_text&&m.original_text!==(m.typed_text||'')?`<div class="muted" style="font-size:13px;margin-top:4px">ערשטער טעקסט (געהאלטן): ${esc(m.original_text)}</div>`:''}
    <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:10px;margin-top:10px">
      <b>🎙 אייער הקלטה פארן טעלעפאן</b>
      <div class="muted" style="font-size:13px">ליינט פאר דעם טעקסט פון אויבן <b>ווארט ביי ווארט</b>. נאר דאס הערט מען אויפן טעלעפאן, און נאר נאכן פובליצירן. דעם רופערס קול הערט מען קיינמאל נישט.</div>
      ${mine}
      <div class="row" style="gap:6px;margin-top:8px">
        <button class="btn sm ${recOn?'rec':'orange'}" onclick="aToggle('${m.id}')">${ic(recOn?'stop':'rec')} ${recOn?'שטעל אפ':(m.admin_audio_path?'נעם אויף נאכאמאל':'נעם אויף')}</button>
        <button class="btn sm ghost" onclick="aPick('${m.id}')">${ic('upload')} פייל</button>
      </div>
    </div>
    <label class="f">נאטיצן</label><input id="mo${m.id}" class="in" value="${esc(m.admin_notes||'')}">
    <label class="f">קאמפאני (פאר פובליצירן)</label>
    <select id="mc${m.id}" class="in"><option value="">— קלויב קאמפאני —</option>${companies.map(c=>`<option value="${c.id}" ${m.company_id===c.id?'selected':''}>${c.phone_code?'#'+String(c.phone_code).padStart(2,'0')+' · ':''}${esc(c.name)}</option>`).join('')}</select>
    <div class="row" style="margin-top:8px;gap:6px">
      ${m.published_review_id?'<span class="pill p-green">✔ שוין פובליצירט אויפן וועבסייט</span>':''}
      ${m.status==='published'?(m.admin_audio_path?'<span class="pill p-green">🔊 אויפן טעלעפאן הערט מען אייער הקלטה</span>':'<span class="pill p-gray">🔇 אויפן טעלעפאן: נאר רייטינגס (קיין הקלטה פון אייך)</span>'):'<span class="pill p-gray">🔇 מען הערט עס נישט אויפן טעלעפאן ביז פובליצירן</span>'}
    </div>
    ${m.published_review_id?'':`<label style="display:flex;gap:8px;align-items:center;margin-top:10px;font-weight:700;cursor:pointer"><input type="checkbox" id="mv${m.id}" style="width:18px;height:18px"> איך האב אפגעשריבן פונקט ווי מען האט געזאגט (ווארט ביי ווארט)</label>`}
    ${m.verbatim_confirmed?'<div style="margin-top:6px"><span class="pill p-green">✔ באשטעטיגט ווארט ביי ווארט</span></div>':''}
    <div class="actions">${m.published_review_id?'':`<button class="btn" onclick="publishMsg('${m.id}')">פובליצירן אלס רעוויו</button>`}<button class="btn green" onclick="saveMsg('${m.id}')">${ic('save')} שפייכערן</button><button class="btn ghost danger" onclick="delMsg('${m.id}','${esc(m.storage_path||'')}')">${ic('trash')} מעק אויס</button></div>
  </div>`; }).join('') + '</div>';
};

async function reloadMsgs18(){ await Promise.all([loadMessagesData(), loadReviewsData()]); renderNav(); renderList(); }
const msgById = id => messages.find(x => x.id === id);
async function rmFiles(paths){
  paths = (paths || []).filter(Boolean);
  for (let i = 0; i < paths.length; i += 100) {
    const { error } = await sb.storage.from('voice-messages').remove(paths.slice(i, i + 100));
    if (error) { toast('א פייל איז נישט אויסגעמעקט: ' + error.message, true); return false; }
  }
  return true;
}

/* publish: word for word (v17) + keeps / drops your recording (v18) */
window.publishMsg = async function(id){
  const m = msgById(id); if (!m) return;
  const txt = $('mt' + id).value.trim(), co = $('mc' + id).value;
  if (!txt) { toast('שרייב ערשט דעם טעקסט', true); return; }
  if (!co) { toast('קלויב א קאמפאני', true); return; }
  if (!$('mv' + id) || !$('mv' + id).checked) { toast('באשטעטיגט ערשט אז דער טעקסט איז ווארט ביי ווארט', true); return; }
  const changed = (m.typed_text || '').trim() !== txt;
  if (m.admin_audio_path && changed && !confirm('דער טעקסט האט זיך געטוישט, און אייער הקלטה פאסט שוין נישט.\nזי ווערט אוועקגענומען. נאכן פובליצירן נעמט אויף נאכאמאל.\nווייטער?')) return;
  if (!m.admin_audio_path && !confirm('איר האט נאך נישט אויפגענומען דעם טעקסט.\nאויפן טעלעפאן וועט מען הערן נאר די רייטינגס, ביז איר נעמט אויף.\nפובליצירן?')) return;
  await sb.from('voice_messages').update({ reviewer_name:$('mn' + id).value, admin_notes:$('mo' + id).value }).eq('id', id);
  const { error } = await sb.rpc('admin_publish_message_v18', { p_id:id, p_company:co, p_text:txt, p_verbatim:true, p_audio:null });
  if (error) { toast(/NO_PHONE_USER/.test(error.message) ? 'דער נומער איז נישט אין "טעלעפאן נומערן"' : error.message, true); return; }
  if (m.admin_audio_path && changed) await rmFiles([m.admin_audio_path]);
  toast('פובליצירט אויפן וועבסייט'); await reloadMsgs18();
};

/* save: if the text changed, your recording does not match anymore */
window.saveMsg = async function(id){
  const m = msgById(id); if (!m) return;
  const txt = $('mt' + id).value, changed = (m.typed_text || '').trim() !== txt.trim();
  if (m.published_review_id && changed) { toast('דער רעוויו איז שוין פובליצירט. דעם טעקסט טוישט מען נישט דא.', true); return; }
  const dropAudio = m.admin_audio_path && changed;
  if (dropAudio && !confirm('דער טעקסט האט זיך געטוישט, און אייער הקלטה פאסט שוין נישט.\nזי ווערט אוועקגענומען. ווייטער?')) return;
  const upd = { reviewer_name:$('mn' + id).value, typed_text:txt, admin_notes:$('mo' + id).value, status:$('ms' + id).value };
  if (upd.status === 'published' && !m.published_review_id) { toast('צו פובליצירן, דריקט "פובליצירן אלס רעוויו"', true); return; }
  if (dropAudio) Object.assign(upd, { admin_audio_path:null, admin_audio_at:null, admin_audio_by:null });
  const { error } = await sb.from('voice_messages').update(upd).eq('id', id);
  if (error) { toast(error.message, true); return; }
  if (dropAudio) await rmFiles([m.admin_audio_path]);
  toast('געשפייכערט'); await reloadMsgs18();
};

/* delete a message: also your recording */
window.delMsg = async function(id, path){
  const m = msgById(id);
  const warn = m && m.published_review_id ? '\n(דער רעוויו בלייבט אויפן וועבסייט, נאר אן דער הודעה)' : '';
  if (!confirm('זיכער אויסמעקן די הודעה?' + warn)) return;
  const { error } = await sb.from('voice_messages').delete().eq('id', id);
  if (error) { toast(error.message, true); return; }
  await rmFiles([path, m && m.admin_audio_path]);
  toast('אויסגעמעקט'); await loadMessagesData(); renderNav(); render();
};

/* your recording: record / file / remove */
async function aToggle(id){
  if (aRec) {
    const r = aRec; aRec = null;
    if (Date.now() - r.t0 < 700) toast('צו קורץ – דריקט "נעם אויף", ליינט, און דערנאך "שטעל אפ"', true);
    r.mr.stop(); r.stream.getTracks().forEach(t => t.stop());
    if (r.id !== id) renderList();
    return;
  }
  const m = msgById(id);
  if (!m || !($('mt' + id).value.trim())) { toast('שרייבט ערשט דעם טעקסט, און דערנאך נעמט אים אויף', true); return; }
  if ((m.typed_text || '').trim() !== $('mt' + id).value.trim()) { toast('שפייכערט ערשט דעם טעקסט (🖫 שפייכערן), און דערנאך נעמט אויף', true); return; }
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio:{ echoCancellation:true, noiseSuppression:true } }); }
  catch (e) { toast('דער מיקראפאן איז נישט צוטריטלעך', true); return; }
  const mr = new MediaRecorder(stream), chunks = [];
  mr.ondataavailable = e => e.data.size && chunks.push(e.data);
  mr.onstop = () => aSave(id, new Blob(chunks, { type:mr.mimeType || 'audio/webm' }));
  mr.start(250); aRec = { id, mr, stream, t0:Date.now() }; renderList();
}
const aFileIn = document.createElement('input'); aFileIn.type = 'file'; aFileIn.accept = 'audio/*'; aFileIn.className = 'hidden';
document.body.appendChild(aFileIn);
let aUpId = null;
function aPick(id){
  const m = msgById(id);
  if (!m || !(m.typed_text || '').trim() || (m.typed_text || '').trim() !== $('mt' + id).value.trim()) { toast('שפייכערט ערשט דעם טעקסט, און דערנאך לייגט ארויף דעם פייל', true); return; }
  aUpId = id; aFileIn.click();
}
aFileIn.onchange = async () => { const f = aFileIn.files[0]; aFileIn.value = ''; if (f && aUpId) await aSave(aUpId, f); };

async function aSave(id, blob){
  const m = msgById(id); if (!m) return;
  toast('שפייכערט…');
  try {
    const wav = await toWav(blob);                         // same as "הקלטות": 8 kHz WAV for the phone
    const path = `verbatim/${id}-${Date.now()}.wav`;       // new name every time -> the phone never plays an old copy
    const up = await sb.storage.from('voice-messages').upload(path, wav, { contentType:'audio/wav', upsert:false });
    if (up.error) throw up.error;
    const { error } = await sb.from('voice_messages').update({ admin_audio_path:path, admin_audio_at:new Date().toISOString(), admin_audio_by:myId }).eq('id', id);
    if (error) { await rmFiles([path]); throw error; }
    if (m.admin_audio_path && m.admin_audio_path !== path) await rmFiles([m.admin_audio_path]);
    toast('געשפייכערט (' + ((wav.size - 44) / 16000).toFixed(1) + ' סעקונדעס)');
  } catch (e) { toast(e.message || String(e), true); }
  await loadMessagesData(); if (page === 'messages') renderList();
}
async function aDel(id){
  const m = msgById(id); if (!m || !m.admin_audio_path) return;
  if (!confirm('אוועקנעמען אייער הקלטה?' + (m.status === 'published' ? '\nאויפן טעלעפאן וועט מען הערן נאר די רייטינגס.' : ''))) return;
  const { error } = await sb.from('voice_messages').update({ admin_audio_path:null, admin_audio_at:null, admin_audio_by:null }).eq('id', id);
  if (error) { toast(error.message, true); return; }
  await rmFiles([m.admin_audio_path]);
  toast('אוועקגענומען'); await loadMessagesData(); renderList();
}

/* ================= 2) PRIVACY REQUESTS ================= */
function renderPrivacy(){
  head('פריוואטקייט בקשות', `${dreqs.length} בקשות · ${openReq()} אפענע`,
    searchBox('זוך אימעיל, טעלעפאן אדער טעקסט...') + `<select class="in" onchange="dreqF=this.value;renderList()">
      <option value="open" ${dreqF==='open'?'selected':''}>אפענע</option><option value="all" ${dreqF==='all'?'selected':''}>אלע</option>
      ${Object.keys(DSTAT18).map(k => `<option value="${k}" ${dreqF===k?'selected':''}>${DSTAT18[k][0]}</option>`).join('')}</select>` + refreshBtn);
  $('content').innerHTML = `<div class="card muted" style="line-height:1.7">צוויי צייטן (ארבעטס־טעג, מאנטיג–פרייטיג):
    <b>7 טעג</b> צו ענטפערן אז מען האט באקומען, און <b>14 טעג</b> פאר א פולן ענטפער. ענטפערט אויף זיין אימעיל, און דערנאך דריקט דא דעם קנעפל.</div>
    <div id="listBox">${privacyHtml()}</div>`;
}
function dueTag(label, d, done){
  if (done) return `<span class="pill p-green">${label}: ✔</span>`;
  const t = todayNY(), dd = String(d || '').slice(0, 10);
  const cls = !dd ? 'p-gray' : dd < t ? 'p-red' : dd <= new Date(Date.now() + 2 * 864e5).toLocaleDateString('en-CA', { timeZone:'America/New_York' }) ? 'p-orange' : 'p-gray';
  return `<span class="pill ${cls}">${label} ביז ${esc(fmtDay(dd))}${dd && dd < t ? ' – פארשפעטיגט!' : ''}</span>`;
}
function privacyHtml(){
  const s = q.trim().toLowerCase();
  const list = dreqs.filter(r =>
    (dreqF === 'all' || (dreqF === 'open' ? ['new', 'acknowledged'].includes(r.status) : r.status === dreqF)) &&
    (!s || [r.email, r.name, r.phone, r.message, r.admin_notes].some(x => (x || '').toLowerCase().includes(s))));
  if (!list.length) return empty('קיין בקשות נישטא', '🔒');
  return '<div class="g2">' + list.map(r => {
    const st = DSTAT18[r.status] || [r.status, 'p-gray'], fin = r.status === 'done' || r.status === 'rejected';
    const acts = [];
    if (r.status === 'new') acts.push(`<button class="btn" onclick="dreqSet('${r.id}','acknowledged')">${ic('check')} איך האב געענטפערט אז מיר האבן באקומען</button>`);
    if (!fin) acts.push(`<button class="btn green" onclick="dreqSet('${r.id}','done')">${ic('check')} פארטיג</button>`);
    if (!fin) acts.push(`<button class="btn ghost" onclick="dreqSet('${r.id}','rejected')">${ic('x')} אפגעווארפן</button>`);
    if (r.kind === 'delete' && !fin) acts.push(`<button class="btn ghost danger" onclick="eraseAsk('${r.id}')">${ic('trash')} מעק אויס די פרטים</button>`);
    acts.push(`<button class="btn ghost" onclick="dreqSet('${r.id}','')">${ic('save')} שפייכערן</button>`);
    return `<div class="card">
      <div class="chead">
        <div class="row"><span class="pill ${st[1]}">${esc(st[0])}</span><span class="pill p-purple">${esc(DKIND18[r.kind] || r.kind)}</span></div>
        <div class="muted">${ic('clock')} ${esc(fmtDate(r.created_at))}</div>
      </div>
      <div class="row" style="gap:6px;margin-bottom:6px">${dueTag('באקומען', r.ack_due, r.status !== 'new')}${dueTag('פולער ענטפער', r.answer_due, fin)}</div>
      <div>${r.name ? `<b>${esc(r.name)}</b> · ` : ''}<a class="ltr" href="mailto:${esc(r.email)}">${esc(r.email)}</a>${r.phone ? ` · <span class="ltr">${esc(fmtPhone(r.phone))}</span>` : ''}${r.lang ? ` · ${esc(r.lang)}` : ''}</div>
      <div class="muted" style="font-size:13px">${r.user_id ? '✔ ער איז געווען איינגעלאגט (דער אקאונט איז באקאנט)' : 'נישט איינגעלאגט – קאנטראלירט ערשט אז דאס איז טאקע ער'}</div>
      ${r.message ? `<div class="cmt">${esc(r.message)}</div>` : ''}
      ${r.done_at ? `<div class="muted" style="margin-top:6px">פארמאכט: ${esc(fmtDate(r.done_at))}</div>` : ''}
      <label class="f">נאטיצן (נאר פאר אייך)</label><textarea id="dn${r.id}" class="in" rows="2" style="width:100%">${esc(r.admin_notes || '')}</textarea>
      <div class="actions">${acts.join('')}</div>
    </div>`;
  }).join('') + '</div>';
}
async function dreqSet(id, status){
  const r = dreqs.find(x => x.id === id); if (!r) return;
  const st = status || r.status;
  const { error } = await sb.rpc('admin_data_request_set', { p_id:id, p_status:st, p_notes:$('dn' + id).value });
  if (error) { toast(error.message, true); return; }
  toast('געשפייכערט'); await loadReqData(); renderNav(); render();
}

/* erase a person: account (if he was logged in) and/or phone number */
function eraseAsk(reqId){
  const r = dreqs.find(x => x.id === reqId); if (!r) return;
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:999;display:flex;align-items:center;justify-content:center;padding:16px';
  d.innerHTML = `<div class="card" style="max-width:500px;width:100%;margin:0">
    <b style="font-size:18px;color:#b91c1c">${ic('trash')} אויסמעקן די פרטים אויף שטענדיג</b>
    <div class="muted" style="margin:8px 0;line-height:1.7">עס ווערט אויסגעמעקט: זיינע רעוויוס, טעלעפאן־מעסעדזשעס, הקלטות (אויך אייערע הקלטות פון זיינע מעסעדזשעס), דער טעלעפאן נומער און דער אקאונט.
      א <b>פארשפארטער</b> נומער בלייבט פארשפארט, נאר אן א נאמען. מען קען עס <b>נישט</b> צוריקברענגען.</div>
    <label class="f">טעלעפאן נומער</label><input id="er_p" class="in ltr" style="width:100%" value="${esc(r.phone || '')}" placeholder="718-555-1234">
    <label style="display:flex;gap:8px;align-items:center;margin-top:10px;cursor:pointer;${r.user_id ? '' : 'opacity:.5'}"><input type="checkbox" id="er_u" ${r.user_id ? 'checked' : 'disabled'} style="width:18px;height:18px"> אויך דער אקאונט פון וועבזייטל ${r.user_id ? '' : '(ער איז נישט געווען איינגעלאגט)'}</label>
    <div class="muted" style="font-size:13px;margin-top:6px">קאנטראלירט ערשט אז דער נומער געהערט טאקע צו דעם וואס בעט. למשל: רופט אים אן אויף דעם נומער.</div>
    <label class="f">צו באשטעטיגן, שרייבט: <b>מעק אויס</b></label><input id="er_c" class="in" style="width:100%">
    <div class="actions"><button class="btn danger" id="er_ok">${ic('trash')} מעק אויס</button><button class="btn ghost" id="er_x">צוריק</button></div>
  </div>`;
  document.body.appendChild(d);
  d.querySelector('#er_x').onclick = () => d.remove();
  d.querySelector('#er_ok').onclick = async () => {
    const ph = d.querySelector('#er_p').value.replace(/\D/g, ''), useU = d.querySelector('#er_u').checked && r.user_id;
    if (d.querySelector('#er_c').value.trim() !== 'מעק אויס') { toast('שרייבט "מעק אויס" צו באשטעטיגן', true); return; }
    if (!useU && ph.replace(/^1(?=\d{10}$)/, '').length !== 10) { toast('שרייבט א טעלעפאן נומער פון 10 ציפערן', true); return; }
    const btn = d.querySelector('#er_ok'); btn.disabled = true;
    const { data, error } = await sb.rpc('admin_erase_person', { p_user:useU ? r.user_id : null, p_phone:ph || null });
    if (error) {
      btn.disabled = false;
      toast(/IS_ADMIN/.test(error.message) ? 'דאס איז אן אדמין אקאונט – מען קען אים נישט אויסמעקן' : /NOTHING_TO_ERASE/.test(error.message) ? 'נישטא וואס אויסצומעקן' : error.message, true);
      return;
    }
    const files = (data || []).map(x => x.file_path || x).filter(Boolean);
    const ok = await rmFiles(files);
    const note = `${new Date().toLocaleDateString('en-US')}: אויסגעמעקט${ph ? ' (' + fmtPhone(ph) + ')' : ''}${useU ? ' + אקאונט' : ''}, ${files.length} הקלטות${ok ? '' : ' – נישט אלע פיילס זענען אויסגעמעקט!'}`;
    await sb.rpc('admin_data_request_set', { p_id:r.id, p_status:'done', p_notes:[r.admin_notes, note].filter(Boolean).join('\n') });
    d.remove(); toast('אויסגעמעקט. די בקשה איז פארמאכט – שיקט אים אן ענטפער.');
    await loadAll(); render();
  };
}

/* ================= 3) AUTOMATIC DELETING ================= */
async function renderRetention(){
  head('אויסמעקן אלטע פרטים', 'וואס ווערט אויסגעמעקט אויטאמאטיש, און ווען', `<button class="btn ghost" onclick="retRows=null;renderRetention()">${ic('refresh')} אפדעיטן</button>`);
  if (!retRows) { $('content').innerHTML = '<div class="card empty">…</div>'; await loadRetData(); if (page !== 'retention') return; }
  const order = Object.keys(JOB18);
  const rows = [...retRows].sort((a, b) => (order.indexOf(a.job) + 99) % 99 - (order.indexOf(b.job) + 99) % 99);
  $('content').innerHTML = `<div class="card muted" style="line-height:1.7">יעדן טאג 13:00 (UTC) ווערט אויסגעמעקט <b>נאר</b> וואס איז <b>אן</b>. וואס איז אויס, ווערט קיינמאל נישט אויסגעמעקט.
    "וויפיל" ווייזט וויפיל עס וואלט יעצט אויסגעמעקט געווארן.</div>` + rows.map(r => {
    const byDays = r.days != null, n = r.rows_to_delete;
    return `<div class="card">
      <div class="sw"><label class="toggle"><input type="checkbox" id="rt_e_${r.job}" ${r.enabled ? 'checked' : ''}><span></span></label>
        <div style="flex:1"><b>${esc(JOB18[r.job] || r.job)}</b>
          <div class="muted ltr" style="font-size:12px">${esc(r.job)}</div></div>
        <span class="pill ${r.enabled ? 'p-green' : 'p-gray'}">${r.enabled ? '✅ אן' : '⏸ אויס'}</span></div>
      <div class="row" style="gap:8px;margin-top:10px;align-items:center">
        <span>נאך</span><input id="rt_n_${r.job}" class="in" type="number" min="1" max="${byDays ? 3650 : 120}" value="${esc(byDays ? r.days : r.months)}" style="width:90px">
        <span>${byDays ? 'טעג' : 'חדשים'}</span>
        <span class="pill ${n ? 'p-orange' : 'p-gray'}">וויפיל: ${n == null ? '—' : esc(n)}</span>
      </div>
      <div class="actions"><button class="btn green" onclick="retSave('${r.job}',${byDays})">${ic('save')} שפייכערן</button>
        ${r.job === 'voice_original' && r.enabled && n ? `<button class="btn orange" onclick="cleanNow()">${ic('trash')} מעק אויס יעצט (${esc(n)})</button>` : ''}</div>
    </div>`;
  }).join('');
}
async function retSave(job, byDays){
  const r = retRows.find(x => x.job === job); if (!r) return;
  const en = $('rt_e_' + job).checked, v = parseInt($('rt_n_' + job).value, 10);
  if (!(v >= 1 && v <= (byDays ? 3650 : 120))) { toast(byDays ? 'טעג: 1 ביז 3650' : 'חדשים: 1 ביז 120', true); return; }
  if (en && !r.enabled && !confirm(`אנדרייען?\n"${JOB18[job] || job}"\nפון היינט און ווייטער ווערט עס אויסגעמעקט יעדן טאג, און מען קען עס נישט צוריקברענגען.`)) return;
  const { error } = await sb.rpc('admin_retention_set', { p_job:job, p_enabled:en, p_months:byDays ? null : v, p_days:byDays ? v : null });
  if (error) { toast(error.message, true); return; }
  toast('געשפייכערט'); retRows = null; renderRetention();
}
async function cleanNow(){
  if (!confirm('אויסמעקן יעצט די ארגינעלע הקלטות וואס זייער צייט איז דורך?\nאייערע הקלטות און דער טעקסט בלייבן.')) return;
  let total = 0;
  for (let round = 0; round < 10; round++) {
    const { data, error } = await sb.rpc('cr_voice_files_due');
    if (error) { toast(error.message, true); break; }
    const due = (data || []).filter(x => x.file_path && !/^verbatim\//.test(x.file_path));
    if (!due.length) break;
    let done = 0;
    for (let i = 0; i < due.length; i += 100) {
      const part = due.slice(i, i + 100);
      if (!(await rmFiles(part.map(x => x.file_path)))) break;
      const r2 = await sb.rpc('cr_voice_files_deleted', { p_ids:part.map(x => x.id) });
      if (r2.error) { toast(r2.error.message, true); break; }
      done += Number(r2.data) || 0;
    }
    total += done;
    if (!done || due.length < 500) break;
  }
  toast(`${total} הקלטות אויסגעמעקט`); retRows = null; await loadMessagesData(); renderRetention();
}

/* ================= 4) THE NEW PHONE RECORDINGS ================= */
if (typeof IVR_CLIPS !== 'undefined') {
  const NEW18 = [
    { k:'consent', g:'main', en:'Before we continue: CarReviews is only for adults, 18 and older. The terms of use and the privacy policy are on our website, car reviews u s a dot com. In short: reviews are published without your name and phone number. Voice messages are typed word for word by the admin, and the original recording is kept only for a limited time. If you are 18 or older, and you agree to the terms, press 1. If not, please hang up.', yi:'', note:'נייע (v18): ביים ערשטן רוף, פאר דעם מעניו' },
    { k:'consentNo', g:'main', en:'Without your agreement we cannot continue. Goodbye.', yi:'', note:'נייע (v18): נאך 3 מאל א פאלשן קנעפל' },
    { k:'letter_v18', g:'main', en:'CarReviews is a service built by members of our community, especially for our community. Here you can leave reviews about car services: who arrives on time, what the prices are, how the service is, and whether you would recommend them to others. What is the goal? Everyone travels and pays, but nobody knows in advance what they will get for their money. When we share our experience with each other, everyone can choose the best service, and the companies will have to improve. Your privacy: your name and your phone number are not shown with your review. If you leave a voice message, your voice is not published. The admin types your words, word for word, and only the text is published. On the phone, you may hear the admin reading those words. CarReviews is only for adults, 18 and older. A strong request to everyone: please leave a review after every ride, even if everything was fine. Your review helps the whole community. The rules: report only what you really experienced yourself. To keep the system honest, we reserve the right to remove reviews or accounts that are not true. Questions or comments? Press 9 in the main menu, and leave a message for the admin. Thank you for helping to build a better system for the community. To hear this message again, press 0 in the main menu.', yi:'', note:'נייע (v18): דער ברוך־הבא בריוו אן "אנאנים", מיט 18+' },
    { k:'comment_v18', g:'main', en:'If you wish, leave a voice message after the beep, and press pound when you are done. Your voice will not be published: the admin will type your words, word for word. To skip, press pound now. To go back, press star.', yi:'', note:'נייע (v18): פארן אויפנעמען א מעסעדזש' },
  ];
  const at = Math.max(0, IVR_CLIPS.findIndex(c => c.k === 'letter'));
  NEW18.forEach(c => { if (!IVR_CLIPS.some(x => x.k === c.k)) IVR_CLIPS.splice(at, 0, c); });
  IVR_CLIPS.forEach(c => { if (c.k === 'letter' || c.k === 'comment') c.note = 'ווערט מער נישט געשפילט (זאגט נאך "אנאנים"). אנשטאט דעם: ' + (c.k === 'letter' ? 'letter_v18' : 'comment_v18'); });
}

/* link back to the website (same login, no need to log in again) */
(() => { const me = $('meEmail'); if (me && !$('siteLink')) me.insertAdjacentHTML('beforebegin', `<a id="siteLink" class="btn sm ghost" href="index.html" style="margin-inline-end:8px">🌐 וועבסייט</a>`); })();

/* start (voice.html held back the first start until v18 was loaded) */
if (window.__init0) { init = window.__init0; }
init();
