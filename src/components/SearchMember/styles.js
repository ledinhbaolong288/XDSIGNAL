import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  viewBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 35,
    width: 35,
    backgroundColor: "#219C90",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: "#C5C5C5",
    borderWidth: 0.5
  },
  containerSheet: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingRight: 6
  },
  sheetHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: 'rgba(58,58,71,0.3)',
    borderRadius: 10,
  },
  contentContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20
  },
  txtSearch: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: 'DroidSans',
    color: "#fff",
    paddingVertical: 20
  },
  txt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'DroidSans'

  },
  containerScroll: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 6
  },
  contanerCheck: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerInput: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  txtInput: {
    color: '#000',
    fontFamily: 'DroidSans',
    fontSize: 14
  },
  checkbox: {
    marginHorizontal: 8,
    marginVertical: 2,
    width: 30,
    height: 30,
    borderRadius: 100
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    marginTop: 4,
    color: '#000',
    borderWidth: 1,
    borderColor: "#C5C5C5"
  },
  btnDialog: {
    width: 80,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  txtBtn: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase'
  },
});

export default styles;