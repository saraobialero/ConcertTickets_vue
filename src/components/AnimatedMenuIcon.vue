<template>
  <button @click="$emit('toggle')" @mouseenter="startHoverAnimation" @mouseleave="endHoverAnimation"
    class="w-10 h-12 flex justify-center items-center focus:outline-none relative overflow-hidden"
    :class="{ 'hovered': isHovered, 'open': isOpen }" aria-label="Menu">
    <div class="dot-container" :class="{ 'horizontal': isHovered || isOpen }">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </button>
</template>

<script setup>
import { ref } from 'vue';

const isHovered = ref(false);
const isAnimating = ref(false);

const props = defineProps({
  isOpen: Boolean
});

function startHoverAnimation() {
  isHovered.value = true;
  isAnimating.value = true;
}

function endHoverAnimation() {
  isHovered.value = false;
  setTimeout(() => {
    isAnimating.value = false;
  }, 1200); // Increased to match the new, longer animation duration
}
</script>

<style scoped>
.dot-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dot-container.horizontal {
  flex-direction: row;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #181818;
  border-radius: 50%;
  margin: 1.5px 0;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.horizontal .dot {
  margin: 0 1.5px;
}

.hovered .dot,
.open .dot {
  background-color: #212326;
}

.hovered .dot:nth-child(1),
.open .dot:nth-child(1) {
  animation: bounce-out1 0.6s ease forwards;
}

.hovered .dot:nth-child(2),
.open .dot:nth-child(2) {
  animation: bounce-out2 0.6s ease forwards;
}

.hovered .dot:nth-child(3),
.open .dot:nth-child(3) {
  animation: bounce-out3 0.6s ease forwards;
}

button:not(.hovered):not(.open) .dot-container.horizontal .dot:nth-child(1) {
  animation: bounce-in1 1.2s ease forwards;
}

button:not(.hovered):not(.open) .dot-container.horizontal .dot:nth-child(2) {
  animation: bounce-in2 1.2s ease forwards;
}

button:not(.hovered):not(.open) .dot-container.horizontal .dot:nth-child(3) {
  animation: bounce-in3 1.2s ease forwards;
}

@keyframes bounce-out1 {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(-4px, -6px);
  }

  100% {
    transform: translate(-3px, 0);
  }
}

@keyframes bounce-out2 {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, -8px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes bounce-out3 {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(4px, -6px);
  }

  100% {
    transform: translate(3px, 0);
  }
}

@keyframes bounce-in1 {
  0% {
    transform: translate(-3px, 0);
  }

  50% {
    transform: translate(-1px, -4px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes bounce-in2 {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, -6px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes bounce-in3 {
  0% {
    transform: translate(3px, 0);
  }

  50% {
    transform: translate(1px, -4px);
  }

  100% {
    transform: translate(0, 0);
  }
}

button {
  transition: transform 0.2s ease-in-out;
}

.hovered {
  transform: scale(1.2);
}
</style>