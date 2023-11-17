// main.js
document.addEventListener("DOMContentLoaded", function() {
    // Получите предпочтительный язык пользователя из HTTP заголовка
    const userLanguage = navigator.language || navigator.userLanguage;

    // Функция для установки локализации
    function setLocalization(lang) {
        const telegramlinkElement = document.querySelector(".telegram-link");
        const BioProjectElement = document.querySelector(".animated-bio");
        const DictProjectElement = document.querySelector(".animated-dict");
        const Button1Element = document.querySelector(".bot-link");
        const Button2Element = document.querySelector(".channel-link");

        const localization = localizations[lang];

        telegramlinkElement.innerHTML = localization.TelegramLink;
        BioProjectElement.innerHTML = localization.BioProject;
        DictProjectElement.innerHTML = localization.DictProject;
        Button1Element.innerHTML = localization.Button1;
        Button2Element.innerHTML = localization.Button2;
    }

    function animateTextFromElement() {
        const container_logo = document.querySelector(".animated-logo");
        const container_bio = document.querySelector(".animated-bio");
        const container_dict = document.querySelector(".animated-dict");


        const text_logo = container_logo.textContent.trim();
        const text_bio = container_bio.textContent.trim();
        const text_dict = container_dict.textContent.trim();

        const DictPanel = document.querySelector(".content-dictext");

        animateText(text_logo, document.querySelectorAll(".animated-logo"), "animated-logo", "text-botifyex");
        animateText(text_bio, document.querySelectorAll(".animated-bio"), "animated-bio", "bio_text");
    
        setTimeout(() => {
            DictPanel.style.display = "flex";
            animateTextLine(text_dict, document.querySelectorAll(".animated-dict"), "animated-dict", "dict_text");
        }, 430);
    }
    

    function showAnimation() {
        const topPanel = document.querySelector(".top-panel");
        const MainPanel = document.querySelector(".container-main");
        const GlavPanel = document.querySelector(".content-glavtext");
        const ButtonsPanel = document.querySelector(".content-buttons");
        const BannersPanel = document.querySelector(".content-banners");
        const Banners = document.querySelectorAll(".banner");
    
        MainPanel.style.display = "none";
        topPanel.style.display = "flex";
        GlavPanel.style.display = "flex";
        ButtonsPanel.style.display = "flex";
        BannersPanel.style.display = "flex";
    
        setTimeout(function () {
            document.body.style.animationPlayState = "running";
        }, 0);
    
        setTimeout(() => {
            Banners.forEach((banner) => {
                banner.style.animation = "none";
                banner.style.opacity = "1";
            });
        }, 1305);
    }
    
    function animateText(text, elements, className1, className2) {
        elements.forEach((element) => {
            element.textContent = '';
            let lineContainer = document.createElement('div');
            lineContainer.className = className1 + " " + className2;
            element.appendChild(lineContainer);
    
            for (let i = 0; i < text.length; i++) {
                if (text[i] === '\n') {
                    lineContainer = document.createElement('div');
                    lineContainer.className = className1 + " " + className2;
                    element.appendChild(lineContainer);
                    continue;
                }
                const letterSpan = document.createElement('span');
                letterSpan.className = 'letter';
    
                if (i !== 0 && text[i] === ' ') {
                    letterSpan.innerHTML = '&nbsp;';
                } else {
                    letterSpan.innerHTML = text[i];
                }
    
                lineContainer.appendChild(letterSpan);
    
                letterSpan.style.transition = `opacity 0.3s ease-in-out, transform 0.3s ease-in-out`;
                setTimeout(() => {
                    letterSpan.style.opacity = 1;
                    letterSpan.style.transform = 'translateY(0)';
                }, i * 30);
            }
        });
    }


    function animateTextLine(text, elements, className1, className2) {
        elements.forEach((element) => {
            element.textContent = '';
            let lineContainer = document.createElement('div');
            lineContainer.className = className1 + " " + className2;
            element.appendChild(lineContainer);
    
            const lineText = document.createElement('div');
            lineText.textContent = text;
            lineText.className = 'animated-line';
            lineContainer.appendChild(lineText);
    
            lineText.style.transition = `opacity 0.7s ease-in-out, transform 0.7s ease-in-out`;
            setTimeout(() => {
                lineText.style.opacity = 1;
                lineText.style.transform = 'translateY(0)';
            }, 0);
        });
    }
    
    

    // Хранение текстов для разных языков
    const localizations = {
        en: {
            TelegramLink: "Open in Telegram",
            BioProject: "Rent bots in Telegram and\nopen a business at the lowest prices.",
            DictProject: "We guarantee this is something that you will like",
            Button1: "Rent a bot",
            Button2: "Follow the news"
        },
        ru: {
            TelegramLink: "Открыть в Telegram",
            BioProject: "Арендуйте ботов в Telegram и\nоткрывайте бизнес по низким ценам.",
            DictProject: "Мы уверены, что это понравится вам",
            Button1: "Арендовать бота",
            Button2: "Следить за новостями"
        }
    };

    // Установите локализацию на основе предпочтительного языка пользователя
    if (userLanguage.startsWith("ru")) {
        setLocalization("ru");
    } else {
        setLocalization("en"); // Язык по умолчанию
    }

    // Скрываем текст и вызываем анимацию
    setTimeout(function() {
        const headerElement = document.querySelector(".header-main");
        const loaderElement = document.querySelector(".loader");

        headerElement.classList.add("hide-text");
        loaderElement.classList.add("hide-text");

        headerElement.addEventListener("animationend", function() {
            setTimeout(function() {
                showAnimation();
                animateTextFromElement();
            }, 50);
        });
    }, 450);

});
