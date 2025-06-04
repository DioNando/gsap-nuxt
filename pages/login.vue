<template>
  <div class="min-h-screen relative overflow-hidden from-primary/20 via-secondary/10 to-accent/20">    <!-- Background animated particles -->
    <div ref="particlesContainer" class="absolute inset-0">
      <div 
        v-for="i in 50" 
        :key="i"
        :ref="(el) => { if (el) particles[i-1] = el as HTMLElement }"
        class="absolute w-1 h-1 bg-primary/30 rounded-full particle"
      ></div>
    </div>

    <!-- Floating geometric shapes -->
    <div ref="geometryContainer" class="absolute inset-0 pointer-events-none">
      <div ref="shape1" class="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-secondary/30 rotate-45 geometry-shape"></div>
      <div ref="shape2" class="absolute top-3/4 right-1/4 w-12 h-12 bg-accent/20 rounded-full geometry-shape"></div>
      <div ref="shape3" class="absolute top-1/2 left-1/6 w-8 h-8 bg-primary/30 geometry-shape"></div>
      <div ref="shape4" class="absolute bottom-1/4 left-3/4 w-20 h-20 border border-accent/40 rounded-full geometry-shape"></div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl w-full">
        
        <!-- Left side - Welcome section -->
        <div ref="leftSection" class="flex flex-col justify-center items-center text-center lg:text-left space-y-6">
          <div class="space-y-4">
            <div ref="welcomeTitle" class="overflow-hidden">
              <h1 class="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {{ t("welcome") }}
              </h1>
            </div>
            
            <div ref="appLogo" class="flex justify-center lg:justify-start">
              <div class="relative">
                <ApplicationLogo :size="10" />
                <div ref="logoGlow" class="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
              </div>
            </div>
            
            <div ref="appName" class="overflow-hidden">
              <h2 class="text-2xl lg:text-4xl font-bold text-secondary">
                {{ applicationName }}
              </h2>
            </div>
          </div>

          <!-- Feature highlights -->
          <div ref="features" class="space-y-3 opacity-0">
            <div class="flex items-center space-x-3 text-base-content/80">
              <Icon name="majesticons:check-circle" class="text-success text-xl" />
              <span>Interface moderne et responsive</span>
            </div>
            <div class="flex items-center space-x-3 text-base-content/80">
              <Icon name="majesticons:shield-check" class="text-info text-xl" />
              <span>Sécurité avancée</span>
            </div>
            <div class="flex items-center space-x-3 text-base-content/80">
              <Icon name="majesticons:lightning-bolt" class="text-warning text-xl" />
              <span>Performance optimisée</span>
            </div>
          </div>
        </div>
        

        <!-- Right side - Login form -->
        <div ref="rightSection" class="flex items-center justify-center">
          <div ref="loginCard" class="card bg-base-100/90 backdrop-blur-md shadow-2xl w-full max-w-md border border-base-300/50">
            <div class="card-body p-8">
              <!-- Card header -->
              <div ref="cardHeader" class="text-center mb-6">
                <div class="mb-4 opacity-0">
                  <ApplicationLogo :size="6" />
                </div>
                <h3 class="text-2xl font-bold text-primary mb-2 opacity-0">Connexion</h3>
                <p class="text-base-content/70 opacity-0">Accédez à votre compte</p>
              </div>              <!-- Login form -->
              <div ref="loginForm" class="space-y-4 opacity-0">
                <!-- Composant de formulaire existant avec animations intégrées -->
                <FormsLogin />

                <!-- Divider -->
                <div class="divider">ou</div>

                <!-- Social login -->
                <div class="space-y-3">
                  <button class="btn btn-outline w-full transition-all duration-300 hover:scale-105">
                    <Icon name="majesticons:google" class="mr-2 text-red-500" />
                    Continuer avec Google
                  </button>
                  <button class="btn btn-outline w-full transition-all duration-300 hover:scale-105">
                    <Icon name="majesticons:github" class="mr-2" />
                    Continuer avec GitHub
                  </button>
                </div>

                <!-- Register link -->
                <div class="text-center mt-6">
                  <p class="text-base-content/70">
                    Pas encore de compte ? 
                    <NuxtLink to="/register" class="link link-primary font-medium">S'inscrire</NuxtLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading overlay -->
    <div 
      ref="loadingOverlay" 
      class="fixed inset-0 bg-base-100/90 backdrop-blur-sm z-50 flex items-center justify-center opacity-0 pointer-events-none"
    >
      <div class="text-center">
        <div class="loading loading-spinner loading-lg text-primary mb-4"></div>
        <p class="text-lg font-medium">Connexion en cours...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp();

