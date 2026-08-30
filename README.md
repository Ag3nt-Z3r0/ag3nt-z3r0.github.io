# Agent Zero — Team Website

AI 에이전트 전문 리서치 팀 **Agent Zero**의 공식 사이트입니다.
정적 사이트(HTML/CSS/JS)로, GitHub Pages에서 바로 호스팅됩니다.

**Live**: https://ag3nt-z3r0.github.io/

## 디자인

"Observatory" 에디션 — 블랙&화이트 계측기(HUD) 패널 콘셉트.
디더링 도트 매트릭스 그래픽, 헤어라인 기하 다이어그램, 모노스페이스 텔레메트리 라벨,
해칭 밴드, CRT 스캔라인. 시그널 오렌지(#FF4D00)는 라이브 마커에만 극소량 사용.

폰트: Archivo(확장 그로테스크 디스플레이) × IBM Plex Mono(HUD 라벨) ×
IBM Plex Sans KR(본문). 제목은 악센트 서체 없이 전부 대문자로 통일.

페이지별 시그니처 컴포넌트:

- **홈**: 도트 매트릭스 돔 히어로, 공개 ID 티커, 사이트 인덱스 리스트(dirlist)
- **About**: 스펙 시트 히어로, 파형 비교 카드(UNAUDITED vs ZEROED),
  공개 파이프라인 다이어그램(SCAN→REPRO→DRAFT→COORD), 협업 대상 셀
- **Agents**: 스펙 시트 히어로 + 에이전트 유닛 카드 2종(CrayFisher · DeepSealer,
  인라인 SVG 엠블럼 + 스펙 리스트), 핸드오프 파이프라인(CAST→SEAL→COORD)
- **Team**: 궤도 다이어그램 히어로 + 계측 로스터(하프톤 초상), 공석(AZ-005) 카드
- **Disclosure**: CRT 히어로(업타임 카운터/스캔라인/겹친 원 구조도), 반원 게이지,
  작동하는 심각도 필터, 브래킷 카운터, 프로토콜 카드

## 구조

```
index.html      # 홈 (히어로+돔 / 티커 / 사이트 인덱스 / 푸터)
about.html      # 독트린 (스펙 시트 히어로 / 비교 카드 / 파이프라인 / 협업 대상)
agents.html     # 에이전트 (스펙 시트 히어로 / 유닛 카드 2종 / 핸드오프 파이프라인)
team.html       # 팀 (궤도 히어로 / 로스터 / 공석 카드)
disclosure.html # 전체 취약점 공개 ledger (CRT 히어로 / 게이지 / 필터 / 전체 표 / 프로토콜)
css/style.css   # 스타일 (모노크롬 HUD 테마, :root 토큰)
js/main.js      # 인터랙션 (리빌, 시계/업타임, 커서 텔레메트리, 게이지, ledger 필터)
images/         # 도레 판화 (팀 로스터 썸네일은 하프톤 도트 처리로 사용)
```

## 로컬 프리뷰

`.claude/launch.json`의 `site`(포트 4173) 또는 `site-redesign`(포트 4180) 설정 사용:

```bash
python -m http.server 4173
```

## 배포 (GitHub Pages)

1. 이 저장소(`ag3nt-z3r0.github.io`)의 `main` 브랜치에 푸시
2. GitHub 저장소 → **Settings → Pages** → Source: `Deploy from a branch`, Branch: `main / (root)`
3. 1–2분 후 https://ag3nt-z3r0.github.io/ 에서 확인

## 내용 수정 가이드

- **팀원**: `team.html`의 `.orbit__chip`(궤도 다이어그램)과 `.roster__row`(로스터) 블록 수정
- **에이전트**: `agents.html`의 `.unit`(유닛 카드: 이름·역할·설명·스펙)과 `.pipeline--3`(핸드오프) 블록 수정
- **이메일**: `hello@agentzero.team`을 실제 주소로 교체
- **공개 표**: `disclosure.html`의 `#ledgerTable` 행 수정 (`data-sev` 속성이 필터 기준)
- **통계 숫자**: 두 페이지의 `.stat__value` + 게이지 SVG의 `stroke-dasharray`/바늘 좌표
- **색상/폰트**: `css/style.css` 상단 `:root` 변수
- **돔 위치**: `css/style.css`의 `.hero__stage` `margin` (음수 top 값이 돔을 위로 끌어올림)
- **티커 문구**: `index.html`의 `.ticker__seq` (두 벌 동일하게 유지해야 루프가 끊기지 않음)

## 이미지 출처

팀 로스터 썸네일은 Gustave Doré(1832–1883)의 판화(퍼블릭 도메인, Wikimedia Commons)를
하프톤 처리한 것입니다. 나머지 그래픽(돔, 궤도, 게이지, 원 구조도)은 전부 인라인 SVG/CSS로 생성됩니다.
