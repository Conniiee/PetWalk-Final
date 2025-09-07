import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { listWalkers, type Walker } from "../api/mockApi";
import WalkerCard from "../components/WalkerCard";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { useUserStore } from "../store/userStore";

type Props = NativeStackScreenProps<RootStackParamList, "OwnerHome">;

const initialConfirmedBookings = [
  {
    id: "1",
    walkerName: "John Doe",
    walkerPhoto: "https://randomuser.me/api/portraits/men/12.jpg",
    date: new Date(),
    status: "Confirmed"
  },
  {
    id: "2",
    walkerName: "Jane Smith",
    walkerPhoto: "https://randomuser.me/api/portraits/women/36.jpg",
    date: new Date(),
    status: "Confirmed"
  }
];

const mockPastWalks = [
  {
    id: "1",
    walkerName: "Emily Johnson",
    walkerPhoto: "https://randomuser.me/api/portraits/women/22.jpg",
    date: new Date(),
    status: "Completed",
    distanceKm: 3.5,
    comment: "Great walk!"
  },
  {
    id: "2",
    walkerName: "Michael Brown",
    walkerPhoto: "https://randomuser.me/api/portraits/men/41.jpg",
    date: new Date(),
    status: "Completed",
    distanceKm: 2.1,
    comment: "Dog enjoyed the walk."
  }
];

export default function OwnerHome({ navigation }: Props) {
  const signOut = useUserStore((s) => s.signOut);
  const [data, setData] = useState<Walker[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Confirmed bookings state
  const [confirmedBookings, setConfirmedBookings] = useState(initialConfirmedBookings);
  // Success message state
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Add a confirmed booking from WalkerDetails
  function addConfirmedBooking(booking: any) {
    setConfirmedBookings(prev => [...prev, booking]);
    setBookingSuccess(
      `Booking successful for ${booking.walkerName} on ${booking.date.toLocaleDateString()} at ${booking.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}!`
    );
  }

  const load = async () => {
    setRefreshing(true);
    const w = await listWalkers();
    setData(w);
    setRefreshing(false);
  };

  useEffect(() => {
    load();
  }, []);

  // Tab state
  const [tab, setTab] = useState<"profile" | "walkers" | "confirmed" | "history">("profile");

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Navigation bar styled like WalkerHome */}
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <Text
          onPress={() => setTab("profile")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: 16,
            backgroundColor: tab === "profile" ? "#2e7d32" : "#f0f0f0",
            color: tab === "profile" ? "#fff" : "#000",
            fontWeight: "600",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        >
          Profile
        </Text>
        <Text
          onPress={() => setTab("walkers")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: 16,
            backgroundColor: tab === "walkers" ? "#2e7d32" : "#f0f0f0",
            color: tab === "walkers" ? "#fff" : "#000",
            fontWeight: "600",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        >
          Find Walkers
        </Text>
        <Text
          onPress={() => setTab("confirmed")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: 16,
            backgroundColor: tab === "confirmed" ? "#2e7d32" : "#f0f0f0",
            color: tab === "confirmed" ? "#fff" : "#000",
            fontWeight: "600",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        >
          Confirmed
        </Text>
        <Text
          onPress={() => setTab("history")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: 16,
            backgroundColor: tab === "history" ? "#2e7d32" : "#f0f0f0",
            color: tab === "history" ? "#fff" : "#000",
            fontWeight: "600",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        >
          Walk History
        </Text>
      </View>

      {/* Profile tab content */}
      {tab === "profile" && (
        <ScrollView>
          <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>Owner Profile</Text>
          <Text>Name: Jane Owner</Text>
          <Text>Email: jane.owner@email.com</Text>
          <Text>Phone: 07123 456789</Text>
          {/* Add more owner profile info here */}
        </ScrollView>
      )}

      {/* Find Walkers tab */}
      {tab === "walkers" ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
          ListHeaderComponent={
            <>
              <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>
                Find Walkers
              </Text>
              <Text style={{ color: "#666", marginBottom: 8 }}>
                Tap a walker to view details and book.
              </Text>
            </>
          }
          renderItem={({ item }) => (
            <WalkerCard
              walker={item}
              onPress={() =>
                navigation.navigate("WalkerDetails", {
                  walkerId: item.id,
                  onConfirm: addConfirmedBooking
                })
              }
            />
          )}
          ListFooterComponent={
            <Text
              onPress={signOut}
              style={{ textAlign: "center", color: "#2e7d32", marginTop: 12 }}
            >
              Sign out
            </Text>
          }
        />
      ) : tab === "confirmed" ? (
        <ScrollView>
          <Text style={styles.header}>Confirmed Bookings</Text>
          {bookingSuccess && (
            <Text style={{ color: "#2e7d32", fontWeight: "bold", marginBottom: 12 }}>
              {bookingSuccess}
            </Text>
          )}
          {confirmedBookings.length === 0 ? (
            <Text style={styles.subheader}>No confirmed bookings.</Text>
          ) : (
            confirmedBookings.map((booking) => (
              <View key={booking.id} style={styles.bookingCard}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                  <Image
                    source={{ uri: booking.walkerPhoto }}
                    style={styles.walkerPhoto}
                  />
                  <Text style={styles.bookingText}>
                    {booking.walkerName} - {booking.date.toLocaleString()} ({booking.status})
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      ) : (
        // Only show past walks in Walk History tab
        <ScrollView>
          <Text style={styles.header}>Past Walks</Text>
          {mockPastWalks.length === 0 ? (
            <Text style={styles.subheader}>No past walks.</Text>
          ) : (
            mockPastWalks.map((walk) => (
              <View key={walk.id} style={styles.bookingCard}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                  <Image
                    source={{ uri: walk.walkerPhoto }}
                    style={styles.walkerPhoto}
                  />
                  <Text style={styles.bookingText}>
                    {walk.walkerName} - {walk.date.toLocaleString()} ({walk.status})
                  </Text>
                </View>
                <Text style={styles.distanceText}>
                  Distance: {walk.distanceKm} km
                </Text>
                <Text style={styles.commentText}>
                  {walk.comment}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8
  },
  subheader: {
    color: "#666",
    marginBottom: 16
  },
  bookingCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 1,
    marginBottom: 12
  },
  bookingText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
    flex: 1,
    flexWrap: "wrap"
  },
  distanceText: {
    marginTop: 2,
    color: "#2e7d32",
    fontWeight: "600"
  },
  commentText: {
    marginTop: 6,
    fontStyle: "italic",
    color: "#555"
  },
  walkerPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 10
  }
});
