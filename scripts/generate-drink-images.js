const { chromium } = require('playwright')
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images', 'coffee')

const DRINKS = [
  {
    id: 'espresso',
    name: 'Espresso',
    prompt: `Generate an ultra-realistic overhead photograph of a freshly pulled double espresso shot in a small white ceramic demitasse cup on a saucer. Rich golden-brown crema on top with tiger-stripe patterns. Shot from a 45-degree angle on a dark walnut wooden surface. Warm natural morning light from the left side. Shallow depth of field. The image should look like it was taken with a Canon EOS R5, 50mm f/1.4 lens. Square aspect ratio. No text, no watermarks, no people, no hands.`
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    prompt: `Generate an ultra-realistic photograph of a macchiato in a small white ceramic cup. A double espresso with a small dollop of velvety milk foam on top, creating a beautiful contrast between the dark espresso and white foam. Shot from a 45-degree angle on a light marble surface. Soft natural light. Shallow depth of field. Professional food photography style, Canon EOS R5, 85mm f/1.8 lens. Square aspect ratio. No text, no watermarks, no people, no hands.`
  },
  {
    id: 'cortado',
    name: 'Cortado',
    prompt: `Generate an ultra-realistic photograph of a cortado in a small clear glass tumbler (Gibraltar glass). Equal parts espresso and steamed milk, showing beautiful layers — dark espresso on the bottom blending into warm milk on top. Shot from a 45-degree angle on a clean light wooden surface. Warm morning sunlight. Shallow depth of field. Professional food photography, Canon EOS R5, 50mm f/1.4 lens. Square aspect ratio. No text, no watermarks, no people, no hands.`
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    prompt: `Generate an ultra-realistic overhead photograph of a flat white coffee in a wide white ceramic cup. Beautiful latte art — a delicate fern/rosetta pattern in glossy microfoam. The milk is perfectly integrated with espresso creating a caramel-brown surface. Shot from directly above on a light concrete surface. Soft diffused natural light. Professional food photography, Canon EOS R5, 35mm f/1.4 lens. Square aspect ratio. No text, no watermarks, no people, no hands.`
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    prompt: `Generate an ultra-realistic photograph of a classic cappuccino in a round white ceramic cup on a saucer. Thick velvety foam on top with a beautiful tulip latte art pattern. The foam has a glossy, paint-like texture. Shot from a 30-degree angle on a warm wooden cafe table. Golden morning sunlight streaming in. Shallow depth of field. Professional food photography, Canon EOS R5, 85mm f/1.8 lens. Square aspect ratio. No text, no watermarks, no people, no hands.`
  },
  {
    id: 'latte',
    name: 'Latte',
    prompt: `Generate an ultra-realistic photograph of a cafe latte in a tall clear glass. Showing beautiful gradient layers — dark espresso at the bottom transitioning through caramel brown to creamy steamed milk with a thin layer of microfoam on top. Shot from a slight angle on a clean white marble surface. Bright natural light. Professional food photography, Canon EOS R5, 50mm f/1.4 lens. Square aspect ratio. No text, no watermarks, no people, no hands.`
  },
  {
    id: 'americano',
    name: 'Americano',
    prompt: `Generate an ultra-realistic photograph of an Americano coffee in a large white ceramic mug. Clear dark coffee with a thin layer of golden crema floating on top. The coffee has a deep amber-brown color showing its clarity. Shot from a 45-degree angle on a dark slate surface. Warm natural side lighting. Shallow depth of field. Professional food photography, Canon EOS R5, 85mm f/1.8 lens. Square aspect ratio. No text, no watermarks, no people, no hands.`
  },
  {
    id: 'my-cappuccino',
    name: 'My Cappuccino (Wet Cap)',
    prompt: `Generate an ultra-realistic overhead photograph of a large wet cappuccino in a wide white ceramic cup. More milk than a traditional cappuccino — silky, glossy microfoam with a detailed rosetta latte art pattern. The foam is thin and velvety, not dry or stiff. A few whole coffee beans scattered on the saucer. Shot from directly above on a warm oak wooden table. Golden hour natural light. Professional food photography, Canon EOS R5, 35mm f/1.4 lens. Square aspect ratio. No text, no watermarks, no people, no hands.`
  },
  {
    id: 'my-honey-lavender',
    name: 'My Honey Lavender Latte',
    prompt: `Generate an ultra-realistic photograph of a honey lavender latte in a tall clear glass. Creamy oat milk latte with a subtle purple-lavender tint. A drizzle of golden honey on top of the foam. A few dried lavender sprigs as garnish resting on the foam. Shot from a 45-degree angle on a light wooden surface with soft natural light. Beautiful bokeh in the background. Professional food photography, Canon EOS R5, 85mm f/1.8 lens. Square aspect ratio. No text, no watermarks, no people, no hands.`
  }
]

const CDP_PORT = 9333
const PROFILE_DIR = path.join(process.env.HOME, '.crustandbloom-chrome-profile')

function askUser(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans) }))
}

