# Agent Zero — Team Website

AI 에이전트 전문 리서치 팀 **Agent Zero**의 공식 사이트입니다.
정적 사이트(HTML/CSS/JS)로, GitHub Pages에서 바로 호스팅됩니다.

**Live**: https://ag3nt-z3r0.github.io/

## 디자인

블랙&화이트 모노크롬 + 구스타프 도레(Gustave Doré) 판화(퍼블릭 도메인, Wikimedia Commons).
세리프 디스플레이(Cormorant Garamond) × 타자기 모노(Courier Prime / Nanum Gothic Coding) 조합.

## 구조

```
index.html      # 홈 페이지 (히어로 / 터미널 프리뷰 / 대상 / 최근 공개 / 팀 / 푸터)
disclosure.html # 전체 취약점 공개 ledger 페이지
css/style.css   # 스타일 (모노크롬 테마, 판화 invert+blend 처리)
js/main.js      # 인터랙션 (터미널 타이핑, 패럴랙스, 리빌, 시계)
images/         # 도레 판화 18점 (그레이스케일 최적화)
```

## 배포 (GitHub Pages)

1. 이 저장소(`ag3nt-z3r0.github.io`)의 `main` 브랜치에 푸시
2. GitHub 저장소 → **Settings → Pages** → Source: `Deploy from a branch`, Branch: `main / (root)`
3. 1–2분 후 https://ag3nt-z3r0.github.io/ 에서 확인

## 내용 수정 가이드

- **팀원**: `index.html`의 `<article class="member">` 블록 수정 (현재는 플레이스홀더 프로필)
- **이메일**: `hello@agentzero.team`을 실제 주소로 교체
- **최근 공개 표**: `index.html`의 `<table class="disclosure__table--recent">` 행 수정
- **전체 공개 표**: `disclosure.html`의 `<table class="disclosure__table">` 행 수정
- **색상/폰트**: `css/style.css` 상단 `:root` 변수
- **터미널 데모 문구**: `js/main.js`의 `LINES` 배열

## 이미지 출처

모든 삽화는 Gustave Doré(1832–1883)의 판화로 퍼블릭 도메인입니다.
출처: Wikimedia Commons — 신곡(천국편), 실낙원, 돈키호테, 도레 성경, 런던 순례 등.
