const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise( (resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.nome}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];
    console.log('Arquivo recebido:', arquivo);

    if(arquivo){
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (error) {
            console.error("Erro na leitura do arquivo");
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

inputTags.addEventListener("keypress", async (evento) => {
    if(evento.key === "Enter"){
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== ""){
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if(tagExiste){
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else{
                    alert("Tag não foi encontrada");
                }
            }catch (error) {
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existencia da Tag. Verifique o console.")
            }
        }
    }
})

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")){
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

async function verificaTagsDisponiveis(tagTexto){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto (nomeProjeto, descricaoProjeto, tagsProjeto){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if(deuCerto){
                resolve("Projeto publicado com sucesso.");
            }else{
                reject("Erro ao publicar o projeto.");
            }
        }, 2000);
    })
}

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoPorjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoPorjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu tudo certo!");
    }catch (error){
        console.log("Deu errado: ", error);
        alert("Deu tudo errado");
    }

})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.scr = ".img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = "";

})

