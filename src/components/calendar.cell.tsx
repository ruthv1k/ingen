import { format, isPast, isToday } from 'date-fns';

const styles = {
  calendarButton: {
    pastDays:
      'absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center transition-all duration-150 ease-linear border-light-border/30 border border-light-border-pale font-normal text-light-text-pale dark:border-dark-theme-primary/20 dark:bg-dark-theme-primary/20 dark:text-white/25 outline-none',
    today:
      'absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center transition-all duration-150 ease-linear border-2 border-light-theme-primary bg-white/30 hover:bg-light-theme-primary/25  hover:font-semibold hover:text-white dark:border-dark-theme-primary dark:bg-dark-theme-primary/5 dark:text-white dark:hover:bg-dark-theme-primary/50 outline-none',
    upcomingDays:
      'absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center transition-all duration-150 ease-linear border border-light-theme-primary/25 bg-white/30 hover:border-light-theme-primary/25 hover:bg-light-theme-primary/10 hover:font-semibold hover:text-light-theme-primary dark:border-dark-theme-primary/25 dark:bg-dark-theme-primary/5 dark:text-white dark:hover:border-dark-theme-primary  dark:hover:bg-dark-theme-primary/50 outline-none',
  },
};

const CalendarCell = ({
  day,
  onClick,
}: {
  day: Date;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <div className='relative min-h-[80px] min-w-[60px] overflow-hidden md:min-h-[100px] md:min-w-[100px]'>
      <button
        value={format(day, 'PP')}
        onClick={onClick}
        className={
          isToday(day)
            ? styles.calendarButton.today
            : isPast(day)
            ? styles.calendarButton.pastDays
            : styles.calendarButton.upcomingDays
        }
      >
        {format(day, 'd')}
      </button>
    </div>
  );
};

export default CalendarCell;
