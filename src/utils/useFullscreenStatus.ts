import { useLayoutEffect, useState } from 'react';

declare global {
  interface Document {
    fullscreenElement: any;
    mozFullScreenElement: any;
    msFullscreenElement: any;
    webkitFullscreenElement: any;
  }
}

function getBrowserFullscreenElementProp() {
  if (typeof document.fullscreenElement !== 'undefined')
    return 'fullscreenElement';
  else if (typeof document.mozFullScreenElement !== 'undefined')
    return 'mozFullScreenElement';
  else if (typeof document.msFullscreenElement !== 'undefined')
    return 'msFullscreenElement';
  else if (typeof document.webkitFullscreenElement !== 'undefined')
    return 'webkitFullscreenElement';
  else throw new Error('fullscreenElement is not supported by this browser');
}

export default function useFullscreenStatus(ref: any): [boolean, () => void] {
  const [isFullscreen, setIsFullscreen] = useState(
    document[getBrowserFullscreenElementProp()] != null
  );

  const setFullscreen = () => {
    if (ref.current == null) return;

    (isFullscreen ? document : ref.current)
      [isFullscreen ? 'exitFullscreen' : 'requestFullscreen']()
      .then(() =>
        setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)
      )
      .catch(() => setIsFullscreen(false));
  };

  useLayoutEffect(() => {
    document.addEventListener('fullscreenchange', () =>
      setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)
    );
    return () => document.removeEventListener('fullscreenchange', () => {});
  });

  return [isFullscreen, setFullscreen];
}
