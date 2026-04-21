<template>
  <q-page class="upload-screen">
    <div class="upload-shell">
      <div class="brand-row">
        <div class="brand-mark" aria-hidden="true"></div>
        <div class="brand-name">WhisperTranscribe</div>
      </div>

      <div class="step-nav" aria-label="Steps">
        <div class="step active">
          <div class="step-num">1</div>
          <span>Upload</span>
        </div>
        <div class="step-line" aria-hidden="true"></div>
        <div class="step">
          <div class="step-num">2</div>
          <span>Transcribe</span>
        </div>
        <div class="step-line" aria-hidden="true"></div>
        <div class="step">
          <div class="step-num">3</div>
          <span>Create</span>
        </div>
      </div>

      <div class="upload-card">
        <div class="upload-header">
          <div class="upload-title">Upload your file</div>
          <div class="upload-sub">We’ll transcribe it and unlock your content toolkit.</div>
        </div>

        <div class="upload-body">
          <div class="upload-tabs">
            <button class="upload-tab" :class="{ active: uploadMode === 'upload' }" type="button" @click="uploadMode = 'upload'">📁 Upload file</button>
            <button class="upload-tab" :class="{ active: uploadMode === 'record' }" type="button" @click="uploadMode = 'record'">🎙️ Record now</button>
          </div>

          <div class="field">
            <div class="field-label">Project name</div>
            <q-input
              v-model="projectName"
              outlined
              dense
              class="default-input"
              placeholder="e.g. My podcast, User research…"
            />
          </div>

          <div v-if="uploadMode === 'upload'" class="field">
            <div class="field-label">File</div>

            <input
              ref="fileInputRef"
              type="file"
              class="file-input-hidden"
              multiple
              :accept="fileAccept"
              @change="onFileInputChange"
            />

            <div
              class="drop-zone"
              :class="{ drag: isDragOver, 'has-file': selectedFiles.length > 0 }"
              role="button"
              tabindex="0"
              @click="fileInputRef?.click()"
              @keydown.enter.prevent="fileInputRef?.click()"
              @keydown.space.prevent="fileInputRef?.click()"
              @dragenter.prevent="isDragOver = true"
              @dragover.prevent="isDragOver = true"
              @dragleave.prevent="onDragLeave"
              @drop.prevent="onDrop"
            >
              <div class="dz-icon">{{ selectedFiles.length ? '✅' : '🎬' }}</div>
              <div class="dz-title">
                {{ selectedFiles.length ? `${selectedFiles.length} file${selectedFiles.length === 1 ? '' : 's'} ready` : 'Drop your file here' }}
              </div>
              <div class="dz-sub">
                {{ selectedFiles.length ? 'Click to replace' : 'or click to browse' }}
              </div>
              <div class="dz-types">MP4 · MOV · MP3 · WAV · M4A · up to 2 GB</div>
            </div>

            <div class="file-selected-info" :class="{ show: selectedFiles.length > 0 }">
              <div class="fsi-icon">🎬</div>
              <div class="fsi-details">
                <div class="fsi-name">{{ selectedFiles[0]?.name || 'Selected file' }}</div>
                <div class="fsi-size">{{ selectedFiles.length > 1 ? `${selectedFiles.length} files` : 'Ready to transcribe' }}</div>
              </div>
              <div class="fsi-remove" role="button" tabindex="0" @click="clearFiles" @keydown.enter.prevent="clearFiles">✕</div>
            </div>
          </div>

          <div v-else class="field">
            <div class="field-label">Record</div>
            <div class="record-zone">
              <div class="record-icon" :class="{ pulsing: isRecording }">🎙️</div>
              <div class="record-timer">{{ recordTimeLabel }}</div>
              <div class="record-waveform" :class="{ active: isRecording }">
                <span v-for="n in 18" :key="n" class="rw-bar" :style="{ animationDelay: `${(n % 6) * 0.08}s` }"></span>
              </div>
              <div class="record-sub">
                {{ isRecording ? 'Recording in progress… click Stop when finished.' : recordingReady ? 'Recording saved. You can transcribe now.' : 'Record directly inside WhisperTranscribe.' }}
              </div>
              <button v-if="!isRecording" class="record-btn" type="button" @click="startRecording">
                {{ recordingReady ? 'Record again' : 'Start recording' }}
              </button>
              <button v-else class="record-btn stop" type="button" @click="stopRecording">Stop recording</button>
            </div>
          </div>

          <div class="upload-actions">
            <q-btn outline no-caps class="btn-back" label="← Back" @click="$router.push('/')" />
            <q-btn
              unelevated
              no-caps
              color="accent"
              class="btn-primary"
              :disable="!canTranscribe"
              label="Transcribe ⚡"
              @click="onTranscribe"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const projectName = ref('GabiAfterHours')
const fileInputRef = ref(null)
const selectedFiles = ref([])
const isDragOver = ref(false)
const uploadMode = ref('upload')
const isRecording = ref(false)
const recordSeconds = ref(0)
const recordingReady = ref(false)
const router = useRouter()
let recordInterval = null

const supportedFormatsLine =
  '.3gp, .aac, .amc, .asf, .avi, .flac, .m4a, .m4b, .mkv, .mka, .mov, .mp3, .mp4, .mpeg, .mpga, .oga, .ogg, .opus, .wav, .webm, .wma, and .wmv'

const fileAccept =
  '.3gp,.aac,.amc,.asf,.avi,.flac,.m4a,.m4b,.mkv,.mka,.mov,.mp3,.mp4,.mpeg,.mpga,.oga,.ogg,.opus,.wav,.webm,.wma,.wmv'

