// CarReviews v15 – price table, statistics, robot check, forgot password (the hotline recordings are in voice.html)
// (loaded after app.js; uses its helpers: $, esc, ic, sb, t_, lang, cleanYi, toast, placeLabel, pricedAll, allCompanies, median, money$)

const L15 = {
  en: {
    prices: 'Price table', pricesTitle: 'Usual prices by route', pricesSearch: 'Search a place…', route: 'Route',
    usual: 'Usual', lowest: 'Lowest', highest: 'Highest', reports: 'Reports', roundT: 'round trip', noPricesYet: 'No prices yet',
    perCompany: 'By company', clickRoute: 'Click a route to see the prices of each company.',
    stats: 'Statistics', statsTitle: 'Statistics – last 30 days', today: 'Today', d7: '7 days', d30: '30 days',
    calls: 'Phone calls', callers: 'Different callers (30 days)', denied: 'Refused / hidden number (30 days)',
    webViews: 'Website views (30 days)', dials: 'Connected to a company (30 days)', perDay: 'Per day (14 days)',
    topLooked: 'Most looked-up companies', phone: 'Phone', web: 'Website', topRoutes: 'Most searched routes (phone)',
    noData: 'No data yet', refresh: 'Refresh',
    voice: 'Hotline recordings', voiceTitle: 'Yiddish recordings for the hotline', recorded: 'recorded',
    yiOn: 'Play the Yiddish recordings', speed: 'Speed of the English voice', save: 'Save', saved: 'Saved',
    robotKey: 'Robot check – Cloudflare Turnstile "Site Key"', robotFirst: 'Please confirm that you are not a robot',
    fAll: 'All', fMissing: 'Only missing', rec: 'Record', stop: 'Stop', upload: 'File', play: 'Play', del: 'Delete',
    sayThis: 'Say in Yiddish', confirmDel: 'Delete this recording?', micNo: 'The microphone is not available',
    uploading: 'Saving…', g_main: 'Main announcements', g_piece: 'Pieces of sentences', g_words: 'Words', g_dates: 'Days and months',
    g_numbers: 'Numbers', g_areas: 'Areas', g_places: 'Places', g_companies: 'Company names',
    voiceHelp: 'Press Record, speak, press Stop – it is saved right away. Until ALL the recordings of a sentence exist, the hotline says that sentence in English. Changes reach the phone within a minute.',
  },
  yi: {
    prices: 'פרייזן', pricesTitle: 'געווענלעכע פרייזן לויט די וועג', pricesSearch: 'זוכט א פלאץ…', route: 'וועג',
    usual: 'געווענלעך', lowest: 'נידריגסטע', highest: 'העכסטע', reports: 'באריכטן', roundT: 'הין און צוריק', noPricesYet: 'נאך קיין פרייזן נישטא',
    perCompany: 'לויט קאמפאני', clickRoute: 'קליקט אויף א וועג צו זען די פרייזן פון יעדע קאמפאני.',
    stats: 'סטאטיסטיק', statsTitle: 'סטאטיסטיק – לעצטע 30 טעג', today: 'היינט', d7: '7 טעג', d30: '30 טעג',
    calls: 'טעלעפאן אנרופן', callers: 'פארשידענע רופער (30 טעג)', denied: 'אפגעזאגט / באהאלטענער נומער (30 טעג)',
    webViews: 'קוקן אויפן וועבזייטל (30 טעג)', dials: 'פארבונדן צו א קאמפאני (30 טעג)', perDay: 'יעדן טאג (14 טעג)',
    topLooked: 'קאמפאניס וואס מען זוכט די מערסטע', phone: 'טעלעפאן', web: 'וועבזייטל', topRoutes: 'וועגן וואס מען זוכט די מערסטע (טעלעפאן)',
    noData: 'נאך קיין אינפארמאציע נישטא', refresh: 'דערפריש',
    voice: 'הקלטות', voiceTitle: 'אידישע הקלטות פארן טעלעפאן', recorded: 'אויפגענומען',
    yiOn: 'שפיל די אידישע הקלטות', speed: 'גיכקייט פונעם ענגלישן קול', save: 'היט אפ', saved: 'אפגעהיטן',
    robotKey: 'ראבאט-שוץ – Cloudflare Turnstile "Site Key"', robotFirst: 'ביטע באשטעטיגט אז איר זענט נישט קיין ראבאט',
    fAll: 'אלע', fMissing: 'נאר וואס פעלט', rec: 'נעם אויף', stop: 'שטעל אפ', upload: 'פייל', play: 'הער', del: 'מעק אויס',
    sayThis: 'זאגט אויף אידיש', confirmDel: 'אויסמעקן די הקלטה?', micNo: 'דער מיקראפאן איז נישט צוטריטלעך',
    uploading: 'היט אפ…', g_main: 'הויפט אנזאגן', g_piece: 'שטיקלעך זאצן', g_words: 'ווערטער', g_dates: 'טעג און חדשים',
    g_numbers: 'נומערן', g_areas: 'געגנטן', g_places: 'ערטער', g_companies: 'נעמען פון קאמפאניס',
    voiceHelp: 'דרוקט "נעם אויף", רעדט, דרוקט "שטעל אפ" – עס ווערט גלייך אפגעהיטן. ביז אלע הקלטות פון א זאץ זענען דא, זאגט דער טעלעפאן יענעם זאץ אויף ענגליש. ענדערונגען קומען אן צום טעלעפאן אין א מינוט ארום.',
  },
};
// texts for "forgot password" (all 4 languages)
const L15F = {
  en: { npCancel: 'Cancel and log out', fExpired: 'This link has expired or was already used. Click "Forgot password?" again to get a new one.', forgot: 'Forgot password?', fEmail: 'Write your email above first', fSent: 'If this email is registered, we sent you a link to choose a new password. Check also Spam.',
        newPwTitle: 'Choose a new password', newPw: 'New password (at least 6 characters)', newPw2: 'Write it again', newPwSave: 'Save the new password',
        pwShort: 'The password must have at least 6 characters', pwDiff: 'The two passwords are not the same', pwDone: 'The new password is saved' },
  yi: { npCancel: 'זאגט אפ און לאגירט ארויס', fExpired: 'דער לינק איז שוין אויסגעגאנגען אדער שוין גענוצט. קליקט נאכאמאל "פאסווארט פארגעסן?" צו באקומען א נייעם.', forgot: 'פאסווארט פארגעסן?', fEmail: 'שרייבט ערשט אייער אימעיל אויבן', fSent: 'אויב דער אימעיל איז איינגעשריבן, האבן מיר אייך געשיקט א לינק צו קלייבן א נייעם פאסווארט. קוקט אויך אין Spam.',
        newPwTitle: 'קלייבט א נייעם פאסווארט', newPw: 'נייער פאסווארט (כאטש 6 אותיות)', newPw2: 'שרייבט אים נאכאמאל', newPwSave: 'היט אפ דעם נייעם פאסווארט',
        pwShort: 'דער פאסווארט דארף האבן כאטש 6 אותיות', pwDiff: 'די צוויי פאסווארטן זענען נישט די זעלבע', pwDone: 'דער נייער פאסווארט איז אפגעהיטן' },
  ru: { npCancel: 'Отмена и выход', fExpired: 'Ссылка устарела или уже использована. Нажмите «Забыли пароль?» ещё раз.', forgot: 'Забыли пароль?', fEmail: 'Сначала введите ваш email выше', fSent: 'Если этот email зарегистрирован, мы отправили ссылку для нового пароля. Проверьте также папку Спам.',
        newPwTitle: 'Выберите новый пароль', newPw: 'Новый пароль (минимум 6 символов)', newPw2: 'Повторите пароль', newPwSave: 'Сохранить новый пароль',
        pwShort: 'Пароль должен быть не менее 6 символов', pwDiff: 'Пароли не совпадают', pwDone: 'Новый пароль сохранён' },
  es: { npCancel: 'Cancelar y salir', fExpired: 'El enlace expiró o ya fue usado. Haga clic en «¿Olvidó su contraseña?» otra vez.', forgot: '¿Olvidó su contraseña?', fEmail: 'Primero escriba su email arriba', fSent: 'Si este email está registrado, le enviamos un enlace para elegir una nueva contraseña. Revise también Spam.',
        newPwTitle: 'Elija una nueva contraseña', newPw: 'Nueva contraseña (mínimo 6 caracteres)', newPw2: 'Escríbala otra vez', newPwSave: 'Guardar la nueva contraseña',
        pwShort: 'La contraseña debe tener al menos 6 caracteres', pwDiff: 'Las dos contraseñas no son iguales', pwDone: 'La nueva contraseña está guardada' },
};
const tF = k => { const v = (L15F[lang] && L15F[lang][k]) || L15F.en[k] || k; return lang === 'yi' ? cleanYi(v) : v; };
// "reset password" state: kept in localStorage so a refresh does NOT skip the new-password window
// (index.html also sets it in <head>, before supabase cleans the address bar)
const V15RK = 'cr_pw_recovery', V15R_MAX = 24 * 3600 * 1000;
if (/type=recovery/.test(location.hash + location.search)) localStorage.setItem(V15RK, String(Date.now()));
const v15RecPending = () => { const t = +localStorage.getItem(V15RK) || 0; if (t && Date.now() - t > V15R_MAX) { localStorage.removeItem(V15RK); return false; } return !!t; };
const v15LinkExpired = /error_code=otp_expired|error_code=access_denied/.test(location.hash + location.search);
const t5 = k => { const v = (L15[lang] && L15[lang][k]) || L15.en[k] || k; return lang === 'yi' ? cleanYi(v) : v; };
const v15 = { prices: false, stats: false, voice: false, pq: '', pOpen: null, ev: null, files: null, set: {}, filter: 'missing', grp: 'main', rec: null };

