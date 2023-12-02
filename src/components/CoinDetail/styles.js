import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  coinContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: "100%"
  },
  containerBtn: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20
  },
  btnLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100/2 + "%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#FFF',
    padding: 10
  },
  btnRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100/2 + "%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#FFF',
    padding: 10
  },
  containerBody: {
    width: "100%",
    borderRadius: 6,
    backgroundColor: '#000'
  },
  containerTop: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
    padding: 10
  },
  containerHeader: {
    width: '100%',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
  },
  description: {
    width: "100%",
    paddingVertical: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txt: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff'
  },
  viewBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnChart: {
    position: 'absolute',
    bottom: 4,
    right: 46,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnAnalysis: {
    position: 'absolute',
    bottom: 4,
    right: 88,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 35,
    width: 35,
    backgroundColor: "#39A7FF",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: "#C5C5C5",
    borderWidth: 0.5
  },
});

export default styles;