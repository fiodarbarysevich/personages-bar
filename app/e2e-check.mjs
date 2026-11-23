import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:5199'
mkdirSync('shots', { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`))

// 1. Главная: hero должен занимать весь экран («О баре» не видно)
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(900)
await page.screenshot({ path: 'shots/1-home-hero.png' })
const aboutVisible = await page.locator('h2:has-text("О баре")').isVisible()
console.log('ABOUT BLOCK VISIBLE WITHOUT SCROLL:', aboutVisible)

// Автоскролл афиши: проверяем, что scrollLeft лент меняется сам
await page.waitForTimeout(600)
const scrollSample = await page.evaluate(() => {
  const rows = [...document.querySelectorAll('.overflow-x-auto')]
  return rows.map((r) => r.scrollLeft)
})
await page.waitForTimeout(1200)
const scrollSample2 = await page.evaluate(() => {
  const rows = [...document.querySelectorAll('.overflow-x-auto')]
  return rows.map((r) => r.scrollLeft)
})
console.log('AUTOSCROLL CHANGED:', JSON.stringify(scrollSample), '->', JSON.stringify(scrollSample2))

// Скролл главной вниз
const scroller = page.locator('#root .overflow-y-auto').first()
await scroller.evaluate((el) => el.scrollTo({ top: 1100, behavior: 'instant' }))
await page.waitForTimeout(700)
await page.screenshot({ path: 'shots/1-home-events.png' })

// 2. Параметры брони
await page.click('text=Забронировать стол >> nth=0')
await page.waitForTimeout(700)
const slot = page.locator('button:has-text("19:00")')
if (await slot.isEnabled()) await slot.click()
else await page.locator('.grid button:not([disabled])').first().click()
await page.waitForTimeout(300)
await page.screenshot({ path: 'shots/2-params.png' })

// 3. План зала
await page.click('text=Выбрать место')
await page.waitForTimeout(800)
await page.screenshot({ path: 'shots/3-map.png' })

// Стол 4
await page.click('button[aria-label*="Стол 4"]')
await page.waitForTimeout(700)
await page.screenshot({ path: 'shots/3-map-sheet.png' })
await page.click('text=Подтвердить выбор')
await page.waitForTimeout(700)

// 4. Форма без чекбокса
await page.fill('input[placeholder*="Как к вам"]', 'Александр')
await page.locator('input[inputmode="tel"]').fill('+375291234567')
await page.waitForTimeout(300)
await page.screenshot({ path: 'shots/4-confirm.png' })
await page.click('text=Забронировать')
await page.waitForTimeout(1800)
await page.screenshot({ path: 'shots/5-ticket.png' })
console.log('FLOW: бронирование завершено, URL =', page.url())

// 5. Барный стул на 1 гостя
await page.click('text=На главную')
await page.waitForTimeout(500)
await page.click('text=Забронировать стол >> nth=0')
await page.waitForTimeout(500)
await page.click('button[aria-label="Меньше гостей"]') // 2 -> 1 гость
const slot2 = page.locator('button:has-text("20:00")')
if (await slot2.isEnabled()) await slot2.click()
else await page.locator('.grid button:not([disabled])').first().click()
await page.click('text=Выбрать место')
await page.waitForTimeout(700)
await page.click('button[aria-label*="Барный стул 2"]')
await page.waitForTimeout(700)
await page.screenshot({ path: 'shots/6-bar-stool.png' })
console.log('STOOL FLOW OK:', await page.locator('text=Барный стул 2').isVisible())

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'NO PAGE ERRORS')
await browser.close()
