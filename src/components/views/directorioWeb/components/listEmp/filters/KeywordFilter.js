import React from 'react';
import { View, Text, TextInput as RNTextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../../../../../res/localStore/Actions';
import colors from '../../../../../../res/colors';
import styles from './FilterSectionStyles';

export default function KeywordFilter() {
  const dispatch = useDispatch();
  const search = useSelector((s) => s.search);
  const [local, setLocal] = React.useState(search?.busqueda || '');

  React.useEffect(() => {
    setLocal(search?.busqueda || '');
  }, [search?.busqueda]);

  return (
    <View>
      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>Filtrar por palabra clave</Text>
        <View style={styles.sectionDivider} />
      </View>

      {search?.busqueda ? (
        <View style={styles.selectedBox}>
          <Text style={styles.selectedText}>{search.busqueda}</Text>
          <Pressable
            onPress={() => {
              setLocal('');
              dispatch(setSearch({ busqueda: '' }));
            }}
            hitSlop={8}
            style={styles.selectedClose}
          >
            <Icon name="close" size={20} color={colors.secondary} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.inputRow}>
          <RNTextInput
            placeholder="Palabra clave"
            value={local}
            onChangeText={setLocal}
            style={[styles.filterInput, { marginBottom: 0, flex: 1 }]}
            placeholderTextColor="#888"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Pressable
            style={styles.keywordCheck}
            onPress={() => local && dispatch(setSearch({ busqueda: local }))}
            disabled={!local}
          >
            <Icon name="check" size={18} color={local ? colors.secondary : colors.gray5} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

