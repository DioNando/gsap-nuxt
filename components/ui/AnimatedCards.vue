<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold text-center mb-8 text-primary">Cartes Animées</h2>
    
    <!-- Grid de cartes avec animations au scroll -->
    <div ref="cardsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Carte 1: Animation de rotation au hover -->
      <div 
        ref="card1" 
        class="card bg-base-100 shadow-xl hover-card cursor-pointer"
        @mouseenter="animateCardHover"
        @mouseleave="resetCardHover"
      >
        <figure class="px-6 pt-6">
          <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Icon name="majesticons:rocket-line" class="text-primary-content text-2xl" />
          </div>
        </figure>
        <div class="card-body items-center text-center">
          <h3 class="card-title text-primary">Performance</h3>
          <p>Des animations fluides et optimisées pour une expérience utilisateur exceptionnelle.</p>
        </div>
      </div>

      <!-- Carte 2: Animation de scale et glow -->
      <div 
        ref="card2" 
        class="card bg-base-100 shadow-xl hover-card cursor-pointer"
        @mouseenter="animateCardScale"
        @mouseleave="resetCardScale"
      >
        <figure class="px-6 pt-6">
          <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="majesticons:magic-line" class="text-secondary-content text-2xl" />
          </div>
        </figure>
        <div class="card-body items-center text-center">
          <h3 class="card-title text-secondary">Interactions</h3>
          <p>Des micro-interactions qui rendent l'interface vivante et engageante.</p>
        </div>
      </div>

      <!-- Carte 3: Animation de flip -->
      <div 
        ref="card3" 
        class="card bg-base-100 shadow-xl hover-card cursor-pointer perspective"
        @click="flipCard"
      >
        <div ref="cardInner3" class="card-inner">
          <!-- Face avant -->
          <div class="card-face card-face-front">
            <figure class="px-6 pt-6">
              <div class="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                <Icon name="majesticons:palette-line" class="text-accent-content text-2xl" />
              </div>
            </figure>
            <div class="card-body items-center text-center">
              <h3 class="card-title text-accent">Design</h3>
              <p>Cliquez pour voir plus</p>
            </div>
          </div>
          <!-- Face arrière -->
          <div class="card-face card-face-back">
            <div class="card-body items-center text-center">
              <h3 class="card-title text-accent">Détails</h3>
              <p>Interface moderne avec daisyUI 5 et animations GSAP pour une expérience utilisateur premium.</p>
              <div class="card-actions">
                <button class="btn btn-accent btn-sm">En savoir plus</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section avec timeline d'animation -->
    <div class="mt-12">
      <div class="text-center mb-8">
        <button 
          @click="playTimeline" 
          class="btn btn-primary btn-lg"
          :disabled="isPlaying"
        >
          <Icon v-if="!isPlaying" name="majesticons:play" class="mr-2" />
          <Icon v-else name="majesticons:loading" class="mr-2 animate-spin" />
          {{ isPlaying ? 'Animation en cours...' : 'Lancer l\'animation' }}
        </button>
      </div>
      
      <!-- Éléments à animer en séquence -->
      <div class="flex flex-wrap justify-center gap-4">
        <div 
          v-for="i in 6" 
          :key="i"
          :ref="el => timelineElements[i-1] = el"
          class="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold timeline-element"
        >
          {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp();

// Refs pour les éléments
const cardsContainer = ref<HTMLElement>();
const card1 = ref<HTMLElement>();
const card2 = ref<HTMLElement>();
const card3 = ref<HTMLElement>();
const cardInner3 = ref<HTMLElement>();
const timelineElements = ref<HTMLElement[]>([]);
const isPlaying = ref(false);

// État pour la carte flip
const isFlipped = ref(false);

// Animation au montage du composant
onMounted(() => {
  if (process.client && $gsap) {
    // Animation d'entrée des cartes
    $gsap.set([card1.value, card2.value, card3.value], {
      y: 50,
      opacity: 0
    });

    // Animation avec stagger
    $gsap.to([card1.value, card2.value, card3.value], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      delay: 0.3
    });

    // ScrollTrigger pour les éléments de timeline
    $gsap.fromTo(timelineElements.value, 
      {
        scale: 0,
        rotation: 45
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: timelineElements.value[0],
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }
});

// Animations au hover pour la carte 1
const animateCardHover = (event: Event) => {
  const card = event.currentTarget as HTMLElement;
  $gsap.to(card, {
    rotationY: 10,
    rotationX: 5,
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out"
  });
};

const resetCardHover = (event: Event) => {
  const card = event.currentTarget as HTMLElement;
  $gsap.to(card, {
    rotationY: 0,
    rotationX: 0,
    scale: 1,
    duration: 0.3,
    ease: "power2.out"
  });
};

// Animations de scale pour la carte 2
const animateCardScale = (event: Event) => {
  const card = event.currentTarget as HTMLElement;
  $gsap.to(card, {
    scale: 1.1,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    duration: 0.3,
    ease: "power2.out"
  });
};

const resetCardScale = (event: Event) => {
  const card = event.currentTarget as HTMLElement;
  $gsap.to(card, {
    scale: 1,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    duration: 0.3,
    ease: "power2.out"
  });
};

// Animation flip pour la carte 3
const flipCard = () => {
  if (!cardInner3.value) return;
  
  const newRotation = isFlipped.value ? 0 : 180;
  
  $gsap.to(cardInner3.value, {
    rotationY: newRotation,
    duration: 0.6,
    ease: "power2.inOut"
  });
  
  isFlipped.value = !isFlipped.value;
};

// Animation de timeline séquentielle
const playTimeline = () => {
  if (isPlaying.value) return;
  
  isPlaying.value = true;
  
  const tl = $gsap.timeline({
    onComplete: () => {
      isPlaying.value = false;
    }
  });
  
  // Réinitialiser les positions
  tl.set(timelineElements.value, {
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0
  });
  
  // Séquence d'animations
  tl.to(timelineElements.value, {
    scale: 1.5,
    duration: 0.2,
    stagger: 0.1,
    ease: "power2.out"
  })
  .to(timelineElements.value, {
    rotation: 360,
    duration: 0.5,
    stagger: 0.05,
    ease: "power2.inOut"
  }, "-=0.5")
  .to(timelineElements.value, {
    y: -30,
    duration: 0.3,
    stagger: 0.05,
    ease: "power2.out"
  })
  .to(timelineElements.value, {
    y: 0,
    scale: 1,
    duration: 0.4,
    stagger: 0.05,
    ease: "bounce.out"
  });
};
</script>

<style scoped>
.hover-card {
  transform-style: preserve-3d;
}

.perspective {
  perspective: 1000px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 1rem;
  background: oklch(var(--b1));
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card-face-back {
  transform: rotateY(180deg);
}

.timeline-element {
  transition: all 0.3s ease;
}

.timeline-element:hover {
  transform: scale(1.1);
}
</style>
