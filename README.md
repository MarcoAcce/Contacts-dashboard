# Contacts dashboard
 
This repository contains a demo project, completed as a take-home exercise for a job interview.

The project is a simple web dashboard built with Angular and Java SpringBoot. 
It implements crud operations to save a list of contacts on a server-side database, it uses Auth0 for authentication and JWT tokens.

For this demo all data is only saved on an in-memory H2 db so it will not persist, 
also this repository doesn't include the following files needed for execution:
`/contacts-dashboard/contacts-frontend/environments/environments.ts` and 
`/contacts-dashboard/contacts-backend/secrets.properties`.
These files contain the domain and client id needed for the Auth0 integration.

As it was my first time using both Java and spring boot please try not to mind the spaghetti too much.


## Original requirements (italian)

>Realizzare una mini applicazione web full-stack con autenticazione OAuth2 tramite Auth0. L'app deve consentire all'utente autenticato di gestire una lista di contatti (visualizzazione, creazione, modifica, eliminazione).
>
>### Requisiti Funzionali
>
>- Login tramite Auth0 (OAuth2)
>- Accesso alla dashboard solo dopo autenticazione
>- Visualizzazione lista contatti
>- Aggiunta di un nuovo contatto
>- Modifica di un contatto esistente
>- Eliminazione di un contatto
>
>### Requisiti Tecnici
>
>#### Frontend (Angular)
>
>- Angular 15+ con routing
>- Servizi per comunicazione con API
>- Gestione token JWT (ricezione, salvataggio, invio nelle richieste HTTP)
>- UI base ma chiara, con validazioni dei form
>
>#### Backend (Java - Spring Boot)
>
>- Spring Boot con REST API
>- Integrazione con Auth0 come Resource Server
>- Protezione degli endpoint con token JWT
>- API CRUD per entità "contatto"
>- Dati gestiti in memoria (es. lista interna o H2 database)
