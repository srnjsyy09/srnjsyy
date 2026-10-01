const LS_POINTS = "lf_points_v1";
const LS_REPORTS = "lf_reports_v1";
const LS_HOME = "lf_home_v1";
const LS_SURVEY = "lf_survey_v1";
const LS_ONBOARDING = "lf_onboarding_v1";
const DAY_MS = 24 * 60 * 60 * 1000;

const ALL_PLACES = ["카페", "편의점", "식당", "공원", "회사·학교", "대중교통", "기타"];

const ITEM_PLACE = {
  "지갑·카드": { "카페": 0.8, "편의점": 0.9, "식당": 0.9, "공원": 0.3, "회사·학교": 0.5, "대중교통": 0.7, "기타": 0.5 },
  "휴대폰": { "카페": 0.9, "편의점": 0.4, "식당": 0.9, "공원": 0.4, "회사·학교": 0.6, "대중교통": 0.8, "기타": 0.5 },
  "이어폰": { "카페": 0.6, "편의점": 0.3, "식당": 0.5, "공원": 0.9, "회사·학교": 0.4, "대중교통": 0.8, "기타": 0.6 },
  "우산": { "카페": 0.9, "편의점": 0.9, "식당": 0.8, "공원": 0.4, "회사·학교": 0.6, "대중교통": 0.8, "기타": 0.5 },
  "열쇠": { "카페": 0.5, "편의점": 0.4, "식당": 0.5, "공원": 0.8, "회사·학교": 0.5, "대중교통": 0.5, "기타": 0.6 },
  "가방": { "카페": 0.8, "편의점": 0.3, "식당": 0.6, "공원": 0.5, "회사·학교": 0.8, "대중교통": 0.8, "기타": 0.5 },
  "책·노트북": { "카페": 0.9, "편의점": 0.2, "식당": 0.4, "공원": 0.3, "회사·학교": 0.9, "대중교통": 0.6, "기타": 0.4 },
  "기타": { "카페": 0.6, "편의점": 0.6, "식당": 0.6, "공원": 0.6, "회사·학교": 0.6, "대중교통": 0.6, "기타": 0.6 },
};

const ITEM_TIPS = {
  "지갑·카드": "계산대와 테이블 위, 의자 사이, 가방 안쪽 포켓을 먼저 확인하세요.",
  "휴대폰": "식당·카페 좌석과 테이블 아래, 대중교통 좌석을 먼저 확인하세요.",
  "이어폰": "벤치와 의자 주변 바닥, 겉옷 주머니를 먼저 확인하세요.",
  "우산": "가게 입구의 우산꽂이와 좌석 옆을 먼저 확인하세요.",
  "열쇠": "바닥과 주머니, 자전거·자동차 주변을 먼저 확인하세요.",
  "가방": "좌석에 걸어둔 곳과 카페 의자 등받이를 먼저 확인하세요.",
  "책·노트북": "카페 테이블과 도서관·회사 책상 위를 먼저 확인하세요.",
  "기타": "머문 시간이 긴 장소부터 방문 순서대로 확인하세요.",
};
const HOME_RADIUS = 80;

const ACTIVITIES = ["계산·결제", "앉아서 장시간 머무름", "가방에서 물건 꺼냄", "가방·외투를 벗어둠", "전화·이어폰 사용", "빠르게 지나침"];

const ITEM_ACTIVITY = {
  "지갑·카드": { "계산·결제": 1, "가방에서 물건 꺼냄": 0.9, "가방·외투를 벗어둠": 0.6, "앉아서 장시간 머무름": 0.55, "전화·이어폰 사용": 0.35, "빠르게 지나침": 0.25 },
  "휴대폰": { "전화·이어폰 사용": 1, "앉아서 장시간 머무름": 0.85, "계산·결제": 0.65, "가방에서 물건 꺼냄": 0.6, "가방·외투를 벗어둠": 0.6, "빠르게 지나침": 0.3 },
  "이어폰": { "전화·이어폰 사용": 1, "가방·외투를 벗어둠": 0.85, "가방에서 물건 꺼냄": 0.75, "앉아서 장시간 머무름": 0.7, "빠르게 지나침": 0.45, "계산·결제": 0.4 },
  "우산": { "앉아서 장시간 머무름": 0.8, "가방·외투를 벗어둠": 0.7, "계산·결제": 0.5, "가방에서 물건 꺼냄": 0.5, "빠르게 지나침": 0.5, "전화·이어폰 사용": 0.3 },
  "열쇠": { "가방에서 물건 꺼냄": 0.95, "계산·결제": 0.7, "빠르게 지나침": 0.6, "가방·외투를 벗어둠": 0.6, "앉아서 장시간 머무름": 0.55, "전화·이어폰 사용": 0.25 },
  "가방": { "가방·외투를 벗어둠": 1, "앉아서 장시간 머무름": 0.8, "가방에서 물건 꺼냄": 0.5, "계산·결제": 0.4, "빠르게 지나침": 0.3, "전화·이어폰 사용": 0.25 },
  "책·노트북": { "앉아서 장시간 머무름": 1, "가방에서 물건 꺼냄": 0.85, "가방·외투를 벗어둠": 0.7, "계산·결제": 0.3, "전화·이어폰 사용": 0.3, "빠르게 지나침": 0.25 },
  "기타": {},
};

const ACTIVITY_TEXT = {
  "계산·결제": { "지갑·카드": "계산 후 지갑·카드를 카운터에 올려두고 그대로 나오는 사례가 가장 흔합니다", default: "결제하면서 물건을 잠시 내려둔 뒤 그냥 가셨을 수 있습니다" },
  "앉아서 장시간 머무름": { default: "오래 앉아 계신 동안 테이블·좌석에 물건을 올려두고 일어나기 쉽습니다" },
  "가방에서 물건 꺼냄": { "열쇠": "가방을 열었던 순간 열쇠가 빠져 안쪽 바닥에 남았을 수 있습니다", default: "가방을 여닫는 사이 물건이 흘러나와 자리에 남았을 수 있습니다" },
  "가방·외투를 벗어둠": { "가방": "가방을 벗어 의자에 걸어두고 일어나는 경우가 매우 흔합니다", "이어폰": "벗어 둔 외투 주머니 속에 이어폰이 그대로 남았을 수 있습니다", default: "벗어 둔 가방·외투 곁에 물건을 내려두고 가기 쉽습니다" },
  "전화·이어폰 사용": { "휴대폰": "통화를 마친 뒤 휴대폰을 테이블이나 좌석에 두고 가기 쉽습니다", "이어폰": "이어폰을 사용한 자리 주변(벤치·테이블·바닥)에 두고 갈 확률이 높습니다", default: "기기를 꺼내 쓰다가 주변에 두었을 가능성이 있습니다" },
  "빠르게 지나침": { default: "잠깐 머물거나 스쳐 지나가선 눈에 띄지 않게 떨어뜨릴 수 있습니다" },
};

