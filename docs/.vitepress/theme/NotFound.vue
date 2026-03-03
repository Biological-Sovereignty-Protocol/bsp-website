<template>
  <div class="not-found-modern">
    <div class="content-wrapper">
      
      <!-- Premium Animated Abstract SVG -->
      <div class="svg-container">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="bsp-404-svg">
          <defs>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="var(--vp-c-brand-1)" />
              <stop offset="100%" stop-color="var(--vp-c-brand-3)" />
            </linearGradient>
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="glowSubtle" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <!-- Outer Orbital Rings (Rotating) -->
          <g class="spin-slow" transform-origin="100 100">
            <circle cx="100" cy="100" r="70" fill="none" stroke="var(--vp-c-border)" stroke-width="1" stroke-dasharray="4 8" opacity="0.6"/>
            <!-- Active sector -->
            <path d="M 100 30 A 70 70 0 0 1 170 100" fill="none" stroke="url(#glowGrad)" stroke-width="2" stroke-linecap="round" filter="url(#glowSubtle)"/>
          </g>

          <g class="spin-reverse" transform-origin="100 100">
            <circle cx="100" cy="100" r="50" fill="none" stroke="var(--vp-c-border)" stroke-width="1" opacity="0.3"/>
            <!-- Data fragments missing -->
            <path d="M 50 100 A 50 50 0 0 0 100 150" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" stroke-dasharray="10 5" stroke-linecap="round" />
            <path d="M 100 50 A 50 50 0 0 1 135 65" fill="none" stroke="var(--vp-c-brand-1)" stroke-width="1.5" stroke-linecap="round" filter="url(#glowSubtle)"/>
          </g>
          
          <!-- Central Biometric Core -->
          <circle cx="100" cy="100" r="18" fill="var(--vp-c-bg)" stroke="url(#glowGrad)" stroke-width="3" filter="url(#glowSubtle)">
            <animate attributeName="r" values="18; 20; 18" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="100" r="8" fill="var(--vp-c-brand-1)" filter="url(#neonGlow)">
            <animate attributeName="opacity" values="1; 0.4; 1" dur="2s" repeatCount="indefinite" />
          </circle>

          <!-- Severed Connection Lines -->
          <path d="M 100 18 L 100 30" stroke="url(#glowGrad)" stroke-width="2" stroke-linecap="round" />
          <path d="M 100 170 L 100 182" stroke="var(--vp-c-text-mobi)" stroke-width="2" stroke-linecap="round" opacity="0.2" />
          <path d="M 18 100 L 30 100" stroke="url(#glowGrad)" stroke-width="2" stroke-linecap="round" />
          <path d="M 170 100 L 182 100" stroke="var(--vp-c-text-mobi)" stroke-width="2" stroke-linecap="round" opacity="0.2"/>
          
          <!-- Floating "404" Fragments -->
          <text x="65" y="70" fill="var(--vp-c-brand-1)" font-family="monospace" font-size="8" opacity="0.8" filter="url(#glowSubtle)">4</text>
          <text x="135" y="140" fill="var(--vp-c-text-3)" font-family="monospace" font-size="8" opacity="0.5">0</text>
          <text x="140" y="65" fill="var(--vp-c-brand-3)" font-family="monospace" font-size="8" opacity="0.8" filter="url(#glowSubtle)">4</text>
        </svg>
      </div>

      <!-- Typography Fixed (No clipping) -->
      <div class="text-block">
        <div class="error-number">404</div>
        <h1 class="error-title">Entity Not Found</h1>
        <p class="error-description">
          The biological record, taxonomy node, or requested protocol could not be located in the current network state.
        </p>
      </div>

      <!-- Sleek Button -->
      <a href="/" class="return-btn">
        <span class="btn-text">Return to Main Node</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-arrow"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      
    </div>
  </div>
</template>

<style scoped>
.not-found-modern {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--vp-nav-height, 64px) - 150px);
  padding: 40px 20px;
  background-color: transparent;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* SVG Animation and Sizing */
.svg-container {
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
  position: relative;
}

.bsp-404-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.spin-slow {
  animation: spin 20s linear infinite;
}

.spin-reverse {
  animation: spin 15s linear infinite reverse;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Typography without tricky clipping */
.text-block {
  margin-bottom: 2.5rem;
}

.error-number {
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  margin-bottom: 0.5rem;
}

.error-title {
  font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem 0;
  line-height: 1.3;
  padding: 5px 0; /* Padding prevents bounding box cuts */
  border: none;
}

.divider {
  color: var(--vp-c-brand-1);
  font-weight: 300;
  opacity: 0.5;
}

.error-description {
  font-size: clamp(1.1rem, 2vw, 1.2rem);
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 auto;
  max-width: 480px;
  font-weight: 400;
}

/* Action Button */
.return-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
  padding: 0.9rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.return-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 8px 24px rgba(var(--vp-c-brand-1-rgb, 44, 201, 152), 0.15);
  transform: translateY(-2px);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.return-btn:hover .btn-arrow {
  transform: translateX(5px);
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
