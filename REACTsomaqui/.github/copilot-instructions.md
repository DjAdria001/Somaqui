
# SomAqui.cat React Codebase – Copilot Instructions

## 🏗️ Arquitectura y Estructura
- **React + TypeScript + Vite**: SPA moderna, tipada y optimizada para desarrollo rápido.
- **Routing**: Usa React Router para navegación entre páginas en `src/pages/`.
- **Componentes Reutilizables**: En `src/components/` (ej: `Header.tsx`, `Footer.tsx`, `Slider.tsx`, `MapComponent.tsx`).
- **Context API**: Estado global de autenticación en `src/context/AuthContext.tsx`.
- **Estilos**: CSS modular por página en `src/styles/`, más `global.css` para utilidades y resets.
- **Mapas**: Integración con Leaflet (`MapComponent.tsx`) y geolocalización del navegador.
- **Firebase**: Persistencia de datos en tiempo real (`src/firebase.ts`).

## 🧩 Páginas y Flujos Clave
- **Home**: `/`, slider, secciones informativas, cards, CTA.
- **Formulario de Ayuda**: `/formulario-ayuda`, formulario con mapa, selección de tipo de emergencia, validación y envío a Firebase.
- **Voluntario**: `/voluntario`, registro de voluntarios, selección de habilidades, lista de emergencias activas, modal de registro.
- **Equipo, Misión, FAQ, Contacto**: Páginas informativas con layouts y cards personalizadas.

## 🛠️ Workflows de Desarrollo
- **Instalación**: `npm install`
- **Desarrollo**: `npm run dev` (Vite, puerto 5173 por defecto)
- **Build Producción**: `npm run build`
- **Lint**: `npm run lint`
- **Preview**: `npm run preview`
- **Firebase**: Configurado en `src/firebase.ts` (Realtime Database)

## 📝 Convenciones y Patrones
- **Componentes**: Siempre funcionales y con hooks.
- **Tipado**: Usa interfaces/TypeScript en todos los props y estados.
- **Estilos**: Mantén la paleta de marca (`#39e4c9`, `#003333`), gradientes y layout responsive.
- **Accesibilidad**: Usa `aria-label`, HTML semántico y contraste suficiente.
- **Formularios**: Controlados, con validación y feedback visual inmediato.
- **Modales**: Usa overlays y focus trapping.
- **Mapas**: Leaflet + OpenStreetMap, geolocalización automática y manual.
- **Datos**: Lee/escribe en Firebase usando hooks y métodos de la SDK.

## 🔗 Integraciones y Dependencias
- **React Router DOM**: Navegación SPA.
- **Leaflet**: Mapas interactivos.
- **Firebase**: Persistencia y autenticación.
- **FontAwesome**: Iconografía.

## 📁 Ejemplos de Archivos Clave
- `src/pages/FormularioAyuda.tsx` – Formulario con mapa y validación
- `src/pages/Voluntario.tsx` – Registro de voluntarios y emergencias
- `src/components/MapComponent.tsx` – Mapa Leaflet reutilizable
- `src/context/AuthContext.tsx` – Estado global de usuario
- `src/styles/voluntario-new.css` – Ejemplo de CSS modular y responsive

## 🚩 Notas y Particularidades
- **No uses clases de CSS globales antiguas**: Usa solo los archivos de `src/styles/`.
- **No modifiques el HTML legacy**: Todo el desarrollo es sobre React/TypeScript.
- **No uses jQuery ni scripts vanilla**: Todo debe ser React puro.
- **No uses CSS-in-JS**: Mantén los estilos en archivos `.css`.
- **No uses rutas absolutas fuera de `src/`**.

---

¿Falta algún patrón, integración o convención importante? Indícalo para mejorar estas instrucciones.
