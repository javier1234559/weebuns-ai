declare module "@splidejs/react-splide" {
  import { ComponentType, ReactNode } from "react";

  export interface SplideProps {
    options?: any;
    className?: string;
    children?: ReactNode;
  }

  export interface SplideSlideProps {
    children?: ReactNode;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}
