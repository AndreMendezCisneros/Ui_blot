import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TimeSlot {
  day: string;
  hour: number;
  available: boolean;
}

interface AvailabilityCalendarProps {
  teacherId: string;
  isEditable?: boolean;
}

// Days and hours for the schedule
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 7am to 9pm

const AvailabilityCalendar = ({ teacherId, isEditable = false }: AvailabilityCalendarProps) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    // In a real app, this would fetch the teacher's availability from an API
    // For demo purposes, generating random availability
    const initialTimeSlots: TimeSlot[] = [];
    
    days.forEach(day => {
      hours.forEach(hour => {
        initialTimeSlots.push({
          day,
          hour,
          available: Math.random() > 0.3 // 70% chance of being available
        });
      });
    });
    
    setTimeSlots(initialTimeSlots);
  }, [teacherId]);

  const toggleAvailability = (day: string, hour: number) => {
    if (!isEditable) return;
    
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.day === day && slot.hour === hour
          ? { ...slot, available: !slot.available }
          : slot
      )
    );
  };

  const formatHour = (hour: number) => {
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return '12:00 PM';
    return `${hour - 12}:00 PM`;
  };

  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[768px]">
        <div className="grid grid-cols-7 border-b">
          <div className="p-2 font-medium text-center border-r">Time</div>
          {days.map(day => (
            <div key={day} className="p-2 font-medium text-center">
              {day}
            </div>
          ))}
        </div>
        
        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-7 border-b">
            <div className="p-2 text-sm text-center border-r">
              {formatHour(hour)}
            </div>
            
            {days.map(day => {
              const slot = timeSlots.find(s => s.day === day && s.hour === hour);
              
              return (
                <div 
                  key={`${day}-${hour}`}
                  className={cn(
                    "p-2 text-center transition-colors duration-200",
                    slot?.available 
                      ? "bg-green-100 dark:bg-green-900/30" 
                      : "bg-red-100 dark:bg-red-900/20",
                    isEditable && "cursor-pointer hover:opacity-80"
                  )}
                  onClick={() => toggleAvailability(day, hour)}
                >
                  {slot?.available ? "Available" : "Unavailable"}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;