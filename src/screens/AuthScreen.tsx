import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TermsAndConditions from "../components/TermsAndConditions"; // <-- Add this import
import { useUserStore } from "../store/userStore";

// AuthScreen allows the user to select their role and log in
export default function AuthScreen() {
  // Access the setRole function from the user store
  const setRole = useUserStore((s) => s.setRole);
  const [selected, setSelected] = useState<"owner" | "walker" | null>(null);

  // State for showing Terms modal
  const [showTerms, setShowTerms] = useState(false);

  const handleContinue = () => {
    if (selected) setRole(selected);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Welcome to PetWalk</Text>
      {/* Subtitle */}
      <Text style={styles.subtitle}>Choose your role:</Text>

      {/* Owner login button */}
      <TouchableOpacity
        style={[styles.button, selected === "owner" && styles.selectedButton]}
        onPress={() => setSelected("owner")}
      >
        <Text style={[styles.buttonText, selected === "owner" && styles.white]}>
          I’m a Pet Owner
        </Text>
      </TouchableOpacity>

      {/* Walker login button */}
      <TouchableOpacity
        style={[styles.button, selected === "walker" && styles.selectedButton]}
        onPress={() => setSelected("walker")}
      >
        <Text style={[styles.buttonText, selected === "walker" && styles.white]}>
          I’m a Pet Walker
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.continueButton, !selected && { backgroundColor: "#aaa" }]}
        disabled={!selected}
        onPress={handleContinue}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* Terms and Conditions Button */}
      <TouchableOpacity onPress={() => setShowTerms(true)} style={styles.termsButton}>
        <Text style={styles.termsText}>View Terms and Conditions</Text>
      </TouchableOpacity>

      {/* Terms and Conditions Modal */}
      <Modal visible={showTerms} animationType="slide" onRequestClose={() => setShowTerms(false)}>
        <TermsAndConditions />
        <Button title="Close" onPress={() => setShowTerms(false)} />
      </Modal>
    </View>
  );
}

// Styles for layout and appearance
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 16 },
  subtitle: { fontSize: 18, marginBottom: 32, color: "#555" },
  button: { padding: 16, borderRadius: 12, backgroundColor: "#eee", marginVertical: 6, width: "80%", alignItems: "center" },
  selectedButton: { backgroundColor: "#2ecc71" },
  buttonText: { fontSize: 16, fontWeight: "600", color: "#333" },
  white: { color: "white" },
  continueButton: { marginTop: 20, padding: 16, borderRadius: 12, backgroundColor: "#27ae60", width: "80%", alignItems: "center" },
  continueText: { fontSize: 16, fontWeight: "700", color: "white" },
  termsButton: { marginTop: 24 },
  termsText: { color: "#2e7d32", textDecorationLine: "underline", fontSize: 15 }
});
