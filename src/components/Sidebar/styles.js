import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  containerDraw: {
    display: "flex",
    width: '100%',
  },
  container: {
    display: "flex",
    width: '100%',
    height: 58,
    marginBottom: 4,
    marginTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: 'row',
    borderBottomColor: 'rgba(58,58,71,0.5)',
    borderBottomWidth: 1
  },

  title: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'DroidSans',
    textTransform: 'uppercase',
    textAlign: 'center'
  },

  iconRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    width: 60,
    justifyContent: 'flex-end',
    gap: 10
  }
});

export default styles;