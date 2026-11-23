// Colours (light and dark), sizes and shared values, taken from the Figma design.
// Components never write colours directly: they read them with useTheme() (src/state/ThemeContext.js).

// Main colour of each role (headers, buttons, tab bar). Same in light and dark.
const roleColors = {
  parent: '#1F7A72', // teal
  educator: '#4A3F9E', // purple
  admin: '#174A45', // dark green
};

const light = {
  background: '#F0F4F1',
  card: '#FFFFFF',
  border: '#E1E7E3',
  text: '#17302B',
  textMuted: '#5B6B66',
  pressed: '#F6F8F7', // row background while pressed
  onColor: '#FFFFFF', // text and icons on coloured backgrounds
  decoration: 'rgba(255,255,255,0.14)', // circles and stars in headers
  headerButton: 'rgba(255,255,255,0.20)', // round buttons and chips on headers
  overlay: 'rgba(0,0,0,0.35)',
  danger: '#B03222',
  qrDark: '#18302C',
  scanLine: '#F0B841',
  role: roleColors,
  // "Tones": background + text colour for pills, icon tiles and note boxes
  tones: {
    success: { bg: '#D6EEDD', fg: '#1E5E35' },
    warning: { bg: '#FCE3B0', fg: '#6B4A0A' },
    danger: { bg: '#F8D7D2', fg: '#9B2C1E' },
    neutral: { bg: '#E3E8E5', fg: '#3F4B47' },
    info: { bg: '#E3E2F7', fg: '#3D3A9A' },
    blue: { bg: '#D9EBF6', fg: '#1D5A80' },
    teal: { bg: '#DCEDE9', fg: '#1F7A72' },
    amber: { bg: '#FDEACC', fg: '#8A5A12' },
    pink: { bg: '#F8DCE6', fg: '#A3305F' },
    khaki: { bg: '#F1EAC5', fg: '#6B5A12' },
  },
};

const dark = {
  background: '#0F1715',
  card: '#1A2522',
  border: '#2A3733',
  text: '#E6EFEC',
  textMuted: '#9AAEA8',
  pressed: '#22302C',
  onColor: '#FFFFFF',
  decoration: 'rgba(255,255,255,0.10)',
  headerButton: 'rgba(255,255,255,0.16)',
  overlay: 'rgba(0,0,0,0.55)',
  danger: '#D2513F',
  qrDark: '#0B1412',
  scanLine: '#F0B841',
  role: roleColors,
  tones: {
    success: { bg: '#1E3B2A', fg: '#8FD6A6' },
    warning: { bg: '#45391A', fg: '#F2C76B' },
    danger: { bg: '#4A2420', fg: '#F2A196' },
    neutral: { bg: '#2A3532', fg: '#C5D1CD' },
    info: { bg: '#2B2A4A', fg: '#B7B3F2' },
    blue: { bg: '#1D3445', fg: '#8EC5EA' },
    teal: { bg: '#1B3A36', fg: '#7FCFC4' },
    amber: { bg: '#45351A', fg: '#F0C27A' },
    pink: { bg: '#47243A', fg: '#F0A6C8' },
    khaki: { bg: '#3D3A1F', fg: '#E0D38A' },
  },
};

export const palettes = { light, dark };

// Colours of the initials circles (avatars); readable in both modes
export const avatarColors = {
  teal: '#1F7A72',
  purple: '#4A3F9E',
  orange: '#B8651B',
  pink: '#B03A6E',
  olive: '#5E7A1F',
};

// Icon tiles: each kind has a Feather icon name and a tone (colours come from the tone)
export const tileKinds = {
  meal: { icon: 'coffee', tone: 'amber' },
  sleep: { icon: 'moon', tone: 'info' },
  hygiene: { icon: 'droplet', tone: 'blue' },
  mood: { icon: 'smile', tone: 'pink' },
  incident: { icon: 'alert-triangle', tone: 'danger' },
  assessment: { icon: 'star', tone: 'amber' },
  finance: { icon: 'credit-card', tone: 'khaki' },
  people: { icon: 'users', tone: 'info' },
  person: { icon: 'user', tone: 'teal' },
  room: { icon: 'home', tone: 'teal' },
  calendar: { icon: 'calendar', tone: 'info' },
  notice: { icon: 'bell', tone: 'amber' },
  message: { icon: 'message-square', tone: 'blue' },
  photo: { icon: 'image', tone: 'teal' },
  diary: { icon: 'book-open', tone: 'teal' },
  mail: { icon: 'mail', tone: 'blue' },
  lock: { icon: 'lock', tone: 'neutral' },
  done: { icon: 'check', tone: 'success' },
  location: { icon: 'map-pin', tone: 'danger' },
  settings: { icon: 'sun', tone: 'neutral' },
  send: { icon: 'navigation', tone: 'teal' },
  search: { icon: 'search', tone: 'teal' },
  phone: { icon: 'phone', tone: 'blue' },
  chart: { icon: 'bar-chart-2', tone: 'teal' },
};

// Colour of each development area (score rings in P-09)
export const areaColors = {
  Motor: '#1F7A72',
  Language: '#B8651B',
  Cognitive: '#4A3F9E',
  Social: '#B03A6E',
  Autonomy: '#2E6DB4',
  Art: '#5E7A1F',
};

// Colours of the drawn map in P-18 (same in both modes)
export const mapColors = { land: '#E4EBDD', road: '#FFFFFF', water: '#BFE0EA', block: '#D3DED3' };

// Colours of the drawn photo placeholders (sky, sun, back hill, front hill), same in both modes
export const photoColors = {
  green: { sky: '#C2E2EC', sun: '#F5C55A', back: '#8CC59A', front: '#5FA977' },
  orange: { sky: '#F7DDBA', sun: '#FDF0C0', back: '#D9A25E', front: '#BA7A3E' },
  purple: { sky: '#D0D8F5', sun: '#FBE6A6', back: '#949BDD', front: '#6B71C4' },
  pink: { sky: '#F5D5DF', sun: '#FBF0C2', back: '#D98BA3', front: '#B8637F' },
  person: '#F7F4F2',
};

export const radius = { sm: 12, md: 16, lg: 24, pill: 999 };
// page = space between the screen edge and the cards
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, page: 18 };
