/* ============================================================
   AGENT ZERO — black & white edition · interactions
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
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");
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

  /* ---------- KST clock ---------- */
  var footClock = document.getElementById("footClock");
  function tick() {
    if (!footClock) return;
    footClock.textContent = new Date().toLocaleTimeString("ko-KR", {
      timeZone: "Asia/Seoul", hour12: false,
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- parallax on engraving blocks ---------- */
  var parallaxEls = document.querySelectorAll(".parallax");
  if (parallaxEls.length && !prefersReduced) {
    var ticking = false;
    function parallax() {
      var vh = window.innerHeight;
      parallaxEls.forEach(function (img) {
        var r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh; // -0.5 … 0.5
        img.style.transform = "translateY(" + (p * -7) + "%)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(parallax); ticking = true; }
    }, { passive: true });
    parallax();
  }

  /* ---------- terminal typing loop ---------- */
  var term = document.getElementById("terminalBody");
  if (term) {
    var LINES = [
      { t: "$ az run --swarm 4 --task \"evaluate planner-worker patterns\"", d: 0 },
      { t: "[orchestrator]  spawning 4 agents · pattern=planner-worker", d: 1 },
      { t: "[agent:plan]    task decomposed -> 7 subtasks", d: 1 },
      { t: "[agent:w1]      tool_call: run_benchmark(suite=\"gaia-mini\")", d: 1 },
      { t: "[agent:w2]      tool_call: search_papers(q=\"multi-agent eval\")", d: 1 },
      { t: "[judge]         cross-checking outputs… consensus 3/3 ✓", d: 1 },
      { t: "[memory]        writing findings -> /lab/notes/2026-06-11.md", d: 1 },
      { t: "→ run complete · 312 evals · 0 regressions", d: 0 },
      { t: "", d: 0 },
      { t: "$ az report --latest --format=markdown", d: 0 },
      { t: "[reporter]      compiling ablations · 4 patterns × 3 seeds", d: 1 },
      { t: "→ report ready: results/orchestration-v2.md", d: 0 }
    ];

    if (prefersReduced) {
      term.textContent = LINES.map(function (l) { return l.t; }).join("\n");
    } else {
      var li = 0, ci = 0;
      var caret = document.createElement("span");
      caret.className = "caret";
      var buf = document.createTextNode("");
      term.appendChild(buf);
      term.appendChild(caret);

      function typeStep() {
        if (li >= LINES.length) {
          setTimeout(function () {
            buf.textContent = ""; li = 0; ci = 0;
            typeStep();
          }, 5200);
          return;
        }
        var line = LINES[li];
        if (ci < line.t.length) {
          var chunk = line.t.charAt(ci) === "[" ? 1 : (Math.random() < 0.4 ? 2 : 1);
          buf.textContent += line.t.substr(ci, chunk);
          ci += chunk;
          setTimeout(typeStep, line.t.charAt(0) === "$" ? 26 : 9);
        } else {
          buf.textContent += "\n";
          li++; ci = 0;
          setTimeout(typeStep, LINES[li - 1].t.charAt(0) === "$" ? 420 : 190);
        }
      }
      // start typing when visible
      if ("IntersectionObserver" in window) {
        var tio = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) { typeStep(); tio.disconnect(); }
        }, { threshold: 0.3 });
        tio.observe(term);
      } else {
        typeStep();
      }
    }
  }
})();
