# Fullstack Platform – React Native, React & C# Backend API

## Projektbeskrivning

Detta projekt består av två separata frontend-applikationer som delar samma backend och databas, men har olika syften och användargrupper.

Backenden är byggd i **C# med ASP.NET Core** och exponerar ett REST API.  
All data lagras i en **PostgreSQL-databas** och nås av båda frontend-applikationerna via API:et.

---

## 1. Informationsplattform (offentlig)

En kommunliknande informationsplattform byggd med **React Native och TypeScript**.  
Plattformen är avsedd för allmänheten och används för att visa:

- Sidor och innehåll
- Nyheter
- Kategorier
- Drift- och statusinformation

All information hämtas dynamiskt från databasen via backend-API:et.

---

## 2. Care Notes (internt system)

Ett separat internt system byggt med **React och JavaScript**.  
Care Notes är avsett för inloggade användare och används för:

- Avvikelsehantering
- Dokumentation
- Anteckningar
- Intern uppföljning
- Bemötandeplaner och journalföring

Care Notes delar **samma C# backend och PostgreSQL-databas** som informationsplattformen, men har egen frontend, eget användarflöde och egna vyer anpassade för intern användning.

---

## Syfte och mål

- Skapa en gemensam backend som kan återanvändas av flera frontend-klienter
- Separera offentligt och internt innehåll tydligt
- Möjliggöra strukturerad dokumentation och uppföljning
- Bygga en skalbar fullstack-lösning med tydlig arkitektur

---

## Tech stack

### Frontend – Informationsplattform
- React Native
- TypeScript

### Frontend – Care Notes
- React
- JavaScript

### Backend
- C#
- ASP.NET Core
- REST API

### Databas
- PostgreSQL

---

## Funktionell inriktning

- Dynamisk datalagring och hämtning via API
- Rollbaserat användarflöde i Care Notes
- Delad backend för flera klienter
- Tydlig separation mellan publik och intern funktionalitet
