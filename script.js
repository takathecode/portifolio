/**
 * ============================================
 * PORTFOLIO CYBER - FELIPPE TAKAHASHI
 * Vanilla JavaScript para animações de scroll
 * e interatividade
 * ============================================
 */

(function() {
  'use strict';

  // ========== CONFIGURAÇÕES ==========
  const config = {
    scrollRevealSelector: '.glass-card, .project-card, .section-title',
    revealThreshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  // ========== FUNÇÃO: REVELAR ELEMENTOS NO SCROLL ==========
  function initScrollReveal() {
    // Seleciona os elementos que terão efeito de revelação
    const elements = document.querySelectorAll(config.scrollRevealSelector);
    
    // Adiciona classe inicial para todos os elementos
    elements.forEach(el => {
      // Não aplica no header principal para evitar desaparecimento desnecessário
      if (!el.classList.contains('header-container')) {
        el.classList.add('scroll-reveal');
      }
    });

    // Cria o Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Opcional: parar de observar após revelar
          // observer.unobserve(entry.target);
        } else {
          // Opcional: esconder novamente quando sair da tela (efeito toggle)
          // entry.target.classList.remove('revealed');
        }
      });
    }, {
      threshold: config.revealThreshold,
      rootMargin: config.rootMargin
    });

    // Observa todos os elementos
    elements.forEach(el => observer.observe(el));
    
    // Força a revelação imediata para elementos já visíveis
    setTimeout(() => {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('revealed');
        }
      });
    }, 100);
  }

  // ========== FUNÇÃO: EFEITO GLITCH SUAVE NO TÍTULO ==========
  function initGlitchEffect() {
    const glitchTitle = document.querySelector('.glitch-text');
    if (!glitchTitle) return;

    let glitchInterval;
    
    const startGlitch = () => {
      let count = 0;
      const originalText = glitchTitle.getAttribute('data-text') || glitchTitle.textContent;
      
      glitchInterval = setInterval(() => {
        if (count < 3) {
          // Efeito de glitch rápido
          glitchTitle.style.textShadow = `
            ${Math.random() * 6 - 3}px ${Math.random() * 6 - 3}px 0 rgba(0, 240, 255, 0.7),
            ${Math.random() * 6 - 3}px ${Math.random() * 6 - 3}px 0 rgba(57, 255, 20, 0.5)
          `;
          glitchTitle.style.transform = `skew(${Math.random() * 2 - 1}deg)`;
          count++;
        } else {
          // Reseta
          glitchTitle.style.textShadow = '2px 2px 0px rgba(0, 240, 255, 0.3)';
          glitchTitle.style.transform = 'skew(0deg)';
          clearInterval(glitchInterval);
        }
      }, 80);
    };

    // Ativa glitch ao passar o mouse
    glitchTitle.addEventListener('mouseenter', startGlitch);
    
    // Ativa glitch periodicamente (efeito cyber)
    setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance
        startGlitch();
      }
    }, 4000);
  }

  // ========== FUNÇÃO: EFEITO DE RASTREAMENTO NEON NO MOUSE (OPCIONAL) ==========
  function initNeonCursor() {
    // Cria um elemento para o rastro neon
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    cursorTrail.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 240, 255, 0.03) 0%, transparent 70%);
      pointer-events: none;
      z-index: -1;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
      opacity: 0;
    `;
    document.body.appendChild(cursorTrail);

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorTrail.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursorTrail.style.opacity = '0';
    });

    // Animação suave do rastro
    function animateTrail() {
      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;
      
      cursorTrail.style.left = trailX + 'px';
      cursorTrail.style.top = trailY + 'px';
      
      requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
  }

  // ========== FUNÇÃO: ATUALIZAR LINKS (SEGURANÇA E PLACEHOLDERS) ==========
  function setupLinks() {
    // Garantir que todos os links externos tenham rel="noopener noreferrer"
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
      if (!link.rel.includes('noopener')) {
        link.rel = 'noopener noreferrer';
      }
    });

    // Você pode editar aqui os links reais posteriormente
    // Exemplo de como substituir:
    /*
    const githubLink = document.querySelector('a[aria-label="GitHub"]');
    if (githubLink) githubLink.href = 'https://github.com/seu-usuario';
    
    const linkedinLink = document.querySelector('a[aria-label="LinkedIn"]');
    if (linkedinLink) linkedinLink.href = 'https://linkedin.com/in/seu-perfil';
    
    const emailLink = document.querySelector('a[aria-label="E-mail"]');
    if (emailLink) emailLink.href = 'mailto:seu@email.com';
    
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) whatsappBtn.href = 'https://wa.me/5511999999999';
    */
  }

  // ========== FUNÇÃO: ANIMAÇÃO SMOOTH SCROLL PARA LINKS INTERNOS ==========
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#0') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ========== INICIALIZAÇÃO ==========
  function init() {
    // Espera o DOM estar completamente carregado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initScrollReveal();
        initGlitchEffect();
        initNeonCursor();
        setupLinks();
        initSmoothScroll();
      });
    } else {
      initScrollReveal();
      initGlitchEffect();
      initNeonCursor();
      setupLinks();
      initSmoothScroll();
    }

    // Log de boas-vindas no console (estilo cyber)
    console.log('%c🚀 PORTFOLIO CYBER | FELIPPE TAKAHASHI', 'font-size: 16px; font-weight: bold; color: #00f0ff; text-shadow: 0 0 5px #39ff14;');
    console.log('%c⚡ Sistema online • Pronto para edições', 'font-size: 12px; color: #9ab8d9;');
  }

  // Inicia tudo
  init();

})();