function sendCode() {
    alert("Код подтверждения: 0000 (заглушка)");
}

function register() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const position = document.getElementById('position').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailCode = document.getElementById('emailCode').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Проверка заполненности полей
    if (!firstName || !lastName || !position || !email || !emailCode || !password || !confirmPassword) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Проверка почты
    const allowedDomains = ["yandex.ru", "gmail.com", "mail.ru", "outlook.com"];
    const emailParts = email.split("@");
    if (emailParts.length !== 2 || !allowedDomains.includes(emailParts[1])) {
        alert("Введите почту с корректным доменом (Яндекс, Gmail, Mail.ru и т. д.)");
        return;
    }

    // Проверка кода (заглушка)
    if (emailCode !== "0000") {
        alert("Неверный код подтверждения!");
        return;
    }

    // Проверка пароля (длина и сложность)
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        alert("Пароль должен быть не менее 8 символов, содержать хотя бы одну заглавную букву и цифру.");
        return;
    }

    // Проверка повторного ввода пароля
    if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
    }

    alert("Регистрация успешна!");
}
