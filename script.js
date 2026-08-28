const cards=[...document.querySelectorAll('[data-search-card]')];const input=document.querySelector('#site-search');const chips=[...document.querySelectorAll('[data-filter]')];let active='all';function filter(){const q=(input?.value||'').toLowerCase().trim();let shown=0;cards.forEach(c=>{const text=c.innerText.toLowerCase();const cat=c.dataset.category||'';const ok=(active==='all'||cat===active)&&(!q||text.includes(q));c.classList.toggle('hide',!ok);if(ok)shown++});const note=document.querySelector('#results-note');if(note)note.textContent=`${shown} ${shown===1?'story':'stories'} match your search.`}input?.addEventListener('input',filter);chips.forEach(ch=>ch.addEventListener('click',()=>{chips.forEach(x=>x.classList.remove('active'));ch.classList.add('active');active=ch.dataset.filter;filter()}));filter();

// "SAVE THIS" — lightweight per-viewer bookmarking, no account needed
(function(){
  let saved={};
  try{saved=JSON.parse(localStorage.getItem('wyt-saved')||'{}')}catch(e){saved={}}
  function persist(){try{localStorage.setItem('wyt-saved',JSON.stringify(saved))}catch(e){}}
  document.querySelectorAll('.card').forEach(card=>{
    const link=card.querySelector(':scope > a');
    if(!link||!link.href)return;
    const key=link.getAttribute('href');
    const wrap=document.createElement('div');
    wrap.className='card-actions';
    link.parentNode.insertBefore(wrap,link);
    wrap.appendChild(link);
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='save-btn';
    btn.setAttribute('aria-pressed','false');
    btn.setAttribute('aria-label','Save this for later');
    btn.textContent='SAVE THIS';
    if(saved[key]){btn.classList.add('is-saved');btn.setAttribute('aria-pressed','true')}
    btn.addEventListener('click',()=>{
      const isSaved=btn.classList.toggle('is-saved');
      btn.setAttribute('aria-pressed',String(isSaved));
      if(isSaved)saved[key]=1;else delete saved[key];
      persist();
    });
    wrap.appendChild(btn);
  });
})();
