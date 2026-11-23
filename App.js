// Entry point of the app.
// There is no navigation library in this phase: the current screen code is kept
// in useState, and go() / back() simply change it.
import { useState, useEffect } from 'react';
import { View, Pressable, Text, StyleSheet, BackHandler, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import useDaycareState from './src/state/useDaycareState';
import { ThemeProvider, useTheme } from './src/state/ThemeContext';
import { findScreen } from './src/screens';
import DemoMenu from './src/screens/DemoMenu';

// The theme (light/dark colours) is available to every screen
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { colors, isDark } = useTheme();

  // All shared data + actions (one "local database" for every screen)
  const { data, session, actions } = useDaycareState();

  // Current screen ('MENU' or a code like 'P-01') and optional params (e.g. { childId })
  const [route, setRoute] = useState({ code: 'MENU', params: {} });
  // Previous screens, used by back()
  const [history, setHistory] = useState([]);
  // Icon fonts are loaded once at start, so icons never appear empty
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    Promise.all([Feather.loadFont(), FontAwesome.loadFont(), MaterialCommunityIcons.loadFont()]).finally(() =>
      setFontsReady(true)
    );
  }, []);

  // Opens another screen
  function go(code, params = {}) {
    setHistory((h) => [...h, route]);
    setRoute({ code, params });
  }

  // Opens another screen without keeping the current one in the history
  function replace(code, params = {}) {
    setRoute({ code, params });
  }

  // Returns to the previous screen (or to the menu)
  function back() {
    if (history.length === 0) {
      setRoute({ code: 'MENU', params: {} });
      return;
    }
    setRoute(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
  }

  // Returns to the last time screen `code` was open, dropping the screens after it
  // (e.g. after removing a user: A-05 -> back to A-02). If it is not in the history, opens it.
  function backTo(code) {
    const index = history.map((r) => r.code).lastIndexOf(code);
    if (index === -1) {
      replace(code);
      return;
    }
    setRoute(history[index]);
    setHistory((h) => h.slice(0, index));
  }

  // Goes straight back to the demo menu
  function openMenu() {
    setHistory([]);
    setRoute({ code: 'MENU', params: {} });
  }

  // Android back button uses back() too
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (route.code === 'MENU') return false; // let Android close the app
      back();
      return true;
    });
    return () => sub.remove();
  });

  if (!fontsReady) return null; // only a fraction of a second at start

  // Dark status bar text on light pages, light text on dark pages
  const pageBarStyle = isDark ? 'light' : 'dark';

  if (route.code === 'MENU') {
    return (
      <>
        <DemoMenu go={go} onReset={actions.resetData} />
        <StatusBar style={pageBarStyle} />
      </>
    );
  }

  const screen = findScreen(route.code);

  // A button can point to a screen that is not built yet: show a simple placeholder
  if (!screen || !screen.component) {
    return (
      <View style={[styles.soon, { backgroundColor: colors.background }]}>
        <Text style={[styles.soonTitle, { color: colors.text }]}>{route.code}</Text>
        <Text style={[styles.soonText, { color: colors.textMuted }]}>This screen is coming soon.</Text>
        <Pressable style={[styles.soonButton, { backgroundColor: colors.role.parent }]} onPress={back}>
          <Text style={[styles.soonButtonText, { color: colors.onColor }]}>Go back</Text>
        </Pressable>
        <StatusBar style={pageBarStyle} />
      </View>
    );
  }

  const ScreenComponent = screen.component;

  return (
    <View style={styles.app}>
      <ScreenComponent
        data={data}
        session={session}
        actions={actions}
        params={route.params}
        go={go}
        replace={replace}
        back={back}
        backTo={backTo}
      />
      {/* Small floating button to return to the demo menu */}
      <Pressable style={[styles.menuButton, { backgroundColor: colors.overlay }]} onPress={openMenu}>
        <Feather name="grid" size={12} color={colors.onColor} />
        <Text style={[styles.menuText, { color: colors.onColor }]}>{route.code}</Text>
      </Pressable>
      {/* Screens start with a coloured header, so the status bar text is light */}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1 },
  menuButton: {
    position: 'absolute',
    top: (RNStatusBar.currentHeight || 24) + 6,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  menuText: { fontSize: 11, fontWeight: '700' },
  soon: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  soonTitle: { fontSize: 24, fontWeight: '700' },
  soonText: { fontSize: 15 },
  soonButton: { marginTop: 12, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10 },
  soonButtonText: { fontWeight: '700' },
});
