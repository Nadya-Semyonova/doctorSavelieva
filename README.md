Стек: 
# React 19.2 + TypeScript + Vite
# ESLint (Airbnb) + Prettier + Stylelint

# ДЛЯ РАЗРАБОТЧИКОВ:
Перед началом работы:
# Установите зависимости 
npm ci

После выполнения работы провести проверки:
# Проверить все файлы на ошибки
npm run lint

# Автоматически исправить ошибки (где возможно)
npm run lint:fix

# Отформатировать все файлы в проекте
npm run format

# Проверить все CSS/SCSS файлы
npm run stylelint

# Автоматически исправить ошибки
npm run stylelint:fix

# АРХИТЕКТУРА
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── DoctorInfo.tsx
│   ├── Gallery.tsx
│   └── ContactForm.tsx
├── pages/
│   └── HomePage.tsx
├── assets/
│   └── (пусто, сюда потом кинешь фото)
├── App.tsx
└── main.tsx

src/
├── app/                         # Инициализация приложения
│   ├── App.tsx                  # Корневой компонент приложения
│   └── App.css                  # Глобальные стили App
│
├── layouts/                     # Каркас страницы
│   ├── MainLayout.tsx           # Общий layout: Header + main + Footer
│   ├── Header/
│   │   └── Header.tsx           # Шапка сайта (навигация)
│   └── Footer/
│       └── Footer.tsx           # Подвал сайта
│
├── pages/                       # Страницы приложения
│   └── HomePage.tsx             # Главная страница (композиция секций)
│
├── sections/                    # Смысловые секции лендинга
│   ├── Hero/
│   │   ├── Hero.tsx             # Заголовок врача
│   │   └── Hero.css
│   │
│   ├── About/
│   │   ├── About.tsx            # Информация о докторе
│   │   └── About.css
│   │
│   ├── Benefit/
│   │   ├── Benefit.tsx          # Блок о пользе онлайн консультации
│   │   └── Benefit.css
│   │
│   ├── Appointment/
│   │   ├── Appointment.tsx      # Блок записи на приём
│   │   └── Appointment.css
│   │
│   ├── Reviews/
│   │   ├── Reviews.tsx          # Отзывы пациентов
│   │   └── Reviews.css
│   │
│   ├── Links/
│   │   ├── Links.tsx            # Полезные ссылки / соцсети
│   │   └── Links.css
│   │
│   └── Address/
│       ├── Address.tsx          # Адрес и контакты
│       └── Address.css
│
├── shared/                      # Переиспользуемый код (без бизнес-логики)
│   ├── ui/                      # UI-компоненты (атомы)
│   │   └── Button/
│   │       ├── Button.tsx       # Универсальная кнопка
│   │       └── Button.css
│   │
│   ├── assets/                  # Изображения, иконки, статические файлы
│   └── lib/                     # Вспомогательные функции и утилиты
│
├── styles/                      # Глобальные стили и переменные
├── types/                       # Общие TypeScript-типы
│
├── index.css                    # Базовые стили (reset)
└── main.tsx                     # Точка входа (bootstrap React)