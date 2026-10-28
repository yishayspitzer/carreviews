    const SUPABASE_URL = 'https://qejwhjngfyjdghlfbddv.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlandoam5nZnlqZGdobGZiZGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0MDEyNjEsImV4cCI6MjEwNjk3NzI2MX0.xXrBu4iZnjCCCixzuRJTKBHgDFCSlF0sr-E_UZa7hTo';
    const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    function cleanYi(s) {
      return String(s).normalize('NFD')
        .replace(/[\u0591-\u05C7]/g, '')
        .replace(/\u05F2/g, 'יי').replace(/\u05F0/g, 'וו').replace(/\u05F1/g, 'וי');
    }

    const P = {
      clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      dollar:'<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
      chat:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
      drop:'<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
      shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
      user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
      users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      office:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
      car:'<path d="M3 17h18v-4l-2-6H5l-2 6z"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>',
      phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
      mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
      pin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
      up:'<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>',
      down:'<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>',
      cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      check:'<polyline points="20 6 9 17 4 12"/>',
      search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
      x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
      plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
      edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/>',
      upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
      ban:'<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>'
    };
    const ic = n => `<svg class="ic" viewBox="0 0 24 24">${P[n]}</svg>`;
    const KEY_ICON = { punctuality:'clock', service:'chat', driver_service:'user', cleanliness:'drop', driving:'shield' };

    const PLACES = [
      ['Williamsburg','וויליאמסבורג'], ['Boro Park','בארא פארק'], ['Crown Heights','קראון הייטס'],
      ['Flatbush','פלעטבוש'], ['Midwood','מידוואד'], ['Kensington','קענסינגטאן'],
      ['Kiryas Joel','קרית יואל'], ['Monsey','מאנסי'], ['Spring Valley','ספרינג וואלי'],
      ['Monroe','מאנרא'], ['New Square','סקווירא'], ['Lakewood','לעיקוואוד'],
      ['Passaic','פאסעיק'], ['Teaneck','טינעק'], ['Five Towns','פייוו טאונס'],
      ['Far Rockaway','פאר ראקאוועי'], ['Kew Gardens Hills','קיו גארדענס הילס'],
      ['Manhattan','מאנהעטען'], ['Staten Island','סטעטן איילענד'], ['Montreal','מאנטריאל'],
      ['Swan Lake','סוואן לעיק'], ['Woodridge','וואודרידזש'], ['Monticello','מאנטיסעלאו'],
      ['Liberty','ליבערטי'], ['Loch Sheldrake','לאק שעלדרעיק'], ['Kiamesha Lake','קיאמישא לעיק'],
      ['Fallsburg','פאלסבורג'], ['South Fallsburg','סאוט פאלסבורג'], ['Hurleyville','הערליוויל'],
      ['Parksville','פארקסוויל'], ['Spring Glen','ספרינג גלען'], ['Ellenville','עלענוויל'],
      ['Kerhonkson','קערהאנקסאן'], ['Napanoch','נאפאנאטש'], ['Mountaindale','מאונטיינדייל'],
      ['Rock Hill','ראק היל'], ['Bloomingburg','בלומינגבורג'],
      ['Highland Mills','הייעלאנד מילס'], ['Woodbury','וואדבערי'], ['Blooming Grove','בלומינג גראוו'],
      ['Chester','טשעסטער'], ['Middletown','מידלטאון'], ['Goshen','גאשען'],
      ['Kaser','קעיסער'], ['Wesley Hills','וועסלי הילס'], ['New City','ניו סיטי'],
      ['Airmont','עירמאנט'], ['Suffern','סאפערן'], ['Pomona','פאמאנא'], ['Nanuet','נעניועט'],
      ['Nyack','נייאק'], ['Viola','וויאלא'], ['Chestnut Ridge','טשעסטנאט רידזש'],
      ['JFK Airport','JFK עירפארט'], ['LaGuardia Airport','לאגווארדיע עירפארט'], ['Newark Airport','נוארק עירפארט'],
      ['Stewart Airport','סטוארט עירפארט'], ['Westchester Airport','וועסטטשעסטער עירפארט'], ['Teterboro Airport','טעטערבארא עירפארט'],
      ['Philadelphia','פילאדעלפיע']
    ];
    const placeLabel = v => {
      if (lang !== 'yi') return v;
      const p = PLACES.find(x => x[0] === v);
      return p ? cleanYi(p[1]) : v;
    };
    const sortedPlaces = () => [...PLACES].sort((a, b) =>
      lang === 'yi' ? cleanYi(a[1]).localeCompare(cleanYi(b[1]), 'he') : a[0].localeCompare(b[0]));

    // v11: the last 5 places this user travelled from/to (shown on top of the list)
    let recentPlaces = [];
    async function loadRecentPlaces() {
      recentPlaces = [];
      if (!myUid) return;
      const { data } = await sb.from('reviews').select('trip_from,trip_to,created_at')
        .eq('user_id', myUid).order('created_at', { ascending: false }).limit(40);
      const out = [];
      (data || []).forEach(r => [r.trip_from, r.trip_to].forEach(p => {
        if (p && !out.includes(p) && out.length < 5) out.push(p);
      }));
      recentPlaces = out;
    }

    function placeSelect(id, val, label) {
      const inList = PLACES.some(p => p[0] === val);
      const sel = val ? (inList ? val : '__other') : '';
      const rec = (id === 'revFrom' || id === 'revTo') ? recentPlaces : [];
      return `<div class="placebox">
        <label class="plabel" for="${id}">${esc(label)}</label>
        <select id="${id}" class="placeSel" required>
          <option value="" disabled hidden ${sel ? '' : 'selected'}>${esc(t_('pickPlace'))}</option>
          ${rec.length ? `<optgroup label="★ ${esc(t_('recentPlaces'))}">${rec.map(p => `<option value="${esc(p)}">${esc(placeLabel(p))}</option>`).join('')}</optgroup><optgroup label="${esc(t_('allPlaces'))}">` : ''}
          ${sortedPlaces().map(p => `<option value="${esc(p[0])}" ${sel === p[0] ? 'selected' : ''}>${esc(placeLabel(p[0]))}</option>`).join('')}
          <option value="__other" ${sel === '__other' ? 'selected' : ''}>${esc(t_('otherPlace'))}</option>
          ${rec.length ? '</optgroup>' : ''}
        </select>
        <input id="${id}Txt" type="text" maxlength="120" placeholder="${esc(t_('otherPlaceType'))}" value="${esc(sel === '__other' ? val : '')}" class="${sel === '__other' ? '' : 'hidden'}">
      </div>`;
    }
    function readPlace(id) {
      const s = $(id).value;
      if (s === '__other') return $(id + 'Txt').value.trim() || null;
      return s || null;
    }
    function renderCityBox(reset) {
      const cur = (!reset && $('cCity')) ? (readPlace('cCity') || '') : '';
      $('cCityBox').innerHTML = placeSelect('cCity', cur, t_('cityPh'));
    }

    const PUNCT = [[5, 'pt_1'], [3, 'pt_2'], [2, 'pt_3'], [1, 'pt_4']];
    const normP = v => v >= 5 ? 5 : (v >= 3 ? 3 : (v === 2 ? 2 : (v === 1 ? 1 : undefined)));
    const punctLabel = v => { const p = PUNCT.find(x => x[0] === v); return p ? t_(p[1]) : null; };
    function detectLang() {
      const saved = localStorage.getItem('lang');
      if (saved && T[saved]) return saved;
      const n = (navigator.language || 'en').slice(0, 2).toLowerCase();
      return T[n] ? n : 'en';
    }
    let lang = detectLang();
    const t_ = k => {
      const v = (T[lang] && T[lang][k]) || T.en[k] || k;
      return lang === 'yi' ? cleanYi(v) : v;
    };
    const dl = () => lang === 'yi' ? 'he' : lang;

    const REQ_KEYS = ['punctuality', 'service', 'cleanliness', 'driving'];
    const GROUPS = [
      ['grpOffice', 'office', ['punctuality', 'service']],
      ['grpDriver', 'car', ['driver_service', 'cleanliness', 'driving']]
    ];
    const ALL_KEYS = ['punctuality', 'service', 'driver_service', 'cleanliness', 'driving'];
    const POS_TAGS = ['polite', 'clean', 'fair_price', 'safe', 'great_service'];
    const NEG_TAGS = ['rude', 'dirty', 'overcharged', 'unsafe', 'no_answer'];
    const LEGACY_TAGS = ['on_time', 'late'];
    const TODS = ['morning', 'afternoon', 'evening', 'night'];
    const isPos = k => POS_TAGS.includes(k);
    const writeLangBlocked = () => !isAdmin && (lang === 'ru' || lang === 'es');

    let isSignup = false, openId = null, openMode = 'view', editingId = null, draft = {};
    let myUid = null, myEmail = '', myPhone = '', isAdmin = false, isBanned = false, loggedIn = false;
    let canReview = false, myReqPending = false, permReqs = [];
    let allCompanies = [], stats = {}, recStats = {}, cnts = {}, myReviewId = null;
    let userMap = {}, usersOpen = false, usersFilter = false;
    let sugMap = {}, sugList = [], sugTarget = null;
    let reqList = [], msgList = [], reqOpen = true;
    let pendRevs = [], adminRevs = [], flagMap = {};
    let detailData = [], showN = 8;
    let userRevsId = null;
