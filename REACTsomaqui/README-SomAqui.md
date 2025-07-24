# SomAqui.cat - React Migration

Esta es la migración a React TypeScript de la aplicación SomAqui.cat, una plataforma comunitaria de emergencia que conecta a personas que necesitan ayuda con voluntarios dispuestos a ofrecerla.

## 🚀 Características

- **React 19** con TypeScript para un desarrollo moderno y tipado
- **Vite** como herramienta de construcción para desarrollo rápido
- **React Router** para navegación entre páginas
- **Leaflet** para mapas interactivos
- **Context API** para manejo de estado global
- **CSS modular** manteniendo los estilos originales
- **Responsive design** optimizado para móvil y escritorio

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.tsx      # Header con navegación
│   ├── Footer.tsx      # Footer del sitio
│   ├── Slider.tsx      # Slider de imágenes
│   └── MapComponent.tsx # Componente de mapa con Leaflet
├── pages/              # Páginas principales
│   ├── Home.tsx        # Página de inicio
│   └── FormularioAyuda.tsx # Formulario de solicitud de ayuda
├── context/            # Context para estado global
│   └── AuthContext.tsx # Contexto de autenticación
├── styles/             # Estilos CSS organizados
│   ├── global.css      # Estilos globales
│   ├── home.css        # Estilos de la página de inicio
│   └── formulario-ayuda.css # Estilos del formulario
└── App.tsx             # Componente principal con routing
```

## 🛠️ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Comandos de desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview

# Linter
npm run lint
```

## 🌟 Funcionalidades Migradas

### ✅ Completadas
- [x] Estructura base de React con TypeScript
- [x] Sistema de routing con React Router
- [x] Componente Header reutilizable con navegación
- [x] Página Home con slider de imágenes
- [x] Formulario de ayuda con mapa interactivo
- [x] Integración de Leaflet para geolocalización
- [x] Context de autenticación
- [x] Estilos responsive adaptados
- [x] Componentes de Footer

### 🚧 En Desarrollo
- [ ] Página de registro de voluntarios
- [ ] Sistema completo de autenticación
- [ ] Páginas informativas (Equipo, Contacto, etc.)
- [ ] Integración con backend/API
- [ ] Sistema de notificaciones
- [ ] Chat entre usuarios

## 🎨 Estilos y Diseño

La aplicación mantiene el diseño original con:
- Colores principales: `#39e4c9` (turquesa) y `#003333` (verde oscuro)
- Tipografía: Segoe UI
- Layout responsive con breakpoints para móvil
- Componentes accesibles con aria-labels
- Animaciones CSS suaves

## 🗺️ Mapas y Geolocalización

- Integración con **Leaflet** para mapas interactivos
- Geolocalización automática del navegador
- Marcadores arrastrables para selección precisa
- Tiles de OpenStreetMap gratuitos

## 🔒 Autenticación

Sistema de autenticación preparado con:
- Context API para estado global
- Soporte para login/registro
- Persistencia en localStorage
- Protección de rutas (próximamente)

## 📱 Responsive Design

La aplicación está optimizada para:
- Dispositivos móviles (320px+)
- Tabletas (768px+)
- Escritorio (1024px+)
- Pantallas grandes (1400px+)

## 🚀 Deployment

Para producción:

```bash
npm run build
```

Los archivos optimizados se generarán en `dist/` listos para servir desde cualquier hosting estático.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

SomAqui.cat - [@somaqui](https://github.com/DjAdria001/Somaqui)

Link del proyecto: [https://github.com/DjAdria001/Somaqui](https://github.com/DjAdria001/Somaqui)
