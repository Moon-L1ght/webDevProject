type Src = { html: string; css: string; js: string }

const loggerScript = `
(function () {
  const post = (type, payload) => parent.postMessage(Object.assign({__from:'preview', type}, payload), '*');
  ['log','info','warn','error'].forEach(level => {
    const orig = console[level];
    console[level] = function() {
      try { post('console', { level, args: Array.from(arguments) }); } catch {}
      return orig.apply(console, arguments);
    };
  });
  window.onerror = function (msg, src, line, col, err) {
    post('error', { msg: String(msg), stack: err && err.stack });
  };
  window.onunhandledrejection = function (e) {
    post('error', { msg: 'UnhandledRejection: ' + String(e.reason) });
  };
})();`

export function buildSrcDoc({ html, css, js }: Src) {
    return [
        '<!doctype html>',
        '<html><head>',
        '<meta charset="utf-8"/>',
        '<style>',
        'html,body{margin:0;padding:8px;background:#0b0b0b;color:#e5e7eb;}',
        css ?? '',
        '</style>',
        '</head><body>',
        html ?? '',
        '<script>',
        loggerScript,
        '\ntry{',
        js ?? '',
        '\n}catch(e){',
        "parent.postMessage({__from:'preview', type:'error', msg:String(e), stack:e && e.stack}, '*');",
        '}',
        '</script>',
        '</body></html>'
    ].join('')
}