# Teknisk beskrivning och reflektion – JobChaser

JobChaser är en **fullstack-applikation** som gör det möjligt för användare att söka efter jobbannonser och spara sina egna jobbansökningar.

Arkitekturen i projektet består av tre huvuddelar:

* **Frontend** – React / TypeScript
* **Backend** – API / Node.js / Express
* **Databas** – PostgreSQL

Frontend kommunicerar med backend via **REST API**, och tillgång till skyddad information hanteras med hjälp av **JWT (JSON Web Token)**.



# Systemarkitektur

Projektet är uppdelat i **frontend och backend**.

**Frontend ansvarar för:**

* användargränssnittet
* routing
* hantering av applikationens state
* kommunikation med API

**Backend ansvarar för:**

* logik
* hantering av användare
* hantering av jobbannonser
* autentisering



# Frontend – React

Frontend är byggd med hjälp av biblioteket **React** och **TypeScript**.



# Routing

Routing i applikationen är implementerad med **React Router**.

Applikationen innehåller följande sidor:

* `/signup`
* `/signin`
* `/jobs`

Sidan **/jobs** är skyddad och är endast tillgänglig när användaren är inloggad.
Detta har implementerats med hjälp av en komponent som heter **ProtectedRoute**.



# Hantering av applikationens state

För att hantera globalt state i applikationen används biblioteket **Zustand**.

## Auth Store

Auth Store lagrar information om användaren och JWT-tokenen.

Data som lagras är:

* `user`
* `token`
* `isAuthenticated`

Token sparas i **localStorage**, vilket gör att användaren kan fortsätta vara inloggad även efter att sidan har uppdaterats eller stängts.



# Filter Store

Filter Store gör det möjligt att filtrera jobbannonser.

Filtrering kan göras baserat på:

* text
* plats



# Theme Context

Dark / Light-läge har implementerats med hjälp av **React Context API**.

Contexten innehåller ett globalt state `theme` samt funktionen `toggleTheme()`.

Temat appliceras i applikationen genom att ändra klass på HTML-elementet:

```
document.documentElement.className = theme
```



# Integration med extern API

Applikationen hämtar jobbannonser från ett publikt API:

**JobTech API**

Dessa data kombineras senare med jobbannonser som är sparade lokalt i användarens databas.

Detta gör att användaren kan:

* se jobbannonser från internet
* spara sina egna jobbannonser



# Backend – Node.js och Express

Backend är byggd med hjälp av:

* Node.js
* Express.js



# Autentisering av användare

Autentiseringssystemet är baserat på **JWT**.

För att skapa och verifiera token används biblioteket **jsonwebtoken**.

När användaren loggar in får den en JWT-token som sedan skickas i HTTP-headern:

```
Authorization: Bearer <token>
```

Autentiserings-middleware:

1. läser token
2. verifierar den
3. sparar användarens data



# Säkerhet för lösenord

Användarnas lösenord hashas med hjälp av biblioteket **bcrypt**.

Tack vare detta lagras lösenorden inte i databasen i klartext.



# Databas

För att lagra data används:

* **PostgreSQL**
* **Drizzle ORM**

Databasen innehåller två huvudtabeller:

* users
* jobs

Relationen mellan tabellerna:

* users (1) → (many) jobs

Det betyder att en användare kan ha flera jobbannonser.



# Implementerade extrafunktioner

I projektet har flera funktioner från **extrauppgifter** implementerats:

**Vecka 6**  
  ✅ Formulär för att lägga till jobb (AddJob.tsx)  
  ✅ Kontrollerade inputfält och rensning av formulär efter submit  
  ✅ Loader vid hämtning av jobb (JobsPage.tsx)  

**Vecka 7**  
  ✅ Routing med React Router (/jobs, /signin, /signup, /add-job)  
  ✅ Header/Nav med länkar och logout-knapp  
  ✅ Theme Context med toggle mellan dark/light  

**Vecka 9**  
  ✅ CRUD endpoints för jobb och användare (routes/jobs.ts, routes/users.ts)  
  ✅ RESTful URL och HTTP-metoder  

**Vecka 10**  
  ✅ Signup / Signin (routes/auth.ts)  
  ✅ Hashing av lösenord med bcrypt  
  ✅ JWT generering vid login  
  ✅ Auth-middleware  
  ✅ Begränsning av åtkomst till egna jobb i backend  
  ✅ Lagring av token i frontend (authStore, localStorage)  

**Vecka 11**  
  ✅ Zustand auth-store (login, logout, isAuthenticated)  
  ✅ Zustand filter-store (global filtrering av jobb)  
  ✅ Loading state vid hämtning av jobb  




# Styrkor i projektet

* En styrka i projektet är den tydliga uppdelningen mellan **frontend och backend**.
* En annan styrka är användningen av **TypeScript**, vilket minskar antalet fel i koden.
* En tredje styrka är användningen av **Zustand** för state-hantering eftersom det är ett lätt och enkelt bibliotek.



# Begränsningar och möjliga förbättringar

Trots att applikationen redan har sina grundläggande funktioner finns det flera möjligheter att förbättra den.

En av dem är sättet som **JWT-token lagras**.

* Att lagra token i **localStorage** kan vara mindre säkert.



# Sammanfattning

Projektet JobChaser använder moderna webbteknologier.

Projektet visar också användning av flera viktiga koncept inom modern webbutveckling, till exempel:

* routing
* state-hantering
* REST API
* autentisering av användare
* databashantering


