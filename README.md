# Fullstack Platform – React Native, React & Backend API

Ett komplett fullstackprojekt med gemensam backend och databas.  
Projektet består av två separata frontend-applikationer som delar samma backend men har olika användningsområden.

Den offentliga informationsplattformen är byggd i **React Native med TypeScript**, medan det interna systemet **Care Notes** är byggt i **React (JavaScript)**.  
Backenden är utvecklad i **C# (.NET Web API)** och är kopplad till en **PostgreSQL-databas**.

Projektet använder **GitHub Actions** för CI, där build och integrationstester körs automatiskt vid push och pull request.

---

## Projektöversikt

- Offentlig informationsplattform (React Native, TypeScript, Expo)
- Internt system – Care Notes (React, JavaScript)
- Gemensam backend i C# (.NET Web API)
- PostgreSQL-databas
- Databasstyrt innehåll via REST API
- CI med GitHub Actions (build och tester vid push och pull request)
- Grundstruktur för roller, behörigheter och inloggning

---

## Struktur i repot

- `frontend/` – React Native informationsplattform
- `CareNotes/` – Internt React-system
- `backend/` – .NET Web API
- `Api.IntegrationTests/` – Integrationstester
- `.github/workflows/` – GitHub Actions workflows för build och test

---

## Syfte

- En gemensam backend som kan användas av flera klienter
- Tydlig separation mellan publik och intern funktionalitet
- Skalbar och strukturerad fullstack-arkitektur
- Automatiserat arbetsflöde med CI och testning
