/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const primaryColor = '#553377';

function App(): React.JSX.Element {
  const [quote, setQuote] = React.useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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

          <Text style={styles.quote}>
            "The greatest glory in living lies not in never falling, but in
            rising every time we fall."
          </Text>

          <Text style={styles.author}>- Nelson Mandela</Text>
          <View style={styles.divider} />

          <View style={styles.footer}>
            <View style={styles.actions}>
              <Pressable style={styles.actionBtn}>
                <Entypo name="sound" size={16} color={primaryColor} />
              </Pressable>
              <Pressable style={styles.actionBtn}>
                <Iconicons name="copy" size={16} color={primaryColor} />
              </Pressable>
              <Pressable style={styles.actionBtn}>
                <Icon name="facebook" size={20} color={primaryColor} />
              </Pressable>
            </View>
            <View style={styles.btn}>
              <Pressable>
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
  quote: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
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
});

export default App;
