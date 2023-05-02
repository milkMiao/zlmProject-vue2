type Type = "modal" | "sider";

interface ViewConfig {
  title?: string;
  component: DefineComponent;
  type?: Type;
  props: {
    width: string;
    collapsedWidth?: string | number;
  };
}

interface MenuItem {
  key: string;
  name: string;
  viewConfig: ViewConfig;
  icon: DefineComponent | "";
}
