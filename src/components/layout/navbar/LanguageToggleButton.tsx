'use client';

import { useLocale } from 'next-intl';
import { setCookie } from 'cookies-next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const LanguageToggleButton = () => {
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fa' : 'en';
    setCookie('NEXT_LOCALE', newLocale, { path: '/' });
    window.location.reload();
  };

  return (
    <Button
      variant="outline"
      onClick={toggleLanguage}
      className="cursor-pointer relative flex items-center gap-2 px-2"
    >
      <motion.svg
        width="512.000000pt"
        height="512.000000pt"
        viewBox="0 0 512.000000 512.000000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="currentColor"
          stroke="none"
        >
          <path
            d="M2323 5110 c-598 -58 -1146 -316 -1571 -740 -397 -397 -640 -882
-729 -1460 -24 -161 -24 -539 0 -700 89 -577 330 -1059 727 -1458 397 -397
882 -640 1460 -729 161 -24 539 -24 700 0 577 89 1059 330 1458 727 397 397
640 882 729 1460 24 161 24 539 0 700 -89 577 -330 1059 -727 1458 -394 395
-885 641 -1450 727 -125 19 -468 27 -597 15z m87 -816 l0 -517 -107 7 c-237
15 -633 76 -633 98 0 62 151 538 244 768 l34 85 87 22 c105 27 250 50 323 52
l52 1 0 -516z m486 500 c58 -9 145 -25 191 -37 l85 -22 34 -85 c93 -230 244
-706 244 -768 0 -22 -396 -83 -632 -98 l-108 -7 0 517 0 516 40 0 c22 0 87 -7
146 -16z m-1382 -366 c-30 -90 -73 -233 -96 -318 -23 -85 -42 -156 -43 -157
-7 -11 -445 155 -445 168 0 22 238 224 365 310 62 42 262 159 272 159 1 0 -23
-73 -53 -162z m2301 9 c145 -97 389 -306 374 -321 -16 -15 -439 -171 -444
-163 -1 1 -20 72 -43 157 -23 85 -66 228 -96 318 l-55 163 87 -47 c48 -26 127
-74 177 -107z m-2660 -729 c83 -28 151 -52 153 -53 2 -2 -4 -44 -13 -95 -27
-158 -53 -378 -65 -555 -6 -93 -14 -198 -16 -232 l-6 -63 -449 0 -449 0 0 36
c0 112 56 384 115 554 46 134 166 380 240 491 l57 86 141 -60 c78 -32 210 -82
292 -109z m3347 8 c109 -185 207 -425 253 -621 26 -111 55 -293 55 -349 l0
-36 -449 0 -449 0 -6 63 c-2 34 -10 139 -16 232 -12 177 -38 397 -65 555 -9
51 -15 93 -13 95 2 1 73 26 158 54 85 29 216 79 290 110 l135 57 33 -46 c19
-25 52 -76 74 -114z m-2752 -165 c155 -30 308 -49 494 -63 l166 -12 0 -383 0
-383 -451 0 -450 0 5 68 c3 37 8 114 12 172 7 134 28 318 55 492 20 130 23
138 43 133 11 -2 68 -13 126 -24z m1789 -108 c27 -175 48 -359 55 -493 4 -58
9 -135 12 -172 l5 -68 -450 0 -451 0 0 383 0 383 168 12 c181 14 381 40 532
71 52 11 98 20 101 20 4 1 16 -61 28 -136z m-2325 -1095 c2 -35 10 -139 16
-233 12 -177 38 -397 65 -555 9 -51 15 -93 13 -95 -2 -1 -70 -25 -153 -53 -82
-27 -214 -77 -292 -109 l-141 -60 -57 86 c-74 111 -194 357 -240 491 -59 170
-115 442 -115 554 l0 36 449 0 449 0 6 -62z m1196 -321 l0 -383 -166 -12
c-221 -16 -416 -44 -620 -87 -20 -5 -23 3 -43 133 -27 174 -48 358 -55 492 -4
58 -9 135 -12 173 l-5 67 450 0 451 0 0 -383z m1196 316 c-3 -38 -8 -115 -12
-173 -7 -134 -28 -318 -55 -492 -20 -130 -23 -138 -43 -133 -204 43 -399 71
-620 87 l-166 12 0 383 0 383 451 0 450 0 -5 -67z m1204 31 c0 -112 -56 -384
-115 -554 -46 -134 -166 -380 -240 -491 l-57 -86 -141 60 c-78 32 -209 82
-292 109 -82 28 -151 52 -153 53 -2 2 4 44 13 95 27 158 53 378 65 555 6 94
14 198 16 233 l6 62 449 0 449 0 0 -36z m-2400 -1549 l0 -515 -40 0 c-59 0
-241 29 -337 53 l-85 22 -34 85 c-93 230 -244 706 -244 768 0 24 473 94 683
100 l57 2 0 -515z m640 490 c165 -20 400 -65 400 -77 0 -62 -151 -538 -244
-768 l-34 -85 -85 -22 c-96 -24 -278 -53 -337 -53 l-40 0 0 516 0 517 108 -7
c59 -4 163 -13 232 -21z m-1636 -293 c22 -81 66 -225 97 -320 l58 -173 -87 47
c-120 65 -249 152 -367 250 -103 84 -192 170 -184 178 14 13 403 160 439 165
3 1 23 -65 44 -147z m2448 109 c141 -47 328 -123 328 -132 0 -10 -124 -125
-210 -195 -97 -78 -233 -169 -342 -228 l-87 -47 58 173 c31 95 75 239 97 320
21 82 39 148 39 148 1 0 53 -18 117 -39z"
          />
        </g>
      </motion.svg>
      <span className="text-xs">{locale === 'en' ? 'EN' : 'FA'}</span>
    </Button>
  );
};