// ---------- toolbar buttons ----------
function v15Static() {
  v15ForgotStatic();
  if (!$('pricesToggle')) return;
  $('pricesToggle').innerHTML = ic('dollar') + ' ' + esc(t5('prices'));
  $('statsToggle').innerHTML = ic('users') + ' ' + esc(t5('stats'));
  $('pricesToggle').classList.toggle('hidden', !loggedIn);
  $('statsToggle').classList.toggle('hidden', !isAdmin);
  if (!loggedIn) { v15.prices = v15.stats = false; }
  if (!isAdmin) { v15.stats = false; }
  v15RenderPrices(); v15RenderStats();
}
$('pricesToggle').onclick = () => { v15.prices = !v15.prices; v15RenderPrices(); };
$('statsToggle').onclick = async () => { v15.stats = !v15.stats; if (v15.stats && !v15.ev) await v15LoadStats(); v15RenderStats(); };
const v15Head = (title, key) => `<div class="row"><h4>${title}</h4><button class="ghost small" style="margin:0" data-v15close="${key}">${ic('x')} ${esc(t_('close'))}</button></div>`;
document.addEventListener('click', e => {
  const b = e.target.closest('[data-v15close]');
  if (b) { v15[b.dataset.v15close] = false; v15Static(); }
});

// ---------- 1) price table (everyone) ----------
function v15RenderPrices() {
  const box = $('pricesPanel');
  const show = loggedIn && v15.prices;
  box.classList.toggle('hidden', !show);
  if (!show) return;
  if (!box.querySelector('#v15pq')) {
    box.innerHTML = v15Head(`${ic('dollar')} ${esc(t5('pricesTitle'))}`, 'prices') +
      `<input id="v15pq" type="text"><div class="meta" id="v15phint"></div><div id="v15plist"></div>`;
    $('v15pq').oninput = () => { v15.pq = $('v15pq').value; v15PriceList(); };
  }
  box.querySelector('h4').innerHTML = `${ic('dollar')} ${esc(t5('pricesTitle'))}`;
  $('v15pq').placeholder = t5('pricesSearch');
  $('v15pq').value = v15.pq;
  $('v15phint').textContent = t5('clickRoute');
  v15PriceList();
}
function v15PriceList() {
  const g = {};
  (pricedAll || []).forEach(r => {
    if (!r.trip_from || !r.trip_to) return;
    const k = r.trip_from + '|' + r.trip_to + '|' + (r.round_trip ? 1 : 0);
    (g[k] = g[k] || []).push(r);
  });
  const q = v15.pq.trim().toLowerCase();
  let rows = Object.entries(g).map(([k, l]) => {
    const [f, to, rt] = k.split('|'), ps = l.map(r => Number(r.price_paid));
    return { k, f, to, rt: rt === '1', l, n: l.length, med: median(ps), min: Math.min(...ps), max: Math.max(...ps) };
  });
  if (q) rows = rows.filter(r => [r.f, r.to, placeLabel(r.f), placeLabel(r.to)].join(' ').toLowerCase().includes(q));
  rows.sort((a, b) => b.n - a.n || a.f.localeCompare(b.f));
  const coName = id => (allCompanies.find(c => c.id === id) || {}).name || '?';
  $('v15plist').innerHTML = !rows.length ? `<p class="meta">${esc(t5('noPricesYet'))}</p>` :
    `<table class="v15t"><tr><th>${esc(t5('route'))}</th><th>${esc(t5('usual'))}</th><th>${esc(t5('lowest'))}</th><th>${esc(t5('highest'))}</th><th>${esc(t5('reports'))}</th></tr>` +
    rows.map(r => {
      let h = `<tr class="v15route" data-v15route="${esc(r.k)}"><td><b>${esc(placeLabel(r.f))}</b> ${lang === 'yi' ? '←' : '→'} <b>${esc(placeLabel(r.to))}</b>${r.rt ? ` <span class="ustat">${esc(t5('roundT'))}</span>` : ''}</td>
        <td><b>${money$(r.med)}</b></td><td>${money$(r.min)}</td><td>${money$(r.max)}</td><td>${r.n}</td></tr>`;
      if (v15.pOpen === r.k) {
        const by = {};
        r.l.forEach(x => (by[x.company_id] = by[x.company_id] || []).push(Number(x.price_paid)));
        h += Object.entries(by).map(([cid, ps]) => ({ cid, med: median(ps), n: ps.length })).sort((a, b) => a.med - b.med)
          .map(c => `<tr class="v15sub"><td>${ic('office')} ${esc(coName(c.cid))}</td><td><b>${money$(c.med)}</b></td><td colspan="2"></td><td>${c.n}</td></tr>`).join('');
      }
      return h;
    }).join('') + '</table>';
}
document.addEventListener('click', e => {
  const r = e.target.closest('[data-v15route]');
  if (!r) return;
  v15.pOpen = v15.pOpen === r.dataset.v15route ? null : r.dataset.v15route;
  v15PriceList();
});

