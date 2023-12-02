import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: '100%',
    height: 100,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },

  containerService: {
    width: 50,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  },

  circle: {
    display: "flex",
    width: 50,
    height: 50,
    backgroundColor: 'rgba(37,36,50,0.4)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3A3A47',
    borderWidth: 1,
  },

  txt: {
    fontSize: 10,
    fontWeight: "400",
    color: '#F2F2F2',
    fontFamily: 'DroidSans'
  }
});

export default styles;