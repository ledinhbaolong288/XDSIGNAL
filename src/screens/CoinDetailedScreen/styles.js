import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flexDirection: "column"
  },
  currentPrice: {
    color: "white",
    fontSize: 36,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 6
  },
  name: {
    color: "white",
    fontSize: 15,
  },
  priceContainer: {
    padding: 15,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  priceChange: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
  },
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    padding: 10,
    fontSize: 16,
    color: "white",
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2B2B2B",
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 20
  },
  candleStickText: {
    color: "white",
    fontWeight: "700",
  },
  candleStickDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
  candleStickTextLabel: {
    color: 'grey',
    fontSize: 13
  },
  rankContainer: {
    backgroundColor: '#585858',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 10
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(37,36,50,0.4)',
    borderRadius: 10,
    borderColor: '#3A3A47',
    borderWidth: 1,
    padding: 16
  },

  keyStatus: {
    height: 26,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleStatus: {
    fontSize: 14,
    fontFamily: 'DroidSans',
    color: '#BFBFBF'
  },
  valueStatus: {
    fontSize: 14,
    fontFamily: 'DroidSans',
    color: '#F2F2F2'
  }
});

export default styles;
