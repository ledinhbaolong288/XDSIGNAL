import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
    fontFamily: 'DroidSans'
  },
  text: {
    color: "white",
    marginRight: 5,
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: "100%",
    height: 'auto'
  },
  rank: {
    fontWeight: 'bold',
    color: 'white',
  },
  rankContainer: {
    backgroundColor: '#585858',
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  containerSvg: {
    display: 'flex',
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
  containerTable: {
    display: 'flex',
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  selectInfo: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF'
  },
  btnChart: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(58,58,71,1)',
    borderRadius: 6
  },
  txt: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '700'
  },
  btnClose: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  action: {
    width: 23,
    height: 30
  }
});

export default styles;