document.addEventListener("DOMContentLoaded", function() {
    if (window.Telegram && window.Telegram.WebApp) {
        console.log("Telegram.WebApp инициализирован.");
        Telegram.WebApp.ready();
    } else {
        console.error("Telegram.WebApp не инициализирован.");
    }
});

// Валидация почты
function validateEmail(email) {
    const regex = /^[^\s@]+@(gmail\.com|yandex\.ru|mail\.ru)$/;
    return regex.test(email);
}

// Валидация пароля
function validatePassword(password) {
    // Пароль должен быть не менее 8 символов и содержать цифры и буквы
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}

// Отправка кода подтверждения
function sendConfirmationCode() {
    const email = document.getElementById('email').value;

    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = "Некорректная почта. Используйте Gmail, Yandex или Mail.ru.";
        return;
    }

    // Временная заглушка: код 0000
    document.getElementById('confirmationCode').value = "0000";
    document.getElementById('emailError').textContent = "";
    alert("Код подтверждения отправлен на вашу почту.");
}

// Переключение видимости пароля
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// Регистрация
function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmationCode = document.getElementById('confirmationCode').value;
    const position = document.getElementById('position').value;

    // Очистка ошибок
    document.getElementById('emailError').textContent = "";
    document.getElementById('passwordError').textContent = "";
    document.getElementById('confirmPasswordError').textContent = "";

    // Валидация почты
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = "Некорректная почта. Используйте Gmail, Yandex или Mail.ru.";
        return;
    }

    // Валидация пароля
    if (!validatePassword(password)) {
        document.getElementById('passwordError').textContent = "Пароль должен быть не менее 8 символов и содержать цифры и буквы.";
        return;
    }

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = "Пароли не совпадают.";
        return;
    }

    // Проверка кода подтверждения
    if (confirmationCode !== "0000") {
        alert("Неверный код подтверждения.");
        return;
    }

    // Все проверки пройдены, отправляем данные
    const data = { firstName, lastName, email, password, position };
    console.log("Данные для регистрации:", data);

    if (Telegram.WebApp && Telegram.WebApp.sendData) {
        Telegram.WebApp.sendData(JSON.stringify(data));
        console.log("Данные отправлены в бота.");
    } else {
        console.error("Telegram.WebApp.sendData недоступен.");
    }

    Telegram.WebApp.close();
}