definePageMeta({
  layout: "guest",
});

// Refs pour les éléments
const particlesContainer = ref<HTMLElement>();
const particles = ref<HTMLElement[]>([]);
const geometryContainer = ref<HTMLElement>();
const shape1 = ref<HTMLElement>();
const shape2 = ref<HTMLElement>();
const shape3 = ref<HTMLElement>();
const shape4 = ref<HTMLElement>();

const leftSection = ref<HTMLElement>();
const rightSection = ref<HTMLElement>();
const welcomeTitle = ref<HTMLElement>();
const appLogo = ref<HTMLElement>();
const logoGlow = ref<HTMLElement>();
const appName = ref<HTMLElement>();
const features = ref<HTMLElement>();

const loginCard = ref<HTMLElement>();
const cardHeader = ref<HTMLElement>();
const loginForm = ref<HTMLElement>();
const loginButton = ref<HTMLElement>();
const loadingOverlay = ref<HTMLElement>();

// État
const isLoading = ref(false);

const config = useRuntimeConfig();
const applicationName = config.public.applicationName;
const { t } = useI18n();

// Animation des particules flottantes
const animateParticles = () => {
  particles.value.forEach((particle, index) => {
    if (particle) {
      // Position initiale aléatoire
      $gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.8 + 0.2
      });

      // Animation continue
      $gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });

      // Pulsation
      $gsap.to(particle, {
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  });
};

