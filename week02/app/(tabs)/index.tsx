import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import skills from '../../skills.json';



export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Emina Karalić</Text>

        <Text style={styles.bio}>
          Computer Science student interested in software development,
          business analytics, and building useful digital products.
        </Text>

        <View style={styles.separator} />

        <View style={styles.skillsContainer}>
          {skills.map((item, index) => (
            <View
              key={index}
              style={[styles.skillBadge, { backgroundColor: item.color }]}
            >
              <Text style={styles.skillText}>
                {item.skill} {getEmoji(item.level)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function getEmoji(level: string) {
  if (level === 'advanced') return '💪';
  if (level === 'intermediate') return '👍';
  return '👶';
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    elevation: 4,
  },
  avatar: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
  },
  bio: {
    fontSize: 15,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
  },
  skillText: {
    fontSize: 13,
    fontWeight: '600',
  },
});