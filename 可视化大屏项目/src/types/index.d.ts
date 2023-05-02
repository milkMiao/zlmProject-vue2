import type { Viewer } from "cesium";

declare global {
  interface Window {
    viewer: Viewer;
  }

  type GeomType = "point" | "polygon" | "polyline";
}
