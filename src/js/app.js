// Preloader functionality
window.addEventListener("load", function () {
  // Add counter functionality
  const counterElement = document.getElementById("preloader-counter");
  const progressBar = document.getElementById("preloader-progress-bar");
  let count = 0;

  // counter from 0 to 100
  const counterInterval = setInterval(function () {
    count++;

    if (counterElement) {
      counterElement.textContent = count;
    }

    if (progressBar) {
      progressBar.style.width = count + "%";
    }

    if (count >= 100) {
      clearInterval(counterInterval);
      finishLoading();
    }
  }, 20); // Speed of counting (lower = faster)

  // finish loading after counter reaches 100%
  function finishLoading() {
    // Add small delay
    setTimeout(function () {
      document.body.classList.add("loaded");

      setTimeout(function () {
        const preloader = document.getElementById("preloader");
        if (preloader) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 800); // match this with the CSS transition time
    }, 300); // small delay for visual effect
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Add JS loaded class to enable animations
  document.documentElement.classList.add("js-loaded");

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  // Add smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Smooth scroll to the target
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed navbar
          behavior: "smooth",
        });

        // Update URL hash without jumping
        history.pushState(null, null, targetId);
      }

      // Close mobile menu if it's open
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    });
  });

  // Initialize particles.js
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 2,
        random: true,
      },
      line_linked: {
        enable: false,
      },
      move: {
        enable: true,
        speed: 0.2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 250,
          size: 3,
          duration: 2,
          opacity: 0.8,
          speed: 3,
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  });

  // Register ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Initialize GSAP animations
  gsap.from(".text-gradient", {
    duration: 1.5,
    opacity: 0,
    y: 30,
    ease: "power3.out",
  });

  gsap.from("nav", {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power2.out",
  });

  // Improved Medicine cards animation
  const medicineCards = document.querySelectorAll(".medicine-card");

  // Replace individual triggers with a single timeline for better sequencing
  const medicineTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".medicine-cards",
      start: "top bottom-=100px",
      once: true,
      markers: false,
    },
  });

  // Add sequential animation to the timeline with stagger
  medicineTimeline.fromTo(
    medicineCards,
    {
      y: 50,
      opacity: 0,
      scale: 0.95,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.3, // Controls delay between each card animation
      ease: "back.out(1.2)",
      clearProps: "transform", // Ensures hover effects work properly after animation
    }
  );

  // Interactive feature animation
  gsap.from(".interactive-feature > div", {
    scrollTrigger: {
      trigger: ".interactive-feature",
      start: "top 75%",
      markers: false, // Debug için true yapabilirsiniz
    },
    x: function (i) {
      return i % 2 === 0 ? -50 : 50;
    },
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out",
  });

  // Timeline progress animation
  const timelineLine = document.querySelector(
    ".about-section .relative.space-y-8 > .absolute"
  );
  if (timelineLine) {
    // Set initial state - line starts with zero height
    gsap.set(timelineLine, {
      scaleY: 0,
      transformOrigin: "top center",
    });

    gsap.to(timelineLine, {
      scrollTrigger: {
        trigger: ".about-section .relative.space-y-8",
        start: "top bottom",
        end: "30% center",
        scrub: 0.5,
        markers: false,
      },
      scaleY: 1,
      duration: 1,
      ease: "none",
    });
  }

  // tab click functionality
  const tabs = document.querySelectorAll(".tab-container");
  tabs.forEach(function (tab) {
    const header = tab.querySelector(".tab-header");
    const content = tab.querySelector(".tab-content");
    const icon = tab.querySelector(".tab-icon");

    header.addEventListener("click", function () {
      // toggle content visibility
      if (content.classList.contains("hidden")) {
        content.classList.remove("hidden");
        gsap.from(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(icon, { rotation: 180, duration: 0.3 });
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: function () {
            content.classList.add("hidden");
            gsap.set(content, { height: "auto", opacity: 1 });
          },
        });
        gsap.to(icon, { rotation: 0, duration: 0.3 });
      }
    });
  });

  // Astronomy Section Title Animation
  const astronomyTitleSection = document.querySelector(
    "#astronomy .text-center.mb-16"
  );
  const astronomyTitle = astronomyTitleSection.querySelector("h2");
  const astronomyDivider = astronomyTitleSection.querySelector(".h-1");
  const astronomyText = astronomyTitleSection.querySelector("p");

  // create a timeline for coordinated animation
  const astronomyTitleTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#astronomy",
      start: "top 70%",
      toggleActions: "play none none none",
      markers: false,
    },
  });

  astronomyTitleTl
    .from(astronomyTitle, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.2)",
    })
    .from(
      astronomyDivider,
      {
        width: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .from(
      astronomyText,
      {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.2"
    );

  gsap.to("#astronomy .text-center.mb-16", {
    scrollTrigger: {
      trigger: "#astronomy",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    y: 50,
    ease: "none",
  });

  // telescope Content
  const telescopeSection = document.querySelector(".telescope-content");
  if (telescopeSection) {
    const telescopeTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".telescope-specs-container",
        start: "top 90%",
        end: "bottom 70%",
        toggleActions: "play none none none",
        markers: false,
      },
    });

    telescopeTl
      .fromTo(
        ".telescope-specs-container",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      )

      .fromTo(
        ".telescope-specs",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          clearProps: "transform,opacity",
        },
        "-=0.3"
      )

      .fromTo(
        ".telescope-specs li",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.4,
          ease: "power1.out",
          clearProps: "all",
        },
        "-=0.2"
      )

      .fromTo(
        ".telescope-accessories",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          clearProps: "transform,opacity",
        },
        "-=0.2"
      )

      .fromTo(
        ".telescope-accessories li",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.4,
          ease: "power1.out",
          clearProps: "all",
        },
        "-=0.2"
      );

    gsap.fromTo(
      ".telescope-specs h4, .telescope-accessories h4",
      {
        color: "rgba(167, 139, 250, 0.3)",
        textShadow: "0 0 0 rgba(0, 0, 0, 0)",
      },
      {
        scrollTrigger: {
          trigger: ".telescope-specs-container",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        color: "rgba(167, 139, 250, 1)",
        textShadow: "0 0 10px rgba(167, 139, 250, 0.3)",
        duration: 1,
        ease: "power2.out",
        clearProps: "all",
      }
    );

    const borderAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: ".telescope-specs-container",
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });

    borderAnimation
      .fromTo(
        ".telescope-specs, .telescope-accessories",
        { boxShadow: "0 0 0 rgba(79, 70, 229, 0)" },
        {
          boxShadow: "0 0 15px rgba(79, 70, 229, 0.3)",
          duration: 0.8,
          ease: "sine.inOut",
        }
      )
      .to(".telescope-specs, .telescope-accessories", {
        boxShadow: "0 0 0 rgba(79, 70, 229, 0)",
        duration: 0.8,
        ease: "sine.inOut",
        clearProps: "boxShadow",
      });

    gsap.fromTo(
      ".telescope-specs, .telescope-accessories",
      { borderColor: "rgba(99, 102, 241, 0.3)" },
      {
        scrollTrigger: {
          trigger: ".telescope-specs-container",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        borderColor: "rgba(99, 102, 241, 0.8)",
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
        onComplete: function () {
          gsap.set(".telescope-specs, .telescope-accessories", {
            clearProps: "borderColor",
          });
        },
      }
    );
  }
  const telescopeImageTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".telescope-image-container",
      start: "top 75%",
      toggleActions: "play none none none",
      markers: false,
    },
  });

  telescopeImageTl
    // frame container
    .from(".telescope-image-frame", {
      opacity: 0,
      scale: 0.9,
      rotation: -3,
      duration: 0.8,
      ease: "power3.out",
    })

    .to(
      ".telescope-image-frame",
      {
        y: "+=10",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        clearProps: "rotation,scale",
      },
      "-=0.2"
    );

  // telescope title and description
  gsap.from(".telescope-title, .telescope-description", {
    scrollTrigger: {
      trigger: ".telescope-title",
      start: "top 80%",
      toggleActions: "play none none none",
      markers: false,
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: "power2.out",
  });

  // twinkling stars around he telescope
  const telescopeContainer = document.querySelector(
    ".telescope-image-container"
  );
  if (telescopeContainer) {
    // create star container
    const starField = document.createElement("div");
    starField.className =
      "absolute inset-0 overflow-hidden pointer-events-none z-0";
    telescopeContainer.appendChild(starField);

    // Create 30 stars
    for (let i = 0; i < 30; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 3 + 3;

      star.className = "absolute rounded-full";
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = "#ffffff";
      star.style.boxShadow = "0 0 3px #ffffff";

      // position stars randomly around the container
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;

      starField.appendChild(star);

      // star twinkling effect
      gsap.to(star, {
        opacity: Math.random() * 0.7 + 0.3,
        scale: Math.random() + 0.5,
        duration: Math.random() * 3 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }
  }

  const instagramContainer = document.querySelector(".instagram-container");
  if (instagramContainer) {
    gsap.from(instagramContainer, {
      scrollTrigger: {
        trigger: instagramContainer,
        start: "top 85%",
        toggleActions: "play none none none",
        markers: false,
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.2)",
    });

    // pulse animation
    gsap.to(".instagram-link", {
      boxShadow: "0 0 15px rgba(139, 92, 246, 0.6)",
      scale: 1.03,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  // Developer Credit
  const devMoon = document.querySelector(".dev-moon");
  if (devMoon) {
    // rotation
    gsap.to(devMoon, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "none",
    });

    // pulsing glow effect
    gsap.to(devMoon, {
      boxShadow:
        "0 0 15px rgba(220, 220, 250, 0.7), 0 0 30px rgba(180, 180, 250, 0.4)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // breathing effect
    gsap.to(devMoon, {
      scale: 1.05,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  // Contact Section Animations
  const contactTitleSection = document.querySelector(
    "#contact .contact-title-container"
  );
  if (contactTitleSection) {
    const contactHeading =
      contactTitleSection.querySelector(".contact-heading");
    const contactDivider =
      contactTitleSection.querySelector(".contact-divider");
    const contactDescription = contactTitleSection.querySelector(
      ".contact-description"
    );

    const contactTitleTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top 70%",
        toggleActions: "play none none none",
        markers: false,
      },
    });

    contactTitleTl
      .from(contactHeading, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.2)",
      })
      .from(
        contactDivider,
        {
          width: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        contactDescription,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );
  }

  // Contact cards animation
  const contactCards = document.querySelectorAll(".contact-card");
  if (contactCards.length > 0) {
    gsap.set(contactCards, { opacity: 1 });

    gsap.fromTo(
      contactCards,
      {
        opacity: 0,
        x: (i) => (i === 0 ? -50 : 0),
        y: (i) => (i === 1 ? 50 : 0),
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }

  const contactForm = document.querySelector(".contact-form-container");
  if (contactForm) {
    gsap.set(contactForm, { opacity: 1 });

    gsap.fromTo(
      contactForm,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }

  const socialLinks = document.querySelectorAll(".social-link");
  if (socialLinks.length > 0) {
    gsap.set(socialLinks, { opacity: 1 });

    gsap.fromTo(
      socialLinks,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }

  gsap.from(".signature-container", {
    scrollTrigger: {
      trigger: ".signature-container",
      start: "top 95%",
      toggleActions: "play none none none",
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.5,
  });

  // Brain 3D Model Setup
  function initBrainModel() {
    const container = document.getElementById("brain-model-container");
    if (!container) return;

    while (container.firstChild) {
      if (container.firstChild.id === "brain-model-loading") break;
      container.removeChild(container.firstChild);
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45, // Field of view
      container.clientWidth / container.clientHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // allowing transparent background
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    container.appendChild(renderer.domElement);

    // ambient light
    const ambientLight = new THREE.AmbientLight(0x6366f1, 0.5);
    scene.add(ambientLight);

    // directional lights
    const frontLight = new THREE.DirectionalLight(0x8b5cf6, 0.8);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0x3b82f6, 0.8);
    backLight.position.set(0, 0, -5);
    scene.add(backLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
    topLight.position.set(0, 5, 0);
    scene.add(topLight);

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = () => {
      // hide loading indicator
      const loadingElement = document.getElementById("brain-model-loading");
      if (loadingElement) loadingElement.style.display = "none";
    };

    const loader = new THREE.GLTFLoader(loadingManager);
    let brain;

    loader.load(
      // Model URL
      "/mahmuteminok/src/img/brain_areas.glb",

      // onLoad callback
      function (gltf) {
        brain = gltf.scene;

        brain.scale.set(2, 2, 2);

        // Create a group to contain the brain
        // This will help keep the model centered during rotation
        const brainGroup = new THREE.Group();
        scene.add(brainGroup);

        // Center the model
        const box = new THREE.Box3().setFromObject(brain);
        const center = box.getCenter(new THREE.Vector3());
        brain.position.x = -center.x;
        brain.position.y = -center.y;
        brain.position.z = -center.z;

        // Add the centered brain to the group
        brainGroup.add(brain);

        // Position the group at the center of the scene
        brainGroup.position.set(0, 0, 0);

        // Store reference to both brain and group
        brain.userData.group = brainGroup;

        // Animation for continuous rotation
        gsap.to(brainGroup.rotation, {
          y: Math.PI * 2,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      },

      // onProgress callback
      function (xhr) {
        const percent = ((xhr.loaded / xhr.total) * 100).toFixed();
        const loadingElement = document.getElementById("brain-model-loading");
        if (loadingElement && loadingElement.querySelector("p")) {
          loadingElement.querySelector(
            "p"
          ).textContent = `Yükleniyor: ${percent}%`;
        }
      },

      // onError callback
      function (error) {
        console.error("Model loading error:", error);
        const loadingElement = document.getElementById("brain-model-loading");
        if (loadingElement) {
          loadingElement.innerHTML =
            '<p class="text-red-400">Model yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>';
        }
      }
    );

    // Variables for drag interaction
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0,
    };

    // Mouse / Touch event handlers
    function onMouseDown(event) {
      isDragging = true;

      // Get mouse position
      const clientX =
        event.clientX ||
        (event.touches && event.touches[0] ? event.touches[0].clientX : 0);
      const clientY =
        event.clientY ||
        (event.touches && event.touches[0] ? event.touches[0].clientY : 0);

      previousMousePosition = {
        x: clientX,
        y: clientY,
      };

      // Change cursor
      renderer.domElement.style.cursor = "grabbing";

      // Stop the GSAP auto-rotation when dragging starts
      if (brain && brain.userData.group) {
        gsap.killTweensOf(brain.userData.group.rotation);
      }
    }

    function onMouseMove(event) {
      if (!isDragging || !brain) return;

      // Prevent default to avoid page scrolling while dragging
      event.preventDefault();

      // Get mouse position
      const clientX =
        event.clientX ||
        (event.touches && event.touches[0] ? event.touches[0].clientX : 0);
      const clientY =
        event.clientY ||
        (event.touches && event.touches[0] ? event.touches[0].clientY : 0);

      // Calculate mouse movement delta
      const deltaMove = {
        x: clientX - previousMousePosition.x,
        y: clientY - previousMousePosition.y,
      };

      // Adjust rotation speed for better control
      const rotationSpeed = {
        x: 0.007, // Increased for better vertical responsiveness
        y: 0.005, // Horizontal rotation speed
      };

      // FIXED: Now adds positive deltaMove.x for intuitive left-right movement
      // Get the group that contains the brain
      const brainGroup = brain.userData.group;

      // Rotate the group instead of the brain directly
      // This keeps the brain centered in the container
      brainGroup.rotation.y += deltaMove.x * rotationSpeed.y;
      brainGroup.rotation.x += deltaMove.y * rotationSpeed.x;

      // Store current position for next frame
      previousMousePosition = {
        x: clientX,
        y: clientY,
      };
    }

    function onMouseUp() {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
    }

    // Add event listeners
    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("mouseleave", onMouseUp);

    // Touch support with passive: false to allow preventDefault()
    renderer.domElement.addEventListener("touchstart", onMouseDown, {
      passive: false,
    });
    renderer.domElement.addEventListener("touchmove", onMouseMove, {
      passive: false,
    });
    renderer.domElement.addEventListener("touchend", onMouseUp);

    // Set initial cursor style
    renderer.domElement.style.cursor = "grab";

    // Handle window resize
    function onWindowResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener("resize", onWindowResize);

    // Update the animation loop
    function animate() {
      requestAnimationFrame(animate);

      if (brain && brain.userData.group) {
        if (!isDragging) {
          // Only auto-rotate when not being dragged
          brain.userData.group.rotation.y += 0.002;
        }

        // Subtle floating animation for the group
        // This keeps the entire model visible in the container
        brain.userData.group.position.y +=
          Math.sin(Date.now() * 0.001) * 0.0005;
      }

      renderer.render(scene, camera);
    }
    animate();
  }
  // Initialize brain model when medicine section is visible
  ScrollTrigger.create({
    trigger: ".medicine-tabs",
    start: "top 80%",
    onEnter: initBrainModel,
    once: true,
  });
});

// Dynamic copyright year
document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  document.getElementById("current-year").textContent = currentYear;
});

// Add a class to the html element if JavaScript is enabled
document.documentElement.className = document.documentElement.className.replace(
  "no-js",
  "js"
);