// ---------- 2) statistics (admin) ----------
function v15LogView(companyId) {
  if (!loggedIn || isAdmin || !myUid) return;
  sb.from('usage_events').insert({ source: 'web', kind: 'view', company_id: String(companyId), user_id: myUid }).then(() => {}, () => {});
}
async function v15LoadStats() {
  const since = new Date(Date.now() - 30 * 864e5).toISOString();
  let all = [];
  for (let off = 0; off < 100000; off += 1000) {
    const { data, error } = await sb.from('usage_events').select('created_at,source,kind,company_id,phone_hash,info')
      .gte('created_at', since).order('created_at', { ascending: false }).range(off, off + 999);
    if (error) { toast(error.message, true); break; }
    all = all.concat(data || []);
    if (!data || data.length < 1000) break;
  }
  v15.ev = all;
}
function v15RenderStats() {
  const box = $('statsPanel');
  const show = isAdmin && v15.stats;
  box.classList.toggle('hidden', !show);
  if (!show) return;
  const ev = v15.ev || [];
  const day = d => new Date(d).toLocaleDateString('en-CA');
  const now = Date.now(), within = (e, days) => now - new Date(e.created_at).getTime() < days * 864e5;
  const todayK = day(now);
  const calls = ev.filter(e => e.kind === 'call');
  const okCalls = calls.filter(e => e.info === 'ok');
  const cnt = l => ({ t: l.filter(e => day(e.created_at) === todayK).length, w: l.filter(e => within(e, 7)).length, m: l.length });
  const c = cnt(calls), v = cnt(ev.filter(e => e.kind === 'view'));
  const callers = new Set(okCalls.map(e => e.phone_hash).filter(Boolean)).size;
  const denied = calls.filter(e => e.info !== 'ok').length;
  const dials = ev.filter(e => e.kind === 'dial').length;
  const box3 = (label, o) => `<div class="v15box"><div class="v15lbl">${esc(label)}</div><div class="v15nums">
      <span><b>${o.t}</b>${esc(t5('today'))}</span><span><b>${o.w}</b>${esc(t5('d7'))}</span><span><b>${o.m}</b>${esc(t5('d30'))}</span></div></div>`;
  const box1 = (label, n) => `<div class="v15box"><div class="v15lbl">${esc(label)}</div><div class="v15big">${n}</div></div>`;
  // per day bars
  const days = [];
  for (let i = 13; i >= 0; i--) days.push(day(now - i * 864e5));
  const pc = {}, pv = {};
  calls.forEach(e => { const k = day(e.created_at); pc[k] = (pc[k] || 0) + 1; });
  ev.filter(e => e.kind === 'view').forEach(e => { const k = day(e.created_at); pv[k] = (pv[k] || 0) + 1; });
  const mx = Math.max(1, ...days.map(k => Math.max(pc[k] || 0, pv[k] || 0)));
  const bars = `<div class="v15bars">` + days.map(k => `<div class="v15day" title="${k}">
      <div class="v15stack"><i class="bc" style="height:${(pc[k] || 0) / mx * 100}%"></i><i class="bv" style="height:${(pv[k] || 0) / mx * 100}%"></i></div>
      <small>${k.slice(8)}</small><small>${pc[k] || 0}/${pv[k] || 0}</small></div>`).join('') + `</div>
      <div class="meta"><span class="dot bc"></span> ${esc(t5('phone'))} &nbsp; <span class="dot bv"></span> ${esc(t5('web'))}</div>`;
  // top companies
  const top = {};
  ev.forEach(e => {
    if (!e.company_id || e.company_id === 'undefined') return;
    const o = top[e.company_id] = top[e.company_id] || { p: 0, w: 0, d: 0 };
    if (e.kind === 'lookup') o.p++; else if (e.kind === 'view') o.w++; else if (e.kind === 'dial') o.d++;
  });
  const coName = id => (allCompanies.find(x => String(x.id) === String(id)) || {}).name || '?';
  const topL = Object.entries(top).sort((a, b) => (b[1].p + b[1].w) - (a[1].p + a[1].w)).slice(0, 15);
  const routes = {};
  ev.filter(e => e.kind === 'best_price' && e.info).forEach(e => routes[e.info] = (routes[e.info] || 0) + 1);
  const rL = Object.entries(routes).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const rName = s => s.split(' -> ').map(placeLabel).join(lang === 'yi' ? ' ← ' : ' → ');
  box.innerHTML = `<div class="row"><h4>${ic('users')} ${esc(t5('statsTitle'))}</h4><div class="row" style="gap:6px">
      <button class="ghost small" style="margin:0" id="v15sref">${esc(t5('refresh'))}</button>
      <button class="ghost small" style="margin:0" data-v15close="stats">${ic('x')} ${esc(t_('close'))}</button></div></div>
    <div class="v15grid">${box3(t5('calls'), c)}${box3(t5('webViews').replace(/ \(.*\)/, ''), v)}${box1(t5('callers'), callers)}${box1(t5('dials'), dials)}${box1(t5('denied'), denied)}</div>
    <h5>${esc(t5('perDay'))}</h5>${bars}
    <h5>${esc(t5('topLooked'))}</h5>` +
    (topL.length ? `<table class="v15t"><tr><th></th><th>${esc(t5('phone'))}</th><th>${esc(t5('web'))}</th><th>📞</th></tr>` +
      topL.map(([id, o]) => `<tr><td>${esc(coName(id))}</td><td>${o.p}</td><td>${o.w}</td><td>${o.d}</td></tr>`).join('') + '</table>'
      : `<p class="meta">${esc(t5('noData'))}</p>`) +
    `<h5>${esc(t5('topRoutes'))}</h5>` +
    (rL.length ? `<table class="v15t">` + rL.map(([k, n]) => `<tr><td>${esc(rName(k))}</td><td>${n}</td></tr>`).join('') + '</table>'
      : `<p class="meta">${esc(t5('noData'))}</p>`);
  $('v15sref').onclick = async () => { await v15LoadStats(); v15RenderStats(); };
}

