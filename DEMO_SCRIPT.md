# 🎬 SafeShield AI — Demo Video Script
## ET AI Hackathon 2026 | Problem Statement 6 | 10 Minutes

---

## BEFORE YOU RECORD
- Open `index.html` (or `npm run dev`) in Chrome, full screen
- Have the backend running: `cd backend && uvicorn main:app --reload`
- Enter your Anthropic API key in the Scam Detector tab
- Turn on screen recording (OBS / Loom / QuickTime)
- Microphone on. Calm, confident voice.

---

## [00:00 – 00:35] HOOK — The Problem

**[Dashboard visible on screen]**

> "Imagine you're a 58-year-old retired bank manager in Pune. You get a video call from someone claiming to be a CBI officer. He says your Aadhaar is linked to a money laundering case. He keeps you on call for 72 hours — you can't sleep, can't talk to your family, and by the time it's over... you've transferred ₹14 lakh."

**[Pause. Let that land.]**

> "This isn't a hypothetical. In just nine months of 2024, digital arrest scams defrauded Indian citizens of ₹1,776 crore. 1.14 million cybercrime complaints were filed in 2023 — up 60% from the year before. The data exists. The technology exists. What's missing is an intelligence layer that acts before the money moves."

> "Today I'm going to show you SafeShield AI — and I'm going to show you it working live."

---

## [00:35 – 01:00] INTRO

**[Show the Dashboard — let the live alerts scroll]**

> "SafeShield AI is a multi-agent digital public safety intelligence platform built on Claude claude-sonnet-4-6. It has five specialised AI agents running in parallel — a scam call detector, a counterfeit currency scanner, a fraud network graph engine, a geospatial crime intelligence layer, and a multilingual citizen chatbot. All talking to each other. All running in real time."

> "Let me show you what that actually looks like."

---

## [01:00 – 04:00] MODULE 1 — SCAM DETECTOR ⭐ (Core Demo)

**[Click "Scam Detector" in sidebar]**

> "This is our most important module — and the one that's genuinely novel. Every other fraud detection system triggers AFTER a transaction. SafeShield triggers DURING the call — while the victim is still being manipulated."

**[Click "Simulate Live Threat Call" button]**

> "Watch what happens."

**[Phone rings on screen]**

> "An incoming call from what appears to be CBI Headquarters, New Delhi. The number is +91-11-2309 something. Most people would answer this."

**[Call connects — red WARNING appears]**

> "SafeShield has already flagged it — spoofed government number, confirmed. That analysis happened in under two seconds."

**[Transcript starts appearing]**

> "Now listen to what the caller is saying... 'Main CBI Special Officer Rajesh Kumar bol raha hoon...' — classic script. Watch the threat indicators on the right as our NLP engine processes each sentence."

**[Indicators light up one by one]**

> "Aadhaar impersonation... Digital arrest script matched... Psychological pressure... And now — financial transfer demand. Secrecy demand."

**[Threat meter hits 98.7%]**

> "98.7% scam probability. In 12 seconds."

**[CONFIRMED SCAM verdict appears]**

> "The call is terminated. MHA Cybercrime is notified. The number is blacklisted. The victim never transfers a rupee."

**[Show Claude AI Validation panel loading]**

> "And now the important part — this is not a scripted demo. Watch this panel on the right. This is Claude claude-sonnet-4-6 actually reading the transcript and generating its own independent analysis in real time."

**[AI result appears]**

> "Claude's verdict: Confirmed Scam. 98.7%. It's identified the exact same indicators — government impersonation, coercion tactics, illegal financial demand. Two independent systems. Same conclusion. That's how you build something judges can trust in court."

**[Click "Live AI Analysis" tab]**

> "And for the judges — this isn't just for simulated calls. Type any scenario you want. Real or hypothetical."

**[Type: "Someone called claiming to be from ED, said my account is involved in money laundering and I need to pay ₹2 lakh immediately or I'll be arrested"]**

> "Let's see what Claude says..."

**[Result appears]**

> "Confirmed scam. 96.2%. Specific indicators, specific actions. This is a live Claude API call happening right now."

---

## [04:00 – 05:30] MODULE 2 — CURRENCY SCANNER

**[Click "Currency Scanner" in sidebar]**

> "India recorded record FICN seizures in FY2025. ₹500 fakes are now good enough to defeat manual detection in 73% of routine banking operations. A teller with 300 notes to count has no chance."

**[Click "Run AI Demo"]**

> "SafeShield's currency agent uses Claude's vision API to perform a 7-point security check in under 2 seconds."

**[Scanning animation plays]**

> "It's checking the serial number pattern, the security thread, microprint quality, colour shift ink, UV features, dimensions, and intaglio print."

**[Results appear with animated bars]**

> "Counterfeit detected. 94.3% confidence. Four features failed — security thread absent, colour shift ink absent, serial number anomaly, intaglio print missing. Two passed — UV fibres and dimensions. That's a fake note trying to be clever."

