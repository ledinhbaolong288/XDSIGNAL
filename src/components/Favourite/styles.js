import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  containerItem: {
    width: 123,
    height: 121,
    backgroundColor: 'rgba(37,36,50,0.4)',
    borderRadius: 6,
    borderColor: '#3A3A47',
    borderWidth: 1,
    padding: 8,
    justifyContent: 'space-between',
    marginRight: 8
  },
  boxName: {
    width: 46,
    height: 22,
    borderRadius: 6,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'DroidSans'
},
});

export default styles;