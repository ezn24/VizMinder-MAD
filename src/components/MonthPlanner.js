import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Surface, Text } from "react-native-paper";

export default function MonthPlanner({ markedDates, selectedDate, onSelectDate }) {
  return (
    <View style={styles.section}>
      <Text variant="titleMedium" style={styles.heading}>
        Month view
      </Text>
      <Surface style={styles.calendarWrap} elevation={1}>
        <Calendar
          current={selectedDate}
          markedDates={markedDates}
          onDayPress={(day) => onSelectDate(day.dateString)}
          theme={{
            arrowColor: "#1565C0",
            selectedDayBackgroundColor: "#1565C0",
            todayTextColor: "#B3261E",
            textDayFontWeight: "500",
            textMonthFontWeight: "700"
          }}
        />
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 18
  },
  heading: {
    color: "#172033",
    fontWeight: "700",
    marginBottom: 8
  },
  calendarWrap: {
    borderRadius: 8,
    overflow: "hidden"
  }
});
