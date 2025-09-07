import React, { useState } from "react";
import { Button, Text, View, ScrollView, Switch, TextInput } from "react-native";
import { useUserStore } from "../store/userStore";

// Custom picker for React Native (if not using @react-native-picker/picker)
const DogSizePicker = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <View style={{ marginBottom: 8 }}>
    <Text>Dog Size Preference:</Text>
    <View style={{ flexDirection: "row", marginTop: 4 }}>
      {["Small", "Medium", "Large"].map((size) => (
        <Text
          key={size}
          onPress={() => onChange(size)}
          style={{
            padding: 8,
            marginRight: 8,
            borderRadius: 8,
            backgroundColor: value === size ? "#1976d2" : "#eee",
            color: value === size ? "#fff" : "#333",
            fontWeight: value === size ? "bold" : "normal"
          }}
        >
          {size}
        </Text>
      ))}
    </View>
  </View>
);

const GroupSizePicker = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <View style={{ marginBottom: 8 }}>
    <Text>Group Size Preference:</Text>
    <View style={{ flexDirection: "row", marginTop: 4 }}>
      {[1, 2, 3, 4, 5].map((size) => (
        <Text
          key={size}
          onPress={() => onChange(size)}
          style={{
            padding: 8,
            marginRight: 8,
            borderRadius: 8,
            backgroundColor: value === size ? "#1976d2" : "#eee",
            color: value === size ? "#fff" : "#333",
            fontWeight: value === size ? "bold" : "normal"
          }}
        >
          {size}
        </Text>
      ))}
    </View>
  </View>
);

