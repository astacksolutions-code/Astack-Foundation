import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { colors } from '../theme';
import { addDoc, collection } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (!name || !email || !message) return Alert.alert('Missing info', 'Please fill in all fields.');
    if (isFirebaseConfigured) {
      await addDoc(collection(db, 'contacts'), { name, email, message, status: 'unread', createdAt: new Date().toISOString() });
    }
    Alert.alert('Sent!', 'We typically reply within 1–2 business days.');
    setName(''); setEmail(''); setMessage('');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.label}>Full name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
      <Text style={styles.label}>Message</Text>
      <TextInput style={[styles.input, { height: 100 }]} value={message} onChangeText={setMessage} placeholder="How can we help?" multiline />
      <TouchableOpacity style={styles.btn} onPress={submit}>
        <Text style={styles.btnText}>Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  label: { color: colors.primary, fontSize: 13, fontWeight: '600', marginTop: 14, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#D2D9E0', borderRadius: 10, padding: 12, fontSize: 14 },
  btn: { backgroundColor: colors.secondary, borderRadius: 999, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  btnText: { color: colors.white, fontWeight: '700' },
});
