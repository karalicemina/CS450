import { Image, Text, View } from "react-native";

export default function App() {

    const initialFriends = [
  {
    id: 1,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=1",
    balance: -7,
  },
  {
    id: 2,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=2",
    balance: 20,
  },
  {
    id: 3,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=3",
    balance: 0,
  },
];

  return (
  <View style={{ padding: 20 }}>
    {initialFriends.map((friend) => (
      <View
        key={friend.id}
        style={{ flexDirection: "row", marginBottom: 15 }}
      >
        <Image
          source={{ uri: friend.image }}
          style={{ width: 40, height: 40, marginRight: 10 }}
        />

        <View>
          <Text>{friend.name}</Text>

          <Text>
            {friend.balance > 0
              ? `${friend.name} owes you ${friend.balance}`
              : friend.balance < 0
              ? `You owe ${friend.name} ${Math.abs(friend.balance)}`
              : `You and ${friend.name} are even`}
          </Text>
        </View>
      </View>
    ))}
  </View>
);
}