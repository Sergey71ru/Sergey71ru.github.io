document.addEventListener("DOMContentLoaded", function() {
    if (window.Telegram && window.Telegram.WebApp) {
        console.log("Telegram.WebApp инициализирован.");
        Telegram.WebApp.ready();
    } else {
        console.error("Telegram.WebApp не инициализирован.");
    }
});

PUBLIC_KEY = "LBRlpbKBcDeugYBIC";
SERVICE_ID = "service_5ufba1i";
TEMPLATE_ID = "template_uclulfi";

emailjs.init(PUBLIC_KEY);

// Валидация почты
function validateEmail(email) {
    const regex = /^[^\s@]+@(gmail\.com|yandex\.ru|mail\.ru)$/;
    return regex.test(email);
}

// Валидация пароля
function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}

// Отправка кода подтверждения
async function sendConfirmationCode() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');

    // Валидация почты
    if (!validateEmail(email)) {
        emailError.textContent = "Некорректная почта. Используйте Gmail, Yandex или Mail.ru.";
        emailError.style.display = "block";
        return;
    }

    // Генерация 6-значного кода
    const code = Math.floor(100000 + Math.random() * 900000);

    try {
        // Отправка письма через EmailJS
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_email: email,
            code: code,
        });

        if (response.status === 200) {
            // Сохраняем код для проверки
            document.getElementById('confirmationCode').value = code;
            emailError.style.display = "none";
            alert("Код подтверждения отправлен на вашу почту.");
        } else {
            alert("Ошибка при отправке кода.");
        }
    } catch (error) {
        console.error("Ошибка при отправке письма:", error);
        alert("Произошла ошибка при отправке кода. Проверьте консоль для подробностей.");
    }
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
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    emailError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";

    // Валидация почты
    if (!validateEmail(email)) {
        emailError.textContent = "Некорректная почта. Используйте Gmail, Yandex или Mail.ru.";
        emailError.style.display = "block";
        return;
    }

    // Валидация пароля
    if (!validatePassword(password)) {
        passwordError.textContent = "Пароль должен быть не менее 8 символов и содержать цифры и буквы.";
        passwordError.style.display = "block";
        return;
    }

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Пароли не совпадают.";
        confirmPasswordError.style.display = "block";
        return;
    }

    const enteredCode = document.getElementById('confirmationCode').value;
    const expectedCode = document.getElementById('confirmationCode').value;

    if (enteredCode !== expectedCode) {
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

// Заглушка для "Забыли пароль"
function showRecovery() {
    alert("Сервис временно недоступен. Попробуйте позже.");
}
