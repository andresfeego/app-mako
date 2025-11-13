import React from "react";
import { Image, View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const categorias = [
    { id: '1', imagen: require('../../../../assets/acarreos.png'), nombre: "Nombre empresa" },
    { id: '2', imagen: require('../../../../assets/acarreos.png'), nombre: "Nombre empresa" },
    { id: '3', imagen: require('../../../../assets/acarreos.png'), nombre: "Nombre empresa" },
    { id: '4', imagen: require('../../../../assets/acarreos.png'), nombre: "Nombre empresa" }
];

const PerfilUno = () => {
    return (
        <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
            <View style={styles.header}>
                <TextInput 
                    style={styles.searchBar}
                    placeholder="Buscar"
                    placeholderTextColor="#909090"
                />
                <FontAwesome name="search" size={20} color="#000" style={styles.searchIcon} />
            </View>

            <FlatList
                data={categorias}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.categoryItem}>
                        <Image source={item.imagen} style={styles.categoryImage} />
                        <Text style={styles.categoryText}>{item.nombre}</Text>
                    </View>
                )}
            />

            <View style={styles.bannerContainer}>
                <Image source={require('../../../../assets/asaderos.png')} style={styles.bannerImage} />
                <View style={styles.bannerTextContainer}>
                    <Text style={styles.bannerTitle}>ENROLLADOS ZONA GOURMET</Text>
                    <Text style={styles.bannerSubtitle}>Restaurante y Comidas Rápidas</Text>
                </View>
                <Image source={require('../../../../assets/logomako.png')} style={styles.bannerLogo} />
            </View>

            <View style={styles.ratingContainer}>
                <View style={styles.ratingItem}>
                    <FontAwesome name="share-alt" size={24} color="#32a4fc" />
                    <Text style={styles.ratingLabel}>Compartir</Text>
                </View>
                <View style={styles.ratingItem}>
                    <Text style={styles.ratingNumber}>4.5</Text>
                    <FontAwesome name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingLabel}>Producto</Text>
                </View>
                <View style={styles.ratingItem}>
                    <Text style={styles.ratingNumber}>4.5</Text>
                    <FontAwesome name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingLabel}>Servicio</Text>
                </View>
                <View style={styles.ratingItem}>
                    <Text style={styles.ratingNumber}>4.5</Text>
                    <FontAwesome name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingLabel}>Tiempo</Text>
                </View>
            </View>

            {/* Menú de navegación */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.activeButton}>
                    <Text style={styles.buttonTextActive}>Productos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Contacto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default PerfilUno;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: "#FFD700",
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },
    menuIcon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    searchIcon: {
        marginLeft: 10,
    },
    categoryItem: {
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 10,
        justifyContent: "center",

    },
    categoryImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#FFD700",
    },
    categoryText: {
        fontSize: 10,
        color: "#000",
        marginTop: 5,
    },
    bannerContainer: {
        position: "relative",
        alignItems: "center",
        marginVertical: 10,
    },
    bannerImage: {
        width: "100%",
        height: 180,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    bannerTextContainer: {
        position: "absolute",
        bottom: 30,
        alignItems: "center",
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    bannerSubtitle: {
        fontSize: 14,
        color: "#fff",
    },
    bannerLogo: {
        position: "absolute",
        bottom: -25,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#FFD700",
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
        backgroundColor: "#fff",
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    ratingItem: {
        alignItems: "center",
    },
    ratingNumber: {
        fontSize: 18,
        fontWeight: "bold",
    },
    ratingLabel: {
        fontSize: 12,
        color: "#555",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
        backgroundColor: "#fff",
        paddingVertical: 10,
        borderRadius: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#999",
    },
    activeButton: {
        backgroundColor: "#32a4fc",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    buttonTextActive: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
    },
});
