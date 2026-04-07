<template>
  <q-page class="workspace">
    <!-- Context strip -->
    <div class="ctx-strip">
      <div class="ctx-crumb">
        <span>🎙️</span>
        <span>GabiAfterHours</span>
      </div>
      <span class="ctx-sep">›</span>
      <span class="ctx-page">{{ viewLabel }}</span>

      <div class="ctx-spacer"></div>

      <template v-if="view !== 'overview'">
        <div class="file-pill" @click="ddOpen = !ddOpen">
          <span style="font-size: 14px">🎬</span>
          <div>
            <div class="fp-label">Working with</div>
            <div class="fp-name">Ep47_ContentCreation.mp4</div>
          </div>
          <span class="fp-chevron">⌄</span>

          <div class="file-dropdown" :class="{ open: ddOpen }" @click.stop>
            <div class="fd-header">Switch file</div>
            <div class="fd-item current" @click="notify('🔄 Switched to Ep47_ContentCreation.mp4')">
              <div class="fd-icon">🎬</div>
              <div class="fd-info">
                <div class="fd-name">Ep47_ContentCreation.mp4</div>
                <div class="fd-meta">Transcribed · 18:42</div>
              </div>
              <span class="fd-check">✓</span>
            </div>
            <div class="fd-item" @click="notify('🔄 Switched to Ep46_RosaryDeep.mp4')">
              <div class="fd-icon">🎬</div>
              <div class="fd-info">
                <div class="fd-name">Ep46_RosaryDeep.mp4</div>
                <div class="fd-meta">Transcribed · 22:10</div>
              </div>
            </div>
            <div class="fd-add" @click="notify('📂 Upload new file')">+ Upload new file</div>
          </div>
        </div>

        <div class="ctx-actions">
          <button class="btn-sm-ghost" type="button" @click="notify('📋 Copied!')">Copy</button>
          <button class="btn-sm-accent" type="button" @click="notify('✅ Exported!')">Export →</button>
        </div>
      </template>
    </div>

    <!-- Views -->
    <div class="view-wrap">
      <!-- Overview -->
      <div v-if="view === 'overview'" class="view-home-body">
        <div class="home-header">
          <div class="home-title">🎙️ GabiAfterHours</div>
          <div class="home-meta">2 files · both transcribed · Last updated today</div>
        </div>

        <div class="home-drop">
          <div class="hd-icon">🎬</div>
          <div class="hd-title">Drop a new file into this project</div>
          <div class="hd-sub">or click to browse · MP4, MOV, MP3, WAV</div>
        </div>

        <div class="section-title">Files</div>
        <div class="files-row">
          <div class="file-card sel">
            <div class="fc-em">🎬</div>
            <div class="fc-name">Ep47_ContentCreation.mp4</div>
            <div class="fc-meta">18:42 · Uploaded today</div>
            <div class="fc-badge done">✓ Transcribed</div>
          </div>
          <div class="file-card">
            <div class="fc-em">🎬</div>
            <div class="fc-name">Ep46_RosaryDeep.mp4</div>
            <div class="fc-meta">22:10 · Uploaded 3 days ago</div>
            <div class="fc-badge done">✓ Transcribed</div>
          </div>
        </div>

        <div class="section-title">
          What do you want to make from <span style="color: var(--accent)">Ep47_ContentCreation.mp4</span>?
        </div>
        <div class="tools-row">
          <div class="tool-card" @click="setView('blog')">
            <div class="tc-em">✍️</div>
            <div class="tc-title">Blog Post</div>
            <div class="tc-desc">Turn your transcript into a polished article or newsletter draft.</div>
          </div>
          <div class="tool-card" @click="setView('clips')">
            <div class="tc-em">✂️</div>
            <div class="tc-title">Clip Studio</div>
            <div class="tc-desc">AI finds the best moments. You style and export.</div>
          </div>
          <div class="tool-card" @click="setView('captions')">
            <div class="tc-em">📣</div>
            <div class="tc-title">Social Captions</div>
            <div class="tc-desc">Platform-ready captions for Reels, TikTok, LinkedIn.</div>
          </div>
          <div class="tool-card" @click="setView('translate')">
            <div class="tc-em">🌐</div>
            <div class="tc-title">Translate</div>
            <div class="tc-desc">Subtitles in 40+ languages.</div>
          </div>
        </div>
      </div>

      <!-- Blog Generator -->
      <div v-else-if="view === 'blog'" class="view-blog">
        <div class="blog-transcript" :class="{ collapsed: !transcriptOpen }">
          <div class="bt-header">
            <span class="bt-title">Transcript <span class="bt-ok">✓ 18:42</span></span>
            <button class="bt-close" type="button" @click="transcriptOpen = false" title="Hide transcript">✕</button>
          </div>
          <div class="bt-scroll">
            <div v-for="(p, idx) in transcriptChunks" :key="idx" class="bt-chunk">
              <div class="bt-time">{{ p.t }}</div>
              <div class="bt-text">
                <span v-if="p.hl" :class="p.hl">{{ p.a }}</span><span v-else>{{ p.a }}</span>
                <span v-if="p.b"> {{ p.b }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="blog-output">
          <div class="blog-settings-bar">
            <button
              class="transcript-toggle"
              :class="{ active: transcriptOpen }"
              type="button"
              @click="transcriptOpen = !transcriptOpen"
            >
              {{ transcriptOpen ? '📄 Hide transcript' : '📄 Show transcript' }}
            </button>

            <div class="bar-divider"></div>

            <div class="bar-group">
              <span class="bar-label">Tone</span>
              <div class="pill-select">
                <button class="pill" :class="{ on: tone === 'Educational' }" type="button" @click="tone = 'Educational'">Educational</button>
                <button class="pill" :class="{ on: tone === 'Conversational' }" type="button" @click="tone = 'Conversational'">Conversational</button>
                <button class="pill" :class="{ on: tone === 'Journalistic' }" type="button" @click="tone = 'Journalistic'">Journalistic</button>
              </div>
            </div>

            <div class="bar-divider"></div>

            <div class="bar-group">
              <span class="bar-label">Format</span>
              <div class="pill-select">
                <button class="pill" :class="{ on: format === 'Article' }" type="button" @click="format = 'Article'">Article</button>
                <button class="pill" :class="{ on: format === 'Listicle' }" type="button" @click="format = 'Listicle'">Listicle</button>
                <button class="pill" :class="{ on: format === 'Newsletter' }" type="button" @click="format = 'Newsletter'">Newsletter</button>
              </div>
            </div>

            <button class="more-options-btn" type="button">⚙️ Options</button>
            <div class="more-options-btn" @click="optionsOpen = !optionsOpen">
              ⚙️ Options
              <div class="options-popover" :class="{ open: optionsOpen }" @click.stop>
                <div class="op-title">Options</div>
                <div class="op-row"><span class="op-label">Intro hook</span><div class="tgl" :class="{ on: optIntro }" @click="optIntro = !optIntro"></div></div>
                <div class="op-row"><span class="op-label">Include quotes</span><div class="tgl" :class="{ on: optQuotes }" @click="optQuotes = !optQuotes"></div></div>
                <div class="op-row"><span class="op-label">SEO optimize</span><div class="tgl" :class="{ on: optSeo }" @click="optSeo = !optSeo"></div></div>
                <div class="op-row"><span class="op-label">Add CTA</span><div class="tgl" :class="{ on: optCta }" @click="optCta = !optCta"></div></div>
              </div>
            </div>

            <button class="regen-btn" type="button" @click="regen">⚡ Regenerate</button>
          </div>

          <div class="blog-loading" :class="{ show: blogLoading }">
            <div class="bl-spinner"></div>
            <div class="bl-title">Generating your blog post…</div>
            <div class="bl-sub">Analyzing transcript</div>
          </div>

          <div class="blog-doc-scroll">
            <div class="blog-doc">
              <div class="b-tags">
                <span class="b-tag">Content Creation</span>
                <span class="b-tag">YouTube</span>
                <span class="b-tag">Education</span>
              </div>
              <div class="b-h1">Why Most Creators Fail — And What the Ones Who Don't Have in Common</div>
              <div class="b-byline">
                <span>📅 Generated from Ep47</span>
                <span>⏱️ 5 min read</span>
                <span style="color: var(--green); font-weight: 700">✓ SEO optimized</span>
              </div>
              <p class="b-p">
                The internet is noisy. Most content disappears within 48 hours — and the vast majority of creators who try never build an audience that lasts.
                But there is a clear pattern among those who do. <span class="src">0:00</span>
              </p>
              <p class="b-p">
                Gabriel Castillo, a Catholic content creator with 350K subscribers and 15 years of experience, has a deceptively simple explanation:
                people watch content to be educated or to be entertained. The creators who succeed provide genuine value in at least one of those dimensions.
              </p>
              <div class="b-callout">
                “The videos that do well are ones I put a lot of effort into — and the effort is subconsciously noticed.” <span class="src">3:15</span>
              </div>
              <div class="b-h2">Long-Form and Short-Form Are Completely Different Games</div>
              <p class="b-p">
                One of the most common mistakes Gabriel sees: treating long-form and short-form as interchangeable. They're not.
                Short-form demands a different creative logic — fast, catchy, constantly moving. <span class="src">5:42</span>
              </p>
            </div>
          </div>

          <div class="blog-foot">
            <span>~480 words · 4 sources · 2 quotes</span>
            <div class="bf-btns">
              <button class="btn-sm-ghost" type="button" @click="notify('📋 Markdown copied!')">Copy MD</button>
              <button class="btn-sm-accent" type="button" @click="notify('✅ Exported as .docx!')">Export .docx</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Clip Studio -->
      <div v-else-if="view === 'clips'" class="view-clips">
        <div class="clips-list">
          <div class="clips-list-header">
            <span class="cl-title">AI Clips</span>
            <span class="cl-count">3 found</span>
          </div>
          <div class="clips-scroll">
            <div class="clips-help">AI picked the highest-impact moments from your transcript.</div>

            <div v-for="c in clips" :key="c.id" class="clip-card" :class="{ active: clipId === c.id }" @click="clipId = c.id">
              <div class="cc-top">
                <span class="cc-num">{{ c.label }}</span>
                <span class="cc-score" :class="c.scoreClass">{{ c.score }}</span>
              </div>
              <div class="cc-quote">“{{ c.quote }}”</div>
              <div class="cc-meta"><span>⏱ {{ c.range }}</span></div>
              <div class="cc-why">✦ {{ c.why }}</div>
            </div>
          </div>
        </div>

        <div class="clips-center">
          <div class="clips-preview">
            <div class="phone-wrap">
              <div class="phone-label">Preview</div>
              <div class="phone-frame">
                <div class="phone-bg"></div>
                <div class="phone-avatar">👨‍💼</div>
                <div class="phone-top-tag">yt: GabiAfterHours ↑</div>
                <div class="phone-caption-wrap">
                  <div class="phone-caption-text">
                    {{ activeClipPreview }}
                  </div>
                </div>
                <div class="phone-progress-bar"><div class="phone-progress-fill" :style="{ width: '38%' }"></div></div>
              </div>
              <div class="aspect-pills">
                <button class="aspect-pill" :class="{ on: aspect === '9:16' }" type="button" @click="aspect = '9:16'">9:16</button>
                <button class="aspect-pill" :class="{ on: aspect === '1:1' }" type="button" @click="aspect = '1:1'">1:1</button>
                <button class="aspect-pill" :class="{ on: aspect === '16:9' }" type="button" @click="aspect = '16:9'">16:9</button>
              </div>
            </div>
          </div>

          <div class="clips-timeline">
            <div class="tl-header">
              <span class="tl-label">Timeline</span>
              <div class="tl-controls">
                <div class="tl-btn">⏮</div>
                <div class="tl-btn tl-play">▶</div>
                <div class="tl-btn">⏭</div>
                <div class="tl-divider" aria-hidden="true"></div>
                <div class="tl-btn">✂</div>
              </div>
            </div>
            <div class="tl-track">
              <div class="tl-waveform">
                <div v-for="n in 60" :key="n" class="tl-bar" :class="{ active: n > 12 && n < 38 }" :style="{ height: `${25 + (n * 7) % 55}%` }"></div>
              </div>
              <div class="tl-selection">
                <div class="tl-handle l"></div><div class="tl-handle r"></div>
              </div>
              <div class="tl-playhead"></div>
            </div>
            <div class="tl-timestamps"><span>0:00</span><span>0:15</span><span>0:30</span><span>0:45</span><span>0:53</span></div>
            <div class="tl-selected">Selected: 3:15 → 4:08 · Duration: 0:53</div>
          </div>
        </div>

        <div class="clips-panel">
          <div class="cp-section">
            <div class="cp-label">Caption text</div>
            <textarea class="cp-caption-input" :value="activeClipQuote" readonly></textarea>
            <div class="cp-hint">Edit caption text directly</div>
          </div>

          <div class="cp-section">
            <div class="cp-label">Caption style</div>
            <div class="style-grid">
              <div class="style-swatch" :class="{ on: style === 'Classic' }" @click="style = 'Classic'">
                <div class="style-preview-mini" style="background:#000;color:white;">Bold</div>Classic
              </div>
              <div class="style-swatch" :class="{ on: style === 'Luxury' }" @click="style = 'Luxury'">
                <div class="style-preview-mini" style="background:linear-gradient(135deg,#1A0050,#4A0080);color:#FFD700;">Gold</div>Luxury
              </div>
              <div class="style-swatch" :class="{ on: style === 'Minimal' }" @click="style = 'Minimal'">
                <div class="style-preview-mini" style="background:#F5F5F0;color:#111;font-style:italic;">Soft</div>Minimal
              </div>
              <div class="style-swatch" :class="{ on: style === 'Tech' }" @click="style = 'Tech'">
                <div class="style-preview-mini" style="background:#002244;color:#4AF;font-family:monospace;">Mono</div>Tech
              </div>
            </div>
          </div>

          <div class="cp-section">
            <div class="cp-label">Options</div>
            <div class="cp-toggle-row"><span class="cp-toggle-label">Remove filler words</span><div class="tgl on"></div></div>
            <div class="cp-toggle-row"><span class="cp-toggle-label">Add hook text</span><div class="tgl on"></div></div>
            <div class="cp-toggle-row"><span class="cp-toggle-label">Highlight keywords</span><div class="tgl on"></div></div>
          </div>

          <div class="cp-section">
            <div class="cp-label">Export to</div>
            <div class="export-platform on">
              <span class="ep-icon">📱</span>
              <div><div class="ep-name">TikTok / Reels</div><div class="ep-spec">9:16 · 1080×1920</div></div>
              <span class="ep-check">✓</span>
            </div>
            <div class="export-platform">
              <span class="ep-icon">▶️</span>
              <div><div class="ep-name">YouTube Shorts</div><div class="ep-spec">9:16 · Max 60s</div></div>
            </div>
            <div class="export-platform">
              <span class="ep-icon">💼</span>
              <div><div class="ep-name">LinkedIn</div><div class="ep-spec">1:1 · Square</div></div>
            </div>
            <button class="export-big-btn" type="button">↑ Export Clip</button>
          </div>
        </div>
      </div>

      <!-- Translate -->
      <div v-else-if="view === 'translate'" class="view-translate">
        <!-- LEFT: Language picker -->
        <div class="translate-sidebar">
          <div class="trs-header">
            <div class="trs-title">Pick a language</div>
            <input class="trs-search" type="text" placeholder="Search languages…" v-model="trQuery" />
          </div>

          <div class="lang-scroll">
            <template v-for="group in trLangGroups" :key="group.region">
              <div v-if="!trQuery" class="lang-region">{{ group.region }}</div>
              <button
                v-for="l in group.items"
                :key="l.code"
                class="lang-btn"
                :class="{ active: trLang === l.code }"
                type="button"
                @click="selectTrLang(l.code)"
              >
                <span class="lang-flag">{{ l.flag }}</span>
                <div class="lang-info">
                  <div class="lang-name">{{ l.name }}</div>
                  <div class="lang-native">{{ l.native }}</div>
                </div>
                <span class="lang-check">✓</span>
              </button>
            </template>
          </div>

          <button class="translate-all-btn" type="button" @click="startTranslation">
            🌐 Translate now
          </button>
        </div>

        <!-- CENTER: Side-by-side view -->
        <div class="translate-main">
          <div class="translate-topbar">
            <div class="ttr-lang">
              <span class="ttr-flag">{{ activeTrLang.flag }}</span>
              <span>{{ activeTrLang.name }}</span>
            </div>
            <div class="ttr-spacer"></div>
            <div class="ttr-status" :class="{ translating: trState === 'translating' }">
              <span v-if="trState === 'ready'">✓ Translation ready</span>
              <span v-else-if="trState === 'translating'">⏳ Translating…</span>
              <span v-else>⏳ Not yet translated</span>
            </div>
          </div>

          <div class="translate-loading-bar" :class="{ show: trState === 'translating' }">
            <div class="tlb-fill" :style="{ width: `${trProgress}%` }"></div>
          </div>

          <div class="translate-body">
            <!-- Original -->
            <div class="trans-col">
              <div class="trans-col-header">
                <span class="tc-label">🇺🇸 Original (English)</span>
                <button class="tc-copy-btn" type="button" @click="copyOriginal">Copy</button>
              </div>
              <div class="trans-scroll">
                <div v-for="(s, i) in trSegs" :key="`o-${i}`" class="trans-segment">
                  <span class="trans-time">{{ s.t }}</span>
                  <div
                    class="trans-text"
                    contenteditable="true"
                    spellcheck="false"
                    @input="onOrigEdit(i, $event)"
                  >{{ trOrigText[i] }}</div>
                </div>
              </div>
            </div>

            <!-- Translated -->
            <div class="trans-col">
              <div class="trans-col-header">
                <span class="tc-label">{{ activeTrLang.flag }} {{ activeTrLang.name }}</span>
                <button class="tc-copy-btn" type="button" @click="copyTranslation">Copy {{ trFormat.toUpperCase() }}</button>
              </div>
              <div class="trans-scroll">
                <div v-for="(s, i) in trSegs" :key="`t-${i}`" class="trans-segment">
                  <span class="trans-time">{{ s.t }}</span>
                  <div
                    class="trans-text"
                    :class="{ 'translating-anim': trState === 'translating' && trTransText[i] === '…' }"
                    contenteditable="true"
                    spellcheck="false"
                    @input="onTransEdit(i, $event)"
                  >{{ trTransText[i] }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Export panel -->
        <div class="translate-panel">
          <div class="trp-section">
            <div class="trp-label">Done so far</div>
            <div class="done-langs">
              <div v-for="c in trCompleted" :key="c" class="done-lang-pill">
                {{ trLangByCode[c]?.flag }} {{ trLangByCode[c]?.name }}
              </div>
            </div>
          </div>

          <div class="trp-section">
            <div class="trp-label">Export format</div>
            <div class="export-format-btn" :class="{ on: trFormat === 'srt' }" role="button" tabindex="0" @click="trFormat = 'srt'">
              <span class="efb-icon">📄</span>
              <div class="efb-info"><div class="efb-name">SRT subtitles</div><div class="efb-desc">Works with YouTube &amp; Premiere</div></div>
              <span class="efb-check" v-if="trFormat === 'srt'">✓</span>
            </div>
            <div class="export-format-btn" :class="{ on: trFormat === 'txt' }" role="button" tabindex="0" @click="trFormat = 'txt'">
              <span class="efb-icon">📝</span>
              <div class="efb-info"><div class="efb-name">Plain text</div><div class="efb-desc">Clean transcript only</div></div>
              <span class="efb-check" v-if="trFormat === 'txt'">✓</span>
            </div>
            <div class="export-format-btn" :class="{ on: trFormat === 'vtt' }" role="button" tabindex="0" @click="trFormat = 'vtt'">
              <span class="efb-icon">🎬</span>
              <div class="efb-info"><div class="efb-name">VTT (WebVTT)</div><div class="efb-desc">For web video players</div></div>
              <span class="efb-check" v-if="trFormat === 'vtt'">✓</span>
            </div>
          </div>

          <div class="trp-section">
            <div class="trp-label">Options</div>
            <div class="trp-toggle-row"><span class="trp-toggle-label">Preserve timestamps</span><div class="tgl" :class="{ on: trPreserve }" @click="trPreserve=!trPreserve"></div></div>
            <div class="trp-toggle-row"><span class="trp-toggle-label">Auto-upload to YouTube</span><div class="tgl" :class="{ on: trAutoupload }" @click="trAutoupload=!trAutoupload"></div></div>
            <div class="trp-toggle-row"><span class="trp-toggle-label">Include speaker labels</span><div class="tgl" :class="{ on: trSpeakers }" @click="trSpeakers=!trSpeakers"></div></div>
          </div>

          <div class="trp-section">
            <button class="export-translate-btn" type="button" @click="downloadTranslation">↓ Download {{ trFormat.toUpperCase() }}</button>
          </div>
        </div>
      </div>

      <!-- Social Captions -->
      <div v-else class="view-captions">
        <div class="captions-sidebar">
          <div class="cs-header"><div class="cs-title">Platforms</div></div>
          <div class="platform-list">
            <div
              v-for="p in captionPlatforms"
              :key="p.key"
              class="platform-btn"
              :class="{ active: capPlatform === p.key }"
              @click="capPlatform = p.key"
            >
              <span class="pb-icon" :class="`pb-${p.key}`" v-html="p.iconSvg" aria-hidden="true"></span>
              <div>
                <div class="pb-name">{{ p.name }}</div>
                <div class="pb-limit">{{ p.limitLabel }}</div>
              </div>
            </div>
          </div>
          <button class="gen-all-btn" type="button" @click="notify('⚡ Generating captions for all platforms…')">
            ⚡ Generate all
          </button>
        </div>

        <div class="captions-main">
          <div class="captions-topbar">
            <div class="captions-platform-label">
              <span class="pb-icon pb-top" :class="`pb-${activeCapPlatform.key}`" v-html="activeCapPlatform.iconSvg" aria-hidden="true"></span>
              <span>{{ activeCapPlatform.name }}</span>
            </div>
            <span style="font-size:12px;color:var(--muted);">{{ capVariants.length }} variants generated</span>
            <div class="ctb-spacer"></div>
            <button class="regen-captions-btn" type="button" @click="regenCaptions">⚡ Regenerate</button>
          </div>

          <div class="captions-scroll">
            <div v-for="(v, idx) in capVariants" :key="v.type" class="caption-variant">
              <div class="cv-header">
                <div class="cv-label">
                  Variant {{ idx + 1 }}
                  <span class="cv-tag" :class="v.type">{{ v.typeLabel }}</span>
                </div>
                <div class="cv-actions">
                  <button class="cv-btn copy" type="button" @click="copyCaption(idx)">Copy</button>
                  <button class="cv-btn" type="button" @click="notify('🔄 Regenerating variant…')">↺</button>
                </div>
              </div>
              <textarea v-model="capText[idx]" class="cv-textarea" spellcheck="false"></textarea>
              <div class="cv-footer">
                <span class="cv-charcount" :class="{ over: capText[idx].length > capLimit }">
                  {{ capText[idx].length }} / {{ capLimit }}
                </span>
                <span class="cv-hashtags" v-if="capHashtags">Hashtags included</span>
              </div>
            </div>
          </div>
        </div>

        <div class="captions-panel">
          <div class="cap-section">
            <div class="cap-label">Tone</div>
            <button class="cap-opt" :class="{ on: capTone === 'Educational' }" @click="capTone='Educational'">💡 Educational</button>
            <button class="cap-opt" :class="{ on: capTone === 'Bold' }" @click="capTone='Bold'">🔥 Bold &amp; direct</button>
            <button class="cap-opt" :class="{ on: capTone === 'Conversational' }" @click="capTone='Conversational'">💬 Conversational</button>
            <button class="cap-opt" :class="{ on: capTone === 'Inspirational' }" @click="capTone='Inspirational'">✨ Inspirational</button>
          </div>

          <div class="cap-section">
            <div class="cap-label">Options</div>
            <div class="cap-toggle-row"><span class="cap-toggle-label">Include hashtags</span><div class="tgl" :class="{ on: capHashtags }" @click="capHashtags=!capHashtags"></div></div>
            <div class="cap-toggle-row"><span class="cap-toggle-label">Add emoji</span><div class="tgl" :class="{ on: capEmoji }" @click="capEmoji=!capEmoji"></div></div>
            <div class="cap-toggle-row"><span class="cap-toggle-label">Include CTA</span><div class="tgl" :class="{ on: capCta }" @click="capCta=!capCta"></div></div>
            <div class="cap-toggle-row"><span class="cap-toggle-label">Quote from video</span><div class="tgl" :class="{ on: capQuote }" @click="capQuote=!capQuote"></div></div>
          </div>

          <div class="cap-section">
            <div class="cap-label">Variants</div>
            <div class="cap-variants-row">
              <button class="cap-variant-btn">2</button>
              <button class="cap-variant-btn on">3</button>
              <button class="cap-variant-btn">5</button>
            </div>
          </div>

          <div class="cap-section">
            <div class="cap-label">Copy all</div>
            <button class="cap-copyall" type="button" @click="copyAllCaptions">Copy all variants</button>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import * as example from '../data/transcript'
import * as gabriel from '../data/gabrielMock'

const route = useRoute()
const $q = useQuasar()
const ddOpen = ref(false)
let ddListener = null

const dataset = computed(() => {
  return route.params.id === 'gabriel' ? gabriel : example
})

const record = computed(() => dataset.value.record)

const view = ref('overview')
const transcriptOpen = ref(false)
const tone = ref('Educational')
const format = ref('Article')
const optionsOpen = ref(false)
const blogLoading = ref(false)
const optIntro = ref(true)
const optQuotes = ref(true)
const optSeo = ref(true)
const optCta = ref(false)

const aspect = ref('9:16')
const style = ref('Classic')

const viewLabel = computed(() => {
  if (view.value === 'overview') return 'Overview'
  if (view.value === 'blog') return 'Blog Generator'
  if (view.value === 'clips') return 'Clip Studio'
  if (view.value === 'translate') return 'Translate'
  return 'Social Captions'
})

watchEffect(() => {
  const v = String(route.query.view || 'overview')
  if (v === 'overview' || v === 'blog' || v === 'clips' || v === 'captions' || v === 'translate') view.value = v
})

function setView(v) {
  view.value = v
  const url = new URL(window.location.href)
  url.searchParams.set('view', v)
  window.history.replaceState({}, '', url.toString())
}

// --- Social Captions (from WhisperTranscribe_v3 prototype) ---
const captionPlatforms = [
  {
    key: 'instagram',
    name: 'Instagram',
    limit: 2200,
    limitLabel: '2,200 chars',
    iconSvg:
      `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fill="currentColor" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4Zm-4.5 3.6a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 2a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8ZM17.8 6.9a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z"/>
      </svg>`,
  },
  {
    key: 'tiktok',
    name: 'TikTok',
    limit: 300,
    limitLabel: '300 chars',
    iconSvg:
      `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fill="currentColor" d="M14.6 3c.3 2.7 2.1 4.8 4.8 5.1v3.1c-1.9.1-3.6-.5-4.9-1.6v7.2c0 3.4-2.8 6.2-6.2 6.2A6.2 6.2 0 0 1 2 16.8c0-3.4 2.8-6.2 6.2-6.2.4 0 .8 0 1.2.1v3.4c-.4-.1-.8-.2-1.2-.2a2.9 2.9 0 1 0 2.9 2.9V3h3.5Z"/>
      </svg>`,
  },
  {
    key: 'linkedin',
    name: 'LinkedIn',
    limit: 3000,
    limitLabel: '3,000 chars',
    iconSvg:
      `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fill="currentColor" d="M20.5 3A.5.5 0 0 1 21 3.5v17a.5.5 0 0 1-.5.5h-17A.5.5 0 0 1 3 20.5v-17A.5.5 0 0 1 3.5 3h17ZM8.1 9H5.6v10h2.5V9ZM6.85 5.2A1.45 1.45 0 1 0 6.9 8.1a1.45 1.45 0 0 0-.05-2.9ZM19 12.9c0-2.4-1.3-4-3.5-4-1.1 0-2 .6-2.5 1.3V9H10.5v10H13v-5.2c0-1.4.5-2.4 1.8-2.4 1.2 0 1.7.9 1.7 2.4V19H19v-6.1Z"/>
      </svg>`,
  },
  {
    key: 'twitter',
    name: 'Twitter / X',
    limit: 280,
    limitLabel: '280 chars',
    iconSvg:
      `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fill="currentColor" d="M18.7 3h2.9l-6.3 7.2 7.4 10.8h-5.9l-4.6-6.6L6 21H3l6.8-7.8L2.7 3h6.1l4.1 5.9L18.7 3Zm-1 16.3h1.6L7.4 4.6H5.7l12 14.7Z"/>
      </svg>`,
  },
  {
    key: 'youtube',
    name: 'YouTube desc.',
    limit: 5000,
    limitLabel: '5,000 chars',
    iconSvg:
      `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fill="currentColor" d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12c0 1.6.1 3.2.4 4.8a3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8ZM10.2 15.1V8.9L15.6 12l-5.4 3.1Z"/>
      </svg>`,
  },
]

const capPlatform = ref('instagram')
const capTone = ref('Educational')
const capHashtags = ref(true)
const capEmoji = ref(true)
const capCta = ref(true)
const capQuote = ref(true)

const capBase = {
  instagram: [
    { type: 'hook', text: `Most creators quit before they ever get traction.\n\nHere’s the hard truth from Gabriel: consistency beats talent, every single time.`, cta: `What’s your why for creating content? Drop it below`, quote: `"Anybody who continues to post at a matching quality for their niche will absolutely grow. 100%."`, emoji: ['📸','🎯','👇'], hashtags: '#contentcreator #youtube #growyourchannel' },
    { type: 'story', text: `Started in 2009. Broke through in 2019.\n\nThat’s 10 years of posting before things clicked.\n\nHe only makes content he wishes existed.`, cta: `What would you create if you stopped worrying about views`, quote: `"If I can say I would watch this, then I’ll publish it."`, emoji: ['✨','💡','🙌'], hashtags: '#creatoreconomy #youtuber #contentcreation' },
    { type: 'cta', text: `People watch for two reasons — to learn or to be entertained.\n\nIf you’re not delivering one of those, you lose them in seconds.`, cta: `Full video in bio`, quote: `"The effort is subconsciously noticed."`, emoji: ['🎬','🔗','👀'], hashtags: '#contentcreators #educationalcontent #socialmedia' },
  ],
  tiktok: [
    { type: 'hook', text: `POV: you’ve been posting for 10 years\n\nThen suddenly… 350K subscribers.\n\nHis rule: only make content you wish existed.`, cta: `Follow for more creator stories`, quote: `"I only make content that I wish existed."`, emoji: ['😭','🎯','🤯'], hashtags: '#contentcreator #creatortips #growyourchannel' },
    { type: 'story', text: `10 years. Then everything changed.\n\nGabriel started in 2009.\nHe didn’t get traction until 2019.\n\nHe never quit.`, cta: `What’s stopping you from starting`, quote: `"If I had quit, I wouldn’t be doing this right now."`, emoji: ['🔥','📈','💪'], hashtags: '#youtube #creatormotivation #consistency' },
    { type: 'cta', text: `Why do creators win?\n\nIt’s not talent.\nIt’s whether you give people a reason to watch: education or entertainment.`, cta: `Save this if you’re a creator`, quote: `"People watch for one of two reasons: to learn or to be entertained."`, emoji: ['💡','📌','✅'], hashtags: '#learnontiktok #contentcreation #creatoradvice' },
  ],
  linkedin: [
    { type: 'hook', text: `I spoke with a creator who posted for 10 years before breaking through.\n\nKey insight:\nPeople watch for two reasons — education or entertainment.`, cta: `Which works better for your audience?`, quote: `"The effort is subconsciously noticed."`, emoji: ['💡','📊','🎯'], hashtags: '#contentmarketing #creatoreconomy #linkedin' },
    { type: 'story', text: `10 years of posting with almost no growth.\n\nThen: 100K → 200K → 350K.\n\nHe never published anything he wouldn’t watch himself.`, cta: `Consistency compounds.`, quote: `"I only make content that I wish existed."`, emoji: ['📈','🏆','🙏'], hashtags: '#growthmindset #content #leadership' },
    { type: 'cta', text: `Most creators fail for the same reason: they stop.\n\nKeep posting at decent quality, and growth becomes inevitable.`, cta: `Tag a creator who needs this`, quote: `"Anybody who continues to post… will absolutely grow. 100%."`, emoji: ['💯','🚀','👏'], hashtags: '#contentcreator #personalbrand #consistency' },
  ],
  twitter: [
    { type: 'hook', text: `Creator posted for 10 years.\nNow: 350K subs.\n\nRule: only make content you wish existed.`, cta: `RT if you needed this`, quote: `"I only make content that I wish existed."`, emoji: ['🔥','📌'], hashtags: '#contentcreator #youtube' },
    { type: 'story', text: `2009: started\n2019: broke through\n\n10 years of patience.\n\nHe kept shipping.`, cta: `Patience is underrated`, quote: `"If I had quit, I wouldn’t be here."`, emoji: ['📈','💡'], hashtags: '#creatoreconomy #patience' },
    { type: 'cta', text: `Creators who win don’t stop.\n\nThey keep making things worth watching.`, cta: `Who’s underrated?`, quote: `"Consistency beats talent."`, emoji: ['💯','👇'], hashtags: '#youtube #creators' },
  ],
  youtube: [
    { type: 'hook', text: `In this video, I sit down with Gabriel Castillo to discuss what separates successful creators from those who quit.\n\nChapters:\n0:00 Intro\n1:24 Education vs entertainment\n3:15 Effort is visible\n8:30 Make what you wish existed\n14:05 Growth is inevitable`, cta: `Subscribe for more creator insights`, quote: `"Anybody who continues to post… will absolutely grow. 100%."`, emoji: ['🎬','📺','🔔'], hashtags: '#contentcreator #youtube #creatortips' },
    { type: 'story', text: `What does it take to build a channel?\n\nGabriel posted since 2009 — and didn’t gain traction until 2019.\n\nHe shares his workflow and standards.`, cta: `Like + subscribe if helpful`, quote: `"I only make content that I wish existed."`, emoji: ['✨','📖','💬'], hashtags: '#youtube #contentcreation #creatorstory' },
    { type: 'cta', text: `Most people quit within months.\n\nThis conversation explains why that’s the only mistake you can’t recover from.`, cta: `Drop your channel below`, quote: `"Content creation is like a waterfall that only lasts 48 hours."`, emoji: ['🎯','🔥','👇'], hashtags: '#youtube #youtubegrowth #contentcreator' },
  ],
}

const capVariants = computed(() => {
  const v = capBase[capPlatform.value] || capBase.instagram
  return v.map(x => ({
    ...x,
    typeLabel: x.type === 'hook' ? 'Hook' : x.type === 'story' ? 'Story' : 'CTA',
  }))
})

const activeCapPlatform = computed(() => captionPlatforms.find(p => p.key === capPlatform.value) || captionPlatforms[0])
const capLimit = computed(() => activeCapPlatform.value.limit)

function buildCaption(variant) {
  const parts = [variant.text]
  if (capQuote.value) parts.splice(1, 0, variant.quote)
  if (capCta.value) {
    const endEmoji = capEmoji.value ? (variant.emoji?.[variant.emoji.length - 1] || '👇') : ''
    parts.push(`${variant.cta}${endEmoji ? ' ' + endEmoji : ''}`)
  }
  if (capHashtags.value) parts.push(variant.hashtags)
  return parts.join('\n\n')
}

const capText = ref(['', '', ''])

function rebuildCaptions() {
  const built = capVariants.value.map(v => buildCaption(v))
  capText.value = built
}

watchEffect(() => {
  if (view.value !== 'captions') return
  rebuildCaptions()
})

// --- Translate (from WhisperTranscribe_v3 (2) prototype) ---
const trQuery = ref('')
const trLang = ref('es')
const trCompleted = ref(['es'])
const trFormat = ref('srt') // 'srt' | 'txt' | 'vtt'
const trPreserve = ref(true)
const trAutoupload = ref(false)
const trSpeakers = ref(false)
const trState = ref('idle') // 'idle' | 'translating' | 'ready'
const trProgress = ref(0)
let trTimer = null

const trLanguages = [
  { region: 'Most popular', code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { region: 'Most popular', code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷' },
  { region: 'Most popular', code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { region: 'Most popular', code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { region: 'Most popular', code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { region: 'Most popular', code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { region: 'Asian', code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { region: 'Asian', code: 'zh', name: 'Chinese (Simplified)', native: '中文', flag: '🇨🇳' },
  { region: 'Asian', code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
  { region: 'European', code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { region: 'European', code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
  { region: 'European', code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱' },
  { region: 'European', code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { region: 'European', code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
  { region: 'African & Other', code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪' },
]

const trLangByCode = computed(() => {
  const m = {}
  trLanguages.forEach(l => {
    m[l.code] = l
  })
  return m
})

const activeTrLang = computed(() => trLangByCode.value[trLang.value] || trLanguages[0])

const trLangGroups = computed(() => {
  const q = trQuery.value.trim().toLowerCase()
  const items = !q
    ? trLanguages
    : trLanguages.filter(l => l.name.toLowerCase().includes(q))

  const regions = []
  const byRegion = new Map()
  items.forEach(l => {
    if (!byRegion.has(l.region)) {
      byRegion.set(l.region, [])
      regions.push(l.region)
    }
    byRegion.get(l.region).push(l)
  })

  return regions.map(region => ({ region, items: byRegion.get(region) || [] }))
})

const trSegs = computed(() => {
  const paras = (dataset.value.paragraphs || []).slice(0, 6)
  return paras.map(p => ({
    start: Number(p.start || 0),
    t: dataset.value.formatTime ? dataset.value.formatTime(Number(p.start || 0)) : '0:00',
    text: String(p.text || ''),
    speaker: p.speaker || null,
  }))
})

const trOrigText = ref([])
const trTransText = ref([])

function toSrtTime(seconds) {
  const s = Math.max(0, Number(seconds || 0))
  const hh = String(Math.floor(s / 3600)).padStart(2, '0')
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(Math.floor(s % 60)).padStart(2, '0')
  const ms = String(Math.floor((s - Math.floor(s)) * 1000)).padStart(3, '0')
  return `${hh}:${mm}:${ss},${ms}`
}

function buildSrt(texts) {
  return trSegs.value
    .map((seg, i) => {
      const start = trPreserve.value ? toSrtTime(seg.start) : '00:00:00,000'
      const end = trPreserve.value ? toSrtTime(seg.start + 2.5) : '00:00:02,500'
      const speaker = trSpeakers.value && seg.speaker ? `${seg.speaker}: ` : ''
      const body = `${speaker}${texts[i] || ''}`.trim()
      return `${i + 1}\n${start} --> ${end}\n${body}\n`
    })
    .join('\n')
    .trim()
}

function buildVtt(texts) {
  const toVttTime = (seconds) => {
    const s = Math.max(0, Number(seconds || 0))
    const hh = String(Math.floor(s / 3600)).padStart(2, '0')
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
    const ss = String(Math.floor(s % 60)).padStart(2, '0')
    const ms = String(Math.floor((s - Math.floor(s)) * 1000)).padStart(3, '0')
    return `${hh}:${mm}:${ss}.${ms}`
  }
  const cues = trSegs.value
    .map((seg, i) => {
      const start = trPreserve.value ? toVttTime(seg.start) : '00:00:00.000'
      const end = trPreserve.value ? toVttTime(seg.start + 2.5) : '00:00:02.500'
      const speaker = trSpeakers.value && seg.speaker ? `${seg.speaker}: ` : ''
      const body = `${speaker}${texts[i] || ''}`.trim()
      return `${start} --> ${end}\n${body}\n`
    })
    .join('\n')
    .trim()
  return `WEBVTT\n\n${cues}`
}

const trTranslations = {
  es: [
    'La gente ve las redes sociales por dos razones: para educarse o para entretenerse.',
    'Estoy en el ámbito educativo, pero personalmente siempre veo cosas que me entretienen, así que intento hacer ambas.',
    'Los videos que funcionan son los que hago con mucho esfuerzo — y ese esfuerzo se nota de forma subconsciente. Hay que ir al grano.',
    'El contenido largo y el corto son filosofías completamente distintas. El contenido corto tiene que ser rápido, atractivo, en constante movimiento.',
    'Solo hago contenido que desearía que existiera. Lo veo hasta poder decir "yo vería esto" — y entonces lo publico.',
    'Cualquiera que siga publicando con una calidad similar a su nicho crecerá sin duda. Absolutamente, al 100%.',
  ],
  pt: [
    'As pessoas assistem às redes sociais por dois motivos: para aprender ou para se divertir.',
    'Estou no lado educacional, mas pessoalmente eu sempre assisto coisas que me entretêm. Então tento fazer os dois.',
    'Os vídeos que vão bem são aqueles em que eu coloco muito esforço — e esse esforço é percebido subconscientemente. Vá direto ao ponto.',
    'Conteúdo longo e curto são filosofias totalmente diferentes. O curto precisa ser rápido, chamativo e em movimento o tempo todo.',
    'Eu só faço conteúdo que eu gostaria que existisse. Eu assisto até poder dizer "eu assistiria isso" — e então publico.',
    'Quem continuar postando com uma qualidade compatível com seu nicho vai crescer, com certeza. 100%.',
  ],
  fr: [
    'Les gens regardent les réseaux sociaux pour deux raisons : s’éduquer ou se divertir.',
    'Je suis dans l’éducatif, mais je regarde surtout des choses qui me divertissent, donc j’essaie de faire les deux.',
    'Les vidéos qui marchent sont celles où je mets beaucoup d’effort — et cet effort est remarqué inconsciemment. Allez droit au but.',
    'Le long et le court format sont deux philosophies différentes. Le court doit être rapide, accrocheur, toujours en mouvement.',
    'Je ne fais que du contenu que j’aimerais voir exister. Je le regarde jusqu’à me dire "je regarderais ça" — puis je publie.',
    'Quiconque continue à publier avec une qualité comparable à sa niche finira par grandir. Absolument, 100%.',
  ],
  de: [
    'Menschen schauen Social Media aus zwei Gründen: um zu lernen oder um unterhalten zu werden.',
    'Ich bin im Bildungsbereich, aber ich schaue persönlich Dinge, die mich unterhalten — also versuche ich beides zu machen.',
    'Gut performende Videos sind die, in die ich viel Mühe stecke — und diese Mühe wird unbewusst wahrgenommen. Komm auf den Punkt.',
    'Lang- und Kurzformat sind komplett unterschiedliche Philosophien. Short-Content muss schnell, catchy und ständig in Bewegung sein.',
    'Ich mache nur Content, den ich mir selbst wünschen würde. Ich schaue ihn, bis ich sagen kann "das würde ich ansehen" — dann veröffentliche ich.',
    'Wer konsequent mit passender Qualität für seine Nische postet, wird wachsen. Absolut, 100%.',
  ],
  ru: [
    'Люди смотрят соцсети по двум причинам: чтобы учиться или чтобы развлекаться.',
    'Я в образовательной нише, но лично я смотрю то, что меня развлекает — поэтому стараюсь делать и то, и другое.',
    'Хорошо заходят видео, в которые я вкладываю много усилий — и это ощущается на подсознательном уровне. Сразу к сути.',
    'Длинный и короткий контент — это разные философии. Короткий должен быть быстрым, цепляющим и постоянно движущимся.',
    'Я делаю только тот контент, который хотел бы видеть. Смотрю, пока не скажу "я бы это посмотрел" — и тогда публикую.',
    'Тот, кто продолжает публиковать с качеством под свою нишу, будет расти. Абсолютно, на 100%.',
  ],
}

function ensureTranslateSeed() {
  if (trOrigText.value.length !== trSegs.value.length) {
    trOrigText.value = trSegs.value.map(s => s.text)
  }
  if (trTransText.value.length !== trSegs.value.length) {
    trTransText.value = trSegs.value.map(() => '')
  }
}

function selectTrLang(code) {
  trLang.value = code
  ensureTranslateSeed()
  if (trCompleted.value.includes(code)) {
    trState.value = 'ready'
    const t = trTranslations[code] || trOrigText.value.map(x => `[${activeTrLang.value.name}] ${x}`)
    trTransText.value = trSegs.value.map((_, i) => t[i] || '')
  } else {
    trState.value = 'idle'
    trTransText.value = trSegs.value.map(() => '')
  }
}

function onOrigEdit(i, ev) {
  trOrigText.value[i] = ev?.target?.innerText || ''
}
function onTransEdit(i, ev) {
  trTransText.value[i] = ev?.target?.innerText || ''
}

function startTranslation() {
  if (trState.value === 'translating') return
  ensureTranslateSeed()
  trState.value = 'translating'
  trProgress.value = 0
  trTransText.value = trSegs.value.map(() => '…')

  const t = trTranslations[trLang.value] || trOrigText.value.map(x => `[${activeTrLang.value.name}] ${x}`)

  if (trTimer) clearInterval(trTimer)
  trTimer = setInterval(() => {
    trProgress.value = Math.min(95, trProgress.value + 8)
  }, 120)

  t.forEach((text, i) => {
    setTimeout(() => {
      trTransText.value[i] = text
    }, 400 + i * 280)
  })

  setTimeout(() => {
    if (trTimer) clearInterval(trTimer)
    trProgress.value = 100
    trState.value = 'ready'
    if (!trCompleted.value.includes(trLang.value)) trCompleted.value.push(trLang.value)
    notify(`✅ ${activeTrLang.value.name} translation complete!`)
    setTimeout(() => {
      trProgress.value = 0
    }, 650)
  }, 400 + t.length * 280 + 450)
}

async function copyOriginal() {
  const txt = trOrigText.value.filter(Boolean).join('\n\n')
  try {
    await navigator.clipboard.writeText(txt)
  } catch {
    // ignore
  }
  notify('📋 Original copied!')
}

async function copyTranslation() {
  let out = ''
  if (trFormat.value === 'srt') out = buildSrt(trTransText.value)
  else if (trFormat.value === 'vtt') out = buildVtt(trTransText.value)
  else out = trTransText.value.filter(Boolean).join('\n\n')

  try {
    await navigator.clipboard.writeText(out)
  } catch {
    // ignore
  }
  notify(`📋 Translation copied as ${trFormat.value.toUpperCase()}!`)
}

function downloadTranslation() {
  let out = ''
  let mime = 'text/plain'
  let ext = trFormat.value
  if (trFormat.value === 'srt') out = buildSrt(trTransText.value)
  else if (trFormat.value === 'vtt') out = buildVtt(trTransText.value)
  else out = trTransText.value.filter(Boolean).join('\n\n')

  const blob = new Blob([out], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Ep47_${activeTrLang.value.code || trLang.value}.${ext}`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 500)
  notify(`✅ ${ext.toUpperCase()} file downloaded!`)
}

watchEffect(() => {
  if (view.value !== 'translate') return
  ensureTranslateSeed()
  selectTrLang(trLang.value)
})

onBeforeUnmount(() => {
  if (trTimer) clearInterval(trTimer)
})

function regenCaptions() {
  notify('⚡ Regenerating…')
  // fake regen: just rebuild
  rebuildCaptions()
}

async function copyCaption(idx) {
  try {
    await navigator.clipboard.writeText(capText.value[idx] || '')
  } catch {
    // ignore
  }
  notify('📋 Copied!')
}

async function copyAllCaptions() {
  const all = capText.value.filter(Boolean).join('\n\n---\n\n')
  try {
    await navigator.clipboard.writeText(all)
  } catch {
    // ignore
  }
  notify(`📋 All ${capText.value.length} variants copied!`)
}

function notify(message) {
  $q.notify({ message, position: 'bottom', timeout: 1800 })
}

function regen() {
  blogLoading.value = true
  window.setTimeout(() => {
    blogLoading.value = false
    notify('✅ Regenerated!')
  }, 1800)
}

const baseTranscriptChunks = [
  {
    id: 'h1',
    t: '0:00',
    a: 'People watch social media for two reasons:',
    b: 'to be educated or to be entertained.',
  },
  {
    id: 'h2',
    t: '1:24',
    a: "I'm in the educational space, but I personally don't watch Catholic videos.",
    b: "I'm always watching things that entertain me. So I try to do both.",
  },
  {
    id: 'h3',
    t: '3:15',
    a: 'The videos that do well are ones I put a lot of effort into — and the effort is subconsciously noticed.',
    b: 'Just get to the point.',
  },
  {
    id: 'h4',
    t: '5:42',
    a: 'Long-form and short-form are totally different philosophies.',
    b: 'Short content has to be quick, catchy, constantly moving.',
  },
  {
    id: 'h5',
    t: '8:30',
    a: 'I only make content that I wish existed.',
    b: 'I watch it until I can say “I would watch this” — then I publish.',
  },
  {
    id: 'h6',
    t: '14:05',
    a: 'Anybody who continues to post at a matching quality for their niche will absolutely grow.',
    b: 'Absolutely, 100%.',
  },
]

const toneHighlights = {
  Educational: { h1: 'used', h2: '', h3: 'used', h4: 'hl', h5: '', h6: 'hl' },
  Conversational: { h1: 'hl', h2: 'used', h3: 'hl', h4: '', h5: 'used', h6: '' },
  Journalistic: { h1: 'used', h2: '', h3: 'used', h4: '', h5: '', h6: 'used' },
}

const transcriptChunks = computed(() => {
  const map = toneHighlights[tone.value] || toneHighlights.Educational
  return baseTranscriptChunks.map(c => ({
    ...c,
    hl: map[c.id] || '',
  }))
})

const clips = [
  {
    id: 'c1',
    label: 'CLIP 1 · 0:53',
    score: '94 / 100',
    scoreClass: 'high',
    quote: 'The videos that do well are ones I put a lot of effort into — and the effort is subconsciously noticed.',
    range: '3:15 – 4:08',
    why: 'High conviction + actionable insight',
  },
  {
    id: 'c2',
    label: 'CLIP 2 · 0:47',
    score: '87 / 100',
    scoreClass: 'high',
    quote: 'I only make content that I wish existed.',
    range: '8:30 – 9:17',
    why: 'Memorable, quotable statement',
  },
  {
    id: 'c3',
    label: 'CLIP 3 · 1:02',
    score: '81 / 100',
    scoreClass: 'med',
    quote: 'Anybody who continues to post at a matching quality will absolutely grow. 100%.',
    range: '14:05 – 15:07',
    why: 'Strong motivational hook',
  },
]

const clipId = ref('c1')
const activeClip = computed(() => clips.find(c => c.id === clipId.value) || clips[0])
const activeClipQuote = computed(() => activeClip.value.quote)
const activeClipPreview = computed(() => {
  const q = activeClip.value.quote
  return q.length > 64 ? q.slice(0, 64) + '…' : q
})

onMounted(() => {
  ddListener = (e) => {
    if (!e?.target?.closest?.('.file-pill')) ddOpen.value = false
    if (!e?.target?.closest?.('.more-options-btn')) optionsOpen.value = false
  }
  window.addEventListener('click', ddListener)
})

onBeforeUnmount(() => {
  if (ddListener) window.removeEventListener('click', ddListener)
})
</script>

<style scoped>
.workspace {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.ctx-strip {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
  height: 50px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.ctx-crumb { font-size: 13px; color: var(--muted); display: flex; align-items: center; gap: 7px; }
.ctx-sep { margin: 0 8px; color: var(--border); font-size: 14px; }
.ctx-page { font-size: 13px; font-weight: 700; color: var(--text); }
.ctx-spacer { flex: 1; }

.file-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-lt);
  border: 1.5px solid var(--accent-mid);
  border-radius: 9px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
  user-select: none;
}
.file-pill:hover { border-color: var(--accent); }
.fp-label { font-size: 10px; font-weight: 800; color: var(--accent); text-transform: uppercase; letter-spacing: 0.6px; }
.fp-name { font-size: 12px; font-weight: 700; color: var(--text); }
.fp-chevron { font-size: 11px; color: var(--muted); }

.file-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
  width: 290px;
  z-index: 50;
  display: none;
  overflow: hidden;
}
.file-dropdown.open { display: block; }
.fd-header {
  padding: 12px 16px 8px;
  font-size: 11px;
  font-weight: 800;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.7px;
  border-bottom: 1px solid var(--border);
}
.fd-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 16px;
  cursor: pointer;
  transition: background 0.12s;
}
.fd-item:hover { background: var(--bg); }
.fd-item.current { background: var(--accent-lt); }
.fd-icon { font-size: 20px; }
.fd-info { flex: 1; }
.fd-name { font-size: 13px; font-weight: 700; }
.fd-meta { font-size: 11px; color: var(--muted); }
.fd-check { color: var(--accent); font-weight: 800; }
.fd-add {
  padding: 10px 16px;
  border-top: 1px solid var(--border);
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  cursor: pointer;
}
.fd-add:hover { background: var(--accent-lt); }

.ctx-actions { display: flex; gap: 8px; margin-left: 12px; }
.btn-sm-ghost {
  padding: 6px 12px;
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.12s;
}
.btn-sm-ghost:hover { background: var(--bg); color: var(--text); }
.btn-sm-accent {
  padding: 6px 14px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.12s;
}
.btn-sm-accent:hover { background: #4D45E3; }

.view-wrap { flex: 1; overflow: hidden; }

/* Overview */
.view-home-body { height: 100%; overflow-y: auto; padding: 40px; }
.home-header { margin-bottom: 32px; }
.home-title { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
.home-meta { font-size: 13px; color: var(--muted); }
.home-drop {
  border: 2px dashed var(--border);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  background: var(--surface);
  transition: all 0.2s;
  margin-bottom: 32px;
}
.home-drop:hover { border-color: var(--accent); background: var(--accent-lt); }
.hd-icon { font-size: 36px; margin-bottom: 10px; }
.hd-title { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
.hd-sub { font-size: 13px; color: var(--muted); }
.section-title { font-size: 13px; font-weight: 800; margin-bottom: 12px; }
.files-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px,1fr)); gap: 10px; margin-bottom: 32px; }
.file-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.15s;
}
.file-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(94,85,244,0.10); }
.file-card.sel { border-color: var(--accent); background: var(--accent-lt); }
.fc-em { font-size: 26px; margin-bottom: 10px; }
.fc-name { font-size: 13px; font-weight: 800; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fc-meta { font-size: 11px; color: var(--muted); }
.fc-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 20px; margin-top: 10px; }
.fc-badge.done { background: var(--green-lt); color: var(--green); }
.tools-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px,1fr)); gap: 10px; }
.tool-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: 14px; padding: 18px; cursor: pointer; transition: all 0.15s; }
.tool-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(94,85,244,0.10); }
.tc-em { font-size: 22px; margin-bottom: 10px; }
.tc-title { font-size: 14px; font-weight: 800; margin-bottom: 4px; }
.tc-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }

/* Blog Generator */
.view-blog { height: 100%; display: flex; overflow: hidden; }
.blog-transcript {
  width: 300px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease, opacity 0.2s ease;
  overflow: hidden;
}
.blog-transcript.collapsed { width: 0; opacity: 0; border-right: none; }
.bt-header { padding: 12px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
.bt-title { font-size: 11px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; }
.bt-ok { color: var(--green); margin-left: 6px; font-weight: 800; }
.bt-close { width: 22px; height: 22px; border-radius: 5px; border: none; background: var(--bg); color: var(--muted); font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.12s; }
.bt-close:hover { background: var(--border); color: var(--text); }
.bt-scroll { flex: 1; overflow-y: auto; padding: 14px 16px; }
.bt-chunk { margin-bottom: 18px; }
.bt-time { font-size: 10px; font-weight: 800; color: var(--accent); margin-bottom: 4px; }
.bt-text { font-size: 13px; line-height: 1.75; color: var(--text); }
.bt-text .hl { background: #FEF08A; padding: 1px 2px; border-radius: 2px; }
.bt-text .used { background: #BBF7D0; padding: 1px 2px; border-radius: 2px; }

.blog-output { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
.blog-settings-bar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  flex-wrap: wrap;
}
.transcript-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.12s;
  flex-shrink: 0;
}
.transcript-toggle:hover { background: var(--bg); color: var(--text); }
.transcript-toggle.active { background: var(--accent-lt); color: var(--accent); border-color: var(--accent-mid); }
.bar-divider { width: 1px; height: 20px; background: var(--border); flex-shrink: 0; }
.bar-group { display: flex; align-items: center; gap: 6px; }
.bar-label { font-size: 10px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.7px; white-space: nowrap; }
.pill-select { display: flex; gap: 4px; }
.pill {
  padding: 5px 11px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: 1.5px solid var(--border);
  background: transparent;
  color: var(--muted);
  font-family: 'DM Sans', sans-serif;
  transition: all 0.12s;
  white-space: nowrap;
}
.pill:hover { border-color: var(--accent); color: var(--accent); }
.pill.on { background: var(--accent); border-color: var(--accent); color: white; font-weight: 800; }
.more-options-btn {
  padding: 5px 10px;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.12s;
  margin-left: auto;
}
.more-options-btn:hover { background: var(--bg); color: var(--text); }
.regen-btn {
  padding: 6px 14px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.12s;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}
.regen-btn:hover { background: #4D45E3; box-shadow: 0 4px 14px rgba(94,85,244,0.30); }

.options-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  width: 220px;
  z-index: 60;
  padding: 12px 14px;
  display: none;
}
.options-popover.open { display: block; }
.op-title { font-size: 11px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.7px; margin-bottom: 10px; }
.op-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 9px; }
.op-label { font-size: 13px; color: var(--text); }

.blog-loading {
  display: none;
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.92);
  z-index: 10;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 14px;
}
.blog-loading.show { display: flex; }
.bl-spinner { width: 32px; height: 32px; border: 2.5px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.7s linear infinite; }
.bl-title { font-size: 14px; font-weight: 700; }
.bl-sub { font-size: 12px; color: var(--muted); }

@keyframes spin { to { transform: rotate(360deg); } }

.blog-doc-scroll { flex: 1; overflow-y: auto; padding: 40px 52px; }
.blog-doc { max-width: 620px; font-family: 'Lora', serif; }
.b-tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 14px; }
.b-tag { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 700; background: var(--accent-lt); color: var(--accent); padding: 3px 9px; border-radius: 20px; }
.b-h1 { font-size: 28px; font-weight: 600; line-height: 1.3; margin-bottom: 12px; }
.b-byline { font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--muted); margin-bottom: 24px; display: flex; gap: 18px; align-items: center; }
.b-p { font-size: 16px; line-height: 1.85; color: #2a2a42; margin-bottom: 20px; }
.b-h2 { font-size: 20px; font-weight: 600; color: var(--text); margin: 28px 0 12px; }
.b-callout { background: var(--accent-lt); border-left: 3px solid var(--accent); padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 20px 0; font-size: 15px; font-style: italic; color: #3a3a60; line-height: 1.7; }
.src { display: inline-block; background: var(--accent); color: white; font-size: 9px; font-family: 'DM Sans', sans-serif; font-weight: 800; padding: 1px 5px; border-radius: 3px; vertical-align: middle; margin-left: 3px; }
.blog-foot { padding: 10px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--muted); background: var(--surface); flex-shrink: 0; }
.bf-btns { display: flex; gap: 7px; }

/* Clip Studio */
.view-clips { height: 100%; display: flex; overflow: hidden; }
.clips-list { width: 260px; flex-shrink: 0; background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden; }
.clips-list-header { padding: 14px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
.cl-title { font-size: 11px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; }
.cl-count { font-size: 11px; font-weight: 800; background: var(--accent-lt); color: var(--accent); padding: 2px 8px; border-radius: 20px; }
.clips-scroll { flex: 1; overflow-y: auto; padding: 10px; }
.clips-help { font-size: 11px; color: var(--muted); padding: 6px 4px 10px; line-height: 1.5; }
.clip-card { border: 1.5px solid var(--border); border-radius: 12px; padding: 12px; margin-bottom: 8px; cursor: pointer; transition: all 0.15s; background: var(--bg); }
.clip-card:hover { border-color: var(--accent); background: var(--accent-lt); }
.clip-card.active { border-color: var(--accent); background: var(--accent-lt); }
.cc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.cc-num { font-size: 10px; font-weight: 800; color: var(--muted); }
.cc-score { font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 20px; }
.cc-score.high { background: #DCFCE7; color: var(--green); }
.cc-score.med { background: #FEF3C7; color: #D97706; }
.cc-quote { font-size: 12px; line-height: 1.5; color: var(--text); margin-bottom: 8px; font-style: italic; }
.cc-meta { font-size: 11px; color: var(--muted); display: flex; gap: 10px; }
.cc-why { font-size: 10px; color: var(--accent); font-weight: 700; margin-top: 6px; }

.clips-center { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: var(--bg); min-width: 0; }
.clips-preview { flex: 1; display: flex; align-items: center; justify-content: center; padding: 32px; min-height: 0; }
.phone-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.phone-label { font-size: 10px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; }
.phone-frame { width: 200px; height: 356px; background: #0D0D1A; border-radius: 28px; border: 3px solid #2A2A40; position: relative; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.25); }
.phone-bg { position: absolute; inset: 0; background: linear-gradient(160deg, #1A1040 0%, #0D1A40 60%, #081A10 100%); }
.phone-avatar { position: absolute; bottom: 60px; left: 50%; transform: translateX(-50%); width: 80px; height: 80px; background: linear-gradient(135deg, #3A2F8F, #5E55F4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; }
.phone-caption-wrap { position: absolute; bottom: 20px; left: 10px; right: 10px; text-align: center; }
.phone-caption-text { font-size: 11px; font-weight: 800; color: white; line-height: 1.4; text-shadow: 0 2px 6px rgba(0,0,0,0.8); }
.phone-top-tag { position: absolute; top: 12px; left: 10px; font-size: 9px; font-weight: 800; color: white; background: rgba(94,85,244,0.85); padding: 3px 7px; border-radius: 5px; }
.phone-progress-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: rgba(255,255,255,0.15); }
.phone-progress-fill { height: 100%; background: var(--accent); }
.aspect-pills { display: flex; gap: 5px; }
.aspect-pill { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; cursor: pointer; border: 1.5px solid var(--border); background: var(--surface); color: var(--muted); font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
.aspect-pill:hover { border-color: var(--accent); color: var(--accent); }
.aspect-pill.on { background: var(--accent); border-color: var(--accent); color: white; }

.clips-timeline { background: var(--surface); border-top: 1px solid var(--border); padding: 16px 24px 20px; flex-shrink: 0; }
.tl-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.tl-label { font-size: 11px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; }
.tl-controls { display: flex; gap: 6px; align-items: center; }
.tl-btn { width: 28px; height: 28px; border-radius: 7px; background: var(--bg); border: 1px solid var(--border); color: var(--text); font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.12s; font-family: 'DM Sans', sans-serif; }
.tl-btn:hover { background: var(--accent); border-color: var(--accent); color: white; }
.tl-play { width: 32px; height: 32px; border-radius: 50%; background: var(--accent); border-color: var(--accent); color: white; }
.tl-divider { width: 1px; height: 20px; background: var(--border); margin: 0 2px; }
.tl-track { position: relative; height: 44px; background: var(--bg); border-radius: 8px; border: 1px solid var(--border); overflow: hidden; cursor: pointer; margin-bottom: 6px; }
.tl-waveform { position: absolute; inset: 0; display: flex; align-items: center; gap: 2px; padding: 0 6px; }
.tl-bar { flex: 1; border-radius: 2px; background: rgba(94,85,244,0.2); }
.tl-bar.active { background: rgba(94,85,244,0.55); }
.tl-selection { position: absolute; top: 0; bottom: 0; background: rgba(94,85,244,0.15); border-left: 2px solid var(--accent); border-right: 2px solid var(--accent); left: 15%; width: 48%; }
.tl-handle { position: absolute; top: 50%; transform: translateY(-50%); width: 8px; height: 28px; background: var(--accent); border-radius: 3px; cursor: ew-resize; }
.tl-handle.l { left: -4px; }
.tl-handle.r { right: -4px; }
.tl-playhead { position: absolute; top: 0; bottom: 0; width: 2px; background: white; left: 38%; pointer-events: none; }
.tl-playhead::before { content: ''; position: absolute; top: -4px; left: -4px; width: 10px; height: 10px; background: white; border-radius: 50%; }
.tl-timestamps { display: flex; justify-content: space-between; font-size: 10px; color: var(--muted); }
.tl-selected { text-align: center; font-size: 11px; font-weight: 800; color: var(--accent); margin-top: 4px; }

.clips-panel { width: 260px; flex-shrink: 0; background: var(--surface); border-left: 1px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; }
.cp-section { padding: 14px 16px; border-bottom: 1px solid var(--border); }
.cp-label { font-size: 10px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px; }
.cp-caption-input { width: 100%; padding: 8px 10px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 12px; font-weight: 700; font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--bg); outline: none; resize: none; min-height: 64px; }
.cp-hint { font-size: 10px; color: var(--muted); margin-top: 6px; }
.style-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.style-swatch { border: 1.5px solid var(--border); border-radius: 8px; padding: 8px 6px; cursor: pointer; text-align: center; transition: all 0.12s; font-size: 11px; font-weight: 700; color: var(--muted); }
.style-swatch:hover { border-color: var(--accent); }
.style-swatch.on { border-color: var(--accent); background: var(--accent-lt); color: var(--accent); }
.style-preview-mini { height: 30px; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 900; margin-bottom: 5px; }
.cp-toggle-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 9px; }
.cp-toggle-label { font-size: 12px; color: var(--text); }
.tgl { width: 32px; height: 18px; background: var(--border); border-radius: 20px; position: relative; }
.tgl.on { background: var(--accent); }
.tgl::after { content: ''; position: absolute; width: 14px; height: 14px; background: white; border-radius: 50%; top: 2px; left: 2px; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
.tgl.on::after { transform: translateX(14px); }
.export-platform { display: flex; align-items: center; gap: 9px; padding: 9px 10px; border-radius: 9px; border: 1.5px solid var(--border); margin-bottom: 6px; cursor: pointer; transition: all 0.12s; background: var(--bg); }
.export-platform:hover { border-color: var(--accent); background: var(--accent-lt); }
.export-platform.on { border-color: var(--accent); background: var(--accent-lt); }
.ep-icon { font-size: 18px; }
.ep-name { font-size: 12px; font-weight: 800; }
.ep-spec { font-size: 10px; color: var(--muted); }
.ep-check { color: var(--accent); font-size: 13px; font-weight: 900; margin-left: auto; }
.export-big-btn { width: 100%; padding: 11px; background: var(--green); color: white; border: none; border-radius: 10px; font-size: 13px; font-weight: 900; cursor: pointer; font-family: 'DM Sans', sans-serif; margin-top: 4px; transition: all 0.15s; }
.export-big-btn:hover { background: #15803D; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(22,163,74,0.3); }

/* Social Captions */
.view-captions { height: 100%; display: flex; overflow: hidden; }
.captions-sidebar { width: 200px; flex-shrink: 0; background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden; }
.cs-header { padding: 14px 16px; border-bottom: 1px solid var(--border); }
.cs-title { font-size: 11px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; }
.platform-list { flex: 1; overflow-y: auto; padding: 10px; }
.platform-btn { display: flex; align-items: center; gap: 10px; padding: 10px 10px; border-radius: 12px; border: 1.5px solid transparent; cursor: pointer; transition: all 0.12s; margin-bottom: 6px; }
.platform-btn:hover { background: var(--bg); }
.platform-btn.active { background: var(--accent-lt); border-color: var(--accent-mid); }
.pb-icon {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 0 rgba(0,0,0,0.03);
}
.pb-icon svg { width: 18px; height: 18px; display: block; }
.pb-top { width: 28px; height: 28px; border-radius: 9px; }
.pb-top svg { width: 15px; height: 15px; }
.pb-instagram { background: linear-gradient(145deg, #FFD776, #F56040 35%, #C13584 70%, #405DE6); color: #fdfcff; border-color: rgba(64,93,230,0.25); }
.pb-tiktok { background: #0F0F14; color: #FAFAFF; border-color: rgba(255,255,255,0.12); }
.pb-linkedin { background: #0A66C2; color: #F7FBFF; border-color: rgba(10,102,194,0.35); }
.pb-twitter { background: #0B0B10; color: #F7F7FF; border-color: rgba(255,255,255,0.10); }
.pb-youtube { background: #FF0033; color: #FFF7FA; border-color: rgba(255,0,51,0.35); }
.pb-name { font-size: 12px; font-weight: 800; }
.pb-limit { font-size: 10px; color: var(--muted); }
.gen-all-btn { margin: 10px; padding: 10px; border-radius: 10px; border: 1.5px solid var(--border); background: var(--bg); cursor: pointer; font-size: 12px; font-weight: 800; font-family: 'DM Sans', sans-serif; color: var(--muted); }
.gen-all-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-lt); }

.captions-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
.captions-topbar { padding: 12px 20px; border-bottom: 1px solid var(--border); background: var(--surface); display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.captions-platform-label { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 900; }
.ctb-spacer { flex: 1; }
.regen-captions-btn { padding: 6px 14px; background: var(--accent); color: white; border: none; border-radius: 8px; font-size: 12px; font-weight: 900; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.12s; display: flex; align-items: center; gap: 5px; }
.regen-captions-btn:hover { background: #4D45E3; }

.captions-scroll { flex: 1; overflow-y: auto; padding: 28px 32px; }
.caption-variant { border: 1.5px solid var(--border); background: var(--surface); border-radius: 16px; padding: 14px; margin-bottom: 12px; }
.cv-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.cv-label { font-size: 12px; font-weight: 900; color: var(--text); display: flex; align-items: center; gap: 8px; }
.cv-tag { font-size: 10px; font-weight: 900; padding: 3px 8px; border-radius: 999px; background: var(--bg); color: var(--muted); border: 1px solid var(--border); }
.cv-tag.hook { background: #FEF3C7; border-color: #FCD34D; color: #92400E; }
.cv-tag.story { background: #E0E7FF; border-color: #A5B4FC; color: #3730A3; }
.cv-tag.cta { background: var(--accent-lt); border-color: var(--accent-mid); color: var(--accent); }
.cv-actions { display: flex; gap: 6px; }
.cv-btn { padding: 6px 10px; border-radius: 9px; border: 1.5px solid var(--border); background: var(--bg); cursor: pointer; font-size: 12px; font-weight: 800; color: var(--muted); font-family: 'DM Sans', sans-serif; }
.cv-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-lt); }
.cv-btn.copy { background: var(--accent); border-color: var(--accent); color: white; }
.cv-btn.copy:hover { background: #4D45E3; border-color: #4D45E3; color: white; }
.cv-textarea { width: 100%; min-height: 140px; border-radius: 12px; border: 1.5px solid var(--border); background: var(--bg); padding: 12px; font-size: 13px; line-height: 1.6; font-family: 'DM Sans', sans-serif; color: var(--text); resize: vertical; outline: none; }
.cv-textarea:focus { border-color: var(--accent-mid); background: #fff; }
.cv-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
.cv-charcount { font-size: 11px; font-weight: 800; color: var(--muted); }
.cv-charcount.over { color: #DC2626; }
.cv-hashtags { font-size: 11px; color: var(--muted); }

.captions-panel { width: 210px; flex-shrink: 0; background: var(--surface); border-left: 1px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; }
.cap-section { padding: 14px 16px; border-bottom: 1px solid var(--border); }
.cap-label { font-size: 10px; font-weight: 900; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px; }
.cap-opt { width: 100%; text-align: left; padding: 9px 10px; border-radius: 10px; border: 1.5px solid var(--border); background: var(--bg); cursor: pointer; font-size: 12px; font-weight: 800; font-family: 'DM Sans', sans-serif; color: var(--muted); margin-bottom: 6px; transition: all 0.12s; }
.cap-opt:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-lt); }
.cap-opt.on { border-color: var(--accent); color: var(--accent); background: var(--accent-lt); }
.cap-toggle-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 9px; }
.cap-toggle-label { font-size: 12px; color: var(--text); }
.cap-variants-row { display: flex; gap: 6px; }
.cap-variant-btn { flex: 1; padding: 7px; border-radius: 8px; font-size: 12px; font-weight: 800; background: var(--bg); color: var(--muted); border: 1.5px solid var(--border); cursor: pointer; font-family: 'DM Sans', sans-serif; }
.cap-variant-btn.on { background: var(--accent-lt); color: var(--accent); border-color: var(--accent); }
.cap-copyall { width: 100%; padding: 10px; background: var(--navy); color: white; border: none; border-radius: 9px; font-size: 12px; font-weight: 900; cursor: pointer; font-family: 'DM Sans', sans-serif; }
.cap-copyall:hover { opacity: 0.95; }

/* Translate */
.view-translate { flex: 1; display: flex; overflow: hidden; }
.translate-sidebar {
  width: 230px;
  flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.trs-header { padding: 14px 16px; border-bottom: 1px solid var(--border); }
.trs-title { font-size: 11px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px; }
.trs-search {
  width: 100%;
  padding: 7px 10px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: 13px;
  font-family: 'DM Sans', sans-serif;
  color: var(--text);
  background: var(--bg);
  outline: none;
  transition: border-color 0.15s, background 0.15s;
}
.trs-search:focus { border-color: var(--accent); background: white; }

.lang-scroll { flex: 1; overflow-y: auto; padding: 8px; }
.lang-scroll::-webkit-scrollbar { width: 3px; }
.lang-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
.lang-region { font-size: 10px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; padding: 8px 8px 4px; }
.lang-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 9px;
  border: 1.5px solid transparent;
  background: transparent;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  text-align: left;
  transition: all 0.12s;
  margin-bottom: 2px;
}
.lang-btn:hover { background: var(--bg); border-color: var(--border); }
.lang-btn.active { background: var(--accent-lt); border-color: var(--accent-mid); }
.lang-flag { font-size: 18px; flex-shrink: 0; }
.lang-info { flex: 1; }
.lang-name { font-size: 13px; font-weight: 800; color: var(--text); }
.lang-btn.active .lang-name { color: var(--accent); }
.lang-native { font-size: 10px; color: var(--muted); }
.lang-check { color: var(--accent); font-size: 13px; font-weight: 900; display: none; }
.lang-btn.active .lang-check { display: block; }

.translate-all-btn {
  margin: 10px;
  padding: 11px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.translate-all-btn:hover { background: #4D45E3; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(94,85,244,0.3); }

.translate-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
.translate-topbar { padding: 12px 20px; border-bottom: 1px solid var(--border); background: var(--surface); display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.ttr-lang { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 900; }
.ttr-flag { font-size: 20px; }
.ttr-spacer { flex: 1; }
.ttr-status { font-size: 12px; color: var(--green); font-weight: 800; display: flex; align-items: center; gap: 5px; }
.ttr-status.translating { color: var(--accent); }

.translate-loading-bar { height: 3px; background: var(--border); overflow: hidden; flex-shrink: 0; display: none; }
.translate-loading-bar.show { display: block; }
.tlb-fill { height: 100%; background: linear-gradient(90deg, var(--accent), #8B85FF); border-radius: 20px; width: 0%; transition: width 0.25s ease; }

.translate-body { flex: 1; display: flex; overflow: hidden; }
.trans-col { flex: 1; display: flex; flex-direction: column; overflow: hidden; border-right: 1px solid var(--border); }
.trans-col:last-child { border-right: none; }
.trans-col-header { padding: 10px 18px; border-bottom: 1px solid var(--border); background: var(--bg); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
.tc-label { font-size: 11px; font-weight: 900; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; display: flex; align-items: center; gap: 6px; }
.tc-copy-btn { padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; cursor: pointer; border: 1px solid var(--border); background: transparent; color: var(--muted); font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
.tc-copy-btn:hover { background: var(--accent); color: white; border-color: var(--accent); }
.trans-scroll { flex: 1; overflow-y: auto; padding: 16px 18px; }
.trans-scroll::-webkit-scrollbar { width: 3px; }
.trans-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
.trans-segment { display: flex; gap: 10px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
.trans-segment:last-child { border-bottom: none; }
.trans-time { font-size: 10px; font-weight: 900; color: var(--accent); white-space: nowrap; margin-top: 2px; min-width: 32px; }
.trans-text { font-size: 13px; line-height: 1.75; color: var(--text); outline: none; flex: 1; border: 1.5px solid transparent; border-radius: 6px; padding: 2px 4px; transition: border-color 0.15s, background 0.15s; }
.trans-text:focus { border-color: var(--accent-mid); background: var(--accent-lt); }
.trans-text.translating-anim { color: var(--muted); font-style: italic; }

.translate-panel { width: 210px; flex-shrink: 0; background: var(--surface); border-left: 1px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; }
.translate-panel::-webkit-scrollbar { width: 3px; }
.translate-panel::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
.trp-section { padding: 14px 16px; border-bottom: 1px solid var(--border); }
.trp-label { font-size: 10px; font-weight: 900; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px; }
.done-langs { display: flex; flex-wrap: wrap; gap: 5px; }
.done-lang-pill { font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 20px; background: var(--green-lt); color: var(--green); display: flex; align-items: center; gap: 4px; }

.export-format-btn { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 9px; border: 1.5px solid var(--border); margin-bottom: 6px; cursor: pointer; transition: all 0.12s; background: transparent; }
.export-format-btn:hover { border-color: var(--accent); background: var(--accent-lt); }
.export-format-btn.on { border-color: var(--accent); background: var(--accent-lt); }
.efb-icon { font-size: 18px; }
.efb-info { flex: 1; }
.efb-name { font-size: 12px; font-weight: 800; }
.efb-desc { font-size: 10px; color: var(--muted); }
.efb-check { color: var(--accent); font-weight: 900; font-size: 13px; }

.trp-toggle-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 9px; }
.trp-toggle-label { font-size: 12px; color: var(--text); }
.export-translate-btn { width: 100%; padding: 11px; background: var(--green); color: white; border: none; border-radius: 10px; font-size: 13px; font-weight: 900; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 6px; }
.export-translate-btn:hover { background: #15803D; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(22,163,74,0.3); }
</style>
