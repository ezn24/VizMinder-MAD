import { useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addMinutes, format, formatDistanceStrict, isSameDay, parseISO } from "date-fns";
import { seedReminders } from "../data/seedReminders";

const STORAGE_KEY = "vizminder.reminders.v1";

export function useReminders() {
  const [reminders, setReminders] = useState(seedReminders);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function restore() {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setReminders(JSON.parse(saved));
      }
      setLoaded(true);
    }

    restore().catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders)).catch(() => {});
  }, [loaded, reminders]);

  const completeReminder = useCallback((id) => {
    setReminders((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, completed: true, completedAt: new Date().toISOString(), streak: item.streak + 1 }
          : item
      )
    );
  }, []);

  const attachImage = useCallback((id, imageUri) => {
    setReminders((items) => items.map((item) => (item.id === id ? { ...item, imageUri } : item)));
  }, []);

  const updateReminder = useCallback((id, patch) => {
    setReminders((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const deleteReminder = useCallback((id) => {
    setReminders((items) => items.filter((item) => item.id !== id));
  }, []);

  const addReminder = useCallback((draft = {}) => {
    const nextReminder = {
      ...draft,
      id: draft.id || `reminder-${Date.now()}`,
      title: "New reminder",
      description: "Add a visual cue and simple prompt",
      visualCue: "Photo or icon cue",
      icon: "bell-outline",
      scheduledAt: addMinutes(new Date(), 30).toISOString(),
      timeSet: true,
      hasDate: false,
      repeat: false,
      important: false,
      completed: false,
      imageUri: null,
      streak: 0,
      ...draft
    };
    setReminders((items) => [nextReminder, ...items]);
    return nextReminder;
  }, []);

  const resetPrototype = useCallback(() => {
    setReminders(seedReminders);
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, []);

  const visibleReminders = useMemo(
    () => reminders.filter((item) => isSameDay(parseISO(item.scheduledAt), parseISO(selectedDate))),
    [reminders, selectedDate]
  );

  const markedDates = useMemo(() => {
    return reminders.reduce((dates, reminder) => {
      if (reminder.hasDate === false) {
        return dates;
      }

      const day = format(parseISO(reminder.scheduledAt), "yyyy-MM-dd");
      const color = reminder.completed ? "#2E7D32" : reminder.important ? "#B3261E" : "#1565C0";
      dates[day] = {
        ...(dates[day] || {}),
        marked: true,
        dotColor: color,
        selected: day === selectedDate,
        selectedColor: "#1565C0"
      };
      return dates;
    }, {});
  }, [reminders, selectedDate]);

  const getCountdown = useCallback((isoDate) => {
    const target = parseISO(isoDate);
    const now = new Date();
    if (target < now) {
      return "Due now";
    }
    return `${formatDistanceStrict(target, now)} left`;
  }, []);

  return {
    reminders,
    visibleReminders,
    selectedDate,
    markedDates,
    setSelectedDate,
    completeReminder,
    attachImage,
    updateReminder,
    addReminder,
    deleteReminder,
    resetPrototype,
    getCountdown
  };
}
