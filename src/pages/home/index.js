import { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Logo } from "../../components/logo";
import { FoodList } from "../../components/foodlist";
import api from "../../services/api";

import { useNavigation } from "@react-navigation/native";

export function Home() {
    const [inputValue, setInputValue] = useState("");
    const [foods, setFoods] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        async function fetchApi() {
            const response = await api.get("/foods");
            setFoods(response.data);
        }
        fetchApi();
    }, []);

    function handleSearch() {
        if (!inputValue) return;

        let input = inputValue;
        setInputValue("");
        navigation.navigate("Search", { name: input });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Logo />

            <Text style={styles.title}>Encontre a receita</Text>
            <Text style={styles.title}>que combina com você</Text>

            <View style={styles.form}>
                <TextInput
                    placeholder="Digite o nome de uma comida..."
                    style={styles.input}
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search" size={30} color="#4CBE6C" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={foods}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <FoodList data={item} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "f3f9ff",
        paddingTop: 36,
        paddingStart: 14,
        paddingEnd: 14,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        // color: "#0e0e0e",
        color: "#31343b"
    },
    form: {
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: 8,
        marginBottom: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#ececec",
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        width: "90%",
        height: 54,
        maxWidth: "90%",
        color: "#31343b",
        fontWeight: 500
    },
});
