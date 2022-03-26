import { useRef, useState } from 'react';
import appStyles from './App.module.scss';

import Time from './components/Time';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleHalfStroke,
  faExpand,
  faCompress,
} from '@fortawesome/free-solid-svg-icons';

import useFullscreenStatus from './utils/useFullscreenStatus';

export default function App() {
  // default to dark mode if it's evening (past 6pm)
  const [darkMode, setDarkMode] = useState(new Date().getHours() > 18);

  const [toggleFormat, setToggleFormat] = useState(12);

  const mainRef = useRef(null);
  const [isFullscreen, setFullscreen] = useFullscreenStatus(mainRef);

  return (
    <div className={appStyles.main} data-dark={darkMode} ref={mainRef}>
      <div className={appStyles.timeContainer}>
        <Time timeFormat={toggleFormat} />
      </div>

      <div className={appStyles.buttons}>
        <button
          onClick={() => setToggleFormat(toggleFormat === 12 ? 24 : 12)}
          title={`Toggle time period (12-Hour/24-Hour)`}
        >
          {toggleFormat}H
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          title={`Enable ${darkMode ? 'light' : 'dark'} mode`}
        >
          <FontAwesomeIcon
            className={appStyles.icon}
            icon={faCircleHalfStroke}
          />
        </button>

        <button
          onClick={() => setFullscreen()}
          title={`${isFullscreen ? 'Exit' : 'Enter'} fullscreen mode`}
        >
          <FontAwesomeIcon
            className={appStyles.icon}
            icon={isFullscreen ? faCompress : faExpand}
          />
        </button>
      </div>
    </div>
  );
}