const PLACE_TEXT = {
  "카페": "카페 테이블은 물건을 올려두기 쉽고, 일어나며 두고 가는 일이 잦은 공간입니다",
  "편의점": "편의점 계산대에는 물건을 올려둔 채 나오는 경우가 많습니다",
  "식당": "식당 좌석과 테이블 아래는 두고 나오기 쉬운 대표적인 장소입니다",
  "공원": "공원 벤치·잔디에 앉았다 일어날 때 흘리기 쉽습니다",
  "회사·학교": "책상이나 회의실 자리에 두고 오는 경우가 많습니다",
  "대중교통": "좌석 위·아래에 두고 내리는 사례가 많습니다",
  "기타": "머무는 동안 물건을 내려둘 수 있는 공간입니다",
};

const NEW_PLACE = 50;
const STABLE_DIST = 15;
const STABLE_WINDOW = 15000;
const SESSION_MS = 60000;
const ANCHOR_EXPIRE = 10 * 60 * 1000;

const demoScenarios = [
  {
    emoji: "☕",
    name: "카페·편의점 코스",
    desc: "집에서 나가 카페와 편의점을 들른 뒤 사무실로. 지갑을 편의점 카운터에 두고 온 상황",
    stops: [
      { lat: 37.4981, lng: 127.0276, label: "집 (강남역 인근)", dwellMin: 0, home: true },
      { lat: 37.5008, lng: 127.0320, label: "테헤란로 카페", dwellMin: 10 },
      { lat: 37.4990, lng: 127.0355, label: "편의점 카운터", dwellMin: 13, lost: true },
      { lat: 37.4965, lng: 127.0375, label: "사무실", dwellMin: 0 },
    ],
  },
  {
    emoji: "🌳",
    name: "공원 산책 코스",
    desc: "집에서 나와 공원을 산책하고 벤치에서 휴식. 벤치 위에 무선 이어폰을 두고 온 상황",
    stops: [
      { lat: 37.5000, lng: 127.0360, label: "집 (역삼동)", dwellMin: 0, home: true },
      { lat: 37.5040, lng: 127.0330, label: "공원 입구", dwellMin: 4 },
      { lat: 37.5060, lng: 127.0370, label: "공원 벤치", dwellMin: 18, lost: true },
      { lat: 37.5020, lng: 127.0340, label: "편의점", dwellMin: 5 },
      { lat: 37.5000, lng: 127.0360, label: "집 (역삼동)", dwellMin: 0, home: true },
    ],
  },
  {
    emoji: "🍜",
    name: "점심 외출 코스",
    desc: "집 근처 식당과 카페를 다녀옴. 휴대폰을 식당 좌석에 두고 나온 상황",
    stops: [
      { lat: 37.4955, lng: 127.0290, label: "집 (역삼동)", dwellMin: 0, home: true },
      { lat: 37.4930, lng: 127.0250, label: "점심 식당", dwellMin: 22, lost: true },
      { lat: 37.4950, lng: 127.0225, label: "디저트 카페", dwellMin: 8 },
      { lat: 37.4970, lng: 127.0260, label: "편의점", dwellMin: 4 },
      { lat: 37.4955, lng: 127.0290, label: "집 (역삼동)", dwellMin: 0, home: true },
    ],
  },
];

const $ = (id) => document.getElementById(id);

let points = load(LS_POINTS, []).sort((a, b) => a.t - b.t);
let reports = load(LS_REPORTS, []);
let home = load(LS_HOME, null);
let watchId = null;
let demoTimer = null;
let demoState = null;
let demoName = "";
let homeBeforeDemo = null;
let demoHomeSnapshotTaken = false;
let currentDemoRunId = null;
let activeView = null;
let routeLayer = null;
let homeLayer = null;
let cursorMarker = null;
let cursorIndex = 0;
let playing = false;
let playTimer = null;
let lostSpot = null;
let revealLost = false;
let sessionEnd = 0;
let sessionAnchor = null;
let anchorTime = 0;
let recent = [];
let lastState = "off";
let survey = load(LS_SURVEY, null);
let pendingStart = null;
let currentDwells = [];
let spotLayers = [];
let currentScenario = null;
let spotTypeMemory = {};
let selItem = null;
let selPlaces = [];
let selActivities = {};
let aiToken = 0;
let surveyStep = 1;

const map = L.map("map", { zoomControl: true }).setView([37.4979, 127.0276], 15);

const TILE_PROVIDERS = [
  {
    url: "https://tile.openstreetmap.de/{z}/{x}/{y}.png",
    options: {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    },
  },
  {
    url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
    options: {
      maxZoom: 20,
      subdomains: "abc",
      attribution: "&copy; OpenStreetMap France &copy; OpenStreetMap contributors",
    },
  },
];
let tileLayer = null;
let tileProviderIdx = 0;
let tileErrorCount = 0;

function loadTiles() {
  const provider = TILE_PROVIDERS[tileProviderIdx];
  if (tileLayer) map.removeLayer(tileLayer);
  tileErrorCount = 0;
  tileLayer = L.tileLayer(provider.url, provider.options).addTo(map);
  tileLayer.on("tileerror", () => {
    tileErrorCount++;
    if (tileErrorCount >= 4 && tileProviderIdx < TILE_PROVIDERS.length - 1) {
      tileProviderIdx++;
      loadTiles();
    }
  });
}
loadTiles();

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save() {
  const cutoff = Date.now() - DAY_MS;
  points = points.filter((p) => p.t > cutoff);
  try {
    localStorage.setItem(LS_POINTS, JSON.stringify(points));
    localStorage.setItem(LS_REPORTS, JSON.stringify(reports));
    return true;
  } catch (error) {
    console.warn("브라우저 저장소에 기록을 저장하지 못했습니다.", error);
    return false;
  }
}

function haversine(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function fmtTime(t) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(t);
}

function fmtShort(t) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(t);
}

