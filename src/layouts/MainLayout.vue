<template>
  <q-layout view="lHh Lpr lFf" class="bg-transparent">
    <q-drawer
      v-model="drawer"
      :width="280"
      :breakpoint="0"
      bordered
      class="app-sidebar"
      :no-swipe-open="true"
      :no-swipe-close="true"
    >
      <div class="column full-height" style="overflow: hidden">
        <div class="sb-top">
          <div class="sb-logo">
            <span class="sb-dot" aria-hidden="true"></span>
            <span>WhisperTranscribe</span>
          </div>
          <button class="sb-new" type="button" @click="$router.push('/start')" title="New project">+</button>
        </div>

        <div class="sb-scroll">
          <div class="sb-section">Projects</div>

          <div class="proj-block" :class="{ open: projOpen }">
            <div class="proj-head" role="button" tabindex="0" @click="projOpen = !projOpen" @keydown.enter.prevent="projOpen = !projOpen">
              <q-icon name="sym_o_mic" size="16px" class="proj-ico" />
              <span class="proj-name">GabiAfterHours</span>
              <span class="proj-chevron">▶</span>
            </div>
            <div class="proj-body">
              <div class="sb-file active" @click="$router.push('/transcript/gabriel?view=overview')">
                <span class="sb-file-icon">🎬</span>
                <div class="sb-file-info">
                  <div class="sb-file-name">Ep47_ContentCreation.mp4</div>
                  <div class="sb-file-meta">18:42 · Transcribed</div>
                </div>
                <span class="sb-file-dot" aria-hidden="true"></span>
              </div>

              <div class="sb-file">
                <span class="sb-file-icon">🎬</span>
                <div class="sb-file-info">
                  <div class="sb-file-name">Ep46_RosaryDeep.mp4</div>
                  <div class="sb-file-meta">22:10 · Transcribed</div>
                </div>
              </div>

              <div class="sb-drop" role="button" tabindex="0">+ Add file</div>
              <div class="sb-divider"></div>

              <div class="sb-tool" :class="{ active: isActive('overview') }" @click="go('overview')">
                <span class="sb-tool-icon">🏠</span><span class="sb-tool-name">Overview</span>
              </div>
              <div class="sb-tool" :class="{ active: isActive('blog') }" @click="go('blog')">
                <span class="sb-tool-icon">✍️</span><span class="sb-tool-name">Blog Generator</span>
              </div>
              <div class="sb-tool" :class="{ active: isActive('clips') }" @click="go('clips')">
                <span class="sb-tool-icon">✂️</span><span class="sb-tool-name">Clip Studio</span>
              </div>
              <div class="sb-tool" :class="{ active: isActive('captions') }" @click="go('captions')">
                <span class="sb-tool-icon">📣</span><span class="sb-tool-name">Social Captions</span>
              </div>
              <div class="sb-tool" :class="{ active: isActive('translate') }" @click="go('translate')">
                <span class="sb-tool-icon">🌐</span><span class="sb-tool-name">Translate</span>
              </div>
            </div>
          </div>

          <div class="proj-block" :class="{ open: false }">
            <div class="proj-head">
              <span class="proj-ico" aria-hidden="true">📚</span>
              <span class="proj-name">Course Launch S1</span>
              <span class="proj-chevron">▶</span>
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const drawer = ref(true)

const route = useRoute()
const router = useRouter()
const projOpen = ref(true)

function isActive(view) {
  return route.query.view === view || (!route.query.view && view === 'overview')
}

function go(view) {
  router.push(`/transcript/gabriel?view=${encodeURIComponent(view)}`)
}
</script>

<style>
.app-sidebar {
  background: var(--sidebar) !important;
  color: white;
}

.sb-top {
  padding: 14px 14px;
  border-bottom: 1px solid var(--sidebar-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sb-logo {
  font-size: 13px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 7px;
}

.sb-dot {
  width: 7px;
  height: 7px;
  background: var(--accent);
  border-radius: 50%;
}

.sb-new {
  width: 26px;
  height: 26px;
  background: rgba(255,255,255,0.07);
  border: 1px solid var(--sidebar-border);
  border-radius: 7px;
  color: rgba(255,255,255,0.65);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.15s;
}

.sb-new:hover {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.sb-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 10px 8px;
}

.sb-section {
  font-size: 10px;
  font-weight: 700;
  color: rgba(255,255,255,0.25);
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 8px 8px 5px;
}

.proj-block {
  margin-bottom: 8px;
  border-radius: 10px;
  overflow: hidden;
}

.proj-block.open {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--sidebar-border);
}

.proj-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 10px;
}

.proj-ico {
  color: rgba(255,255,255,0.55);
}

.proj-name {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.proj-chevron {
  font-size: 10px;
  color: rgba(255,255,255,0.25);
  transform: rotate(90deg);
}

.proj-body {
  padding: 4px 8px 10px;
}

.sb-file {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.12s;
  margin-bottom: 2px;
}

.sb-file:hover {
  background: rgba(255,255,255,0.05);
}

.sb-file.active {
  background: rgba(94,85,244,0.20);
}

.sb-file-icon { font-size: 12px; opacity: 0.8; flex-shrink: 0; }
.sb-file-info { flex: 1; overflow: hidden; }
.sb-file-name {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sb-file-meta { font-size: 10px; color: rgba(255,255,255,0.28); }
.sb-file-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); }

.sb-drop {
  border: 1.5px dashed rgba(255,255,255,0.12);
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  margin: 6px 0 4px;
  transition: all 0.15s;
}
.sb-drop:hover {
  border-color: rgba(94,85,244,0.5);
  color: #BDB6FF;
  background: rgba(94,85,244,0.07);
}

.sb-divider { height: 1px; background: var(--sidebar-border); margin: 4px 0; }

.sb-tool {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.12s;
  margin-bottom: 2px;
}
.sb-tool:hover { background: rgba(255,255,255,0.05); }
.sb-tool.active { background: var(--accent); }
.sb-tool-icon { font-size: 13px; opacity: 0.7; flex-shrink: 0; }
.sb-tool-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.62); }
.sb-tool.active .sb-tool-name { color: white; }
.sb-tool.active .sb-tool-icon { opacity: 1; }
</style>
