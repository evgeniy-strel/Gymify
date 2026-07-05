# 🏋️ Gymify

Мобильное PWA-приложение, разработанное с  целью облегчения ведения тренировочных программ в тренажерном зале.

---

## 🛠 Технологии
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![Service Worker](https://img.shields.io/badge/Service_Worker-333333?style=for-the-badge&logo=googlechrome&logoColor=white)
![Push API](https://img.shields.io/badge/Push_API-FF6B6B?style=for-the-badge&logo=webpush&logoColor=white)

## 🚀 Возможности

---

### 💪 Тренировочные программы

Структура тренировок: **Программы → Недели → Дни → Упражнения → Подходы.**

Приложение позволяет:

* отслеживать время тренировки;
* отмечать выполненные подходы и упражнения;
* автоматически запускать таймер отдыха после подхода;
* получать push-уведомление об окончании таймера;
* по окончанию тренировки получить статистику по ней.

<details>
  <summary>Программы/Недели/Дни</summary>
  <p>
    <img src="https://github.com/evgeniy-strel/Gymify/blob/master/readme/programs.jpg?raw=true" width="270">
    <img src="https://github.com/evgeniy-strel/Gymify/blob/master/readme/weeks.jpg?raw=true" width="270">
    <img src="https://github.com/evgeniy-strel/Gymify/blob/master/readme/days.jpg?raw=true" width="270">
  </p>
</details>

<details>
  <summary>Упражнения/Подходы/Результат</summary>
  <p>
    <img src="https://github.com/evgeniy-strel/Gymify/blob/master/readme/exercises.jpg?raw=true" width="270">
    <img src="https://github.com/evgeniy-strel/Gymify/blob/master/readme/sets.jpg?raw=true" width="270">
    <img src="https://github.com/evgeniy-strel/Gymify/blob/master/readme/results.jpg?raw=true" width="270">
  </p>
</details>

---

### 📜 История тренировок

История сохраняется автоматически после окончания тренировочного дня.

Доступно:

* история тренировок за все время с группировкой по месяцу;
* итоги количества тренировок за каждый месяц;
* дата и продолжительность каждой тренировки.

<details>
  <summary>Скриншот</summary>
  <p>
    <img src="https://github.com/evgeniy-strel/Gymify/blob/master/readme/history.jpg?raw=true" width="330">
  </p>
</details>

---

###  📈  Прогресс

Отдельный раздел для отслеживания изменения веса.

Включает:

* график сводки за последние полгода;
* историю всех взвешиваний с группировкой по году;
* динамика по сравнению с предыдущим днем.

<details>
  <summary>Скриншот</summary>
  <p>
    <img src="https://github.com/evgeniy-strel/Gymify/blob/master/readme/progress.jpg?raw=true" width="330">
  </p>
</details>

---

### 🔐 Админский функционал

Для получения роли администратора нужно авторизоваться, после чего появляется возможность:

* создавать тренировочные программы;
* ввести прогресс;
* удалять ненужные данные.

<details>
  <summary>Скриншоты</summary>
<table>
  <tr>
    <th align="center">Настройки</th>
    <th align="center">Пример создания</th>
    <th align="center">Пример удаления (зажатие пальцем)</th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/evgeniy-strel/Gymify/blob/master/readme/settings.jpg?raw=true" width="270" alt="Настройки">
    </td>
    <td>
      <img src="https://github.com/evgeniy-strel/Gymify/blob/master/readme/creating.jpg?raw=true" width="270" alt="Создание">
    </td>
    <td>
      <img src="https://github.com/evgeniy-strel/Gymify/blob/master/readme/deleting.jpg?raw=true" width="270" alt="Удаление">
    </td>
  </tr>
</table>
</details>

---

## 🏗️ Архитектура

Проект построен на модульной архитектуре, вдохновленной FSD.
 Это позволяет разделять бизнес-логику по функциональным модулям и упрощает дальнейшее развитие приложения.
