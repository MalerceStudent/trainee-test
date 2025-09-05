# Trainee Train Schedule Project

Це навчальний проект для управління розкладом потягів з авторизацією користувачів.  
Проект включає фронтенд на Next.js, бекенд на NestJS і базу даних PostgreSQL.

## Технології

- **Frontend:** Next.js, React, TypeScript, TailwindCSS, React Query  
  Деплой: **Vercel** ([посилання на фронтенд](https://trainee-test.vercel.app))  

- **Backend:** NestJS, TypeORM, PostgreSQL  
  Деплой: **Render** ([посилання на бекенд](https://trainee-test.onrender.com))  

- **Database:** PostgreSQL  
  Хостинг: **Neon**  

## Функціонал

- Реєстрація та авторизація користувачів (JWT)
- Перегляд списку потягів, додавання, редагування, видалення
- Фільтрація потягів за номером, назвою, відправкою та прибуттям
- Валідація форм: 
  - `From` та `To` не можуть збігатися  
  - `Departure` менший за `Arrival`

