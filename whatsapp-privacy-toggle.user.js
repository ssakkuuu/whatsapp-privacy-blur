// ==UserScript==
// @name         WhatsApp Web - Privacy blur toggle button
// @namespace    sakkuuu
// @version      1.1.0
// @description  Adds an eye icon directly to the left of the chat-list menu (3 dots) that reveals/hides blurred messages, chat header and announcements. Works together with the "Better Whatsapp Privacy V2" Stylus style.
// @homepageURL  https://github.com/ssakkuuu/whatsapp-privacy-blur
// @updateURL    https://raw.githubusercontent.com/ssakkuuu/whatsapp-privacy-blur/main/whatsapp-privacy-toggle.user.js
// @downloadURL  https://raw.githubusercontent.com/ssakkuuu/whatsapp-privacy-blur/main/whatsapp-privacy-toggle.user.js
// @match        https://web.whatsapp.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const STORAGE_KEY = 'wa-privacy-off';
  const VAR_NAME = '--wa-msg-blur';
  const BLURRED_VALUE = '6px';
  const REVEALED_VALUE = '0px';
  const GAP = 4; // px between the eye button and the 3-dot menu
  const root = document.documentElement;

  const EYE_ICON = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z"/>
      <circle cx="12" cy="12" r="3.2"/>
    </svg>`;
  const EYE_OFF_ICON = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 3l18 18"/>
      <path d="M10.6 5.1A10.7 10.7 0 0 1 12 5c7 0 10.5 7 10.5 7a17.5 17.5 0 0 1-3.4 4.3M6.7 6.7C3.7 8.6 1.5 12 1.5 12s3.5 7 10.5 7a10.4 10.4 0 0 0 4.6-1"/>
      <path d="M9.5 9.7a3.2 3.2 0 0 0 4.6 4.5"/>
    </svg>`;

  function isOff() {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; }
  }
  function save(off) {
    try { localStorage.setItem(STORAGE_KEY, off ? '1' : '0'); } catch (e) {}
  }
  function applyVar(off) {
    root.style.setProperty(VAR_NAME, off ? REVEALED_VALUE : BLURRED_VALUE);
  }

  // Apply saved state immediately so a refresh doesn't flash blur back on.
  applyVar(isOff());

  let btn = null;

  function findMenuButton() {
    const el = document.querySelector(
      '#side header [aria-label="Menu"], #side header [title="Menu"], ' +
      '#side header span[data-icon="menu"], #side header span[data-icon="more-refreshed"], ' +
      'header [aria-label="Menu"], header [title="Menu"]'
    );
    if (!el) return null;
    return el.closest('button, [role="button"]') || el;
  }

  function render() {
    if (!btn) return;
    const off = isOff();
    btn.innerHTML = off ? EYE_OFF_ICON : EYE_ICON;
    btn.title = off ? 'Hide chats again (privacy blur on)' : 'Reveal chats (privacy blur off)';
    btn.setAttribute('aria-label', btn.title);
  }

  function createButton() {
    btn = document.createElement('button');
    btn.id = 'wa-privacy-toggle';
    btn.type = 'button';
    btn.style.cssText = [
      'position:fixed', 'display:flex', 'align-items:center', 'justify-content:center',
      'padding:0', 'border:0', 'border-radius:50%', 'background:transparent',
      'color:#aebac1', 'cursor:pointer', 'z-index:2147483647',
      'transition:background .15s ease', 'visibility:hidden'
    ].join(';');
    btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(134,150,160,.15)'; });
    btn.addEventListener('mouseleave', () => { btn.style.background = 'transparent'; });
    btn.addEventListener('click', () => {
      const off = !isOff();
      save(off);
      applyVar(off);
      render();
    });
    render();
    document.body.appendChild(btn);
  }

  // Tracks the 3-dot menu's real on-screen position every tick and parks
  // the eye button just to its left, rather than inserting into WhatsApp's
  // own row (which uses its own absolute/animated layout for its icons).
  function reposition() {
    const menuBtn = findMenuButton();
    if (!menuBtn) {
      if (btn) btn.style.visibility = 'hidden';
      return;
    }
    const r = menuBtn.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) {
      btn.style.visibility = 'hidden';
      return;
    }
    btn.style.visibility = 'visible';
    btn.style.width = r.width + 'px';
    btn.style.height = r.height + 'px';
    btn.style.top = r.top + 'px';
    btn.style.left = (r.left - r.width - GAP) + 'px';
  }

  function tick() {
    if (!btn) createButton();
    reposition();
  }

  tick();
  setInterval(tick, 300);
  window.addEventListener('resize', reposition);
  window.addEventListener('scroll', reposition, true);
})();
