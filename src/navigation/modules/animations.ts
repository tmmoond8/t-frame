import type { UseSpringProps, SpringConfig } from "@react-spring/web";
import type { Platform } from "../types";

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
      transform: "translate3d(0, 0, 0)",
    },
    to: {
      transform: "translate3d(0, 0, 0)",
    },
  },
  slideIn: {
    from: {
      transform: "translate3d(100%, 0, 0)",
    },
    to: {
      transform: "translate3d(0%, 0, 0)",
      opacity: 1,
    },
  },
  slideOut: {
    from: {
      transform: "translate3d(0%, 0, 0)",
    },
    to: {
      transform: "translate3d(100%, 0, 0)",
    },
  },
  fadeIn: {
    from: {
      transform: "translate3d(-20%, 0, 0)",
      opacity: 0.4,
    },
    to: {
      transform: "translate3d(0%, 0, 0)",
      opacity: 1,
    },
  },
  fadeOut: {
    from: {
      transform: "translate3d(0%, 0, 0)",
      opacity: 1,
    },
    to: {
      transform: "translate3d(-20%, 0, 0)",
      opacity: 0.4,
    },
  },
};

const Android: StackAnimation = {
  config: {
    duration: 150,
  },
  fixed: {
    from: {
      transform: "translate3d(0, 0%, 0)",
      opacity: 1,
    },
    to: {
      transform: "translate3d(0, 0%, 0)",
      opacity: 1,
    },
  },
  slideIn: {
    from: {
      transform: "translate3d(0, 20%, 0)",
      opacity: 0.5,
    },
    to: {
      transform: "translate3d(0, 0%, 0)",
      opacity: 1,
    },
  },
  slideOut: {
    from: {
      transform: "translate3d(0, 0%, 0)",
      opacity: 1,
    },
    to: {
      transform: "translate3d(0, 20%, 0)",
      opacity: 0.2,
    },
  },
  fadeIn: {
    from: {
      transform: "translate3d(0, -6%, 0)",
      opacity: 0.6,
    },
    to: {
      transform: "translate3d(0, 0%, 0)",
      opacity: 1,
    },
  },
  fadeOut: {
    from: {
      transform: "translate3d(0, 0%, 0)",
      opacity: 1,
    },
    to: {
      transform: "translate3d(0, -6%, 0)",
      opacity: 0.6,
    },
  },
};

const nonAnimation = {
  from: {
    transform: "translate3d(0%, 0, 0)",
  },
  to: {
    transform: "translate3d(0%, 0, 0)",
  },
};

const Web = {
  config: {
    duration: 0,
  },
  fixed: nonAnimation,
  slideIn: nonAnimation,
  slideOut: nonAnimation,
  fadeIn: nonAnimation,
  fadeOut: nonAnimation,
};

export default {
  Cupertino,
  Android,
  Web,
} as Record<Platform, StackAnimation>;
