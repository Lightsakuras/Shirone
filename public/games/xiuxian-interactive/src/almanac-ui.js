(function (root) {
  'use strict';

  root.XiuxianAlmanacUI = {
    create({ game, openModal, closeModal, esc, showCatalog }) {
      const A = root.XiuxianAlmanac;
      const $ = id => document.getElementById(id);
      const text = value => esc(value == null ? '' : String(value));
      const HOME = 'start-first-steps';
      let query = '', category = 'start', spoilers = false, chosen = HOME;
      let visible = [];

      function categoryName(id) {
        const entry = A.categories.find(item => item.id === id);
        return entry ? entry.name || entry.title || id : '百晓札记';
      }

      function allowed(article) {
        return Boolean(article && (spoilers || !article.spoiler));
      }

      function renderArticle(article) {
        const node = $('almanac-article');
        if (!article) {
          node.removeAttribute('data-almanac-article');
          node.innerHTML = '<div class="almanac-empty"><h3 id="almanac-article-title">暂未找到相关篇目</h3><p>试试更短的词，或选择其他分类。也可点「返回入门」重新认路。</p></div>';
          node.scrollTop = 0;
          return;
        }
        node.dataset.almanacArticle = article.id;
        const sections = (article.sections || []).map(part => {
          const table = part.table;
          return `<div class="almanac-section">${part.heading ? `<h4>${text(part.heading)}</h4>` : ''}${(part.paragraphs || []).map(paragraph => `<p>${text(paragraph)}</p>`).join('')}${part.bullets && part.bullets.length ? `<ul>${part.bullets.map(bullet => `<li>${text(bullet)}</li>`).join('')}</ul>` : ''}${table ? `<div class="almanac-table-wrap" tabindex="0" role="region" aria-label="${text(part.heading || article.title)}表格"><table><thead><tr>${(table.headers || []).map(header => `<th scope="col">${text(header)}</th>`).join('')}</tr></thead><tbody>${(table.rows || []).map(row => `<tr>${row.map(cell => `<td>${text(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}</div>`;
        }).join('');
        const related = [...new Set(article.related || [])].map(id => A.get(id)).filter(allowed);
        node.innerHTML = `<header class="almanac-article-head"><p class="almanac-article-category">${text(categoryName(article.category))}${article.spoiler ? ' · 剧情详解（含剧透）' : ''}</p><h3 id="almanac-article-title">${text(article.title)}</h3>${article.summary ? `<p class="almanac-summary">${text(article.summary)}</p>` : ''}</header><div class="almanac-sections">${sections}</div>${related.length ? `<div class="almanac-related"><h4>接着查阅</h4><div>${related.map(item => `<button type="button" data-almanac-related="${text(item.id)}">${text(item.title)} <span aria-hidden="true">→</span></button>`).join('')}</div></div>` : ''}<p class="almanac-article-end">具体器物数值与生效条件，可查「器物图鉴」。</p>`;
        node.scrollTop = 0;
      }

      function select(id, focusReader) {
        const article = visible.find(item => item.id === id);
        if (!allowed(article)) return;
        chosen = article.id;
        for (const button of $('almanac-list').querySelectorAll('[data-almanac-entry]')) {
          const selected = button.dataset.almanacEntry === chosen;
          button.classList.toggle('selected', selected);
          button.setAttribute('aria-pressed', String(selected));
          button.tabIndex = selected ? 0 : -1;
        }
        renderArticle(article);
        if (focusReader) $('almanac-article').focus({ preventScroll: true });
      }

      function refresh(preferred) {
        // Filter again at the presentation boundary, including direct and related links.
        visible = A.search({ query, category, spoilers }).filter(allowed);
        if (preferred && visible.some(item => item.id === preferred)) chosen = preferred;
        if (!visible.some(item => item.id === chosen)) chosen = visible[0] ? visible[0].id : null;
        $('almanac-count').textContent = `${query ? '查找结果' : category === 'all' ? '全册目录' : categoryName(category)} · ${visible.length} 篇${spoilers ? ' · 已显示剧透' : ' · 剧透已隐藏'}`;
        $('almanac-list').innerHTML = visible.map(item => `<button type="button" data-almanac-entry="${text(item.id)}" aria-controls="almanac-article" aria-pressed="${item.id === chosen}" tabindex="${item.id === chosen ? 0 : -1}" class="${item.id === chosen ? 'selected' : ''}"><span>${text(item.title)}</span><small>${text(categoryName(item.category))}${item.spoiler ? ' · 含剧透' : ''}</small></button>`).join('') || '<p class="almanac-list-empty">没有符合条件的篇目。</p>';
        $('almanac-list').scrollTop = 0;
        renderArticle(visible.find(item => item.id === chosen));
      }

      function navigate(id, focusReader) {
        const article = A.get(id);
        if (!allowed(article)) return;
        query = '';
        category = article.category;
        $('almanac-search').value = '';
        $('almanac-category').value = category;
        refresh(id);
        const button = [...$('almanac-list').querySelectorAll('[data-almanac-entry]')].find(item => item.dataset.almanacEntry === id);
        if (button) button.scrollIntoView({ block: 'nearest' });
        if (focusReader) $('almanac-article').focus({ preventScroll: true });
      }

      function download(includeSpoilers) {
        const contents = A.toMarkdown({ spoilers: includeSpoilers });
        const blob = new Blob(['\uFEFF', contents], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = includeSpoilers ? '山行闻见录-完整篇（含剧透）.md' : '山行闻见录-无剧透篇.md';
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        $('almanac-download-status').textContent = includeSpoilers ? '已准备下载完整篇，包含未经历的剧情与结局。' : '已准备下载无剧透篇。';
      }

      function show(id) {
        // Every ordinary opening starts safely at the primer; reading never writes a save.
        query = '';
        spoilers = false;
        const requested = id && A.get(id);
        const initial = allowed(requested) ? requested : A.get(HOME);
        category = initial ? initial.category : 'start';
        chosen = initial ? initial.id : HOME;
        const inGame = Boolean(typeof game === 'function' ? game() : game);
        openModal('almanac', `<div class="almanac-shell"><header class="almanac-heading"><p class="almanac-eyebrow">山行有问 · 随手翻阅</p><h2 id="modal-title">山行闻见录</h2><p class="almanac-subtitle">${inGame ? '展卷停步，合册续行。' : '从入山到远行，山河百问皆在卷中。'}</p></header><div class="almanac-controls"><label class="almanac-search-label" for="almanac-search">搜索全册<input id="almanac-search" type="search" placeholder="如：自动普攻、存档、药庐" autocomplete="off" maxlength="100"></label><label class="almanac-category-label" for="almanac-category">分类<select id="almanac-category"><option value="all">全部分类</option>${A.categories.map(item => `<option value="${text(item.id)}" ${item.id === category ? 'selected' : ''}>${text(item.name || item.title || item.id)}</option>`).join('')}</select></label><div class="almanac-quick"><button type="button" id="almanac-home">返回入门</button><button type="button" id="almanac-catalog">器物图鉴 <span aria-hidden="true">↗</span></button></div><label class="almanac-spoiler-label"><input id="almanac-spoilers" type="checkbox">显示剧情详解与结局（含剧透）</label></div><div class="almanac-reading"><div class="almanac-directory"><p id="almanac-count" class="almanac-count" role="status" aria-live="polite"></p><p id="almanac-keyboard-hint" class="almanac-keyboard-hint">目录与正文均可滚动。<br>↑ ↓ 选篇；Tab 进入正文，<br>可用 PageDown 向下翻阅。</p><nav id="almanac-list" aria-label="山行闻见录篇目" aria-describedby="almanac-keyboard-hint"></nav></div><article id="almanac-article" aria-labelledby="almanac-article-title" tabindex="0"></article></div><div class="almanac-footer"><div class="almanac-download-note"><p>完整篇含未经历的剧情与结局；想保留探索，可下载无剧透篇。</p><p id="almanac-download-status" role="status" aria-live="polite"></p></div><div class="almanac-footer-buttons"><button type="button" id="almanac-export-safe">下载无剧透篇</button><button type="button" id="almanac-export">下载全册（含剧透）</button><button type="button" id="almanac-close">${inGame ? '收册，返回游戏' : '收起山行闻见录'}</button></div></div></div>`);
        $('almanac-search').oninput = event => {
          query = event.target.value;
          chosen = null;
          category = 'all';
          $('almanac-category').value = category;
          refresh();
        };
        $('almanac-category').onchange = event => { category = event.target.value; refresh(); };
        $('almanac-spoilers').onchange = event => { spoilers = event.target.checked; refresh(); };
        $('almanac-home').onclick = () => navigate(HOME, true);
        $('almanac-catalog').onclick = () => { if (typeof showCatalog === 'function') showCatalog(); };
        $('almanac-close').onclick = closeModal;
        $('almanac-export-safe').onclick = () => download(false);
        $('almanac-export').onclick = () => download(true);
        $('almanac-list').onclick = event => {
          const button = event.target.closest('[data-almanac-entry]');
          if (button) select(button.dataset.almanacEntry, false);
        };
        $('almanac-list').onkeydown = event => {
          if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
          const buttons = [...$('almanac-list').querySelectorAll('[data-almanac-entry]')];
          if (!buttons.length) return;
          const at = buttons.indexOf(event.target.closest('[data-almanac-entry]'));
          if (at < 0) return;
          event.preventDefault();
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : Math.max(0, Math.min(buttons.length - 1, at + (event.key === 'ArrowDown' ? 1 : -1)));
          select(buttons[next].dataset.almanacEntry, false);
          buttons[next].focus({ preventScroll: true });
          buttons[next].scrollIntoView({ block: 'nearest' });
        };
        $('almanac-article').onclick = event => {
          const button = event.target.closest('[data-almanac-related]');
          if (button) navigate(button.dataset.almanacRelated, true);
        };
        refresh(chosen);
      }

      return { show };
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
