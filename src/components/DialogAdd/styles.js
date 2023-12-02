import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  containerScroll: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 6
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
  btn: {
    height: 35,
    width: 35,
    backgroundColor: "#16c784",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: "#C5C5C5",
    borderWidth: 0.5
  },
  txtBtn: {
    textAlign: 'center',
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
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
  txtInput: {
    color: '#000',
    fontFamily: 'DroidSans',
    fontSize: 14
  },
  containerInput: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  checkbox: {
    marginHorizontal: 8,
    marginVertical: 2,
    width: 35,
    height: 35,
    borderRadius: 100
  },
  dropdown1BtnStyle: {
    flex: 1,
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C5C5C5',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left', fontSize: 16 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
  contanerCheck: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    width: 10,
    height: 1
  },
  contanerSelect: {
    width: "48.5%",
    height: 55,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  datePickerStyle: {
    width: 200,
    height: 40,
    marginTop: 20,
  },
  btnDialog: {
    width: 60,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  txtBtn: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff'
  }
});

export default styles;