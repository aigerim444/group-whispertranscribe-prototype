<template>
  <q-page class="processing-screen">
    <div class="processing-shell">
      <div class="brand-row">
        <div class="brand-mark" aria-hidden="true"></div>
        <div class="brand-name">WhisperTranscribe</div>
      </div>

      <div class="processing-card">
        <div class="processing-animation" aria-hidden="true">
          <div class="pulse-ring"></div>
          <div class="pulse-ring ring-2"></div>
          <div class="pulse-ring ring-3"></div>
          <div class="pulse-center">🎙️</div>
        </div>

        <div class="processing-title">Transcribing your file…</div>
        <div class="processing-sub">
          We’re processing <strong>{{ fileLabel }}</strong>.<br />
          This is a demo — we’ll use sample text from the Gabriel interview.
        </div>

        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="progress-pct">{{ progress }}%</div>

        <div class="progress-steps">
          <div class="p-step" :class="{ done: progress >= 15 }">
            <div class="p-step-icon">{{ progress >= 15 ? '✓' : '1' }}</div>
            <span>File uploaded successfully</span>
          </div>
          <div class="p-step" :class="{ active: progress >= 20 && progress < 70, done: progress >= 70 }">
            <div class="p-step-icon">{{ progress >= 70 ? '✓' : '⟳' }}</div>
            <span>Transcribing audio…</span>
          </div>
          <div class="p-step" :class="{ active: progress >= 70 && progress < 92, done: progress >= 92 }">
            <div class="p-step-icon">{{ progress >= 92 ? '✓' : '3' }}</div>
            <span>Detecting speakers &amp; chapters</span>
          </div>
          <div class="p-step" :class="{ active: progress >= 92 && progress < 100, done: progress >= 100 }">
            <div class="p-step-icon">{{ progress >= 100 ? '✓' : '4' }}</div>
            <span>Ready to create content</span>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const progress = ref(0)
let iv = null

const fileLabel = computed(() => localStorage.getItem('wt_fileName') || 'your upload')

onMounted(() => {
  const startedAt = Date.now()
  iv = window.setInterval(() => {
    const t = Date.now() - startedAt
    // smooth-ish fake progress curve
    const p = Math.min(100, Math.floor((t / 5200) * 100))
    progress.value = p
    if (p >= 100) {
      window.clearInterval(iv)
      iv = null
      window.setTimeout(() => router.push('/create'), 450)
    }
  }, 60)
})

onBeforeUnmount(() => {
  if (iv) window.clearInterval(iv)
})
</script>

<style scoped>
.processing-screen {
  min-height: calc(100vh - 32px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 18px;
}

.processing-shell {
  width: 100%;
  max-width: 560px;
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

.processing-card {
  background: var(--surface);
  border-radius: 20px;
  border: 1px solid var(--border);
  padding: 56px 64px;
  text-align: center;
  box-shadow: 0 4px 32px rgba(0,0,0,0.06);
}

.processing-animation {
  width: 80px;
  height: 80px;
  margin: 0 auto 28px;
  position: relative;
}

.pulse-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid var(--accent);
  animation: pulseRing 1.5s ease-out infinite;
  opacity: 0;
}

.ring-2 { animation-delay: 0.5s; }
.ring-3 { animation-delay: 1s; }

@keyframes pulseRing {
  0% { transform: scale(0.6); opacity: 0.8; }
  100% { transform: scale(1.4); opacity: 0; }
}

.pulse-center {
  position: absolute;
  inset: 16px;
  background: var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #fff;
}

.processing-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
}

.processing-sub {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.progress-bar-wrap {
  background: var(--border);
  border-radius: 20px;
  height: 6px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #8B85FF);
  border-radius: 20px;
  width: 0%;
  transition: width 0.18s ease;
}

.progress-pct {
  font-size: 12px;
  color: var(--muted);
  text-align: right;
  margin-bottom: 18px;
}

.progress-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
  text-align: left;
}

.p-step {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--muted);
}

.p-step.done { color: var(--green); }
.p-step.active { color: var(--text); font-weight: 600; }

.p-step-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  flex-shrink: 0;
}

.p-step.done .p-step-icon { background: var(--green-lt); color: var(--green); }
.p-step.active .p-step-icon { background: var(--accent-lt); }
</style>

