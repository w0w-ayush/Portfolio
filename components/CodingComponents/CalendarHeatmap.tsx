import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarDay {
  date: Date;
  count: number;
}

interface CalendarHeatmapProps {
  data: Record<string, number> | undefined;
}

// Helper function to get the date exactly 365 days ago
const getStartDate = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() - 365);
  return date;
};

// Function to determine color intensity based on count
const getIntensityColor = (count: number): string => {
  if (count === 0) return "bg-gray-100 dark:bg-gray-800";
  if (count <= 2) return "bg-emerald-100 dark:bg-emerald-900";
  if (count <= 4) return "bg-emerald-300 dark:bg-emerald-700";
  if (count <= 6) return "bg-emerald-500 dark:bg-emerald-500";
  return "bg-emerald-700 dark:bg-emerald-300";
};

const getMonthName = (date: Date): string => {
  return date.toLocaleString("default", { month: "short" });
};

export const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({
  data,
}): JSX.Element => {
  // console.log(data);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const monthGroups: { label: string; weeks: CalendarDay[][] }[] = [];
  let currentWeek: CalendarDay[] = [];
  let currentMonthWeeks: CalendarDay[][] = [];
  let currentMonth = -1;

  const today = new Date();
  const startDate = getStartDate();

  // Create a map to store submission data by date
  const submissionMap = new Map(
    Object.entries(data || {}).map(([key, value]) => [
      new Date(parseInt(key) * 1000).toDateString(),
      value,
    ])
  );

  // Iterate over each day from start date to today
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    if (currentWeek.length === 7) {
      currentMonthWeeks.push(currentWeek);
      currentWeek = [];
    }

    // Check if we have moved to a new month
    if (d.getMonth() !== currentMonth) {
      if (currentMonthWeeks.length > 0) {
        monthGroups.push({
          label: getMonthName(new Date(d.getFullYear(), currentMonth)),
          weeks: currentMonthWeeks,
        });
        currentMonthWeeks = [];
      }
      currentMonth = d.getMonth();
    }

    const count = submissionMap.get(d.toDateString()) || 0;
    currentWeek.push({
      date: new Date(d),
      count,
    });
  }

  // Push any remaining days into the last month group
  if (currentWeek.length > 0) {
    currentMonthWeeks.push(currentWeek);
  }
  if (currentMonthWeeks.length > 0) {
    monthGroups.push({
      label: getMonthName(new Date(today.getFullYear(), currentMonth)),
      weeks: currentMonthWeeks,
    });
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth;
      handleScroll();
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // console.log("Months - ", monthGroups);

  return (
    <div className="mt-6 -mx-6">
      <div className="flex justify-between items-center mb-4 px-6">
        <p className="text-sm text-muted-foreground">
          Submission Activity (Last 12 Months)
        </p>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">Less</div>
          <div className="flex gap-1">
            {[0, 2, 4, 6, 8].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${getIntensityColor(level)}`}
              />
            ))}
          </div>
          <div className="text-xs text-muted-foreground">More</div>
        </div>
      </div>

      <div className="relative">
        {showLeftScroll && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 backdrop-blur-sm border rounded-full shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {showRightScroll && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 backdrop-blur-sm border rounded-full shadow-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto hide-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex w-full gap-4 sm:gap-6 px-6 min-w-max">
            {monthGroups.map((month, monthIndex) => (
              <div key={monthIndex} className="relative">
                <div className="flex items-center gap-4 mb-2">
                  <h4 className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    {month.label}
                  </h4>
                  <div className="h-px flex-grow bg-border" />
                </div>
                <div className="flex gap-1">
                  {month.weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((day, dayIndex) => (
                        <div key={dayIndex} className="relative group">
                          <div
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${getIntensityColor(
                              day.count
                            )} hover:scale-110 transition-transform cursor-pointer`}
                          />
                          <div className="pointer-events-none absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
                            {day.date.toLocaleDateString()}: {day.count}{" "}
                            submissions
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeatmap;
