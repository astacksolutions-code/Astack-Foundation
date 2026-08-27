import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Calendar, TrendingUp, Image as ImageIcon, Mail } from 'lucide-react-native';
import { colors } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import GalleryScreen from '../screens/GalleryScreen';
import ContactScreen from '../screens/ContactScreen';

const Tab = createBottomTabNavigator();

const ICONS = { Home, Events: Calendar, Programs: TrendingUp, Gallery: ImageIcon, Contact: Mail };

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: '#9AA5B1',
          tabBarIcon: ({ color, size }) => {
            const Icon = ICONS[route.name];
            return <Icon color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Astack Foundation' }} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Programs" component={ProgramsScreen} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
        <Tab.Screen name="Contact" component={ContactScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
