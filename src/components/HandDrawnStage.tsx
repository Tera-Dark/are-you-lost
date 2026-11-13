import { useMemo } from 'react';
import { motion, AnimatePresence, useTransform, type MotionValue } from 'motion/react';
import rough from 'roughjs';
import type { PathInfo } from 'roughjs/bin/core';
import type { MoodType, SceneLocation, VisualCue } from '../types/narrative';

interface HandDrawnStageProps {
  scene: SceneLocation;
  mood: MoodType;
  visual: VisualCue;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  focusDimmed?: boolean;
  isTitleCard?: boolean;
}

function useAllScenePaths() {
  return useMemo(() => {
    const gen = rough.generator({ options: { seed: 42 } });

    // --- 1. SUBWAY SCENE ---
    const subwayBack: PathInfo[] = [
      ...gen.toPaths(
        gen.rectangle(26, 146, 56, 174, {
          stroke: 'rgba(234,230,223,0.16)',
          strokeWidth: 1,
          roughness: 1.9,
          fill: 'rgba(234,230,223,0.03)',
          fillStyle: 'hachure',
          hachureAngle: -48,
          hachureGap: 10,
        })
      ),
      ...gen.toPaths(
        gen.rectangle(94, 106, 70, 214, {
          stroke: 'rgba(234,230,223,0.19)',
          strokeWidth: 1.1,
          roughness: 2.0,
          fill: 'rgba(234,230,223,0.035)',
          fillStyle: 'cross-hatch',
          hachureGap: 12,
        })
      ),
      ...gen.toPaths(
        gen.rectangle(256, 134, 66, 186, {
          stroke: 'rgba(234,230,223,0.16)',
          strokeWidth: 1,
          roughness: 2.0,
          fill: 'rgba(234,230,223,0.03)',
          fillStyle: 'hachure',
          hachureAngle: 52,
          hachureGap: 11,
        })
      ),
      ...gen.toPaths(
        gen.rectangle(116, 144, 11, 13, {
          stroke: '#E2A856',
          strokeWidth: 1.1,
          roughness: 1.3,
          fill: 'rgba(226,168,86,0.42)',
          fillStyle: 'solid',
        })
      ),
    ];

    const subwayFront: PathInfo[] = [
      ...gen.toPaths(
        gen.line(12, 320, 388, 320, { stroke: 'rgba(234,230,223,0.52)', strokeWidth: 1.5, roughness: 2.1 })
      ),
      ...gen.toPaths(
        gen.line(20, 336, 380, 336, { stroke: 'rgba(226,168,86,0.35)', strokeWidth: 1.2, roughness: 2.3 })
      ),
      ...gen.toPaths(
        gen.line(34, 92, 366, 84, { stroke: 'rgba(234,230,223,0.58)', strokeWidth: 1.8, roughness: 1.9 })
      ),
      ...gen.toPaths(
        gen.line(70, 91, 70, 320, { stroke: 'rgba(234,230,223,0.44)', strokeWidth: 1.5, roughness: 1.7 })
      ),
      ...gen.toPaths(
        gen.line(318, 86, 318, 320, { stroke: 'rgba(234,230,223,0.44)', strokeWidth: 1.5, roughness: 1.7 })
      ),
      ...gen.toPaths(
        gen.arc(200, 106, 38, 24, Math.PI, Math.PI * 2, true, { stroke: '#EAE6DF', strokeWidth: 1.5, roughness: 1.5 })
      ),
      ...gen.toPaths(
        gen.circle(200, 114, 18, {
          stroke: '#E2A856',
          strokeWidth: 1.6,
          roughness: 1.4,
          fill: 'rgba(226,168,86,0.55)',
          fillStyle: 'hachure',
          hachureGap: 3,
        })
      ),
      ...gen.toPaths(
        gen.rectangle(116, 286, 84, 10, { stroke: 'rgba(234,230,223,0.44)', strokeWidth: 1.3, roughness: 1.8 })
      ),
      ...gen.toPaths(gen.line(126, 296, 126, 320, { stroke: 'rgba(234,230,223,0.36)', strokeWidth: 1.2 })),
      ...gen.toPaths(gen.line(190, 296, 190, 320, { stroke: 'rgba(234,230,223,0.36)', strokeWidth: 1.2 })),
      ...gen.toPaths(gen.circle(254, 244, 18, { stroke: '#EAE6DF', strokeWidth: 1.5, roughness: 1.6 })),
      ...gen.toPaths(
        gen.polygon(
          [
            [244, 255],
            [264, 255],
            [270, 304],
            [239, 304],
          ],
          {
            stroke: '#EAE6DF',
            strokeWidth: 1.5,
            roughness: 1.9,
            fill: 'rgba(234,230,223,0.08)',
            fillStyle: 'hachure',
            hachureGap: 5,
          }
        )
      ),
      ...gen.toPaths(gen.line(248, 304, 247, 320, { stroke: '#EAE6DF', strokeWidth: 1.4 })),
      ...gen.toPaths(gen.line(260, 304, 261, 320, { stroke: '#EAE6DF', strokeWidth: 1.4 })),
    ];

    const phoneGlow: PathInfo[] = [
      ...gen.toPaths(
        gen.rectangle(228, 254, 13, 19, {
          stroke: '#8AB4E0',
          strokeWidth: 1.5,
          roughness: 1.3,
          fill: 'rgba(138,180,224,0.42)',
          fillStyle: 'solid',
        })
      ),
    ];

    const calmHalo: PathInfo[] = [
      ...gen.toPaths(
        gen.circle(200, 114, 62, { stroke: 'rgba(226,168,86,0.45)', strokeWidth: 1.2, roughness: 2.8 })
      ),
      ...gen.toPaths(
        gen.circle(200, 114, 98, { stroke: 'rgba(226,168,86,0.22)', strokeWidth: 1, roughness: 3.1 })
      ),
    ];

    // --- 2. ROOM SCENE ---
    const roomBack: PathInfo[] = [
      ...gen.toPaths(
        gen.rectangle(96, 56, 208, 174, {
          stroke: 'rgba(234,230,223,0.4)',
          strokeWidth: 1.4,
          roughness: 1.8,
          fill: 'rgba(234,230,223,0.025)',
          fillStyle: 'hachure',
          hachureAngle: -40,
          hachureGap: 14,
        })
      ),
      ...gen.toPaths(gen.line(200, 56, 200, 230, { stroke: 'rgba(234,230,223,0.34)', strokeWidth: 1.3 })),
      ...gen.toPaths(gen.line(96, 146, 304, 146, { stroke: 'rgba(234,230,223,0.3)', strokeWidth: 1.2 })),
    ];

    const roomFront: PathInfo[] = [
      ...gen.toPaths(
        gen.line(34, 278, 366, 278, { stroke: 'rgba(234,230,223,0.58)', strokeWidth: 1.7, roughness: 1.9 })
      ),
      ...gen.toPaths(gen.line(66, 278, 66, 336, { stroke: 'rgba(234,230,223,0.42)', strokeWidth: 1.5 })),
      ...gen.toPaths(gen.line(334, 278, 334, 336, { stroke: 'rgba(234,230,223,0.42)', strokeWidth: 1.5 })),
      ...gen.toPaths(gen.line(286, 278, 294, 214, { stroke: '#EAE6DF', strokeWidth: 1.5, roughness: 1.5 })),
      ...gen.toPaths(gen.line(294, 214, 268, 198, { stroke: '#EAE6DF', strokeWidth: 1.5, roughness: 1.5 })),
      ...gen.toPaths(
        gen.polygon(
          [
            [254, 208],
            [282, 198],
            [274, 184],
            [258, 190],
          ],
          {
            stroke: '#E2A856',
            strokeWidth: 1.5,
            roughness: 1.5,
            fill: 'rgba(226,168,86,0.45)',
            fillStyle: 'hachure',
            hachureGap: 3,
          }
        )
      ),
      ...gen.toPaths(gen.line(254, 212, 224, 276, { stroke: 'rgba(226,168,86,0.28)', strokeWidth: 1, roughness: 2.3 })),
      ...gen.toPaths(gen.line(280, 212, 316, 276, { stroke: 'rgba(226,168,86,0.28)', strokeWidth: 1, roughness: 2.3 })),
      ...gen.toPaths(
        gen.rectangle(94, 258, 36, 20, { stroke: 'rgba(234,230,223,0.42)', strokeWidth: 1.2, roughness: 1.7 })
      ),
    ];

    const laptopOn: PathInfo[] = [
      ...gen.toPaths(
        gen.polygon(
          [
            [154, 276],
            [218, 276],
            [212, 232],
            [148, 232],
          ],
          {
            stroke: '#9ABBE0',
            strokeWidth: 1.5,
            roughness: 1.4,
            fill: 'rgba(138,180,224,0.24)',
            fillStyle: 'hachure',
            hachureGap: 4,
          }
        )
      ),
    ];

    const laptopOff: PathInfo[] = [
      ...gen.toPaths(
        gen.rectangle(152, 271, 64, 6, {
          stroke: 'rgba(234,230,223,0.48)',
          strokeWidth: 1.3,
          roughness: 1.5,
        })
      ),
      ...gen.toPaths(
        gen.circle(266, 206, 48, {
          stroke: 'rgba(226,168,86,0.34)',
          strokeWidth: 1.1,
          roughness: 2.9,
        })
      ),
    ];

    // --- 3. STORE SCENE ---
    const storeBack: PathInfo[] = [
      ...gen.toPaths(
        gen.rectangle(36, 74, 328, 42, {
          stroke: '#E2A856',
          strokeWidth: 1.5,
          roughness: 1.8,
          fill: 'rgba(226,168,86,0.14)',
          fillStyle: 'hachure',
          hachureGap: 7,
        })
      ),
      ...gen.toPaths(
        gen.rectangle(46, 116, 308, 196, {
          stroke: 'rgba(234,230,223,0.34)',
          strokeWidth: 1.3,
          roughness: 1.9,
        })
      ),
      ...gen.toPaths(gen.line(200, 116, 200, 312, { stroke: 'rgba(234,230,223,0.25)', strokeWidth: 1.2 })),
    ];

    const storeFront: PathInfo[] = [
      ...gen.toPaths(
        gen.line(58, 258, 342, 258, { stroke: 'rgba(234,230,223,0.58)', strokeWidth: 1.7, roughness: 1.9 })
      ),
      ...gen.toPaths(gen.circle(136, 198, 18, { stroke: '#EAE6DF', strokeWidth: 1.5, roughness: 1.6 })),
      ...gen.toPaths(
        gen.polygon(
          [
            [122, 210],
            [150, 210],
            [156, 258],
            [118, 258],
          ],
          {
            stroke: '#EAE6DF',
            strokeWidth: 1.4,
            roughness: 1.8,
            fill: 'rgba(234,230,223,0.08)',
            fillStyle: 'hachure',
            hachureGap: 5,
          }
        )
      ),
      ...gen.toPaths(gen.circle(264, 196, 18, { stroke: '#E2A856', strokeWidth: 1.5, roughness: 1.6 })),
      ...gen.toPaths(
        gen.polygon(
          [
            [250, 208],
            [278, 208],
            [282, 258],
            [244, 258],
          ],
          {
            stroke: '#E2A856',
            strokeWidth: 1.4,
            roughness: 1.8,
            fill: 'rgba(226,168,86,0.1)',
            fillStyle: 'hachure',
            hachureGap: 5,
          }
        )
      ),
      ...gen.toPaths(
        gen.rectangle(172, 240, 16, 18, {
          stroke: '#E2A856',
          strokeWidth: 1.3,
          roughness: 1.4,
          fill: 'rgba(226,168,86,0.32)',
          fillStyle: 'solid',
        })
      ),
      ...gen.toPaths(
        gen.rectangle(214, 240, 16, 18, {
          stroke: '#EAE6DF',
          strokeWidth: 1.3,
          roughness: 1.4,
        })
      ),
    ];

    const steamPaths: PathInfo[] = [
      ...gen.toPaths(
        gen.curve(
          [
            [180, 234],
            [174, 222],
            [184, 210],
            [178, 198],
          ],
          { stroke: 'rgba(234,230,223,0.42)', strokeWidth: 1.1, roughness: 1.5 }
        )
      ),
      ...gen.toPaths(
        gen.curve(
          [
            [222, 234],
            [228, 222],
            [218, 210],
            [224, 198],
          ],
          { stroke: 'rgba(234,230,223,0.42)', strokeWidth: 1.1, roughness: 1.5 }
        )
      ),
    ];

    // --- 4. DAWN BRIDGE ---
    const dawnBack: PathInfo[] = [
      ...gen.toPaths(gen.line(10, 240, 390, 240, { stroke: 'rgba(234,230,223,0.28)', strokeWidth: 1.2 })),
      ...gen.toPaths(
        gen.rectangle(36, 182, 42, 58, { stroke: 'rgba(234,230,223,0.2)', strokeWidth: 1, roughness: 1.8 })
      ),
      ...gen.toPaths(
        gen.rectangle(88, 162, 52, 78, { stroke: 'rgba(234,230,223,0.22)', strokeWidth: 1, roughness: 1.9 })
      ),
      ...gen.toPaths(
        gen.rectangle(292, 174, 58, 66, { stroke: 'rgba(234,230,223,0.2)', strokeWidth: 1, roughness: 1.9 })
      ),
      ...gen.toPaths(
        gen.arc(218, 240, 118, 118, Math.PI, Math.PI * 2, false, {
          stroke: '#E2A856',
          strokeWidth: 1.6,
          roughness: 2.1,
          fill: 'rgba(226,168,86,0.16)',
          fillStyle: 'hachure',
          hachureGap: 6,
        })
      ),
    ];

    const dawnFront: PathInfo[] = [
      ...gen.toPaths(gen.line(10, 266, 390, 266, { stroke: 'rgba(234,230,223,0.58)', strokeWidth: 1.7, roughness: 1.8 })),
      ...gen.toPaths(gen.line(10, 294, 390, 294, { stroke: 'rgba(234,230,223,0.38)', strokeWidth: 1.2, roughness: 1.8 })),
      ...gen.toPaths(gen.line(10, 326, 390, 326, { stroke: 'rgba(234,230,223,0.48)', strokeWidth: 1.4, roughness: 2.0 })),
      ...[48, 114, 180, 246, 312, 368].flatMap((px) =>
        gen.toPaths(gen.line(px, 266, px, 326, { stroke: 'rgba(234,230,223,0.36)', strokeWidth: 1.3 }))
      ),
      ...gen.toPaths(gen.circle(154, 232, 17, { stroke: '#EAE6DF', strokeWidth: 1.5, roughness: 1.6 })),
      ...gen.toPaths(
        gen.polygon(
          [
            [144, 243],
            [164, 243],
            [168, 294],
            [140, 294],
          ],
          {
            stroke: '#EAE6DF',
            strokeWidth: 1.5,
            roughness: 1.8,
            fill: 'rgba(234,230,223,0.08)',
            fillStyle: 'hachure',
            hachureGap: 5,
          }
        )
      ),
      ...gen.toPaths(gen.line(148, 294, 148, 326, { stroke: '#EAE6DF', strokeWidth: 1.4 })),
      ...gen.toPaths(gen.line(160, 294, 160, 326, { stroke: '#EAE6DF', strokeWidth: 1.4 })),
    ];

    // --- 5. ALLEY SCENE (积水老巷) ---
    const alleyBack: PathInfo[] = [
      // Left and right old apartment walls
      ...gen.toPaths(
        gen.rectangle(20, 74, 86, 246, {
          stroke: 'rgba(234,230,223,0.22)',
          strokeWidth: 1.2,
          roughness: 2.0,
          fill: 'rgba(234,230,223,0.03)',
          fillStyle: 'hachure',
          hachureGap: 12,
        })
      ),
      ...gen.toPaths(
        gen.rectangle(292, 90, 88, 230, {
          stroke: 'rgba(234,230,223,0.22)',
          strokeWidth: 1.2,
          roughness: 2.0,
          fill: 'rgba(234,230,223,0.03)',
          fillStyle: 'cross-hatch',
          hachureGap: 14,
        })
      ),
      // Overhead tangled power lines
      ...gen.toPaths(
        gen.curve(
          [
            [86, 102],
            [196, 126],
            [302, 108],
          ],
          { stroke: 'rgba(234,230,223,0.24)', strokeWidth: 1, roughness: 1.4 }
        )
      ),
      ...gen.toPaths(
        gen.curve(
          [
            [86, 118],
            [204, 138],
            [302, 122],
          ],
          { stroke: 'rgba(234,230,223,0.18)', strokeWidth: 0.9, roughness: 1.4 }
        )
      ),
    ];

    const alleyFront: PathInfo[] = [
      // Wet alley road & reflective puddles
      ...gen.toPaths(gen.line(12, 320, 388, 320, { stroke: 'rgba(234,230,223,0.52)', strokeWidth: 1.5, roughness: 2.0 })),
      ...gen.toPaths(gen.ellipse(196, 330, 124, 10, { stroke: 'rgba(226,168,86,0.34)', strokeWidth: 1.1, roughness: 2.1 })),
      // Leaning streetlamp pole
      ...gen.toPaths(gen.line(128, 320, 128, 128, { stroke: 'rgba(234,230,223,0.48)', strokeWidth: 1.6, roughness: 1.7 })),
      ...gen.toPaths(gen.line(128, 128, 160, 122, { stroke: 'rgba(234,230,223,0.48)', strokeWidth: 1.5, roughness: 1.5 })),
      ...gen.toPaths(
        gen.circle(162, 128, 14, {
          stroke: '#E2A856',
          strokeWidth: 1.5,
          roughness: 1.4,
          fill: 'rgba(226,168,86,0.48)',
          fillStyle: 'hachure',
          hachureGap: 3,
        })
      ),
      // Lone walking figure
      ...gen.toPaths(gen.circle(236, 250, 16, { stroke: '#EAE6DF', strokeWidth: 1.5, roughness: 1.6 })),
      ...gen.toPaths(
        gen.polygon(
          [
            [227, 260],
            [245, 260],
            [250, 305],
            [222, 305],
          ],
          {
            stroke: '#EAE6DF',
            strokeWidth: 1.5,
            roughness: 1.8,
            fill: 'rgba(234,230,223,0.08)',
            fillStyle: 'hachure',
            hachureGap: 5,
          }
        )
      ),
      ...gen.toPaths(gen.line(231, 305, 229, 320, { stroke: '#EAE6DF', strokeWidth: 1.4 })),
      ...gen.toPaths(gen.line(241, 305, 243, 320, { stroke: '#EAE6DF', strokeWidth: 1.4 })),
      // Small stray cat silhouette by wall
      ...gen.toPaths(gen.ellipse(86, 314, 18, 12, { stroke: 'rgba(234,230,223,0.45)', strokeWidth: 1.2, roughness: 1.5 })),
      ...gen.toPaths(gen.circle(94, 305, 8, { stroke: 'rgba(234,230,223,0.45)', strokeWidth: 1.2, roughness: 1.4 })),
    ];

    const streetlightCue: PathInfo[] = [
      ...gen.toPaths(gen.line(156, 136, 122, 264, { stroke: 'rgba(226,168,86,0.2)', strokeWidth: 1, roughness: 2.3 })),
      ...gen.toPaths(gen.line(168, 136, 206, 264, { stroke: 'rgba(226,168,86,0.2)', strokeWidth: 1, roughness: 2.3 })),
      ...gen.toPaths(gen.circle(162, 128, 52, { stroke: 'rgba(226,168,86,0.26)', strokeWidth: 1, roughness: 2.8 })),
    ];

    // --- 6. BALCONY SCENE (走廊老阳台) ---
    const balconyBack: PathInfo[] = [
      ...gen.toPaths(
        gen.rectangle(46, 86, 120, 184, {
          stroke: 'rgba(234,230,223,0.18)',
          strokeWidth: 1.1,
          roughness: 1.9,
          fill: 'rgba(234,230,223,0.025)',
          fillStyle: 'hachure',
          hachureGap: 13,
        })
      ),
      ...gen.toPaths(
        gen.rectangle(194, 68, 152, 202, {
          stroke: 'rgba(234,230,223,0.2)',
          strokeWidth: 1.1,
          roughness: 2.0,
          fill: 'rgba(234,230,223,0.025)',
          fillStyle: 'cross-hatch',
          hachureGap: 14,
        })
      ),
    ];

    const balconyFront: PathInfo[] = [
      // Iron railing
      ...gen.toPaths(gen.line(22, 248, 378, 248, { stroke: 'rgba(234,230,223,0.62)', strokeWidth: 1.8, roughness: 1.8 })),
      ...gen.toPaths(gen.line(22, 326, 378, 326, { stroke: 'rgba(234,230,223,0.48)', strokeWidth: 1.4, roughness: 1.9 })),
      ...[52, 98, 144, 190, 236, 282, 328, 364].flatMap((bx) =>
        gen.toPaths(gen.line(bx, 248, bx, 326, { stroke: 'rgba(234,230,223,0.34)', strokeWidth: 1.2 }))
      ),
      // Small plant pot on ledge
      ...gen.toPaths(gen.rectangle(306, 226, 24, 22, { stroke: 'rgba(234,230,223,0.48)', strokeWidth: 1.3, roughness: 1.6 })),
      ...gen.toPaths(gen.line(318, 226, 312, 210, { stroke: 'rgba(226,168,86,0.55)', strokeWidth: 1.2 })),
      ...gen.toPaths(gen.line(318, 226, 326, 212, { stroke: 'rgba(226,168,86,0.55)', strokeWidth: 1.2 })),
      // Figure leaning on balcony
      ...gen.toPaths(gen.circle(158, 206, 18, { stroke: '#EAE6DF', strokeWidth: 1.5, roughness: 1.6 })),
      ...gen.toPaths(
        gen.polygon(
          [
            [144, 218],
            [172, 218],
            [176, 304],
            [140, 304],
          ],
          {
            stroke: '#EAE6DF',
            strokeWidth: 1.5,
            roughness: 1.8,
            fill: 'rgba(234,230,223,0.08)',
            fillStyle: 'hachure',
            hachureGap: 5,
          }
        )
      ),
    ];

    const windowLightsCue: PathInfo[] = [
      ...gen.toPaths(
        gen.rectangle(82, 134, 14, 16, {
          stroke: '#E2A856',
          strokeWidth: 1.2,
          fill: 'rgba(226,168,86,0.48)',
          fillStyle: 'solid',
        })
      ),
      ...gen.toPaths(
        gen.rectangle(232, 114, 16, 18, {
          stroke: '#8AB4E0',
          strokeWidth: 1.2,
          fill: 'rgba(138,180,224,0.34)',
          fillStyle: 'solid',
        })
      ),
      ...gen.toPaths(
        gen.rectangle(292, 166, 14, 16, {
          stroke: '#E2A856',
          strokeWidth: 1.2,
          fill: 'rgba(226,168,86,0.42)',
          fillStyle: 'solid',
        })
      ),
    ];

    // --- 7. RIVERSIDE SCENE (凌晨滨江长椅) ---
    const riversideBack: PathInfo[] = [
      ...gen.toPaths(gen.line(14, 224, 386, 224, { stroke: 'rgba(234,230,223,0.28)', strokeWidth: 1.2, roughness: 1.8 })),
      ...gen.toPaths(gen.line(56, 242, 148, 242, { stroke: 'rgba(226,168,86,0.25)', strokeWidth: 1.1, roughness: 2.0 })),
      ...gen.toPaths(gen.line(212, 252, 326, 252, { stroke: 'rgba(234,230,223,0.2)', strokeWidth: 1, roughness: 2.0 })),
      ...gen.toPaths(gen.rectangle(264, 184, 36, 40, { stroke: 'rgba(234,230,223,0.16)', strokeWidth: 1 })),
      ...gen.toPaths(gen.rectangle(308, 174, 42, 50, { stroke: 'rgba(234,230,223,0.16)', strokeWidth: 1 })),
    ];

    const riversideFront: PathInfo[] = [
      // Walkway curb
      ...gen.toPaths(gen.line(12, 318, 388, 318, { stroke: 'rgba(234,230,223,0.52)', strokeWidth: 1.6, roughness: 1.9 })),
      // Park bench
      ...gen.toPaths(gen.rectangle(134, 276, 126, 10, { stroke: 'rgba(234,230,223,0.5)', strokeWidth: 1.4, roughness: 1.7 })),
      ...gen.toPaths(gen.rectangle(134, 252, 126, 14, { stroke: 'rgba(234,230,223,0.36)', strokeWidth: 1.2, roughness: 1.8 })),
      ...gen.toPaths(gen.line(146, 286, 146, 318, { stroke: 'rgba(234,230,223,0.42)', strokeWidth: 1.4 })),
      ...gen.toPaths(gen.line(248, 286, 248, 318, { stroke: 'rgba(234,230,223,0.42)', strokeWidth: 1.4 })),
      // Bare branch arching from left
      ...gen.toPaths(
        gen.curve(
          [
            [18, 166],
            [74, 144],
            [126, 152],
          ],
          { stroke: 'rgba(234,230,223,0.36)', strokeWidth: 1.4, roughness: 1.9 }
        )
      ),
      // Seated figure
      ...gen.toPaths(gen.circle(182, 232, 16, { stroke: '#EAE6DF', strokeWidth: 1.5, roughness: 1.6 })),
      ...gen.toPaths(
        gen.polygon(
          [
            [170, 243],
            [194, 243],
            [196, 278],
            [168, 278],
          ],
          {
            stroke: '#EAE6DF',
            strokeWidth: 1.5,
            roughness: 1.8,
            fill: 'rgba(234,230,223,0.08)',
            fillStyle: 'hachure',
            hachureGap: 5,
          }
        )
      ),
      ...gen.toPaths(gen.line(174, 278, 172, 318, { stroke: '#EAE6DF', strokeWidth: 1.4 })),
      ...gen.toPaths(gen.line(190, 278, 192, 318, { stroke: '#EAE6DF', strokeWidth: 1.4 })),
    ];

    const flightModeCue: PathInfo[] = [
      ...gen.toPaths(gen.circle(182, 232, 56, { stroke: 'rgba(226,168,86,0.34)', strokeWidth: 1.1, roughness: 2.6 })),
      ...gen.toPaths(gen.circle(182, 232, 92, { stroke: 'rgba(226,168,86,0.18)', strokeWidth: 1, roughness: 3.0 })),
    ];

    return {
      subway: { back: subwayBack, front: subwayFront },
      alley: { back: alleyBack, front: alleyFront },
      room: { back: roomBack, front: roomFront },
      balcony: { back: balconyBack, front: balconyFront },
      store: { back: storeBack, front: storeFront },
      riverside: { back: riversideBack, front: riversideFront },
      dawn_bridge: { back: dawnBack, front: dawnFront },
      cues: {
        phoneGlow,
        calmHalo,
        laptopOn,
        laptopOff,
        steamPaths,
        streetlightCue,
        windowLightsCue,
        flightModeCue,
      },
    };
  }, []);
}

