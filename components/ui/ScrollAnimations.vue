<template>
  <div class="w-full bg-base-100 py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12 text-primary">
        Interface Interactive avec ScrollTrigger
      </h2>

      <!-- Hero Section avec parallax -->
      <div ref="heroSection" class="relative h-screen flex items-center justify-center mb-16 overflow-hidden rounded-2xl">
        <!-- Background layers pour effet parallax -->
        <div ref="bgLayer1" class="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90"></div>
        <div ref="bgLayer2" class="absolute inset-0 bg-gradient-to-tl from-accent to-info opacity-50"></div>
        
        <!-- Particules de fond -->
        <div class="absolute inset-0">
          <div 
            v-for="i in 20" 
            :key="i"
            :ref="el => bgParticles[i-1] = el"
            class="absolute w-2 h-2 bg-white rounded-full opacity-30"
          ></div>
        </div>
        
        <!-- Contenu principal -->
        <div class="relative z-10 text-center text-white">
          <h1 ref="heroTitle" class="text-6xl font-bold mb-6 drop-shadow-lg">
            ScrollTrigger
          </h1>
          <p ref="heroSubtitle" class="text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Découvrez la puissance des animations déclenchées par le scroll
          </p>
          <button ref="heroButton" class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
            <Icon name="majesticons:arrow-down" class="mr-2" />
            Explorez
          </button>
        </div>
        
        <!-- Indicateur de scroll -->
        <div ref="scrollIndicator" class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div class="w-1 h-16 bg-white bg-opacity-50 rounded-full overflow-hidden">
            <div ref="scrollProgress" class="w-full bg-white rounded-full" style="height: 0%"></div>
          </div>
        </div>
      </div>

      <!-- Section des cartes révélées au scroll -->
      <div class="mb-16">
        <h3 ref="cardsTitle" class="text-3xl font-semibold text-center mb-12">
          Animations au Scroll
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            :ref="el => featureCards[index] = el"
            class="card bg-base-100 shadow-xl feature-card"
          >
            <figure class="px-6 pt-6">
              <div class="w-20 h-20 rounded-full flex items-center justify-center"
                   :class="feature.bgClass">
                <Icon :name="feature.icon" class="text-3xl text-white" />
              </div>
            </figure>
            <div class="card-body items-center text-center">
              <h4 class="card-title text-lg mb-2">{{ feature.title }}</h4>
              <p class="text-sm opacity-80">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section counter animé -->
      <div ref="statsSection" class="bg-base-200 rounded-2xl p-12 mb-16">
        <h3 class="text-3xl font-semibold text-center mb-12">Nos Statistiques</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="text-center"
          >
            <div :class="stat.iconBg" class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon :name="stat.icon" class="text-2xl text-white" />
            </div>
            <div ref="statNumbers" class="text-4xl font-bold text-primary mb-2">0</div>
            <div class="text-lg font-medium opacity-80">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Section timeline horizontale -->
      <div class="mb-16">
        <h3 class="text-3xl font-semibold text-center mb-12">Notre Parcours</h3>
        
        <div class="relative">
          <!-- Ligne de timeline -->
          <div ref="timelineLine" class="absolute top-1/2 left-0 w-full h-1 bg-base-300 transform -translate-y-1/2"></div>
          <div ref="timelineProgress" class="absolute top-1/2 left-0 h-1 bg-primary transform -translate-y-1/2" style="width: 0%"></div>
          
          <!-- Points de timeline -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div 
              v-for="(milestone, index) in timeline" 
              :key="index"
              :ref="el => timelineItems[index] = el"
              class="relative timeline-item"
            >
              <!-- Point central -->
              <div class="w-6 h-6 bg-primary rounded-full mx-auto mb-4 relative z-10 shadow-lg timeline-dot"></div>
              
              <!-- Contenu -->
              <div class="text-center">
                <div class="text-lg font-bold text-primary mb-2">{{ milestone.year }}</div>
                <h4 class="font-semibold mb-2">{{ milestone.title }}</h4>
                <p class="text-sm opacity-80">{{ milestone.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section de morphing de formes -->
      <div class="mb-16">
        <h3 class="text-3xl font-semibold text-center mb-12">Formes Morphiques</h3>
        
        <div class="flex justify-center items-center space-x-8">
          <svg width="200" height="200" viewBox="0 0 200 200" class="bg-base-100 rounded-lg shadow-lg">
            <path 
              ref="morphShape"
              d="M100,20 L180,100 L100,180 L20,100 Z"
              fill="oklch(var(--p))"
              class="morphing-shape"
            />
          </svg>
          
          <div class="space-y-4">
            <button 
              v-for="(shape, index) in shapes" 
              :key="index"
              @click="morphToShape(shape.path)"
              class="btn btn-outline block w-full"
            >
              {{ shape.name }}
            </button>
            <button 
              @click="startAutoMorph"
              class="btn btn-primary block w-full"
              :disabled="isAutoMorphing"
            >
              <Icon v-if="!isAutoMorphing" name="majesticons:autorenew" class="mr-2" />
              <Icon v-else name="majesticons:loading" class="mr-2 animate-spin" />
              {{ isAutoMorphing ? 'Morphing...' : 'Auto Morphing' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Section final avec appel à l'action -->
      <div ref="ctaSection" class="text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white">
        <h3 ref="ctaTitle" class="text-4xl font-bold mb-6">Prêt à commencer ?</h3>
        <p ref="ctaText" class="text-xl mb-8 opacity-90">
          Créez des expériences utilisateur exceptionnelles avec GSAP et daisyUI
        </p>
        <button ref="ctaButton" class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
          <Icon name="majesticons:rocket" class="mr-2" />
          Commencer maintenant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp();

// Refs
const heroSection = ref<HTMLElement>();
const bgLayer1 = ref<HTMLElement>();
const bgLayer2 = ref<HTMLElement>();
const bgParticles = ref<HTMLElement[]>([]);
const heroTitle = ref<HTMLElement>();
const heroSubtitle = ref<HTMLElement>();
const heroButton = ref<HTMLElement>();
const scrollIndicator = ref<HTMLElement>();
const scrollProgress = ref<HTMLElement>();

const cardsTitle = ref<HTMLElement>();
const featureCards = ref<HTMLElement[]>([]);
const statsSection = ref<HTMLElement>();
const statNumbers = ref<HTMLElement[]>([]);

const timelineLine = ref<HTMLElement>();
const timelineProgress = ref<HTMLElement>();
const timelineItems = ref<HTMLElement[]>([]);

const morphShape = ref<SVGElement>();
const ctaSection = ref<HTMLElement>();
const ctaTitle = ref<HTMLElement>();
const ctaText = ref<HTMLElement>();
const ctaButton = ref<HTMLElement>();

// États
const isAutoMorphing = ref(false);

// Données
const features = [
  {
    title: "Animations Fluides",
    description: "Des transitions naturelles et performantes",
    icon: "majesticons:lightning-bolt",
    bgClass: "bg-gradient-to-br from-primary to-secondary"
  },
  {
    title: "ScrollTrigger",
    description: "Animations déclenchées par le scroll",
    icon: "majesticons:eye",
    bgClass: "bg-gradient-to-br from-accent to-info"
  },
  {
    title: "Interactions",
    description: "Réponses instantanées aux actions utilisateur",
    icon: "majesticons:cursor-click",
    bgClass: "bg-gradient-to-br from-success to-warning"
  },
  {
    title: "Performance",
    description: "Optimisé pour tous les appareils",
    icon: "majesticons:speedometer",
    bgClass: "bg-gradient-to-br from-error to-warning"
  },
  {
    title: "Responsive",
    description: "Adapté à toutes les tailles d'écran",
    icon: "majesticons:device-mobile",
    bgClass: "bg-gradient-to-br from-info to-primary"
  },
  {
    title: "Créatif",
    description: "Possibilités infinies de créativité",
    icon: "majesticons:palette",
    bgClass: "bg-gradient-to-br from-secondary to-accent"
  }
];

const stats = [
  { value: 500, label: "Projets", icon: "majesticons:folder", iconBg: "bg-primary" },
  { value: 50, label: "Clients", icon: "majesticons:users", iconBg: "bg-secondary" },
  { value: 99, label: "Satisfaction %", icon: "majesticons:heart", iconBg: "bg-accent" },
  { value: 24, label: "Support 24/7", icon: "majesticons:clock", iconBg: "bg-info" }
];

const timeline = [
  {
    year: "2020",
    title: "Début",
    description: "Lancement de notre aventure dans le développement web"
  },
  {
    year: "2021",
    title: "Croissance",
    description: "Expansion de l'équipe et nouveaux projets"
  },
  {
    year: "2022",
    title: "Innovation",
    description: "Adoption de GSAP et technologies modernes"
  },
  {
    year: "2023",
    title: "Excellence",
    description: "Expertise reconnue dans les animations web"
  }
];

const shapes = [
  { name: "Diamant", path: "M100,20 L180,100 L100,180 L20,100 Z" },
  { name: "Cercle", path: "M100,20 A80,80 0 1,1 99.99,20 Z" },
  { name: "Triangle", path: "M100,20 L180,160 L20,160 Z" },
  { name: "Étoile", path: "M100,20 L115,65 L170,65 L125,95 L140,140 L100,115 L60,140 L75,95 L30,65 L85,65 Z" },
  { name: "Carré", path: "M40,40 L160,40 L160,160 L40,160 Z" }
];

// Animation au montage
onMounted(() => {
  if (process.client && $gsap) {
    setupInitialAnimations();
    setupScrollTriggers();
    setupParallax();
    initializeBackgroundParticles();
  }
});

// Animations initiales
const setupInitialAnimations = () => {
  // Hero animations
  $gsap.fromTo(heroTitle.value, 
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
  );
  
  $gsap.fromTo(heroSubtitle.value, 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8 }
  );
  
  $gsap.fromTo(heroButton.value, 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 1.1 }
  );
  
  // Scroll indicator animation
  $gsap.to(scrollIndicator.value, {
    y: 10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
  });
};

// Configuration ScrollTrigger
const setupScrollTriggers = () => {
  // Animation du titre des cartes
  $gsap.fromTo(cardsTitle.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: cardsTitle.value,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Animation des cartes de fonctionnalités
  featureCards.value.forEach((card, index) => {
    if (card) {
      $gsap.fromTo(card,
        { y: 80, opacity: 0, rotationY: 45 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  });

  // Animation des statistiques
  $gsap.fromTo(statsSection.value,
    { scale: 0.9, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: statsSection.value,
        start: "top 70%",
        onEnter: animateCounters,
        toggleActions: "play none none reverse"
      }
    }
  );

  // Animation de la timeline
  $gsap.fromTo(timelineProgress.value,
    { width: "0%" },
    {
      width: "100%",
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: timelineLine.value,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    }
  );

  timelineItems.value.forEach((item, index) => {
    if (item) {
      $gsap.fromTo(item,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  });

  // Animation du CTA final
  $gsap.fromTo([ctaTitle.value, ctaText.value, ctaButton.value],
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ctaSection.value,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// Effet parallax
const setupParallax = () => {
  $gsap.to(bgLayer1.value, {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: heroSection.value,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  $gsap.to(bgLayer2.value, {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: heroSection.value,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  // Progress du scroll
  $gsap.to(scrollProgress.value, {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: heroSection.value,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

// Initialisation des particules de fond
const initializeBackgroundParticles = () => {
  bgParticles.value.forEach((particle, index) => {
    if (particle) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      $gsap.set(particle, {
        left: x + '%',
        top: y + '%'
      });
      
      $gsap.to(particle, {
        y: `+=${Math.random() * 30 - 15}`,
        x: `+=${Math.random() * 30 - 15}`,
        duration: Math.random() * 4 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    }
  });
};

// Animation des compteurs
const animateCounters = () => {
  stats.forEach((stat, index) => {
    const element = statNumbers.value[index];
    if (element) {
      $gsap.fromTo({ value: 0 }, 
        { value: stat.value },
        {
          duration: 2,
          delay: index * 0.2,
          ease: "power2.out",
          onUpdate: function() {
            const value = Math.round(this.targets()[0].value);
            element.textContent = stat.label.includes('%') ? value + '%' : value + '+';
          }
        }
      );
    }
  });
};

// Morphing de formes
const morphToShape = (newPath: string) => {
  if (morphShape.value) {
    $gsap.to(morphShape.value, {
      morphSVG: newPath,
      duration: 1,
      ease: "power2.inOut"
    });
  }
};

const startAutoMorph = () => {
  if (isAutoMorphing.value) return;
  
  isAutoMorphing.value = true;
  let currentIndex = 0;
  
  const morphInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % shapes.length;
    morphToShape(shapes[currentIndex].path);
    
    if (currentIndex === 0) {
      clearInterval(morphInterval);
      isAutoMorphing.value = false;
    }
  }, 1500);
};
</script>

<style scoped>
.feature-card {
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.timeline-item {
  transform-style: preserve-3d;
}

.timeline-dot {
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.3);
  box-shadow: 0 0 20px oklch(var(--p));
}

.morphing-shape {
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}

.morphing-shape:hover {
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
}
</style>
