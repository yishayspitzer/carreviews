/* ===================== CarReviews v17 – legal pages settings =====================
   EDIT ONLY THIS BOX. Fill in the [ ... ] items. Every legal page reads them from here.
   When the attorney has approved the texts, change DRAFT: true  ->  DRAFT: false     */
const LEGAL = {
  DRAFT: true,
  NAME: '[LEGAL NAME]',
  ADDRESS: '[MAILING ADDRESS]',
  EMAIL: '[CONTACT EMAIL]',
  EFFECTIVE: '[EFFECTIVE DATE]',
  TERMS_VERSION: '1.0',
  ACK_DAYS: '3 business days',
  RESPONSE_DAYS: '14 days',
  RETENTION_MONTHS: 24,
  SITE: 'www.carreviewsusa.com',
  HOTLINE: '+1 (845) 410-6662',
  VERSION_LABEL: 'CarReviews v17',
};
/* ================================================================================ */

;(function () {
  const PAGES = [
    ['terms.html', 'Terms of Use'],
    ['privacy.html', 'Privacy Policy'],
    ['content-policy.html', 'Content Policy'],
    ['report.html', 'Report a review / company request'],
  ]
  const here = (location.pathname.split('/').pop() || '').toLowerCase()
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
  const isMail = (s) => /^[^@\s\[\]]+@[^@\s]+\.[^@\s]+$/.test(s)
  const mail = () => isMail(LEGAL.EMAIL)
    ? `<a class="ltr" href="mailto:${esc(LEGAL.EMAIL)}">${esc(LEGAL.EMAIL)}</a>` : `<span class="ltr">${esc(LEGAL.EMAIL)}</span>`

  function fill() {
    document.querySelectorAll('[data-l]').forEach((el) => {
      const k = el.getAttribute('data-l')
      if (k === 'EMAIL') el.innerHTML = mail()
      else if (k in LEGAL) el.textContent = String(LEGAL[k])
    })
  }

  function chrome() {
    const top = document.createElement('div')
    top.className = 'topbar'
    top.innerHTML = `<div class="wrap"><a class="tbrand" href="./">Car<b>Reviews</b></a><nav class="tnav">` +
      PAGES.map(([h, t]) => `<a href="${h}" class="${h === here ? 'on' : ''}">${esc(t)}</a>`).join('') + `</nav></div>`
    document.body.prepend(top)

    const main = document.querySelector('main')
    if (LEGAL.DRAFT && main && main.dataset.draft !== 'no') {
      const d = document.createElement('div')
      d.className = 'draft'
      d.textContent = 'DRAFT – pending attorney review. This text is not final.'
      main.prepend(d)
    }

    const f = document.createElement('footer')
    f.className = 'legalfoot'
    f.innerHTML = `<div><a href="./">Home</a>` +
      PAGES.map(([h, t]) => `<a href="${h}">${esc(t)}</a>`).join('') +
      `</div><div style="margin-top:6px">Contact: ${mail()}</div><div class="ver">${esc(LEGAL.VERSION_LABEL)}</div>`
    document.body.appendChild(f)
  }

  function openMyLang() {
    let lang = 'en'
    try { lang = localStorage.getItem('lang') || 'en' } catch (e) {}
    const el = document.querySelector(`details.sum[data-lang="${lang}"]`)
    if (el) el.open = true
  }

  function go() { chrome(); fill(); openMyLang() }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go)
  else go()
  window.LEGAL = LEGAL
})()
