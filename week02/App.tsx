import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

type Item = {
  id: string;
  text: string;
  done: boolean;
};

export default function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const addItem = () => {
    if (!text.trim()) return;

    setItems([
      ...items,
      { id: Date.now().toString(), text, done: false },
    ]);

    setText('');
  };

  const toggleItem = (id: string) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, done: !i.done } : i
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="new item"
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity style={styles.btn} onPress={addItem}>
          <Text style={styles.btnText}>ADD ITEM</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>SHOPPING LIST</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => toggleItem(item.id)}>
              <Text style={item.done && styles.done}>
                {item.text}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={styles.delete}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>List is empty</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  btn: {
    backgroundColor: '#3daee9',
    padding: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#25bdf2',
    padding: 10,
    marginBottom: 10,
  },
  done: {
    textDecorationLine: 'line-through',
  },
  delete: {
    color: 'red',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
  },
});