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
    justifyContent: 'center',
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
    marginBottom: 20
  }
});

export default styles;