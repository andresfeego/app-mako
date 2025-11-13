import React from 'react';
import { View, Text, StyleSheet, TextInput as RNTextInput, ScrollView, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../../../res/colors';
import { getCategoriasCompletas } from '../../../../../services/mako/helpersGetDB';
import { setListaCategorias } from '../../../../../res/localStore/Actions';

const capitalize = (s = '') => {
  const a = String(s).toLowerCase();
  return a.charAt(0).toUpperCase() + a.slice(1);
};

export default function BusquedaCategoria({ onSelect, selected }) {
  const dispatch = useDispatch();
  const listaCategorias = useSelector((s) => s.catalog?.listaCategorias || []);
  const fetchedAt = useSelector((s) => s.catalog?.listaCategoriasFetchedAt || null);

  const [text, setText] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [seleccion, setSeleccion] = React.useState(selected || null);
  const debRef = React.useRef(null);

  // Precarga/TTL 24h de la lista base (usamos 'a' como en web)
  React.useEffect(() => {
    const TTL_24H = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const isStale = !fetchedAt || now - fetchedAt > TTL_24H;
    if (!listaCategorias?.length || isStale) {
      getCategoriasCompletas('a')
        .then((data) => Array.isArray(data) && dispatch(setListaCategorias(data)))
        .catch(() => {});
    }
  }, []);

  React.useEffect(() => {
    // primer render: mostrar todas
    setResults(listaCategorias.slice(0, 100));
  }, [listaCategorias]);

  const doFilter = (val) => {
    if (!val) {
      setResults(listaCategorias.slice(0, 100));
      return;
    }
    try {
      const re = new RegExp(val, 'i');
      const aux = (listaCategorias || []).filter(
        (it) => re.test(it.nombre) || re.test(it.nombreSub1) || re.test(it.nombreSub2)
      );
      setResults(aux.slice(0, 200));
    } catch (e) {
      setResults([]);
    }
  };

  const onChange = (val) => {
    setText(val);
    if (debRef.current) clearTimeout(debRef.current);
    debRef.current = setTimeout(() => doFilter(val), 300);
  };

  const asignar = (item) => {
    setSeleccion(item);
    if (typeof onSelect === 'function') onSelect(item);
  };

  const limpiar = () => {
    setSeleccion(null);
    setText('');
    doFilter('');
    if (typeof onSelect === 'function') onSelect(null);
  };

  const renderCard = (item) => {
    const esSeleccionada = !!seleccion && seleccion.id === item.id;
    return (
    <View key={item.id} style={[styles.card, esSeleccionada && styles.cardSelected]}>
      <View style={styles.cardText}>
        <Text style={styles.sublabel}>Categoría principal</Text>
        <Text style={styles.catPrincipal}>{capitalize(item.nombre)}</Text>
        <Text style={styles.sublabel}>Subcategoría 1</Text>
        <Text style={styles.sub1}>{capitalize(item.nombreSub1)}</Text>
        <Text style={styles.sublabel}>Subcategoría 2</Text>
        <Text style={styles.sub2}>{capitalize(item.nombreSub2)}</Text>
      </View>
      {(!esSeleccionada) ? (
        <Pressable style={[styles.btn, styles.btnAsignar]} onPress={() => asignar(item)}>
          <Icon name="check-circle" size={26} color={colors.secondary} />
        </Pressable>
      ) : (
        <Pressable style={[styles.btn, styles.btnCancelar]} onPress={limpiar} hitSlop={8}>
          <Icon name="close" size={20} color={colors.secondary} />
        </Pressable>
      )}
    </View>
  )};

  return (
    <View style={styles.wrap}>
      {!seleccion && (
        <RNTextInput
          placeholder="Busca una categoría"
          value={text}
          onChangeText={onChange}
          style={styles.input}
          placeholderTextColor="#888"
        />
      )}

      <View style={[styles.scrollContainer, seleccion && styles.scrollContainerSelected]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.scroll}
          showsVerticalScrollIndicator={true}
        >
          {seleccion ? (
            renderCard(seleccion)
          ) : results.length === 0 ? (
            <Text style={styles.empty}>Lista vacía</Text>
          ) : (
            results.map(renderCard)
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', marginTop: 10 },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#111',
    marginBottom: 10,
  },
  scrollContainer: {
    maxHeight: 280,
    borderWidth: 2,
    borderColor: colors.gray6,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  scrollContainerSelected: {
    borderWidth: 0,
    padding: 0,
  },
  scroll: { flexGrow: 0 },
  empty: { padding: 12, color: '#777', fontStyle: 'italic' },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardSelected: {
    borderColor: colors.secondary,
  },
  cardText: { flex: 1, paddingRight: 10 },
  sublabel: { color: '#888', fontSize: 12 },
  catPrincipal: { color: '#111', fontSize: 16, fontWeight: '600', marginBottom: 4 },
  sub1: { color: '#222', fontSize: 15, marginBottom: 4 },
  sub2: { color: '#222', fontSize: 15 },
  btn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  btnAsignar: {},
  btnCancelar: {},
});
