import { useEffect, useState } from 'react';
import timeStyles from './Time.module.scss';

interface TimeProps {
  // 12: 12-hour format
  // 24: 24-hour format
  timeFormat: 12 | 24 | number;
}

export default function Time(props: TimeProps) {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    seconds: 0,
    secondsProgress: 0,
  });

  const { timeFormat } = props;

  useEffect(
    () =>
      void setTimeout(() => {
        const now = new Date();
        setTime({
          hour: now.getHours(),
          minute: now.getMinutes(),
          seconds: now.getSeconds(),
          secondsProgress: now.getSeconds() / 59,
        });
      }, 1e2),
    [time]
  );

  return (
    <div className={timeStyles.main}>
      <div className={timeStyles.timeHolder}>
        <div className={timeStyles.time}>
          <span className={timeStyles.digit}>
            {timeFormat === 24 && String(time.hour).padStart(2, '0')}
            {timeFormat === 12 &&
              String(
                (time.hour > 12 ? time.hour - 12 : time.hour) || 12
              ).padStart(2, '0')}
          </span>

          <span className={timeStyles.separator} />

          <span className={timeStyles.digit}>
            {String(time.minute).padStart(2, '0')}
          </span>

          <span className={timeStyles.separator} />

          <span className={timeStyles.digit}>
            {String(time.seconds).padStart(2, '0')}
          </span>
        </div>

        <div className={timeStyles.utilityContainer}>
          <div className={timeStyles.timePeriod}>
            <div className={timeStyles.period} data-active={time.hour < 12}>
              <span>AM</span>
            </div>

            <div className={timeStyles.period} data-active={time.hour >= 12}>
              <span>PM</span>
            </div>
          </div>
        </div>
      </div>
      <div className={timeStyles.timeProgress}>
        <div
          className={timeStyles.bar}
          style={{ width: time.secondsProgress * 100 + '%' }}
        />
      </div>
    </div>
  );
}
