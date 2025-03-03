function showError(message) {
    // Создаем элемент для отображения ошибки
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;

    // Добавляем ошибку в контейнер
    const container = document.querySelector('.container');
    container.appendChild(errorElement);

    // Удаляем ошибку через 5 секунд
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Проверяем, что все поля заполнены
    if (!email || !password) {
        showError('Пожалуйста, заполните все поля.');
        return;
    }

    // Отправляем данные в бот
    const data = { email, password };
    Telegram.WebApp.sendData(JSON.stringify(data));
    Telegram.WebApp.close();
}

function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const position = document.getElementById('position').value;

    // Проверяем, что все поля заполнены
    if (!firstName || !lastName || !email || !password || !position) {
        showError('Пожалуйста, заполните все поля.');
        return;
    }

    // Отправляем данные в бот
    const data = { firstName, lastName, email, password, position };
    Telegram.WebApp.sendData(JSON.stringify(data));
    Telegram.WebApp.close();
}

function showRecovery() {
    alert('Сервис временно недоступен. Попробуйте позже.');
}

function closeWebApp() {
    // Закрываем Web App и возвращаем пользователя в чат
    Telegram.WebApp.close();
}