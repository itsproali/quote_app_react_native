/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Iconicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Clipboard from '@react-native-clipboard/clipboard';
import Tts from 'react-native-tts';

const primaryColor = '#553377';

function App(): React.JSX.Element {
  // State
  const [isLoading, setIsLoading] = React.useState(true);
  const [quote, setQuote] = React.useState({
    content: '',
    author: '',
  });
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Fetch Quote
  const fetchQuote = () => {
    setIsLoading(true);
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => {
        setQuote(data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  // Initial Fetch
  React.useEffect(() => {
    fetchQuote();
  }, []);

  // Handle Copy
  const handleCopy = () => {
    Clipboard.setString(`${quote.content} -- ${quote.author}`);
    Alert.alert('Copied to Clipboard');
  };

  // Handle Speak
  const handleSpeak = () => {
    const textToSpeak = `${quote.content} By ${quote.author}`;
    Tts.speak(textToSpeak);
  };

  // Handle Share
  const handleShare = async () => {
    try {
      const content = `${quote.content} By ${quote.author}`;
      const result = await Share.share({
        message: content,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.root]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Quote Of The Day</Text>

          {/* Main Content */}
          {isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={primaryColor} />
            </View>
          ) : (
            <View>
              <View style={styles.quoteContainer}>
                <MaterialIcons
                  name="format-quote"
                  size={32}
                  color="#000"
                  style={[styles.quoteIcon, styles.quoteIconOpen]}
                />
                <Text style={styles.quote}>{quote.content}</Text>
                <MaterialIcons
                  name="format-quote"
                  size={32}
                  color="#000"
                  style={[styles.quoteIcon, styles.quoteIconClose]}
                />
              </View>
              <Text style={styles.author}>- {quote.author}</Text>
            </View>
          )}

          {/* Footer */}
          <View style={styles.divider} />
          <View style={styles.footer}>
            <View style={styles.actions}>
              <Pressable style={styles.actionBtn} onPress={handleSpeak}>
                <Entypo name="sound" size={16} color={primaryColor} />
              </Pressable>
              <Pressable style={styles.actionBtn} onPress={handleCopy}>
                <Iconicons name="copy" size={16} color={primaryColor} />
              </Pressable>
              <Pressable style={styles.actionBtn} onPress={handleShare}>
                <Entypo name="share" size={20} color={primaryColor} />
              </Pressable>
            </View>
            <View style={styles.btn}>
              <Pressable onPress={() => fetchQuote()}>
                <Text style={styles.btnText}>Next Quote</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    backgroundColor: primaryColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  quoteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  quoteIcon: {
    position: 'absolute',
  },
  quoteIconOpen: {
    left: -5,
    top: -10,
    transform: [{rotateY: '180deg'}],
  },
  quoteIconClose: {
    right: -5,
    bottom: -15,
  },
  quote: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#000000',
  },
  author: {
    fontSize: 16,
    textAlign: 'right',
    marginTop: 20,
    color: '#000000',
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#666666',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actions: {
    flexDirection: 'row',
  },

  actionBtn: {
    backgroundColor: 'transparent',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: primaryColor,
  },

  btn: {
    backgroundColor: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  btnText: {color: '#ffffff', fontWeight: 'bold'},
  loading: {
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
