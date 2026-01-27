# Fullstack Platform – React Native, React & Backend API

## Projektbeskrivning
Detta projekt består av **två separata frontend-applikationer** som delar **samma backend och databas**, men har olika syften.

### 1. Informationsplattform (offentlig)
En kommunliknande informationsplattform byggd med **React Native och TypeScript**.  
Plattformen är tänkt för allmänheten och visar sidor, nyheter, kategorier och driftinformation som hämtas dynamiskt från databasen via API.

### 2. Care Notes (internt system)
Ett **separat internt system** byggt med **React och JavaScript**.  
Care Notes är avsett för inloggade användare och används för:
- Avvikelsehantering  
- Dokumentation  
- Anteckningar  
- Intern uppföljning  

Care Notes delar backend och databas med informationsplattformen men har **egen frontend och eget användarflöde**.

---

## Syfte och mål
- Bygga en komplett fullstacklösning med flera frontend-appar  
- Separera publik information från interna system  
- Databasstyrt innehåll via API  
- Skalbar och tydlig arkitektur  
- Återanvändbar backend  
- Förbereda för inloggning, roller och behörigheter  

---

## Tech stack

### Frontend – Informationsplattform
- React Native  
- TypeScript  
- Expo  

### Frontend – Care Notes
- React  
- JavaScript  

### Backend
- C# (.NET Web API)  
- REST API  

### Databas
- SQL (PostgreSQL)

---

## Funktionell inriktning
- Databasstyrda sidor och innehåll  
- Nyheter och kategorier  
- Global sökfunktion  
- Innehållsbaserad navigering  
- Intern dokumentation och avvikelsehantering  
- Grund för framtida adminfunktioner  
