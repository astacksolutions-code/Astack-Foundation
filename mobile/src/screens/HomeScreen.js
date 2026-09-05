import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { HeartHandshake } from 'lucide-react-native';
import { colors } from '../theme';
import { useCollection } from '../firebase/useCollection';

export default function HomeScreen({ navigation }) {
  const events = useCollection('events').filter((e) => e.status === 'upcoming').slice(0, 2);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.hero}>
        <HeartHandshake color={colors.white} size={36} />
        <Text style={styles.heroTitle}>Hope becomes action, together.</Text>
        <Text style={styles.heroBody}>
          Astack Foundation delivers education, healthcare, and livelihood programs across Pakistan.
        </Text>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('Programs')}>
          <Text style={styles.ctaText}>Explore Programs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {events.map((ev) => (
          <View key={ev.id} style={styles.card}>
            <Text style={styles.cardTitle}>{ev.title}</Text>
            <Text style={styles.cardMeta}>{ev.date} · {ev.location}</Text>
          </View>
        ))}
        {events.length === 0 && <Text style={styles.cardMeta}>No upcoming events right now.</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  hero: { backgroundColor: colors.primary, padding: 24, paddingTop: 60, paddingBottom: 40 },
  heroTitle: { color: colors.white, fontSize: 28, fontWeight: '700', marginTop: 16, lineHeight: 34 },
  heroBody: { color: '#D2D9E0', fontSize: 14, marginTop: 12, lineHeight: 20 },
  cta: { backgroundColor: colors.secondary, alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999, marginTop: 20 },
  ctaText: { color: colors.white, fontWeight: '600' },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.primary, marginBottom: 12 },
  card: { backgroundColor: colors.accent, borderRadius: 14, padding: 16, marginBottom: 10 },
  cardTitle: { fontWeight: '600', color: colors.primary, fontSize: 15 },
  cardMeta: { color: '#4C6683', fontSize: 12, marginTop: 4 },
});
