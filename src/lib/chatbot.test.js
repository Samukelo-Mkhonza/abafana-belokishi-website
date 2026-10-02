import { describe, it, expect } from 'vitest'
import { reply, normalise, QUICK_REPLIES, FALLBACK } from './chatbot'
import { ARTISTS } from '../data/artists'
import { RELEASES } from '../data/releases'
import { CONTACT } from '../data/site'

const hrefs = (answer) => answer.links.map((l) => l.href)

describe('normalise', () => {
  it('lower-cases and strips apostrophes, accents and punctuation', () => {
    expect(normalise("  Ngiyam'thanda!! ")).toBe('ngiyamthanda')
    expect(normalise('Café, KZN?')).toBe('cafe kzn')
  })
})

describe('reply', () => {
  it.each([
    ['Who are you?', 'about'],
    ['What does Abafana Belokishi mean?', 'about'],
    ['Who is on the roster?', 'artists'],
    ["What's new?", 'latest'],
    ['Any new songs?', 'latest'],
    ['Where can I listen?', 'stream'],
    ['Is there a Spotify playlist?', 'stream'],
    ['Tell me about the podcast', 'podcast'],
    ['I want to book an artist for my event', 'contact'],
    ['What is your WhatsApp number', 'contact'],
    ['Where are you based?', 'location'],
    ['Are you in KZN?', 'location'],
    ['Do you have Instagram?', 'socials'],
    ['Ngiyabonga', 'thanks'],
  ])('answers %j as %s', (question, intent) => {
    expect(reply(question).intent).toBe(intent)
  })

  it('handles every quick reply without falling back', () => {
    for (const q of QUICK_REPLIES) expect(reply(q).intent, q).not.toBe('fallback')
  })

  it('greets in English and isiZulu', () => {
    for (const q of ['hi', 'Hello there', 'Sawubona', 'sanibonani', 'Yebo']) expect(reply(q).intent, q).toBe('greeting')
  })

  it('prefers a real question over a greeting', () => {
    expect(reply('Hi, where can I listen?').intent).toBe('stream')
  })

  it('knows every artist by name, with their real social links', () => {
    for (const artist of ARTISTS) {
      const answer = reply(`Tell me about ${artist.name}`)
      expect(answer.intent).toBe('artist')
      expect(answer.text).toContain(artist.name)
      expect(hrefs(answer)).not.toContain('#')
      expect(hrefs(answer)).toContain('#artists')
    }
    expect(reply('fergo').text).toMatch(/^King Fergo/)
    expect(reply('assign_za').text).toMatch(/^Assign/)
  })

  it('knows every release by title, with its streaming link', () => {
    for (const release of RELEASES) {
      const answer = reply(release.title)
      expect(answer.intent, release.title).toBe('release')
      expect(answer.text).toContain(release.title)
      expect(hrefs(answer)).toContain(release.links[0].href)
    }
  })

  it('matches titles typed loosely', () => {
    expect(reply('ngiyamthanda').text).toMatch(/^Ngiyam'thanda/)
    expect(reply('legendary').text).toMatch(/^L E G E N D A R Y/)
    expect(reply('your son can rap').text).toMatch(/^Your Son Can Rap - Prelude/)
    expect(reply('amapiano kwa k vol 2').text).toMatch(/^AmaPiano Kwa-K, Vol\. 2/)
  })

  it('lists the newest releases from the catalogue', () => {
    expect(reply("What's new?").text).toContain(RELEASES[0].title)
  })

  it('treats booking an artist as a booking question and names them', () => {
    const answer = reply('How much to book King Fergo?')
    expect(answer.intent).toBe('contact')
    expect(answer.text).toContain('To book King Fergo')
    expect(hrefs(answer)[0]).toContain(encodeURIComponent('book King Fergo'))
    expect(hrefs(answer)).toContain(`mailto:${CONTACT.email}`)
  })

  it('falls back to the contact options instead of guessing', () => {
    for (const q of ['What is the weather like?', '???', '']) {
      const answer = reply(q)
      expect(answer.intent, q).toBe('fallback')
      expect(answer.links).toEqual(FALLBACK.links)
    }
  })

  it('marks only http, mailto and tel links as external', () => {
    const links = [...reply('book').links, ...reply('podcast').links]
    for (const { href, external } of links) expect(external, href).toBe(!href.startsWith('#'))
  })
})
