<template>
  <div class="w-full bg-gradient-to-br from-base-100 to-base-200 py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12 text-primary">
        Graphiques et Visualisations Animés
      </h2>

      <!-- Section des barres de progression animées -->
      <div class="mb-16">
        <h3 class="text-2xl font-semibold mb-8 text-center">Statistiques de Compétences</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div 
            v-for="(skill, index) in skills" 
            :key="skill.name"
            class="bg-base-100 p-6 rounded-xl shadow-lg"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">{{ skill.name }}</span>
              <span ref="skillPercents" class="text-lg font-bold text-primary">0%</span>
            </div>
            <div class="w-full bg-base-300 rounded-full h-4 overflow-hidden">
              <div 
                :ref="el => progressBars[index] = el"
                class="h-full rounded-full transition-all duration-300"
                :class="skill.colorClass"
                style="width: 0%"
              ></div>
            </div>
          </div>
        </div>
        <div class="text-center mt-8">
          <button 
            @click="animateSkills" 
            class="btn btn-primary btn-lg"
            :disabled="isAnimatingSkills"
          >
            <Icon v-if="!isAnimatingSkills" name="majesticons:chart-bar" class="mr-2" />
            <Icon v-else name="majesticons:loading" class="mr-2 animate-spin" />
            {{ isAnimatingSkills ? 'Animation en cours...' : 'Animer les statistiques' }}
          </button>
        </div>
      </div>

      <!-- Section du graphique circulaire animé -->
      <div class="mb-16">
        <h3 class="text-2xl font-semibold mb-8 text-center">Diagramme Circulaire Interactif</h3>
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-5xl mx-auto">
          <!-- Graphique SVG -->
          <div class="flex-1">
            <div class="bg-base-100 p-8 rounded-xl shadow-lg">
              <svg 
                ref="pieChart" 
                width="300" 
                height="300" 
                viewBox="0 0 300 300"
                class="mx-auto"
              >
                <!-- Cercles de fond -->
                <circle 
                  cx="150" 
                  cy="150" 
                  r="120" 
                  fill="none" 
                  stroke="oklch(var(--b3))" 
                  stroke-width="20"
                />
                
                <!-- Segments animés -->
                <circle 
                  v-for="(segment, index) in pieSegments"
                  :key="index"
                  :ref="el => pieElements[index] = el"
                  cx="150" 
                  cy="150" 
                  r="120"
                  fill="none"
                  :stroke="segment.color"
                  stroke-width="20"
                  :stroke-dasharray="`${segment.percentage * 7.54} ${754 - segment.percentage * 7.54}`"
                  :stroke-dashoffset="segment.offset"
                  stroke-linecap="round"
                  class="pie-segment"
                  @mouseenter="highlightSegment(index)"
                  @mouseleave="resetSegment(index)"
                />
                
                <!-- Centre du graphique -->
                <circle 
                  cx="150" 
                  cy="150" 
                  r="50" 
                  fill="oklch(var(--p))"
                  class="center-circle"
                />
                <text 
                  ref="centerText"
                  x="150" 
                  y="155" 
                  text-anchor="middle" 
                  class="text-lg font-bold fill-primary-content"
                >
                  100%
                </text>
              </svg>
            </div>
          </div>
          
          <!-- Légende interactive -->
          <div class="flex-1">
            <div class="space-y-4">
              <div 
                v-for="(segment, index) in pieSegments"
                :key="index"
                :ref="el => legendItems[index] = el"
                class="flex items-center justify-between p-4 bg-base-100 rounded-lg shadow cursor-pointer legend-item"
                @mouseenter="highlightSegment(index)"
                @mouseleave="resetSegment(index)"
                @click="toggleSegment(index)"
              >
                <div class="flex items-center gap-3">
                  <div 
                    class="w-4 h-4 rounded-full"
                    :style="`background-color: ${segment.color}`"
                  ></div>
                  <span class="font-medium">{{ segment.label }}</span>
                </div>
                <div class="text-right">
                  <div class="font-bold">{{ segment.percentage }}%</div>
                  <div class="text-sm opacity-70">{{ segment.value }} éléments</div>
                </div>
              </div>
            </div>
            <div class="mt-6 text-center">
              <button 
                @click="animatePieChart" 
                class="btn btn-secondary"
                :disabled="isAnimatingPie"
              >
                <Icon v-if="!isAnimatingPie" name="majesticons:pie-chart" class="mr-2" />
                <Icon v-else name="majesticons:loading" class="mr-2 animate-spin" />
                {{ isAnimatingPie ? 'Animation...' : 'Animer le graphique' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section des particules flottantes -->
      <div class="mb-16">
        <h3 class="text-2xl font-semibold mb-8 text-center">Particules Interactives</h3>
        <div class="bg-base-100 rounded-xl shadow-lg p-8 relative overflow-hidden" style="height: 400px;">
          <div 
            ref="particlesContainer" 
            class="absolute inset-0"
            @mousemove="handleMouseMove"
            @mouseleave="resetParticles"
          >
            <div 
              v-for="i in 50" 
              :key="i"
              :ref="el => particles[i-1] = el"
              class="absolute w-2 h-2 bg-primary rounded-full particle"
            ></div>
          </div>
          <div class="relative z-10 text-center">
            <h4 class="text-xl font-semibold mb-4">Déplacez votre souris ici</h4>
            <button 
              @click="explodeParticles" 
              class="btn btn-warning"
            >
              <Icon name="majesticons:explosion" class="mr-2" />
              Explosion de particules
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp();

// Refs
const skillPercents = ref<HTMLElement[]>([]);
const progressBars = ref<HTMLElement[]>([]);
const pieChart = ref<HTMLElement>();
const pieElements = ref<HTMLElement[]>([]);
const legendItems = ref<HTMLElement[]>([]);
const centerText = ref<HTMLElement>();
const particlesContainer = ref<HTMLElement>();
const particles = ref<HTMLElement[]>([]);

// États
const isAnimatingSkills = ref(false);
const isAnimatingPie = ref(false);

// Données des compétences
const skills = [
  { name: "Vue.js", percentage: 95, colorClass: "bg-success" },
  { name: "GSAP", percentage: 88, colorClass: "bg-primary" },
  { name: "TypeScript", percentage: 92, colorClass: "bg-info" },
  { name: "CSS/SCSS", percentage: 90, colorClass: "bg-warning" },
  { name: "Nuxt.js", percentage: 85, colorClass: "bg-secondary" },
  { name: "Node.js", percentage: 80, colorClass: "bg-accent" }
];

// Données du graphique circulaire
const pieSegments = ref([
  { label: "Frontend", percentage: 40, value: 120, color: "oklch(var(--p))", offset: 0 },
  { label: "Backend", percentage: 25, value: 75, color: "oklch(var(--s))", offset: 0 },
  { label: "DevOps", percentage: 15, value: 45, color: "oklch(var(--a))", offset: 0 },
  { label: "Design", percentage: 20, value: 60, color: "oklch(var(--in))", offset: 0 }
]);

// Calcul des offsets pour le graphique circulaire
const calculateOffsets = () => {
  let cumulativePercentage = 0;
  pieSegments.value.forEach((segment, index) => {
    segment.offset = -cumulativePercentage * 7.54;
    cumulativePercentage += segment.percentage;
  });
};

// Animation au montage
onMounted(() => {
  if (process.client && $gsap) {
    calculateOffsets();
    
    // Initialiser les particules
    initParticles();
    
    // Animation d'entrée des éléments
    $gsap.fromTo(".legend-item", 
      { x: 50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
      }
    );
  }
});

// Animation des compétences
const animateSkills = () => {
  if (isAnimatingSkills.value) return;
  
  isAnimatingSkills.value = true;
  
  // Reset
  progressBars.value.forEach(bar => {
    if (bar) bar.style.width = '0%';
  });
  
  skillPercents.value.forEach(percent => {
    if (percent) percent.textContent = '0%';
  });
  
  // Animation des barres et pourcentages
  skills.forEach((skill, index) => {
    const bar = progressBars.value[index];
    const percent = skillPercents.value[index];
    
    if (bar && percent) {
      $gsap.to(bar, {
        width: `${skill.percentage}%`,
        duration: 1.5,
        delay: index * 0.2,
        ease: "power2.out"
      });
      
      $gsap.to({ value: 0 }, {
        value: skill.percentage,
        duration: 1.5,
        delay: index * 0.2,
        ease: "power2.out",
        onUpdate: function() {
          percent.textContent = Math.round(this.targets()[0].value) + '%';
        }
      });
    }
  });
  
  setTimeout(() => {
    isAnimatingSkills.value = false;
  }, skills.length * 200 + 1500);
};

// Animation du graphique circulaire
const animatePieChart = () => {
  if (isAnimatingPie.value) return;
  
  isAnimatingPie.value = true;
  
  // Reset les segments
  pieElements.value.forEach(element => {
    if (element) {
      $gsap.set(element, {
        strokeDasharray: "0 754",
        rotation: 0,
        transformOrigin: "150px 150px"
      });
    }
  });
  
  // Animation séquentielle des segments
  let cumulativeDelay = 0;
  pieSegments.value.forEach((segment, index) => {
    const element = pieElements.value[index];
    if (element) {
      $gsap.to(element, {
        strokeDasharray: `${segment.percentage * 7.54} ${754 - segment.percentage * 7.54}`,
        rotation: 360,
        duration: 1.5,
        delay: cumulativeDelay,
        ease: "power2.out"
      });
      cumulativeDelay += 0.3;
    }
  });
  
  // Animation du centre
  $gsap.fromTo(centerText.value,
    { scale: 0 },
    { 
      scale: 1, 
      duration: 0.5,
      delay: 1,
      ease: "back.out(1.7)"
    }
  );
  
  setTimeout(() => {
    isAnimatingPie.value = false;
  }, 3000);
};

// Highlighting des segments
const highlightSegment = (index: number) => {
  const element = pieElements.value[index];
  const legendItem = legendItems.value[index];
  
  if (element) {
    $gsap.to(element, {
      strokeWidth: 25,
      duration: 0.3,
      ease: "power2.out"
    });
  }
  
  if (legendItem) {
    $gsap.to(legendItem, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  }
};

const resetSegment = (index: number) => {
  const element = pieElements.value[index];
  const legendItem = legendItems.value[index];
  
  if (element) {
    $gsap.to(element, {
      strokeWidth: 20,
      duration: 0.3,
      ease: "power2.out"
    });
  }
  
  if (legendItem) {
    $gsap.to(legendItem, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  }
};

const toggleSegment = (index: number) => {
  const element = pieElements.value[index];
  if (element) {
    $gsap.to(element, {
      rotation: "+=360",
      duration: 1,
      ease: "power2.inOut"
    });
  }
};

// Initialisation des particules
const initParticles = () => {
  particles.value.forEach((particle, index) => {
    if (particle) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      $gsap.set(particle, {
        left: x + '%',
        top: y + '%',
        opacity: Math.random() * 0.8 + 0.2
      });
      
      // Animation flottante
      $gsap.to(particle, {
        y: `+=${Math.random() * 20 - 10}`,
        x: `+=${Math.random() * 20 - 10}`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    }
  });
};

// Interaction souris avec les particules
const handleMouseMove = (event: MouseEvent) => {
  if (!particlesContainer.value) return;
  
  const rect = particlesContainer.value.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  
  particles.value.forEach(particle => {
    if (particle) {
      const particleRect = particle.getBoundingClientRect();
      const particleX = particleRect.left + particleRect.width / 2 - rect.left;
      const particleY = particleRect.top + particleRect.height / 2 - rect.top;
      
      const distance = Math.sqrt((mouseX - particleX) ** 2 + (mouseY - particleY) ** 2);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        const angle = Math.atan2(particleY - mouseY, particleX - mouseX);
        
        $gsap.to(particle, {
          x: `+=${Math.cos(angle) * force * 20}`,
          y: `+=${Math.sin(angle) * force * 20}`,
          scale: 1 + force * 0.5,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  });
};

const resetParticles = () => {
  particles.value.forEach(particle => {
    if (particle) {
      $gsap.to(particle, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      });
    }
  });
};

// Explosion de particules
const explodeParticles = () => {
  particles.value.forEach(particle => {
    if (particle) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 200 + 100;
      
      $gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: Math.random() * 2 + 0.5,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          $gsap.set(particle, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: Math.random() * 0.8 + 0.2
          });
        }
      });
    }
  });
};
</script>

<style scoped>
.pie-segment {
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: 150px 150px;
}

.legend-item {
  transition: all 0.3s ease;
}

.legend-item:hover {
  background-color: oklch(var(--b2));
}

.particle {
  pointer-events: none;
}

.center-circle {
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}
</style>
