import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { useCollection } from '../firebase/useCollection';

export default function ProgramsScreen() {
  const programs = useCollection('programs');

  return (
    <View style={styles.screen}>
      <FlatList
        data={programs}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.category}>{item.category?.toUpperCase()}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${item.progress}%` }]} />
            </View>
            <Text style={styles.meta}>{item.achieved?.toLocaleString()} / {item.target?.toLocaleString()} {item.unit}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  card: { backgroundColor: colors.accent, borderRadius: 16, padding: 16, marginBottom: 14 },
  category: { color: colors.secondary, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  title: { color: colors.primary, fontSize: 16, fontWeight: '700', marginTop: 4 },
  barTrack: { height: 8, backgroundColor: '#D2D9E0', borderRadius: 999, marginTop: 12, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.secondary, borderRadius: 999 },
  meta: { color: '#4C6683', fontSize: 12, marginTop: 8 },
});
