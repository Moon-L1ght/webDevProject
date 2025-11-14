export {};

declare global {
  interface Window {
    electronAPI: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      onMaximizeChange: (callback: (isMaximized: boolean) => void) => void;
    };
  }
}