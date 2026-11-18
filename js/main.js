/* Tecnomac — interações do site (sem dependências) */
(() => {
  const WHATSAPP = '554832640808';
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('menu');
  const desktop = window.matchMedia('(min-width: 1024px)');

  /* ---------- Header: sombra ao rolar ---------- */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });
  desktop.addEventListener('change', () => setMenu(false));

  /* ---------- Link ativo no menu ---------- */
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Animações de entrada ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
        el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 70}ms`;
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Status "aberto agora" (horário de Brasília) ---------- */
  const status = document.getElementById('hours-status');
  if (status) {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date());
      const get = (t) => parts.find((p) => p.type === t).value;
      const day = get('weekday');
      const mins = Number(get('hour')) * 60 + Number(get('minute'));
      const inRange = (a, b) => mins >= a && mins < b;
      const morning = inRange(7 * 60, 11 * 60 + 50);
      const afternoon = inRange(13 * 60, 17 * 60 + 50);
      let open = false;
      if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day)) open = morning || afternoon;
      else if (day === 'Sat') open = morning;
      status.textContent = open ? 'Aberto agora' : 'Fechado no momento. Deixe sua mensagem no WhatsApp.';
      status.classList.add(open ? 'is-open' : 'is-closed');
    } catch (_) { /* navegador sem suporte a fuso: não mostra status */ }
  }

  /* ---------- Formulário → WhatsApp ---------- */
  const form = document.getElementById('form-orcamento');
  if (form) {
    const showError = (input, msg) => {
      const err = document.getElementById(input.id + '-erro');
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg) input.setAttribute('aria-describedby', err.id); else input.removeAttribute('aria-describedby');
      err.textContent = msg;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.elements.nome;
      const tel = form.elements.telefone;
      let firstInvalid = null;

      const nomeOk = nome.value.trim().length >= 2;
      showError(nome, nomeOk ? '' : 'Informe seu nome.');
      if (!nomeOk) firstInvalid = nome;

      const telOk = tel.value.replace(/\D/g, '').length >= 10;
      showError(tel, telOk ? '' : 'Informe um telefone com DDD.');
      if (!telOk && !firstInvalid) firstInvalid = tel;

      if (firstInvalid) { firstInvalid.focus(); return; }

      const veiculo = form.elements.veiculo.value.trim();
      const mensagem = form.elements.text.value.trim();
      const texto = [
        'Olá, Tecnomac! Vim pelo site e gostaria de um orçamento.',
        '',
        `*Nome:* ${nome.value.trim()}`,
        `*Telefone:* ${tel.value.trim()}`,
        veiculo ? `*Veículo:* ${veiculo}` : null,
        `*Assunto:* ${form.elements.servico.value}`,
        mensagem ? `*Mensagem:* ${mensagem}` : null
      ].filter((l) => l !== null).join('\n');
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    });
  }

  /* ---------- Peças: ver todas / ver menos ---------- */
  const btnPecas = document.getElementById('btn-pecas');
  const listaPecas = document.getElementById('lista-pecas');
  if (btnPecas && listaPecas) {
    const total = listaPecas.children.length;
    btnPecas.addEventListener('click', () => {
      const abrir = listaPecas.classList.contains('is-collapsed');
      listaPecas.classList.toggle('is-collapsed', !abrir);
      btnPecas.setAttribute('aria-expanded', String(abrir));
      btnPecas.textContent = abrir ? 'Ver menos peças' : `Ver todas as peças (${total})`;
      if (abrir) listaPecas.children[8]?.querySelector('a')?.focus({ preventScroll: true });
      else listaPecas.scrollIntoView({ block: 'start' });
    });
  }

  /* ---------- Ano no rodapé ---------- */
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
