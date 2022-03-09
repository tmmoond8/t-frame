import type { UseSpringProps, SpringConfig } from "@react-spring/web";
import type { Pratform } from "../types";

interface StackAnimation {
  fixed: UseSpringProps;
  slideIn: UseSpringProps;
  slideOut: UseSpringProps;
  fadeIn: UseSpringProps;
  fadeOut: UseSpringProps;
  config: SpringConfig;
}

const Cupertino: StackAnimation = {
  config: {
    duration: 200,
  },
  fixed: {
    from: {
      transform: "translateX(0%)",
    },
    to: {
      transform: "translateX(0%)",
    },
  },
  slideIn: {
    from: {
      transform: "translateX(100%)",
    },
    to: {
      transform: "translateX(0%)",
      opacity: 1,
    },
  },
  slideOut: {
    from: {
      transform: "translateX(0%)",
    },
    to: {
      transform: "translateX(100%)",
    },
  },
  fadeIn: {
    from: {
      transform: "translateX(-20%)",
      opacity: 0.6,
    },
    to: {
      transform: "translateX(0%)",
      opacity: 1,
    },
  },
  fadeOut: {
    from: {
      transform: "translateX(0%)",
      opacity: 1,
    },
    to: {
      transform: "translateX(-20%)",
      opacity: 0.6,
    },
  },
};

const Android: StackAnimation = {
  config: {
    duration: 150,
  },
  fixed: {
    from: {
      transform: "translateY(0%)",
    },
    to: {
      transform: "translateY(0%)",
    },
  },
  slideIn: {
    from: {
      transform: "translateY(30%)",
      opacity: 0.5,
    },
    to: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
  slideOut: {
    from: {
      transform: "translateY(0%)",
      opacity: 1,
    },
    to: {
      transform: "translateY(30%)",
      opacity: 0.5,
    },
  },
  fadeIn: {
    from: {
      transform: "translateY(-6%)",
      opacity: 0.6,
    },
    to: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
  fadeOut: {
    from: {
      transform: "translateY(0%)",
      opacity: 1,
    },
    to: {
      transform: "translateY(-6%)",
      opacity: 0.6,
    },
  },
};
const Web = {
  config: {
    duration: 0,
  },
  fixed: {
    from: {
      transform: "translateX(0%)",
    },
    to: {
      transform: "translateX(0%)",
    },
  },
  slideIn: {
    from: {
      transform: "translateX(0%)",
    },
    to: {
      transform: "translateX(0%)",
    },
  },
  slideOut: {
    from: {
      transform: "translateX(0%)",
    },
    to: {
      transform: "translateX(0%)",
    },
  },
  fadeIn: {
    from: {
      transform: "translateX(0%)",
    },
    to: {
      transform: "translateX(0%)",
    },
  },
  fadeOut: {
    from: {
      transform: "translateX(0%)",
    },
    to: {
      transform: "translateX(0%)",
    },
  },
};

export default {
  Cupertino,
  Android,
  Web,
} as Record<Pratform, StackAnimation>;