function fmtDist(m) {
  return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(2)} km`;
}

function fmtDur(ms) {
  const min = Math.floor(ms / 60000);
  if (min < 60) return `${min}분`;
  return `${Math.floor(min / 60)}시간 ${min % 60}분`;
}

function drawHome() {
  if (homeLayer) {
    map.removeLayer(homeLayer);
    homeLayer = null;
  }
  if (!home) return;
  homeLayer = L.layerGroup().addTo(map);
  L.circle([home.lat, home.lng], {
    radius: HOME_RADIUS,
    color: "#64748b",
    weight: 2,
    fillColor: "#94a3b8",
    fillOpacity: 0.15,
    dashArray: "6 6",
  }).addTo(homeLayer);
  L.marker([home.lat, home.lng], {
    icon: L.divIcon({
      className: "",
      html: '<div style="font-size:26px;line-height:1;">🏠</div>',
      iconSize: [26, 26],
      iconAnchor: [13, 13],
    }),
  }).bindPopup("<b>집</b><br>이 반경 안에서는 위치가 기록되지 않습니다").addTo(homeLayer);
}

function updateHomeMeta() {
  const button = $("homeBtn");
  const meta = $("homeMeta");
  if (!button || !meta) return;
  button.textContent = home ? "🏠 집 위치 해제" : "🏠 집 위치 등록";
  meta.textContent = home
    ? `집 등록됨 · 반경 ${HOME_RADIUS}m 안은 기록 제외`
    : "집 미등록 · 현재 모든 위치가 기록됩니다";
}

function updateRecent(fix) {
  recent.push(fix);
  while (recent.length && recent[0].t < fix.t - STABLE_WINDOW - 2000) recent.shift();
}

function isStable() {
  if (recent.length < 2) return false;
  return haversine(recent[0], recent[recent.length - 1]) <= STABLE_DIST;
}

function recordDecision(fix) {
  if (home && haversine(fix, home) <= HOME_RADIUS) {
    sessionEnd = 0;
    return { record: false, state: "home" };
  }
  const now = fix.t;
  if (now < sessionEnd) return { record: true, state: "recording" };
  if (
    isStable() &&
    (!sessionAnchor ||
      haversine(fix, sessionAnchor) > NEW_PLACE ||
      now - anchorTime > ANCHOR_EXPIRE)
  ) {
    sessionEnd = now + SESSION_MS;
    sessionAnchor = { lat: fix.lat, lng: fix.lng };
    anchorTime = now;
    return { record: true, state: "recording" };
  }
  const lastStored = points[points.length - 1];
  if (!lastStored || haversine(fix, lastStored) > NEW_PLACE) {
    return { record: true, state: "moving" };
  }
  return { record: false, state: "waiting" };
}

function refreshStatus() {
  if (demoTimer) {
    const prefix = `🎮 ${demoName} · `;
    if (sessionEnd > Date.now()) {
      setStatus("demo", `${prefix}🔴 방문 기록 중 · ${Math.ceil((sessionEnd - Date.now()) / 1000)}초`);
    } else if (lastState === "home") {
      setStatus("demo", prefix + "🏠 집 · 기록 제외");
    } else if (lastState === "recording") {
      setStatus("demo", prefix + "🔴 방문 기록 중");
    } else if (lastState === "moving") {
      setStatus("demo", prefix + "🚶 이동 중");
    } else {
      setStatus("demo", prefix + "📡 이동 감지 대기 중");
    }
    return;
  }
  if (watchId !== null) {
    if (sessionEnd > Date.now()) {
      setStatus("live", `🔴 방문 기록 중 · ${Math.ceil((sessionEnd - Date.now()) / 1000)}초`);
    } else if (lastState === "home") {
      setStatus("live", "🏠 집 · 기록 제외");
    } else if (lastState === "moving") {
      setStatus("live", "🚶 이동 중 · 경로 기록");
    } else if (lastState === "recording") {
      setStatus("live", "🔴 방문 기록 중");
    } else {
      setStatus("live", "📡 이동 감지 대기 중");
    }
    return;
  }
  setStatus("idle", "추적 대기 중");
}
setInterval(refreshStatus, 1000);

function addPoint(p) {
  const last = points[points.length - 1];
  if (last && p.t - last.t < 2000 && haversine(last, p) < 2) return;
  points.push(p);
  points.sort((a, b) => a.t - b.t);
  save();
  updateRecordMeta();
  if (activeView && activeView.live) {
    activeView.end = p.t + 60000;
    renderRoute();
    setCursor(points.length - 1, false);
  }
}

function ingest(fix) {
  updateRecent(fix);
  const d = recordDecision(fix);
  lastState = d.state;
  refreshStatus();
  if (d.record) addPoint(fix);
}

function setStatus(mode, text) {
  const dot = $("statusDot");
  dot.className = "dot " + (mode || "idle");
  $("statusText").textContent = text;
}

function updateRecordMeta() {
  const last = points[points.length - 1];
  $("recordMeta").textContent = last
    ? `저장된 기록 ${points.length}개 · 마지막 기록 ${fmtTime(last.t)}`
    : "아직 기록된 위치가 없습니다";
}

function startGPS() {
  if (!navigator.geolocation) {
    alert("이 브라우저는 위치 기능을 지원하지 않습니다.");
    return;
  }
  stopDemo(true);
  if (activeView && activeView.demoRunId) activeView = null;
  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      ingest({
        t: pos.timestamp || Date.now(),
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        acc: pos.coords.accuracy,
      });
    },
    (err) => {
      alert("위치를 가져올 수 없습니다: " + err.message + "\n(HTTPS 또는 localhost에서 권한을 허용해 주세요)");
      stopGPS();
    },
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 }
  );
  lastState = "waiting";
  $("gpsBtn").textContent = "⏹ GPS 추적 중지";
  $("gpsBtn").classList.add("active");
  refreshStatus();
}

function stopGPS() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  sessionEnd = 0;
  recent = [];
  $("gpsBtn").textContent = "📍 GPS 추적 시작";
  $("gpsBtn").classList.remove("active");
  refreshStatus();
}

function genScenarioHistory(sc, demoRunId) {
  const pts = [];
  const now = Date.now();
  const step = 10 * 1000;
  const speed = 1.3;
  let t = now - 62 * 60 * 1000;
  let cur = { lat: sc.stops[0].lat, lng: sc.stops[0].lng };
  let lost = null;
  let anchor = null;
  let lastEmit = null;
  const jitter = () => (Math.random() - 0.5) * 0.00003;
  const emit = (lat, lng) => {
    pts.push({ t, lat, lng, acc: 10, demo: true, demoRunId });
    lastEmit = { lat, lng };
  };
  for (let i = 0; i < sc.stops.length; i++) {
    const stop = sc.stops[i];
    if (i > 0) {
      const segStart = { ...cur };
      const dist = haversine(segStart, stop);
      const walkSteps = Math.max(1, Math.floor((dist / speed) / (step / 1000)));
      for (let s = 1; s <= walkSteps; s++) {
        const r = s / walkSteps;
        const lat = segStart.lat + (stop.lat - segStart.lat) * r;
        const lng = segStart.lng + (stop.lng - segStart.lng) * r;
        if (!lastEmit || haversine(lastEmit, { lat, lng }) >= NEW_PLACE) emit(lat, lng);
        t += step;
      }
    }
    cur = { lat: stop.lat, lng: stop.lng };
    if (stop.home) {
      anchor = null;
      continue;
    }
    const isNew = !anchor || haversine(cur, anchor) > NEW_PLACE;
    if (isNew) {
      for (let s = 0; s < 6; s++) {
        cur = { lat: stop.lat + jitter(), lng: stop.lng + jitter() };
        emit(cur.lat, cur.lng);
        t += step;
      }
      anchor = { lat: stop.lat, lng: stop.lng };
      if (stop.dwellMin > 1) t += (stop.dwellMin - 1) * 60000;
    } else if (stop.dwellMin > 0) {
      t += stop.dwellMin * 60000;
      cur = { lat: stop.lat + jitter(), lng: stop.lng + jitter() };
    }
    if (stop.lost) lost = { lat: stop.lat, lng: stop.lng, label: stop.label };
  }
  while (t < now) {
    cur = { lat: cur.lat + jitter() * 6, lng: cur.lng + jitter() * 6 };
    t += step;
    if (!lastEmit || haversine(lastEmit, cur) >= NEW_PLACE) emit(cur.lat, cur.lng);
  }
  return { pts, state: { lat: cur.lat, lng: cur.lng }, lost };
}

function startDemo(sc) {
  stopGPS();
  stopDemo(true);
  currentScenario = sc;
  currentDemoRunId = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  homeBeforeDemo = home;
  demoHomeSnapshotTaken = true;
  home = { lat: sc.stops[0].lat, lng: sc.stops[0].lng };
  drawHome();
  const { pts, state, lost } = genScenarioHistory(sc, currentDemoRunId);
  points = points.concat(pts).sort((a, b) => a.t - b.t);
  demoState = state;
  demoName = `${sc.emoji} ${sc.name}`;
  lostSpot = lost;
  save();
  updateRecordMeta();
  demoTimer = setInterval(() => {
    demoState.lat += (Math.random() - 0.5) * 0.00006;
    demoState.lng += (Math.random() - 0.5) * 0.00006;
    ingest({
      t: Date.now(),
      lat: demoState.lat,
      lng: demoState.lng,
      acc: 10,
      demo: true,
      demoRunId: currentDemoRunId,
    });
  }, 5000);
  $("demoBtn").textContent = "⏹ 데모 중지";
  $("demoBtn").classList.add("active");
  lastState = "waiting";
  refreshStatus();
  revealLost = false;
  $("revealBtn").classList.toggle("hidden", !lostSpot);
  createReport(60, { demoRunId: currentDemoRunId });
}

function stopDemo(silent) {
  if (demoTimer) {
    clearInterval(demoTimer);
    demoTimer = null;
  }
  currentScenario = null;
  if (demoHomeSnapshotTaken) {
    home = homeBeforeDemo;
    homeBeforeDemo = null;
    demoHomeSnapshotTaken = false;
    drawHome();
    updateHomeMeta();
  }
  currentDemoRunId = null;
  lostSpot = null;
  revealLost = false;
  sessionEnd = 0;
  recent = [];
  $("revealBtn").classList.add("hidden");
  $("demoBtn").textContent = "🎮 데모 경로 체험";
  $("demoBtn").classList.remove("active");
  refreshStatus();
}

function findDwells(pts) {
  const out = [];
  if (!pts.length) return out;
  let anchor = pts[0];
  let i = 1;
  while (i < pts.length) {
    let j = i;
    while (j < pts.length && haversine(anchor, pts[j]) <= 25) j++;
    const dur = pts[j - 1].t - anchor.t;
    if ((j - i >= 4 && dur >= 50000) || (j - i >= 3 && dur >= 150000)) {
      out.push({ lat: anchor.lat, lng: anchor.lng, dur, t0: anchor.t, placeType: null, label: null, score: 0, rank: 0 });
    }
    anchor = pts[j];
    i = j + 1;
  }
  return out;
}

function clearRoute() {
  if (routeLayer) {
    map.removeLayer(routeLayer);
    routeLayer = null;
  }
  if (cursorMarker) {
    map.removeLayer(cursorMarker);
    cursorMarker = null;
  }
  if (playTimer) {
    clearInterval(playTimer);
    playTimer = null;
    playing = false;
    $("playBtn").textContent = "▶ 경로 재생";
  }
}

function pointsForView(view) {
  if (!view) return [];
  const source = view.demoRunId
    ? points.filter((p) => p.demoRunId === view.demoRunId)
    : points.filter((p) => !p.demo);
  return source.filter((p) => p.t >= view.start && p.t <= view.end);
}

function renderRoute() {
  clearRoute();
  if (!activeView) return;
  const inWindow = pointsForView(activeView);
  routeLayer = L.layerGroup().addTo(map);
  $("routeSummary").classList.remove("hidden");

  if (inWindow.length < 2) {
    currentDwells = [];
    spotLayers = [];
    $("lostTimeLabel").textContent = "해당 시간대의 이동 기록이 없습니다";
    $("distVal").textContent = $("timeVal").textContent = $("ptsVal").textContent = $("dwellVal").textContent = "-";
    $("slider").max = 0;
    $("cursorInfo").textContent = "추적을 시작하거나 데모 경로를 사용해 보세요";
    updateSurveyUI();
    updateSpotScores();
    return;
  }

  const windowStart = inWindow[0].t;
  const windowEnd = inWindow[inWindow.length - 1].t;
  $("lostTimeLabel").textContent = `${fmtShort(activeView.start)} 분실 신고 → ${fmtShort(windowStart)} ~ ${fmtShort(windowEnd)} 이동 경로`;

  let total = 0;
  for (let i = 1; i < inWindow.length; i++) total += haversine(inWindow[i - 1], inWindow[i]);

  const dwellPts = findDwells(inWindow);
  currentDwells = dwellPts;
  spotLayers = [];
  if (currentScenario && activeView.demoRunId === currentDemoRunId) {
    dwellPts.forEach((d) => {
      let best = null;
      let bd = Infinity;
      currentScenario.stops.forEach((st) => {
        if (st.home) return;
        const dd = haversine(d, st);
        if (dd < bd) {
          bd = dd;
          best = st;
        }
      });
      if (best && bd <= 60) {
        d.placeType = labelToPlace(best.label);
        d.label = best.label;
      }
      spotTypeMemory[spotKey(d.lat, d.lng)] = d.placeType;
    });
  } else {
    dwellPts.forEach((d) => {
      const saved = Object.keys(spotTypeMemory).find((k) => {
        const [la, lo] = k.split("_").map(Number);
        return haversine({ lat: la, lng: lo }, d) < 60;
      });
      if (saved) d.placeType = spotTypeMemory[saved];
    });
  }

  L.polyline(
    inWindow.map((p) => [p.lat, p.lng]),
    { color: "#2563eb", weight: 5, opacity: 0.75, lineJoin: "round" }
  ).addTo(routeLayer);

  L.circleMarker([inWindow[0].lat, inWindow[0].lng], {
    radius: 9, color: "#fff", weight: 3, fillColor: "#22c55e", fillOpacity: 1,
  }).bindPopup(`<b>🟢 이동 시작 지점</b><br>${fmtTime(inWindow[0].t)}`).addTo(routeLayer);

  const lastP = inWindow[inWindow.length - 1];
  L.circleMarker([lastP.lat, lastP.lng], {
    radius: 9, color: "#fff", weight: 3, fillColor: "#ef4444", fillOpacity: 1,
  }).bindPopup(`<b>🔴 마지막 위치</b><br>${fmtTime(lastP.t)}`).addTo(routeLayer);

  dwellPts.forEach((d) => {
    const marker = L.circleMarker([d.lat, d.lng], {
      radius: 13, color: "#f59e0b", weight: 2, fillColor: "#fbbf24", fillOpacity: 0.55,
    }).bindPopup(`<b>🟠 방문 기록 지점</b><br>도착 후 1분간 위치 기록 · 확인 우선순위 참고`).addTo(routeLayer);
    spotLayers.push({ marker, d });
  });

  if (revealLost && lostSpot) {
    L.marker([lostSpot.lat, lostSpot.lng], {
      icon: L.divIcon({
        className: "",
        html: '<div style="font-size:28px;line-height:1;filter:drop-shadow(0 2px 3px rgba(0,0,0,.4));">🎯</div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
      zIndexOffset: 2000,
    }).bindPopup(`<b>🎯 분실 지점</b><br><b>${lostSpot.label}</b>에서 잃어버렸어요!`).addTo(routeLayer);
  }

  $("distVal").textContent = fmtDist(total);
  $("timeVal").textContent = fmtDur(windowEnd - windowStart);
  $("ptsVal").textContent = `${inWindow.length}개`;
  $("dwellVal").textContent = `${dwellPts.length}곳`;

  updateSurveyUI();
  updateSpotScores();

  const slider = $("slider");
  slider.max = inWindow.length - 1;
  setCursor(inWindow.length - 1, false);
  map.fitBounds(
    L.polyline(inWindow.map((p) => [p.lat, p.lng])).getBounds(),
    { padding: [40, 40] }
  );
}

function setCursor(idx, pan) {
  const inWindow = pointsForView(activeView);
  if (!inWindow.length) return;
  idx = Math.max(0, Math.min(idx, inWindow.length - 1));
  cursorIndex = idx;
  $("slider").value = idx;
  const p = inWindow[idx];
  if (!cursorMarker) {
    cursorMarker = L.marker([p.lat, p.lng], {
      icon: L.divIcon({
        className: "",
        html: '<div class="pulse-marker"><div class="ring"></div><div class="core"></div></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      }),
      zIndexOffset: 1000,
    }).addTo(map);
  } else {
    cursorMarker.setLatLng([p.lat, p.lng]);
  }
  if (pan) map.panTo([p.lat, p.lng], { animate: true, duration: 0.4 });
  const back = new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric", minute: "2-digit", hour12: true,
  }).format(p.t);
  $("cursorInfo").textContent = `${back} · 위도 ${p.lat.toFixed(5)}, 경도 ${p.lng.toFixed(5)}`;
}

function playRoute() {
  if (playing) {
    clearInterval(playTimer);
    playing = false;
    $("playBtn").textContent = "▶ 경로 재생";
    return;
  }
  const max = Number($("slider").max);
  if (max < 1) return;
  playing = true;
  $("playBtn").textContent = "⏸ 정지";
  let i = Number($("slider").value) >= max ? 0 : Number($("slider").value);
  setCursor(i, false);
  playTimer = setInterval(() => {
    i++;
    setCursor(i, true);
    if (i >= max) {
      clearInterval(playTimer);
      playing = false;
      $("playBtn").textContent = "▶ 경로 재생";
    }
  }, 40);
}

function createReport(minutes, options = {}) {
  const now = Date.now();
  const report = {
    id: "r" + now,
    time: now,
    minutes,
    ...(options.demoRunId ? { demoRunId: options.demoRunId } : {}),
  };
  reports.unshift(report);
  if (reports.length > 20) reports.pop();
  const saved = save();
  renderReports();
  activeView = {
    start: now - minutes * 60000,
    end: now + 60000,
    label: `${minutes}분 전 분실`,
    live: true,
    demoRunId: report.demoRunId || null,
  };
  renderRoute();
  const hasLocationData = pointsForView(activeView).length > 0;
  const notice = $("reportNotice");
  notice.textContent = saved
    ? `신고 기록을 이 브라우저에 저장했습니다.${hasLocationData ? " 해당 시간대의 이동 기록을 분석했습니다." : " 다만 해당 시간대의 위치 기록이 없어 경로는 표시되지 않습니다. 미리 GPS 추적을 시작하거나 데모 경로를 이용해 주세요."}`
    : "신고 화면에는 기록했지만 브라우저 저장소가 차단되어 새로고침 후 기록이 사라질 수 있습니다.";
  notice.classList.remove("hidden");
}

function renderReports() {
  const box = $("reportsList");
  box.innerHTML = "";
  if (!reports.length) {
    box.innerHTML = '<p class="micro">아직 신고 기록이 없습니다.</p>';
    return;
  }
  reports.forEach((r) => {
    const item = document.createElement("div");
    item.className = "report-item";
    item.innerHTML = `
      <div class="info"><b>${r.minutes}분 전 분실 신고</b><span>${fmtShort(r.time)} 접수</span></div>
      <button class="view">경로 보기</button>
      <button class="del" title="삭제">✕</button>`;
    item.querySelector(".view").addEventListener("click", () => {
      activeView = {
        start: r.time - r.minutes * 60000,
        end: r.time + 60000,
        label: `${r.minutes}분 전 분실`,
        live: false,
        demoRunId: r.demoRunId || null,
      };
      renderRoute();
    });
    item.querySelector(".del").addEventListener("click", () => {
      reports = reports.filter((x) => x.id !== r.id);
      save();
      renderReports();
    });
    box.appendChild(item);
  });
}

function labelToPlace(label) {
  if (label.includes("카페")) return "카페";
  if (label.includes("편의점")) return "편의점";
  if (label.includes("식당")) return "식당";
  if (label.includes("공원")) return "공원";
  if (label.includes("사무실")) return "회사·학교";
  return "기타";
}

function spotKey(lat, lng) {
  return lat.toFixed(4) + "_" + lng.toFixed(4);
}

function updateSurveyUI() {
  const has = !!survey;
  $("itemLine").classList.toggle("hidden", !has);
  $("tipBox").classList.toggle("hidden", !has);
  $("spotAnalysis").classList.toggle("hidden", !has || !currentDwells.length);
  if (has) {
    const name = survey.item === "기타" ? survey.custom || "기타" : survey.item;
    $("itemLine").textContent = `🎒 잃어버린 물품: ${name}`;
    $("tipBox").textContent = "💡 " + (ITEM_TIPS[survey.item] || ITEM_TIPS["기타"]);
  }
}

function activityInfo(itemKey, placeType) {
  if (!survey || !placeType) return null;
  const acts = (survey.activities || {})[placeType];
  if (!acts || !acts.length) return null;
  let best = null;
  acts.forEach((a) => {
    const w = (ITEM_ACTIVITY[itemKey] || {})[a] ?? 0.6;
    if (!best || w > best.factor) best = { factor: w, best: a, acts };
  });
  return best;
}

function actText(act, itemKey) {
  const t = ACTIVITY_TEXT[act] || {};
  return t[itemKey] || t.default || "이곳에서 한 활동을 추정 점수에 반영했습니다";
}

function aiReasons(d, itemKey) {
  const out = [];
  if (d.actInfo) out.push(actText(d.actInfo.best, itemKey));
  if (d.placeType) out.push(PLACE_TEXT[d.placeType] || PLACE_TEXT["기타"]);
  if (d.dur >= 300000) out.push(`${fmtDur(d.dur)}간 머무르셨어요 — 오래 머문 장소일수록 물건을 내려둘 기회가 많습니다`);
  else if (d.dur >= 60000) out.push(`약 ${fmtDur(d.dur)}간 머무르셨어요 — 짧아도 물건을 내려둘 여지는 충분합니다`);
  else out.push("짧게 머물거나 스쳐 지나간 구간입니다 — 이동 중 떨어뜨렸을 수도 있어요");
  return out;
}

function aiAskRow(d) {
  if (!d.placeType) return null;
  const recorded = (survey.activities || {})[d.placeType];
  if (recorded && recorded.length) return null;
  const wrap = document.createElement("div");
  wrap.className = "ai-ask";
  const q = document.createElement("div");
  q.textContent = `여기(${d.placeType})에서 무엇을 하셨나요? 답해 주시면 추정 점수가 달라집니다`;
  wrap.appendChild(q);
  const chips = document.createElement("div");
  chips.className = "choices";
  ACTIVITIES.forEach((a) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = a;
    b.addEventListener("click", () => {
      survey.activities = survey.activities || {};
      const cur = survey.activities[d.placeType] || [];
      survey.activities[d.placeType] = cur.includes(a) ? cur.filter((x) => x !== a) : cur.concat(a);
      localStorage.setItem(LS_SURVEY, JSON.stringify(survey));
      renderSurveyMeta();
      updateSpotScores();
    });
    chips.appendChild(b);
  });
  wrap.appendChild(chips);
  return wrap;
}

function buildAISpotRow(d, itemKey, i) {
  const row = document.createElement("div");
  row.className = "ai-spot";
  row.style.animationDelay = `${Math.min(i, 5) * 130}ms`;
  const name = d.label || d.placeType || "방문 장소";
  const medal = d.rank === 1 ? "🥇" : d.rank === 2 ? "🥈" : d.rank === 3 ? "🥉" : `#${d.rank}`;
  const top = document.createElement("div");
  top.className = "ai-spot-top";
  top.innerHTML = `<span class="ai-spot-rank">${medal}</span><span class="ai-spot-name">${name}</span><span class="ai-spot-pct">점수 ${d.score}/100</span>`;
  const bar = document.createElement("div");
  bar.className = "bar";
  bar.innerHTML = `<i style="width:${d.score}%"></i>`;
  const reason = document.createElement("div");
  reason.className = "ai-reason";
  reason.innerHTML = aiReasons(d, itemKey).map((t) => `• ${t}`).join("<br>");
  row.appendChild(top);
  row.appendChild(bar);
  row.appendChild(reason);
  const ask = aiAskRow(d);
  if (ask) row.appendChild(ask);
  return row;
}

