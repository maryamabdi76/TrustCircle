'use client';

import { motion as m } from 'framer-motion';
import { useTheme } from 'next-themes';

import { raysVariants, rayVariant, shineVariant } from './animations';

const sunPath =
  'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z';
const moonPath =
  'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z';

export const ToggleThemeIcon = () => {
  const { theme } = useTheme();

  return (
    <m.svg
      strokeWidth="4"
      strokeLinecap="round"
      width={15}
      height={15}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative"
    >
      <m.path
        variants={shineVariant}
        d={moonPath}
        className={'absolute top-0 left-0 stroke-blue-100 '}
        initial="hidden"
        animate={theme === 'dark' ? 'visible' : 'hidden'}
      />

      <m.g
        variants={raysVariants}
        initial="hidden"
        animate={theme === 'light' ? 'visible' : 'hidden'}
        className="stroke-6 stroke-yellow-600 "
        style={{ strokeLinecap: 'round' }}
      >
        <m.path className="origin-center" variants={rayVariant} d="M50 2V11" />
        <m.path variants={rayVariant} d="M85 15L78 22" />
        <m.path variants={rayVariant} d="M98 50H89" />
        <m.path variants={rayVariant} d="M85 85L78 78" />
        <m.path variants={rayVariant} d="M50 98V89" />
        <m.path variants={rayVariant} d="M23 78L16 84" />
        <m.path variants={rayVariant} d="M11 50H2" />
        <m.path variants={rayVariant} d="M23 23L16 16" />
      </m.g>

      <m.path
        d={sunPath}
        fill="transparent"
        transition={{ duration: 1, type: 'spring' }}
        initial={{ fillOpacity: 0, strokeOpacity: 0 }}
        animate={
          theme === 'dark'
            ? {
                d: moonPath,
                rotate: -360,
                scale: 2,
                translateX: -50,
                translateY: -50,
                stroke: 'var(--color-blue-400)',
                fill: 'var(--color-blue-400)',
                fillOpacity: 0.35,
                strokeOpacity: 1,
                transition: { delay: 0.1 },
              }
            : {
                d: sunPath,
                rotate: 0,
                stroke: 'var(--color-yellow-600)',
                fill: 'var(--color-yellow-600)',
                fillOpacity: 0.35,
                strokeOpacity: 1,
              }
        }
      />
    </m.svg>
  );
};
