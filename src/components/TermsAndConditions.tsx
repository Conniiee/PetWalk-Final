import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

// Terms and Conditions component for display on the homepage
export default function TermsAndConditions() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Terms and Conditions</Text>
      <Text style={styles.text}>
        1. PetWalk provides a platform to connect pet owners with independent pet walkers.{"\n\n"}
        2. All bookings and services are agreements between the owner and the walker. PetWalk is not responsible for the conduct of either party.{"\n\n"}
        3. Owners are responsible for ensuring their pets are healthy, vaccinated, and safe to walk in public.{"\n\n"}
        4. Walkers agree to provide safe, responsible, and attentive care to all pets during walks.{"\n\n"}
        5. Cancellations should be communicated as early as possible. Fees may apply for late cancellations.{"\n\n"}
        6. Payment terms are agreed upon between the owner and walker. PetWalk does not handle payments directly.{"\n\n"}
        7. Both parties agree to treat each other respectfully and to resolve disputes amicably.{"\n\n"}
        8. By using PetWalk, you agree to these terms and our privacy policy.{"\n\n"}
        {"\n"}
        <Text style={styles.header}>Ethical Use Policy</Text>
        {"\n"}
        a. Users must not use PetWalk for any unlawful, harmful, or exploitative purposes.{"\n\n"}
        b. Discrimination, harassment, or abuse of any kind is strictly prohibited.{"\n\n"}
        c. Personal information shared on the platform must be handled respectfully and in accordance with privacy laws.{"\n\n"}
        d. Any misuse of the platform, including fraudulent bookings or misrepresentation, may result in suspension or removal from PetWalk.{"\n\n"}
        e. Users are encouraged to report unethical behavior to PetWalk support for review and action.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    margin: 16,
    maxHeight: 320
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10
  },
  text: {
    fontSize: 15,
    color: "#444"
  }
});