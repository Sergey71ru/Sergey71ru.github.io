document.addEventListener("DOMContentLoaded", function() {
    if (window.Telegram && window.Telegram.WebApp) {
        console.log("Telegram.WebApp инициализирован.");
        Telegram.WebApp.ready();
    } else {
        console.error("Telegram.WebApp не инициализирован.");
    }
});

const PUBLIC_KEY = "LBRlpbKBcDeugYBIC";
const SERVICE_ID = "service_5ufba1i";
const TEMPLATE_ID = "template_uclulfi";

emailjs.init(PUBLIC_KEY);

// Валидация почты
function validateEmail(email) {
    const regex = /^[^\s@]+@(gmail\.com|yandex\.ru|mail\.ru|yahoo\.com)$/;
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

    if (!validateEmail(email)) {
        emailError.textContent = "Некорректная почта. Используйте Gmail, Yandex, Mail.ru или Yahoo.";
        emailError.style.display = "block";
        return;
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    try {
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_email: email,
            code: code,
        });

        if (response.status === 200) {
            localStorage.setItem('confirmationCode', code); // Сохраняем код в localStorage
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

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const confirmationCodeError = document.getElementById('confirmationCodeError');

    emailError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";
    confirmationCodeError.style.display = "none";

    if (!validateEmail(email)) {
        emailError.textContent = "Некорректная почта. Используйте Gmail, Yandex, Mail.ru или Yahoo.";
        emailError.style.display = "block";
        return;
    }

    if (!validatePassword(password)) {
        passwordError.textContent = "Пароль должен быть не менее 8 символов и содержать цифры и буквы.";
        passwordError.style.display = "block";
        return;
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Пароли не совпадают.";
        confirmPasswordError.style.display = "block";
        return;
    }

    const savedCode = localStorage.getItem('confirmationCode');
    if (confirmationCode !== savedCode) {
        confirmationCodeError.textContent = "Неверный код подтверждения.";
        confirmationCodeError.style.display = "block";
        return;
    }

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