function launchChrome() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  const chromeProcess = spawn(chromePath, [
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${PROFILE_DIR}`,
    '--no-first-run',
    '--no-default-browser-check',
    'https://gemini.google.com/app',
  ], { stdio: 'ignore', detached: true })
  chromeProcess.unref()
  return chromeProcess
}

async function waitForCDP(maxWait = 30000) {
  const start = Date.now()
  while (Date.now() - start < maxWait) {
    try {
      const resp = await fetch(`http://localhost:${CDP_PORT}/json/version`)
      if (resp.ok) return true
    } catch {}
    await new Promise(r => setTimeout(r, 500))
  }
  return false
}

async function run() {
  const pending = DRINKS.filter(d => {
    const dest = path.join(IMAGE_DIR, `drink-${d.id}.jpg`)
    return !(fs.existsSync(dest) && fs.statSync(dest).size > 5000)
  })

  const done = DRINKS.length - pending.length
  console.log(`\n${pending.length} drink images to generate (${done} already exist)\n`)

  if (pending.length === 0) {
    console.log('All drink images already generated!')
    return
  }

  console.log('Launching Chrome with remote debugging...')
  const chromeProc = launchChrome()

  const cdpReady = await waitForCDP()
  if (!cdpReady) {
    console.error('Could not connect to Chrome. Is port 9333 available?')
    process.exit(1)
  }

  console.log('Connected to Chrome via CDP.\n')

  const browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`)
  const context = browser.contexts()[0]

  const pages = context.pages()
  let checkPage = pages.find(p => p.url().includes('gemini.google.com')) || pages[0]
  if (!checkPage.url().includes('gemini.google.com')) {
    await checkPage.goto('https://gemini.google.com/app')
  }
  await checkPage.waitForTimeout(3000)

  const isLoggedIn = await checkPage.getByRole('textbox', { name: /prompt/i }).isVisible().catch(() => false)

  if (!isLoggedIn) {
    console.log('==========================================')
    console.log('  Please sign into Google in the Chrome')
    console.log('  window, then navigate to gemini.google.com')
    console.log('==========================================\n')
    await askUser('Press Enter when you see the Gemini chat page... ')
  }

  let success = 0, fail = 0

  for (let i = 0; i < pending.length; i++) {
    const drink = pending[i]
    const dest = path.join(IMAGE_DIR, `drink-${drink.id}.jpg`)
    const label = `[${i + 1}/${pending.length}]`
    let generated = false

    for (let attempt = 1; attempt <= 3 && !generated; attempt++) {
      let genPage
      try {
        process.stdout.write(`GEN  ${label} ${drink.name} (attempt ${attempt})... `)

        genPage = await context.newPage()
        await genPage.goto('https://gemini.google.com/app', { waitUntil: 'domcontentloaded', timeout: 20000 })
        await genPage.waitForTimeout(2000)

        const input = genPage.getByRole('textbox', { name: /prompt/i })
        await input.waitFor({ state: 'visible', timeout: 10000 })
        await input.click()
        await input.fill(drink.prompt)
        await genPage.waitForTimeout(300)

        const sendBtn = genPage.getByRole('button', { name: /send message/i })
        await sendBtn.click()

        const imgLocator = genPage.locator('img[alt*="AI generated"], img[alt*="Generated image"]')
        await imgLocator.first().waitFor({ state: 'visible', timeout: 90000 })
        await genPage.waitForTimeout(3000)

        const imgData = await genPage.evaluate(() => {
          const img = document.querySelector('img[alt*="AI generated"]') ||
                      document.querySelector('img[alt*="Generated image"]')
          if (!img || img.naturalWidth < 100) return null
          const canvas = document.createElement('canvas')
          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight
          canvas.getContext('2d').drawImage(img, 0, 0)
          return canvas.toDataURL('image/jpeg', 0.92).split(',')[1]
        })

        if (!imgData) throw new Error('Could not extract image data')

        fs.writeFileSync(dest, Buffer.from(imgData, 'base64'))
        const size = Math.round(fs.statSync(dest).size / 1024)
        console.log(`OK ${size}KB`)
        success++
        generated = true
      } catch (e) {
        const msg = e.message.length > 80 ? e.message.substring(0, 80) + '...' : e.message
        console.log(`FAIL: ${msg}`)
        if (attempt < 3) await new Promise(r => setTimeout(r, 3000))
      } finally {
        if (genPage) await genPage.close().catch(() => {})
      }
    }

    if (!generated) {
      fail++
      console.log(`     Skipping ${drink.name} after 3 failed attempts`)
    }

    if (i < pending.length - 1) {
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  await browser.close()

  console.log(`\n${'='.repeat(50)}`)
  console.log(`Results: ${success} generated, ${fail} failed, ${done} pre-existing`)
  console.log(`${'='.repeat(50)}\n`)

  // List generated files
  const generated = DRINKS.filter(d => {
    const fp = path.join(IMAGE_DIR, `drink-${d.id}.jpg`)
    return fs.existsSync(fp) && fs.statSync(fp).size > 5000
  })
  console.log(`Images ready (${generated.length}/${DRINKS.length}):`)
  generated.forEach(d => console.log(`  public/images/coffee/drink-${d.id}.jpg`))

  try { process.kill(-chromeProc.pid) } catch {}
}

run().catch(console.error)