function userRevsHtml(uid){
  const l = adminRevs.filter(r => r.user_id === uid).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  if (!l.length) return '<div class="meta" style="width:100%">—</div>';
  return '<div style="width:100%">' + l.map(r => {
    const co = allCompanies.find(c => c.id === r.company_id) || {};
    const core = coreOf(r);
    return `<div class="rev"><div class="rh"><b>${esc(co.name || '?')}</b>${core > 0 ? `<span class="badge bg-${tone(core)}">${core.toFixed(1)}</span>` : ''}<span class="meta" style="margin:0;margin-inline-start:auto">${new Date(r.created_at).toLocaleDateString(dl())}</span></div>${r.comment ? `<div class="cmt">${esc(r.comment)}</div>` : ''}</div>`;
  }).join('') + '</div>';
}

    const $ = id => document.getElementById(id);
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const stars = v => { const n = Math.round(Number(v) || 0); return '★'.repeat(n) + '☆'.repeat(5 - n); };
    const tone = v => v >= 4 ? 'good' : v >= 3 ? 'mid' : 'bad';
    const money = v => '$' + (Number(v) % 1 ? Number(v).toFixed(2) : Number(v).toFixed(0));
    const coreOf = r => {
      const vals = REQ_KEYS.map(k => r[k]).filter(v => v !== null && v !== undefined);
      return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    };
    const fmtPhone = p => {
      const d = String(p ?? '').replace(/\D/g, '');
      if (d.length === 10) return d.slice(0,3) + '-' + d.slice(3,6) + '-' + d.slice(6);
      if (d.length === 11 && d[0] === '1') return d.slice(1,4) + '-' + d.slice(4,7) + '-' + d.slice(7);
      return String(p ?? '');
    };
    const telHref = p => 'tel:' + String(p).replace(/[^\d+]/g, '');
    const telLink = p => p ? `<a class="tel em" href="${esc(telHref(p))}">${esc(fmtPhone(p))}</a>` : '';
    const hasPrice = r => r.price_paid !== null && r.price_paid !== undefined && !!r.trip_from && !!r.trip_to;
    const rtBadge = r => r.round_trip ? `<span class="rtbadge">${esc(t_('roundTrip'))}</span>` : '';

    const CO_COLORS = [
      ['#ffffff', '#93c5fd', '#1d4ed8'], ['#ffffff', '#86efac', '#15803d'], ['#ffffff', '#fcd34d', '#b45309'],
      ['#ffffff', '#c4b5fd', '#6d28d9'], ['#ffffff', '#f9a8d4', '#be185d'], ['#ffffff', '#67e8f9', '#0e7490']
    ];
    function coStyle(id) {
      let h = 0;
      for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
      const c = CO_COLORS[h % CO_COLORS.length];
      return `background:${c[0]};border:1.5px solid ${c[1]};border-inline-start:7px solid ${c[2]};`;
    }

    function llGet() { try { return JSON.parse(localStorage.getItem('langSecs')) || {}; } catch (e) { return {}; } }
    setInterval(() => {
      if (document.hidden) return;
      const o = llGet(); o[lang] = (o[lang] || 0) + 10;
      localStorage.setItem('langSecs', JSON.stringify(o));
    }, 10000);
    async function langAlertIfNeeded() {
      if (isAdmin || !myUid || lang === 'ru' || lang === 'es') return;
      const o = llGet(), other = (o.ru || 0) + (o.es || 0), mine = (o.en || 0) + (o.yi || 0);
      if (other < 300 || other <= mine * 2) return;
      const k = 'langAlert_' + myUid, today = new Date().toDateString();
      if (localStorage.getItem(k) === today) return;
      localStorage.setItem(k, today);
      await sb.from('admin_messages').insert({ user_id: myUid, body: 'ווארענונג: דער באניצער נוצט רוב צייט רוסיש/ספאניש, אבער האט זיך איבערגעטוישט צו ענגליש/אידיש כדי צו שרייבן א רעוויו.' });
    }


    function renderWelcome() {
      const box = $('welcome');
      if (!box) return;
      const w = WELCOME[lang] || WELCOME.en;
      const f = s => lang === 'yi' ? cleanYi(s) : s;
      box.innerHTML = `
        <div class="wHead"><h3>${f(w.title)}</h3></div>
        <div class="wBody">
          <div class="wBlock"><h5>${f(w.what)}</h5><p>${f(w.whatT)}</p></div>
          <div class="wBlock"><h5>${f(w.goal)}</h5><p>${f(w.goalT)}</p></div>
          <div class="wBlock"><h5>${f(w.how)}</h5><ol class="wSteps">${w.steps.map(s => `<li><div>${f(s)}</div></li>`).join('')}</ol></div>
          <div class="wPriv"><span>🔒</span><div>${f(w.priv)}</div></div>
          ${w.phone ? `<div class="wPriv wPhone"><span>📞</span><div>${f(w.phone)}</div></div>` : ''}
          <div class="wAsk"><div class="t1">${f(w.ask1)}</div><div class="t2">${f(w.ask2)}</div></div>
          <div class="wBlock"><h5>${f(w.rules)}</h5><ul class="wRules">${w.rulesL.map(s => `<li>${f(s)}</li>`).join('')}</ul></div>
          <div class="wFoot">${f(w.foot)}</div>
        </div>`;
    }

    (function makeFavicon() {
      try {
        const c = document.createElement('canvas');
        c.width = c.height = 128;
        const x = c.getContext('2d');
        x.fillStyle = '#fff';
        x.fillRect(0, 0, 128, 128);
        x.textAlign = 'center';
        x.textBaseline = 'alphabetic';
        x.fillStyle = '#1a3c6e';
        x.font = 'italic 900 56px Arial, sans-serif';
        x.fillText('Car', 64, 58);
        x.fillStyle = '#e8660a';
        x.font = 'italic 900 31px Arial, sans-serif';
        x.fillText('Reviews', 64, 104);
        $('favicon').href = c.toDataURL('image/png');
      } catch (e) {}
    })();

    const hf = (d, o) => { try { return new Intl.DateTimeFormat('he-u-ca-hebrew', o).format(d); } catch (e) { return ''; } };
    const hDay = d => {
      try { return Number(new Intl.DateTimeFormat('en-u-ca-hebrew', { day: 'numeric' }).formatToParts(d).find(x => x.type === 'day').value); }
      catch (e) { return 1; }
    };
    const hYearNum = d => {
      try {
        const p = new Intl.DateTimeFormat('en-u-ca-hebrew', { year: 'numeric' }).formatToParts(d)
          .find(x => x.type === 'year' || x.type === 'relatedYear');
        if (p) return Number(String(p.value).replace(/\D/g, ''));
      } catch (e) {}
      return Number((hf(d, { year: 'numeric' }).match(/\d+/) || [5787])[0]);
    };
    function gem(n) {
      const hund = [[400,'ת'],[300,'ש'],[200,'ר'],[100,'ק']];
      const tens = [[90,'צ'],[80,'פ'],[70,'ע'],[60,'ס'],[50,'נ'],[40,'מ'],[30,'ל'],[20,'כ'],[10,'י']];
      const ones = ['','א','ב','ג','ד','ה','ו','ז','ח','ט'];
      let s = '';
      for (const [v, l] of hund) { while (n >= v) { s += l; n -= v; } }
      if (n === 15) { s += 'טו'; n = 0; }
      else if (n === 16) { s += 'טז'; n = 0; }
      for (const [v, l] of tens) { if (n >= v) { s += l; n -= v; } }
      s += ones[n];
      if (!s) return '';
      return s.length === 1 ? s + '׳' : s.slice(0, -1) + '״' + s.slice(-1);
    }
    const gemYear = d => gem(hYearNum(d) % 1000);

    const MONTHS = [
      ['אדר א','adar1','אדר ראשון'], ['אדר ב','adar2','אדר שני'], ['תשרי','tishri','תשרי'],
      ['חשו','cheshvan','חשוון'], ['מרחשו','cheshvan','חשוון'], ['כסלו','kislev','כסלו'], ['טבת','tevet','טבת'],
      ['שבט','shvat','שבט'], ['אדר','adar','אדר'], ['ניסן','nisan','ניסן'], ['אייר','iyar','אייר'],
      ['סיו','sivan','סיוון'], ['תמוז','tamuz','תמוז'], ['אב','av','מנחם אב'], ['אלול','elul','אלול']
    ];
    function monthInfo(d) {
      const n = hf(d, { month: 'long' }).replace(/[׳״'"]/g, '').trim();
      for (const [pre, key, name] of MONTHS) if (n.startsWith(pre)) return { key, name };
      return { key: n, name: n };
    }
    const hMonth = d => hf(d, { month: 'long', year: 'numeric' });

    const WD_YI = ['זונטאג','מאנטאג','דינסטאג','מיטוואך','דאנערשטאג','פרייטאג','שבת קודש'];
    const WD_HE = ['יום ראשון','יום שני','יום שלישי','יום רביעי','יום חמישי','יום שישי','שבת קודש'];
    const wdName = d => (lang === 'yi' ? WD_YI : WD_HE)[d.getDay()];
    const WD_HDR = () => lang === 'yi' ? WD_YI : ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];

    const hebStr = d => `${wdName(d)}, ${gem(hDay(d))} ${monthInfo(d).name} ${gemYear(d)}`;
    const hebFromStr = s => s ? hebStr(new Date(s + 'T12:00:00')) : '';
    const noon = d => { const x = new Date(d); x.setHours(12, 0, 0, 0); return x; };
    const isoOf = x => x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
    const dateLabel = iso => {
      const dt = new Date(iso + 'T12:00:00');
      return hebStr(dt) + ' · ' + dt.toLocaleDateString(dl(), { day: 'numeric', month: 'short', year: 'numeric' });
    };

    function dayMark(x) {
      const hd = hDay(x), key = monthInfo(x).key, dow = x.getDay();
      let hol = '';
      switch (key) {
        case 'tishri':
          if (hd <= 2) hol = 'ר״ה';
          else if ((hd === 3 && dow !== 6) || (hd === 4 && dow === 0)) hol = 'צום';
          else if (hd === 10) hol = 'יוה״כ';
          else if (hd === 15 || hd === 16) hol = 'סוכות';
          else if (hd >= 17 && hd <= 20) hol = 'חוה״מ';
          else if (hd === 21) hol = 'הו״ר';
          else if (hd === 22) hol = 'שמ״ע';
          else if (hd === 23) hol = 'שמח״ת';
          break;
        case 'kislev': if (hd >= 25) hol = 'חנוכה'; break;
        case 'tevet':
          if (hd <= 2) hol = 'חנוכה';
          else if (hd === 3) { const p = new Date(x); p.setDate(p.getDate() - 3); if (hDay(p) === 29) hol = 'חנוכה'; }
          else if (hd === 10) hol = 'צום';
          break;
        case 'shvat': if (hd === 15) hol = 'ט״ו'; break;
        case 'adar': case 'adar2':
          if ((hd === 13 && dow !== 6) || (hd === 11 && dow === 4)) hol = 'תענית';
          else if (hd === 14) hol = 'פורים';
          else if (hd === 15) hol = 'שושן';
          break;
        case 'nisan':
          if (hd === 15 || hd === 16) hol = 'פסח';
          else if (hd >= 17 && hd <= 20) hol = 'חוה״מ';
          else if (hd === 21) hol = 'שביעי';
          else if (hd === 22) hol = 'אחרון';
          break;
        case 'iyar': if (hd === 18) hol = 'ל״ג'; break;
        case 'sivan': if (hd === 6 || hd === 7) hol = 'שבועות'; break;
        case 'tamuz': if ((hd === 17 && dow !== 6) || (hd === 18 && dow === 0)) hol = 'צום'; break;
        case 'av': if ((hd === 9 && dow !== 6) || (hd === 10 && dow === 0)) hol = 'ת״ב'; break;
      }
      const rc = (hd === 30 || (hd === 1 && key !== 'tishri')) ? 'ר״ח' : '';
      return [rc, hol].filter(Boolean).join(' ');
    }

    let calAnchor = noon(new Date()), calFirst = null, calLast = null;
    let pickMode = false;

    function renderCal() {
      const a = noon(calAnchor);
      const first = new Date(a); first.setDate(a.getDate() - (hDay(a) - 1));
      const label = hMonth(first);
      const days = [];
      const d = new Date(first);
      while (hMonth(d) === label && days.length < 31) { days.push(new Date(d)); d.setDate(d.getDate() + 1); }
      calFirst = first; calLast = days[days.length - 1];
      const now = new Date();
      const todayStr = now.toDateString();
      const selIso = pickMode && $('revDate') ? $('revDate').value : '';

      let html = WD_HDR().map((w, i) => `<div class="cw ${i === 6 ? 'sat' : ''}">${w}</div>`).join('');
      for (let i = 0; i < first.getDay(); i++) html += '<div class="cd blank"></div>';
      days.forEach((x, idx) => {
        const iso = isoOf(x);
        const future = x > now && x.toDateString() !== todayStr;
        const mk = dayMark(x);
        const g = (idx === 0 || x.getDate() === 1)
          ? x.getDate() + ' ' + x.toLocaleDateString(dl(), { month: 'short' })
          : String(x.getDate());
        html += `<div class="cd ${x.getDay() === 6 ? 'sat' : ''} ${x.toDateString() === todayStr ? 'today' : ''} ${iso === selIso ? 'sel' : ''} ${pickMode && future ? 'fut' : ''}" ${pickMode && !future ? `data-day="${iso}"` : ''}>
          <b>${esc(gem(hDay(x)))}</b><small>${esc(g)}</small>${mk ? `<i class="hl">${esc(mk)}</i>` : ''}</div>`;
      });
      $('calBody').innerHTML = `<div class="calGrid">${html}</div>`;
      $('calTitle').textContent = monthInfo(first).name + ' ' + gemYear(first);
      const o = { month: 'short', year: 'numeric' };
      $('calSub').textContent = calFirst.toLocaleDateString(dl(), o) + ' – ' + calLast.toLocaleDateString(dl(), o);
      $('calHint').textContent = t_('calPick');
      $('calHint').classList.toggle('hidden', !pickMode);
      $('calTodayBtn').textContent = pickMode ? t_('calPickToday') : t_('calToday');
    }
    function openCal() { pickMode = false; calAnchor = noon(new Date()); renderCal(); $('calModal').style.display = 'flex'; }
    function openPick() {
      pickMode = true;
      const v = $('revDate') && $('revDate').value;
      calAnchor = v ? noon(new Date(v + 'T12:00:00')) : noon(new Date());
      renderCal();
      $('calModal').style.display = 'flex';
    }
    function closeCal() { $('calModal').style.display = 'none'; pickMode = false; }
    function setTripDate(iso) {
      const inp = $('revDate');
      if (!inp) return;
      inp.value = iso;
      draft.trip_date = iso;
      const txt = $('revDateTxt');
      if (txt) { txt.textContent = dateLabel(iso); txt.parentElement.classList.add('has'); }
    }

    let toastTimer;
    // v10: translate database limit errors into friendly text
    function niceErr(text) {
      const s = String(text || '');
      if (/DAILY_LIMIT/.test(s)) return t_('dailyLimit');
      if (/TOO_MANY/.test(s)) return t_('tooMany');
      return s;
    }
    function toast(text, isErr, ms) {
      if (isErr) text = niceErr(text);
      const el = $('toast');
      el.className = isErr ? 'err' : '';
      el.innerHTML = ic(isErr ? 'x' : 'check') + '<span>' + esc(text) + '</span>';
      el.style.display = 'flex';
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => el.style.display = 'none', ms || (isErr ? 4500 : 2500));
    }

    function applyStaticText() {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'yi' ? 'rtl' : 'ltr';
      $('langSel').value = lang;
      renderWelcome();
      if ($('hotlineBar')) $('hotlineBar').innerHTML = `📞 ${esc(t_('hotline'))} <a href="${HOTLINE_TEL}" dir="ltr">${HOTLINE_TXT}</a>`;
      $('calBtn').innerHTML = ic('cal') + ' ' + esc(hebStr(new Date()));
      $('calTodayBtn').textContent = pickMode ? t_('calPickToday') : t_('calToday');
      $('calCloseBtn').textContent = t_('calClose');
      $('authTitle').textContent = isSignup ? t_('signup') : t_('login');
      $('authBtn').textContent = isSignup ? t_('signup') : t_('login');
      $('toggleBtn').textContent = isSignup ? t_('haveAccount') : t_('noAccount');
      $('fullName').placeholder = t_('fullName');
      $('email').placeholder = t_('email');
      $('signPhone').placeholder = t_('phonePh');
      $('phoneHint').textContent = t_('phoneHint');
      $('password').placeholder = t_('password');
      $('showPw').textContent = $('password').type === 'password' ? t_('show') : t_('hide');
      $('tCompanies').textContent = t_('companies');
      $('addToggle').innerHTML = ic('plus') + esc(t_('addCompany'));
      $('addToggle').classList.toggle('hidden', isBanned);
      $('usersToggle').innerHTML = ic('users') + esc(t_('users'));
      $('usersToggle').classList.toggle('hidden', !isAdmin);
      $('msgToggle').innerHTML = ic('mail') + ' ' + esc(t_('msgBtn'));
      $('msgToggle').classList.toggle('hidden', isAdmin || isBanned || !loggedIn);
      $('msgTitle').textContent = t_('msgTitle');
      $('msgClose').innerHTML = ic('x') + ' ' + esc(t_('close'));
      $('msgBody').placeholder = t_('msgPh');
      $('msgSend').innerHTML = ic('check') + ' ' + esc(t_('msgSend'));
      $('bannedBanner').textContent = t_('bannedMsg');
      $('bannedBanner').classList.toggle('hidden', !isBanned);
      $('tAddTitle').textContent = t_('addTitle');
      $('addClose').innerHTML = ic('x') + ' ' + esc(t_('close'));
      $('tApprNote').textContent = t_('apprNote');
      $('tApprNote').classList.toggle('hidden', isAdmin);
      $('cName').placeholder = t_('companyName');
      renderCityBox(false);
      $('cDesc').placeholder = t_('description');
      $('cPhone').placeholder = t_('phone');
      $('cEmail').placeholder = t_('email');
      $('tLogoOpt').textContent = t_('logoOpt');
      $('tLogoOpt').classList.toggle('hidden', !isAdmin);
      $('cLogoFile').classList.toggle('hidden', !isAdmin);
      $('saveCompany').textContent = isAdmin ? t_('saveCompany') : t_('sendForApproval');
      $('search').placeholder = t_('search');
      $('searchIc').innerHTML = ic('search');
      const opts = $('sort').options;
      opts[0].textContent = t_('sortCode');
      opts[1].textContent = t_('sortRating');
      opts[2].textContent = t_('sortCount');
      opts[3].textContent = t_('sortNew');
      opts[4].textContent = t_('sortName');
      if (loggedIn) {
        $('userinfo').innerHTML = `<span class="em" dir="ltr">${esc(myEmail)}</span> <button id="logoutBtn">${esc(t_('logout'))}</button>`;
        $('logoutBtn').onclick = logout;
      } else {
        $('userinfo').innerHTML = '';
      }
    }

    $('langSel').onchange = () => {
      syncDraft();
      lang = $('langSel').value;
      localStorage.setItem('lang', lang);
      if (writeLangBlocked() && openMode === 'write') { openId = null; draft = {}; }
      applyStaticText();
      if ($('calModal').style.display === 'flex') renderCal();
      if (loggedIn) { renderCompanies(); renderUsers(); renderRequests(); }
    };
    $('calBtn').onclick = openCal;

    async function uploadLogo(file) {
      if (!file) return null;
      if (file.size > 2 * 1024 * 1024) throw new Error(t_('logoTooBig'));
      const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '');
      const path = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext;
      const { error } = await sb.storage.from('logos').upload(path, file, { contentType: file.type });
      if (error) throw error;
      return sb.storage.from('logos').getPublicUrl(path).data.publicUrl;
    }

    $('sugFile').onchange = async () => {
      const f = $('sugFile').files[0];
      const cid = sugTarget;
      $('sugFile').value = '';
      if (!f || !cid) return;
      if (f.size > 2 * 1024 * 1024) { alert(t_('logoTooBig')); return; }
      try {
        const ext = (f.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '');
        const path = cid + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext;
        const up = await sb.storage.from('logo-suggestions').upload(path, f, { contentType: f.type });
        if (up.error) throw up.error;
        const url = sb.storage.from('logo-suggestions').getPublicUrl(path).data.publicUrl;
        const ins = await sb.from('logo_suggestions').insert({ company_id: cid, user_id: myUid, logo_url: url });
        if (ins.error) throw ins.error;
        toast(t_('logoSent'));
      } catch (err) { alert(err.message || String(err)); }
    };

    async function checkAdmin() {
      isAdmin = false; canReview = false;
      if (!myUid) return;
      try {
        const { data } = await sb.from('profiles').select('role,can_review').eq('id', myUid).maybeSingle();
        isAdmin = !!data && data.role === 'admin';
        canReview = isAdmin || !!(data && data.can_review);
      } catch (e) { isAdmin = false; canReview = false; }
    }
    async function checkBanned() {
      isBanned = false;
      if (!myUid) return;
      try {
        const { data } = await sb.from('banned_users').select('user_id').eq('user_id', myUid).maybeSingle();
        isBanned = !!data;
      } catch (e) { isBanned = false; }
    }
    async function loadMyReq() {
      myReqPending = false;
      if (!myUid || isAdmin || canReview) return;
      try {
        const { data } = await sb.from('review_requests').select('id').eq('user_id', myUid).maybeSingle();
        myReqPending = !!data;
      } catch (e) { myReqPending = false; }
    }

    $('showPw').onclick = () => {
      const p = $('password');
      p.type = p.type === 'password' ? 'text' : 'password';
      $('showPw').textContent = p.type === 'password' ? t_('show') : t_('hide');
    };

    function showMsg(el, text, ok, autoMs) {
      if (!ok) text = niceErr(text);
      if (!el) return alert(text);
      el.textContent = text;
      el.className = 'msg ' + (ok ? 'ok' : 'err');
      el.style.display = 'block';
      clearTimeout(el._t);
      if (autoMs) el._t = setTimeout(() => { el.style.display = 'none'; }, autoMs);
      try { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
    }

    function setMode(signup) {
      isSignup = signup;
      $('nameWrap').classList.toggle('hidden', !signup);
      $('phoneWrap').classList.toggle('hidden', !signup);
      $('msg').style.display = 'none';
      applyStaticText();
    }
    $('toggleBtn').onclick = () => setMode(!isSignup);

    $('authBtn').onclick = async () => {
      const email = $('email').value.trim();
      const password = $('password').value;
      if (!email || password.length < 6) return showMsg($('msg'), t_('enterCreds'), false);
      if (isSignup) {
        const full_name = $('fullName').value.trim();
        const digits = $('signPhone').value.replace(/\D/g, '');
        if (digits.length < 10) return showMsg($('msg'), t_('phoneBad'), false, 6000);
        const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name, phone: fmtPhone(digits) } } });
        if (error) {
          if (/database error/i.test(error.message)) return showMsg($('msg'), t_('signupBlocked'), false, 9000);
          return showMsg($('msg'), error.message, false);
        }
        if (data.session) showMsg($('msg'), t_('created'), true);
        else { showMsg($('msg'), t_('createdConfirm'), true); setMode(false); }
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) return showMsg($('msg'), error.message, false);
      }
    };

    async function logout() { openId = null; editingId = null; await sb.auth.signOut(); }

    function closeAdd() { $('addForm').classList.add('hidden'); $('addMsg').style.display = 'none'; }
    $('addToggle').onclick = () => $('addForm').classList.toggle('hidden');
    $('addClose').onclick = closeAdd;
    $('usersToggle').onclick = () => { usersOpen = !usersOpen; renderUsers(); };

    function closeMsg() { $('msgForm').classList.add('hidden'); $('msgNote').style.display = 'none'; }
    $('msgToggle').onclick = () => $('msgForm').classList.toggle('hidden');
    $('msgClose').onclick = closeMsg;
    $('msgSend').onclick = async () => {
      const body = $('msgBody').value.trim();
      if (!body) return showMsg($('msgNote'), t_('msgEmpty'), false, 4000);
      const btn = $('msgSend');
      btn.disabled = true;
      const { error } = await sb.from('admin_messages').insert({ user_id: myUid, body });
      btn.disabled = false;
      if (error) return showMsg($('msgNote'), error.message, false);
      $('msgBody').value = '';
      closeMsg();
      toast(t_('msgSent'));
    };

    $('saveCompany').onclick = async () => {
      const name = $('cName').value.trim();
      if (!name) return showMsg($('addMsg'), t_('nameRequired'), false, 4000);
      const btn = $('saveCompany');
      btn.disabled = true;
      try {
        const phoneRaw = $('cPhone').value.trim();
        const row = {
          name,
          city: readPlace('cCity'),
          description: $('cDesc').value.trim() || null,
          phone: phoneRaw ? fmtPhone(phoneRaw) : null,
          email: $('cEmail').value.trim() || null
        };
        if (isAdmin) {
          row.logo_url = await uploadLogo($('cLogoFile').files[0]);
          const { error } = await sb.from('companies').insert(row);
          if (error) throw error;
        } else {
          const { error } = await sb.from('change_requests').insert({ user_id: myUid, kind: 'add', company_id: null, data: row });
          if (error) throw error;
          toast(t_('reqSent'));
        }
        ['cName','cDesc','cPhone','cEmail','cLogoFile'].forEach(id => $(id).value = '');
        renderCityBox(true);
        closeAdd();
        loadCompanies();
      } catch (err) { showMsg($('addMsg'), err.message || String(err), false); }
      btn.disabled = false;
    };

    $('search').oninput = () => renderCompanies();
    $('sort').onchange = () => renderCompanies();

    async function loadUsers() {
      userMap = {};
      if (!isAdmin) return;
      const [a, b] = await Promise.all([sb.rpc('admin_users_v2'), sb.rpc('admin_user_activity')]);
      if (!a.error && a.data) a.data.forEach(u => userMap[u.id] = u);
      if (!b.error && b.data) b.data.forEach(x => { if (userMap[x.uid]) Object.assign(userMap[x.uid], x); });
    }
    async function loadSuggestions() {
      sugMap = {}; sugList = [];
      if (!isAdmin) return;
      const { data, error } = await sb.from('logo_suggestions').select('*').order('created_at', { ascending: false });
      if (!error && data) { sugList = data; data.forEach(s => { (sugMap[s.company_id] = sugMap[s.company_id] || []).push(s); }); }
    }
    async function loadRequests() {
      reqList = [];
      if (!isAdmin) return;
      const { data, error } = await sb.from('change_requests').select('*').order('created_at', { ascending: true });
      if (!error && data) reqList = data;
    }
    async function loadMessages() {
      msgList = [];
      if (!isAdmin) return;
      const { data, error } = await sb.from('admin_messages').select('*').order('created_at', { ascending: true });
      if (!error && data) msgList = data;
    }
    async function loadPermReqs() {
      permReqs = [];
      if (!isAdmin) return;
      const { data, error } = await sb.from('review_requests').select('*').order('created_at', { ascending: true });
      if (!error && data) permReqs = data;
    }
    async function loadReviewAdmin() {
      pendRevs = []; adminRevs = []; flagMap = {};
      if (!isAdmin) return;
      const [p, a] = await Promise.all([
        sb.from('reviews').select('*').eq('approved', false).order('created_at', { ascending: true }),
        sb.from('reviews').select('id,user_id,company_id,created_at,punctuality,service,cleanliness,driving,recommend,comment')
      ]);
      if (!p.error && p.data) pendRevs = p.data;
      if (!a.error && a.data) adminRevs = a.data;
      computeFlags();
    }
    function computeFlags() {
      flagMap = {};
      const add = (id, k) => { (flagMap[id] = flagMap[id] || []).push(k); };
      const byUser = {}, byComp = {}, byText = {};
      adminRevs.forEach(r => {
        (byUser[r.user_id] = byUser[r.user_id] || []).push(r);
        (byComp[r.company_id] = byComp[r.company_id] || []).push(r);
        const tx = (r.comment || '').trim().toLowerCase();
        if (tx.length >= 15) (byText[tx] = byText[tx] || []).push(r);
      });
      const H = 3600 * 1000;
      adminRevs.forEach(r => {
        const t0 = new Date(r.created_at).getTime();
        if ([r.punctuality, r.service, r.cleanliness, r.driving].every(v => v === 5) && r.recommend === true) add(r.id, 'perfect');
        if (byUser[r.user_id].filter(x => Math.abs(new Date(x.created_at).getTime() - t0) <= 24 * H).length >= 3) add(r.id, 'burst');
        if (byComp[r.company_id].filter(x => Math.abs(new Date(x.created_at).getTime() - t0) <= 48 * H).length >= 4) add(r.id, 'cluster');
        const tx = (r.comment || '').trim().toLowerCase();
        if (tx.length >= 15 && byText[tx].length > 1) add(r.id, 'dupe');
      });
    }
    const flagHtml = id => (flagMap[id] || []).map(k => `<span class="flag">⚠ ${esc(t_('sig_' + k))}</span>`).join(' ');

    const newUsersList = () => Object.values(userMap)
      .filter(u => u.is_new && u.id !== myUid && !permReqs.some(p => p.user_id === u.id))
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    function profileHtml(u, fallbackPhone) {
      if (!u) return '';
      const phone = u.phone || fallbackPhone || '';
      return `<div class="prof">
        <span>${ic('user')} <b>${esc(u.full_name || '—')}</b></span>
        <span class="em">${ic('mail')} ${esc(u.email)}</span>
        ${phone ? `<a class="callbtn sm" href="${esc(telHref(phone))}">${ic('phone')} ${esc(fmtPhone(phone))}</a>` : ''}
        <span class="meta" style="margin:0">${esc(t_('signedUp'))}: ${esc(new Date(u.created_at).toLocaleString(dl()))}</span>
        ${u.is_company ? `<span class="flag">⚠ ${esc(t_('companyFlag'))}</span>` : ''}
      </div>`;
    }

    function rideHtml(r) {
      const bits = [];
      if (r.trip_from || r.trip_to) bits.push(`<span>${ic('pin')} ${esc(r.trip_from ? placeLabel(r.trip_from) : '?')} → ${esc(r.trip_to ? placeLabel(r.trip_to) : '?')}</span>`);
      if (hasPrice(r)) bits.push(`<span class="price">${esc(money(r.price_paid))}</span>`);
      if (hasPrice(r) && r.toll_included) bits.push(`<span class="rtbadge">${esc(t_('tollIncl'))}</span>`);
      if (hasPrice(r) && r.round_trip) bits.push(rtBadge(r));
      if (hasPrice(r) && r.round_trip && r.first_hour_free) bits.push(`<span class="rtbadge">${esc(t_('firstHourFree'))}</span>`);
      if (hasPrice(r) && r.round_trip && r.hourly_price != null) bits.push(`<span class="rtbadge">${esc(t_('hourlyPrice'))}: ${esc(money(r.hourly_price))}</span>`);
      return bits.length ? `<div class="ridebox">${bits.join('')}</div>` : '';
    }

    function renderRequests() {
      const box = $('reqPanel');
      const newUsers = isAdmin ? newUsersList() : [];
      const total = newUsers.length + permReqs.length + reqList.length + msgList.length + pendRevs.length;
      document.title = (isAdmin && total ? '(' + total + ') ' : '') + 'CarReviews';
      const show = isAdmin && total > 0;
      box.classList.toggle('hidden', !show);
      if (!show) return;
      const head = `<div class="row" ${reqOpen ? 'style="margin-bottom:6px"' : ''}>
          <h4 style="margin:0">${ic('check')} ${esc(t_('reqTitle'))} (${total})</h4>
          <button class="ghost small" style="margin:0" data-reqtoggle="1">${ic(reqOpen ? 'x' : 'plus')}${reqOpen ? ' ' + esc(t_('close')) : ''}</button>
        </div>`;
      if (!reqOpen) { box.innerHTML = head; return; }

      const newHtml = newUsers.map(u => `<div class="reqitem">
          <div><span class="tagkind" style="background:#c2410c">${esc(t_('newAcct'))}</span></div>
          ${profileHtml(u)}
          <div class="row" style="justify-content:flex-start">
            ${u.is_company ? '' : `<button class="green small" style="margin:6px 0 0" data-permok="${u.id}">${ic('check')} ${esc(t_('allowBtn'))}</button>`}
            <button class="ghost small" style="margin:6px 0 0" data-seen="${u.id}">${ic('x')} ${esc(t_('seenBtn'))}</button>
          </div>
        </div>`).join('');

      const permHtml = permReqs.map(p => {
        const u = userMap[p.user_id];
        return `<div class="reqitem">
          <div><span class="tagkind" style="background:#0e7490">${esc(t_('permKind'))}</span></div>
          ${profileHtml(u, p.phone)}
          ${p.note ? `<div class="cmt">${esc(p.note)}</div>` : ''}
          <div class="row" style="justify-content:flex-start">
            <button class="green small" style="margin:6px 0 0" data-permok="${p.user_id}">${ic('check')} ${esc(t_('approve'))}</button>
            <button class="danger small" style="margin:6px 0 0" data-permno="${p.user_id}">${ic('x')} ${esc(t_('reject'))}</button>
          </div>
        </div>`;
      }).join('');

      const revHtml = pendRevs.map(r => {
        const u = userMap[r.user_id];
        const co = allCompanies.find(c => c.id === r.company_id) || {};
        const core = coreOf(r);
        const fl = flagHtml(r.id);
        return `<div class="reqitem">
          <div><span class="tagkind" style="background:#15803d">${esc(t_('revKind'))}</span>
            <b>${esc(co.name || '?')}</b>
            <span class="meta">${u ? esc(u.full_name || u.email) : ''}</span></div>
          <div class="kv">${core > 0 ? `<span class="badge bg-${tone(core)}">${core.toFixed(1)}</span><span class="stars">${stars(core)}</span>` : ''}
            ${r.recommend === true ? `<span class="yn good">${ic('up')} ${esc(t_('yes'))}</span>` : (r.recommend === false ? `<span class="yn bad">${ic('down')} ${esc(t_('no'))}</span>` : '')}
            <span class="meta" style="margin:0">${esc(punctLabel(r.punctuality) || '')}</span></div>
          ${rideHtml(r)}
          ${r.comment ? `<div class="cmt">${esc(r.comment)}</div>` : ''}
          ${fl ? `<div>${fl}</div>` : ''}
          <div class="row" style="justify-content:flex-start">
            <button class="green small" style="margin:6px 0 0" data-apprev="${r.id}">${ic('check')} ${esc(t_('approve'))}</button>
            <button class="danger small" style="margin:6px 0 0" data-rejrev="${r.id}">${ic('x')} ${esc(t_('reject'))}</button>
          </div>
        </div>`;
      }).join('');

      const F = [['name','companyName'], ['city','cityPh'], ['description','description'], ['phone','phone'], ['email','email']];
      const reqHtml = reqList.map(r => {
        const u = userMap[r.user_id];
        const cur = r.kind === 'edit' ? (allCompanies.find(c => c.id === r.company_id) || {}) : {};
        const lines = F.filter(([k]) => r.data[k] !== undefined && (r.kind === 'add' ? r.data[k] : true)).map(([k, lbl]) => {
          const nv = r.data[k] || '';
          const ov = cur[k] || '';
          if (r.kind === 'edit' && String(nv) === String(ov)) return '';
          return `<span><b>${esc(t_(lbl).replace(' *',''))}:</b> ${r.kind === 'edit' && ov ? `<span class="old">${esc(k === 'city' ? placeLabel(ov) : ov)}</span> → ` : ''}${esc(k === 'city' ? placeLabel(nv) : nv) || '—'}</span>`;
        }).join('');
        return `<div class="reqitem">
          <div><span class="tagkind">${esc(t_(r.kind === 'add' ? 'reqAdd' : 'reqEdit'))}</span>
            ${r.kind === 'edit' ? `<b>${esc(cur.name || '?')}</b>` : ''}
            <span class="meta">${u ? esc(u.full_name || u.email) : ''}</span></div>
          <div class="kv">${lines}</div>
          <div class="row" style="justify-content:flex-start">
            <button class="green small" style="margin:0" data-approve="${r.id}">${ic('check')} ${esc(t_('approve'))}</button>
            <button class="danger small" style="margin:0" data-rejectreq="${r.id}">${ic('x')} ${esc(t_('reject'))}</button>
          </div>
        </div>`;
      }).join('');
      const msgHtml = msgList.map(m => {
        const u = userMap[m.user_id];
        return `<div class="reqitem">
          <div><span class="tagkind" style="background:#6d28d9">${esc(t_('msgKind'))}</span>
            <span class="meta">${u ? esc(u.full_name || u.email) : ''} · ${esc(new Date(m.created_at).toLocaleDateString(dl()))}</span></div>
          <div class="cmt">${esc(m.body)}</div>
          <div class="row" style="justify-content:flex-start">
            <button class="green small" style="margin:6px 0 0" data-delmsg="${m.id}">${ic('check')} ${esc(t_('done'))}</button>
          </div>
        </div>`;
      }).join('');
      box.innerHTML = head + permHtml + newHtml + revHtml + reqHtml + msgHtml;
    }

    function renderUsers() {
      const box = $('usersPanel');
      box.classList.toggle('hidden', !(isAdmin && usersOpen));
      if (!(isAdmin && usersOpen)) return;
      const idle = u => (u.n_calls || 0) > 0 && (u.n_reviews || 0) === 0;
      let list = Object.values(userMap);
      if (usersFilter) list = list.filter(idle);
      list.sort((a, b) => (idle(b) - idle(a)) || ((b.n_calls || 0) - (a.n_calls || 0)));
      const fmt = d => d ? new Date(d).toLocaleDateString(dl()) : '—';
      box.innerHTML = `<div class="row">
          <h4>${ic('users')} ${esc(t_('usersTitle'))} (${list.length})</h4>
          <div class="row" style="gap:6px">
            <button class="ghost small" style="margin:0" data-actfilter="1">${esc(t_(usersFilter ? 'actAll' : 'actIdleOnly'))}</button>
            <button class="ghost small" style="margin:0" data-usersclose="1">${ic('x')} ${esc(t_('close'))}</button>
          </div>
        </div>` +
        (list.length ? list.map(u => `
          <div class="urow ${idle(u) ? 'idle' : ''}">
            <div>
              ${ic('user')} <b>${esc(u.full_name || '—')}</b> <span class="meta em">${esc(u.email)}</span>
              ${u.phone ? `<a class="callbtn sm" href="${esc(telHref(u.phone))}">${ic('phone')} ${esc(fmtPhone(u.phone))}</a>` : ''}
              <div style="margin-top:4px">
                <span class="ustat ${idle(u) ? 'warn' : ''}">${ic('phone')} ${esc(t_('actCalls'))}: ${u.n_calls || 0}</span>
                <span class="ustat">${ic('edit')} ${esc(t_('actReviews'))}: ${u.n_reviews || 0}</span>
                <span class="ustat">${esc(t_('actLogin'))}: ${esc(fmt(u.last_login))}</span>
                ${idle(u) ? `<span class="flag">⚠ ${esc(t_('actIdle'))}</span>` : ''}
                ${u.can_review ? `<span class="ustat">${ic('check')}</span>` : ''}
                ${u.is_company ? `<span class="flag">⚠ ${esc(t_('companyFlag'))}</span>` : ''}
                ${u.banned ? `<span class="tagban">${esc(t_('banned'))}</span>` : ''}
              </div>
            </div>
                        ${u.id === myUid ? '' : (u.banned
              ? `<button class="ghost small" data-unban="${u.id}">${esc(t_('unban'))}</button>`
              : `<button class="danger small" data-ban="${u.id}">${ic('ban')} ${esc(t_('ban'))}</button>`)}
          </div>`).join('') : `<p class="meta">${esc(t_('noUsers'))}</p>`);
    }

    // ===== END PART 1 =====
        async function loadCompanies() {
      const box = $('companies');
      const [cRes, sRes, rRes, xRes] = await Promise.all([
        sb.from('companies').select('*').order('created_at', { ascending: false }),
        sb.from('company_stats').select('*'),
        sb.from('company_recommend').select('*'),
        sb.from('reviews_public').select('company_id,price_paid,comment,trip_from,trip_to,approved'),
        loadUsers(), loadSuggestions(), loadRequests(), loadMessages(), loadPermReqs(), loadReviewAdmin(), loadRecentPlaces()
      ]);
      if (cRes.error) { box.innerHTML = '<div class="card">' + esc(t_('error')) + ': ' + esc(cRes.error.message) + '</div>'; return; }
      allCompanies = cRes.data;
      stats = {}; (sRes.data || []).forEach(s => stats[s.company_id] = s);
      recStats = {}; (rRes.data || []).forEach(s => recStats[s.company_id] = s);
      cnts = {};
      (xRes.data || []).forEach(r => {
        if (r.approved === false) return;
        const o = cnts[r.company_id] = cnts[r.company_id] || { p: 0, c: 0 };
        if (hasPrice(r)) o.p++;
        if (r.comment && String(r.comment).trim()) o.c++;
      });
      renderUsers();
      renderRequests();
      renderCompanies();
    }

    function renderCompanies() {
      const box = $('companies');
      const q = $('search').value.trim().toLowerCase();
      const mode = $('sort').value;
      const ov = c => (stats[c.id] && stats[c.id].overall != null) ? Number(stats[c.id].overall) : 0;
      const cnt = c => stats[c.id] ? stats[c.id].review_count : 0;
      const qNum = q.replace(/^#/, '');

      let list = allCompanies.filter(c =>
        !q || (c.name || '').toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q) ||
        (c.city || '').toLowerCase().includes(q) || placeLabel((c.city || '').trim()).toLowerCase().includes(q) ||
        (c.phone || '').includes(q) || (/^\d+$/.test(qNum) && String(c.phone_code || '') === String(Number(qNum))));

      if (mode === 'code') list.sort((a, b) => (a.phone_code ?? 99999) - (b.phone_code ?? 99999));
      else if (mode === 'rating') list.sort((a, b) => ov(b) - ov(a) || cnt(b) - cnt(a));
      else if (mode === 'count') list.sort((a, b) => cnt(b) - cnt(a));
      else if (mode === 'name') list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      else list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      const canWrite = !isBanned && !writeLangBlocked();

      box.innerHTML = list.length ? list.map(c => {
        if (editingId === c.id) {
          return `
          <div class="card">
            <div class="row" style="margin-bottom:6px">
              <h4 style="margin:0">${esc(isAdmin ? t_('editCompany') : t_('suggestChange'))}</h4>
              <button class="ghost small" style="margin:0" data-canceledit="1">${ic('x')} ${esc(t_('close'))}</button>
            </div>
            ${isAdmin ? '' : `<div class="note">${esc(t_('apprNote'))}</div>`}
            <div id="editMsg" class="msg"></div>
            <input id="eName" type="text" value="${esc(c.name)}" placeholder="${esc(t_('companyName'))}">
            ${placeSelect('eCity', (c.city || '').trim(), t_('cityPh'))}
            <textarea id="eDesc" rows="3" placeholder="${esc(t_('description'))}">${esc(c.description || '')}</textarea>
            <input id="ePhone" type="text" value="${esc(c.phone || '')}" placeholder="${esc(t_('phone'))}">
            <input id="eEmail" type="email" value="${esc(c.email || '')}" placeholder="${esc(t_('email'))}">
            ${isAdmin ? `
              ${c.logo_url ? `<div class="fileline">${esc(t_('currentLogo'))}</div><img class="clogo" src="${esc(c.logo_url)}" alt="">` : ''}
              <div class="fileline">${esc(c.logo_url ? t_('replaceLogo') : t_('logoOpt'))}</div>
              <input id="eLogoFile" type="file" accept="image/*">` : ''}
            <button data-saveedit="${c.id}">${esc(isAdmin ? t_('save') : t_('sendForApproval'))}</button>
          </div>`;
        }
        const s = stats[c.id], rc = recStats[c.id], overall = ov(c), cc = cnts[c.id] || { p: 0, c: 0 };
        const recPill = rc && rc.rec_votes > 0
          ? `<div class="pill ${Number(rc.rec_pct) < 50 ? 'low' : ''}">${ic(Number(rc.rec_pct) < 50 ? 'down' : 'up')} ${Number(rc.rec_pct)}% ${esc(t_('recommendWord'))} (${rc.rec_votes})</div>` : '';
        const scoreBox = (s && s.overall != null)
          ? `<div class="score"><div class="big ${tone(overall)}">${overall.toFixed(1)}</div><div class="scol"><div class="stars">${stars(overall)}</div><div class="cnt">${s.review_count} ${esc(t_('reviews'))}</div></div></div>`
          : `<div class="score"><div class="meta" style="margin:0">${esc(t_('noReviewsYet'))}</div></div>`;
        const on = m => openId === c.id && openMode === m ? 'on' : '';
        const nb = n => n ? `<span class="n">${n}</span>` : '';

        const sugs = (isAdmin && sugMap[c.id]) ? sugMap[c.id] : [];
        const sugHtml = sugs.length ? `
          <div class="sect sug">
            <h4>${ic('upload')} ${esc(t_('logoSugTitle'))} (${sugs.length})</h4>
            ${sugs.map(sg => {
              const u = userMap[sg.user_id];
              return `<div class="sugrow">
                <img src="${esc(sg.logo_url)}" alt="">
                <span class="meta" style="margin:0">${u ? esc(u.full_name || u.email) : ''}</span>
                <span class="sbtns">
                  <button class="green small" style="margin:0" data-uselogo="${sg.id}">${ic('check')} ${esc(t_('useLogo'))}</button>
                  <button class="ghost small" style="margin:0" data-dismisslogo="${sg.id}">${ic('x')} ${esc(t_('dismiss'))}</button>
                </span>
              </div>`;
            }).join('')}
          </div>` : '';

        const codeB = c.phone_code ? ` <span class="codeBadge ltr" title="Phone code">#${esc(String(c.phone_code).padStart(2,'0'))}</span>` : '';

        return `
          <div class="card co" id="co-${c.id}" style="${coStyle(c.id)}">
            <div class="chead">
              <div class="cinfo">
                ${c.logo_url ? `<img class="clogo" src="${esc(c.logo_url)}" alt="">` : ''}
                <div>
                  <div class="cname">${esc(c.name)}${codeB}</div>
                  ${c.description ? `<div class="meta">${esc(c.description)}</div>` : ''}
                  ${recPill}
                </div>
              </div>
              <div class="scoreCol">
                ${scoreBox}
                ${c.phone ? `<a class="callbtn" href="${esc(telHref(c.phone))}" data-call="${c.id}">${ic('phone')} ${esc(t_('callBtn'))} <span class="em">${esc(fmtPhone(c.phone))}</span></a>` : ''}
              </div>
            </div>
            <div class="contactMini">
              ${c.city ? `<span>${ic('pin')}${esc(placeLabel((c.city || '').trim()))}</span>` : ''}
              ${c.email ? `<span class="em">${ic('mail')}${esc(c.email)}</span>` : ''}
            </div>
            ${sugHtml}
            <div class="tabs">
              <button class="${on('view')}" data-open="${c.id}">${esc(t_('reviews'))}${nb(s ? s.review_count : 0)}</button>
              <button class="${on('prices')}" data-prices="${c.id}">${ic('dollar')} ${esc(t_('pricesBtn'))}${nb(cc.p)}</button>
              <button class="${on('comments')}" data-comments="${c.id}">${ic('chat')} ${esc(t_('commentsBtn'))}${nb(cc.c)}</button>
              ${canWrite ? `<button class="${on('write')}" data-write="${c.id}">${ic('edit')} ${esc(t_('writeBtn'))}</button>` : ''}
            </div>
            <div class="more">
              ${(!isAdmin && !isBanned) ? `<button data-sendlogo="${c.id}">${ic('upload')} ${esc(t_('sendLogo'))}</button>` : ''}
              ${(!isAdmin && !isBanned) ? `<button data-edco="${c.id}">${ic('edit')} ${esc(t_('suggestChange'))}</button>` : ''}
              ${isAdmin ? `<button class="gold" data-edco="${c.id}">${ic('edit')} ${esc(t_('edit'))}</button><button class="danger" data-delco="${c.id}">${esc(t_('del'))}</button>` : ''}
            </div>
            ${openId === c.id ? `<div class="detail" id="detail"></div>` : ''}
          </div>`;
      }).join('') : '<div class="card" style="text-align:center;color:var(--muted);font-weight:600">' + esc(t_('noCompanies')) + '</div>';

      if (openId) loadDetail(openId);
    }

    function barRow(k, a, n) {
      const has = n > 0;
      const w = has ? Math.round(a / 5 * 100) : 0;
      return `<div class="bar"><span class="${has ? tone(a) : ''}">${ic(KEY_ICON[k])}</span><span>${esc(t_(k))}</span>
        <span class="track"><span class="fill bg-${has ? tone(a) : 'mid'}" style="display:block;width:${w}%"></span></span>
        <span class="val ${has ? tone(a) : ''}">${has ? a.toFixed(1) : '-'}</span></div>`;
    }

    function authorHtml(r) {
      if (!isAdmin) return '';
      const u = userMap[r.user_id];
      const who = u ? `<b>${esc(u.full_name || '—')}</b> <span class="meta em" style="margin:0">${esc(u.email)}</span> ${u.phone ? telLink(u.phone) : ''}` : `<span class="meta" style="margin:0">${esc(String(r.user_id).slice(0, 8))}</span>`;
      const isB = u && u.banned;
      const pend = r.approved === false
        ? `<span class="tagban" style="background:#c2410c">${esc(t_('pendingTag'))}</span>
           <button class="green small" style="margin:0" data-apprev="${r.id}">${ic('check')} ${esc(t_('approve'))}</button>` : '';
      return `<div class="author">${ic('user')} ${esc(t_('by'))}: ${who}
        ${isB ? `<span class="tagban">${esc(t_('banned'))}</span>` : ''}
        ${pend}
        ${r.user_id !== myUid ? (isB
          ? `<button class="ghost small" style="margin:0" data-unban="${r.user_id}">${esc(t_('unban'))}</button>`
          : `<button class="danger small" style="margin:0" data-ban="${r.user_id}">${ic('ban')} ${esc(t_('ban'))}</button>`) : ''}
        ${flagHtml(r.id)}
      </div>`;
    }
    const delRevBtn = r => (isAdmin && r.user_id !== myUid) ? `<button class="danger small" data-delrev="${r.id}">${esc(t_('del'))}</button>` : '';
    const moreBtn = total => total > showN
      ? `<div class="showmore"><button class="ghost" data-more="1">${esc(t_('showMore'))} (${total - showN})</button></div>` : '';
    const routeName = r => (r.trip_from || r.trip_to)
      ? `${placeLabel(r.trip_from || '?')} → ${placeLabel(r.trip_to || '?')}` : t_('routeUnknown');

    function catRowHtml(k) {
      if (k === 'punctuality') {
        return `<div class="field" data-field="punctuality">
          <div class="ptq">${ic('clock')} ${esc(t_('punctQ'))}</div>
          <div class="ptopts">${PUNCT.map(([v, key]) =>
            `<button type="button" class="ptbtn optcard ${draft.punctuality === v ? 'on' : ''}" data-punct="${v}">${esc(t_(key))}</button>`).join('')}</div>
        </div>`;
      }
      return `<div class="field" data-field="${k}"><div class="catrow"><span class="lbl">${ic(KEY_ICON[k])} ${esc(t_(k))}</span>
        <span class="pick" data-cat="${k}">${[1,2,3,4,5].map(v =>
          `<span class="st ${draft[k] >= v ? 'on' : ''}" data-v="${v}"><i class="sn">${v}</i><span class="sg">★</span></span>`).join('')}</span>
      </div></div>`;
    }

    function syncDraft() {
      if (openMode !== 'write' || !$('revDate') || !$('revFrom')) return;
      draft.trip_date = $('revDate').value;
      draft.tod = $('revTod').value;
      draft.from = readPlace('revFrom') || '';
      draft.to = readPlace('revTo') || '';
      draft.price = $('revPrice').value;
      draft.round = $('revRound') ? $('revRound').checked : false;
      draft.toll = $('revToll') ? $('revToll').checked : false;
      draft.free = $('revFree') ? $('revFree').checked : false;
      draft.hour = $('revHour') ? $('revHour').value : '';
      draft.comment = $('revComment').value;
    }
    function hasAnyAnswer() {
      if (ALL_KEYS.some(k => draft[k])) return true;
      if (draft.rec === true || draft.rec === false) return true;
      if (draft.trip_date || draft.tod || draft.from || draft.to) return true;
      if (String(draft.price || '').trim() !== '') return true;
      if ((draft.tags || []).length) return true;
      if (String(draft.comment || '').trim() !== '') return true;
      return false;
    }

    async function loadDetail(companyId) {
      const el = $('detail');
      if (!el) return;
      el.innerHTML = esc(t_('loading'));
      const { data, error } = await sb.from('reviews_public').select('*').eq('company_id', companyId).order('created_at', { ascending: false });
      if (error) { el.innerHTML = esc(t_('error')) + ': ' + esc(error.message); return; }
      detailData = data;

      if (myReviewId) draft = {};
      myReviewId = null;   // v10: the form opens empty = a NEW review
      paintDetail();
    }

    // v10: load one of my reviews into the form for editing
    function fillDraftFrom(mine) {
      draft = {};
      myReviewId = mine.id;
      {
        ALL_KEYS.forEach(k => draft[k] = mine[k]);
        draft.punctuality = normP(mine.punctuality);
        draft.comment = mine.comment || '';
        draft.rec = mine.recommend;
        draft.tags = Array.isArray(mine.tags) ? mine.tags.filter(k => POS_TAGS.includes(k) || NEG_TAGS.includes(k)) : [];
        draft.trip_date = mine.trip_date || '';
        draft.tod = mine.time_of_day || '';
        draft.from = mine.trip_from || '';
        draft.to = mine.trip_to || '';
        draft.round = !!mine.round_trip;
        draft.toll = !!mine.toll_included;
        draft.free = !!mine.first_hour_free;
        draft.hour = (mine.hourly_price !== null && mine.hourly_price !== undefined) ? String(mine.hourly_price) : '';
        draft.price = (mine.price_paid !== null && mine.price_paid !== undefined) ? String(mine.price_paid) : '';
      }
    }

    function paintDetail() {
      const el = $('detail');
      if (!el || !openId) return;
      const companyId = openId;
      const data = detailData;
      const pub = data.filter(r => r.approved !== false);
      const myRevs = data.filter(r => r.is_mine);
      const mine = myReviewId ? myRevs.find(r => r.id === myReviewId) : null;

      const head = title => `<div class="dhead"><h4>${title}</h4><button class="ghost small" data-close="${companyId}">${ic('x')} ${esc(t_('close'))}</button></div>`;

      if (openMode === 'write') {
        if (isBanned) { el.innerHTML = head(esc(t_('writeReview'))) + `<div class="banner">${esc(t_('bannedMsg'))}</div>`; return; }
        if (writeLangBlocked()) { el.innerHTML = head('') + `<div class="banner">${esc(T.en.langBlock)}</div>`; return; }
        langAlertIfNeeded();

        if (!isAdmin && !canReview) {
          el.innerHTML = head(esc(t_('writeReview'))) + `
            <div class="sect white">
              <div class="note warn"><b>${esc(t_('needPermTitle'))}</b><br>${esc(t_('needPermText'))}</div>
              ${myReqPending
                ? `<div class="note">${esc(t_('reqPermWaiting'))}</div>`
                : `<button type="button" data-reqperm="1">${ic('check')} ${esc(t_('reqPermBtn'))}</button>`}
            </div>`;
          return;
        }

        const dTags = draft.tags || [];

        const form = `<div class="cols">${GROUPS.map(([g, gi, keys]) => `
          <div><div class="grp">${ic(gi)} ${esc(t_(g))}</div>
          ${keys.map(k => catRowHtml(k)).join('')}</div>`).join('')}</div>`;

        const recForm = `
          <div class="field" data-field="rec">
            <h4>${esc(t_('recommendQ'))}</h4>
            <div class="recbtns">
              <button type="button" class="recbtn optcard yes ${draft.rec === true ? 'on' : ''}" data-rec="1">${ic('up')} ${esc(t_('yes'))}</button>
              <button type="button" class="recbtn optcard no ${draft.rec === false ? 'on' : ''}" data-rec="0">${ic('down')} ${esc(t_('no'))}</button>
            </div>
          </div>`;

        const rideForm = `
          <div class="sect ride">
            <h4>${ic('car')} ${esc(t_('rideTitle'))}</h4>
            <div class="two">
              <div class="field" data-field="date">
                <span class="plabel">${esc(t_('f_date'))}</span>
                <input id="revDate" type="hidden" value="${esc(draft.trip_date || '')}">
                <button type="button" class="datebtn ${draft.trip_date ? 'has' : ''}" data-pickdate="1">${ic('cal')} <span id="revDateTxt">${draft.trip_date ? esc(dateLabel(draft.trip_date)) : esc(t_('pickDate'))}</span></button>
              </div>
              <div class="field" data-field="tod">
                <label class="plabel" for="revTod">${esc(t_('todPh'))}</label>
                <select id="revTod" required>
                  <option value="" disabled hidden ${draft.tod ? '' : 'selected'}>${esc(t_('pickTod'))}</option>
                  ${TODS.map(k => `<option value="${k}" ${draft.tod === k ? 'selected' : ''}>${esc(t_('tod_' + k))}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="two">
              <div class="field" data-field="from">${placeSelect('revFrom', draft.from || '', t_('fromPh'))}</div>
              <div class="field" data-field="to">${placeSelect('revTo', draft.to || '', t_('toPh'))}</div>
            </div>
            <div class="field" data-field="price">
              <label class="plabel" for="revPrice">${esc(t_('pricePh'))}</label>
              <div class="pricewrap"><span class="dol">$</span><input id="revPrice" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0.00" value="${esc(draft.price || '')}"></div>
              <label class="rtcheck"><input type="checkbox" id="revToll" ${draft.toll ? 'checked' : ''}> <span>${esc(t_('tollIncl'))}</span></label>
              <label class="rtcheck"><input type="checkbox" id="revRound" ${draft.round ? 'checked' : ''}> <span>${esc(t_('roundTrip'))}</span></label>
              <div id="rtExtra" class="${draft.round ? '' : 'hidden'}">
                <label class="rtcheck"><input type="checkbox" id="revFree" ${draft.free ? 'checked' : ''}> <span>${esc(t_('firstHourFree'))}</span></label>
                <label class="plabel" for="revHour" style="margin-top:8px">${esc(t_('hourlyPrice'))}</label>
                <div class="pricewrap"><span class="dol">$</span><input id="revHour" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0.00" value="${esc(draft.hour || '')}"></div>
              </div>
            </div>
          </div>`;

        const tagForm = `
          <div class="optbox">
            <h4>${esc(t_('tagsTitle'))} <span class="opt">(${esc(t_('optional'))})</span></h4>
            <div class="chips">
              ${POS_TAGS.map(k => `<button type="button" class="chip pos ${dTags.includes(k) ? 'on' : ''}" data-tag="${k}">${esc(t_('tag_' + k))}</button>`).join('')}
            </div>
            <div class="chips">
              ${NEG_TAGS.map(k => `<button type="button" class="chip neg ${dTags.includes(k) ? 'on' : ''}" data-tag="${k}">${esc(t_('tag_' + k))}</button>`).join('')}
            </div>
            <textarea id="revComment" rows="3" placeholder="${esc(t_('otherIssue'))} (${esc(t_('optional'))})">${esc(draft.comment || '')}</textarea>
          </div>`;

        const myList = myRevs.length ? `
          <div class="sect">
            <h4>${ic('user')} ${esc(t_('myRevsTitle'))} (${myRevs.length})</h4>
            ${myRevs.map(r => { const c = coreOf(r); return `<div class="row" style="gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid #e2e8f0">
              ${c > 0 ? `<span class="badge bg-${tone(c)}">${c.toFixed(1)}</span>` : ''}
              <span class="meta" style="margin:0">${new Date(r.created_at).toLocaleString(dl(), { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
              ${r.approved === false ? `<span class="meta" style="margin:0;color:#c2410c">${esc(t_('revPending'))}</span>` : ''}
              <span style="margin-inline-start:auto"></span>
              <button type="button" class="ghost small" style="margin:0" data-editmine="${r.id}">${ic('edit')} ${esc(t_('editBtn'))}</button>
              <button type="button" class="danger small" style="margin:0" data-delmine="${r.id}">${esc(t_('del'))}</button>
            </div>`; }).join('')}
            ${mine ? `<button type="button" class="green" data-newrev="1" style="margin-top:10px">${ic('plus')} ${esc(t_('newReview'))}</button>` : ''}
          </div>` : '';
        el.innerHTML = head(`${esc(mine ? t_('editReview') : t_('writeReview'))} <span class="opt">${esc(t_('anonymous'))}</span>`) + myList + `
          <div class="sect white">
            ${mine ? `<div class="note warn">${esc(t_('editingNote'))}</div>` : ''}
            <div class="note">${esc(t_('optNote'))}</div>
            <div class="hintline">${esc(t_('starsHint'))}</div>
            <div id="revMsg" class="msg"></div>
            ${form}
            ${recForm}
            ${rideForm}
            ${tagForm}
            <button id="submitReview" data-company="${companyId}">${ic('check')} ${esc(mine ? t_('update') : t_('submit'))}</button>
            ${mine ? `<button id="deleteReview" class="danger" data-rid="${mine.id}">${esc(t_('delMine'))}</button>` : ''}
          </div>`;
        return;
      }

      if (openMode === 'prices') {
        const priced = pub.filter(hasPrice);
        if (!priced.length) {
          el.innerHTML = head(`${ic('dollar')} ${esc(t_('pricesTitle'))}`) + `<p class="meta">${esc(t_('noPrices'))}</p>`;
          return;
        }
        const groups = {};
        priced.forEach(r => { const k = r.trip_from + '|' + r.trip_to; (groups[k] = groups[k] || []).push(r); });
        const gl = Object.values(groups).sort((a, b) => b.length - a.length);
        const cards = gl.map(arr => {
          const ps = arr.map(r => Number(r.price_paid));
          const avg = ps.reduce((a, b) => a + b, 0) / ps.length;
          const mn = Math.min(...ps), mx = Math.max(...ps);
          return `<div class="rt">
            <div class="rt-route">${ic('pin')} ${esc(routeName(arr[0]))}</div>
            <div class="rt-price">${esc(money(Math.round(avg)))}</div>
            <div class="rt-sub">${arr.length > 1 ? `${esc(t_('avg'))} · ${esc(money(mn))}–${esc(money(mx))} · ` : ''}${arr.length} ${esc(t_('reportsWord'))}</div>
          </div>`;
        }).join('');
        const rows = priced.slice(0, showN).map(r => {
          const bits = [];
          bits.push(r.trip_date ? new Date(r.trip_date + 'T12:00:00').toLocaleDateString(dl()) : new Date(r.created_at).toLocaleDateString(dl()));
          if (r.time_of_day && TODS.includes(r.time_of_day)) bits.push(t_('tod_' + r.time_of_day));
          return `<div class="prow">
            <div><div class="pr-route">${esc(routeName(r))} ${rtBadge(r)}</div><div class="pr-meta">${esc(bits.join(' · '))}</div></div>
            <span class="price">${esc(money(r.price_paid))}</span>
          </div>`;
        }).join('');
        el.innerHTML = head(`${ic('dollar')} ${esc(t_('pricesTitle'))} (${priced.length})`) + `
          <div class="sect ride"><h4>${esc(t_('byRoute'))}</h4><div class="rtgrid">${cards}</div></div>
          <div class="sect white"><h4>${esc(t_('allPriceReports'))}</h4>${rows}${moreBtn(priced.length)}</div>`;
        return;
      }

      if (openMode === 'comments') {
        const withC = pub.filter(r => r.comment && String(r.comment).trim());
        const items = withC.length ? withC.slice(0, showN).map(r => {
          const core = coreOf(r);
          return `<div class="rev">
            <div class="rh">
              ${core > 0 ? `<span class="badge bg-${tone(core)}">${core.toFixed(1)}</span><span class="stars">${stars(core)}</span>` : ''}
              <span class="meta" style="margin:0; margin-inline-start:auto">${new Date(r.created_at).toLocaleDateString(dl())}</span>
            </div>
            <div class="cmt">${esc(r.comment)}</div>
            ${authorHtml(r)}
            ${delRevBtn(r)}
          </div>`;
        }).join('') + moreBtn(withC.length) : `<p class="meta">${esc(t_('noComments'))}</p>`;
        el.innerHTML = head(`${ic('chat')} ${esc(t_('commentsTitle'))} (${withC.length})`) + items;
        return;
      }

      const avgOf = k => {
        const vals = pub.map(r => r[k]).filter(v => v !== null && v !== undefined);
        return { a: vals.length ? vals.reduce((x, y) => x + y, 0) / vals.length : 0, n: vals.length };
      };
      const overview = `<div class="cols">${GROUPS.map(([g, gi, keys]) => `
        <div><div class="grp">${ic(gi)} ${esc(t_(g))}</div>${keys.map(k => { const r = avgOf(k); return barRow(k, r.a, r.n); }).join('')}</div>`).join('')}</div>`;

      const counts = {};
      pub.forEach(r => (r.tags || []).forEach(tg => { if (!LEGACY_TAGS.includes(tg)) counts[tg] = (counts[tg] || 0) + 1; }));
      const tagKeys = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      const chipHtml = k => `<span class="chip static ${isPos(k) ? 'pos on' : 'neg on'}">${esc(t_('tag_' + k))} · ${counts[k]}</span>`;
      const posKeys = tagKeys.filter(k => isPos(k)), negKeys = tagKeys.filter(k => !isPos(k));
      const tagSummary = tagKeys.length
        ? `<div class="sect"><h4>${ic('chat')} ${esc(t_('saidTags'))}</h4>
            ${posKeys.length ? `<div class="chips">${posKeys.map(chipHtml).join('')}</div>` : ''}
            ${negKeys.length ? `<div class="chips">${negKeys.map(chipHtml).join('')}</div>` : ''}
          </div>` : '';

      const list = data.length ? data.slice(0, showN).map(r => {
        const core = coreOf(r);
        const rt = (r.tags || []).filter(k => !LEGACY_TAGS.includes(k));
        const chip = k => `<span class="chip static ${isPos(k) ? 'pos on' : 'neg on'}">${esc(t_('tag_' + k))}</span>`;
        const rtags = (rt.filter(isPos).length ? `<div class="chips">${rt.filter(isPos).map(chip).join('')}</div>` : '')
                    + (rt.filter(k => !isPos(k)).length ? `<div class="chips">${rt.filter(k => !isPos(k)).map(chip).join('')}</div>` : '');
        const tripBits = [];
        if (r.trip_date) { tripBits.push(new Date(r.trip_date + 'T12:00:00').toLocaleDateString(dl())); tripBits.push(hebFromStr(r.trip_date)); }
        if (r.time_of_day && TODS.includes(r.time_of_day)) tripBits.push(t_('tod_' + r.time_of_day));
        const recBadge = r.recommend === true ? `<span class="yn good">${ic('up')} ${esc(t_('yes'))}</span>`
                       : r.recommend === false ? `<span class="yn bad">${ic('down')} ${esc(t_('no'))}</span>` : '';
        const mini = ALL_KEYS.filter(k => r[k] !== null && r[k] !== undefined)
          .map(k => {
            const lab = k === 'punctuality' ? punctLabel(r[k]) : null;
            return `<span>${ic(KEY_ICON[k])} ${esc(t_(k))} <b>${esc(lab || r[k])}</b></span>`;
          }).join('');
        return `
        <div class="rev">
          <div class="rh">
            ${core > 0 ? `<span class="badge bg-${tone(core)}">${core.toFixed(1)}</span><span class="stars">${stars(core)}</span>` : ''}
            ${recBadge}
            <span class="meta" style="margin:0; margin-inline-start:auto">${new Date(r.created_at).toLocaleDateString(dl())}</span>
          </div>
          ${(r.approved === false && r.is_mine && !isAdmin) ? `<div class="note warn">${esc(t_('revPending'))}</div>` : ''}
          ${tripBits.length ? `<div class="meta">${ic('cal')} ${esc(t_('trip'))}: ${esc(tripBits.join(' · '))}</div>` : ''}
          ${rideHtml(r)}
          ${rtags}
          ${r.comment ? `<div class="cmt">${esc(r.comment)}</div>` : ''}
          ${mini ? `<details><summary>${esc(t_('detailsWord'))}</summary><div class="mini">${mini}</div></details>` : ''}
          ${authorHtml(r)}
          ${delRevBtn(r)}
        </div>`;
      }).join('') + moreBtn(data.length) : `<p class="meta">${esc(t_('beFirst'))}</p>`;

      el.innerHTML = head(`${esc(t_('allReviews'))} (${data.length})`) + `
        <div class="sect"><h4>${esc(t_('ratingsByCat'))}</h4>${overview}</div>
        ${tagSummary}
        ${list}`;
    }

    document.addEventListener('input', () => { syncDraft(); });
    document.addEventListener('change', (e) => {
      const el = e.target;
      if (el && el.id === 'revRound' && $('rtExtra')) $('rtExtra').classList.toggle('hidden', !el.checked);
      if (el && el.classList && el.classList.contains('placeSel')) {
        const txt = $(el.id + 'Txt');
        if (txt) {
          txt.classList.toggle('hidden', el.value !== '__other');
          if (el.value === '__other') txt.focus();
        }
      }
      syncDraft();
    });

    $('calModal').addEventListener('click', (e) => { if (e.target === $('calModal')) closeCal(); });

    function scrollToCard(id) {
      const card = $('co-' + id);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // v11: calm open / close – the list does not jump
    const reduceMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const topbarH = () => { const tb = document.querySelector('.topbar'); return tb ? tb.offsetHeight : 0; };
    const cardTop = id => { const c = $('co-' + id); return c ? c.getBoundingClientRect().top : null; };
    function keepCard(id, oldTop) {
      const card = $('co-' + id);
      if (!card) return;
      if (oldTop !== null && oldTop !== undefined) window.scrollBy(0, card.getBoundingClientRect().top - oldTop);
      const top = card.getBoundingClientRect().top, minTop = topbarH() + 10;
      if (top < minTop || top > window.innerHeight * 0.55) {
        window.scrollTo({ top: Math.max(0, window.scrollY + top - minTop), behavior: reduceMotion() ? 'auto' : 'smooth' });
      }
    }
    function rerenderKeep(id) {
      const oldTop = cardTop(id);
      renderCompanies();
      keepCard(id, oldTop);
    }
    function animIn() {
      const el = $('detail');
      if (el && !reduceMotion()) el.classList.add('dIn');
    }
    function collapseDetail(cb) {
      const el = $('detail');
      if (!el || reduceMotion() || !el.animate) { cb(); return; }
      let done = false;
      const fin = () => { if (done) return; done = true; cb(); };
      el.style.overflow = 'hidden';
      const a = el.animate([
        { height: el.offsetHeight + 'px', opacity: 1 },
        { height: '0px', opacity: 0, marginTop: '0px', paddingTop: '0px' }
      ], { duration: 220, easing: 'ease-in', fill: 'forwards' });
      a.onfinish = fin;
      setTimeout(fin, 320);
    }
    function closeCard(id) {
      collapseDetail(() => { openId = null; draft = {}; rerenderKeep(id); });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if ($('calModal').style.display === 'flex') { closeCal(); return; }
      if (!$('msgForm').classList.contains('hidden')) { closeMsg(); return; }
      if (!$('addForm').classList.contains('hidden')) { closeAdd(); return; }
      if (editingId) { editingId = null; renderCompanies(); return; }
      if (openId) { closeCard(openId); return; }
      if (usersOpen) { usersOpen = false; renderUsers(); }
    });

    document.addEventListener('click', async (e) => {
      const t = e.target.closest ? (e.target.closest('button, .st, a[data-call]') || e.target) : e.target;
      const ds = t.dataset || {};

      if (ds.call) {
        if (myUid && !isAdmin) sb.from('call_log').insert({ company_id: String(ds.call) }).then(() => {});
        return;
      }
      if (ds.actfilter) { usersFilter = !usersFilter; renderUsers(); return; }
      if (ds.usersclose) { usersOpen = false; renderUsers(); return; }
      if (ds.reqtoggle) { reqOpen = !reqOpen; renderRequests(); return; }
      if (ds.more) { showN += 10; paintDetail(); return; }
      if (ds.editmine) {
        const r = detailData.find(x => x.id === ds.editmine);
        if (r) { fillDraftFrom(r); paintDetail(); try { $('submitReview').scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {} }
        return;
      }
      if (ds.newrev) { draft = {}; myReviewId = null; paintDetail(); return; }
      if (ds.delmine) {
        if (!confirm(t_('confirmDelRev'))) return;
        const { error } = await sb.from('reviews').delete().eq('id', ds.delmine).eq('user_id', myUid);
        if (error) return toast(error.message, true, 6000);
        if (myReviewId === ds.delmine) { draft = {}; myReviewId = null; }
        await loadDetail(openId);
        loadCompanies();
        toast(t_('deleted'));
        return;
      }

      if (ds.reqperm) {
        t.disabled = true;
        const { error } = await sb.from('review_requests').insert({ user_id: myUid, phone: myPhone || null });
        if (error && !/duplicate|unique/i.test(error.message)) { t.disabled = false; return toast(error.message, true, 6000); }
        myReqPending = true;
        paintDetail();
        toast(t_('reqPermSent'), false, 4000);
        return;
      }
      if (ds.permok) {
        t.disabled = true;
        const { error } = await sb.rpc('admin_set_reviewer', { target: ds.permok, allow: true });
        if (error) {
          alert(/COMPANY_ACCOUNT/.test(error.message) ? t_('companyAcct') : error.message);
          t.disabled = false; return;
        }
        await loadCompanies();
        toast(t_('saved'));
        return;
      }
      if (ds.permno) {
        if (!confirm(t_('confirmReject'))) return;
        const { error } = await sb.from('review_requests').delete().eq('user_id', ds.permno);
        if (error) { alert(niceErr(error.message)); return; }
        await sb.rpc('admin_mark_seen', { target: ds.permno });
        await loadCompanies();
        return;
      }
      if (ds.seen) {
        const { error } = await sb.rpc('admin_mark_seen', { target: ds.seen });
        if (error) { alert(niceErr(error.message)); return; }
        await loadCompanies();
        return;
      }

      if (ds.apprev) {
        t.disabled = true;
        const res = await sb.from('reviews').update({ approved: true }).eq('id', ds.apprev).select();
        if (res.error || !res.data || !res.data.length) { alert(res.error ? res.error.message : t_('notSaved')); t.disabled = false; return; }
        await loadCompanies();
        toast(t_('saved'));
        return;
      }
      if (ds.rejrev) {
        if (!confirm(t_('confirmReject'))) return;
        const { error } = await sb.from('reviews').delete().eq('id', ds.rejrev);
        if (error) { alert(niceErr(error.message)); return; }
        await loadCompanies();
        return;
      }

      if (ds.approve) {
        const r = reqList.find(x => x.id === ds.approve);
        if (!r) return;
        t.disabled = true;
        const d = r.data || {};
        const row = { name: d.name, city: d.city || null, description: d.description || null, phone: d.phone || null, email: d.email || null };
        let err = null;
        if (r.kind === 'add') err = (await sb.from('companies').insert(row)).error;
        else err = (await sb.from('companies').update(row).eq('id', r.company_id)).error;
        if (err) { alert(err.message); t.disabled = false; return; }
        await sb.from('change_requests').delete().eq('id', r.id);
        await loadCompanies();
        toast(t_('saved'));
        return;
      }
      if (ds.rejectreq) {
        if (!confirm(t_('confirmReject'))) return;
        const { error } = await sb.from('change_requests').delete().eq('id', ds.rejectreq);
        if (error) { alert(niceErr(error.message)); return; }
        await loadCompanies();
        return;
      }
      if (ds.delmsg) {
        const { error } = await sb.from('admin_messages').delete().eq('id', ds.delmsg);
        if (error) { alert(niceErr(error.message)); return; }
        await loadCompanies();
        return;
      }

      const dayEl = e.target.closest ? e.target.closest('[data-day]') : null;
      if (dayEl && pickMode) { setTripDate(dayEl.dataset.day); closeCal(); return; }
      if (ds.pickdate) { openPick(); return; }

      if (ds.cal) {
        if (ds.cal === 'close') { closeCal(); return; }
        if (ds.cal === 'today') {
          if (pickMode && $('revDate')) { setTripDate(isoOf(new Date())); closeCal(); return; }
          calAnchor = noon(new Date());
        }
        if (ds.cal === 'next') { calAnchor = new Date(calLast); calAnchor.setDate(calAnchor.getDate() + 1); }
        if (ds.cal === 'prev') { calAnchor = new Date(calFirst); calAnchor.setDate(calAnchor.getDate() - 1); }
        renderCal();
        return;
      }

      if (ds.sendlogo) { sugTarget = ds.sendlogo; $('sugFile').click(); return; }
      if (ds.uselogo) {
        const sg = sugList.find(x => x.id === ds.uselogo);
        if (!sg) return;
        const up = await sb.from('companies').update({ logo_url: sg.logo_url }).eq('id', sg.company_id);
        if (up.error) { alert(up.error.message); return; }
        await sb.from('logo_suggestions').delete().eq('id', sg.id);
        await loadCompanies();
        toast(t_('saved'));
        return;
      }
      if (ds.dismisslogo) {
        const { error } = await sb.from('logo_suggestions').delete().eq('id', ds.dismisslogo);
        if (error) { alert(niceErr(error.message)); return; }
        await loadCompanies();
        return;
      }

  
      if (ds.ban) {
        if (!confirm(t_('confirmBan'))) return;
        const del = confirm(t_('confirmBanDel'));
        const { error } = await sb.rpc('admin_set_ban', { target: ds.ban, ban: true, del_reviews: del });
        if (error) { alert(niceErr(error.message)); return; }
        await loadCompanies();
        toast(t_('banned'));
        return;
      }
      if (ds.unban) {
        if (!confirm(t_('confirmUnban'))) return;
        const { error } = await sb.rpc('admin_set_ban', { target: ds.unban, ban: false, del_reviews: false });
        if (error) { alert(niceErr(error.message)); return; }
        await loadCompanies();
        toast(t_('saved'));
        return;
      }

      if (ds.open || ds.prices || ds.comments || ds.write) {
        const id = ds.open || ds.prices || ds.comments || ds.write;
        const m = ds.open ? 'view' : (ds.prices ? 'prices' : (ds.comments ? 'comments' : 'write'));
        if (openId === id && openMode === m) { closeCard(id); return; }
        const fresh = openId !== id;
        openId = id; openMode = m;
        draft = {};
        showN = 8;
        rerenderKeep(id);
        if (fresh) animIn();
        return;
      }
      if (ds.close) {
        closeCard(ds.close);
        return;
      }

      if (ds.punct) {
        const v = Number(ds.punct);
        draft.punctuality = (draft.punctuality === v) ? undefined : v;
        document.querySelectorAll('.ptbtn').forEach(b => b.classList.toggle('on', Number(b.dataset.punct) === draft.punctuality));
        return;
      }

      if (t.classList && t.classList.contains('st')) {
        const cat = t.parentElement.dataset.cat;
        const v = Number(t.dataset.v);
        draft[cat] = (draft[cat] === v) ? null : v;
        t.parentElement.querySelectorAll('.st').forEach(s => s.classList.toggle('on', Number(s.dataset.v) <= (draft[cat] || 0)));
        return;
      }

      if (ds.rec !== undefined) {
        const val = ds.rec === '1';
        draft.rec = (draft.rec === val) ? undefined : val;
        document.querySelectorAll('.recbtn').forEach(b => b.classList.toggle('on', draft.rec === (b.dataset.rec === '1')));
        return;
      }

      if (ds.tag) {
        draft.tags = draft.tags || [];
        const i = draft.tags.indexOf(ds.tag);
        if (i >= 0) draft.tags.splice(i, 1); else draft.tags.push(ds.tag);
        t.classList.toggle('on', i < 0);
        return;
      }

      if (ds.delrev) {
        if (!confirm(t_('confirmDelAnyRev'))) return;
        const { error } = await sb.from('reviews').delete().eq('id', ds.delrev);
        if (error) { alert(niceErr(error.message)); return; }
        loadCompanies();
        return;
      }

      if (ds.delco) {
        if (!confirm(t_('confirmDelCo'))) return;
        const { error } = await sb.from('companies').delete().eq('id', ds.delco);
        if (error) { alert(niceErr(error.message)); return; }
        if (openId === ds.delco) openId = null;
        loadCompanies();
        return;
      }

      if (ds.edco) { editingId = ds.edco; renderCompanies(); return; }
      if (ds.canceledit) { editingId = null; renderCompanies(); return; }

      if (ds.saveedit) {
        const name = $('eName').value.trim();
        if (!name) return showMsg($('editMsg'), t_('nameRequired'), false, 4000);
        t.disabled = true;
        try {
          const ph = $('ePhone').value.trim();
          const row = {
            name,
            city: readPlace('eCity'),
            description: $('eDesc').value.trim() || null,
            phone: ph ? fmtPhone(ph) : null,
            email: $('eEmail').value.trim() || null
          };
          if (isAdmin) {
            const file = $('eLogoFile') ? $('eLogoFile').files[0] : null;
            if (file) row.logo_url = await uploadLogo(file);
            const { error } = await sb.from('companies').update(row).eq('id', ds.saveedit);
            if (error) throw error;
          } else {
            const { error } = await sb.from('change_requests').insert({ user_id: myUid, kind: 'edit', company_id: ds.saveedit, data: row });
            if (error) throw error;
            toast(t_('reqSent'));
          }
          editingId = null;
          loadCompanies();
        } catch (err) {
          showMsg($('editMsg'), err.message || String(err), false);
          t.disabled = false;
        }
        return;
      }

      if (t.id === 'submitReview') {
        const msg = $('revMsg');
        if (writeLangBlocked()) return toast(T.en.langBlock, true);
        langAlertIfNeeded();
        if (isBanned) return showMsg(msg, t_('bannedMsg'), false, 5000);
        if (!isAdmin && !canReview) return showMsg(msg, t_('noPermNow'), false, 5000);
        syncDraft();
        if (!hasAnyAnswer()) return toast(t_('needOne'), true);

        const fromV = readPlace('revFrom'), toV = readPlace('revTo');
        const priceRaw = $('revPrice').value.trim();
        let price_paid = null;
        if (priceRaw !== '') {
          price_paid = Math.round(Number(priceRaw) * 100) / 100;
          if (!isFinite(price_paid) || price_paid <= 0 || price_paid > 99999) return showMsg(msg, t_('badPrice'), false, 5000);
          if (!fromV || !toV) return toast(t_('priceNeedsRoute'), true, 5000);
        }
        const dv = $('revDate').value;
        if (dv && dv > isoOf(new Date())) return toast(t_('pickDate'), true);

        const isRound = price_paid !== null && $('revRound').checked;
        const hourRaw = $('revHour') ? $('revHour').value.trim() : '';
        const vals = {
          comment: $('revComment').value.trim() || null,
          recommend: (draft.rec === true || draft.rec === false) ? draft.rec : null,
          tags: draft.tags || [],
          trip_date: dv || null,
          time_of_day: $('revTod').value || null,
          trip_from: fromV,
          trip_to: toV,
          price_paid,
          round_trip: isRound,
          toll_included: price_paid !== null ? !!$('revToll').checked : false,
          first_hour_free: isRound ? !!$('revFree').checked : false,
          hourly_price: (isRound && hourRaw !== '' && isFinite(Number(hourRaw))) ? Math.round(Number(hourRaw) * 100) / 100 : null,
          price: null,
          updated_at: new Date().toISOString()
        };
        ALL_KEYS.forEach(k => vals[k] = draft[k] || null);
        t.disabled = true;

        let error = null;
        if (myReviewId) {
          const res = await sb.from('reviews').update(vals).eq('id', myReviewId).eq('user_id', myUid).select();
          error = res.error;
          if (!error && (!res.data || res.data.length === 0)) {
            t.disabled = false;
            return showMsg(msg, t_('notSaved'), false, 6000);
          }
        } else {
          const res = await sb.from('reviews').insert({ ...vals, company_id: t.dataset.company, user_id: myUid });
          error = res.error;
        }
        if (error) { t.disabled = false; return showMsg(msg, error.message, false, 6000); }

        myReviewId = null;
        const cid = openId;
        await new Promise(res => collapseDetail(res));
        draft = {};
        openId = null;
        const oldTop = cardTop(cid);
        await loadCompanies();
        toast(t_('saved'));
        keepCard(cid, oldTop);
        return;
      }

      if (t.id === 'deleteReview') {
        if (!confirm(t_('confirmDelRev'))) return;
        const { error } = await sb.from('reviews').delete()
          .eq('id', t.dataset.rid).eq('user_id', myUid);
        if (error) return showMsg($('revMsg'), error.message, false, 6000);
        draft = {};
        myReviewId = null;
        openId = null;
        await loadCompanies();
        toast(t_('deleted'));
      }
    });

    async function render(session) {
      if (session) {
        myUid = session.user.id;
        myEmail = session.user.email;
        myPhone = (session.user.user_metadata && session.user.user_metadata.phone) || '';
        loggedIn = true;
        $('authView').classList.add('hidden');
        $('mainView').classList.remove('hidden');
        await checkAdmin();
        await checkBanned();
        await loadMyReq();
        applyStaticText();
        loadCompanies();
      } else {
        myUid = null; myEmail = ''; myPhone = ''; loggedIn = false; isAdmin = false; isBanned = false; canReview = false; myReqPending = false; usersOpen = false;
        document.title = 'CarReviews';
        $('authView').classList.remove('hidden');
        $('mainView').classList.add('hidden');
        applyStaticText();
      }
    }

    applyStaticText();

    setInterval(async () => {
      if (!isAdmin || document.hidden) return;
      await Promise.all([loadUsers(), loadPermReqs()]);
      renderRequests();
      renderUsers();
    }, 60000);

    let lastUid;
    function handleSession(session) {
      const uid = session ? session.user.id : null;
      if (uid === lastUid) return;
      lastUid = uid;
      render(session);
    }
    sb.auth.onAuthStateChange((_event, session) => handleSession(session));
    sb.auth.getSession().then(({ data }) => handleSession(data.session));