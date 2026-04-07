<template>
  <q-page class="create-screen">
    <div class="create-shell">
      <div class="brand-row">
        <div class="brand-mark" aria-hidden="true"></div>
        <div class="brand-name">WhisperTranscribe</div>
      </div>

      <div class="create-card">
        <div class="create-title">Create</div>
        <div class="create-sub">
          Your transcript is ready. What do you want to make from it?
        </div>

        <div class="create-grid">
          <button class="create-tile" type="button" @click="goWorkspace('content')">
            <div class="tile-emoji">✍️</div>
            <div class="tile-title">Blog / Summary</div>
            <div class="tile-desc">Draft a summary, quotes, chapters, and reports.</div>
          </button>

          <button class="create-tile" type="button" @click="goWorkspace('visual')">
            <div class="tile-emoji">✂️</div>
            <div class="tile-title">Clip studio</div>
            <div class="tile-desc">Pick the best moments and export clips.</div>
          </button>

          <button class="create-tile" type="button" @click="goWorkspace('transcript')">
            <div class="tile-emoji">📝</div>
            <div class="tile-title">Transcript</div>
            <div class="tile-desc">Read, search, and reference timestamps.</div>
          </button>
        </div>

        <div class="create-actions">
          <q-btn outline no-caps class="btn-back" label="← Back" @click="$router.push('/start')" />
          <q-btn unelevated no-caps color="accent" class="btn-primary" label="Open workspace →" @click="goWorkspace()" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goWorkspace(tab) {
  const view = tab === 'visual' ? 'clips' : tab === 'content' ? 'blog' : 'overview'
  router.push(`/transcript/gabriel?view=${encodeURIComponent(view)}`)
}
</script>

<style scoped>
.create-screen {
  min-height: calc(100vh - 32px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 18px;
}

.create-shell {
  width: 100%;
  max-width: 720px;
}

.brand-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 18px;
}

.brand-mark {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--accent);
}

.brand-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--navy);
}

.create-card {
  background: var(--surface);
  border-radius: 20px;
  border: 1px solid var(--border);
  padding: 28px 32px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.06);
}

.create-title {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 6px;
}

.create-sub {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 18px;
}

.create-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.create-tile {
  text-align: left;
  border: 1.5px solid var(--border);
  border-radius: 14px;
  background: var(--bg);
  padding: 14px 14px 16px;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

.create-tile:hover {
  border-color: var(--accent-mid);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(21, 21, 42, 0.10);
}

.tile-emoji { font-size: 20px; margin-bottom: 8px; }
.tile-title { font-size: 13px; font-weight: 800; margin-bottom: 4px; }
.tile-desc { font-size: 12px; color: var(--muted); line-height: 1.4; }

.create-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
}

.btn-back { border-radius: 10px; }
.btn-primary { border-radius: 10px; font-weight: 700; }

@media (max-width: 900px) {
  .create-grid { grid-template-columns: 1fr; }
}
</style>