// Animation des formes géométriques
const animateGeometry = () => {
  // Forme 1 - rotation continue
  if (shape1.value) {
    $gsap.to(shape1.value, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }

  // Forme 2 - mouvement vertical
  if (shape2.value) {
    $gsap.to(shape2.value, {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }

  // Forme 3 - scale pulsation
  if (shape3.value) {
    $gsap.to(shape3.value, {
      scale: 1.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "elastic.inOut"
    });
  }

  // Forme 4 - rotation et mouvement
  if (shape4.value) {
    $gsap.to(shape4.value, {
      rotation: -360,
      x: 50,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
};

// Animation d'entrée de la section gauche
const animateLeftSection = () => {
  const tl = $gsap.timeline({ delay: 0.5 });

  if (welcomeTitle.value) {
    tl.fromTo(welcomeTitle.value, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
  }

  if (appLogo.value) {
    tl.fromTo(appLogo.value, 
      { scale: 0, rotation: 180 },
      { scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=0.5"
    );
  }

  if (logoGlow.value) {
    tl.fromTo(logoGlow.value,
      { scale: 0, opacity: 0 },
      { scale: 1.2, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    );
  }

  if (appName.value) {
    tl.fromTo(appName.value,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.4"
    );
  }

  if (features.value) {
    tl.to(features.value,
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );
  }

  // Animation continue du glow
  if (logoGlow.value) {
    $gsap.to(logoGlow.value, {
      scale: 1.5,
      opacity: 0.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
};

// Animation d'entrée de la carte de login
const animateLoginCard = () => {
  const tl = $gsap.timeline({ delay: 1 });

  // Carte principale
  if (loginCard.value) {
    tl.fromTo(loginCard.value,
      { x: 100, opacity: 0, rotationY: 15 },
      { x: 0, opacity: 1, rotationY: 0, duration: 1.2, ease: "power3.out" }
    );
  }

  // Header de la carte
  if (cardHeader.value?.children) {
    tl.fromTo(cardHeader.value.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
      "-=0.8"
    );
  }

  // Formulaire
  if (loginForm.value?.children) {
    tl.fromTo(loginForm.value.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );
  }
};

// Animation du bouton de connexion
const animateLoginButton = () => {
  // Effet hover avec GSAP
  const button = loginButton.value;
  if (button) {
    button.addEventListener('mouseenter', () => {
      $gsap.to(button, {
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        duration: 0.3,
        ease: "power2.out"
      });
    });

    button.addEventListener('mouseleave', () => {
      $gsap.to(button, {
        scale: 1,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }
};

// Gestion de la connexion avec animation
const handleLogin = () => {
  if (isLoading.value) return;
  
  isLoading.value = true;

  // Animation du bouton
  const tl = $gsap.timeline();
  
  if (loginButton.value) {
    tl.to(loginButton.value, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.in"
    })
    .to(loginButton.value, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out"
    });
  }

  if (loadingOverlay.value) {
    tl.to(loadingOverlay.value, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.5,
      ease: "power2.out"
    });
  }

  // Animation de l'overlay de chargement
  const loadingSpinner = loadingOverlay.value?.querySelector('.loading');
  if (loadingSpinner) {
    $gsap.fromTo(loadingSpinner,
      { scale: 0, rotation: 0 },
      { scale: 1, rotation: 360, duration: 0.8, ease: "elastic.out(1, 0.5)" }
    );
  }

  // Simulation de la connexion (remplacer par vraie logique)
  setTimeout(() => {
    isLoading.value = false;
    if (loadingOverlay.value) {
      $gsap.to(loadingOverlay.value, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, 3000);
};

// Animation de parallaxe au scroll
const setupParallax = () => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    if (shape1.value && shape3.value) {
      $gsap.to([shape1.value, shape3.value], {
        y: scrollY * 0.5,
        duration: 0.1,
        ease: "none"
      });
    }
    
    if (shape2.value && shape4.value) {
      $gsap.to([shape2.value, shape4.value], {
        y: scrollY * -0.3,
        duration: 0.1,
        ease: "none"
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
};

// Initialisation des animations
onMounted(() => {
  if (process.client && $gsap) {
    // Délai pour s'assurer que les éléments sont montés
    nextTick(() => {
      animateParticles();
      animateGeometry();
      animateLeftSection();
      animateLoginCard();
      animateLoginButton();
      setupParallax();

      // Animation de la page complète au chargement
      $gsap.from("body", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  }
});
</script>

<style lang="scss" scoped>
// Animation des particules
.particle {
  filter: blur(0.5px);
  transition: transform 0.1s ease-out;
}

// Formes géométriques flottantes
.geometry-shape {
  filter: blur(1px);
  opacity: 0.6;
}

// Effet de perspective pour la carte
.card {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

// Effets de focus améliorés pour les inputs
.input:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(var(--p), 0.2);
  border-color: hsl(var(--p));
}

// Animation du gradient de fond
.bg-gradient-to-br {
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

// Effet glassmorphism pour la carte
.card.bg-base-100\/90 {
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

// Hover effects pour les boutons
.btn {
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
}

// Effet de lueur pour le logo
.relative .absolute {
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

// Responsive adjustments
@media (max-width: 1024px) {
  .grid.grid-cols-1.lg\\:grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .geometry-shape {
    display: none;
  }
}

// Animation des particules au hover
.particle:hover {
  transform: scale(2);
  opacity: 1 !important;
}

// Transition smooth pour tous les éléments interactifs
.btn, .input, .checkbox, .link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

// Effet de focus visible pour l'accessibilité
.btn:focus,
.input:focus,
.checkbox:focus,
.link:focus {
  outline: 2px solid hsl(var(--p));
  outline-offset: 2px;
}

// Loading overlay avec effet blur
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

// Style pour les icônes avec animation
.icon {
  transition: transform 0.3s ease;
}

.btn:hover .icon {
  transform: scale(1.1);
}

// Amélioration de l'effet card shadow
.shadow-2xl {
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

// Animation du texte gradient
.bg-clip-text {
  background-size: 200% 200%;
  animation: textShimmer 3s ease-in-out infinite;
}

@keyframes textShimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
