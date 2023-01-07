// menu

(function () {
  $(".header-menu-wrp")
    .addClass("original")
    .clone()
    .insertAfter(".header-menu-wrp")
    .addClass("cloned")
    .removeClass("original");

  function resizeMenu() {
    let $original = $(".header-menu-wrp.original");
    let $cloned = $(".header-menu-wrp.cloned");

    if ($(window).scrollTop() >= $original.offset().top) {
      $cloned.css({
        top: 0,
        width: $original.css("width"),
        display: "block",
        left: $original.offset().left + "px",
      });
      $original.css("visibility", "hidden");
    } else {
      $cloned.css("display", "none");
      $original.css("visibility", "visible");
    }
  }

  $(window).scroll(function () {
    resizeMenu();
  });

  $(window).resize(function () {
    resizeMenu();
  });

  var last_id;
  const $top_menu = $(".header-menu-wrp.cloned");
  let menu_height = $top_menu.outerHeight(true);
  let $menu_items = $top_menu.find("a");
  let $scroll_items = $menu_items.map(function () {
    let item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

  $menu_items.click(function (e) {
    var href = $(this).attr("href"),
      offset_top = href === "#" ? 0 : $(href).offset().top - menu_height;
    $("html, body").stop().animate(
      {
        scrollTop: offset_top,
      },
      300
    );
    e.preventDefault();
  });

  $(window).scroll(function () {
    var from_top = $(this).scrollTop() + menu_height;
    var mar = parseInt($top_menu.css("margin-bottom"));
    var cur = $scroll_items.map(function () {
      if ($(this).offset().top < from_top + mar) {
        return this;
      }
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";
    if (last_id !== id) {
      last_id = id;
      $menu_items
        .parent()
        .removeClass("active")
        .end()
        .filter("[href='#" + id + "']")
        .parent()
        .addClass("active");
    }
  });
})();

// popup

const showDialog = () => {
  document.getElementById("dialog").classList.add("show");
  const body = document.body;
  body.classList.add("no-scroll");
};
const closeDialog = () => {
  const body = document.body;
  body.style.position = "";
  body.style.top = "";
  body.classList.remove("no-scroll");
  document.getElementById("dialog").classList.remove("show");
};

//back top

var btn = $("#back-top");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "500");
});

window.addEventListener("scroll", function () {
  var sci = document.querySelector(".sci");
  sci.classList.toggle("sticky", window.scrollY > 0);
});

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);
});

//slider

var swiper = new Swiper(".blog-slider", {
  spaceBetween: 30,
  effect: "fade",
  loop: true,
  mousewheel: {
    invert: false,
  },
  // autoHeight: true,
  pagination: {
    el: ".blog-slider__pagination",
    clickable: true,
  },
});

// loader

let mask = document.querySelector(".mask");

window.addEventListener("load", () => {
  mask.classList.add("hide");
  setTimeout(() => {
    mask.remove();
  }, 600);
});

// language

