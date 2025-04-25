import Particles from 'react-tsparticles'

export default function ParticleBackground() {
  return (
    <Particles
      id="particles-js"
      options={{
        particles: {
          number: {
            value: 50, // Number of particles
            density: {
              enable: true,
              value_area: 800, // Area of particles
            },
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.3, // Opacity of particles
            random: true,
            anim: {
              enable: true,
              speed: 1,
            },
          },
          size: {
            value: 5,
            random: true,
            anim: {
              enable: true,
              speed: 3,
            },
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            out_mode: 'bounce',
            random: true,
            straight: false,
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: 'repulse',
            },
          },
        },
      }}
    />
  )
}
