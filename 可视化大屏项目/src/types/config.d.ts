interface MapState {
  initCoordinates: Coordinates;
  baseLayerUrl: string;
  orientation: Orientation;
  sceneMode: string;
}

interface Coordinates {
  longitude: number;
  latitude: number;
  height: number | undefined;
}

//嵌套结构
interface LayerConfig {
  id: string;
  name: string;
  url?: string;
  children?: Array<LayerConfig>;
}

interface Orientation {
  heading: number;
  // 视角
  pitch: number;
  roll: number;
}
