import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  containerBanner: {
    display: "flex",
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    display: "flex",
    width: "100%",
    height: 120,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6
  },

  banner: {
    flex: 1,
    width: "100%",
    height: "100%"
  },

  containerLeft: {
    width: '80%',
    height: '100%',
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10
  },

  titleBanner: {
    fontSize: 16,
    fontWeight: "500",
    color: '#FFF',
    textTransform: 'uppercase',
    fontFamily: 'DroidSans'
  }
});

export default styles;