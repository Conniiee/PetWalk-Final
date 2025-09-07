import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Walker } from "../api/mockApi";

export default function WalkerCard({
  walker,
  onPress
}: {
  walker: Walker;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: walker.photoUrl || "https://placekitten.com/200/200" }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#eee",
            marginRight: 12
          }}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700" }}>{walker.name}</Text>
            {walker.isVerified && (
              <View
                style={{
                  backgroundColor: "#e6f9f0",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 999
                }}
              >
                <Text style={{ color: "#0f9d58", fontWeight: "600" }}>
                  Verified
                </Text>
              </View>
            )}
          </View>
          <Text style={{ marginTop: 4 }}>
            {"★".repeat(Math.round(walker.rating))}{" "}
            <Text style={{ color: "#666" }}>{walker.rating.toFixed(1)}</Text>
          </Text>
          <Text style={{ marginTop: 6, color: "#444" }}>£{walker.ratePerHour}/hr</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
