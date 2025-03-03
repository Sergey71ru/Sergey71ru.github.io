document.addEventListener("DOMContentLoaded", function() {
    // Ждем 1 секунду перед проверкой Telegram.WebApp
    setTimeout(function() {
        if (window.Telegram && window.Telegram.WebApp) {
            console.log("Telegram.WebApp инициализирован.");
            console.log("Версия Telegram.WebApp:", Telegram.WebApp.version);
            console.log("Данные инициализации:", Telegram.WebApp.initData);  // Логируем данные инициализации
            Telegram.WebApp.ready();  // Подтверждаем готовность страницы
        } else {
            console.error("Telegram.WebApp не инициализирован.");
            console.log("Объект window:", window);  // Логируем объект window для отладки
        }
    }, 1000);  // Задержка 1 секунда
});

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;

    const container = document.querySelector('.container');
    container.appendChild(errorElement);

    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showError('Пожалуйста, заполните все поля.');
        return;
    }

    const data = { email, password };
    console.log("Данные для входа:", data);  // Логируем данные

    if (Telegram.WebApp && Telegram.WebApp.sendData) {
        Telegram.WebApp.sendData(JSON.stringify(data));
        console.log("Данные отправлены в бота.");
    } else {
        console.error("Telegram.WebApp.sendData недоступен.");
    }

    Telegram.WebApp.close();
}

function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const position = document.getElementById('position').value;

    if (!firstName || !lastName || !email || !password || !position) {
        showError('Пожалуйста, заполните все поля.');
        return;
    }

    const data = { firstName, lastName, email, password, position };
    console.log("Данные для регистрации:", data);  // Логируем данные

    if (Telegram.WebApp && Telegram.WebApp.sendData) {
        Telegram.WebApp.sendData(JSON.stringify(data));
        console.log("Данные отправлены в бота.");
    } else {
        console.error("Telegram.WebApp.sendData недоступен.");
    }

    Telegram.WebApp.close();
}

function showRecovery() {
    alert('Сервис временно недоступен. Попробуйте позже.');
}

function closeWebApp() {
    Telegram.WebApp.close();
}