function renderAIAnalysis() {
  const box = $("aiCard");
  const token = ++aiToken;
  const has = !!survey && currentDwells.length > 0;
  const wasHidden = box.classList.contains("hidden");
  box.classList.toggle("hidden", !has);
  if (!has) return;
  const itemKey = ITEM_PLACE[survey.item] ? survey.item : "기타";
  const itemName = survey.item === "기타" ? survey.custom || "기타" : survey.item;
  const sorted = [...currentDwells].sort((a, b) => a.rank - b.rank);
  const status = $("aiStatus");
  const body = $("aiBody");
  const renderRows = () => {
    if (token !== aiToken) return;
    status.classList.remove("typing");
    status.textContent = `방문 ${sorted.length}곳 분석 완료 · 1위부터 확인해 보세요`;
    body.innerHTML = "";
    const intro = document.createElement("p");
    intro.className = "ai-intro";
    intro.textContent = `🎒 ‘${itemName}’ 분실 — 장소 적합도·체류 시간·설문 답변을 규칙 기반으로 계산한 참고용 추정 점수입니다. 통계적으로 검증된 확률이나 실제 AI 분석 결과는 아닙니다.`;
    body.appendChild(intro);
    sorted.forEach((d, i) => body.appendChild(buildAISpotRow(d, itemKey, i)));
  };
  if (wasHidden) {
    status.textContent = "경로·체류·활동 데이터 분석 중";
    status.classList.add("typing");
    body.innerHTML = "";
    setTimeout(renderRows, 1100);
  } else {
    renderRows();
  }
}

