import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type ShoppingItem = {
  id: string;
  text: string;
  done: boolean;
};

export default function HomeScreen() {
  const [itemText, setItemText] = useState('');
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const addItem = () => {
    if (itemText.trim() === '') return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      text: itemText,
      done: false,
    };

    setItems([...items, newItem]);
    setItemText('');
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formRow}>
        <TextInput
          style={styles.input}
          placeholder="new item"
          value={itemText}
          onChangeText={setItemText}
        />

        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>ADD ITEM</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleBox}>
        <Text style={styles.title}>SHOPPING LIST</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity
              style={styles.itemTextContainer}
              onPress={() => toggleItem(item.id)}
            >
              <Text
                style={[
                  styles.itemText,
                  item.done && styles.itemTextDone,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.checkButton}
                onPress={() => toggleItem(item.id)}
              >
                <Text style={styles.checkButtonText}>
                  {item.done ? '☑' : '☐'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteItem(item.id)}
              >
                <Text style={styles.deleteButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>List is empty</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#3daee9',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  titleBox: {
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemRow: {
    backgroundColor: '#25bdf2',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  checkButtonText: {
    fontSize: 22,
    color: '#1d2cff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
  },
});