// ---------- 4) robot check (Cloudflare Turnstile) on login / sign up ----------
let v15Site = '', v15Tok = '', v15Wid = null;
const v15NeedCaptcha = () => !!v15Site && !v15Tok;
const v15Token = () => v15Tok || undefined;
function v15ResetCaptcha() {
  v15Tok = '';
  try { if (v15Wid !== null && window.turnstile) turnstile.reset(v15Wid); } catch (e) {}
}
(async () => {
  try {
    const { data } = await sb.rpc('cr_public_config');
    v15Site = (data && data.turnstile_site_key) || '';
  } catch (e) { v15Site = ''; }
  if (!v15Site) return;
  window.v15TsReady = () => {
    v15Wid = turnstile.render('#tsBox', {
      sitekey: v15Site, language: 'en', appearance: 'always',   // always visible, always English
      callback: t => { v15Tok = t; }, 'expired-callback': () => { v15Tok = ''; }, 'error-callback': () => { v15Tok = ''; },
    });
  };
  const sc = document.createElement('script');
  sc.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=v15TsReady';
  sc.async = true;
  document.head.appendChild(sc);
})();

// ---------- 5) forgot password ----------
(function () {
  const p = document.createElement('p');
  p.id = 'forgotWrap'; p.style.cssText = 'text-align:center;margin:2px 0 0';
  p.innerHTML = '<button id="forgotBtn" type="button" class="link"></button>';
  $('authBtn').insertAdjacentElement('afterend', p);
  const box = document.createElement('div');
  box.id = 'newPwBox'; box.className = 'hidden';
  box.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px';
  box.innerHTML = `<div class="card" style="width:min(420px,100%);margin:0">
    <h3 id="npTitle" style="margin-top:0"></h3><div id="npMsg" class="msg"></div>
    <input id="np1" type="password" autocomplete="new-password" style="width:100%">
    <input id="np2" type="password" autocomplete="new-password" style="width:100%;margin-top:8px">
    <button id="npSave" type="button" style="width:100%;justify-content:center;margin-top:10px;padding:13px"></button>
    <p style="text-align:center;margin:8px 0 0"><button id="npCancel" type="button" class="link"></button></p></div>`;
  document.body.appendChild(box);
})();
function v15ForgotStatic() {
  if (!$('forgotBtn')) return;
  $('forgotBtn').textContent = tF('forgot');
  $('forgotWrap').classList.toggle('hidden', !!isSignup);
  $('npTitle').textContent = tF('newPwTitle');
  $('np1').placeholder = tF('newPw'); $('np2').placeholder = tF('newPw2');
  $('npSave').textContent = tF('newPwSave');
  $('npCancel').textContent = tF('npCancel');
}
$('forgotBtn').onclick = async () => {
  const email = $('email').value.trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) { $('email').focus(); return showMsg($('msg'), tF('fEmail'), false, 6000); }
  if (v15NeedCaptcha()) return showMsg($('msg'), t5('robotFirst'), false, 6000);
  $('forgotBtn').disabled = true;
  const { error } = await sb.auth.resetPasswordForEmail(email, {
    redirectTo: location.origin + location.pathname, captchaToken: v15Token(),
  });
  v15ResetCaptcha();
  $('forgotBtn').disabled = false;
  if (error) return showMsg($('msg'), error.message, false);
  showMsg($('msg'), tF('fSent'), true);
};
function v15ShowNewPw() { v15ForgotStatic(); $('newPwBox').classList.remove('hidden'); setTimeout(() => $('np1').focus(), 50); }
function v15HideNewPw() { $('newPwBox').classList.add('hidden'); $('np1').value = $('np2').value = ''; $('npMsg').style.display = 'none'; }
// show the window whenever a reset is pending AND the user is logged in by the link – also after a refresh
function v15CheckRec(session) { if (session && v15RecPending()) v15ShowNewPw(); }
sb.auth.onAuthStateChange((ev, session) => {
  if (ev === 'PASSWORD_RECOVERY') localStorage.setItem(V15RK, String(Date.now()));
  if (ev === 'SIGNED_OUT') { localStorage.removeItem(V15RK); v15HideNewPw(); return; }
  v15CheckRec(session);
});
sb.auth.getSession().then(({ data }) => v15CheckRec(data && data.session));
if (v15LinkExpired) { localStorage.removeItem(V15RK); setTimeout(() => showMsg($('msg'), tF('fExpired'), false), 300); history.replaceState(null, '', location.pathname); }
$('npCancel').onclick = async () => { localStorage.removeItem(V15RK); v15HideNewPw(); await sb.auth.signOut(); };
$('npSave').onclick = async () => {
  const a = $('np1').value, b = $('np2').value;
  if (a.length < 6) return showMsg($('npMsg'), tF('pwShort'), false);
  if (a !== b) return showMsg($('npMsg'), tF('pwDiff'), false);
  $('npSave').disabled = true;
  const { error } = await sb.auth.updateUser({ password: a });
  $('npSave').disabled = false;
  if (error) return showMsg($('npMsg'), error.message, false);
  localStorage.removeItem(V15RK); v15HideNewPw();
  history.replaceState(null, '', location.pathname);
  if (typeof toast === 'function') toast(tF('pwDone')); else alert(tF('pwDone'));
};

v15Static();