function updateSpotScores() {
  const itemKey = survey ? (ITEM_PLACE[survey.item] ? survey.item : "기타") : "기타";
  const opts = survey && survey.places.length ? survey.places : ALL_PLACES;
  currentDwells.forEach((d) => {
    const compat =
      d.placeType && ITEM_PLACE[itemKey][d.placeType] != null
        ? ITEM_PLACE[itemKey][d.placeType]
        : 0.6;
    const durScore = Math.min(1, d.dur / 300000);
    d.actInfo = activityInfo(itemKey, d.placeType);
    const actFactor = d.actInfo ? d.actInfo.factor : 0.4;
    d.score = Math.round((0.3 + 0.3 * durScore + 0.4 * actFactor) * compat * 100);
  });
  [...currentDwells].sort((a, b) => b.score - a.score).forEach((d, i) => (d.rank = i + 1));
  spotLayers.forEach(({ marker, d }) => {
    const durTxt = d.dur >= 60000 ? `약 ${fmtDur(d.dur)}` : "1분 미만";
    marker.setPopupContent(
      `<b>🟠 방문 기록 지점 ${d.rank}위</b><br>${fmtShort(d.t0)} 도착 · ${durTxt} 체류` +
      (d.label ? `<br>${d.label}` : "") +
      (d.actInfo ? `<br>하신 활동: ${d.actInfo.best}` : "") +
      `<br>분실 의심 점수 <b>${d.score}/100</b>`
    );
  });
  const list = $("spotList");
  list.innerHTML = "";
  [...currentDwells].sort((a, b) => a.rank - b.rank).forEach((d) => {
    const row = document.createElement("div");
    row.className = "spot-row";
    const medal = d.rank === 1 ? "🥇" : d.rank === 2 ? "🥈" : d.rank === 3 ? "🥉" : `#${d.rank}`;
    const durTxt = d.dur >= 60000 ? `약 ${fmtDur(d.dur)}` : "1분 미만";
    row.innerHTML = `
      <div class="spot-rank">${medal}</div>
      <div class="spot-info">
        <b>${fmtShort(d.t0)} 도착 · ${durTxt} 체류</b>
        <select class="spot-type">
          <option value="" ${!d.placeType ? "selected" : ""}>장소 유형 선택</option>
          ${opts.map((o) => `<option value="${o}" ${d.placeType === o ? "selected" : ""}>${o}</option>`).join("")}
        </select>
      </div>
      <div class="spot-score"><div class="bar"><i style="width:${d.score}%"></i></div><span>${d.score}/100점</span></div>`;
    row.querySelector("select").addEventListener("change", (e) => {
      d.placeType = e.target.value || null;
      spotTypeMemory[spotKey(d.lat, d.lng)] = d.placeType;
      updateSpotScores();
    });
    list.appendChild(row);
  });
  renderAIAnalysis();
}

