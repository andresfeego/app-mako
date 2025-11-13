import { StyleSheet } from 'react-native';
import colors from '../../../../../../res/colors';

const sectionStyles = StyleSheet.create({
  sectionRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    color: colors.gray1,
    fontSize: 14,
    marginRight: 8,
    fontFamily: 'CaviarDreams_Bold',
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray7,
    marginLeft: 8,
  },
  filterInput: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#111',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
  },
  keywordCheck: {
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  selectedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  selectedText: {
    color: '#111',
    flex: 1,
  },
  selectedClose: {
    marginLeft: 8,
  },
});

export default sectionStyles;

