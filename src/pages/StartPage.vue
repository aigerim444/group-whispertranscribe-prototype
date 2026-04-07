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

          <div class="field">
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const projectName = ref('GabiAfterHours')
const fileInputRef = ref(null)
const selectedFiles = ref([])
const isDragOver = ref(false)
const router = useRouter()

const supportedFormatsLine =
  '.3gp, .aac, .amc, .asf, .avi, .flac, .m4a, .m4b, .mkv, .mka, .mov, .mp3, .mp4, .mpeg, .mpga, .oga, .ogg, .opus, .wav, .webm, .wma, and .wmv'

const fileAccept =
  '.3gp,.aac,.amc,.asf,.avi,.flac,.m4a,.m4b,.mkv,.mka,.mov,.mp3,.mp4,.mpeg,.mpga,.oga,.ogg,.opus,.wav,.webm,.wma,.wmv'

const canTranscribe = computed(() => selectedFiles.value.length > 0)

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

function onTranscribe() {
  if (!canTranscribe.value) return
  localStorage.setItem('wt_projectName', projectName.value || 'Untitled project')
  localStorage.setItem('wt_fileName', selectedFiles.value?.[0]?.name || 'Upload')
  router.push('/processing')
}
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
