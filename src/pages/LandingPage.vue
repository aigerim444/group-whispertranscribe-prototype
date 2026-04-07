<template>
  <q-page class="landing">
    <div class="bg-orb" aria-hidden="true"></div>

    <div class="landing-shell">
      <div class="topline">
        <div class="mark" aria-hidden="true"></div>
        <div class="brand">WhisperTranscribe</div>
      </div>

      <div class="hero">
        <div class="badge">Prototype workspace</div>
        <h1>
          Turn recordings into
          <span class="em">content that ships</span>.
        </h1>
        <p>
          Upload audio/video, get a transcript, then generate clips, social captions, and translations — all in one workspace.
        </p>

        <div class="actions">
          <button class="cta" type="button" @click="go">
            Get started →
          </button>
          <button class="ghost" type="button" @click="goExample">
            Open demo workspace
          </button>
        </div>

        <div class="proof">
          <div class="stat"><strong>40+</strong><span>languages</span></div>
          <div class="divider" aria-hidden="true"></div>
          <div class="stat"><strong>5</strong><span>tools</span></div>
          <div class="divider" aria-hidden="true"></div>
          <div class="stat"><strong>1</strong><span>flow</span></div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function go() {
  localStorage.setItem('onboardingCompleted', 'true')
  router.push('/start')
}

function goExample() {
  localStorage.setItem('onboardingCompleted', 'true')
  router.push('/transcript/gabriel?view=overview')
}
</script>

<style scoped>
.landing {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 18px;
  background:
    radial-gradient(1200px 700px at 20% -10%, rgba(94, 85, 244, 0.22), transparent 60%),
    radial-gradient(900px 600px at 95% 10%, rgba(22, 163, 74, 0.20), transparent 55%),
    linear-gradient(180deg, #0B1020 0%, #050814 60%, #020312 100%);
  color: rgba(245, 245, 255, 0.94);
  overflow: hidden;
}

.bg-orb {
  position: absolute;
  width: 760px;
  height: 760px;
  border-radius: 999px;
  filter: blur(40px);
  opacity: 0.22;
  background: radial-gradient(circle, rgba(94, 85, 244, 0.75) 0%, transparent 60%);
  top: -260px;
  right: -260px;
  pointer-events: none;
}

.landing-shell {
  width: 100%;
  max-width: 920px;
  position: relative;
}

.topline {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}
.mark {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(94, 85, 244, 0.95);
  box-shadow: 0 0 0 6px rgba(94, 85, 244, 0.14);
}
.brand {
  font-weight: 800;
  letter-spacing: 0.2px;
  color: rgba(245, 245, 255, 0.88);
}

.hero {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(10, 13, 26, 0.58);
  border-radius: 22px;
  padding: 42px 38px;
  box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: rgba(204, 202, 255, 0.92);
  background: rgba(94, 85, 244, 0.14);
  border: 1px solid rgba(94, 85, 244, 0.22);
  margin-bottom: 14px;
}

h1 {
  font-size: 44px;
  line-height: 1.05;
  margin: 0 0 14px;
  letter-spacing: -0.6px;
  color: rgba(248, 248, 255, 0.96);
}
.em {
  display: inline-block;
  color: rgba(230, 229, 255, 0.98);
}

p {
  margin: 0 0 26px;
  max-width: 62ch;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(204, 208, 232, 0.88);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 26px;
}

.cta {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(120, 112, 255, 0.35);
  background: rgba(94, 85, 244, 0.95);
  color: white;
  font-weight: 900;
  cursor: pointer;
  transition: transform 0.12s, box-shadow 0.12s, background 0.12s;
  font-family: 'DM Sans', sans-serif;
}
.cta:hover {
  transform: translateY(-1px);
  background: #4D45E3;
  box-shadow: 0 12px 30px rgba(94, 85, 244, 0.30);
}

.ghost {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(238, 238, 255, 0.88);
  font-weight: 900;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;
  font-family: 'DM Sans', sans-serif;
}
.ghost:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.18);
}

.proof {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.stat {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
}
.stat strong {
  font-size: 16px;
  font-weight: 900;
  color: rgba(250, 250, 255, 0.95);
}
.stat span {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: rgba(172, 178, 212, 0.85);
}
.divider {
  width: 1px;
  height: 18px;
  background: rgba(255, 255, 255, 0.10);
}

@media (max-width: 640px) {
  .hero { padding: 34px 22px; }
  h1 { font-size: 34px; }
}
</style>

