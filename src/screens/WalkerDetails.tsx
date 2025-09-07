import DateTimePicker from "@react-native-community/datetimepicker";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, Platform, StyleSheet, Text, View } from "react-native";
import { bookWalker, getWalker, type Walker } from "../api/mockApi";
import type { RootStackParamList } from "../navigation/RootNavigator";

// Props type for navigation and route
type Props = NativeStackScreenProps<RootStackParamList, "WalkerDetails">;

// WalkerDetails screen shows details for a selected walker and allows booking
export default function WalkerDetails({ route, navigation }: Props) {
  const walkerId = route.params?.walkerId!;
  const onConfirm = route.params?.onConfirm;
  const [walker, setWalker] = useState<Walker | undefined>();
  const [loading, setLoading] = useState(true);

  // Booking state
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setWalker(await getWalker(walkerId));
      setLoading(false);
    })();
  }, [walkerId]);

  const handleBook = async () => {
    setBooking(true);
    await bookWalker(walkerId);
    setBooking(false);
    setMessage(
      `Booking successful for ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}!`
    );
    if (onConfirm && walker) {
      onConfirm({
        id: Date.now().toString(),
        walkerName: walker.name,
        walkerPhoto: walker.photoUrl,
        date,
        status: "Confirmed"
      });
      navigation.goBack();
    }

  if (loading || !walker) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: walker.photoUrl || "https://randomuser.me/api/portraits/men/32.jpg" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{walker.name}</Text>
      {walker.isVerified && (
        <Text style={styles.verified}>Verified Walker</Text>
      )}
      <Text style={styles.rating}>
        {"★".repeat(Math.round(walker.rating))} {walker.rating.toFixed(1)}
      </Text>
      <Text style={styles.rate}>£{walker.ratePerHour}/hr</Text>
      <Text style={styles.bio}>{walker.bio}</Text>

      {/* Date and Time Picker */}
      <View style={styles.bookingSection}>
        <Text style={styles.bookingLabel}>Choose date and time:</Text>
        <Button
          title={date ? `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "Select"}
          onPress={() => setShowPicker(true)}
        />
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (event?.type === "set" && selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
      </View>

      {/* Book button */}
      <Button
        title={booking ? "Booking..." : "Book this Walker"}
        onPress={handleBook}
        disabled={booking}
      />
      {message ? <Text style={styles.success}>{message}</Text> : null}
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8
  },
  verified: {
    color: "#0f9d58",
    fontWeight: "600",
    marginBottom: 8
  },
  rating: {
    fontSize: 18,
    marginBottom: 8
  },
  rate: {
    fontSize: 18,
    color: "#444",
    marginBottom: 8
  },
  bio: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    textAlign: "center"
  },
  bookingSection: {
    marginVertical: 16,
    width: "100%",
    alignItems: "center"
  },
  bookingLabel: {
    fontSize: 16,
    marginBottom: 8
  },
  success: {
    color: "#2e7d32",
    marginTop: 12,
    fontWeight: "600"
  }
});

};
