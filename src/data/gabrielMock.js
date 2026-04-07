export const record = {
  title: 'Interview with Gabriel (sample)',
  duration: 18 * 60 + 42,
}

export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export const paragraphs = [
  {
    speaker: 0,
    speakerLabel: 'Ruby',
    startTime: 0,
    endTime: 12,
    text:
      "…we're wanting to hopefully hear more about you and your journey as a content creator.",
  },
  {
    speaker: 1,
    speakerLabel: 'Gabriel',
    startTime: 12,
    endTime: 75,
    text:
      "People are watching social media for one of two reasons: either to be educated or to be entertained. A lot of creators fail because they're failing to provide value—entertainment value or educational value.",
  },
  {
    speaker: 1,
    speakerLabel: 'Gabriel',
    startTime: 75,
    endTime: 140,
    text:
      "I'm in the educational field, but I don't even watch videos in my own field. I'm usually watching things that entertain me—so I try to make my content entertaining too.",
  },
  {
    speaker: 1,
    speakerLabel: 'Gabriel',
    startTime: 140,
    endTime: 215,
    text:
      "The videos that do well are the ones I put a lot of effort into—and the effort is subconsciously noticed. Just get to the point. Don't waste my time.",
  },
  {
    speaker: 1,
    speakerLabel: 'Gabriel',
    startTime: 215,
    endTime: 310,
    text:
      "Short content has to be quick, catchy, constantly moving. The creators that do well in short form actually create for short form—not just a random 60-second cut from long-form.",
  },
  {
    speaker: 0,
    speakerLabel: 'Ruby',
    startTime: 310,
    endTime: 335,
    text:
      "…what does doing a good job mean to you before you publish something?",
  },
  {
    speaker: 1,
    speakerLabel: 'Gabriel',
    startTime: 335,
    endTime: 440,
    text:
      "I only make content that I wish existed. I watch it until I can say: 'This is good—I would watch this.' Then I publish.",
  },
  {
    speaker: 1,
    speakerLabel: 'Gabriel',
    startTime: 440,
    endTime: 520,
    text:
      "Anybody who continues to post at a relatively matching quality for your niche—you will absolutely grow. Absolutely, 100%.",
  },
]

export const contentItems = [
  {
    name: 'Summary',
    results: [
      {
        body: `## What Gabriel optimizes for\n- Viewers come for **education** or **entertainment**.\n- Most creators fail because they don’t provide value in either.\n\n## What “good” looks like\n- “Effort is subconsciously noticed.”\n- Cut the filler—**get to the point**.\n\n## Long vs short-form\n- Shorts need to be **quick, catchy, constantly moving**.\n- Don’t just clip long-form; create for the platform.\n\n## Publishing bar\n- He only publishes when he’d personally watch it.\n- Consistency + at least median quality leads to growth over time.`,
      },
    ],
  },
  {
    name: 'Quotes',
    results: [
      {
        body: `- “People are watching social media for one of two reasons: either to be educated or to be entertained.”\n- “The videos that do well are the ones I put a lot of effort into—and the effort is subconconsciously noticed.”\n- “Short content has to be quick, catchy, constantly be moving.”\n- “Anybody who continues to post… you will absolutely grow. Absolutely, 100%.”`,
      },
    ],
  },
  {
    name: 'Chapters',
    results: [
      {
        body: `### 1) Why most creators fail\nEducation vs entertainment; value gap.\n\n### 2) Effort and pacing\nCut the filler. Hook early.\n\n### 3) Long-form vs short-form\nPlatform-native short content.\n\n### 4) Publishing standard\nOnly publish what you’d watch yourself.\n\n### 5) Consistency over time\nMedian quality + consistency = growth.`,
      },
    ],
  },
]

