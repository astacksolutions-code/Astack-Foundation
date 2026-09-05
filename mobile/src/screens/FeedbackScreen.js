import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { Star } from 'lucide-react-native';
import { colors } from '../theme';
import { addDoc, collection } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';

export default function FeedbackScreen() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submit = async () => {
    if (rating === 0) return Alert.alert('Add a rating', 'Please select a star rating first.');
    if (isFirebaseConfigured) {
      await addDoc(collection(db, 'feedback'), { rating, comment, name: 'Anonymous', createdAt: new Date().toISOString() });
    }
    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    setRating(0); setComment('');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.label}>Your rating</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity key={n} onPress={() => setRating(n)}>
            <Star size={30} color={colors.secondary} fill={rating >= n ? colors.secondary : 'transparent'} style={{ marginRight: 6 }} />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Comments</Text>
      <TextInput style={[styles.input, { height: 100 }]} value={comment} onChangeText={setComment} placeholder="Tell us about your experience" multiline />
      <TouchableOpacity style={styles.btn} onPress={submit}>
        <Text style={styles.btnText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  label: { color: colors.primary, fontSize: 13, fontWeight: '600', marginTop: 14, marginBottom: 6 },
  stars: { flexDirection: 'row', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#D2D9E0', borderRadius: 10, padding: 12, fontSize: 14 },
  btn: { backgroundColor: colors.secondary, borderRadius: 999, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  btnText: { color: colors.white, fontWeight: '700' },
});
