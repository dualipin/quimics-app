<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import teamImage from '@/assets/equipo.jpeg'

// Registrar el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Animación para el título y subtítulo
  gsap.from('.section-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  })

  gsap.from('.section-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out',
  })

  gsap.from('.section-description', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: 'power3.out',
  })

  // Animación para la imagen del equipo
  gsap.from('.team-image', {
    scale: 0.9,
    opacity: 0,
    duration: 1.2,
    delay: 0.9,
    ease: 'elastic.out(1, 0.5)',
    scrollTrigger: {
      trigger: '.team-image',
      start: 'top 80%',
    },
  })

  // Animación para las tarjetas de equipo
  gsap.from('.team-card', {
    y: 50,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    delay: 1.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.team-grid',
      start: 'top 75%',
    },
  })

  // Efecto hover para las tarjetas
  const cards = document.querySelectorAll('.team-card')
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        scale: 1.03,
        duration: 0.3,
        ease: 'power2.out',
      })
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  })
})
</script>

<template>
  <section class="overflow-hidden bg-white py-20 dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Encabezado -->
      <div class="mb-16 lg:text-center">
        <h2
          class="section-title text-base font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400"
        >
          Nuestro Equipo
        </h2>
        <p
          class="section-subtitle mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white"
        >
          Jóvenes comprometidos con la
          <span class="text-indigo-600 dark:text-indigo-400">innovación</span>
        </p>
        <p
          class="section-description mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300"
        >
          Juntos, buscamos transformar la enseñanza de la química en México, promoviendo una
          educación de calidad, inclusiva y alineada con los Objetivos de Desarrollo Sostenible.
        </p>
      </div>

      <!-- Imagen del equipo -->
      <div class="mb-16">
        <div class="team-image-container mx-auto max-w-4xl">
          <img
            :src="teamImage"
            alt="Nuestro equipo"
            class="team-image hover:shadow-3xl h-auto w-full transform object-cover shadow-2xl transition-all duration-500"
            style="border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%"
          />
        </div>
      </div>

      <!-- Miembros del equipo -->
      <div class="team-grid grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Miembro 1 -->
        <div
          class="team-card overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="relative px-6 py-8 text-center">
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 opacity-0 transition-opacity duration-300 hover:opacity-10"
            ></div>
            <h3 class="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
              Iván Antonio Méndez Segura
            </h3>
            <p class="font-medium text-indigo-600 dark:text-indigo-400">Líder del Proyecto</p>
            <div class="mt-4 flex justify-center space-x-4">
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Miembro 2 -->
        <div
          class="team-card overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="relative px-6 py-8 text-center">
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 opacity-0 transition-opacity duration-300 hover:opacity-10"
            ></div>
            <h3 class="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
              Irvin Emir Méndez Segura
            </h3>
            <p class="font-medium text-indigo-600 dark:text-indigo-400">Desarrollador Principal</p>
            <div class="mt-4 flex justify-center space-x-4">
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Miembro 3 -->
        <div
          class="team-card overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="relative px-6 py-8 text-center">
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-700 opacity-0 transition-opacity duration-300 hover:opacity-10"
            ></div>
            <h3 class="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
              Ángeles Zamora Cuevas
            </h3>
            <p class="font-medium text-indigo-600 dark:text-indigo-400">Analista</p>
            <div class="mt-4 flex justify-center space-x-4">
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Miembro 4 -->
        <div
          class="team-card overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="relative px-6 py-8 text-center">
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 opacity-0 transition-opacity duration-300 hover:opacity-10"
            ></div>
            <h3 class="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
              Kevin de Jesús Álvarez Collado
            </h3>
            <p class="font-medium text-indigo-600 dark:text-indigo-400">Analista</p>
            <div class="mt-4 flex justify-center space-x-4">
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-500 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Efecto de gradiente sutil al hacer hover */
.team-card:hover {
  transform: translateY(-5px);
}

/* Transición suave para la imagen */
.team-image {
  transition: all 0.5s ease;
}

.team-image:hover {
  transform: scale(1.02);
}

/* Efecto de borde animado para las tarjetas */
.team-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.team-card:hover::before {
  transform: scaleX(1);
}
</style>