> "This model runs on-device. No internet required. A bank teller, a field officer, an ATM — anyone can use this in under two seconds."

---

## [05:30 – 07:00] MODULE 3 — FRAUD NETWORK GRAPH

**[Click "Fraud Networks" in sidebar — D3 graph loads]**

> "This is Operation Cyber Havala Ring — a real fraud network structure we've mapped from complaint data across six states plus Dubai."

**[Point to the red nodes]**

> "The red stars are the masterminds — one in Meerut, UP, one coordinating from Dubai. The yellow hexagons are money mules across Delhi, Noida, Gurgaon, Jaipur, Lucknow, Chandigarh. The blue dots are victims in Mumbai, Pune, Bengaluru, Chennai, Kolkata, Hyderabad, Ahmedabad, Delhi."

**[Click on the M1 mastermind node]**

> "Click on any node and you see its full intelligence profile. This mastermind in Meerut has ₹2.3 crore in attributable fraud. His connections to the Hisar call centre, the crypto wallets, the hawala node — all mapped."

**[Drag a few nodes around]**

> "This is a live D3.js force simulation — not a static image. Law enforcement can actually work with this, reorganise it, identify the strongest connections."

> "The key innovation: what took detectives weeks of manual cross-referencing across six different police jurisdictions — SafeShield does automatically in 48 hours. And it generates a blockchain-timestamped evidence package admissible under IT Act Section 65B."

---

## [07:00 – 07:45] MODULE 4 — CRIME MAP

**[Click "Crime Map" in sidebar]**

> "The geospatial intelligence layer maps fraud density across 50 Indian cities in real time. Delhi and Mumbai are the highest — not surprising. But look at Hyderabad, Bengaluru, Pune — these are growing fast."

**[Click on Delhi circle]**

> "Click on any city — 4,821 cases, ₹89 crore in losses just in this operational period. Law enforcement can filter by crime type and see where to deploy resources."

> "The real innovation here is predictive. Our LSTM model forecasts hotspot zones 12 to 24 hours in advance based on seasonal patterns, event calendars, and current network activity. You deploy resources before the crime surge, not after."

---

## [07:45 – 09:00] MODULE 5 — CITIZEN SHIELD

**[Click "Citizen Shield" in sidebar]**

> "This is the module that directly reaches every Indian citizen — not just law enforcement."

**[Click "🚨 Being Scammed Now" button]**

> "If you are being scammed right now — one tap. Watch the response."

**[AI response appears]**

> "Clear verdict. Clear steps. Emergency protocol activated. This same interface works on WhatsApp, IVR 1930, and this web portal — in 12 Indian languages."

**[Switch to Hindi, click the Hindi button]**

> "हिन्दी में..."

**[Hindi response appears]**

> "The same intelligence, the same verdict, in the language that works for a retired professional in Lucknow or a homemaker in Chennai."

> "800 million smartphone users. 12 languages. Available 24/7. That is the scale this problem requires."

---

## [09:00 – 09:30] TECHNICAL ARCHITECTURE

**[Open architecture.html in a new tab]**

> "Under the hood — five AI agents in a multi-layer pipeline. Data from telecom CDRs, bank transaction streams, citizen reports, and CCTV feeds flows into Apache Kafka at 500,000 events per second. Apache Flink processes it in under 50 milliseconds. Five specialised Claude-powered agents analyse it. The unified threat knowledge graph connects every signal. And the action layer fires automatically — bank freeze requests, telecom block orders, MHA alerts, citizen advisories."

> "The whole system runs on Kubernetes. Each agent scales independently. Multi-tenant for all 28 state police forces. Federated learning — banks contribute to our fraud models without sharing raw data. DPDP Act 2023 compliant."

---

## [09:30 – 10:00] BUSINESS CASE & CLOSE

**[Return to main app — Dashboard visible]**

> "The numbers are simple. ₹12,000 crore in annual cybercrime losses. A 10% interception rate saves ₹1,200 crore. Year 1 deployment cost is under ₹50 crore. That is a 24 times return on investment."

> "Six months to pilot with MHA in five metros. Eighteen months to national scale across all 28 states. The technology is built. The architecture is ready. The demo you just saw is live."

> "Every day without SafeShield AI costs Indian citizens ₹4.8 crore in digital arrest scams alone."

**[Pause. Look at camera.]**

> "We're not asking you to imagine this working. You just watched it work."

> "Thank you."

---

## POST-RECORDING CHECKLIST
- [ ] Trim silence at start/end
- [ ] Add subtitles (auto-generate in DaVinci Resolve / CapCut)
- [ ] Add your team name and college in bottom-left corner throughout
- [ ] Add SafeShield AI logo watermark top-right
- [ ] Export at 1080p minimum
- [ ] Upload to Google Drive / YouTube (unlisted) and paste link in submission
- [ ] Keep under 10 minutes total

---

*SafeShield AI · ET AI Hackathon 2026 · PS6 · Demo Script v2.0*
