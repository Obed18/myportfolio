import type * as React from "react";

declare module "react-icons" {
  export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
  }

  export type IconType = (props: IconBaseProps) => React.ReactElement | null;
  
  export const FaGithub: IconType;
  export const FiLinkedin: IconType;
  export const RiTwitterXLine: IconType;
  export const FiMail: IconType;
  export const FiExternalLink: IconType;
  export const FaLinkedinIn: IconType;
  export const FaXTwitter: IconType;
}
