import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    txt: {
        fontSize: 18,
        fontWeight: '400',
        color: '#fff',
        fontFamily: 'DroidSans'
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'DroidSans',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    accordHeader: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    },
    accordTitle: {
        fontSize: 20,
    },
    accordBody: {
        padding: 12
    },
    containerFilter: {
        width: "100%",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
      },
});

export default styles;