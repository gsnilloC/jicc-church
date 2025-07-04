// CSS modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Images
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