function buildSurveyChips() {
  const ib = $("itemChoices");
  ib.innerHTML = "";
  Object.keys(ITEM_PLACE).forEach((k) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (selItem === k ? " on" : "");
    b.textContent = k;
    b.addEventListener("click", () => {
      selItem = k;
      $("customItem").classList.toggle("hidden", k !== "기타");
      buildSurveyChips();
    });
    ib.appendChild(b);
  });
  const pb = $("placeChoices");
  pb.innerHTML = "";
  ALL_PLACES.forEach((p) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (selPlaces.includes(p) ? " on" : "");
    b.textContent = p;
    b.addEventListener("click", () => {
      selPlaces = selPlaces.includes(p) ? selPlaces.filter((x) => x !== p) : selPlaces.concat(p);
      buildSurveyChips();
    });
    pb.appendChild(b);
  });
  buildActivityChips();
}

function buildActivityChips() {
  const wrap = $("activityWrap");
  wrap.innerHTML = "";
  if (!selPlaces.length) {
    wrap.innerHTML = '<p class="micro">2번에서 장소를 선택하면, 그곳에서 무엇을 했는지 물어봅니다.</p>';
    return;
  }
  selPlaces.forEach((p) => {
    const block = document.createElement("div");
    block.className = "activity-block";
    const title = document.createElement("b");
    title.textContent = `📍 ${p} — 여기서 무엇을 하셨나요?`;
    block.appendChild(title);
    const chips = document.createElement("div");
    chips.className = "choices";
    ACTIVITIES.forEach((a) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + ((selActivities[p] || []).includes(a) ? " on" : "");
      b.textContent = a;
      b.addEventListener("click", () => {
        const cur = selActivities[p] || [];
        selActivities[p] = cur.includes(a) ? cur.filter((x) => x !== a) : cur.concat(a);
        buildActivityChips();
      });
      chips.appendChild(b);
    });
    block.appendChild(chips);
    wrap.appendChild(block);
  });
}

