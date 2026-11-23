import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:5199'
mkdirSync('shots', { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`))

// 1. Главная
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await page.screenshot({ path: 'shots/1-home-hero.png' })
await page.mouse.wheel(0, 700)
await page.waitForTimeout(600)
await page.mouse.wheel(0, 700)
await page.waitForTimeout(600)
await page.screenshot({ path: 'shots/1-home-events.png' })

// 2. Параметры брони
await page.click('text=Забронировать стол >> nth=0')
await page.waitForTimeout(700)
await page.screenshot({ path: 'shots/2-params.png' })

// Выбрать первый доступный слот времени
const slot = page.locator('button:has-text("19:00")')
if (await slot.isEnabled()) await slot.click()
else await page.locator('.grid button:not([disabled])').first().click()
await page.waitForTimeout(300)

// +1 гость
await page.click('button[aria-label="Больше гостей"]')
await page.waitForTimeout(200)
await page.screenshot({ path: 'shots/2-params-filled.png' })

// 3. План зала
await page.click('text=Выбрать место')
await page.waitForTimeout(800)
await page.screenshot({ path: 'shots/3-map.png' })

// Тап по занятому/малому — пробуем стол 4 (6 мест)
await page.click('button[aria-label*="Стол 4"]')
await page.waitForTimeout(700)
await page.screenshot({ path: 'shots/3-map-sheet.png' })

// 4. Подтверждение
const confirmBtn = page.locator('text=Подтвердить выбор')
if (await confirmBtn.count()) {
  await confirmBtn.click()
  await page.waitForTimeout(700)
  await page.fill('input[placeholder*="Как к вам"]', 'Александр')
  await page.locator('input[inputmode="tel"]').fill('+375291234567')
  await page.locator('input[type="checkbox"]').check()
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'shots/4-confirm.png' })
  await page.click('text=Забронировать')
  await page.waitForTimeout(1800)
  await page.screenshot({ path: 'shots/5-ticket.png' })
  console.log('FLOW: бронирование завершено, URL =', page.url())
} else {
  console.log('FLOW: bottom-sheet не открылся (стол 4 недоступен?) — пробуем другой')
  await page.click('button[aria-label*="Стол 1"]:not([disabled])').catch(() => {})
}

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'NO PAGE ERRORS')
await browser.close()
