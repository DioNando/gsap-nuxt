<template>
  <div class="w-full bg-base-200 py-12 overflow-hidden">
    <div class="container mx-auto px-4">
      <h2 ref="title" class="text-4xl font-bold text-center mb-8 text-primary">
        Texte Animé avec GSAP
      </h2>
      
      <!-- Section de texte avec animation de typewriter -->
      <div class="max-w-4xl mx-auto mb-12">
        <div class="text-center mb-8">
          <button 
            @click="startTypewriter" 
            class="btn btn-secondary"
            :disabled="isTyping"
          >
            <Icon v-if="!isTyping" name="majesticons:cursor-text" class="mr-2" />
            <Icon v-else name="majesticons:loading" class="mr-2 animate-spin" />
            {{ isTyping ? 'Écriture en cours...' : 'Démarrer l\'animation typewriter' }}
          </button>
        </div>
        
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <p ref="typewriterText" class="text-lg leading-relaxed text-center typewriter-text">
              <!-- Le texte sera injecté par GSAP -->
            </p>
            <div ref="cursor" class="typewriter-cursor">|</div>
          </div>
        </div>
      </div>

      <!-- Section de mots qui apparaissent un par un -->
      <div class="text-center mb-12">
        <button 
          @click="animateWords" 
          class="btn btn-accent mb-6"
          :disabled="isAnimatingWords"
        >
          <Icon v-if="!isAnimatingWords" name="majesticons:text" class="mr-2" />
          <Icon v-else name="majesticons:loading" class="mr-2 animate-spin" />
          {{ isAnimatingWords ? 'Animation en cours...' : 'Animer les mots' }}
        </button>
        
        <div class="max-w-2xl mx-auto">
          <h3 ref="wordsContainer" class="text-2xl font-semibold leading-relaxed">
            <span 
              v-for="(word, index) in words" 
              :key="index"
              :ref="el => wordElements[index] = el"
              class="word-element inline-block mr-2"
            >
              {{ word }}
            </span>
          </h3>
        </div>
      </div>

      <!-- Section de lettres qui dansent -->
      <div class="text-center mb-12">
        <button 
          @click="animateLetters" 
          class="btn btn-info mb-6"
          :disabled="isAnimatingLetters"
        >
          <Icon v-if="!isAnimatingLetters" name="majesticons:sparkles" class="mr-2" />
          <Icon v-else name="majesticons:loading" class="mr-2 animate-spin" />
          {{ isAnimatingLetters ? 'Danse en cours...' : 'Faire danser les lettres' }}
        </button>
        
        <div class="bg-base-100 rounded-lg p-8 shadow-xl">
          <h3 ref="lettersContainer" class="text-4xl font-bold text-primary">
            <span 
              v-for="(letter, index) in letters" 
              :key="index"
              :ref="el => letterElements[index] = el"
              class="letter-element inline-block"
              :class="{ 'mr-4': letter === ' ' }"
            >
              {{ letter === ' ' ? '\u00A0' : letter }}
            </span>
          </h3>
        </div>
      </div>

      <!-- Section de morphing de texte -->
      <div class="text-center">
        <button 
          @click="startMorphing" 
          class="btn btn-warning mb-6"
          :disabled="isMorphing"
        >
          <Icon v-if="!isMorphing" name="majesticons:refresh" class="mr-2" />
          <Icon v-else name="majesticons:loading" class="mr-2 animate-spin" />
          {{ isMorphing ? 'Morphing...' : 'Démarrer le morphing' }}
        </button>
        
        <div class="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 shadow-xl">
          <h3 ref="morphText" class="text-3xl font-bold text-primary-content">
            GSAP + daisyUI
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp();

// Refs
const title = ref<HTMLElement>();
const typewriterText = ref<HTMLElement>();
const cursor = ref<HTMLElement>();
const wordsContainer = ref<HTMLElement>();
const lettersContainer = ref<HTMLElement>();
const morphText = ref<HTMLElement>();

// Arrays pour les éléments
const wordElements = ref<HTMLElement[]>([]);
const letterElements = ref<HTMLElement[]>([]);

// États
const isTyping = ref(false);
const isAnimatingWords = ref(false);
const isAnimatingLetters = ref(false);
const isMorphing = ref(false);

// Données
const typewriterFullText = "Bienvenue dans le monde fascinant des animations GSAP ! Cette bibliothèque puissante permet de créer des expériences utilisateur exceptionnelles avec des animations fluides et performantes.";