$(document).ready(function () {
  $(".ukr").click(function () {
    $(this).addClass("activeLang");
    $(".eng").removeClass("activeLang");
    $(".defaultla").removeClass("activeLang");
  });

  $(".eng").click(function () {
    $(this).addClass("activeLang");
    $(".ukr").removeClass("activeLang");
    $(".defaultla").removeClass("activeLang");
  });

  $(".defaultla").click(function () {
    $(this).addClass("activeLang");
    $(".eng").removeClass("activeLang");
    $(".ukr").removeClass("activeLang");
  });

  $(".ukr").on("click", function () {
    const r = $(".local").each(function () {
      let el = $(this);
      let key = el.attr("caption");
      el.text(ukr[key]);
    });
  });

  $(".eng").on("click", function () {
    const r = $(".local").each(function () {
      let el = $(this);
      let key = el.attr("caption");
      el.text(eng[key]);
    });
  });

  $(".defaultla").on("click", function () {
    const r = $(".local").each(function () {
      let el = $(this);
      let key = el.attr("caption");
      el.text(defaultla[key]);
    });
  });

  let ukr = {
    home: "ГОЛОВНА",
    about: "ПРО МЕНЕ",
    contact: "КОНТАКТИ",
    portfolio: "ПОРТФОЛІО",
    descr:
      "Я живу в Польщі, але сам я з України. Займаюся програмуванням сайтів 1 рік. Раніше захоплювався компютерним дизайном, працював з Photoshop, CINEMA 4D. Завжди готова вчитися. Приймаю положення про стажування. Зараз я на першому курсі.",
    nameform: "Імя",
    surnameform: "Прізвище",
    emailform: "Пошта",
    phoneform: "Телефон",
    fedb: "Зворотній Звязок .",
    aboutdesc:
      " Можу робити адаптивні сайти. Володіння мовами: українська – рідна, англійська – А2, польська – А1, російська – вільно. Хочу вивчити такі фреймворки, мови та бази даних як: React, TypeScript, Redux, Mobx, MySQL, Node, Angular, Vue. Бажана зарплата: від $300 до $2000. Зараз навчаюся в недержавній технічній школі в Радомі. Напрям: Технік інформатик.",
    proj: "Мої Проекти",
    proces: "Проект в розробці",
    finishp: "Закінчений",
    Enigmadis:
      "Enigma - це мій проект. Сайт-кінотеатр для перегляду фільмів, мультфільмів, аніме та серіалів.. на даний момент проект не завершений, є лише дві вкладки (Фільми, Головна).",
    Cooloursdis:
      "Coolours — це сайт, де ви можете навмання вибрати будь-яку палітру з 6 кольорів, натиснувши пробіл і скопіювавши їх у свій проект.",
    visit: "Відвідати",
    htmldis: 'HTML Learn – сайт на якому ти можеш вивчити базу html та придбати курси. На сайті присутня також реєстрація акаунту та особистий профіль з даними.'
  };
  let eng = {
    home: "HOME",
    about: "ABOUT ME",
    contact: "CONTACT",
    portfolio: "PORTFOLIO",
    descr:
      "I live in Poland, but I myself am from Ukraine. I have been in website programming for the 1 year. Previously, he was fond of computer design, worked with Photoshop, CINEMA 4D. Always ready to learn. I accept the internship clause. I am currently in my first year.",
    nameform: "Name",
    surnameform: "Surname",
    emailform: "Email",
    phoneform: "Phone",
    fedb: "Feedback .",
    aboutdesc:
      "I can do responsive layout. Languages: Ukrainian - native speaker, English - A2, Polish - A1, Russian - fluent. I want to learn such frameworks, languages ​​and databases as: React, TypeScript, Redux, Mobx, MySQL, Node, Angular, Vue. Desired salary: from $300 to $2000. I am currently studying at a non-public technical school in Radom. Direction: Computer Science Technician.",
    proj: "My Projects",
    proces: "Project in process",
    finishp: "Finised",
    Enigmadis:
      "Enigma - this is my project. A cinema site for watching movies, cartoons, anime and series.. at the moment the project is not finished, there are only two tabs (Films, Home).",
    Cooloursdis:
      "Coolours is a site where you can randomly select any palette from 6 colors by pressing the space bar and copy them to your project.",
    visit: "Visit",
    htmldis: 'HTML Learn - a site where you can learn the html base and purchase courses. The site also has an account registration and a personal profile with data.'
  };

  let defaultla = {
    home: "ГЛАВНАЯ",
    about: "ОБО МНЕ",
    contact: "КОНТАКТЫ",
    portfolio: "ПОРТФОЛИО",
    descr:
      "Живу в Польше, но сам с Украины. В программировании сайтов нахожусь 1 год. Раньше увлекался компьютерным дизайном, работал с Photoshop, CINEMA 4D. Всегда готов учиться. Принимаю пункт о стажировке. В данный момент нахожусь на первом курсе.",
    nameform: "Имя",
    surnameform: "Фамилия",
    emailform: "Почта",
    phoneform: "Телефон",
    fedb: "Oбратная Cвязь .",
    aboutdesc:
      "Могу делать адаптивную вёрстку. Языки: украинский - носитель, английский - A2, польский - A1, русский - свободно. Хочу изучить такие фреймворки, языки и базы-данных как: React, TypeScript, Redux, Mobx, MySQL, Node, Angular, Vue. Желаемая зарплата: от 300$ до 2000$. В данный момент учусь в не публичном техникуме в Радоме. Направление: Техник-Информатик.",
    proj: "Мои Проекты",
    proces: "Проект в разработке",
    finishp: "Закончен",
    Enigmadis:
      "Enigma - это мой проект. Сайт-кинотеатр для просмотра фильмов, мультфильмов, аниме и сериалов.. в данный момент проэкт не закончен, есть только две вкладки (Films, Home).",
    Cooloursdis:
      "Coolours - сайт где ты можешь рандомно выбрать любую палитру из 6 цветов нажав пробел и скопировать их себе в проект.",
    visit: "Посетить",
    htmldis: 'HTML Learn - сайт на котором можешь изучить базу html и приобрести курсы. На сайте присутсвует так же регистрация аккаунта и личный профиль с данными.'
  };
});
