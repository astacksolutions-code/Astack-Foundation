import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { colors } from '../theme';
import { useCollection } from '../firebase/useCollection';
import { addDoc, collection } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';

export default function EventsScreen() {
  const events = useCollection('events');

  const register = async (event) => {
    if (isFirebaseConfigured) {
      await addDoc(collection(db, 'registrations'), { eventId: event.id, eventTitle: event.title, registeredAt: new Date().toISOString() });
    }
    Alert.alert('Registered!', `You're confirmed for ${event.title}. A confirmation email will follow.`);
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={events}
        keyExtractor={(e) => e.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>{item.date} · {item.time}</Text>
            <Text style={styles.meta}>{item.location}</Text>
            {item.status === 'upcoming' && (
              <TouchableOpacity style={styles.btn} onPress={() => register(item)}>
                <Text style={styles.btnText}>Register</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  card: { backgroundColor: colors.accent, borderRadius: 16, padding: 16, marginBottom: 14 },
  title: { color: colors.primary, fontSize: 16, fontWeight: '700' },
  meta: { color: '#4C6683', fontSize: 12, marginTop: 4 },
  btn: { backgroundColor: colors.secondary, alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, marginTop: 10 },
  btnText: { color: colors.white, fontWeight: '600', fontSize: 13 },
});
