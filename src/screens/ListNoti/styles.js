import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  containerSheet: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingRight: 6
  },
  sheetHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: 'rgba(58,58,71,0.3)',
    borderRadius: 10,
  },
  title: {
    fontSize: 36,
    fontFamily: 'DroidSans',
    color: '#fff',
    fontWeight: '700',
    marginBottom: 16
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 4,
    color: '#fff'
  },
  txtInput: {
    color: '#fff',
    fontFamily: 'DroidSans',
    fontSize: 14
  },
  button: {
    width: '100%',
    backgroundColor: '#18D68F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 2,
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'DroidSans',
    color: '#fff'
  },
  or: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 20
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  }
});

export default styles;