import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, List, Text } from "react-native-paper";

const packages = [
  ["react-native-paper", "Google Material Design controls, theme, buttons, chips and surfaces."],
  ["react-native-confetti-cannon", "Completion celebration for important reminders."],
  ["react-native-animatable", "Lightweight reminder entrance animations and visual feedback."],
  ["react-native-calendars", "Month planner with dots showing task distribution."],
  ["date-fns", "Formatting, countdown text and date comparison helpers."],
  ["expo-image-picker", "Camera and gallery attachment flow for visual cues."],
  ["@react-native-async-storage/async-storage", "Local persistence for reminders between app launches."]
];

export default function PackageRoleList() {
  return (
    <View style={styles.section}>
      <Text variant="titleMedium" style={styles.heading}>
        Prototype packages
      </Text>
      {packages.map(([name, description], index) => (
        <View key={name}>
          <List.Item title={name} description={description} left={(props) => <List.Icon {...props} icon="package-variant" />} />
          {index < packages.length - 1 ? <Divider /> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28
  },
  heading: {
    color: "#172033",
    fontWeight: "700",
    marginBottom: 8
  }
});
