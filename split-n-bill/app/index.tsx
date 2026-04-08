import { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

const initialFriends = [
  { id: 1, name: "Clark", image: "https://i.pravatar.cc/48?u=1", balance: -7 },
  { id: 2, name: "Sarah", image: "https://i.pravatar.cc/48?u=2", balance: 20 },
  { id: 3, name: "Anthony", image: "https://i.pravatar.cc/48?u=3", balance: 0 },
];

export default function Index() {
  const [friends, setFriends] = useState(initialFriends);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<any>(null);

  const [bill, setBill] = useState("");
  const [yourPart, setYourPart] = useState("");
  const [payer, setPayer] = useState("you");

  useEffect(() => {
    const savedFriends = localStorage.getItem("friends");
    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  function handleAddFriend() {
    if (!name.trim()) return;

    const id = Date.now();

    const newFriend = {
      id,
      name: name.trim(),
      image: `https://i.pravatar.cc/48?u=${id}`,
      balance: 0,
    };

    setFriends([...friends, newFriend]);
    setName("");
  }

  function handleSplit() {
    const totalBill = Number(bill);
    const yourShare = Number(yourPart);

    if (!selected || !totalBill || yourShare < 0 || yourShare > totalBill) return;

    const friendPart = totalBill - yourShare;

    setFriends(
      friends.map((f) =>
        f.id === selected.id
          ? {
              ...f,
              balance:
                payer === "you"
                  ? f.balance + friendPart
                  : f.balance - yourShare,
            }
          : f
      )
    );

    setSelected(null);
    setBill("");
    setYourPart("");
    setPayer("you");
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Eat-n-Split App 🍽️
      </Text>

      {friends.map((friend) => (
        <View
          key={friend.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: friend.image }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                marginRight: 10,
              }}
            />

            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {friend.name}
              </Text>

              <Text>
                {friend.balance > 0
                  ? `${friend.name} owes you $${friend.balance}`
                  : friend.balance < 0
                  ? `You owe ${friend.name} $${Math.abs(friend.balance)}`
                  : `You and ${friend.name} are even`}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() =>
              setSelected(selected?.id === friend.id ? null : friend)
            }
            style={{
              backgroundColor: "#3b82f6",
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              {selected?.id === friend.id ? "Close" : "Select"}
            </Text>
          </Pressable>
        </View>
      ))}

      <View style={{ marginTop: 20 }}>
        <Text style={{ marginBottom: 8, fontSize: 16 }}>Add new friend</Text>

        <TextInput
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderColor: "#999",
            padding: 12,
            marginBottom: 10,
          }}
        />

        <Pressable
          onPress={handleAddFriend}
          style={{
            backgroundColor: "green",
            padding: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Add Friend</Text>
        </Pressable>
      </View>

      {selected && (
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
            Split bill with {selected.name}
          </Text>

          <TextInput
            placeholder="Total bill"
            value={bill}
            onChangeText={setBill}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: "#999",
              padding: 12,
              marginBottom: 10,
            }}
          />

          <TextInput
            placeholder="Your part"
            value={yourPart}
            onChangeText={setYourPart}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: "#999",
              padding: 12,
              marginBottom: 10,
            }}
          />

          <Text style={{ marginBottom: 8, fontSize: 16 }}>Who is paying?</Text>

          <Pressable onPress={() => setPayer("you")} style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16 }}>
              {payer === "you" ? "👉 You" : "You"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setPayer("friend")}
            style={{ marginBottom: 12 }}
          >
            <Text style={{ fontSize: 16 }}>
              {payer === "friend" ? "👉 Friend" : "Friend"}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleSplit}
            style={{
              backgroundColor: "black",
              padding: 12,
              alignItems: "center",
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Split</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}