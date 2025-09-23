import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// Configuração do Firebase (mesma do teu projeto)
const firebaseConfig = {
    apiKey: "AIzaSyDvQNT-V87FJ2xb3gdnq6taD4RsvAhjmm8",
    authDomain: "regenera-9b38e.firebaseapp.com",
    projectId: "regenera-9b38e",
    storageBucket: "regenera-9b38e.firebasestorage.app",
    messagingSenderId: "32007036125",
    appId: "1:32007036125:web:1a5a313eabb271f1a00f34",
    measurementId: "G-D3VJGTFSM5",
    databaseURL: "https://regenera-9b38e-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Pega o UID da URL
const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

if (userId) {
    const userRef = ref(db, "usuarios/" + userId);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const dados = snapshot.val();
            document.getElementById("nome").innerText = dados.nome || "Não informado";
            document.getElementById("idade").innerText = dados.idade || "Não informado";
            document.getElementById("tipoSangue").innerText = dados.tipoSangue || "Não informado";
            document.getElementById("alergias").innerText = dados.alergias || "Nenhuma";
            document.getElementById("doencas").innerText = dados.doencas || "Nenhuma";
            document.getElementById("medicamentos").innerText = dados.medicamentos || "Nenhum";
            document.getElementById("orgaos").innerText = dados.doadorOrgaos ? "Sim" : "Não";
            document.getElementById("planoSaude").innerText = dados.planoSaude || "Não informado";
        } else {
            document.body.innerHTML = "<h2>Usuário não encontrado</h2>";
        }
    }).catch((error) => {
        console.error(error);
        document.body.innerHTML = <h2>Erro ao carregar dados</h2>;
    });
} else {
    document.body.innerHTML = "<h2>Link inválido</h2>";
}