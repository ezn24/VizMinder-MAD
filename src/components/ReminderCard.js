import React from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Chip, IconButton, Surface, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";

export default function ReminderCard({ reminder, countdown, onComplete, onAttachImage }) {
  return (
    <Animatable.View animation="fadeInUp" duration={420} useNativeDriver>
      <Surface style={styles.card} elevation={1}>
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons
              name={reminder.completed ? "check-circle" : reminder.important ? "pill" : "bell-outline"}
              size={28}
              color={reminder.completed ? "#2E7D32" : reminder.important ? "#B3261E" : "#1565C0"}
            />
          </View>
          <View style={styles.titleArea}>
            <Text variant="titleMedium" style={styles.title}>
              {reminder.title}
            </Text>
            <Text variant="bodyMedium" style={styles.visualCue}>
              {reminder.visualCue}
            </Text>
          </View>
          <IconButton icon="camera-plus-outline" mode="contained-tonal" onPress={onAttachImage} />
        </View>

        {reminder.imageUri ? <Image source={{ uri: reminder.imageUri }} style={styles.image} /> : null}

        <View style={styles.metaRow}>
          <Chip compact icon="clock-outline">
            {format(parseISO(reminder.scheduledAt), "h:mm a")}
          </Chip>
          <Chip compact icon="timer-outline">
            {countdown}
          </Chip>
          <Chip compact icon="fire">
            {reminder.streak}
          </Chip>
        </View>

        <View style={styles.actionRow}>
          <Button
            mode={reminder.completed ? "outlined" : "contained"}
            icon={reminder.completed ? "check" : "check-bold"}
            disabled={reminder.completed}
            onPress={onComplete}
          >
            {reminder.completed ? "Completed" : "Yes, done"}
          </Button>
          <Button mode="text" icon="close" textColor="#6F7785">
            Not yet
          </Button>
        </View>
      </Surface>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    gap: 14,
    marginBottom: 12,
    padding: 16
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12
  },
  iconWrap: {
    alignItems: "center",
    backgroundColor: "#E8EEF7",
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    width: 48
  },
  titleArea: {
    flex: 1
  },
  title: {
    color: "#172033",
    fontWeight: "700"
  },
  visualCue: {
    color: "#4F5B6D",
    marginTop: 2
  },
  image: {
    aspectRatio: 16 / 9,
    borderRadius: 8,
    width: "100%"
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  actionRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between"
  }
});