function openSurvey() {
  selItem = survey ? survey.item : null;
  selPlaces = survey ? [...survey.places] : [];
  selActivities = {};
  if (survey && survey.activities) {
    Object.keys(survey.activities).forEach((k) => (selActivities[k] = [...survey.activities[k]]));
  }
  surveyStep = 1;
  $("customItem").classList.toggle("hidden", selItem !== "기타");
  if (survey && survey.item === "기타") $("customItem").value = survey.custom || "";
  buildSurveyChips();
  renderSurveyStep();
  $("surveyModal").classList.remove("hidden");
}

function renderSurveyStep() {
  [1, 2, 3].forEach((step) => {
    $("surveyStep" + step).classList.toggle("hidden", step !== surveyStep);
  });
  $("surveyStepLabel").textContent = `${surveyStep} / 3 단계`;
  $("surveyProgress").style.width = `${(surveyStep / 3) * 100}%`;
  $("surveyBack").classList.toggle("hidden", surveyStep === 1);
  $("surveyNext").classList.toggle("hidden", surveyStep === 3);
  $("surveySave").classList.toggle("hidden", surveyStep !== 3);
}

function renderSurveyMeta() {
  const actCount = survey
    ? Object.values(survey.activities || {}).filter((a) => a.length).length
    : 0;
  $("surveyMeta").textContent = survey
    ? `설문 완료 · 물품: ${survey.item === "기타" ? survey.custom || "기타" : survey.item}` +
      (survey.places.length ? ` · 장소: ${survey.places.join(", ")}` : "") +
      (actCount ? ` · 활동 입력 ${actCount}곳` : "")
    : "설문 미완료 · 추적 시작 전 설문이 필요합니다";
}