// WalkerHome screen for walkers to view jobs and sign out
export default function WalkerHome() {
  const signOut = useUserStore((s) => s.signOut);

  // Tabs: "profile", "requests", "clients"
  const [tab, setTab] = useState<"profile" | "requests" | "clients">("profile");

  // Profile state
  const [name, setName] = useState("Walker Name");
  const [dob, setDob] = useState("1990-01-01");
  const [email, setEmail] = useState("walker@email.com");
  const [rating] = useState(4.5);
  const [workingHours, setWorkingHours] = useState("09:00 - 17:00");
  const [available, setAvailable] = useState(true);
  const [dogSize, setDogSize] = useState("Medium");
  const [groupSize, setGroupSize] = useState(2);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Navigation bar */}
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <Text
          onPress={() => setTab("profile")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: 16,
            backgroundColor: tab === "profile" ? "#1976d2" : "#f0f0f0",
            color: tab === "profile" ? "#fff" : "#000",
            fontWeight: "600",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        >
          Profile
        </Text>
        <Text
          onPress={() => setTab("requests")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: 16,
            backgroundColor: tab === "requests" ? "#1976d2" : "#f0f0f0",
            color: tab === "requests" ? "#fff" : "#000",
            fontWeight: "600",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        >
          Walk Requests
        </Text>
        <Text
          onPress={() => setTab("clients")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: 16,
            backgroundColor: tab === "clients" ? "#1976d2" : "#f0f0f0",
            color: tab === "clients" ? "#fff" : "#000",
            fontWeight: "600",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        >
          Previous Clients
        </Text>
      </View>

      {/* Tab content */}
      {tab === "profile" && (
        <ScrollView>
          <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>Your Profile</Text>
          <Text>Name:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 8,
              marginBottom: 8
            }}
          />
          <Text>Date of Birth:</Text>
          <TextInput
            value={dob}
            onChangeText={setDob}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 8,
              marginBottom: 8
            }}
            placeholder="YYYY-MM-DD"
          />
          <Text>Email Address:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 8,
              marginBottom: 8
            }}
            keyboardType="email-address"
          />
          <Text>Rating: {"★".repeat(Math.round(rating))} {rating.toFixed(1)}</Text>
          <View style={{ marginVertical: 12 }}>
            <Text>Working Hours:</Text>
            <TextInput
              value={workingHours}
              onChangeText={setWorkingHours}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 8,
                marginBottom: 8
              }}
              placeholder="e.g. 09:00 - 17:00"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <Text style={{ fontSize: 16, marginRight: 12 }}>Available:</Text>
            <Switch
              value={available}
              onValueChange={setAvailable}
              thumbColor={available ? "#1976d2" : "#ccc"}
            />
            <Text style={{ marginLeft: 8, color: available ? "#1976d2" : "#888" }}>
              {available ? "Online" : "Offline"}
            </Text>
          </View>
          <DogSizePicker value={dogSize} onChange={setDogSize} />
          <GroupSizePicker value={groupSize} onChange={setGroupSize} />

          {/* Save Changes Button */}
          <View style={{ marginVertical: 16 }}>
            <Button
              title="Save Changes"
              onPress={() => {
                // You can add logic here to save changes to a backend or show a confirmation
                alert("Profile changes saved!");
              }}
              color="#1976d2"
            />
          </View>
        </ScrollView>
      )}
      {tab === "requests" && (
        <ScrollView>
          <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>Walk Requests</Text>
          {/* Example walk requests */}
          <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, elevation: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Owner: Sarah Lee</Text>
            <Text>Dog: Max (Medium)</Text>
            <Text>Date: 2025-09-10</Text>
            <Text>Time: 14:00</Text>
            <Text>Duration: 1 hour</Text>
            <Text>Notes: Max is friendly but shy with new people.</Text>
          </View>
          <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, elevation: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Owner: Emily Carter</Text>
            <Text>Dog: Daisy (Small)</Text>
            <Text>Date: 2025-09-14</Text>
            <Text>Time: 11:00</Text>
            <Text>Duration: 30 minutes</Text>
            <Text>Notes: Daisy needs a gentle walk and likes treats.</Text>
          </View>
          {/* Multiple dogs example */}
          <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, elevation: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Owner: Marcus Green</Text>
            <Text>Dogs: Rocky (Large), Luna (Medium)</Text>
            <Text>Date: 2025-09-15</Text>
            <Text>Time: 16:30</Text>
            <Text>Duration: 45 minutes</Text>
            <Text>Notes: Rocky is energetic and loves running in open fields. Luna is calm and follows Rocky.</Text>
          </View>
        </ScrollView>
      )}
      {tab === "clients" && (
        <ScrollView>
          <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>Previous Clients</Text>
          {/* Example previous clients */}
          <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, elevation: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Owner: Sarah Lee</Text>
            <Text>Dog: Max (Medium)</Text>
            <Text>Date: 2025-08-28</Text>
            <Text>Time: 15:00</Text>
            <Text>Duration: 1 hour</Text>
            <Text>Notes: Max enjoyed the walk and was well cared for.</Text>
            <Text>Amount Paid: £18</Text>
            <Text>Owner Rating: ★★★★★</Text>
          </View>
          <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, elevation: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Owner: Tom Harris</Text>
            <Text>Dog: Bella (Large)</Text>
            <Text>Date: 2025-08-25</Text>
            <Text>Time: 10:00</Text>
            <Text>Duration: 45 minutes</Text>
            <Text>Notes: Bella was happy and got plenty of exercise.</Text>
            <Text>Amount Paid: £15</Text>
            <Text>Owner Rating: ★★★★☆</Text>
          </View>
          <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, elevation: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Owner: Priya Patel</Text>
            <Text>Dog: Coco (Small)</Text>
            <Text>Date: 2025-08-20</Text>
            <Text>Time: 18:00</Text>
            <Text>Duration: 30 minutes</Text>
            <Text>Notes: Coco was calm and enjoyed the quiet route.</Text>
            <Text>Amount Paid: £10</Text>
            <Text>Owner Rating: ★★★★★</Text>
          </View>
        </ScrollView>
      )}

      {/* Sign out button */}
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}