const canTranscribe = computed(() => {
  if (uploadMode.value === 'record') return recordingReady.value
  return selectedFiles.value.length > 0
})
const recordTimeLabel = computed(() => {
  const m = Math.floor(recordSeconds.value / 60)
  const s = String(recordSeconds.value % 60).padStart(2, '0')
  return `${m}:${s}`
})

function setFiles(fileList) {
  const files = Array.from(fileList || []).slice(0, 10)
  selectedFiles.value = files
}

function onFileInputChange(e) {
  setFiles(e.target.files)
  e.target.value = ''
}

function onDragLeave(e) {
  const related = e.relatedTarget
  if (related && e.currentTarget.contains(related)) return
  isDragOver.value = false
}

function onDrop(e) {
  isDragOver.value = false
  const dt = e.dataTransfer
  if (!dt?.files?.length) return
  setFiles(dt.files)
}

function clearFiles() {
  selectedFiles.value = []
}

function startRecording() {
  recordingReady.value = false
  recordSeconds.value = 0
  isRecording.value = true
  if (recordInterval) clearInterval(recordInterval)
  recordInterval = setInterval(() => {
    recordSeconds.value += 1
  }, 1000)
}

function stopRecording() {
  isRecording.value = false
  if (recordInterval) {
    clearInterval(recordInterval)
    recordInterval = null
  }
  if (recordSeconds.value > 0) recordingReady.value = true
}

function onTranscribe() {
  if (!canTranscribe.value) return
  localStorage.setItem('wt_projectName', projectName.value || 'Untitled project')
  localStorage.setItem('wt_fileName', uploadMode.value === 'record' ? 'Recorded audio' : (selectedFiles.value?.[0]?.name || 'Upload'))
  router.push('/processing')
}

onBeforeUnmount(() => {
  if (recordInterval) clearInterval(recordInterval)
})
</script>

<style scoped>
.file-input-hidden {
  display: none;
}

.upload-screen {
  min-height: calc(100vh - 32px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 18px;
}

.upload-shell {
  width: 100%;
  max-width: 600px;
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

.step-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 22px;
}

.step {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}

.step-num {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: var(--border);
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.step.active {
  color: var(--text);
}

.step.active .step-num {
  background: var(--accent);
  color: #fff;
}

.step-line {
  width: 40px;
  height: 2px;
  background: var(--border);
  margin: 0 8px;
}

.upload-card {
  background: var(--surface);
  border-radius: 20px;
  border: 1px solid var(--border);
  overflow: hidden;
  box-shadow: 0 4px 32px rgba(0,0,0,0.06);
}

.upload-header {
  padding: 28px 32px 0;
}

.upload-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 6px;
}

.upload-sub {
  font-size: 14px;
  color: var(--muted);
}

.upload-body {
  padding: 24px 32px 32px;
}

.upload-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.upload-tab {
  flex: 1;
  height: 38px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  background: var(--bg);
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.12s;
}

.upload-tab:hover {
  border-color: var(--accent-mid);
  color: var(--text);
}

.upload-tab.active {
  border-color: var(--accent);
  background: var(--accent-lt);
  color: var(--accent);
}

.field {
  margin-bottom: 20px;
}

.field-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.7px;
  margin-bottom: 8px;
}

.drop-zone {
  border: 2px dashed var(--border);
  border-radius: 14px;
  padding: 48px 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--bg);
  user-select: none;
}

.drop-zone:hover,
.drop-zone.drag {
  border-color: var(--accent);
  background: var(--accent-lt);
}

.drop-zone.has-file {
  border-color: var(--green);
  border-style: solid;
  background: var(--green-lt);
}

.record-zone {
  border: 1.5px solid var(--border);
  background: var(--bg);
  border-radius: 14px;
  padding: 24px 18px;
  text-align: center;
}

.record-icon {
  font-size: 34px;
  margin-bottom: 8px;
}

.record-icon.pulsing { animation: recPulse 1s ease-in-out infinite; }
@keyframes recPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }

.record-timer {
  font-size: 30px;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 10px;
}

.record-waveform {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  height: 36px;
  margin-bottom: 10px;
}

.rw-bar {
  width: 4px;
  height: 7px;
  border-radius: 999px;
  background: var(--accent-mid);
  transition: height 0.2s;
}

.record-waveform.active .rw-bar {
  animation: rwJump 0.9s ease-in-out infinite alternate;
}

@keyframes rwJump {
  0% { height: 7px; opacity: 0.5; }
  100% { height: 30px; opacity: 1; }
}

.record-sub {
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 12px;
}

.record-btn {
  height: 36px;
  border: none;
  border-radius: 10px;
  padding: 0 14px;
  background: var(--accent);
  color: white;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
}

.record-btn.stop {
  background: #B91C1C;
}

.dz-icon {
  font-size: 44px;
  margin-bottom: 14px;
}

.dz-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
}

.dz-sub {
  font-size: 13px;
  color: var(--muted);
}

.dz-types {
  font-size: 11px;
  color: var(--muted);
  margin-top: 10px;
}

.file-selected-info {
  display: none;
  align-items: center;
  gap: 14px;
  background: #fff;
  border: 1.5px solid var(--green);
  border-radius: 12px;
  padding: 14px 18px;
  margin-top: 16px;
}

.file-selected-info.show {
  display: flex;
}

.fsi-icon {
  font-size: 28px;
}

.fsi-details {
  flex: 1;
}

.fsi-name {
  font-size: 14px;
  font-weight: 600;
}

.fsi-size {
  font-size: 12px;
  color: var(--muted);
}

.fsi-remove {
  font-size: 18px;
  color: var(--muted);
  cursor: pointer;
  padding: 4px;
}

.fsi-remove:hover {
  color: #EF4444;
}

.upload-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
}

.btn-back {
  border-radius: 10px;
}

.btn-primary {
  border-radius: 10px;
  font-weight: 700;
}
</style>