const words = [
  "Les", "animations", "GSAP", "transforment", "votre", "interface", 
  "en", "une", "expérience", "interactive", "et", "engageante", "pour", "vos", "utilisateurs."
];

const letters = "ANIMATIONS".split("");

const morphTexts = [
  "GSAP + daisyUI",
  "Animations",
  "Interactives", 
  "Performantes",
  "Modernes",
  "GSAP + daisyUI"
];

// Animation au montage
onMounted(() => {
  if (process.client && $gsap) {
    // Animation du titre principal
    $gsap.fromTo(title.value, 
      { 
        y: -50, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.8)"
      }
    );

    // Animation du curseur clignotant
    $gsap.to(cursor.value, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Initialiser les éléments de mots et lettres comme invisibles
    $gsap.set(wordElements.value, { opacity: 0, y: 20 });
    $gsap.set(letterElements.value, { opacity: 0, y: 20, rotation: 45 });
  }
});

// Animation typewriter
const startTypewriter = () => {
  if (isTyping.value || !typewriterText.value) return;
  
  isTyping.value = true;
  typewriterText.value.textContent = "";
  
  // Animation typewriter avec GSAP
  let currentText = "";
  let currentIndex = 0;
  
  const typeInterval = setInterval(() => {
    if (currentIndex < typewriterFullText.length) {
      currentText += typewriterFullText[currentIndex];
      typewriterText.value.textContent = currentText;
      currentIndex++;
    } else {
      clearInterval(typeInterval);
      isTyping.value = false;
      
      // Animation finale du texte
      $gsap.to(typewriterText.value, {
        scale: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  }, 50);
};

// Animation des mots
const animateWords = () => {
  if (isAnimatingWords.value) return;
  
  isAnimatingWords.value = true;
  
  // Reset des mots
  $gsap.set(wordElements.value, { 
    opacity: 0, 
    y: 20,
    rotationX: 90
  });
  
  // Animation séquentielle
  $gsap.to(wordElements.value, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "back.out(1.7)",
    onComplete: () => {
      isAnimatingWords.value = false;
    }
  });
};

// Animation des lettres qui dansent
const animateLetters = () => {
  if (isAnimatingLetters.value) return;
  
  isAnimatingLetters.value = true;
  
  const tl = $gsap.timeline({
    onComplete: () => {
      isAnimatingLetters.value = false;
    }
  });
  
  // Reset
  tl.set(letterElements.value, { 
    opacity: 1,
    y: 0,
    rotation: 0,
    scale: 1
  });
  
  // Danse des lettres
  tl.to(letterElements.value, {
    y: -30,
    rotation: 360,
    scale: 1.5,
    duration: 0.3,
    stagger: 0.05,
    ease: "power2.out"
  })
  .to(letterElements.value, {
    y: 0,
    rotation: 0,
    scale: 1,
    duration: 0.4,
    stagger: 0.05,
    ease: "bounce.out"
  })
  .to(letterElements.value, {
    rotationY: 360,
    duration: 0.5,
    stagger: 0.03,
    ease: "power2.inOut"
  }, "-=0.2");
};

// Animation de morphing de texte
const startMorphing = () => {
  if (isMorphing.value) return;
  
  isMorphing.value = true;
  
  let currentIndex = 1;
  
  const morphInterval = setInterval(() => {
    if (currentIndex < morphTexts.length) {
      // Animation de sortie
      $gsap.to(morphText.value, {
        opacity: 0,
        scale: 0.8,
        rotationY: 90,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Changer le texte
          morphText.value.textContent = morphTexts[currentIndex];
          
          // Animation d'entrée
          $gsap.to(morphText.value, {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
      
      currentIndex++;
    } else {
      clearInterval(morphInterval);
      isMorphing.value = false;
    }
  }, 1500);
};
</script>

<style scoped>
.typewriter-text {
  font-family: 'Courier New', monospace;
  min-height: 2em;
  position: relative;
}

.typewriter-cursor {
  display: inline-block;
  font-size: 1.2em;
  font-weight: bold;
  color: oklch(var(--p));
  position: absolute;
  margin-left: 2px;
}

.word-element {
  transform-origin: center bottom;
}

.letter-element {
  transform-origin: center bottom;
  transition: all 0.3s ease;
}

.letter-element:hover {
  color: oklch(var(--s));
  transform: scale(1.2) translateY(-5px);
}
</style>
