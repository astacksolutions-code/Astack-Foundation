import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme';
import { useCollection } from '../firebase/useCollection';

const COLS = 2;
const SIZE = (Dimensions.get('window').width - 20 * 2 - 10) / COLS;

export default function GalleryScreen() {
  const gallery = useCollection('gallery');

  return (
    <View style={styles.screen}>
      <FlatList
        data={gallery}
        keyExtractor={(g) => g.id}
        numColumns={COLS}
        contentContainerStyle={{ padding: 20 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageUrl }} style={[styles.image, { width: SIZE, height: SIZE }]} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  image: { borderRadius: 14, marginBottom: 10, backgroundColor: colors.accent },
});
