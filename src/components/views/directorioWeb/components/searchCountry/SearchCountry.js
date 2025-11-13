import React from 'react';
import { View, StyleSheet, Pressable, Text, TextInput as RNTextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../../../res/colors';
import { useDispatch, useSelector } from 'react-redux';
import { openFilterModal, setListaMunicipios } from '../../../../../res/localStore/Actions';
import { getListaMunicipios } from '../../../../../services/mako/helpersGetDB';

const capitalize = (s = '') => {
  const a = String(s).toLowerCase();
  return a.charAt(0).toUpperCase() + a.slice(1);
};

// Componente dual:
// - Si recibe onSelect: actúa como input con autocompletado (para usar en modales/formularios)
// - Si no recibe onSelect: muestra botón de cabecera que abre el modal de filtros
export default function SearchCountry({ initialValue = '', onSelect }) {
  const dispatch = useDispatch();
  const ciudadDisplay = useSelector((s) => s.search?.ciudad) || 'Ciudad';
  const listaMunicipios = useSelector((s) => s.catalog?.listaMunicipios || []);
  const fetchedAt = useSelector((s) => s.catalog?.listaMunicipiosFetchedAt || null);

  // Precarga/TTL 24h
  React.useEffect(() => {
    const TTL_24H = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const isStale = !fetchedAt || now - fetchedAt > TTL_24H;
    if (!listaMunicipios?.length || isStale) {
      // eslint-disable-next-line no-console
      console.log('[SearchCountry] precargando lista municipios. stale?', isStale);
      getListaMunicipios()
        .then((data) => {
          if (Array.isArray(data)) dispatch(setListaMunicipios(data));
        })
        .catch((e) => console.log('[SearchCountry] error lista municipios', e));
    }
  }, []);

  // Modo input con autocompletado (para modal)
  if (typeof onSelect === 'function') {
    const [text, setText] = React.useState(initialValue);
    const [mostrarAuto, setMostrarAuto] = React.useState(false);
    const [results, setResults] = React.useState([]);
    const debRef = React.useRef(null);
    const [seleccionada, setSeleccionada] = React.useState(!!initialValue);

    // Sincroniza cuando cambie initialValue (abrir modal con ciudad ya elegida)
    React.useEffect(() => {
      setText(initialValue || '');
      setSeleccionada(!!initialValue);
    }, [initialValue]);

    const doFilter = (val) => {
      if (!val) {
        setResults([]);
        return;
      }
      try {
        const re = new RegExp(val, 'i');
        const aux = (listaMunicipios || []).filter(
          (it) => re.test(it.nombre) || re.test(it.nombreDep)
        );
        setResults(aux.slice(0, 50));
      } catch (e) {
        setResults([]);
      }
    };

    const onChange = (val) => {
      setText(val);
      setMostrarAuto(true);
      if (debRef.current) clearTimeout(debRef.current);
      debRef.current = setTimeout(() => doFilter(val), 400);
    };

    const selectItem = (item) => {
      const label = `${capitalize(item?.nombre)} - ${capitalize(item?.nombreDep)}`;
      setText(label);
      setMostrarAuto(false);
      setSeleccionada(true);
      onSelect(label, item.id);
    };

    const limpiar = () => {
      setSeleccionada(false);
      setText('');
      onSelect('', 0);
    };

    return (
      <View style={styles.wrap}>
        {!seleccionada ? (
          <>
            <RNTextInput
              placeholder="Ciudad"
              value={text}
              onFocus={() => setMostrarAuto(true)}
              onChangeText={onChange}
              style={styles.input}
              placeholderTextColor="#888"
            />
            {mostrarAuto && text !== '' && (
              <View style={styles.dropdown}>
                <ScrollView keyboardShouldPersistTaps="handled" style={styles.scroll}>
                  {results.length === 0 ? (
                    <Text style={styles.empty}>Sin resultados</Text>
                  ) : (
                    results.map((item) => (
                      <Pressable key={item.id} style={styles.item} onPress={() => selectItem(item)}>
                        <Text style={styles.itemCity}>{capitalize(item.nombre)}</Text>
                        <Text style={styles.itemSep}> - </Text>
                        <Text style={styles.itemDep}>{capitalize(item.nombreDep)}</Text>
                      </Pressable>
                    ))
                  )}
                </ScrollView>
              </View>
            )}
          </>
        ) : (
          <View style={styles.selectedBox}>
            <Text style={styles.selectedText}>{text}</Text>
            <Pressable onPress={limpiar} hitSlop={8} style={styles.selectedClose}>
              <Icon name="close" size={20} color={colors.secondary} />
            </Pressable>
          </View>
        )}
      </View>
    );
  }

  // Modo visual de cabecera (abre modal)
  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.searchcountry} onPress={() => dispatch(openFilterModal())}>
        <Text>
          <Text style={styles.leading}>Mostrando resultados en </Text>
          <Text style={styles.cityText}>{ciudadDisplay}</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Header chip
  headerContainer: {
    backgroundColor: colors.primaryLight,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:1
  },
  leading: {
    color: colors.gray5,
    fontFamily: 'CaviarDreams',
  },
  cityText: {
    textDecorationLine: 'underline',
    fontFamily: 'CaviarDreams_Bold',
    color: '#000',
  },
  // Input autocomplete
  wrap: {
    width: '100%',
    position: 'relative',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#111',
  },
  dropdown: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
    maxHeight: 240,
    zIndex: 50,
  },
  scroll: { maxHeight: 240 },
  empty: { padding: 12, color: '#777', fontStyle: 'italic' },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCity: { color: '#222', fontSize: 14 },
  itemSep: { color: '#999', fontSize: 14 },
  itemDep: { color: '#666', fontSize: 14, fontStyle: 'italic' },
  selectedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedText: {
    color: '#111',
    flex: 1,
  },
  selectedClose: {
    marginLeft: 8,
  },
});
