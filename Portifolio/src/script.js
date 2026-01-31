document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("snow");
  const ctx = canvas.getContext("2d");

  let width = window.innerWidth;
  let height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none";

  const flakes = [];
  const flakeCount = 80;

  class Flake {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.radius = Math.random() * 2 + 0.8;
      this.speed = Math.random() * 0.3 + 0.15;
      this.wind = Math.random() * 0.2 - 0.1;
    }

    update() {
      this.y += this.speed;
      this.x += this.wind;

      if (this.y > height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.fill();
    }
  }

  function initSnow() {
    flakes.length = 0;
    for (let i = 0; i < flakeCount; i++) {
      flakes.push(new Flake());
    }
  }

  function animateSnow() {
    ctx.clearRect(0, 0, width, height);
    flakes.forEach(flake => {
      flake.update();
      flake.draw();
    });
    requestAnimationFrame(animateSnow);
  }

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initSnow();
  });

  initSnow();
  animateSnow();


  const indicator = document.querySelector('.scroll-indicator');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      indicator.classList.add('hide');
    } else {
      indicator.classList.remove('hide');
    }
  });


  const links = {
    "Next.js": "https://nextjs.org",
    "Node.js": "https://nodejs.org",
    "Python": "https://www.python.org",
    "Java": "https://www.oracle.com/java/",
    "Docker": "https://www.docker.com",
    "Tailwind": "https://tailwindcss.com",
    "Figma": "https://www.figma.com",
    "Git": "https://git-scm.com",
    "PostgreSQL": "https://www.postgresql.org",
    "Alchemy": "https://www.sqlalchemy.org",
    "SQlite": 'https://sqlitebrowser.org/',
    "JavaScript": "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
    "C#": "https://learn.microsoft.com/pt-br/dotnet/csharp/",
    "Postman": "https://www.postman.com",
    "ThunderClient": "https://www.thunderclient.com",
    "Spring Boot": "https://spring.io/projects/spring-boot",
    "Flask": "https://flask.palletsprojects.com"
  };

  document.querySelectorAll(".tech-item").forEach(item => {
    const name = item.querySelector("span")?.innerText.trim();

    if (links[name]) {
      item.style.cursor = "pointer";

      item.addEventListener("click", () => {
        window.open(links[name], "_blank", "noopener");
      });
    }
  });
});
