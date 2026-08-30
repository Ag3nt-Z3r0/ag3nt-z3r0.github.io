/* ============================================================
   AGENT ZERO — observatory edition · interactions
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      mobileMenu.setAttribute("aria-hidden", String(!open));
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- clocks ---------- */
  var footClock = document.getElementById("footClock");
  var utcEls = document.querySelectorAll("[data-utc]");
  var uptimeEl = document.getElementById("uptime");
  var bootTime = Date.now();

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function tick() {
    var now = new Date();
    if (footClock) {
      footClock.textContent = now.toLocaleTimeString("ko-KR", {
        timeZone: "Asia/Seoul", hour12: false,
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      });
    }
    if (utcEls.length) {
      var u = now.getUTCFullYear() + "-" + pad(now.getUTCMonth() + 1) + "-" + pad(now.getUTCDate()) +
        " " + pad(now.getUTCHours()) + ":" + pad(now.getUTCMinutes()) + " UTC";
      utcEls.forEach(function (el) { el.textContent = u; });
    }
    if (uptimeEl) {
      var s = Math.floor((Date.now() - bootTime) / 1000);
      uptimeEl.textContent = pad(Math.floor(s / 3600)) + ":" + pad(Math.floor(s / 60) % 60) + ":" + pad(s % 60);
    }
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- cursor telemetry (fine pointers only) ---------- */
  var cursorPos = document.getElementById("cursorPos");
  if (cursorPos && window.matchMedia("(pointer: fine)").matches) {
    var cx = 0, cy = 0, cursorTicking = false;
    function pad4(n) { n = Math.max(0, Math.round(n)); return ("000" + n).slice(-4); }
    document.addEventListener("pointermove", function (e) {
      cx = e.clientX; cy = e.clientY;
      if (!cursorTicking) {
        cursorTicking = true;
        requestAnimationFrame(function () {
          cursorPos.textContent = "X:" + pad4(cx) + " · Y:" + pad4(cy);
          cursorTicking = false;
        });
      }
    }, { passive: true });
  }

  /* ---------- console feed typing ---------- */
  var feed = document.getElementById("feedBody");
  if (feed) {
    var LINES = [
      "$ az feed --tail 5",
      "[scan]   coturn · TURN session-resume authz",
      "[repro]  auth bypass · allocation hijack confirmed",
      "[draft]  CVE-2026-65981 · severity HIGH",
      "[coord]  GHSA published · fix released upstream",
      "→ ledger sync · 38 tracked · 9 disclosed"
    ];

    if (prefersReduced) {
      feed.textContent = LINES.join("\n");
    } else {
      var li = 0, ci = 0;
      var caret = document.createElement("span");
      caret.className = "caret";
      var buf = document.createTextNode("");
      feed.appendChild(buf);
      feed.appendChild(caret);

      var typeStep = function () {
        if (li >= LINES.length) {
          setTimeout(function () {
            buf.textContent = ""; li = 0; ci = 0;
            typeStep();
          }, 6200);
          return;
        }
        var line = LINES[li];
        if (ci < line.length) {
          var chunk = Math.random() < 0.4 ? 2 : 1;
          buf.textContent += line.substr(ci, chunk);
          ci += chunk;
          setTimeout(typeStep, line.charAt(0) === "$" ? 30 : 10);
        } else {
          buf.textContent += "\n";
          li++; ci = 0;
          setTimeout(typeStep, LINES[li - 1].charAt(0) === "$" ? 460 : 210);
        }
      };

      if ("IntersectionObserver" in window) {
        var tio = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) { typeStep(); tio.disconnect(); }
        }, { threshold: 0.3 });
        tio.observe(feed);
      } else {
        typeStep();
      }
    }
  }

  /* ---------- gauge (disclosure) ---------- */
  var gaugeSvg = document.getElementById("gaugeSvg");
  var gauge = null;
  if (gaugeSvg) {
    var ARC = 377; // semicircle length: pi * r(120)
    var needle = document.getElementById("gaugeNeedle");
    var valueArc = document.getElementById("gaugeValue");
    var readEl = document.getElementById("gaugeRead");
    var gTotal = parseInt(gaugeSvg.getAttribute("data-total"), 10) || 1;

    gauge = function (count, label) {
      var f = Math.max(0, Math.min(1, count / gTotal));
      if (needle) needle.style.transform = "rotate(" + (f * 180).toFixed(2) + "deg)";
      if (valueArc) valueArc.setAttribute("stroke-dashoffset", (ARC * (1 - f)).toFixed(1));
      if (readEl && label) {
        readEl.classList.add("is-swap");
        setTimeout(function () {
          readEl.textContent = label + " " + count + " / TRACKED " + gTotal;
          readEl.classList.remove("is-swap");
        }, 180);
      }
    };

    var gInitial = parseInt(gaugeSvg.getAttribute("data-count"), 10) || 0;
    var runGauge = function () { gauge(gInitial, null); };

    if (prefersReduced || !("IntersectionObserver" in window)) {
      runGauge();
    } else {
      var gio = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { runGauge(); gio.disconnect(); }
      }, { threshold: 0.35 });
      gio.observe(gaugeSvg);
    }
  }

  /* ---------- ledger status filter ---------- */
  var filterBtns = document.querySelectorAll(".filters__btn");
  var ledgerTable = document.getElementById("ledgerTable");
  if (filterBtns.length && ledgerTable) {
    var rows = ledgerTable.querySelectorAll("tbody tr");
    var showCount = document.getElementById("showCount");
    var GAUGE_LABELS = { all: "SHOWING", published: "DISCLOSED", draft: "DRAFT", cve: "CVE" };

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        var visible = 0;
        rows.forEach(function (row) {
          var match = f === "all" ||
            (f === "cve" ? row.getAttribute("data-cve") === "y"
                         : row.getAttribute("data-status") === f);
          row.classList.toggle("is-hidden", !match);
          if (match) visible++;
        });
        if (showCount) {
          showCount.textContent = "SHOWING " + visible + " / " + rows.length;
        }
        if (gauge) gauge(visible, GAUGE_LABELS[f] || "SHOWING");
      });
    });
  }
})();