export function HandDrawnStage({
  scene,
  mood,
  visual,
  parallaxX,
  parallaxY,
  focusDimmed = false,
  isTitleCard = false,
}: HandDrawnStageProps) {
  const paths = useAllScenePaths();
  const activeScene = paths[scene];
  const isRainy = mood === 'rain' || scene === 'subway' || scene === 'alley';

  // Pure GPU-composited parallax transforms with zero React re-renders
  const backX = useTransform(parallaxX, (v) => v * -0.35);
  const backY = useTransform(parallaxY, (v) => v * -0.25);
  const rainX = useTransform(parallaxX, (v) => v * -0.55);
  const rainY = useTransform(parallaxY, (v) => v * -0.4);
  const frontX = useTransform(parallaxX, (v) => v * -0.85);
  const frontY = useTransform(parallaxY, (v) => v * -0.65);

  const stageOpacity = isTitleCard ? 0.14 : focusDimmed ? 0.56 : 1;
  const stageScale = isTitleCard ? 0.965 : focusDimmed ? 0.985 : 1;

  return (
    <motion.div
      animate={{ opacity: stageOpacity, scale: stageScale }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[420px] mx-auto flex items-center justify-center overflow-hidden"
    >
      {/* Subtle darkroom projection aperture corner hairlines */}
      <span aria-hidden="true" className="pointer-events-none absolute top-1 left-2 w-2.5 h-2.5 border-t border-l border-white/[0.08]" />
      <span aria-hidden="true" className="pointer-events-none absolute top-1 right-2 w-2.5 h-2.5 border-t border-r border-white/[0.08]" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-1 left-2 w-2.5 h-2.5 border-b border-l border-white/[0.08]" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-1 right-2 w-2.5 h-2.5 border-b border-r border-white/[0.08]" />

      <AnimatePresence mode="wait">
        <motion.svg
          key={scene}
          viewBox="0 0 400 345"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          className="w-full max-w-[390px] max-h-[25vh] sm:max-h-[28vh] overflow-visible"
        >
          {/* Back Parallax Layer */}
          <motion.g style={{ x: backX, y: backY }}>
            {activeScene.back.map((p, idx) => (
              <motion.path
                key={`back-${scene}-${idx}`}
                d={p.d}
                stroke={p.stroke}
                strokeWidth={p.strokeWidth}
                fill={p.fill}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: idx * 0.05, ease: 'easeOut' }}
              />
            ))}
          </motion.g>

          {/* Animated Rain Streaks Layer */}
          {isRainy && (
            <motion.g style={{ x: rainX, y: rainY }}>
              {[44, 108, 174, 240, 306, 356].map((rx, i) => (
                <motion.line
                  key={`rain-${rx}`}
                  x1={rx}
                  y1={36 + (i % 3) * 24}
                  x2={rx - 8}
                  y2={66 + (i % 3) * 24}
                  stroke="rgba(234,230,223,0.16)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  animate={{ y: [0, 195], opacity: [0, 0.4, 0] }}
                  transition={{
                    duration: 1.4 + (i % 3) * 0.28,
                    repeat: Infinity,
                    delay: i * 0.22,
                    ease: 'linear',
                  }}
                />
              ))}
            </motion.g>
          )}

          {/* Front Parallax Layer */}
          <motion.g style={{ x: frontX, y: frontY }}>
            {activeScene.front.map((p, idx) => (
              <motion.path
                key={`front-${scene}-${idx}`}
                d={p.d}
                stroke={p.stroke}
                strokeWidth={p.strokeWidth}
                fill={p.fill}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.1 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}

            {scene === 'subway' &&
              visual === 'phone_glow' &&
              paths.cues.phoneGlow.map((p, idx) => (
                <motion.path
                  key={`cue-phone-${idx}`}
                  d={p.d}
                  stroke={p.stroke}
                  strokeWidth={p.strokeWidth}
                  fill={p.fill}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 2.0, repeat: Infinity }}
                />
              ))}

            {visual === 'calm_halo' &&
              paths.cues.calmHalo.map((p, idx) => (
                <motion.path
                  key={`cue-halo-${idx}`}
                  d={p.d}
                  stroke={p.stroke}
                  strokeWidth={p.strokeWidth}
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: idx * 0.15 }}
                />
              ))}

            {scene === 'room' &&
              visual === 'laptop_on' &&
              paths.cues.laptopOn.map((p, idx) => (
                <motion.path
                  key={`cue-lon-${idx}`}
                  d={p.d}
                  stroke={p.stroke}
                  strokeWidth={p.strokeWidth}
                  fill={p.fill}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
              ))}

            {scene === 'room' &&
              visual === 'laptop_off' &&
              paths.cues.laptopOff.map((p, idx) => (
                <motion.path
                  key={`cue-loff-${idx}`}
                  d={p.d}
                  stroke={p.stroke}
                  strokeWidth={p.strokeWidth}
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.12 }}
                />
              ))}

            {scene === 'store' &&
              paths.cues.steamPaths.map((p, idx) => (
                <motion.path
                  key={`cue-steam-${idx}`}
                  d={p.d}
                  stroke={p.stroke}
                  strokeWidth={p.strokeWidth}
                  fill="none"
                  animate={{ y: [0, -10, -18], opacity: [0, 0.55, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: idx * 0.8,
                    ease: 'easeOut',
                  }}
                />
              ))}

            {scene === 'subway' && (
              <motion.line
                x1={40}
                y1={208}
                x2={105}
                y2={208}
                stroke="rgba(226,168,86,0.14)"
                strokeWidth="1.5"
                animate={{ x: [-80, 340], opacity: [0, 0.45, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
              />
            )}

            {scene === 'alley' &&
              visual === 'streetlight' &&
              paths.cues.streetlightCue.map((p, idx) => (
                <motion.path
                  key={`cue-street-${idx}`}
                  d={p.d}
                  stroke={p.stroke}
                  strokeWidth={p.strokeWidth}
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.65, 1, 0.7] }}
                  transition={{ duration: 3.0, repeat: Infinity }}
                />
              ))}

            {scene === 'balcony' &&
              visual === 'window_lights' &&
              paths.cues.windowLightsCue.map((p, idx) => (
                <motion.path
                  key={`cue-win-${idx}`}
                  d={p.d}
                  stroke={p.stroke}
                  strokeWidth={p.strokeWidth}
                  fill={p.fill}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.55, 0.95, 0.55] }}
                  transition={{ duration: 2.8, delay: idx * 0.5, repeat: Infinity }}
                />
              ))}

            {scene === 'riverside' &&
              visual === 'flight_mode' &&
              paths.cues.flightModeCue.map((p, idx) => (
                <motion.path
                  key={`cue-flight-${idx}`}
                  d={p.d}
                  stroke={p.stroke}
                  strokeWidth={p.strokeWidth}
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.0, delay: idx * 0.2 }}
                />
              ))}

            {scene === 'dawn_bridge' && visual === 'sunrise' && (
              <motion.circle
                cx={218}
                cy={228}
                r={52}
                fill="rgba(226,168,86,0.08)"
                animate={{ opacity: [0.45, 0.85, 0.45], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.g>
        </motion.svg>
      </AnimatePresence>
    </motion.div>
  );
}
