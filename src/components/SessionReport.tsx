import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

// SessionReport component for submitting walk session details
export default function SessionReport({ onSubmit }: { onSubmit: (report: { distance: string; time: string; notes: string }) => void }) {
  // State for form fields
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  // Handle form submission
  const handleSubmit = () => {
    onSubmit({ distance, time, notes });
    setDistance("");
    setTime("");
    setNotes("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Report</Text>
      {/* Walk distance input */}
      <TextInput
        style={styles.input}
        placeholder="Distance (km)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      {/* Walk time input */}
      <TextInput
        style={styles.input}
        placeholder="Time (minutes)"
        keyboardType="numeric"
        value={time}
        onChangeText={setTime}
      />
      {/* Additional notes input */}
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Additional notes"
        multiline
        value={notes}
        onChangeText={setNotes}
      />
      {/* Submit button */}
      <Button title="Submit Report" onPress={handleSubmit} />
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    margin: 16
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12
  },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      marginBottom: 12,
      fontSize: 16,
      backgroundColor: "#fafafa"
    }
  });