function registerHome() {
  if (home) {
    if (!confirm("등록된 집 위치를 해제할까요?")) return;
    home = null;
    localStorage.removeItem(LS_HOME);
    drawHome();
    updateHomeMeta();
    return;
  }
  const apply = (lat, lng) => {
    home = { lat, lng };
    localStorage.setItem(LS_HOME, JSON.stringify(home));
    drawHome();
    updateHomeMeta();
    map.setView([lat, lng], 16);
  };
  const last = points[points.length - 1];
  if (navigator.geolocation && !demoTimer) {
    navigator.geolocation.getCurrentPosition(
      (pos) => apply(pos.coords.latitude, pos.coords.longitude),
      () => {
        if (last) {
          apply(last.lat, last.lng);
        } else {
          alert("현재 위치를 가져올 수 없습니다. 추적 시작 후 다시 시도해 주세요.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } else if (last) {
    apply(last.lat, last.lng);
  } else {
    alert("먼저 GPS 추적 또는 데모를 시작해 주세요.");
  }
}

$("gpsBtn").addEventListener("click", () => {
  if (watchId === null && !survey) {
    pendingStart = { type: "gps" };
    openSurvey();
    return;
  }
  watchId === null ? startGPS() : stopGPS();
});

$("surveyBtn").addEventListener("click", openSurvey);

$("surveyClose").addEventListener("click", () => {
  pendingStart = null;
  $("surveyModal").classList.add("hidden");
});

$("surveyBack").addEventListener("click", () => {
  if (surveyStep > 1) {
    surveyStep--;
    renderSurveyStep();
  }
});

$("surveyNext").addEventListener("click", () => {
  if (surveyStep === 1) {
    if (!selItem) {
      alert("잃어버린 물품을 선택해 주세요.");
      return;
    }
    if (selItem === "기타" && !$("customItem").value.trim()) {
      alert("물품 이름을 입력해 주세요.");
      return;
    }
  }
  if (surveyStep < 3) {
    surveyStep++;
    renderSurveyStep();
  }
});

$("surveySave").addEventListener("click", () => {
  if (!selItem) {
    alert("잃어버린 물품을 선택해 주세요.");
    return;
  }
  const custom = $("customItem").value.trim();
  if (selItem === "기타" && !custom) {
    alert("물품 이름을 입력해 주세요.");
    return;
  }
  survey = {
    item: selItem,
    custom,
    places: [...selPlaces],
    activities: Object.keys(selActivities).reduce((acc, k) => {
      acc[k] = [...selActivities[k]];
      return acc;
    }, {}),
    done: true,
  };
  try {
    localStorage.setItem(LS_SURVEY, JSON.stringify(survey));
    localStorage.setItem(LS_ONBOARDING, JSON.stringify(true));
  } catch (error) {
    console.warn("설문을 브라우저 저장소에 저장하지 못했습니다.", error);
  }
  $("surveyModal").classList.add("hidden");
  renderSurveyMeta();
  updateSurveyUI();
  updateSpotScores();
  const p = pendingStart;
  pendingStart = null;
  if (p && p.type === "gps") startGPS();
  else if (p && p.type === "demo") startDemo(p.sc);
});

$("demoBtn").addEventListener("click", () => {
  if (demoTimer) {
    stopDemo();
  } else {
    $("demoModal").classList.remove("hidden");
  }
});

$("demoCancel").addEventListener("click", () => $("demoModal").classList.add("hidden"));
$("demoModal").addEventListener("click", (e) => {
  if (e.target === $("demoModal")) $("demoModal").classList.add("hidden");
});

demoScenarios.forEach((sc) => {
  const btn = document.createElement("button");
  btn.className = "scenario-item";
  btn.innerHTML = `
    <span class="scenario-emoji">${sc.emoji}</span>
    <span><span class="scenario-name">${sc.name}</span><span class="scenario-desc">${sc.desc}</span></span>`;
  btn.addEventListener("click", () => {
    $("demoModal").classList.add("hidden");
    if (!survey) {
      pendingStart = { type: "demo", sc };
      openSurvey();
      return;
    }
    startDemo(sc);
  });
  $("scenarioList").appendChild(btn);
});

$("revealBtn").addEventListener("click", () => {
  revealLost = true;
  $("revealBtn").classList.add("hidden");
  renderRoute();
});

if ($("homeBtn")) $("homeBtn").addEventListener("click", registerHome);

$("reportBtn").addEventListener("click", () => {
  $("reportNotice").classList.add("hidden");
  $("modal").classList.remove("hidden");
  $("reportRange").value = 60;
  $("rangeVal").textContent = "60";
});

$("modalCancel").addEventListener("click", () => $("modal").classList.add("hidden"));
$("modal").addEventListener("click", (e) => {
  if (e.target === $("modal")) $("modal").classList.add("hidden");
});

$("reportRange").addEventListener("input", (e) => {
  $("rangeVal").textContent = e.target.value;
});

$("modalConfirm").addEventListener("click", () => {
  $("modal").classList.add("hidden");
  createReport(Number($("reportRange").value));
});

$("slider").addEventListener("input", (e) => {
  if (playing) {
    clearInterval(playTimer);
    playing = false;
    $("playBtn").textContent = "▶ 경로 재생";
  }
  setCursor(Number(e.target.value), true);
});

$("playBtn").addEventListener("click", playRoute);

$("clearBtn").addEventListener("click", () => {
  if (!confirm("저장된 모든 위치 기록과 신고 기록을 삭제할까요?")) return;
  stopDemo(true);
  stopGPS();
  points = [];
  reports = [];
  activeView = null;
  currentDwells = [];
  spotLayers = [];
  save();
  clearRoute();
  $("routeSummary").classList.add("hidden");
  renderReports();
  updateRecordMeta();
});

drawHome();
updateHomeMeta();
renderSurveyMeta();
renderReports();
updateRecordMeta();
if (points.length > 1) {
  activeView = {
    start: Date.now() - 60 * 60000,
    end: Date.now() + 60000,
    label: "최근 1시간",
    live: true,
  };
  renderRoute();
}
if (!load(LS_ONBOARDING, false)) openSurvey();
