import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  coinContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    width: "100%",
    paddingHorizontal: 6,
    paddingVertical: 6
  },
  containerNoti: {
    width: "90%",
    height: "auto",
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
  },
  containerNotiDelete: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },
  txtTime: {
    color: '#C5C5C5',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 10,

  },
  txtDescription: {
    color: '#FFF',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 14
  },
  viewBtn: {
    position: 'absolute',
    bottom: 4,
    right: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 35,
    width: 35,
    backgroundColor: "#D83F31",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: "#C5C5C5",
    borderWidth: 0.5
  },
});

export default styles;