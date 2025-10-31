import { Preset } from '@/types/filter';

export const presets: Preset[] = [
  // CSSFilterGenerator EXTREME presets
  {
    id: 'nu80s',
    name: 'nu80s',
    category: 'extreme',
    filters: {
      brightness: 1.12,
      contrast: 1.1
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgb(255, 0, 134)',
      gradientColor2: 'rgb(0, 117, 255)',
      blendMode: 'overlay',
      gradientOrientation: 'linear-gradient(to bottom'
    }
  },
  {
    id: 'mars-sky',
    name: 'Mars Sky',
    category: 'extreme',
    filters: {
      brightness: 1.16,
      grayscale: 0.75,
      huerotate: 173
    },
    overlay: {
      type: 'none'
    }
  },
  {
    id: 'seafoam',
    name: 'Seafoam',
    category: 'extreme',
    filters: {
      contrast: 0.59
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgb(0, 255, 84)',
      gradientColor2: 'rgb(0, 61, 255)',
      blendMode: 'color',
      gradientOrientation: 'linear-gradient(to bottom'
    }
  },
  {
    id: 'solar',
    name: 'Solar',
    category: 'extreme',
    filters: {
      huerotate: -173,
      invert: 0.99
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgba(20, 0, 255, 0.65)',
      gradientColor2: 'rgba(0, 188, 255, 0.4)',
      blendMode: 'exclusion',
      gradientOrientation: 'linear-gradient(to bottom'
    }
  },
  {
    id: 'sunset',
    name: 'Michael Bay Sunset',
    category: 'extreme',
    filters: {
      brightness: 2.32,
      contrast: 2.90,
      grayscale: 1
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgb(255, 0, 0)',
      gradientColor2: 'rgb(253, 255, 0)',
      blendMode: 'multiply',
      gradientOrientation: 'linear-gradient(45deg'
    }
  },

  // CSSGram presets
  {
    id: '1977',
    name: '1977',
    category: 'cssgram',
    filters: {
      brightness: 1.1,
      contrast: 1.1,
      saturate: 1.3
    },
    overlay: {
      type: 'solid',
      solidColor: 'rgba(243, 106, 188, 0.3)',
      blendMode: 'screen'
    }
  },
  {
    id: 'aden',
    name: 'Aden',
    category: 'cssgram',
    filters: {
      brightness: 1.2,
      contrast: 0.9,
      huerotate: -20,
      saturate: 0.85
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgba(66, 10, 14, 0.2)',
      gradientColor2: 'rgba(66, 10, 14, 0.0)',
      blendMode: 'darken',
      gradientOrientation: 'linear-gradient(to right'
    }
  },
  {
    id: 'brooklyn',
    name: 'Brooklyn',
    category: 'cssgram',
    filters: {
      brightness: 1.1,
      contrast: 0.9
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgba(168, 223, 193, 0.4)',
      gradientColor2: 'rgba(196, 183, 200, 0.99)',
      blendMode: 'overlay',
      gradientOrientation: 'radial-gradient(ellipse at center'
    }
  },
  {
    id: 'clarendon',
    name: 'Clarendon',
    category: 'cssgram',
    filters: {
      contrast: 1.2,
      saturate: 1.35
    },
    overlay: {
      type: 'solid',
      solidColor: 'rgba(127, 187, 227, 0.2)',
      blendMode: 'overlay'
    }
  },
  {
    id: 'earlybird',
    name: 'Earlybird',
    category: 'cssgram',
    filters: {
      contrast: 0.9,
      sepia: 0.2
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgba(208, 186, 142, 0.98)',
      gradientColor2: 'rgba(54, 3, 9, 0.99)',
      blendMode: 'overlay',
      gradientOrientation: 'radial-gradient(ellipse at center'
    }
  },
  {
    id: 'gingham',
    name: 'Gingham',
    category: 'cssgram',
    filters: {
      brightness: 1.05,
      huerotate: -10
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgba(66, 10, 14, 0.2)',
      gradientColor2: 'rgba(66, 10, 14, 0.0)',
      blendMode: 'darken',
      gradientOrientation: 'linear-gradient(to right'
    }
  },
  {
    id: 'hudson',
    name: 'Hudson',
    category: 'cssgram',
    filters: {
      brightness: 1.2,
      contrast: 0.9,
      saturate: 1.1
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgba(166, 177, 255, 0.5)',
      gradientColor2: 'rgba(52, 33, 54, 0.5)',
      blendMode: 'multiply',
      gradientOrientation: 'radial-gradient(ellipse at center'
    }
  },
  {
    id: 'inkwell',
    name: 'Inkwell',
    category: 'cssgram',
    filters: {
      brightness: 1.1,
      contrast: 1.1,
      grayscale: 0.99,
      sepia: 0.3
    },
    overlay: {
      type: 'none'
    }
  },
  {
    id: 'lark',
    name: 'Lark',
    category: 'cssgram',
    filters: {
      contrast: 0.9
    },
    overlay: {
      type: 'solid',
      solidColor: '#22253f',
      blendMode: 'color-dodge'
    }
  },
  {
    id: 'lofi',
    name: 'Lofi',
    category: 'cssgram',
    filters: {
      contrast: 1.5,
      saturate: 1.1
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgba(0, 0, 0, 0.0)',
      gradientColor2: 'rgba(34, 34, 34, 0.99)',
      blendMode: 'multiply',
      gradientOrientation: 'radial-gradient(ellipse at center'
    }
  },
  {
    id: 'mayfair',
    name: 'Mayfair',
    category: 'cssgram',
    filters: {
      contrast: 1.1,
      saturate: 1.1
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgba(255, 255, 255, 0.4)',
      gradientColor2: 'rgba(255, 200, 200, 0.3)',
      blendMode: 'overlay',
      gradientOrientation: 'radial-gradient(ellipse at center'
    }
  },
  {
    id: 'moon',
    name: 'Moon',
    category: 'cssgram',
    filters: {
      brightness: 1.1,
      contrast: 1.1,
      grayscale: 0.99
    },
    overlay: {
      type: 'solid',
      solidColor: '#383838',
      blendMode: 'lighten'
    }
  },
  {
    id: 'nashville',
    name: 'Nashville',
    category: 'cssgram',
    filters: {
      brightness: 1.05,
      contrast: 1.2,
      saturate: 1.2,
      sepia: 0.2
    },
    overlay: {
      type: 'solid',
      solidColor: 'rgba(247, 176, 153, 0.56)',
      blendMode: 'lighten'
    }
  },
  {
    id: 'reyes',
    name: 'Reyes',
    category: 'cssgram',
    filters: {
      brightness: 1.1,
      contrast: 0.85,
      saturate: 0.75,
      sepia: 0.22
    },
    overlay: {
      type: 'solid',
      solidColor: '#efcdad',
      blendMode: 'soft-light'
    }
  },
  {
    id: 'rise',
    name: 'Rise',
    category: 'cssgram',
    filters: {
      brightness: 1.1,
      contrast: 0.85,
      saturate: 0.75
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgba(236, 205, 169, 0.15)',
      gradientColor2: 'rgba(50, 30, 7, 0.4)',
      blendMode: 'multiply',
      gradientOrientation: 'radial-gradient(ellipse at center'
    }
  },
  {
    id: 'slumber',
    name: 'Slumber',
    category: 'cssgram',
    filters: {
      brightness: 1.05,
      saturate: 0.66
    },
    overlay: {
      type: 'solid',
      solidColor: 'rgba(69, 41, 12, 0.4)',
      blendMode: 'lighten'
    }
  },
  {
    id: 'toaster',
    name: 'Toaster',
    category: 'cssgram',
    filters: {
      brightness: 0.9,
      contrast: 1.5
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgba(128, 78, 15, 0.99)',
      gradientColor2: 'rgba(59, 0, 59, 0.99)',
      blendMode: 'screen',
      gradientOrientation: 'radial-gradient(ellipse at center'
    }
  },
  {
    id: 'walden',
    name: 'Walden',
    category: 'cssgram',
    filters: {
      brightness: 1.1,
      huerotate: -10,
      saturate: 1.6,
      sepia: 0.3
    },
    overlay: {
      type: 'solid',
      solidColor: 'rgba(0, 68, 204, 0.3)',
      blendMode: 'screen'
    }
  },
  {
    id: 'willow',
    name: 'Willow',
    category: 'cssgram',
    filters: {
      brightness: 0.9,
      contrast: 0.95
    },
    overlay: {
      type: 'solid',
      solidColor: 'rgba(216, 205, 203, 0.99)',
      blendMode: 'overlay'
    }
  },
  {
    id: 'xpro2',
    name: 'X-Pro II',
    category: 'cssgram',
    filters: {
      sepia: 0.3
    },
    overlay: {
      type: 'gradient',
      gradientColor1: 'rgba(230, 231, 224, 0.2)',
      gradientColor2: 'rgba(43, 42, 161, 0.79)',
      blendMode: 'color-burn',
      gradientOrientation: 'radial-gradient(ellipse at center'
    }
  }
];